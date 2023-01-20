let url="http://localhost:3000/user";

let registerform=document.getElementById("registerform");

registerform.addEventListener("submit",(event)=>{
    event.preventDefault();
    let registerformdata=document.querySelectorAll("#registerform input");

    let obj={};

    for(let i=0;i<registerformdata.length-1;i++){
        obj[registerformdata[i].id]=registerformdata[i].value;
    }
    register(obj)
})
let register=async(obj)=>{
    try {
        let register=await fetch(`${url+"/register"}`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(register.ok){
            alert("user has registered successfully");
            // window.location.href="../html/login.html";
        }
    } catch (error) {
        console.log(error);
        console.log("Some error")
    }
}