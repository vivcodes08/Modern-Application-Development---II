export default{

    template:
    `
    <div class=" flex  items-center justify-center bg-white">
    <div class="flex h-auto w-9/12 flex-col p-2 bg-slate-100">
      <div class="flex justify-center mb-6 mt-2 font-bold text-2xl text-red-600"><span >Create a Playlist</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-2">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Playlist Name<span class="text-rose-600">*</span> </label>
          <input name="playlistName" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Playlist Name" />
        </div>
    
        </div>
        
        <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username">Description<span class="text-rose-600">*</span> </label>
        <input name="description" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Description" />
      </div>
      
        <div class="btn flex justify-center mt-2">
        <button  name='submitbtn'  type="submit" class="p-2 bg-cyan-500 text-white font-bold rounded-sm">Create Playlist</button>
        </div>
  
      </form>  
       
    </div>
  </div>

    `,
    name:'Playlist',
    data(){
        return{

        }
    },

    methods:{
      async handleSubmit(event){

        let playObject={
          name:event.target["0"].value,
          description:event.target["1"].value,
          creator_id:localStorage.getItem('id'),
          creator_name:localStorage.getItem('username'),
        }

        console.log(playObject)

        let playres=await fetch('/song/v1/playlist',{
          method:'POST',
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
    }
}