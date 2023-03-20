<template>
    <div>
      
     
        <v-sheet width="300" class="mx-auto">
          &nbsp;
    <center><div><h2>Login</h2></div></center>
    &nbsp;&nbsp;&nbsp;<div></div>
        <v-form fast-fail @submit.prevent>
          {{ mess }}
          <v-text-field
        v-model="Email"
        label="Email"
        :rules="EmailRules"
      ></v-text-field>
    
      <v-text-field
      type="password"
        v-model="Password"
        label="Password"
        :rules="PasswordRules"
      ></v-text-field>
          <p>New User? Please <button @click="signup" class="hover-underline-animation"> <i>Signup</i></button></p>
          <v-btn type="submit" @click="login" block class="mt-2">Login</v-btn>
          
        </v-form>
        
      </v-sheet>
      
    </div>
    
    </template>
    
    
    <script>
    import axios from 'axios';
    import { setToken } from '@/services/TokenServices';
    import { authenticate } from '@/services/AuthenticateLogn';
    import { useRouter } from 'vue-router';

    




    export default{
        name:"LoginPage",

        setup(){
          const router = useRouter()
          function signup(){
            router.push("/signup")
          }

          function check(){
            location.reload()
            
          }
          return{
            signup,
            check
          }

        },

        created() {
    this.user=JSON.parse(authenticate())
    const router = useRouter()
    
    if(this.user=== null){
      router.push('/')
    }
    else{
      router.push('/home')
    }
    
  },
        data:()=>({
          
      mess:'',
      user:null,

      Email: '',
      EmailRules: [
        value => {
          /* eslint-disable */
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

          return 'Email is not Valid.'
        },
      ],
      router:null,
 

      Password: '',
      PasswordRules: [
        value => {
          if (value.trim()!='') return true

          return 'Password can not be empty.'
        },
      ],
    }),
        
        methods:{
          login(){
              

              const url="http://localhost:5000/login"
              const data={
                Email:this.Email,
                Password:this.Password
              }
              axios.post(url, data)
  .then(response => {
   if(response.data.user===0){
this.mess = "Email doesn't exist."
   }
   else if(response.data.user===1){
    this.mess='Password is incorrect'
   }
    else{
    setToken(JSON.stringify(response.data.user))
    console.log("redirecting")
    
    this.check()
  
    }
   
  })
  .catch(error => {
    console.error(error);
  });}

   
           
        },
     


    }
    
    
    
    </script>
    
    
    <style scoped>
    .hover-underline-animation {
  display: inline-block;
  position: relative;
  color: 
#0087ca;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: 
#0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
    
    </style>