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

import { authenticate } from './services/AuthenticateLogn';



export default {
  name: 'App',
  created() {
    this.user=authenticate()
    
    if(this.user=== null){
      console.log(this.user)
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
