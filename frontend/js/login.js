let inputloginform=document.getElementById("inputloginform");

inputloginform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let inputloginformdata=document.getElementById("phonenumber");
    let inputid=inputloginformdata.id;
    let obj={
        [inputid]:inputloginformdata.value
    }

    loginotp(obj);
})

let loginotp=async (obj)=>{
    try {
        let register=await fetch(`${url+"/login"}`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(register.ok){
            // let res=register.json();
            // console.log(res);
            alert("OTP SENT");
            localStorage.setItem("phonenumber",obj.phonenumber);
            inputloginform.innerHTML=`
            <input type="text" placeholder="ENTER OTP" id="inputenterotp">
            </div>
            `
            // window.location.href="../html/user.html";
        }else{
            inputdiv.innerHTML="";
        }
    } catch (error) {
        console.log(error);
        alert("Some error")
    }
}


let inputloginform2=document.getElementById("inputloginform2");

inputloginform2.addEventListener("submit",(e)=>{
    e.preventDefault();
    let phonenumber=localStorage.getItem("phonenumber");
    let code=document.getElementById("inputenterotp").value
    let obj={
        phonenumber,
        code
    }
    verifyotp(obj);
    inputloginform2.reset();
})

async  function  verifyotp(obj){
    try {
        let loginotp=await fetch(`${url+"/verifyotp"}`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(loginotp.ok){
           let loginres= await loginotp.json();
           localStorage.setItem("token",loginres.token)
           localStorage.setItem("userdetails",JSON.stringify(loginres.userdetails));
           alert(loginres.msg);
            window.location.href="../html/user.html";
        }else{
            inputdiv.innerHTML="";
        }
    } catch (error) {
        console.log(error);
        alert("Some error")
    }
}