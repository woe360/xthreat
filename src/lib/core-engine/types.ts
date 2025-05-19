export interface SimulationContent {
    subject?: string; // For email
    body: string;    // Main content, could be HTML for email, text for SMS
    [key: string]: any; // For other channel-specific content fields
}

export interface SimulationConfig {
    id: string; // Unique ID for this configuration/template
    name: string;
    description?: string;
    channelType: string; // e.g., 'email', 'sms', 'screen-overlay'
    difficultyLevel: 'low' | 'medium' | 'high';
    content: SimulationContent; // The actual content to be delivered/displayed
    // For scheduled delivery
    deliveryWindowStart?: Date;
    deliveryWindowEnd?: Date;
    // Tags for categorization or reporting
    tags?: string[];
}

export type SimulationStatusValue = 
    | 'PENDING'         // Scheduled, waiting for delivery window or trigger
    | 'READY_TO_SEND'   // Processed by scheduler, about to be sent
    | 'SENDING'         // In the process of being sent by an adapter
    | 'DELIVERED'       // Confirmed delivery by the adapter
    | 'INTERACTED_CLICK'// User clicked a link
    | 'INTERACTED_SUBMIT'// User submitted data on a landing page
    | 'INTERACTED_REPLIED'// User replied to an email/SMS
    | 'REPORTED'        // User reported the simulation as phishing
    | 'IGNORED'         // No interaction within a defined timeframe (requires tracking)
    | 'COMPLETED'       // Simulation lifecycle finished, results processed
    | 'FAILED_DELIVERY' // Adapter failed to deliver
    | 'ERROR'           // An unexpected error occurred
    | 'CANCELLED';      // Simulation was cancelled before completion

export interface SimulationStatus {
    status: SimulationStatusValue;
    lastUpdatedAt: Date;
    details?: string; // e.g., error message, delivery ID
}

export interface SimulationAction {
    type: string; // e.g., 'click', 'open', 'report', 'data_entry'
    timestamp: Date;
    target?: string; // e.g., URL clicked, field entered
    value?: any;     // e.g., data entered
    [key: string]: any;
}

export interface SimulationResult {
    simulationId: string;
    userId: string;
    status: SimulationStatusValue;
    actions: SimulationAction[];
    deliveredAt?: Date;
    firstInteractionAt?: Date;
    completedAt?: Date;
    reportedAt?: Date;
    // other summary metrics
} 