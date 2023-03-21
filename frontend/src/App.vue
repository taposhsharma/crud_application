<template>
  <v-app>
    <v-main>
      <div>
 <NavBar/>
 
    <router-view></router-view>
  </div>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { useRouter } from 'vue-router';
import { authenticate } from './services/AuthenticateLogn';



export default {
  name: 'App',
  created() {
    this.user=authenticate()
    this.router = useRouter()
    if(this.user=== null){
    
      this.router.push('/')
    }
    
  },
  components: {
    NavBar,
    
},

  data: () => ({
    user:null
  }),

  
  


  
}
</script>
