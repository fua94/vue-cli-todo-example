import TasksPage from './views/TasksPage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'

const routes = [
    {
        path: '/tasks',
        name: 'tasks',
        component: TasksPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    }
]

export default routes
