let gamingitemswrappermain=document.getElementById("gamingitemswrappermain");

let url="http://localhost:3000/products";

let getgamingitems=async()=>{
    try {
        let all_items=await fetch(`${url}?category=Tshirts`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(all_items.ok){
            let res=await all_items.json();
            console.log(res);
            gamingitem(res);
        }
    } catch (error) {
        console.log(error);
        console.log("Some error");
    }
}
let getgamingitemsbyId=async(id)=>{
    try {
        let item=await fetch(`${url}?Id=${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        })
        if(item.ok){
            let res=await item.json();
            itemDetails(res);
        }
    } catch (error) {
        console.log(error);
        console.log("Some error");
    }
}
getgamingitems();
    function gamingitem(res){
    gamingitemswrappermain.innerHTML="";
    let arr=res.map(({img,productname,price,old_price,discount,_id,category})=>{
        let dis = discount.replaceAll(' ', '');
        return `
        <div>
        <img src="${img}" onClick=getgamingitemsbyId("${_id}") id="gamingitemimg">
        <h3 id="gamingitemh3">${productname}</h3>
        <div id="gamingitempod">
        <div>
        <h3 id="gamingitemh4">₹${price}<h3>
        </div>
        <div>
        <p id="gamingitemp1">₹${old_price}</p>
        </div>
        <div>
        <p id="gamingitemp2">${discount}</p>
        </div>
        </div>
        </div>
        `;
    })
    gamingitemswrappermain.innerHTML=arr.join(" ");
 }

 function itemDetails(item){
    localStorage.setItem("card_details",JSON.stringify(item))
    window.location.href="../html/product_details.html";
  }
