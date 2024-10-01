export default{

    template:
    `
    <div class="bg-gray-100 h-screen">

    <div class="container mx-auto p-8 mt-8 bg-white shadow-md rounded-md max-w-md animate__animated animate__fadeIn">
    
            <h1 class="text-2xl font-bold mb-4">My Profile</h1>
    
            <!-- Full Name -->
            <div class="mb-4">
                <label for="fullName" class="block text-sm font-medium text-gray-600">Full Name</label>
                <p id="fullName" class="text-lg font-semibold">{{username}}</p>
            </div>
    
            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <p id="email" class="text-lg font-semibold">{{email}}</p>
            </div>
    
            <!-- Role -->
            <div class="mb-8">
                <label for="role" class="block text-sm font-medium text-gray-600">Role</label>
                <p id="role" class="text-lg font-semibold">{{roles}}</p>
            </div>
    
        </div>
    
    
      </div>
    `,
    name:"UserProfile",
    data(){
        return{
            id:localStorage.getItem("id"),
            username:localStorage.getItem("username"),
            roles:localStorage.getItem("roles"),
            email:localStorage.getItem("email")
        }
    }
}