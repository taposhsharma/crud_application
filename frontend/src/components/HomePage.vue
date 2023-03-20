<template>
  <center>
    &nbsp;
    <div><h1>Welcome {{ username }}</h1></div>
    &nbsp;&nbsp;&nbsp;<div></div>
<router-link to="/home/addtask" style="text-decoration:none">   <v-btn  color="secondary"> Add Task</v-btn></router-link>
&nbsp;&nbsp;
   <router-link to="/home/viewtask" style="text-decoration:none"><v-btn   color="error"> View Task</v-btn></router-link>
   <div></div>
   &nbsp;&nbsp;&nbsp;&nbsp;
    <router-view></router-view>
    </center> 
    
    
</template>

<script>
import {authenticate} from '@/services/AuthenticateLogn'

import { useRouter } from 'vue-router'


export default{
    name:'HomePage',
  
    created() {
        
    this.user=JSON.parse(authenticate())
    const router = useRouter()
   
    
    if(this.user=== null){
      router.push('/')
    }
    else{
      router.push('/home/imagedisplay')
      this.username=this.user.firstname+' '+this.user.lastname
     
    }
   
  },
 
    data(){
        return{
          username:'',
            mess:'hii',
            user:null,
            
        }
    },
    methods:{
      
    
    }
}

</script>

<styled scoped>
</styled>
