import MySongCards from "../Creator/MySongCards.js"

export default {

    template:
    `
    <div class="main min-h-screen overscroll-contain bg-cover bg-center bg-no-repeat bg-[url('https://images.wallpaperscraft.com/image/single/treble_clef_musical_notes_multicolored_121263_1280x720.jpg')]">

    <div class="mainContainer flex flex-col">
  
      <div class="header flex justify-center items-center p-5">
      <h1 class="text-4xl text-white font-bold font-mono"> All Songs  </h1>
      </div>
  
     <div class="body grid grid-cols-4 gap-6 p-7 flex-grow overflow-y-auto">
            <!-- CARD1 -->
            <MySongCards v-if="!isCountZero" v-for="(song, index) in allSongsCreator" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id" :artistName="song.creator_name" /> 
            <!-- CARD2 -->
            <div v-if="isCountZero"> 
            <div class="header flex justify-center items-center p-5">
            <h3 class=" animate-bounce text-3xl text-red-400 font-extrabold font-mono"> No Songs Produces  😅😅  </h3>
            </div>
            </div>
     </div>
  
    </div>
    
  
</div> 
    `,
    name:'MySongs',
    data(){
        return{

            allSongsCreator:[],
            isCountZero:true

        }
    },
   
    components:{
        MySongCards
    },
    methods:{

        async fetchallCreatorSongs(){

            let user_id=localStorage.getItem('id')
            let playres=await fetch(`/song/v1/api`,{
              method:"GET"
            })
  
            let playdata=await playres.json();
            console.log("Playlist")
            if(playres.ok){
              console.log("----data---")
              let data=playdata.Data;
              this.allSongsCreator=data

              if(data.length >0){
                this.isCountZero=false
              }else{
                this.isCountZero=true
              }
              
            }
  
        } 

    },
    mounted(){
        this.fetchallCreatorSongs();
    }
}