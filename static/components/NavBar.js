export default {

    template:
    `
    <div>
    <nav
        class="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
                <span class="font-extrabold  text-2xl font-mono gradient-text  ">Sangeet</span>
            </div>
            <div class="block lg:hidden ">
                <button
                    id="nav"
                    class="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
        </div>
    
        <div class="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div class="text-md font-bold text-blue-700 lg:flex-grow">
                

                <router-link v-if="userSpace" class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" to="/user"> User Space </router-link>
                <router-link v-if="adminSpace" class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" to="/admin"> Admin Space </router-link>
                <router-link v-if="creatorSpace" class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" to="/creator"> Creator Space </router-link>
                <span class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded bg-red-400 hover:bg-rose mr-2">{{username}}</span>
                
                
            </div>
            <!-- This is an example component -->
            <div class="relative mx-auto text-gray-600 lg:block hidden">
                <input
                    v-model="searchValue" class="border-2  border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search">
                <button v-on:click="handleClick" type="submit" class="absolute right-0 top-0 mt-3 mr-2">
                    <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                         version="1.1" id="Capa_1" x="0px" y="0px"
                         viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
                         xml:space="preserve"
                         width="512px" height="512px">
                <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
                </button>
            </div>
            <div class="flex ">
                <router-link
                   class="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0" to="/myprofile">My Profile
                    </router-link>
    
                <button v-on:click="logout"
                   class=" block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Logout</button>
            </div>
        </div>
    
    </nav>
</div>
    `,

    name:'NavBar',
    data(){
        let userRoles=localStorage.getItem('roles');
        return{
            adminSpace:userRoles.includes('Admin'),
            creatorSpace:userRoles.includes('Creator'),
            userSpace:userRoles.includes('User'),
            username:localStorage.getItem('username'),
            searchValue:""
        }
    },
    props: {
        callBackProps: {
          type: Function,
          required: true,
        },
      },
    methods:{
        handleClick(){
            console.log("Search Value", this.searchValue)
            this.callBackProps(this.searchValue)
        },
        logout(){
            localStorage.clear()
            this.$router.push({path: "/login"})
        }
    }
}