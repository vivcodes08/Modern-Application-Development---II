export default{

    template:
    `
    <div class="main min-h-screen overscroll-contain bg-cover bg-center bg-no-repeat bg-[url('https://images.wallpaperscraft.com/image/single/headphones_books_education_121501_1280x720.jpg')]">

    <div class="mainContainer flex flex-col">
  
      <div class="header flex justify-center items-center p-5">
      <h1 class="text-4xl text-white font-bold font-mono"> My Playlists</h1>
      </div>
  
     <div class="body grid grid-cols-4 gap-6 p-7 flex-grow overflow-y-auto">
            <!-- CARD1 -->
           <div v-if="!isCountZero" v-for="playlist in userPlayLists" class="flex flex-col w-44 bg-white rounded-md  transform transition-transform duration-400 ease-in-out hover:scale-105  hover:shadow-purple-500 hover:shadow-xl">
          <router-link :to=("/playlist/songs/"+playlist.id)>  
           <div class="imageContainer h-40 bg-cover bg-[url('https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
           </router-link>  
           <div class="infoContainer flex flex-col p-1">
               <span class="flex justify-center font-bold font-serif">{{playlist.name}}</span>
               <span class="flex justify-center font font-mono">{{playlist.creator_name}}</span>
                <div class="flex justify-around ">
                  <button v-on:click="editPlaylist(playlist.id)" class="hover:text-green-400"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button v-on:click="deletePlaylist(playlist.id)" class=""><i class="fa-solid fa-trash" style="color: #f71844;"></i></button>
                 
                </div> 
             </div>
            
           </div>

          <!-- CARD2 -->

          <div v-if="isCountZero"> 
     <div class="header flex justify-center items-center p-5">
     <h3 class="text-3xl animate-bounce text-red-400 font-extrabold font-mono"> No Playlists 😅😅  </h3>
     </div>
     </div>

         
     </div>
  
    </div>
    
  
</div> 
    
    `,
    name:'MyPlaylist',
    data(){
        return{
            id:localStorage.getItem('id'),
            userPlayLists:[],
            isCountZero:true


        }
    },
    methods:{

        async fetchUserPlaylist(){

            let user_id=localStorage.getItem('id')
            
            let playres=await fetch(`/song/v1/playlist/list/${user_id}`,{
              method:"GET",
              headers: {'Content-type': 'application/json'}
            })
  
            let playdata=await playres.json();
            console.log("Playlist")
            if(playres.ok){
              let data=playdata.Data;
              this.userPlayLists=data
              if(data.length>0){

                this.isCountZero=false
              }else{
                this.isCountZero=true
              }
              
            }
  
        },
        async deletePlaylist(id){

          console.log("---Playlist Delete ID----,id")

          let delRes= await fetch(`/song/v1/playlist/${id}`,{
            headers: {'Content-Type': 'application/json'},
            method:'delete',
          })
  
          let dataRes=await delRes.json();
  
          if(delRes.ok){
            console.log("---delRes---")
            console.log(delRes)
            this.$router.push({ path:`/user` })
  
          }


        },
        editPlaylist(ids){
      
  
          this.$router.push({ path:`/edit/playlists/${ids}` })


        }    

    },
    async mounted(){

        this.fetchUserPlaylist()
        
    }
    
}