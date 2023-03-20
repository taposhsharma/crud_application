
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'
import AddTask from './components/AddTask'
import ViewTask from './components/ViewTask'
import UpdateTask from './components/UpdateTask'
import ImageDisplay from './components/ImageDisplay'



  

  const routes = [
    { path: '/', component: LoginPage },
    { path: '/signup', component: SignupPage },
    {path: '/home', component:HomePage,
    children:[
      {
        path:'addtask',
        name:'AddTask',
        component:AddTask
      },
      {
        path:'viewtask',
        name:'ViewTask',
        component:ViewTask
      },
      {
        path:'updatetask/:id',
        name:'UpdateTask',
        component:UpdateTask
      },
      {
        path:'imagedisplay',
        name:'ImageDisplay',
        component:ImageDisplay
      }


    ]
    },
      {
        path:'/updatetask/:id',
        name:'UpdateTask',
        component:UpdateTask
      },
    
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;