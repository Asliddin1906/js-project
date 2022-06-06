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
  
  const elCardId = elCardBox.querySelector(".card-id")
  elCardId.textContent=card.id;
  
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
  
  
  const elDeleteBtn = elCardBox.querySelector(".delete-btn")
  elDeleteBtn.dataset.id = card.id;
  
  const elEditBtn = elCardBox.querySelector(".edit-btn")
  elEditBtn.dataset.id = card.id;
  
  
  return elCardBox;}
  
  
  const renderProducts = (cardsArray = products) =>{
    elCardWrapper.innerHTML= "";
    
    cardsArray.forEach((card) => {
      const elCardBox = createCardBox(card);
      elCardWrapper.append(elCardBox);
    });
  }
  
  renderProducts();
  
  const elAddCArdForm = document.querySelector("#add-product-form")
  const elAddProductModal = document.querySelector("#add-product-modal")
  
  elAddCArdForm.addEventListener("submit", evt =>{
    evt.preventDefault();
    
    const formElements = evt.target.elements;
    
    const titleInpVal = formElements[0].value.trim();
    const priceInpVal = +formElements[1].value.trim();
    const benefitsInpVal = formElements[3].value.trim();
    
    if (titleInpVal && priceInpVal && benefitsInpVal > 0){
      const addingCard = {
        id: Math.floor(Math.random()*1000),
        title: titleInpVal,
        price:priceInpVal,
        addedDate: new Date().toISOString(),
        benefits: benefitsInpVal.split(' ')
      }
      products.unshift(addingCard);
      
      const elNewCard = createCardBox(addingCard)
      elCardWrapper.prepend(elNewCard)
    }
    addProductModal.hide();
  })
  
  
  
  const elEditForm = document.querySelector("#edit-product-form")
  const elEditTitle =document.querySelector("#edit-title")
  const elEditPrice = document.querySelector("#edit-price")
  const elEditManufacture = document.querySelector("#edit-manufacturer")
  const elEditBenefits = document.querySelector("#benefits")
  const elEditModal = document.querySelector("#edit-product-modal")
  const editModal = new bootstrap.Modal(elEditModal)
  const addProductModal = new bootstrap.Modal(elAddProductModal)
  
  
  
  elCardWrapper.addEventListener("click", evt=>{
    if(evt.target.matches(".delete-btn")){
      const clickedBtnId = +evt.target.dataset.id;
      const clickedBtnIndex = products.findIndex((card)=>{
        return card.id === clickedBtnId;
      });
      products.splice(clickedBtnIndex, 1)
      
      renderProducts();
    }
    
    if(evt.target.matches(".edit-btn")){
      const clickedBtnId = +evt.target.dataset.id;
      const clickedBtnObj = products.find((card) => card.id === clickedBtnId);
      
      // console.log(clickedBtnId);
      if (clickedBtnObj) {
        elEditTitle.value = clickedBtnObj.title || "";
        elEditPrice.value =clickedBtnObj.price || ""; 
        elEditBenefits.value = clickedBtnObj.benefits || "";
        elEditManufacture.value = clickedBtnObj.model;
        
        elEditForm.dataset.id = clickedBtnId;
        
      }
    }
  })
  elEditForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const submittingItemId = +evt.target.dataset.id;
    
    const titleVal = elEditTitle.value.trim();
    const priceVal = elEditPrice.value.trim();
    const benefitsVal = elEditBenefits.value.trim();
    const manafucture = elEditManufacture.value.trim();
    // const manufactureVal = elEditManufacture.value.trim();
    
    if(titleVal && priceVal){
      const submittingItemIndex = products.findIndex(card => card.id === submittingItemId);
      
      const submittingItemObj = {
        id:submittingItemId,
        title:titleVal,
        price:priceVal,
        manufacturers:manafucture,
        addedDate: new Date(),
        benefits: benefitsVal.split(' ')
      } 
      products.splice(submittingItemIndex, 1, submittingItemObj)
      renderProducts();
      
      editModal.hide();
    }
  })
  
  const elFilterForm = document.querySelector("#filterForm")
  
  elFilterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const elements = evt.target.elements;
    const searchValue = elements.search.value;
    const fromValue = +elements.from.value;
    const toValue = +elements.to.value;
    const manufacturersValue = elements.manufacturer.value;
    
    const filteredCard = products.filter(function(element) {
      return element.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .filter(card=>{
      const cardPrice = card.price
      return fromValue <= cardPrice
    })
    .filter(card => {
      return toValue <= fromValue ? true : card.price <= toValue;
    })
    .filter(card => {
      return card.model === manufacturersValue;

    })
    .sort((a,b) => {
      switch (sortby.value) {
        case "1":
          if (a.title > b .title) {
            return 1
          } else if (a.title === b .title) {
            return 0
          }
          return -1;
        case "2":
        return b.price - a.price;
        case "3":
        return a.price - b.price;
        
        default:
        break;
      }
      return 0;
    });  
    
    
    elCardWrapper.innerHTML = "";
    products.forEach(card => {
      const elCreatedCard = createCardBox(card);
      elCardWrapper.append(elCreatedCard);
    })
    ;
    
    // console.log(filteredCard);
    renderProducts(filteredCard)
  });
  
  
  
  
  
  
  
  
  