let cartitemwrapper=document.getElementById("cartitemwrapper");
let url="http://localhost:3000/cart";

async function getcartdata(){
    try {
      let res=await fetch(`${url}`,{
        method:"GET",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":localStorage.getItem("token")
              }
      })
      let data=await res.json();
      console.log(data);
      rendercartitems(data);
      }
     catch (error) {
      console.log(error);
      console.log("something went wrong")
    }

  }
  getcartdata()

function rendercartitems(item){
    cartitemwrapper.innerHTML="";

    item.forEach((item,i)=>{
        let maindiv=document.createElement("div");
        maindiv.setAttribute("id","maindiv");

        let child1div=document.createElement("div");
        child1div.setAttribute("id","cartimgname");

        let child11div=document.createElement("div");
        let cartimg=document.createElement("img");
        cartimg.setAttribute("id","c11")
        cartimg.setAttribute("src",item.img);
        cartimg.style.width="130px";
        child11div.append(cartimg);

        let child12div=document.createElement("div");
        let cartname=document.createElement("h3");
        cartname.setAttribute("id","c12div")
        cartname.innerText=item.productname
        child12div.append(cartname);

        child1div.append(child11div,child12div)

        
        let child2div=document.createElement("div");
        child2div.setAttribute("id","plusminus");

        let child21div=document.createElement("div");
        let plus=document.createElement("button")
        plus.setAttribute("id","plus");
        plus.innerText="+"
        
        
        plus.addEventListener("click",function(){
          let id=item._id;
          getitemquantity(id).then((q)=>{
            let value=+(q)+1;
            let val=value+"";
            console.log(val);
            increasequantity(id,val);
            pmp.innerText=val;

            let totalvalue=tp*2;
            let tvalue=totalvalue+"";
            updateprice(id,tvalue);
          })
        });

        let minus=document.createElement("button")
        minus.setAttribute("id","minus")
        minus.innerText="-";

        minus.addEventListener("click",function(){
          let idd=item._id;
          getitemquantity(idd).then((q)=>{
            let valuee=+(q)-1;
            if(valuee<=0){
              return;
            }else{
              let vale=valuee+"";
              console.log(vale);
              decreasequantity(idd,vale);
              pmp.innerText=vale;
              
            }
          })
        });

        let pmp=document.createElement("span");
        pmp.setAttribute("id","spanp")
        pmp.innerText=item.quantity;
        
        child21div.append(minus,pmp,plus);

        let child22div=document.createElement("div");
        
        let remove=document.createElement("button");
        remove.addEventListener("click",function(){
          deleteitem(item._id);
          
      })
        remove.setAttribute("id","removeitem")
        remove.innerText="Remove"
        child22div.append(remove);
        child2div.append(child21div,child22div)

        

        let child3div=document.createElement("div");
        child3div.setAttribute("id","pricefee");

        let child31div=document.createElement("div");
        let span1=document.createElement("span");
        span1.setAttribute("class","spanmid1")
        span1.innerText="Price:"
        let p1=document.createElement("span");
        p1.setAttribute("class","spanmid")
        p1.innerText="₹"+item.price;
        child31div.append(span1,p1)

        let child32div=document.createElement("div");
        let span2=document.createElement("span");
        span2.setAttribute("class","spanmid1")
        span2.innerText="Shipping Fee:"
        let p2=document.createElement("span");
        p2.setAttribute("class","spanmid")
        p2.innerText="FREE";
        child32div.append(span2,p2);

        child3div.append(child31div,child32div)


        let child4div=document.createElement("div");
        child4div.setAttribute("id","inclusivetax");

        let child41div=document.createElement("div");
       let h3=document.createElement("h3");
       h3.setAttribute("id","h3ss")
       h3.innerText="₹"+item.price;
        child41div.append(h3)
        let child42div=document.createElement("div");
       let p3=document.createElement("p");
       p3.setAttribute("id","pspan")
       p3.innerText="Inclusive of all the applicable taxes"
        child42div.append(p3);
        child4div.append(child41div,child42div)


      maindiv.append(child1div,child2div,child3div,child4div)
        cartitemwrapper.append(maindiv);
    })
}
countdoc().then((res)=>spancartwrapper.innerText=res);

let spancartwrapper=document.getElementById('spancartwrapper');
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

async function deleteitem(id){
  try {
    let count=await fetch(`${url}/delete/${id}`,{
      method:"DELETE",
      headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
      }
});
if(count.ok){
  countdoc().then((res)=>spancartwrapper.innerText=res);
}
    alert("deleted");
    getcartdata();
  } catch (error) {
    console.log(error);
    console.log("some error");
  }
}

async function increasequantity(id,value){
  try {
    let count=fetch(`${url}/update/${id}`,{
      method:"PATCH",
      body:JSON.stringify({quantity:value}),
      headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
      }
  });
  if(count.ok){
    alert("increased quantity")
  }
  }
   catch (error) {
    console.log(error);
    console.log("some error");
  }
}
async function decreasequantity(id,value){
  try {
    let count=fetch(`${url}/update/${id}`,{
      method:"PATCH",
      body:JSON.stringify({quantity:value}),
      headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
      }
  });
  if(count.ok){
    alert("decreased quantity")
  }
  }
   catch (error) {
    console.log(error);
    console.log("some error");
  }
}

async function getitemquantity(id){
  try {
    let quantity=await fetch(`${url}/quantity/${id}`,{
      method:"GET",
      headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
      }
});
    let res=await quantity.json();
    return res.quantity;
  } catch (error) {
    console.log(error);
    console.log("some error");
  }
}

async function updateprice(id,val){
  try {
    let count=fetch(`${url}/updateprice/${id}`,{
      method:"PATCH",
      body:JSON.stringify({price:val}),
      headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
      }
  });
  if(count.ok){
    alert("priceupdated");
    getcartdata()
  }
  }
   catch (error) {
    console.log(error);
    console.log("some error");
  }
}