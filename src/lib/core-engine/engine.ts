import { IDeliveryChannelAdapter } from '@/adapters/base-adapter';
import { User } from '@/lib/user-profile/types';
import { SimulationConfig, SimulationResult, SimulationStatus } from '@/lib/core-engine/types';
import { IScheduler } from '@/lib/scheduler/scheduler';
import { IUserProfileService } from '@/lib/user-profile/service';

export interface ICoreEngine {
    /**
     * Registers a delivery channel adapter with the core engine.
     * @param adapter - The adapter to register.
     */
    registerAdapter(adapter: IDeliveryChannelAdapter): void;

    /**
     * Creates and schedules a new simulation.
     * @param config - The configuration for the simulation.
     * @param user - The target user for the simulation.
     * @param channelName - The name of the channel to use for delivery.
     * @returns A promise that resolves with the ID of the created simulation.
     */
    createSimulation(config: SimulationConfig, user: User, channelName: string): Promise<string>;

    /**
     * Starts a scheduled simulation.
     * @param simulationId - The ID of the simulation to start.
     */
    startSimulation(simulationId: string): Promise<void>;

    /**
     * Handles an incoming interaction from a delivery channel.
     * @param simulationId - The ID of the simulation the interaction belongs to.
     * @param interactionData - Data captured from the user interaction.
     * @param channelName - The name of the channel that received the interaction.
     */
    handleInteraction(simulationId: string, interactionData: any, channelName: string): Promise<void>;

    /**
     * Retrieves the status of a simulation.
     * @param simulationId - The ID of the simulation.
     * @returns A promise that resolves with the simulation status.
     */
    getSimulationStatus(simulationId: string): Promise<SimulationStatus>;

    /**
     * Retrieves the results of a completed simulation.
     * @param simulationId - The ID of the simulation.
     * @returns A promise that resolves with the simulation results.
     */
    getSimulationResult(simulationId: string): Promise<SimulationResult>;

    // Potentially other methods for managing simulation lifecycle, pausing, cancelling, etc.
}

export class CoreEngine implements ICoreEngine {
    private adapters: Map<string, IDeliveryChannelAdapter> = new Map();
    // In-memory store for simulations for now, will be replaced by database interaction
    private simulations: Map<string, any> = new Map(); 

    // Injected services
    public userProfileService!: IUserProfileService; // Definite assignment assertion
    public scheduler!: IScheduler;                 // Definite assignment assertion

    constructor(userProfileService: IUserProfileService, scheduler: IScheduler) {
        this.userProfileService = userProfileService;
        this.scheduler = scheduler;
        console.log("CoreEngine initialized with UserProfileService and Scheduler");
    }

    public registerAdapter(adapter: IDeliveryChannelAdapter): void {
        if (this.adapters.has(adapter.getChannelName())) {
            console.warn(`Adapter for channel '${adapter.getChannelName()}' is already registered. Overwriting.`);
        }
        this.adapters.set(adapter.getChannelName(), adapter);
        console.log(`Adapter for channel '${adapter.getChannelName()}' registered.`);
    }

    public async createSimulation(config: SimulationConfig, user: User, channelName: string): Promise<string> {
        const adapter = this.adapters.get(channelName);
        if (!adapter) {
            throw new Error(`No adapter registered for channel: ${channelName}`);
        }

        const simulationId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        // TODO: Persist simulation details (config, user, channel, status: PENDING)
        // This will involve interaction with the Scheduler and UserProfile service.
        this.simulations.set(simulationId, { 
            id: simulationId, 
            config, 
            user, 
            channelName, 
            status: 'PENDING', // Example status
            createdAt: new Date()
        });
        console.log(`Simulation ${simulationId} created for user ${user.id} on channel ${channelName}`);
        
        // Use the injected scheduler
        await this.scheduler.scheduleSimulation(simulationId, user, channelName, config, new Date());

        return simulationId;
    }

