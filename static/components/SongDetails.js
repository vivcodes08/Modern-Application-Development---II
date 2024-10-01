export default{

    template:
   `
   <div class="h-screen">
   <div v-if="showmain" class="outer-div h-auto w-full bg-slate-200 flex items-center justify-center">
       <div class="inner-div h-72 w-10/12 gap-5 bg-white flex flex-col p-5">
           <div class="main-1 flex">
               <div class="image-container  w-3/12 h-44 rounded-sm">
                   <img class="w-full h-full rounded-md" :src="songDetails.imageURL" alt="image" />
               </div>
               <div class="infocontainer w-9/12 flex flex-col">
                   <div class="heading flex items-center justify-center h-4">
                       <h1 class="text-3xl font-extrabold font-serif ">{{songDetails.name}}</h1>
                   </div>
                   <div class="action Containter h-40 flex justify-center items-center gap-2">
                       <button v-on:click="onClickFeedbackBtn" id="openFeedbackModal"
                           class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800">
                           Feedback
                       </button>
                      
                       <button v-on:click="handleLikebtn" class="px-2 py-2" >
                      
                       <i v-if="likeStatus" class="fa-solid fa-heart fa-flip fa-xl" style="color: #fd0808;"></i>
                       <i v-if="!likeStatus" class="fa-regular fa-heart fa-beat-fade fa-xl" style="color: #000000;"></i>
                       </button>
                       
                       <button v-on:click="onClickPlaylist" class="px-8 py-2 rounded bg-rose-400">Add to
                           PlayList</button>
                   </div>
               </div>

           </div>
           <div class="main-2 flex flex-col  border-2">
               <div class="tab-bar w-full border-2">
                   <button v-on:click="onclickLyricsTab"
                       class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">Lyrics
                       Tab</button>
                   <button v-on:click="onclickDetailsTab"
                       class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">Details
                       Tab</button>
               </div>
               <div v-if="activeLyricsTab" class="lyrics-space w-full h-60 overflow-y-auto border-2">
                   <p v-html="songDetails.lyrics"></p>
               </div>
               <div v-if="activeDetailsTab" class="lyrics-space w-full h-60 overflow-y-auto border-2 flex flex-col">

                   <audio controls>
                       <source :src="songDetails.filename">
                       </source>
                   </audio>
                   <span>Song Name:-{{songDetails.name}}</span>
                   <span>Duration:-{{songDetails.durations}}</span>
                   <span>Artist Name:- {{songDetails.artist_name}}</span>
                   <span>Plays :-{{plays}}</span>
               </div>
           </div>



       </div>
   </div>
   <div v-if="showPlayist" class="playlist-wrapper h-screen bg-slate-200">
       <div class="max-w-md mx-auto mt-12 bg-white p-8 border rounded-md shadow-md">
           <div class="flex justify-between items-center align-middle">
               <h1 class="text-2xl font-semibold ">Choose A Playlist</h1>
               <button v-on:click="onClickPlaylist" class="text-2xl font-semibold ">❌<button>
           </div>


           <form @submit.prevent="handlePlaylistSubmit" method="post">
               <div class="mb-4 mt-7">
                   <label for="dropdown" class="block text-sm font-medium text-gray-600">Select A Playlist</label>
                   <select v-model="selectedPlaylistId" id="dropdown" name="dropdown"
                       class="mt-1 p-2 border rounded-md w-full">
                       <option selected>Choose...</option>
                       <option v-for="{id,name} in userPlayLists" :value="id">{{name}}</option>
                   </select>
               </div>

               <div class="mt-4">
                   <button type="submit"
                       class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                       Add Song To Playlist
                   </button>
               </div>
           </form>
       </div>
   </div>
   <div v-if="showFeedback" class="z-40">
       <div id="feedbackModal"
           class=" left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
           <div class="w-1/3 mx-auto bg-white rounded p-8 shadow-md">
               <div class="flex justify-end">
                   <button id="closeFeedbackModal" v-on:click="onClickFeedbackBtn"
                       class="text-gray-500 hover:text-gray-700">
                       <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                               d="M6 18L18 6M6 6l12 12"></path>
                       </svg>
                   </button>
               </div>
               <div class="mx-auto bg-white rounded p-8 shadow-md">
                   <h2 class="text-2xl font-semibold mb-4">Feedback Form</h2>
                   <form @submit.prevent="handleFeedbackSubmit" method="POST">
                       <!-- Comment Field -->
                       <div class="mb-4">
                           <label for="comment" class="block text-gray-600 font-medium">Comment:</label>
                           <textarea v-model="feedback.comment" id="comment" name="comment" rows="4"
                               class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               required></textarea>
                       </div>

                       <!-- Rating Radio Buttons -->
                       <div class="mb-4">
                           <label class="block text-gray-600 font-medium">Rating:</label>
                           <div class="flex flex-col">
                               <label class="inline-flex items-center ml-6">
                                   <input v-model="feedback.rating" type="radio" name="rating" value="1"
                                       class="form-radio" required>
                                   <span class="ml-4">⭐</span>
                               </label>

                               <label class="inline-flex items-center ml-6">
                                   <input v-model="feedback.rating" type="radio" name="rating" value="2"
                                       class="form-radio" required>
                                   <span class="ml-2">⭐⭐</span>
                               </label>

                               <label class="inline-flex items-center ml-6">
                                   <input v-model="feedback.rating" type="radio" name="rating" value="3"
                                       class="form-radio" required>
                                   <span class="ml-2">⭐⭐⭐</span>
                               </label>

                               <label class="inline-flex items-center ml-6">
                                   <input v-model="feedback.rating" type="radio" name="rating" value="4"
                                       class="form-radio" required>
                                   <span class="ml-2">⭐⭐⭐⭐</span>
                               </label>
                               <label class="inline-flex items-center ml-6">
                                   <input v-model="feedback.rating" type="radio" name="rating" value="5"
                                       class="form-radio" required>
                                   <span class="ml-2">⭐⭐⭐⭐⭐</span>
                               </label>
                           </div>
                       </div>
                       <button
                           class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
                           type="submit">Submit</button>


                   </form>


               </div>



           </div>
       </div>
   </div>   
</div>
   `,
    name:"SongDetails",
    data(){
        return{
            songId:null,
            songDetails:{},
            activeLyricsTab:true,
            activeDetailsTab:false,
            plays:0,
            showFeedback:false,
            showPlayist:false,
            showmain:true,
            userPlayLists:[],
            selectedPlaylistId:0,
            likeStatus:false,
            userId:localStorage.getItem('id'),
            feedback:{
              comment:null,
              rating:null,
            }
            
        }
    },
    methods:{
      onclickLyricsTab(){
        if(!this.activeLyricsTab){
          this.activeLyricsTab = true;
          this.activeDetailsTab=false
        }
        

      },
      onClickPlaylist(){
        if(!this.showPlayist){
          this.showPlayist=true;
          this.showmain=false
          console.log("---Feedback---",this.showFeedback)
        }else{
          this.showPlayist=false;
          this.showmain=true
        }
      },
      onclickDetailsTab(){
        if(!this.activeDetailsTab){
          this.activeLyricsTab=false
          this.activeDetailsTab = true;
          
        }

      },
      onClickFeedbackBtn(){
        console.log("-----Clicked-----")
        if(!this.showFeedback){
          this.showFeedback=true;
          this.showmain=false
          console.log("---Feedback---",this.showFeedback)
        }else{
          this.showFeedback=false;
          this.showmain=true
        }
      },
      async handleFeedbackSubmit(){
          console.log("---handleSubmit---")

          let feedbackObj={
            comment:this.feedback.comment,
            rating:this.feedback.rating,
            song_id:this.songDetails.id,
            creator_id:this.songDetails.creator_id,
            user_id:localStorage.getItem('id')
            
          }

          const resFeedback=await fetch('/feedback//v1/register',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackObj)
          })

          const data=await resFeedback.json();
          if (resFeedback.ok) {
            console.log("---feedback---")
            console.log("feedback",data)
            if(data.Status == 400){
              alert('Feedback Already Given')
            }
          }


         
      },
      async fetchUserPlaylist(){

          let user_id=localStorage.getItem('id')
          let playres=await fetch(`/song/v1/playlist/list/${user_id}`,{
            method:"GET"
          })

          let playdata=await playres.json();
          if(playres.ok){
            let data=playdata.Data;
            this.userPlayLists=data
            
          }

      },
      async handlePlaylistSubmit(){

        console.log("----Handle Playlist")

        let playObj={
          user_id:localStorage.getItem('id'),
          playlist_id:this.selectedPlaylistId,
          song_id:this.songDetails.id

        }
        console.log("playObj",playObj)

        let play=await fetch('/song/v1/map',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playObj)
        })

        let data=await play.json()
        console.log("playres",data)

        if(play.ok){
          if(data.Status == 400 || data.Status == '400'){

            alert(data.Message)
          }else{
            alert("Added to Playlist Successfully!")
            this.showPlayist=false
            this.showmain=true
          }
        }

      },
      async getLikeStatus(){
        console.log("userid",this.userId)
        console.log("songfd",this.songId)
        let statusRes=await fetch(`/like/v1/${this.songId}/${this.userId}`,{
          headers: {'Content-Type': 'application/json'},
          method:'GET'
        })

        let data=await statusRes.json()
        console.log("data",data)
        if(statusRes.ok){

          let isLiked=data.isLiked;

          if(isLiked){
            this.likeStatus=true
          }else{
            this.likeStatus=false
          }

        }
      },
      async handleLikebtn(){

        let likeObj={
          user_id:this.userId,
          song_id:this.songId,
          is_liked:this.likeStatus ? false :true
        }

        const upsertLike=await fetch(`/like/v1/upsert`,{
          headers: {'Content-Type': 'application/json'},
          method: 'PATCH',
          body: JSON.stringify(likeObj)
        })

        const data=await upsertLike.json();

        if(upsertLike.ok){

          console.log(data)
          this.likeStatus=data.isLiked
          
        }

      }
      
    },
   async mounted(){
       
        console.log("ID",this.$route.params.id)
      
        let id=this.$route.params.id
        this.songId=id;

        //API

        const res = await fetch(`/song/v1/api/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authentication-Token': localStorage.getItem('auth-token'),
            }
          })
          const songdata = await res.json()
          console.log("song Data Id",songdata)
          if (res.ok) {
            this.songDetails=songdata.Data[0]
            this.songId=songdata.Data[0].id
            this.fetchUserPlaylist()
            this.getLikeStatus()
          }

          const playres = await fetch(`/song/v1/plays`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              song_id:songdata.Data[0].id
            })
          })
          const playdata = await playres.json()
          console.log("song Data Id",playdata)
          if (res.ok) {
    
            this.plays=playdata.current_count
          }
         
    }
}