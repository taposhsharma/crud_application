<template>
   &nbsp;
    <div><h2>Add Task</h2></div>
    &nbsp;&nbsp;&nbsp;<div></div>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-textarea
        v-model="task"
      clearable
      clear-icon="mdi-close-circle"
      label="Enter Your Task"
    
    ></v-textarea>
      
        <v-btn type="submit" @click="addtask" block class="mt-2">Add</v-btn>
      </v-form>
    </v-sheet>
  </template>
<script>
import axios from 'axios';
import {authenticate} from '@/services/AuthenticateLogn'

import { useRouter } from 'vue-router'

 
export default {
    name:'AddTask',
    created() {
        
        this.user=JSON.parse(authenticate())
        const router = useRouter()
        
        if(this.user=== null){
          router.push('/')
        }
        
        
      },

      setup(){
        const router = useRouter()
        function check(){
                  router.push('/home/imagedisplay')
        }
        return{
          check
        }
      },
  data: () => ({
    task:'',
    user:null
   
  }),
  methods:{
    addtask(){
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
            username:this.user.firstname+' '+this.user.lastname,
            email:this.user.email,
            task:this.task,
            task_time:timeStamp,
        task_date:dateStr,
            }
              
            axios.post("http://localhost:5000/addtask", data)
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