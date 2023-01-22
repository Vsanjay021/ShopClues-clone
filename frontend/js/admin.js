let input1=document.getElementById("email")
let input2=document.getElementById("password")
let button=document.querySelector(".btn");
let url="http://localhost:3000/admin"

button.addEventListener("click",(e)=>{
    e.preventDefault();
    let obj={
        email:input1.value,
        password:input2.value
    };
    adminlogin(obj)
})


let adminlogin=async (obj)=>{
try {
    let login=await fetch(`${url+"/login"}`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(login.ok){
        alert("login successfull");
        window.location.href="../html/productcrud.html";
    }
} catch (error) {
    console.log(error);
    alert("Some error")
}
}


