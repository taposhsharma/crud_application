
<template>

&nbsp;
    <div><h2>View Tasks</h2></div>
    &nbsp;&nbsp;&nbsp;<div></div>
    <v-table style="width:80%">
      <thead>
        <tr>
            <th class="text-left">
            S.No.
          </th>
          <th class="text-left">
            Task Id
          </th>
          <th class="text-left">
            Task
          </th>
          <th class="text-left">
            Task date
          </th>
          <th class="text-left">
            User Name
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-left">
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in items"
          :key="item.name"

        ><td>{{ index+1 }}</td>
        <td>{{ item.task_id }}</td>
          <td>{{ item.task }}</td>
          <td>{{ item.task_date.split('T')[0] }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.status }}</td>
          <td><v-btn
            size="x-small"
            color="blue-grey"
             @click="updatetask(item.task_id)">Update</v-btn>
             &nbsp;
             <v-btn v-if="item.status=='Pending'"
            size="x-small"
            color="success"
             @click="updatestatus(item.task_id)">Complete</v-btn>
             &nbsp;
            
            
             <v-btn
            size="x-small"
            color="error"
             @click="deletetask(item.task_id)">Delete</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </template>
<script>


import axios from 'axios';
import {authenticate} from '@/services/AuthenticateLogn'

import { useRouter } from 'vue-router'

export default{
    name:'ViewTask',
   
    created(){
        this.user=JSON.parse(authenticate())
        const router = useRouter()
        
        if(this.user=== null){
          router.push('/')
        }
        else{
            const data={
                role:this.user.role,
                email:this.user.email
            }
            console.log(data)
 axios.post("http://localhost:5000/viewtask",data)
                .then(response => {
                 this.items= response.data;
                 
   
                })
                 .catch(error => {
                   console.error(error);
                    });
        }

    },
    setup(){
       const router = useRouter()
       function updatetask(id){
        router.push("/updatetask/"+id)
        
                 
       }
      
       return{
         updatetask
         
       }
     },
    data(){
        return{
           
            items:[],
            i:0
        }
    },
    methods:{
       
        deletetask(id){
           
           const data={
               task_id:id
           }
           axios.post("http://localhost:5000/deletetask",data)
               .then(response => {
                console.log(response)
                console.log(this.user)
                const data={
               role:this.user.role,
               email:this.user.email
           }
           console.log(data)
axios.post("http://localhost:5000/viewtask",data)
               .then(response => {
                this.items= response.data;
                
  
               })
                .catch(error => {
                  console.error(error);
                   });
               
               })
                .catch(error => {
                  console.error(error);
                   });
       },
       updatestatus(id){
           
           const data={
               task_id:id
           }
           axios.post("http://localhost:5000/status",data)
               .then(response => {
                console.log(response)
                console.log(this.user)
                const data={
               role:this.user.role,
               email:this.user.email
           }
           console.log(data)
axios.post("http://localhost:5000/viewtask",data)
               .then(response => {
                this.items= response.data;
                
  
               })
                .catch(error => {
                  console.error(error);
                   });
               
               })
                .catch(error => {
                  console.error(error);
                   });
       }
    }


}
</script>
