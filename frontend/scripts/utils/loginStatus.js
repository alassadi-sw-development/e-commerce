const ordersLink = document.querySelector('.js-orders-link');
ordersLink.addEventListener("click", (event)=>{
    event.preventDefault();
    let UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
    if(UserDetails){
    window.location.href = './orders.html';
  }else{
    window.location.href = './signinForm.html';
  }
});