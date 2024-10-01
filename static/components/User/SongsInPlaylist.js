import LikedSongCards from "./LikedSongCards.js"

export default{

    template:
    `
    <div class="main min-h-screen overscroll-contain bg-cover bg-center bg-no-repeat bg-[url('https://images.wallpaperscraft.com/image/single/headphones_table_sound_121712_3840x2160.jpg')]">

    <div class="mainContainer flex flex-col">
  
      <div class="header flex justify-center items-center p-5">
      <h1 class="text-4xl text-white font-bold font-mono"> Songs In Playlist</h1>
      </div>
  
     <div v-if="!isCountZero" class="body grid grid-cols-4 gap-6 p-7 flex-grow overflow-y-auto">
            <!-- CARD1 -->
            <LikedSongCards v-for="(song, index) in userLikedSongs" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id" :artistName="song.creator_name" :flag=true :playlistId="playlistId" /> 
            <!-- CARD2 -->
         
     </div>
     <div v-if="isCountZero"> 
     <div class="header flex justify-center items-center p-5">
     <h3 class="text-2xl text-red-400 font-extrabold font-mono"> No Songs in Playlist 😅😅  </h3>
     </div>
     </div>
  
    </div>
    
  
</div> 

    `,
    name:'SongsInPlaylist',
    data(){
        return{
            id:localStorage.getItem('id'),
            userLikedSongs:[],
            playlistId:null,
            isCountZero:true,

        }
    },
    components:{
      LikedSongCards
  },
    
    methods:{
        async fetchUserLikedSongs(id){

            let user_id=localStorage.getItem('id')
            let playres=await fetch(`/song/v1/playlist/${id}/songs`,{
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

        console.log("ID",this.$route.params.id)
        let id=this.$route.params.id
        this.playlistId=id;
        this.fetchUserLikedSongs(id)
        console.log("--fetchUserLikedSongs----")
        console.log(this.userLikedSongs)

    }

}