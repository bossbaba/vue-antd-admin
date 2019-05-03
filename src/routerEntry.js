const Home  = () => import('@/views/Home.vue')
const Management = ()=>import('@/views/Management/Management')
const issueDemand = () => import('@/views/issueDemand/issueDemand.vue')
const ChartsDome = () => import('@/views/ChartsDome/ChartsDome.vue')
const userManagement = () => import('@/views/Management/userManagement.vue')
const routerEntry = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path: '/Management',
    name: 'Management',
    component: Management
  },{
    path: '/issueDemand',
    name: 'issueDemand',
    component: issueDemand
  },{
    path: '/ChartsDome',
    name: 'ChartsDome',
    component: ChartsDome
  },{
    path: '/userManagement',
    name: 'userManagement',
    component: userManagement
  },
]

// issueDemand

export default routerEntry