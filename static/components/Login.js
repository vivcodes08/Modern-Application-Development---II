export default {
    template:`
      <div class="root h-screen bg-cover bg-[url('https://images.wallpaperscraft.com/image/single/dj_pose_console_982208_1280x720.jpg')]">
      <section class="login flex justify-center pt-24 min-h-screen">
      <div class="w-full max-w-xs">
          <form @submit.prevent="login" method='POST' class="bg-white bg-opacity-10 backdrop-filter: blur(20px)  shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class='text-red-600 font-extrabold'>*{{error}}</div>
            <div class="mb-4">
              <label class="block text-black text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input name='email' v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-6">
              <label class="block text-black text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input name="password" v-model="user.password" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
             
            </div>
            <div class="flex items-center justify-between">
              <button type='submit' class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                Login
              </button>
              
                  
                  <router-link class="inline-block align-baseline font-bold text-sm text-white hover:text-green-600" aria-current="page" to="/register">Don't have a Account?</router-link>
             
              
            </div>
          </form>
          <p class="text-center text-white text-xs">
            &copy;2023 Vivek IITM  All rights reserved.
          </p>
        </div>
    </section>
      </div>
    `,
    data() {
      return {
        user: {
          email: null,
          password: null,
        },
        error: null,
      }
    },
    methods: {
      async login() {
        console.log("user",this.user)
        const res = await fetch('/user-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        })
        const data = await res.json()
        console.log("Login Data",data)
        if (res.ok) {
          if(data.status == 401){
            this.error=data.message
          }else{
            console.log("Inside the else")
            localStorage.setItem('auth-token', data.token)
            localStorage.setItem('roles', data.roles)
            localStorage.setItem('email', data.email)
            localStorage.setItem('id', data.id)
            localStorage.setItem('username', data.username)
            localStorage.setItem('is_auth', true)
            this.$router.push({ path: '/dashboard' })
          }
         
        } else {
          this.error = data.message
        }
      },
    },
    mounted(){
      console.log("localStorage",localStorage.getItem('is_auth'))
      if(localStorage.getItem('is_auth')){
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
  