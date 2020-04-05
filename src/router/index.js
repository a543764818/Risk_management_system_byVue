import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('views/Login');
const Home = () => import('views/Home');
const DeviceQuery = () => import('views/DeviceQuery');
const General = () => import('views/General');
const R_TaskAllocate = () => import('views/R_TaskAllocate');
const R_TaskManage = () => import('views/R_TaskManage');
const R_TaskExam =()=>import('views/R_TaskExam')
const TaskLocation=()=>import('views/TaskLocation')
const TaskDetail =()=>import('views/TaskDetail')

const Profile = () => import('components/base_set/Profile');
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '',
                redirect: 'general'
            },
            {
                path: 'general',
                component: General
            },
            {
                path: 'device_query',
                component: DeviceQuery
            },
            {
                path: 'person_info:id',
                component: Profile
            },
            {
                path: 'routine_task_allocate',
                component: R_TaskAllocate
            },
            {
                path: 'routine_task_manage',
                component: R_TaskManage
            },{
                path:'routine_task_examine',
                component:R_TaskExam
            }
        ]
    },
    {
        path:'/task_location:id',
        component:TaskLocation
    },{
        path:'/task/:type/:id',
        component:TaskDetail
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});
//设置 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    const token = sessionStorage.getItem('token');
    //没有登录，强制 跳转 登录页面， 禁止 未登录 通过url 进入页面
    if (!token) return next('/login');
    next();
});

export default router;