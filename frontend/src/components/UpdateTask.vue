<template>
    
    <v-sheet width="300" class="mx-auto">
  <center>    &nbsp;
    <div><h2>Update Task</h2></div>
    &nbsp;&nbsp;&nbsp;<div></div></center>  
      <v-form fast-fail @submit.prevent>
        <v-textarea
        v-model="task"
      clearable
      clear-icon="mdi-close-circle"
      label="Enter Your Task"
    
    ></v-textarea>
      
        <v-btn type="submit" @click="updatetask" block class="mt-2">Update</v-btn>
      </v-form>
    </v-sheet>
  </template>
<script>
import axios from 'axios';
import {authenticate} from '@/services/AuthenticateLogn'

import { useRouter ,useRoute} from 'vue-router'

 
export default {
    name:'UpdateTask',
    created() {
        
        this.user=JSON.parse(authenticate())
        const router = useRouter()
        const route = useRoute()
        
        if(this.user=== null){
          router.push('/')
        }
        else{
            const data={
               task_id:route.params.id
           }
           axios.post("http://localhost:5000/taskrequired",data)
               .then(response => {
                console.log(response.data)
                this.task = response.data[0].task
                this.task_id=response.data[0].task_id
                console.log(this.user)
              
               
               })
                .catch(error => {
                  console.error(error);
                   });
        }
        
        
      },

      setup(){
        const router = useRouter()
        function check(){
          console.log("hhhh")
                  router.push('/home/viewtask')
        }
        return{
          check
        }
      },
  data: () => ({
    task:'',
    task_id:'',
    user:null
   
  }),
  methods:{
    updatetask(){
      console.log(this.user)
        var d = new Date()
        var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
    
var dateStr = year+'-'+month+'-'+date;

var hour = d.getHours()
var minutes = d.getMinutes()
var seconds = d.getSeconds()
var timeStamp = hour+":"+minutes+":"+seconds
    
        const data={
            
            task_id:this.task_id,
            task:this.task,
            task_time:timeStamp,
        task_date:dateStr,
            }
              
            axios.post("http://localhost:5000/updatetask", data)
                .then(response => {
                 console.log(response);
                 
    console.log("redirecting")
    this.check()
  
                })
                 .catch(error => {
                   console.error(error);
                    });

        console.log(data)
        console.log(this.user)
        console.log(this.task)

    }
  }
}
</script>