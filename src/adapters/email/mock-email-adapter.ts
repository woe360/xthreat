import { IDeliveryChannelAdapter, IAdapterConfiguration } from '@/adapters/base-adapter';
import { User } from '@/lib/user-profile/types';
import { SimulationContent } from '@/lib/core-engine/types';

export interface IMockEmailAdapterConfig extends IAdapterConfiguration {
    // No specific config needed for mock adapter yet
    logLevel?: 'info' | 'debug';
}

export class MockEmailAdapter implements IDeliveryChannelAdapter {
    private config: IMockEmailAdapterConfig;

    constructor(config: IMockEmailAdapterConfig = {}) {
        this.config = config;
        console.log("MockEmailAdapter initialized");
    }

    public getChannelName(): string {
        return "email";
    }

    public async formatContent(content: SimulationContent, user: User): Promise<any> {
        // Basic personalization for mock
        const personalizedBody = content.body.replace("{{userName}}", user.name || "User");
        const personalizedSubject = content.subject?.replace("{{userName}}", user.name || "User") || "Phishing Simulation";
        
        const formattedEmail = {
            subject: personalizedSubject,
            body: personalizedBody,
            recipientName: user.name,
            recipientEmail: user.email,
        };
        if (this.config.logLevel === 'debug') {
            console.debug(`[MockEmailAdapter] Formatted content for ${user.email}:`, formattedEmail);
        }
        return formattedEmail;
    }

    public async deliver(formattedContent: any, deliveryInfo: { email?: string, name?: string }): Promise<{ success: boolean; details?: any; error?: string }> {
        if (!deliveryInfo || !deliveryInfo.email) {
            const errorMsg = "[MockEmailAdapter] Delivery failed: Email address not provided in deliveryInfo.";
            console.error(errorMsg);
            return { success: false, error: errorMsg };
        }

        console.log("=======================================================================");
        console.log("[MockEmailAdapter] SIMULATING SENDING EMAIL:");
        console.log(`   To: ${deliveryInfo.name} <${deliveryInfo.email}>`);
        console.log(`   Subject: ${formattedContent.subject}`);
        console.log("   Body:");
        console.log("   -------------------------------------------------------------------");
        console.log(formattedContent.body.split('\n').map((line: string) => `   | ${line}`).join('\n'));
        console.log("   -------------------------------------------------------------------");
        console.log("[MockEmailAdapter] Email theoretically sent.");
        console.log("=======================================================================");

        // Simulate a successful delivery
        return { success: true, details: { messageId: `mock-${Date.now()}` } };
    }

    public async trackInteraction(interactionData: any): Promise<void> {
        console.log("[MockEmailAdapter] Tracking interaction:", interactionData);
        // In a real scenario, this might involve calling an endpoint on our server
        // that the CoreEngine would then process.
    }

    public async handleFeedback(simulationId: string, userId: string, action: string): Promise<void> {
        console.log(`[MockEmailAdapter] Handling feedback for simulation ${simulationId}, user ${userId}: ${action}`);
        // e.g., if user reported, this might trigger a thank you notification or update a status.
    }
} 