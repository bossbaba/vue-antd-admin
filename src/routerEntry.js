const Home  = () => import('@/views/Home.vue')
const Management = ()=>import('@/views/Management/Management')
const issueDemand = () => import('@/views/issueDemand/issueDemand.vue')
const ChartsDome = () => import('@/views/ChartsDome/ChartsDome.vue')
const userManagement = () => import('@/views/Management/userManagement.vue')
const AntvG2 = () => import('@/views/AntVChartsDemo/AntVChartsDemo.vue')
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
  },{
    path: '/AntvG2',
    name: 'AntvG2',
    component: AntvG2
  },
]

// issueDemand

export default routerEntry