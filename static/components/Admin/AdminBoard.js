export default{

    template:
    `
    <div class="bg-gray-100 p-4 flex flex-col gap-6">
    <div class="Heading justify-center p-4 flex items-center"><span class="text-4xl font-extrabold text-blue-600 ">Admin's DashBoard </span></div>
    <div class="flex justify-center">
        <div class="w-full grid grid-cols-3 gap-12 justify-centerspace-y-4">

            <!-- Card 1: Create A Song -->
            <router-link to="/admin/allalbums">
            <div class="transition-transform transform hover:-translate-y-2  bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="rounded-full text-white">
                <i class="fa-solid fa-compact-disc fa-flip fa-2xl" style="color: #040605;"></i>
                </div>
                <div class="Heading">
                    <h1 class="text-xl  font-bold">All Albums</h1>
                </div>
            </div>
            </router-link>

            <router-link to="/admin/allsongs">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                <i class="fa-solid fa-music fa-beat-fade fa-xl"></i>
                </div>
                <div class="Heading">
                    <h1 class="text-xl  font-bold">All Songs</h1>
                </div>
            </div>
            </router-link>

            


            <button v-on:click="downloadReports">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                <i class="fa-solid fa-chart-simple fa-bounce fa-xl"></i>
                </div>
                <div class="Heading">
                    <h1 class="text-xl  font-bold">Reports</h1>
                </div>
            </div>
            </button>



            <a href="/api/docs" target="_blank">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                <i class="fa-solid fa-book fa-fade fa-2xl"></i>
                </div>
                <div class="Heading">
                
                    <h1 class="text-xl  font-bold">Swagger Documentation</h1>
                </div>
            </div>
            </a>

            <button v-on:click="generateMail">
            <div class="transition-transform transform hover:-translate-y-2 bg-white rounded-lg w-72 flex flex-col gap-4 items-center justify-center h-40 shadow-md">
                <div class="button  rounded-full">
                <i class="fa-regular fa-envelope fa-flip fa-2xl"></i>
                </div>
                <div class="Heading">
                    <h1 class="text-xl  font-bold">Mail Report</h1>
                </div>
            </div>
            </button>



        </div>
    </div>

</div>   

    `,
    name:"AdminBoard",
    data(){
        return{
            username:localStorage.getItem('username'),
            user_id:localStorage.getItem('id')
        }
        

    },
    methods:{

        async downloadReports(){

            let downloadReportsCall = fetch(`/stats/creator/songs/views`,{
                method: "GET",
            })
    
            downloadReportsCall
            .then(response => response.blob())
            .then(blob=>{
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Reports.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
    
            
    
        },
        async generateMail(){
            
            let res=await fetch(`/job/all/app/report`)
            let data=await res.json();

            if(res.ok){
                console.log("Data",data)
                alert(`With Reference to Task Id ${data.TaskId} Mail will be sent shortly`)
            }
        }

    }
}