"use strict"
const form = document.querySelector('#signup-form');
const canvas = document.querySelector('.signature-pad');
const clearButton = document.querySelector('.clear-Button');
const ctx = canvas.getContext('2d');
let writingMode = false;

const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const username = document.querySelector('.js-username');
const email = document.querySelector('.js-email');
const signupBtn = document.querySelector('#signupBtn');
const invalidUsernameMsg = document.createElement('p');
const invalidEmailMsg = document.createElement('p');

invalidUsernameMsg.textContent = "Invalid Username";
invalidUsernameMsg.style.color = "red";
invalidEmailMsg.textContent = "Invalid E-Mail Address";
invalidEmailMsg.style.color = "red"; 
let validUserName = false;
let validEmail = false;
signupBtn.disabled = true;

const validateUsername = () => {
  if (usernameRegex.test(username.value)) {
    if (invalidUsernameMsg.parentNode) {
      invalidUsernameMsg.parentNode.removeChild(invalidUsernameMsg);
    }
    validUserName = true;
  } else {
    if (!invalidUsernameMsg.parentNode) {
      username.insertAdjacentElement('beforebegin', invalidUsernameMsg);
    }
    validUserName = false;
  }
  frontEndValidation();
};

const validateEmail = () => {
  if (emailRegex.test(email.value)) {
    if (invalidEmailMsg.parentNode) {
      invalidEmailMsg.parentNode.removeChild(invalidEmailMsg);
    }
    validEmail = true;
  } else {
    if (!invalidEmailMsg.parentNode) {
      email.insertAdjacentElement('beforebegin', invalidEmailMsg);
    }
    validEmail = false;
  }
  frontEndValidation();
};

const frontEndValidation = () => {
  if (!validUserName || !validEmail) {
    signupBtn.disabled = true;
  } else {
    signupBtn.removeAttribute('disabled');
  }
};

username.addEventListener("input", validateUsername);
username.addEventListener("change", validateUsername);
username.addEventListener("paste", validateUsername);
username.addEventListener("load", validateUsername);
username.addEventListener("animationstart", validateUsername);

email.addEventListener("input", validateEmail);
email.addEventListener("change", validateEmail);
email.addEventListener("paste", validateEmail);
email.addEventListener("load", validateEmail);
email.addEventListener("animationstart", validateEmail);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    const imageURL = canvas.toDataURL("image/png");
    const combinedData = {
      ...userData,
      signature: imageURL
    };
    const response = await fetch("//localhost:8081/signUp", {
      method: "POST",
      body: JSON.stringify(combinedData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      console.log("User data and image uploaded successfully");
      window.location.href = 'signinForm.html';
    } else {
      console.error("Failed to upload data and image");
    }

    const image = document.createElement('img');
    image.id = "signature";
    image.name = "signature";
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    form.appendChild(image);
    clearPad();

  } catch (error) {
    console.error('Error:', error);
  }
});

const clearPad = ()=>{ctx.clearRect(0,0, canvas.width, canvas.height);}

clearButton.addEventListener('click', (event)=>{
  event.preventDefault();
  clearPad();
  console.log('clearing');
})

const getTargetPosition = (event) => {
  let positionX = event.clientX - event.target.getBoundingClientRect().x;
  let positionY = event.clientY - event.target.getBoundingClientRect().y;
  return [positionX, positionY];
}

const handlePointerMove = (event)=> {
  if (!writingMode) return
  const [positionX, positionY] = getTargetPosition(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
  /* console.log("moving");
  console.log(positionX, positionY); */
}

const handlePointerUp = () => {
  writingMode = false;
  /* console.log('point up'); */
}

const handlePointerDown = (event)=>{
  writingMode = true;
  ctx.beginPath();

  const [positionX, positionY] = getTargetPosition(event);
  ctx.moveTo(positionX, positionY);
}

ctx.lineWidth = 2;
ctx.lineJoin = ctx.lineCap = 'round';

const colors = ['#FF6666', '#6699CC', '#33CC66', '#CC9966', '#9966CC'];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

ctx.strokeStyle = getRandomColor();

canvas.addEventListener('pointerdown', handlePointerDown, {passive: true})
canvas.addEventListener('pointerup', handlePointerUp, {passive: true})
canvas.addEventListener('pointermove', handlePointerMove, {passive: true})