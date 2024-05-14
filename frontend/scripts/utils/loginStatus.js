const ordersLink = document.querySelector('.js-orders-link');
ordersLink.addEventListener("click", (event)=>{
    event.preventDefault();
    let cookie = false;
    if(cookie){
    window.location.href = './orders.html';
  }else{
    window.location.href = './signinForm.html';
  }
});