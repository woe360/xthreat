export type UserRole = 'user' | 'admin' | 'manager';

export interface User {
    id: string; // Unique identifier for the user
    email?: string; // Primary email for simulations, if applicable
    phone?: string; // Primary phone for SMS simulations, if applicable
    name?: string; // Full name for personalization
    firstName?: string; // For more granular personalization
    lastName?: string; // For more granular personalization
    department?: string; // For targeted simulations or analytics
    role?: UserRole; // User's role, for context e.g. 'user', 'admin', 'manager'
    // Add other PII or relevant fields for personalization as needed
    // Ensure these are handled with encryption and consent
    customFields?: Record<string, any>; // For any other dynamic user attributes

    // Consent management fields
    hasConsentedToPhishingSimulation: boolean;
    consentDate?: Date;
    phishingSimulationFrequency?: 'low' | 'medium' | 'high'; // User preference
}

export interface UserProfile {
    user: User;
    // Channel-specific delivery preferences or overrides
    deliveryPreferences?: {
        email?: { preferredAddress?: string; enabled?: boolean };
        sms?: { preferredNumber?: string; enabled?: boolean };
        // other channels
    };
    // Training history or relevant data for simulation targeting
    lastTrainingModuleCompleted?: string;
    lastSimulationDate?: Date;
    riskScore?: number; // Calculated risk score for adaptive difficulty
} 