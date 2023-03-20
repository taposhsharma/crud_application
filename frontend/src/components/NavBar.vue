<template>
    <v-card  class="mx-auto" color="grey-lighten-3" style="border-radius: 0;">
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>
  
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
        <v-btn  @click="homepage">
          <v-app-bar-title>CRUD APPLICATION </v-app-bar-title></v-btn>
  
          <v-spacer></v-spacer>
          <div :style="{display:loginDisplay}">
          <v-btn @click="login">
            Login
          </v-btn>
  
          <v-btn  @click="signup">
            Signup
          </v-btn>
          </div>

          <div :style="{display:logoutDisplay}">
          <v-btn @click="logout">
            Logout
          </v-btn>
  
          
          </div>
  
        </v-app-bar>
  
        <v-main>
         
        </v-main>
      </v-layout>
    </v-card>
  </template>


<script>
import  { useRouter } from 'vue-router'
import { authenticate } from '@/services/AuthenticateLogn'
import { useStore} from 'vuex'
import { removeToken } from '@/services/TokenServices'


export default{
    name:"NavBar",
    data(){
        return{
           loginDisplay:'block',
           logoutDisplay:'none'
        }
    },
    created() {
    this.user=authenticate()
    
    
    if(this.user!= null){
        this.loginDisplay='none'
        this.logoutDisplay='block'
      
    }
    
    
  },
    setup(){
          const router = useRouter()
          
          const store = useStore();
          const componentAState = store.state.componentAState;
          function homepage(){
            router.push('/home/imagedisplay')
          }

          function login(){
            router.push('/')
          }

          function signup(){
            router.push('/signup')
          }

          function logout(){
            removeToken()
            router.push('/')
            location.reload('/')
            
        }
          return{
           
            login,
            signup,
            logout,
            componentAState,
            homepage
         
          }

        },
    
}
</script>
