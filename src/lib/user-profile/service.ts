import { User, UserProfile } from './types';

export interface IUserProfileService {
    getUserProfile(userId: string): Promise<UserProfile | undefined>;
    updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | undefined>;
    createUser(user: User): Promise<UserProfile>;
    recordConsent(userId: string, hasConsented: boolean, consentDate?: Date): Promise<UserProfile | undefined>;
    getDeliveryInfo(userId: string, channelName: string): Promise<any | undefined>;
    // Add other methods as needed, e.g., for managing delivery preferences
}

export class UserProfileService implements IUserProfileService {
    // In-memory store for user profiles for now. Replace with database interaction (e.g., Prisma).
    private userProfiles: Map<string, UserProfile> = new Map();

    constructor() {
        console.log("UserProfileService initialized");
        // Optionally, seed with some dummy data for development
        // this.seedInitialData();
    }

    // private seedInitialData() {
    //     const initialUser: User = {
    //         id: 'user123',
    //         email: 'test.user@example.com',
    //         name: 'Test User',
    //         hasConsentedToPhishingSimulation: false,
    //     };
    //     this.userProfiles.set(initialUser.id, { user: initialUser });
    //     console.log("UserProfileService seeded with initial data.");
    // }

    public async getUserProfile(userId: string): Promise<UserProfile | undefined> {
        return this.userProfiles.get(userId);
    }

    public async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | undefined> {
        const existingProfile = this.userProfiles.get(userId);
        if (!existingProfile) {
            console.warn(`User profile for user ID ${userId} not found. Cannot update.`);
            return undefined;
        }

        // Deep merge might be needed for nested objects like deliveryPreferences
        // For simplicity, doing a shallow merge here. 
        // User object itself would need careful handling if partial updates are allowed for it.
        const updatedProfile = { 
            ...existingProfile, 
            ...profileData,
            user: profileData.user ? { ...existingProfile.user, ...profileData.user } : existingProfile.user
        };

        this.userProfiles.set(userId, updatedProfile);
        console.log(`User profile for ${userId} updated.`);
        return updatedProfile;
    }

    public async createUser(user: User): Promise<UserProfile> {
        if (this.userProfiles.has(user.id)) {
            throw new Error(`User with ID ${user.id} already exists.`);
        }
        const newUserProfile: UserProfile = {
            user,
            // Initialize with defaults
            lastSimulationDate: undefined,
            riskScore: 0, // Default risk score
        };
        this.userProfiles.set(user.id, newUserProfile);
        console.log(`User profile created for ${user.id}.`);
        return newUserProfile;
    }

    public async recordConsent(userId: string, hasConsented: boolean, consentDate: Date = new Date()): Promise<UserProfile | undefined> {
        const profile = this.userProfiles.get(userId);
        if (!profile) {
            console.warn(`User profile for user ID ${userId} not found. Cannot record consent.`);
            return undefined;
        }

        profile.user.hasConsentedToPhishingSimulation = hasConsented;
        profile.user.consentDate = hasConsented ? consentDate : undefined;
        
        this.userProfiles.set(userId, profile);
        console.log(`Consent recorded for user ${userId}: ${hasConsented}`);
        return profile;
    }

    // Example: Method to get delivery info for a specific channel
    public async getDeliveryInfo(userId: string, channelName: string): Promise<any | undefined> {
        const profile = await this.getUserProfile(userId);
        if (!profile) return undefined;

        switch (channelName.toLowerCase()) {
            case 'email':
                return { email: profile.user.email, name: profile.user.name }; // Add more as needed
            case 'sms':
                return { phone: profile.user.phone };
            // Add cases for other channels
            default:
                console.warn(`Delivery info for channel ${channelName} not supported by UserProfileService yet.`);
                return undefined;
        }
    }
}

// Export a singleton instance or provide a factory function if preferred
// export const userProfileService = new UserProfileService(); 