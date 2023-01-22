let arrow = document.getElementById("p-arrow");
let pattern_arrow = document.querySelector("#pattern-arrow");
pattern_arrow.style.display = "block"

setInterval(() => {
  if (pattern_arrow.style.display == "block") {
    arrow.addEventListener("click", function () {
      pattern_arrow.style.display = "none"
      arrow.style.transform="rotate(360deg)"
    })
  }
  else {
    arrow.addEventListener("click", function () {
      pattern_arrow.style.display = "block"
      arrow.style.transform="rotate(90deg)"
      
    })
  }
}, 1)

let c_arrow = document.getElementById("c-arrow");
let color_arrow = document.querySelector("#color-arrow");
color_arrow.style.display = "block"

setInterval(() => {
  if (color_arrow.style.display == "block") {
    c_arrow.addEventListener("click", function () {
      color_arrow.style.display = "none"
      c_arrow.style.transform="rotate(360deg)"
    })
  }
  else {
    c_arrow.addEventListener("click", function () {
      color_arrow.style.display = "block"
      c_arrow.style.transform="rotate(90deg)"
      
    })
  }
}, 1)

let s_arrow = document.getElementById("s-arrow");
let size_arrow = document.querySelector("#size-arrow");
size_arrow.style.display = "block"

setInterval(() => {
  if (size_arrow.style.display == "block") {
    s_arrow.addEventListener("click", function () {
      size_arrow.style.display = "none"
      s_arrow.style.transform="rotate(360deg)"
    })
  }
  else {
    s_arrow.addEventListener("click", function () {
      size_arrow.style.display = "block"
      s_arrow.style.transform="rotate(90deg)"
      
    })
  }
}, 1)

let designer_arrow  = document.getElementById("designer_arrow");
let search_icon= document.querySelector("#search-icon");
search_icon.style.display = "block"

setInterval(() => {
  if (search_icon.style.display == "block") {
    designer_arrow.addEventListener("click", function () {
      search_icon.style.display = "none"
      designer_arrow.style.transform="rotate(360deg)"
    })
  }
  else {
    designer_arrow.addEventListener("click", function () {
      search_icon.style.display = "block"
      designer_arrow.style.transform="rotate(90deg)"
      
    })
  }
}, 1)