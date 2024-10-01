export default {
    template:
    `
   
    <div class="flex flex-col w-44 bg-white rounded-md  transform transition-transform duration-400 ease-in-out hover:scale-105  hover:shadow-purple-500 hover:shadow-xl">
    <router-link :to=("/admin/songs/album/"+id)>
    <div class="imageContainer h-40 bg-cover">
    <img class="h-40 w-44 rounded-t-md" :src="imageURL" />
    </div>
    </router-link>
    <div class="infoContainer flex flex-col p-1">
      <span class="flex justify-center font-bold font-serif">{{name}}</span>
      
       <div class="flex justify-around ">
         <button v-on:click="editAlbum(id)" class="hover:text-green-400"><i class="fa-regular fa-pen-to-square"></i></button>
         <button v-on:click="deleteAlbum" class=""><i class="fa-solid fa-trash" style="color: #f71844;"></i></button>
        
       </div> 
    </div>
  </div>
 
    `,
    props: ['name','imageURL','id','artist_name'],
    data(){
        console.log("song",this.props)
        return{
            image:null,
            user_id:localStorage.getItem('id'),
            
        }

    },
    methods:{
      async deleteAlbum(){

        
          let album_id=this.id
          console.log("album_id",album_id)

        let delRes= await fetch(`/album/v1/${album_id}`,{
          headers: {'Content-Type': 'application/json'},
          method:'delete',
        
        })

        let dataRes=await delRes.json();

        if(delRes.ok){
          console.log("---delRes---")
          console.log(delRes)
          this.$router.push({ path:`/admin` })

        }
      },
      editAlbum(ids){
        this.$router.push({ path:`/admin/edit/albums/${ids}` })
      }

    },
    mounted(){
        console.log("----flag------")
        console.log(this.flag)
    },
    name:'AllAlbumsCards'

}