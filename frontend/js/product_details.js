
let url="http://localhost:3000/cart";
let prod = JSON.parse(localStorage.getItem("card_details"));

let image = document.getElementById("slide");
let image1 = document.getElementById("img1");
let image2 = document.getElementById("img2");
let image3 = document.getElementById("img3");

let name = document.getElementById("tabname");

let actual = document.getElementById("actual");
let orig = document.getElementById("original");
let off = document.getElementById("taboff");

image.src = prod.img;
image1.src = prod.img;

name.textContent = prod.productname;
actual.textContent = `₹${prod.price}*`;
orig.textContent = `₹${prod.old_price}`;
off.textContent = `${prod.discount}`;

function cartme() {
  let card_detail=JSON.parse(localStorage.getItem("card_details"))
  card_detail.quantity=1;
  let id=card_detail._id;
  
  checkduplicate(id).then((r)=>{
    if(r.length>0){
      alert("Item is already in the cart")
    }else{
      addtocart(card_detail)
    }
  })
  document.getElementById("carted").innerText = "Added to Cart";
}

async function addtocart(payload){
  try {
    let res=await fetch(`${url}/create`,{
      method:"POST",
      body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
    })
    if(res.status){
      alert("Item is added to cart")
    }
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
}

async function checkduplicate(id){
  try {
    let res=await fetch(`${url}?ID=${id}`,{
      method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
    })
    let data=await res.json();
    return data;
    }
   catch (error) {
    console.log(error);
    console.log("something went wrong")
  }
}