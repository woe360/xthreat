import Settings from '@/app/(main)/navigation/sideNavigation/icons/settings'
import Progress from '@/app/(main)/navigation/sideNavigation/icons/progress'
import Practice from '@/app/(main)/navigation/sideNavigation/icons/practice'
import Modules from '@/app/(main)/navigation/sideNavigation/icons/modules'
import Dashboard from '@/app/(main)/navigation/sideNavigation/icons/dashboard'
import { CloudCog } from 'lucide-react'
import Billing from '@/app/(main)/navigation/sideNavigation/icons/billing'
import Accounts from '@/app/(main)/navigation/sideNavigation/icons/accounts'
import Account from '@/app/(main)/navigation/sideNavigation/icons/account'
import Xlogo from '@/app/(main)/navigation/sideNavigation/icons/xlogo'
import Home from '@/app/(main)/navigation/sideNavigation/icons/home'
import Business from '@/app/(main)/navigation/sideNavigation/icons/home'
import Financial from '@/app/(main)/navigation/sideNavigation/icons/financial'
import Trainings from '@/app/(main)/navigation/sideNavigation/icons/trainings'
import Statistics from '@/app/(main)/navigation/sideNavigation/icons/statistics'
import RoleTraining from '@/app/(main)/navigation/sideNavigation/icons/role-based'
import ChatAssistant from '@/app/(main)/navigation/sideNavigation/icons/assistant'
// import { Connection } from './types'


export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.png`,
  }))

  export const menuOptions = [
    { name: 'Dashboard', Component: Dashboard, href: '/dashboard' },
    { name: 'Modules', Component: Modules, href: '/modules' },
    { name: 'Role Based', Component: RoleTraining, href: '/role-based' },
    { name: 'Assistant', Component: ChatAssistant, href: '/assistant' },  
    { name: 'Account', Component: Account, href: '/account' },
    { name: 'Settings', Component: Settings, href: '/settings' },

    //MANAGER
    // { name: 'Billing', Component: Billing, href: '/billing' }, 
    // { name: 'Accounts', Component: Accounts, href: '/accounts' },
    // { name: 'Progress', Component: Progress, href: '/progress' },

    
    //ADMIN
    // { name: 'Clients', Component: Business, href: '/clients' },
    // { name: 'SETTINGS', Component: Settings, href: '/settings' },
    // { name: 'Overview', Component: Dashboard, href: '/overview' },
    // { name: 'Financials', Component: Financial, href: '/financials' },
    // { name: 'COMPANY', Component: Settings, href: '/settings' },
    // { name: 'Statistics', Component: Statistics, href: '/statistics' },
    // { name: 'Trainings', Component: Trainings, href: '/trainings' },

    //UPDATES
    // { name: 'Practice', Component: Practice, href: '/practice' },
  ]

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