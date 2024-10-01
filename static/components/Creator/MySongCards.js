export default {
    template:
    `
   
    <div class="flex flex-col w-44 bg-white rounded-md  transform transition-transform duration-400 ease-in-out hover:scale-105  hover:shadow-purple-500 hover:shadow-xl">
    <router-link :to=("/song/"+id)>
    <div class="imageContainer h-40 bg-cover">
    <img class="h-40 w-44 rounded-t-md" :src="imageURL" />
    </div>
    </router-link>
    <div class="infoContainer flex flex-col p-1">
      <span class="flex justify-center font-bold font-serif">{{name}}</span>
     
       <div class="flex justify-around ">
         <button v-on:click="editSong(id)" class="hover:text-green-400"><i class="fa-regular fa-pen-to-square"></i></button>
         <button v-on:click="deleteSong" class=""><i class="fa-solid fa-trash" style="color: #f71844;"></i></button>
        
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
      async deleteSong(){

        
          let song_id=this.id
          console.log("song_id",song_id)

        let delRes= await fetch(`/song/v1/song/${song_id}`,{
          headers: {'Content-Type': 'application/json'},
          method:'delete',
        
        })

        let dataRes=await delRes.json();

        if(delRes.ok){
          console.log("---delRes---")
          console.log(delRes)
          this.$router.push({ path:`/creator` })

        }
      },
      editSong(ids){
        this.$router.push({ path: `/edit/song/${ids}` })
      }

    },
    mounted(){
        console.log("----flag------")
        console.log(this.flag)
    },
    name:'MySongCards'

}