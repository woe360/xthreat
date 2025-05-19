import { SimulationConfig } from '@/lib/core-engine/types';
import { User } from '@/lib/user-profile/types';
import { ICoreEngine } from '@/lib/core-engine/engine';

// Forward declaration, assuming CoreEngine will be injected or accessible
// import { coreEngine } from '@/lib/core-engine/engine'; 

interface ScheduledSimulation {
    simulationId: string;
    userId: string;
    channelName: string;
    config: SimulationConfig;
    scheduledTime: Date;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

export interface IScheduler {
    /**
     * Schedules a simulation for a user on a specific channel based on the config.
     * This might involve a randomized delay as per requirements.
     * @param simulationId - The unique ID for this simulation instance.
     * @param user - The target user.
     * @param channelName - The channel to use.
     * @param config - The simulation configuration (includes content, type, difficulty).
     * @param triggerEventTime - The time of the event that triggered this scheduling (e.g., module completion).
     */
    scheduleSimulation(
        simulationId: string,
        user: User,
        channelName: string,
        config: SimulationConfig,
        triggerEventTime: Date
    ): Promise<void>;

    /**
     * For an internal ticker or cron job to check for simulations that are due.
     */
    processPendingSimulations(): Promise<void>;

    startProcessing(): void;
    stopProcessing(): void;

    // Might need methods to cancel or reschedule, etc.
    // cancelSimulation(simulationId: string): Promise<void>;
}

export class Scheduler implements IScheduler {
    // In-memory store for scheduled simulations. Replace with a persistent queue/DB.
    private pendingSimulations: Map<string, ScheduledSimulation> = new Map();
    private processingInterval: NodeJS.Timeout | null = null;
    public coreEngine!: ICoreEngine;

    constructor(coreEngine: ICoreEngine, private checkIntervalMs: number = 60 * 1000) {
        this.coreEngine = coreEngine;
        console.log("Scheduler initialized with CoreEngine");
    }

    public async scheduleSimulation(
        simulationId: string,
        user: User,
        channelName: string,
        config: SimulationConfig,
        triggerEventTime: Date
    ): Promise<void> {
        // Implement randomized delay (1-24 hours after module completion)
        // For now, let's use a simpler fixed or shorter random delay for testing.
        // const randomDelayMs = Math.floor(Math.random() * (24 * 60 * 60 * 1000)) + (1 * 60 * 60 * 1000);
        const randomDelayMs = Math.floor(Math.random() * (5 * 60 * 1000)) + (1 * 1000); // 1sec to 5min for easier testing
        
        const scheduledTime = new Date(triggerEventTime.getTime() + randomDelayMs);

        const scheduledSim: ScheduledSimulation = {
            simulationId,
            userId: user.id,
            channelName,
            config,
            scheduledTime,
            status: 'PENDING',
        };

        this.pendingSimulations.set(simulationId, scheduledSim);
        console.log(`Simulation ${simulationId} for user ${user.id} on channel ${channelName} scheduled for ${scheduledTime.toISOString()}`);
        
        // Ensure processing loop is running if it's managed internally
        if (!this.processingInterval) {
            // this.startProcessing();
        }
    }

    public async processPendingSimulations(): Promise<void> {
        const now = new Date();
        console.log(`Scheduler processing pending simulations at ${now.toISOString()}... Found ${this.pendingSimulations.size}`);

        for (const [simId, simDetails] of this.pendingSimulations.entries()) {
            if (simDetails.status === 'PENDING' && simDetails.scheduledTime <= now) {
                try {
                    simDetails.status = 'PROCESSING';
                    console.log(`[Scheduler] Processing simulation: ${simId} for user ${simDetails.userId}`);
                    
                    // Use the injected CoreEngine instance
                    await this.coreEngine.startSimulation(simId);
                    
                    simDetails.status = 'COMPLETED'; // Assuming startSimulation handles its own status updates internally
                    // Or, CoreEngine.startSimulation could return a status.
                    // For now, we remove it from pending list after attempting to start.
                    this.pendingSimulations.delete(simId);
                    console.log(`[Scheduler] Simulation ${simId} handed off to CoreEngine.`);

                } catch (error) {
                    console.error(`[Scheduler] Error processing simulation ${simId}:`, error);
                    simDetails.status = 'FAILED';
                    // Decide on retry logic or if it stays in FAILED state.
                }
            }
        }
    }

    public startProcessing(): void {
        if (this.processingInterval) {
            console.log("[Scheduler] Processing loop already running.");
            return;
        }
        this.processingInterval = setInterval(() => {
            this.processPendingSimulations();
        }, this.checkIntervalMs);
        console.log(`[Scheduler] Processing loop started. Checking every ${this.checkIntervalMs / 1000} seconds.`);
    }

    public stopProcessing(): void {
        if (this.processingInterval) {
            clearInterval(this.processingInterval);
            this.processingInterval = null;
            console.log("[Scheduler] Processing loop stopped.");
        }
    }
}

// Export a singleton instance or provide a factory function if preferred
// export const scheduler = new Scheduler(); 