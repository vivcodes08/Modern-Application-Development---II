export default  {

    template:
    `

    <div class=" flex  items-center justify-center bg-white">
    <div class="flex h-auto w-9/12 flex-col p-2 bg-slate-100">
      <div class="flex justify-center mb-6 mt-2 font-bold text-2xl text-red-600"><span >Create the Album</span></div>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-2">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Album Name<span class="text-rose-600">*</span> </label>
          <input name="albumName" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Album Name" />
        </div>
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Artist Name<span class="text-rose-600">*</span> </label>
          <input name="artistName" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Artist Name" />
        </div>
        </div>
        
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Labels<span class="text-rose-600">*</span> </label>
          <input name="labels" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Label" />
        </div>
    
        <div class="mb-4">
          <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Image URL<span class="text-rose-600">*</span> </label>
          <input name="imageURL" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Image URL" />
        </div>
        <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username">Description<span class="text-rose-600">*</span> </label>
        <input name="description" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Description" />
      </div>
      
        <div class="btn flex justify-center mt-2">
        <button  name='submitbtn'  type="submit" class="p-2 bg-cyan-500 text-white font-bold rounded-sm">Produce the Album</button>
        </div>
  
      </form>  
       
    </div>
  </div>

    `,
    name:'Album',
    data(){

    },
    methods:{

      async handleSubmit(event){

        console.log("Event--",event)

        let albumObject={
          name:event.target["0"].value,
          artistName:event.target["1"].value,
          labels:event.target["2"].value,
          imageURL:event.target["3"].value,
          description:event.target["4"].value,
          creator_id:localStorage.getItem("id"),
          creator_name:localStorage.getItem("username")

        }

        console.log(albumObject,"albumObject")

        let albumres=await fetch('/album/v1/register',{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(albumObject)
        })

        let data=await albumres.json()

        if(albumres.ok){
          console.log("Album Created Successfully")
          this.$router.push({ path: '/dashboard' })
        }
      }

    }

}