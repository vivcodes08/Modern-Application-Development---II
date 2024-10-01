import LikedSongCards from "./LikedSongCards.js"

export default{

    template:
    `
    <div class="main min-h-screen overscroll-contain bg-cover bg-center bg-no-repeat bg-[url('https://images.wallpaperscraft.com/image/single/notes_flowers_paper_848489_1280x720.jpg')]">

    <div class="mainContainer flex flex-col">
  
      <div class="header flex justify-center items-center p-5">
      <h1 class="text-4xl text-black font-bold font-mono"> My Liked Songs</h1>
      </div>
  
     <div class="body grid grid-cols-4 gap-6 p-7 flex-grow overflow-y-auto">
            <!-- CARD1 -->
            <LikedSongCards v-if="!isCountZero" v-for="(song, index) in userLikedSongs" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id" :artistName="song.creator_name" /> 
            <!-- CARD2 -->
            <div v-if="isCountZero"> 
            <div class="header flex justify-center items-center p-5">
            <h3 class=" animate-bounce text-3xl text-red-400 font-extrabold font-mono"> No Liked Songs  😅😅  </h3>
            </div>
            </div>
     </div>
  
    </div>
    
  
</div> 

    `,
    name:'LikedSongs',
    data(){
        return{
            id:localStorage.getItem('id'),
            userLikedSongs:[],
            isCountZero:true

        }
    },
    components:{
      LikedSongCards
  },
    
    methods:{
        async fetchUserLikedSongs(){

            let user_id=localStorage.getItem('id')
            let playres=await fetch(`/like/v1/list/song/${user_id}`,{
              method:"GET"
            })
  
            let playdata=await playres.json();
            console.log("Playlist")
            if(playres.ok){
              console.log("----data---")
              let data=playdata.Data;
              this.userLikedSongs=data

              if(data.length >0){
                this.isCountZero=false
              }else{
                this.isCountZero=true
              }
              
            }
  
        } 

    },
    async mounted(){
        this.fetchUserLikedSongs()
        console.log("--fetchUserLikedSongs----")
        console.log(this.userLikedSongs)

    }

}