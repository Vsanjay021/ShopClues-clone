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

function slider(){
  cont.innerHTML = `<img src=${img[i]} alt="img${i}" class="sliderimg">`
  i++;
  if (i == img.length) {
      i = 0
  }
}

let id=setInterval(slider,1500);