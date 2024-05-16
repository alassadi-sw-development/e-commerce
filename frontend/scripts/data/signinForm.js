"use strict"
const form = document.querySelector('#signin-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const signinData = JSON.stringify(Object.fromEntries(formData));
  console.log(signinData);

  fetch("//localhost:8081/signin", {
    method: "POST",
    body: signinData,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
    .then(res => {
      sessionStorage.setItem("UserDetails", JSON.stringify(res));  // Ensure the response is saved as a string
      window.location.href = "index.html";  // Redirect after saving the data
    })
    .catch(error => {
      console.error('Error:', error);
    });
});