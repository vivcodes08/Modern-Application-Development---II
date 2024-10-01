export default {
    template:
    `
    <router-link :to="songUrl" >
    <div class="flex items-centerjustify-center mb-2 ">
        <div class="main rounded-md h-48 w-44 drop-shadow-xl shadow-black bg-slate-100">
            <div class="image rounded-md h-40 ">
                <img class="h-40 w-44 rounded-t-md" :src="imageURL" />
            </div>
            <div class="info flex items-center justify-center">
                <span class="font-bold font-sans ">{{name}}</span>
            </div>
        </div>
  </div>
  </router-link>
    `,
    props: ['name','imageURL','id'],
    data(){
        console.log("song",this.props)
        
        return{
            image:null,
            songUrl:`/song/${this.id}`
        }

    },
    name:'SongCard'

}