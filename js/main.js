const elCardTemplate = document.querySelector("#card-template");
const elCardWrapper = document.querySelector(".card-wrapper")
// const elCardBenefitsWrapper = document.querySelector(".benefits")


const addZero = (num)=>{
  return num < 10 ? "0" + num : num 
}

const createCardBox = (card) => {
  const elCardBox = elCardTemplate.cloneNode(true).content;

  const elCardTitle = elCardBox.querySelector('.card-title')
  elCardTitle.textContent = card.title;

  const elCardPrice = elCardBox.querySelector('.price')
  elCardPrice.textContent = card.price;

  const elCardSPrice = elCardBox.querySelector('.sprice')
  elCardSPrice.textContent = card.price;


  const elCardModel = elCardBox.querySelector('.item-model')
  elCardModel.textContent = card.model;
  
  const elCardAddedDate = elCardBox.querySelector('.addedDate')
  const cardDate = new Date(card.addedDate)
  elCardAddedDate.textContent = `${addZero(cardDate.getDay())}.${addZero(cardDate.getDate())}.${cardDate.getFullYear()} `;


  const elCardLowMemory = elCardBox.querySelector('.low-memory')
  elCardLowMemory.textContent = card.benefits[0];


  const elCardHighMemory = elCardBox.querySelector('.high-memory')
  elCardHighMemory.textContent = card.benefits[1];

  const elCardBenefit = elCardBox.querySelector('.benefit')
  elCardBenefit.textContent = card.benefits[2];

  const elExtraBenefit = elCardBox.querySelector('.extra-benefit')
  elExtraBenefit.textContent = card.information;





  return elCardBox;
}

// products.forEach(card => {
//   const createCardBox = elCardBox(card)
// });

elCardWrapper.appendChild(createCardBox(products[0]))





 
// console.log(createCardBox(products[1]));