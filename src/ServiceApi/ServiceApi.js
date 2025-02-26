import  {client} from "../ClientApi/Client"

export async function GetMemberShip(){
    try{
        const payLoad={
            method:"GET",
            url:'http://localhost:8090/getMemberShip',
            data:null
        }
        const response=await client(payLoad)
        return response
    }
    
    catch{
        console.log("Error Message 404")
    }

}

export async function GetCarModel(){
    try{
        const payLoad={
            method:'post',
            url:'http://localhost:8090/getCarModel',
            data:null
        }
        const response=await client(payLoad)
        return response
    }
    catch{
        console.log("Error Message 404 in carmodel")
    }
}
export async function GetLocation(membership){
   try{ 
    console.log(typeof(membership),"i am location");
   const payLoad={
       method:'post',
       url:'http://localhost:8090/getLocation',
       data:{MemberValue:membership}
   }
   debugger
   //const response=await clientLoction(payLoad)
   const response=await client(payLoad)
   
   console.log(response.log)
   return response}

    catch{
        console.log("Error Message 404")
    }
}
export async function PostUserData(formData){
    debugger
    try{
        const payLoad={
            method:'post',
            url:'http://localhost:8090/postUserData',
            data:formData
        }
        console.log(payLoad,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        
        const response=await client(payLoad)
        return response
    }
    catch{
        console.log("Error Message 404 in post")
    }
}
export async function UpdateUserData(formData){
   try
        { 
            const payLoad={
            method:'post',
            url:'http://localhost:8000/update/updateuserdata',
            data:formData
            }
            const response=await client(payLoad)
            return response
    }
    catch{
        console.log("error Message 404")
    }   

}
export async function getDataApi(tableDataPayLoad){
    try{
        debugger
        console.log(tableDataPayLoad)
        const payLoad={
            method:'post',
            url:'http://localhost:8090/getUserData',
            data:tableDataPayLoad
        }
        const response=await client(payLoad)
        console.log("getgriddata")
        return response
    }
    catch{
        console.log("Error message in >>>GetGridData<<<")
    }
}

//Login

export async function loginUserData(logindata){
    try{
        debugger
        const payLoad={
            method:'post',
            url:'http://localhost:8500/login/loginUser',
            data:logindata
        }
        const response=await client(payLoad)
        return response
    }
    catch{
        const response='Error 404'
        return response
    }
}