"use strict"
const form = document.querySelector('#signin-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const signinData = JSON.stringify(Object.fromEntries(formData));
  console.log(signinData);

 /*  for (let item of formData){
    console.log(item[0], item[1]);
  } */

  fetch("//localhost:8081/signin", {
    method: "POST",
    body: signinData,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res=>console.log(res))

})

/* 

    // Populate formData inside the event listener
    formData.append('firstname', document.querySelector('.js-firstname').value);
    formData.append('lastname', document.querySelector('.js-lastname').value);
    formData.append('username', document.querySelector('.js-username').value);
    formData.append('email', document.querySelector('.js-email').value);
    formData.append('password', document.querySelector('.js-password').value);
    formData.append('street_address', document.querySelector('.js-street-address').value);
    formData.append('city', document.querySelector('.js-city').value);
    formData.append('state', document.querySelector('.js-state').value);
    formData.append('postal_code', document.querySelector('.js-postal-code').value);

    console.log(formData);
  });

  console.log(formData); */