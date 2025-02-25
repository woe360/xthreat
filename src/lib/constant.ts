
import Progress from '@/app/(dashboard)/navigation/icons/progress'
import Practice from '@/app/(dashboard)/navigation/icons/practice'
import Modules from '@/app/(dashboard)/navigation/icons/modules'
import Dashboard from '@/app/(dashboard)/navigation/icons/dashboard'
import Billing from '@/app/(dashboard)/navigation/icons/billing'
import Accounts from '@/app/(dashboard)/navigation/icons/accounts'
import Account from '@/app/(dashboard)/navigation/icons/account'
import Business from '@/app/(dashboard)/navigation/icons/home'
import Financial from '@/app/(dashboard)/navigation/icons/financial'
import Trainings from '@/app/(dashboard)/navigation/icons/trainings'
import Statistics from '@/app/(dashboard)/navigation/icons/statistics'
import RoleTraining from '@/app/(dashboard)/navigation/icons/role-based'
import ChatAssistant from '@/app/(dashboard)/navigation/icons/assistant'
import Settings from '@/app/(dashboard)/navigation/icons/settings'


export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.png`,
  }))

// Default menu options (available to all users)
const defaultOptions = [
  { name: 'Dashboard', Component: Dashboard, href: '/dashboard' },
  { name: 'Modules', Component: Modules, href: '/modules' },
  { name: 'Role Based', Component: RoleTraining, href: '/role-based' },
  { name: 'Account', Component: Account, href: '/account' },
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
  { name: 'Overview', Component: Dashboard, href: '/overview' },
  { name: 'Companies', Component: Business, href: '/companies' },
  { name: 'Clients', Component: Accounts, href: '/clients' },
  { name: 'Financials', Component: Financial, href: '/financials' },
  { name: 'Statistics', Component: Statistics, href: '/statistics' },
  { name: 'Trainings', Component: Trainings, href: '/trainings' },
  { name: 'Account', Component: Account, href: '/account' },
  { name: 'Settings', Component: Settings, href: '/settings' },
]

// Export function to get menu options based on role
export const getMenuOptions = (role?: 'admin' | 'manager' | 'user') => {
  console.log('getMenuOptions called with role:', role) // Debug log
  
  switch (role) {
    case 'admin':
      return [...adminOptions]
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