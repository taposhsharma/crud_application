
<template>
  &nbsp;
   
  <v-sheet width="300" class="mx-auto">
    
    <center><div><h2>Signup</h2></div></center>
  &nbsp;
    <div v-html="mess"></div>
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="FirstName"
        label="First name"
        :rules="firstNameRules"
      ></v-text-field>

      <v-text-field
        v-model="LastName"
        label="Last name"
        :rules="lastNameRules"
      ></v-text-field>

      <v-text-field
        v-model="Email"
        label="Email"
        :rules="EmailRules"
      ></v-text-field>
      <v-text-field
        v-model="Mobile"
        label="Mobile Number"
        :rules="MobileRules"
      ></v-text-field>
      <v-text-field
      type="password"
        v-model="Password"
        label="Password"
        :rules="PasswordRules"
      ></v-text-field>

      <v-btn type="submit" @click="signup" block class="mt-2">Signup</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>

import axios from 'axios'
import { authenticate } from '@/services/AuthenticateLogn'
import { useRouter } from 'vue-router'
import { setToken } from '@/services/TokenServices'




export default ({
    name:"SignupPage",
    setup(){
          
          

          function check(){
            location.reload()
          }
          return{
           
            check
          }

        },
    created() {
    this.user=authenticate()
    const router = useRouter()
    console.log("hi this is signup")
    if(this.user=== null){
      router.push('/signup')
    }
    else{
      router.push('/home')
    }
    
  },
    data:()=>({
      mess:'',
      FirstName: '',
      firstNameRules: [
      value => {
          if (value.trim()!='') return true

          return 'FirstName can not be empty.'
        },
      ],
      LastName: '',
      lastNameRules: [
      value => {
          if (value.trim()!='') return true

          return 'LastName can not be empty.'
        },
      ],

      Email: '',
      EmailRules: [
      value => {
          /* eslint-disable */
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

          return 'Email is not Valid.'
        },
      ],

      Mobile: '',
      MobileRules: [
      value => {
          /* eslint-disable */
          if (/^[0-9]{10}$/.test(value)) return true

          return 'Mobile Number is not Valid.'
        },
        
      ],

      Password: '',
      PasswordRules: [
        value => {
          if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
.test(value)) return true

          return 'Password is weak.'
        },
      ],
    }),
    methods:{
        signup(){

            const url="http://localhost:5000/signup"
            const data = { 
                FirstName:this.FirstName,
                LastName:this.LastName,
                Email:this.Email,
                Mobile:this.Mobile,
                Password:this.Password

            }
            axios.post(url, data)
                .then(response => {
                 console.log(response.data);

                 if(response.data.user===0){
                  this.mess="<p>Email already exist. Try <a href='/'><i>Login</i></a></p>"
                 }else{
                 setToken(JSON.stringify(response.data.user))
    console.log("redirecting")
    this.check()}

                })
                 .catch(error => {
                   console.error(error);
                    });

        }

    },
   
})
</script>


<style scoped>

</style>