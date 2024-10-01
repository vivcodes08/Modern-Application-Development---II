import NavBar from "./NavBar.js";
import SongCard from "./SongCard.js";

export default {

    template:`
    <div>
    <NavBar :callBackProps="handleSearchCallback"/>
       <div class="main">

       <!------------------------ Casoural 1 ------------------------------------->
    <div class="recommanded h-auto p-3">
       <div class="flex justify-between p-2">
           <label class="text-blue-800 font-bold">Recommanded Tracks</label>
          
       </div>
       
       <div class="flex shrink-0 flex-nowrap gap-x-5 gap-y-1 overflow-x-scroll">
           <SongCard v-for="(song, index) in recommandedSongs" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id"/> 
       </div>
   </div>
   <!------------------------ Casoural 1 ------------------------------------->
   <div class="recommanded p-3">
   <div class="flex justify-between p-2">
       <label class="text-blue-800 font-bold">Songs You Might Like</label>

   </div>
   
   <div class="flex shrink-0 flex-nowrap gap-x-5 gap-y-1 overflow-x-scroll">
       <SongCard v-for="(song, index) in songs" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id"/> 
   </div>
</div>
   <!------------------------ Casoural 2 ------------------------------------->
   <div class="recommanded p-3">
   <div class="flex justify-between p-2">
       <label class="text-blue-800 font-bold">Sad/Motivational Tracks</label>
   </div>
   
   <div class="flex shrink-0 flex-nowrap gap-x-5 gap-y-1 overflow-x-scroll">
       <SongCard v-for="(song, index) in allSadMotiSongs" :key='index' :name = "song.name" :imageURL="song.imageURL" :id="song.id"/> 
   </div>
</div>
   
   <!------------------------ Casoural 3 ------------------------------------->
   <!------------------------ Casoural 4 ------------------------------------->
   <!------------------------ Casoural 5 ------------------------------------->
    
    
       </div>
    </div>
    `,
    data(){
        return{
            songs:[],
            allSadMotiSongs:[],
            recommandedSongs:[]
        }
    },
    components: {
        NavBar,
        SongCard
      },
    methods:{
        handleSearchCallback(serachValue){
            if(serachValue == "" || serachValue == null || serachValue == undefined) return this.getAllSongs()
            this.songs=this.songs.filter(song=> song.name.toLowerCase().includes(serachValue.toLowerCase()))
            this.allSadMotiSongs=this.allSadMotiSongs.filter(song=> song.name.toLowerCase().includes(serachValue.toLowerCase()))
            this.recommandedSongs=this.recommandedSongs.filter(song=> song.name.toLowerCase().includes(serachValue.toLowerCase()))
        },
        async getAllSongs(){

            const res = await fetch('/song/v1/api', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              const songdata = await res.json()
              console.log("song Data",songdata)
              if (res.ok) {
                this.songs=songdata.Data
                let allSongsArray=songdata.Data
    
                let mostpopularSongs=allSongsArray.toSorted((a,b)=> b.views-a.views)
                this.recommandedSongs=mostpopularSongs.slice(0,5)
    
                const sadMotivSongs = allSongsArray.filter(obj => obj.genre.includes('sad') || obj.genre.includes('motivational'))
                this.allSadMotiSongs=sadMotivSongs
    
              }

        }
    },
    async mounted(){

       this.getAllSongs()
    }

}