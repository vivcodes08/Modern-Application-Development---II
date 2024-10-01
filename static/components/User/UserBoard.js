export default{

    template:
    `
    <div class="bg-gray-100 p-4 flex flex-col gap-6">
    <div class="Heading justify-center p-4 flex items-center"><span class="text-4xl font-extrabold text-blue-600 ">{{username}}'s Board </span></div>
    <div class="flex justify-center">
        <div class="w-full grid grid-cols-3 gap-12 justify-centerspace-y-4">

            <!-- Card 1: Create A Song -->
            <router-link to="/user/playlist">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                    <i class="fa-brands fa-spotify fa-bounce fa-2xl" style="color: #31b927;"></i>
                 </div>
                <div class="Heading">
                    <h1 class="text-xl  font-bold">Create Playlist</h1>
                </div>
                
            </div>   
            </router-link>

            <router-link to="/user/myplaylists">
                <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                    <div class="button  rounded-full">
                         <i class="fa-solid fa-headphones-simple fa-flip fa-2xl" style="color: #0cdbdf;"></i>
                    </div>
                    <div class="Heading">
                        <h1 class="text-xl  font-bold">My Playlist</h1>
                    </div>
                </div>    
            </router-link>

            


            <router-link to="/user/likedSongs">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                    <i class="fa-solid fa-heart fa-beat-fade fa-2xl" style="color: #ff0000;"></i>
                </div>
                <div class="Heading">
                        <h1 class="text-xl  font-bold">Favorite Songs</h1>
                </div>
               </div> 
            </router-link>
        </div>
    </div>

</div>   

    `,
    name:"UserBoard",
    data(){
        return{
            username:localStorage.getItem('username')
        }
        

    },
    methods:{

    }
}