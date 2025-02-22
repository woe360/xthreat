import Settings from '@/app/(dashboard)/navigation/sideNavigation/icons/settings'
import Progress from '@/app/(dashboard)/navigation/sideNavigation/icons/progress'
import Practice from '@/app/(dashboard)/navigation/sideNavigation/icons/practice'
import Modules from '@/app/(dashboard)/navigation/sideNavigation/icons/modules'
import Dashboard from '@/app/(dashboard)/navigation/sideNavigation/icons/dashboard'
import Billing from '@/app/(dashboard)/navigation/sideNavigation/icons/billing'
import Accounts from '@/app/(dashboard)/navigation/sideNavigation/icons/accounts'
import Account from '@/app/(dashboard)/navigation/sideNavigation/icons/account'
import Business from '@/app/(dashboard)/navigation/sideNavigation/icons/home'
import Financial from '@/app/(dashboard)/navigation/sideNavigation/icons/financial'
import Trainings from '@/app/(dashboard)/navigation/sideNavigation/icons/trainings'
import Statistics from '@/app/(dashboard)/navigation/sideNavigation/icons/statistics'
import RoleTraining from '@/app/(dashboard)/navigation/sideNavigation/icons/role-based'
import ChatAssistant from '@/app/(dashboard)/navigation/sideNavigation/icons/assistant'
// import { Connection } from './types'


export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.png`,
  }))

// Default menu options (available to all users)
const defaultOptions = [
  { name: 'Dashboard', Component: Dashboard, href: '/dashboard' },
  { name: 'Modules', Component: Modules, href: '/modules' },
  { name: 'Role Based', Component: RoleTraining, href: '/role-based' },
  { name: 'Account', Component: Account, href: '/account' },
  { name: 'Settings', Component: Settings, href: '/settings' },
]

// Features in development
const developmentOptions = [
  { name: 'Practice', Component: Practice, href: '/practice' },
  { name: 'Assistant', Component: ChatAssistant, href: '/assistant' },
]

// Manager-specific options
const managerOptions = [
  { name: 'Billing', Component: Billing, href: '/billing' },
  { name: 'Accounts', Component: Accounts, href: '/accounts' },
  { name: 'Progress', Component: Progress, href: '/progress' },
]

// Admin-specific options
const adminOptions = [
  { name: 'Clients', Component: Business, href: '/clients' },
  { name: 'Overview', Component: Dashboard, href: '/overview' },
  { name: 'Financials', Component: Financial, href: '/financials' },
  { name: 'Statistics', Component: Statistics, href: '/statistics' },
  { name: 'Trainings', Component: Trainings, href: '/trainings' },
]

// Export function to get menu options based on role
export const getMenuOptions = (role?: 'admin' | 'manager' | 'user') => {
  switch (role) {
    case 'admin':
      return [...defaultOptions, ...adminOptions]
    case 'manager':
      return [...defaultOptions, ...managerOptions]
    default:
      return [...defaultOptions]
  }
}

// Default export for backward compatibility - shows only default options
export const menuOptions = defaultOptions

// import Category from '@/components/icons/category';
// import Logs from '@/components/icons/clipboard';
// import Templates from '@/components/icons/cloud_download';
// import Home from '@/components/icons/home';
// import Payment from '@/components/icons/progress';
// import Settings from '@/components/icons/settings';
// import Workflows from '@/components/icons/courses';
// import Complience from '@/components/icons/complience';
// import Progress from '@/components/icons/progress';

// export const clients = [...new Array(10)].map((client, index) => ({
//   href: `/${index + 1}.png`,
// }))

// export const menuOptions = [
//   { name: 'Dashboard', Component: Home, href: '/dashboard' },
//   { name: 'Lessons', Component: Category, href: '/lessons' },
//   { name: 'Practice', Component: Workflows, href: '/practice' },
//   { name: 'Progress', Component: Progress, href: '/progress' },
//   { name: 'Complience', Component: Complience, href: '/complience' },
  // { name: 'Settings', Component: Settings, href: '/settings' },
// ]