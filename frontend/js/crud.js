
let fetchproducts=document.getElementById("fetchproducts");
let category=document.getElementById("categoryfetch");
let count=document.getElementById("totalcount");
let url="http://localhost:3000/products"
fetchproducts.addEventListener("click",async ()=>{
    try {
        let all_items=await fetch(`${url}/?category=${category.value}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(all_items.ok){
            let res=await all_items.json();
            console.log(res);
            render(res);
        }
    } catch (error) {
        console.log(error);
        console.log("Something went wrong")
    }
})
let productwrapper=document.getElementById("productwrapper");
let tbody=document.querySelector("tbody");
function render(arr){
    tbody.innerHTML="";
    arr.forEach(function(elem,i){

    let row=document.createElement("tr");

    let img=document.createElement("td");
        img.innerText=`${i+1}) ${elem.img}`;
    let name=document.createElement("td");
        name.innerText=elem.productname;
    let price=document.createElement("td");
        price.innerText=elem.price;
    let old_price=document.createElement("td");
        old_price.innerText=elem.old_price;
    let discount=document.createElement("td");
        discount.innerText=elem.discount;
    let category=document.createElement("td");
        category.innerText=elem.category;
    let deletebtn=document.createElement("td");
    deletebtn.innerText="DELETE";
    deletebtn.setAttribute("id","deletebtn");
    deletebtn.setAttribute("onclick",`deletebtn("${elem._id}")`)
    let updatebtn=document.createElement("td");
    updatebtn.innerText="EDIT";
    updatebtn.setAttribute("id","updatebtn");
    updatebtn.setAttribute("onclick",`sendid("${elem._id}")`)
    tbody.append(row);
    row.append(img,name,price,old_price,discount,category,deletebtn,updatebtn);
});
}
    onload()
  countdoc().then((res)=>count.innerText=res);
  async  function onload (){
    try {
        let all_items=await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(all_items.ok){
            let res=await all_items.json();
            console.log(res);
            render(res);
        }
    } catch (error) {
        console.log(error);
        console.log("Something went wrong")
    }
};
async function countdoc(){
    try {
      let count=await fetch(`${url}/count`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")
        }
  });
      let res=await count.json();
      return res.count;
    } catch (error) {
      console.log(error);
      console.log("some error");
    }
  }
let createform=document.getElementById("createform");

createform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formdata=document.querySelectorAll("#createform input");
    let obj={};

    for(let i=0;i<formdata.length-1;i++){
        obj[formdata[i].id]=formdata[i].value;
    }
    console.log(obj)
    postdata(obj)
})
async  function postdata (data){
    try {
        let all_items=await fetch(`${url}/create`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(all_items.ok){
            alert("Product added")
            onload();
        }
    } catch (error) {
        console.log(error);
        console.log("Something went wrong")
    }
};


async function deletebtn(id){
    try {
        let all_items=await fetch(`${url}/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(all_items.ok){
            alert("Product DELETED")
            onload();
        }
    } catch (error) {
        console.log(error);
        console.log("Something went wrong")
    }
}



function sendid(id){
    localStorage.setItem("updateid",id);
    // window.location.href="../html/update.html"
    window.open("../html/update.html");
}

