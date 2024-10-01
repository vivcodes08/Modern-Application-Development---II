export default  {

    template:
    `

    <div class=" flex  items-center justify-center bg-white">
    <div class="flex h-auto w-9/12 flex-col p-2 bg-slate-100">
      <div class="flex justify-center mb-6 mt-2 font-bold text-2xl text-red-600"><span >Edit the Album</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-2">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Album Name<span class="text-rose-600">*</span> </label>
          <input name="name" v-model="name" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Album Name" />
        </div>
        </div>
        
      
    
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Image URL<span class="text-rose-600">*</span> </label>
          <input name="imageURL" v-model="imageURL" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Image URL" />
        </div>
        <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username">Description<span class="text-rose-600">*</span> </label>
        <input name="description" v-model="description" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Description" />
      </div>
      
        <div class="btn flex justify-center mt-2">
        <button  name='submitbtn'  type="submit" class="p-2 bg-cyan-500 text-white font-bold rounded-sm">Update the Album</button>
        </div>
  
      </form>  
       
    </div>
  </div>

    `,
    name:'EditAlbum',
    data(){
        return{
            album_id:null,
            user_id:localStorage.getItem('id'),
            name:"",
            imageURL:"",
            description:""
        }

    },
    methods:{

      async handleSubmit(event){


        let albumObject={
          name:this.name,
          imageURL:this.imageURL,
          description:this.description
         

        }

        console.log(albumObject,"albumObject")

        let albumres=await fetch(`/album/v1/${this.album_id}`,{
          method: "PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(albumObject)
        })

        let data=await albumres.json()

        if(albumres.ok){
          console.log("Album UPDATED Successfully")
          this.$router.push({ path: '/dashboard' })
        }
      }

    },
    async mounted(){

        console.log("Album ID",this.$route.params.id)
        let id=this.$route.params.id
        this.album_id=id

        let alRes=await fetch(`/album/v1/list`,{
            method: 'GET',
        })

        let data=await alRes.json()

        if(alRes.ok){

            let albumData=data.Data.filter(element=>element.id == id)
            this.name=albumData[0].name
            this.imageURL=albumData[0].imageURL
            this.description=albumData[0].description
        }
    }

}