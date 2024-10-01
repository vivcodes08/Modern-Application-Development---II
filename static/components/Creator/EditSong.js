export default{

    template:
    `
    <div class=" flex  items-center justify-center bg-white">
  <div class="flex h-auto w-9/12 flex-col p-2 bg-slate-100">
    <div class="flex justify-center mb-6 mt-2 font-bold text-2xl text-red-600"><span >Edit the Song</span></div>
    <form @submit.prevent="handleUpdateSubmit">
      <div class="grid grid-cols-2 gap-2">
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Song Name<span class="text-rose-600">*</span> </label>
        <input name="songName" v-model="songDetails.name" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Song Name" />
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Artist Name<span class="text-rose-600">*</span> </label>
        <input name="artistName" v-model="songDetails.artist_name" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Artist Name" />
      </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Genere<span class="text-rose-600">*</span> </label>
        <input name="genere" v-model="songDetails.genre" placeholder="eg. sad#motivational#soft#unplugged" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Genere" />
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Labels<span class="text-rose-600">*</span> </label>
        <input name="labels" v-model="songDetails.labels" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Label" />
      </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Image URL<span class="text-rose-600">*</span> </label>
        <input name="imageURL" v-model="songDetails.imageURL"  required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Image URL" />
      </div>
      <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Upload Song File<span class="text-rose-600">*</span> </label>
      <input disabled type="file" name="file" @change="handleFileUpload($event)"/>
      </div>
      <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="username">Album<span class="text-rose-600">*</span> </label>
      <select placeholder="Choose a Album" v-model="songDetails.album_id" class="w-96 p-1 rounded-sm px-5 shadow-sm text-grey outline-none " v-on:change="handleDropDown" v-model="dropDownValue">
        <option selected>Choose...</option>
        <option  v-for="{id,name} in albumData" :value="id">{{name}}</option>
      </select>
    </div>
    <div class="mb-4">
    <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Durations<span class="text-rose-600">*</span> </label>
    <input name="durations" v-model="songDetails.duration" required value="" class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" type="text" placeholder="Duration" />
  </div>
      </div>
      <div class=" h-96">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Lyrics<span class="text-rose-600">*</span> </label>
       <textarea id="editeditor" class="h-60 overflow-y-auto" name="lyrics"></textarea>
      </div>
      <div class="btn flex justify-center mt-2">
      <button v-if="isVisible" name='submitbtn'  type="submit" class="p-2 bg-cyan-500 text-white font-bold rounded-sm">Update the Song</button>
      </div>

    </form>  
     
  </div>
</div>
    `,
    name:"Song",
    data(){
        return{
            data:null,
            songDetails:{},
            song_id:null,
            count:0,
            isVisible:true,
            selectedFile:"",
            creator_id:localStorage.getItem('id'),
            albumData:[],
            dropDownValue:0,
        }
    },
    methods:{
        async handleSubmit(data){
          var myContent = window.tinymce.get("editor").getContent();
        console.log('myContent',myContent);
          



            console.log("data",data)
            let SongObj={
              name:data.target["0"].value,
              creator_name:localStorage.getItem("username"),
              artist_name:data.target["1"].value,
              creator_id:localStorage.getItem('id'),
              genere:data.target["2"].value,
              labels:data.target["3"].value,
              image:data.target["4"].value,
              durations:data.target["5"].value,
              lyrics:myContent,
              album_id:this.dropDownValue
            }
            console.log("SongObj",SongObj)
            const formData= new FormData();
            formData.append('file',this.selectedFile)
            formData.append('name',SongObj.name)
            formData.append('creator_name',SongObj.creator_name)
            formData.append('artist_name',SongObj.artist_name)
            formData.append('creator_id',SongObj.creator_id)
            formData.append('genere',SongObj.genere)
            formData.append('image',SongObj.image)
            formData.append('durations',SongObj.durations)
            formData.append('lyrics',SongObj.lyrics)
            formData.append('labels',SongObj.labels)
            formData.append('album_id',SongObj.album_id)

            const res = await fetch('/song/v1/api', {
              method: 'POST',
              body:formData
            })
            const songdata = await res.json()
            console.log("song Data",songdata)
            if (res.ok) {
              console.log("Song Created Successfully")
              this.$router.push({ path: '/dashboard' })
            }
        
    
        },
        async handleUpdateSubmit(data){
          let myeditContent = window.tinymce.get("editeditor").getContent();
          console.log("Edit Content",myeditContent);
          let songObj={
            name:this.songDetails.name,
            artist_name:this.songDetails.artist_name,
            genre:this.songDetails.genre,
            imageURL:this.songDetails.imageURL,
            album_id:this.dropDownValue,
            durations:this.songDetails.duration,
            labels:this.songDetails.labels,
            lyrics:myeditContent

          }
         //  /song/v1/api/edit/1
          console.log("Song Update Objext",songObj);

          let songUpdate=await fetch(`/song/v1/api/edit/${this.song_id}`,{
            method:'PATCH',
            headers:{
              'content-type':'application/json',
              'Authentication-Token': localStorage.getItem('auth-token'),
            },
            body:JSON.stringify(songObj)
          })

          let songUpdateResponse=await songUpdate.json()

          if(songUpdate.ok){
            console.log("Song Update Success",songUpdateResponse);

            this.$router.push({path:'/creator/mysongs'})
          }

        },
        handleFileUpload(e) {
          console.log("---------On File Change-----")
          const selectedFile = e.target.files[0]; // accessing file
          this.selectedFile = selectedFile;
        },
        async getAlbumDropDown(){

          let albumres=await fetch(`/album/v1/list/${this.creator_id}`,{
            method:"GET",
          })
          let data=await albumres.json();

          if(albumres.ok){
            console.log("---Album Fetced ---");
            let albumDataArray=data.Data;
            this.albumData=albumDataArray;
            
          }
        },
        handleDropDown(){
          console.log("Dropdown value", this.dropDownValue)
        }
    },
    async mounted(){
    
    console.log("Song ID",this.$route.params.id)
    let ids=this.$route.params.id
    this.song_id=ids
        
      console.log("---Mounted-------")
      this.getAlbumDropDown();

      let songDetails=await fetch(`/song/v1/api/${ids}`,{
        method: 'GET',
        headers:{
          'Authentication-Token': localStorage.getItem('auth-token'),
        }
      })

      let songDetailsData=await songDetails.json();
      

      if(songDetails.ok){

        let data=songDetailsData.Data[0];
        this.songDetails = data;
        

      }
      
     tinymce.init({
        selector: '#editeditor',
        plugins: '',
        toolbar: 'undo redo | save |blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        save_onsavecallback: (data) => {
          console.log('Saved',data);
        },
        init_instance_callback:function(editor){
          console.log("Editor has been called")
          console.log("Editor",editor)
          console.log("lyrics",songDetailsData.Data[0].lyrics)
          editor.setContent(songDetailsData.Data[0].lyrics)
          
          // editor.on('init',function(){
          //   console.log("Inside editor")
          //   editor.setContent("Vivek is the best")
          // })
        },
        tinycomments_author: 'Vivek Rao',
        height: "350",
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ]
      });

     
     
    },
    unmounted(){
      console.log('----Unmounted---');
      tinymce.remove()
    }
   
}