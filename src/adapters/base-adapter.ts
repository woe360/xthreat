export interface IDeliveryChannelAdapter {
    /**
     * Formats the content specific to the delivery channel.
     * @param content - The generic simulation content.
     * @param user - User-specific details for personalization.
     * @returns The channel-specific formatted content.
     */
    formatContent(content: any, user: any): Promise<any>;

    /**
     * Delivers the simulation to the user via the specific channel.
     * @param formattedContent - The content already formatted for this channel.
     * @param deliveryInfo - Channel-specific delivery information (e.g., email address, phone number).
     * @returns A promise that resolves with the delivery status or an identifier.
     */
    deliver(formattedContent: any, deliveryInfo: any): Promise<{ success: boolean; details?: any; error?: string }>;

    /**
     * Tracks user interaction with the simulation on this channel.
     * @param interactionData - Data captured from user interaction.
     * @returns A promise that resolves when tracking is complete.
     */
    trackInteraction(interactionData: any): Promise<void>;

    /**
     * Provides a channel-specific feedback loop or action.
     * @param simulationId - The ID of the simulation.
     * @param userId - The ID of the user.
     * @param action - The action taken by the user (e.g., reported, clicked).
     * @returns A promise that resolves when feedback processing is complete.
     */
    handleFeedback(simulationId: string, userId: string, action: string): Promise<void>;

    /**
     * Retrieves the name of the adapter/channel.
     * @returns The name of the channel (e.g., "email", "sms").
     */
    getChannelName(): string;
}

// Placeholder for common adapter configuration if needed in the future
export interface IAdapterConfiguration {
    apiKey?: string;
    apiSecret?: string;
    // other common config properties
}

// Example of how a specific adapter might use it:
// import { IDeliveryChannelAdapter, IAdapterConfiguration } from './base-adapter';
//
// interface IEmailAdapterConfig extends IAdapterConfiguration {
//   sendgridApiKey: string; // Specific to email
// }
//
// export class EmailAdapter implements IDeliveryChannelAdapter {
//   private config: IEmailAdapterConfig;
//
//   constructor(config: IEmailAdapterConfig) {
//     this.config = config;
//   }
//   // ... implementation ...
//   getChannelName(): string {
//     return "email";
//   }
// } 