// NAVIGATION FUNCTION
const menuToggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".main-nav")
const navItem = document.querySelector(".nav-item")
const closeToggle = document.querySelector(".close-toggle")


menuToggle.addEventListener("click", ()=>{
  menuToggle.classList.toggle("active")
  menu.classList.toggle("active")
  navItem.classList.toggle("active")
  closeToggle.classList.toggle("active")
  
})
closeToggle.addEventListener("click", ()=>{
  menuToggle.classList.toggle("active")
  menu.classList.toggle("active")
  navItem.classList.toggle("active")
  closeToggle.classList.remove("active")
})
menu.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  menu.classList.toggle("active");
  closeToggle.classList.toggle("active")
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove("active");
    menuToggle.classList.remove("active");
    closeToggle.classList.remove("active")
  }
});

window.addEventListener("scroll", ()=>{
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let nav = document.querySelector(".head-container");

  if(scrollTop > 50){
    nav.classList.add("transparent")
  }else{
    nav.classList.remove("transparent")
  }
})
window.addEventListener("scroll", ()=>{
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let arrowUp = document.querySelector(".arrow-up")
  if(scrollTop < 50){
    arrowUp.classList.add("arrow")
  }else{
    arrowUp.classList.remove("arrow")
  }
})


// CONTACT FORM

const form = document.getElementById("contact-form");

form.addEventListener("submit", sendEmail);

function clearErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    document.getElementById("status").textContent = "";
}

function validateForm() {

    clearErrors();

    let valid = true;

    const name = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name === ""){
        document.getElementById("name-error").textContent = "*Name is required";
        valid = false;
    }

    if(email === ""){
        document.getElementById("email-error").textContent = "*Email is required";
        valid = false;
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
        document.getElementById("email-error").textContent = "Invalid email address";
        valid = false;
    }

    const digits = phone.replace(/\D/g, "");

    if(phone === ""){
        document.getElementById("phone-error").textContent = "*Phone number is required";
        valid = false;
    }
    else if(digits.length < 10 || digits.length > 15){
        document.getElementById("phone-error").textContent = "Phone number must contain 10-15 digits";
        valid = false;
    }

    if(message === ""){
        document.getElementById("message-error").textContent = "*Message is required";
        valid = false;
    }

    return valid;
}

function sendEmail(e){

    e.preventDefault();

    if(!validateForm()) return;

    const button = document.querySelector(".form-btn");

    button.disabled = true;
    button.innerHTML = "Sending...";

    emailjs.sendForm(
        "service_go0xyog", //SERVICE ID
        "template_gpellhq", //TEMPLATE ID
        form
    )

    .then(() => {

        document.getElementById("status").style.color = "green";
        document.getElementById("status").textContent = "✅ Message sent successfully!";

        form.reset();

        button.disabled = false;
        button.innerHTML = "Submit";

    })

    .catch((error) => {

        console.error(error);

        document.getElementById("status").style.color = "red";
        document.getElementById("status").textContent = "❌ Failed to send message.";

        button.disabled = false;
        button.innerHTML = "Submit";

    });

}