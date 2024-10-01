export default {
    template:`
      <div class="root h-screen bg-cover bg-[url('https://images.wallpaperscraft.com/image/single/concert_crowd_people_134866_1280x720.jpg')]">
      <section class="login flex justify-center pt-24 min-h-screen:">
      <div class="w-full max-w-xs">
          <form @submit.prevent="register" method="POST" class="bg-white bg-opacity-10 backdrop-filter: blur(20px)  shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class='text-red-600 font-extrabold'>*{{error}}</div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="username">
            Email-ID
            </label>
            <input  v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Id">
            </div>
            <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="username">
           UserName
            </label>
            <input  v-model="user.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userName" type="text" placeholder="User Name ">
            </div>  
            <div class="mb-3">
            <label class="block text-black text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input name="" v-model="user.password" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********">
          </div>
            

            <div class="mb-4 flex justify-between items-center">
            <div>
            <input  class="focus:outline-none bg-orange-400" type="radio" id="User" value="User" v-model="user.role" />
            <label class="font-bold text-black" for="one">User</label>
            </div>
            
            <div>
            <input class="focus:outline-none bg-orange-400" type="radio" id="Creator" value="Creator" v-model="user.role" />
            <label class="font-bold  text-black" for="two">Creator</label>
            </div>
            </div>
           
            <div class="flex items-center justify-between">
              <button class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                Register
              </button>
              <router-link class="inline-block align-baseline font-bold text-sm text-black hover:text-green-600" aria-current="page" to="/">Already have Account?</router-link>              
                
                
            
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;2023 Vivek IITM  All rights reserved..
          </p>
        </div>
  </section>
      
      </div>
      
    `,
    data() {
       
      return {
        user:{
          email:null,
          username:null,
          password:null,
          role:null
        },
        error:null
        
    }
    },
    methods: {
      async register(){

        console.log('email',this.user.email)
        console.log('username',this.user.username)
        console.log('password',this.user.password)
        console.log('role',this.user.role)

        const res = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        })
        const data = await res.json()
        this.error=null
        console.log('data',data)
        if (res.ok) {
         if(data && data.status==403){
          this.error="User Already Exists"
         }else{
          this.error=null
          this.$router.push({ path: '/login' })
          alert("User Registered Successfully!! Login Now")

         }
        } else {
          this.error = data.message
        }
        
     

      } 
    },
  }
  