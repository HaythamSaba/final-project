let headerEl = document.querySelector('nav');
let textLogo = document.querySelector('nav .navbar-brand')
let blackImg = document.querySelector('nav .img2')
let whiteImg = document.querySelector('nav .img');
onscroll = _ => {
    if (scrollY > 100) {
        headerEl.classList.add("fixed-top",'bg-black', "border-bottom", "shadow-sm","text-light")
        textLogo.classList.add("text-light")
        blackImg.classList.add('d-none');
        whiteImg.classList.remove('d-none');
    } else {
        headerEl.classList.remove("fixed-top",'bg-black', "border-bottom", "shadow-sm","text-light")
        textLogo.classList.remove("text-light")
        blackImg.classList.remove('d-none');
        whiteImg.classList.add('d-none');
    }
} 
let minusBtn = document.querySelector(".quantity .minus"),
plusBtn = document.querySelector('.quantity .plus');
span = document.querySelector('span.span')
console.log(plusBtn,minusBtn)
span.innerText = Number(0);

console.log(Number(span.innerText + 1)) 

plusBtn.addEventListener('click' , _ => {
    span.innerText = Number(Number(span.innerText) + Number(1));
    console.log(span)
})
minusBtn.addEventListener('click' , _ => {
    if(span.innerText == 0){
        return;
    }
    else{
        span.innerText -= 1
    }
})
// Description and Review button 
let desc = document.querySelector('.nav .nav-item button.nav-link')
let review = document.querySelector('.nav .nav-item:last-child button.nav-link')
console.log(review)
desc.addEventListener('click' , _ =>{
    desc.classList.remove('bb');
    desc.classList.add('aa');
    review.classList.add('bb');
})
review.addEventListener('click' , _ =>{
    review.classList.remove('bb')
    review.classList.add('aa');
    desc.classList.remove('aa');
    desc.classList.add('bb')
})

//Change the Color Of the Clothes
const bigImg = document.querySelector('.big img');
const smallImages = document.querySelectorAll('.small img');
console.log(bigImg)
function changeImage(event) {
    // how to get the index of the clicked img?
    bigImg.src = event.target.src;
    const imgColor = event.target.attributes[3].value
    const imageIndex = Array.from(smallImages).indexOf(smallImages);
    console.log('Changed to image at index ' + imageIndex);
    bigImg.setAttribute('data-color',imgColor)
    // console.log(smallImages[index])

}
smallImages.forEach(img => {
    img.addEventListener('click', changeImage);
});


const colors = document.querySelectorAll('div.color');
let clothesColor = '';

function changeColor(color) {
    bigImg.src = `images/${color}.png`;
    clothesColor = color;
    console.log('changed');
    bigImg.setAttribute('data-color',color)
    console.log(bigImg.attributes)
}

colors.forEach(color => {
    color.addEventListener('click', color => {
    changeColor(color.dataset.color);
});
});

// Add items to card
const addBtn =document.querySelector('div.add')
let clothesList = JSON.parse(localStorage.getItem('clothes')) || [];
// click on the add to Card btn 
addBtn.onclick = event =>{
    event.preventDefault()
    collectData(addBtn)
}

//collect data 
function collectData(item){
    let clothesCard = item.parentElement.parentElement.parentElement;
    let clothesImg = clothesCard.querySelector('.big img').src;
    let clothesName = clothesCard.querySelector('div.t-shirt').innerText;
    let clothesPrice = clothesCard.querySelector('.price p').innerText;
    let clothesCount  = item.previousElementSibling.childNodes[3].innerText;
    let clothesColor = bigImg.attributes[2].value || 'white';
    // get the selected Option
    let clothesSize = clothesCard.querySelector('select').value;
    //check if item is exist  
    let clothesIndex = clothesList.findIndex( item => {
        return item.selectedSize == clothesSize
    }
    )
    if(clothesIndex >= 0){
        let oldCount = +clothesList[clothesIndex].count
        oldCount += clothesCount
        clothesList[clothesIndex].count = oldCount
    }
    else{
        //Creae Clothes OBJECT
        let clothesObj ={
            imgSrc : clothesImg,
            name :  clothesName,
            price : clothesPrice,
            color : clothesColor,
            count : clothesCount,
            selectedSize : clothesSize
        }
        clothesList.push(clothesObj)
    }
    localStorage.setItem('clothes', JSON.stringify(clothesList))
    showItem()
}
//show Items in Shopping Card
let cardContent = document.querySelector('.offcanvas-body .table')
console.log(cardContent)
let totalEle = document.querySelector('.total-price');
function showItem(){
    let sum = 0
    cardContent.innerHTML = '';
    clothesList.forEach((OneClothes, index) => {
        sum += OneClothes.price * OneClothes.count
        let content = `
        <div class="table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Color</th>
                                <th scope="col">Size</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <div class="product">
                                        <div class="image">
                                            <img src="${OneClothes.imgSrc}" alt="">
                                        </div>
                                        <div class="product-info">
                                            <p>${OneClothes.name}</p>
                                            <p data-id="${index}">${index++}</p>
                                        </div>
                                    </div>
                                </th>
                                <td>${OneClothes.color}</td>
                                <td>${OneClothes.selectedSize}</td>
                                <td>
                                    <div class="quantity">
                                        <button class="minus" id="minus">-</button>
                                        <span id="quan">${OneClothes.count}</span>
                                        <button class="plus" id="plus">+</button>
                                    </div>
                                </td>
                                <td>
                                    <p>$${(OneClothes.price * OneClothes.count).toFixed(2)}</p>
                                </td>
                                <td data-id=${index} onclick="delItem(${index})">
                                    <i class="fa-regular fa-xmark" style="color: #000000;"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        `  
        cardContent.innerHTML += content
    });
    totalEle.innerHTML = sum.toFixed(2);
}
showItem()
let deleteAllBtn =document.querySelector('#del');
deleteAllBtn.onclick = DeleteAll
//Delete All Items in Shopping Card
function DeleteAll(){
    localStorage.removeItem('clothes')
    clothesList = [];
    showItem()
}

//delete One Item 
function delItem(item){
    clothesList.splice(clothesList,1);
    localStorage.setItem('clothes', JSON.stringify(clothesList));
    showItem()
}


// change the quantity on shopping card
const pluss= document.querySelector('.quantity #plus'), 
minusss= document.querySelector('.quantity #minus'),
spanNum = document.querySelector('.quantity #quan')
console.log(pluss,minusss,spanNum)
spanNum.innerText = Number(1)
console.log(cardContent.innerText)
if (cardContent.innerText === null){
}
else{
    pluss.addEventListener('click' , _ => {
        console.log('clicked')
        spanNum.innerText = Number(Number(spanNum.innerText) + 1);
        console.log(spanNum)
})
minusss.addEventListener('click' , _ => {
        if(spanNum.innerText  <= 1){
        return;
    }
    else{
        spanNum.innerText -= 1
    }
})
}