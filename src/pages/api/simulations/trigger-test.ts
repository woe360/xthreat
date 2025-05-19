import type { NextApiRequest, NextApiResponse } from 'next';
import { coreEngine, userProfileService } from '@/lib/services';
import { SimulationConfig } from '@/lib/core-engine/types';
// UserRole type might be needed if we want to be very specific with role values from req.body
// import { UserRole } from '@/lib/user-profile/types'; 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { userId } = req.body;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: "Missing or invalid 'userId' in request body." });
        }

        // 1. Fetch the existing user profile
        const userProfile = await userProfileService.getUserProfile(userId);

        if (!userProfile) {
            return res.status(404).json({ message: `User with ID '${userId}' not found.` });
        }

        // 2. Check user role
        if (userProfile.user.role !== 'user') {
            return res.status(403).json({
                message: `Simulation not applicable for user role: '${userProfile.user.role || 'undefined'}'. Only users with role 'user' are targeted.`,
                userId: userId,
                userRole: userProfile.user.role
            });
        }

        console.log(`User ${userId} (${userProfile.user.name}) has role 'user'. Proceeding with simulation.`);

        // Optional: Check for consent. 
        if (!userProfile.user.hasConsentedToPhishingSimulation) {
            console.warn(`User ${userId} has not consented to phishing simulations. Proceeding for test purposes, but this should be handled in a real scenario.`);
            // In a real production scenario, you might prevent scheduling or inform the admin.
        }

        // 3. Define a simple simulation configuration
        // This API call itself simulates the event of the user being in a relevant lesson.
        // The scheduler will add a random delay (1-24h, currently 10s for testing) from this point.
        const emailSimulationConfig: SimulationConfig = {
            id: 'lesson-triggered-email-sim-003',
            name: 'Lesson-Triggered Email Simulation (Mock)',
            description: 'Email simulation triggered when a user is in a relevant training lesson.',
            channelType: 'email',
            difficultyLevel: 'low',
            content: {
                subject: "Regarding Your Recent Phishing Awareness Training, {{userName}}",
                body: `Hello {{userName}},\n\nWe noticed you're currently going through the phishing awareness module.\nTo help solidify your learning, here's a quick practical exercise based on what you've covered.\n\nPlease review the attached document regarding updated security protocols.\n\nThis is a test simulation email.\n\nKeep up the great work!\nYour Training Team`
            },
            tags: ['test', 'lesson-triggered', 'role-user-only']
        };

        // 4. Create the simulation using the CoreEngine
        const simulationId = await coreEngine.createSimulation(
            emailSimulationConfig,
            userProfile.user, 
            'email' 
        );

        res.status(200).json({ 
            message: `Test simulation triggered successfully for user ${userId} (Role: ${userProfile.user.role})!`,
            simulationId: simulationId,
            userId: userProfile.user.id,
            details: `Simulation for user ${userProfile.user.email} is scheduled. Mock email will be logged after a delay.`
        });

    } catch (error) {
        console.error("[trigger-test API] Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ message: "Failed to trigger test simulation", error: errorMessage });
    }
} 