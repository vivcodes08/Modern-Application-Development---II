export default{

    template:
    `
    <div class=" flex  items-center justify-center bg-white">
    <div class="flex h-auto w-9/12 flex-col p-2 bg-slate-100">
      <div class="flex justify-center mb-6 mt-2 font-bold text-2xl text-red-600"><span >Edit a Playlist</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-2">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Playlist Name<span class="text-rose-600">*</span> </label>
          <input name="playlistName" v-model="name" required class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Playlist Name" />
        </div>
    
        </div>
        
        <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username">Description<span class="text-rose-600">*</span> </label>
        <input name="description" v-model="description" required  class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Description" />
      </div>
      
        <div class="btn flex justify-center mt-2">
        <button  name='submitbtn'  type="submit" class="p-2 bg-cyan-500 text-white font-bold rounded-sm">Update Playlist</button>
        </div>
  
      </form>  
       
    </div>
  </div>

    `,
    name:'Playlist',
    data(){
        return{
            name:"",
            description:"",
            user_id:localStorage.getItem('id'),
            playlist_id:null


        }
    },
    methods:{
      async handleSubmit(event){

        let playObject={
            name:this.name,
            description:this.description,
            id:this.playlist_id
        }

        console.log(playObject)

        let playres=await fetch('/song/v1/playlist',{
          method:'PATCH',
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(playObject)
  
        })

        let data=await playres.json()

        if(playres.ok){
          console.log(data)
          console.log(" Playlist Created Successfully")
          this.$router.push({ path: '/dashboard' })
        }
      }
    },
    async mounted(){

        console.log("Playlist ID",this.$route.params.id)
        let id=this.$route.params.id
        this.playlist_id=id
        let user_id=localStorage.getItem('id')
        console.log("--Before REqusetion----")
        let resdata=await fetch(`/song/v1/playlist/list/${user_id}`,{
            method:'GET'

        })

        let resJSON=await resdata.json()

        console.log("---After REqusetion----", resJSON)

        if(resdata.ok){

            let albumRes=resJSON.Data.filter(element=>element.id == id)
            console.log("albumRes: ", albumRes)
            let name1=albumRes[0].name
            let description1=albumRes[0].description
            this.name=name1
            this.description=description1

        }
        



    }
}