headerEl = document.querySelector('.header nav')
console.log(headerEl)
onscroll = _ => {
    if (scrollY > 100) {
        headerEl.classList.add("fixed-top",'bg-black', "border-bottom", "shadow-sm")
    } else {
        headerEl.classList.remove("fixed-top",'bg-black', "border-bottom", "shadow-sm")
    }
  }
let Men = document.querySelector('.navbar-nav .nav-item .men');
let menu = document.querySelector('.megamenu')
// console.log(Men)
Men.addEventListener('click' , _ =>{
    menu.classList.toggle('click')
})



// 
let mainEl = document.querySelector('.info');
onload = _ => {
    mainEl.classList.remove('hide')
}
//change img path 
let main = document.querySelector('.header .main-section')
console.log(main)
console.log(window.innerWidth)

// Get a reference to the element with the background image
// Function to update the background image based on innerWidth
function updateBackgroundImage() {
    if (window.innerWidth <= 600) {
    main.classList.add('special-bg');
    main.classList.remove('default-bg');
    } else {
    main.classList.add('default-bg');
    main.classList.remove('special-bg');
    }
}
// Call the function to set the initial background image
updateBackgroundImage();
// Listen for window resize events and update the background image accordingly
main.addEventListener('resize', updateBackgroundImage);

//toggle General Section
let sec = document.querySelector('.general-sec')
let img1 = document.querySelector('.general-sec .box:first-child')
let img2 = document.querySelector('.general-sec .box:nth-child(2)')
let img3 = document.querySelector('.general-sec .box:last-child')
let content1 = document.querySelector('.general-sec .box:first-child .content')
let content2 = document.querySelector('.general-sec .box:nth-child(2) .content')
let content3 = document.querySelector('.general-sec .box:last-child .content')
img1.addEventListener('click', _ => {
    sec.style.gridTemplateColumns = '608px 302px 302px';
    img1.style.backgroundSize = 'cover';
    img1.style.backgroundPosition = 'center';
    content2.style.marginTop = '55%'
    content3.style.marginTop = '60%'
})
img2.addEventListener('click', _ => {
    sec.style.gridTemplateColumns = '302px 608px 302px';
    img2.style.backgroundSize = 'cover';
    content2.style.marginTop = '20%'
    content3.style.marginTop = '60%'
})
img3.addEventListener('click', _ => {
    sec.style.gridTemplateColumns = '302px 302px 608px';
    img3.style.backgroundSize = 'cover';
    img3.style.backgroundPosition = 'center';
    content3.style.marginTop = '20%'
})
//Scroll
const navEl = document.querySelector('.navbar')
let goUpBtn = document.querySelector('button#go-up')
onscroll = _ =>{
    if(scrollY > 500){
        navEl.classList.add('fixed-top','bg-black')
        goUpBtn.classList.remove('d-none')
    }else{
        navEl.classList.remove("fixed-top","bg-black")
        goUpBtn.classList.add('d-none')
    }
}
// go Up button
goUpBtn.onclick = _ =>{
    window.scrollTo({ top : 0, behavior:'smooth' })
}