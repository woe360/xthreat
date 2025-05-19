import { CoreEngine, ICoreEngine } from '@/lib/core-engine/engine';
import { UserProfileService, IUserProfileService } from '@/lib/user-profile/service';
import { Scheduler, IScheduler } from '@/lib/scheduler/scheduler';
import { MockEmailAdapter } from '@/adapters/email/mock-email-adapter';
import { IDeliveryChannelAdapter } from '@/adapters/base-adapter';

// Instantiate services - order matters for constructor injection
const userProfileServiceInstance: IUserProfileService = new UserProfileService();

// Scheduler needs CoreEngine, but CoreEngine needs Scheduler.
// This creates a circular dependency if we strictly use constructor injection for both.
// For now, let's instantiate them and then set the dependency for one of them, 
// or CoreEngine could take a Scheduler factory/getter.
// Simpler approach for now: Instantiate Scheduler first, then CoreEngine, then set CoreEngine on Scheduler.
// OR, CoreEngine doesn't strictly need Scheduler in constructor if scheduleSimulation is called by an external trigger that has access to Scheduler.
// Let's adjust CoreEngine to not require Scheduler in constructor but have it set, and Scheduler to take CoreEngine.

// Option: Modify CoreEngine to not take Scheduler in constructor, but have a setter or make it public settable from here.
// For now, sticking to the established pattern: both take dependencies in constructor where possible, 
// but we need to resolve the circular dependency for CoreEngine <-> Scheduler.

// Simplest immediate fix: One of them (e.g. Scheduler) takes the other in constructor, 
// and the other (e.g. CoreEngine) has the dependency set via a property after both are created.
// OR: Pass a *reference* or a *getter* if strict constructor DI is a must for both.

// Let's try: Instantiate UserProfileService. Scheduler needs CoreEngine. CoreEngine needs Scheduler & UserProfileService.
// This is the classic circular dependency. 
// Typical solutions: 
//  1. Use a setter method for one of the circular dependencies.
//  2. Use an event bus / mediator.
//  3. Redesign to break the circularity (e.g. CoreEngine doesn't directly call scheduler.scheduleSimulation but returns data for something else to schedule)

// For now, let's use a simplified approach: Scheduler will get CoreEngine later via a property or method.
// CoreEngine will take its dependencies as constructor args.

const schedulerInstance: IScheduler = new Scheduler(undefined as any, 10000); // Pass undefined CoreEngine initially, 10s interval
const coreEngineInstance: ICoreEngine = new CoreEngine(userProfileServiceInstance, schedulerInstance);

// Now set the coreEngine dependency on the scheduler instance
(schedulerInstance as Scheduler).coreEngine = coreEngineInstance;

// Instantiate adapters
const mockEmailAdapterInstance: IDeliveryChannelAdapter = new MockEmailAdapter();

// Register adapters with the CoreEngine
coreEngineInstance.registerAdapter(mockEmailAdapterInstance);

// Start the scheduler processing loop
schedulerInstance.startProcessing();

// Export instances to be used throughout the application
export const userProfileService = userProfileServiceInstance;
export const coreEngine = coreEngineInstance;
export const scheduler = schedulerInstance;
export const mockEmailAdapter = mockEmailAdapterInstance;

console.log("Services initialized and wired.");

// We need to modify CoreEngine and Scheduler to accept these dependencies.
// CoreEngine: add public userProfileService: IUserProfileService; public scheduler: IScheduler;
// Scheduler: add public coreEngine: ICoreEngine;
// And update their constructors or add setter methods if preferred. 