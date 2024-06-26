import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddUser from '../components/AddUser.vue';
import EditUser from '../components/EditUser.vue';
import AddToDo from '../components/AddToDo.vue';
import EditToDo from '../components/EditToDo.vue';
import UserService from '../components/UserService.vue';
import ToDoList from '../components/ToDoList.vue';
import config from '../config';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'ToDoList',
        component: ToDoList,
    },
    {
        path: '/add-todo',
        name: 'AddToDo',
        component: AddToDo,
    },
    {
        path: '/edit-todo/:id',
        name: 'EditToDo',
        component: EditToDo,
    },
    {
        path: '/users',
        name: 'UserService',
        component: UserService,
    },
    {
        path: '/add-user',
        name: 'AddUser',
        component: AddUser,
    },
    {
        path: '/edit-user/:id',
        name: 'EditUser',
        component: EditUser,
    },
];

const router = createRouter({
    history: createWebHistory(config.baseUrl),
    routes,
});

export default router;
