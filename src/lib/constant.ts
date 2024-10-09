import Settings from '@/app/(main)/navigation/sideNavigation/icons/settings'
import Progress from '@/app/(main)/navigation/sideNavigation/icons/progress'
import Practice from '@/app/(main)/navigation/sideNavigation/icons/practice'
import Modules from '@/app/(main)/navigation/sideNavigation/icons/modules'
import Dashboard from '@/app/(main)/navigation/sideNavigation/icons/dashboard'
import { CloudCog } from 'lucide-react'
import Billing from '@/app/(main)/navigation/sideNavigation/icons/billing'
import Accounts from '@/app/(main)/navigation/sideNavigation/icons/account'
import Xlogo from '@/app/(main)/navigation/sideNavigation/icons/xlogo'
// import { Connection } from './types'


export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.png`,
  }))

  export const menuOptions = [
    { name: 'Dashboard', Component: Dashboard, href: '/dashboard' },
    { name: 'Modules', Component: Modules, href: '/modules' },
    // { name: 'Practice', Component: Practice, href: '/practice' },
    { name: 'Progress', Component: Progress, href: '/progress' }, 
    { name: 'Billing', Component: Billing, href: '/billing' }, 
    { name: 'Accounts', Component: Accounts, href: '/accounts' },
    { name: 'Settings', Component: Settings, href: '/settings' },
    
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