    public async startSimulation(simulationId: string): Promise<void> {
        const simulation = this.simulations.get(simulationId);
        if (!simulation) {
            throw new Error(`Simulation with ID ${simulationId} not found.`);
        }

        const adapter = this.adapters.get(simulation.channelName);
        if (!adapter) {
            throw new Error(`Adapter for channel ${simulation.channelName} not found for simulation ${simulationId}.`);
        }

        // Get delivery info from UserProfileService
        const deliveryInfo = await this.userProfileService.getDeliveryInfo(simulation.user.id, simulation.channelName);
        if (!deliveryInfo) {
            simulation.status = 'FAILED_DELIVERY';
            simulation.error = `Could not retrieve delivery info for user ${simulation.user.id} on channel ${simulation.channelName}`;
            this.simulations.set(simulationId, simulation);
            console.error(simulation.error);
            return;
        }

        try {
            // 1. Format content (simplified, actual content generation might be more complex)
            const formattedContent = await adapter.formatContent(simulation.config.content, simulation.user);
            
            // 2. Deliver
            const deliveryResult = await adapter.deliver(formattedContent, deliveryInfo);

            if (deliveryResult.success) {
                console.log(`Simulation ${simulationId} delivered successfully. Details:`, deliveryResult.details);
                // Update simulation status to DELIVERED/ACTIVE
                simulation.status = 'DELIVERED';
                simulation.deliveredAt = new Date();
            } else {
                console.error(`Failed to deliver simulation ${simulationId}:`, deliveryResult.error);
                // Update simulation status to FAILED_DELIVERY
                simulation.status = 'FAILED_DELIVERY';
                simulation.error = deliveryResult.error;
            }
        } catch (error) {
            console.error(`Error during simulation ${simulationId} execution:`, error);
            simulation.status = 'ERROR';
            simulation.error = (error as Error).message;
        }
        // Persist updated simulation state
        this.simulations.set(simulationId, simulation);
    }

    public async handleInteraction(simulationId: string, interactionData: any, channelName: string): Promise<void> {
        const simulation = this.simulations.get(simulationId);
        if (!simulation) {
            throw new Error(`Simulation with ID ${simulationId} not found for interaction.`);
        }

        const adapter = this.adapters.get(channelName);
        if (!adapter) {
            throw new Error(`Adapter for channel ${channelName} not found for interaction on simulation ${simulationId}.`);
        }
        
        console.log(`Handling interaction for simulation ${simulationId} on channel ${channelName}:`, interactionData);
        await adapter.trackInteraction(interactionData);

        // Update simulation status based on interaction (e.g., CLICKED, REPORTED)
        // This will involve the AnalyticsEngine.
        simulation.status = interactionData.action || 'INTERACTED'; // Example status update
        simulation.lastInteractedAt = new Date();
        simulation.interactionDetails = interactionData;
        this.simulations.set(simulationId, simulation);

        // Potentially trigger feedback via the adapter
        // await adapter.handleFeedback(simulationId, simulation.user.id, interactionData.action);
    }

    public async getSimulationStatus(simulationId: string): Promise<SimulationStatus> {
        const simulation = this.simulations.get(simulationId);
        if (!simulation) {
            throw new Error(`Simulation with ID ${simulationId} not found.`);
        }
        // This is a simplified status. In a real system, you'd have more granular statuses.
        return { 
            status: simulation.status,
            lastUpdatedAt: simulation.lastInteractedAt || simulation.deliveredAt || simulation.createdAt
        } as SimulationStatus; // Cast needed until type is fully defined
    }

    public async getSimulationResult(simulationId: string): Promise<SimulationResult> {
        const simulation = this.simulations.get(simulationId);
        if (!simulation) {
            throw new Error(`Simulation with ID ${simulationId} not found.`);
        }
        // This is a simplified result. The AnalyticsEngine would provide richer data.
        return {
            simulationId,
            userId: simulation.user.id,
            status: simulation.status,
            actions: simulation.interactionDetails ? [simulation.interactionDetails] : [],
            // ... other relevant result data
        } as SimulationResult; // Cast needed until type is fully defined
    }
}

// Export a singleton instance or provide a factory function if preferred
// export const coreEngine = new CoreEngine(); 