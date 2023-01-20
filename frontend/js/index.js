let img = [
    "https://cdn.shopclues.com/images/banners/2023/Jan/19/HB2_AutomotiveSale_Web_Esha_19Jan23.jpg",
    "https://cdn.shopclues.com/images/banners/2023/Jan/19/HB2_AutomotiveSale_Web_Esha_19Jan23.jpg",
    "https://cdn.shopclues.com/images/banners/2023/Jan/19/HB3_Prebuzz_Web_SYM_19Jan23.jpg",
    "https://cdn.shopclues.com/images/banners/2023/Jan/19/JMAX_HB2_Web_Riya_19Jan22.jpg",
    "https://cdn.shopclues.com/images/banners/2023/Jan/11/ShopcluesPCRefresh_Web_SYM_11Jan23.jpg"
  ]

var i = 1
let cont = document.getElementById("slider")

cont.innerHTML = `<img src=${img[0]} alt="img${i}" class="sliderimg">`

function timeslider(){
  cont.innerHTML = `<img src=${img[i]} alt="img${i}" class="sliderimg">`
  i++;
  if (i == img.length) {
      i = 0
  }
}

let id=setInterval(timeslider,1500);

let slidermain=document.getElementById("slider-deals");
let item=slidermain.getElementsByClassName("item");

function next1(){
    slidermain.append(item[0]);
}

function prev1(){
    slidermain.prepend(item[item.length-1])
}
let slidermain1=document.getElementById("slider-deals2");
let item2=slidermain1.getElementsByClassName("item2");

function next11(){
    slidermain1.append(item2[0]);
}

function prev11(){
    slidermain1.prepend(item2[item2.length-1])
}
