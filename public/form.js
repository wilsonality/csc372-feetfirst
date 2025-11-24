const button = document.querySelector("#submit-btn");
const pass1 = document.querySelector("#password1");
const pass2 = document.querySelector("#password2");

// prevent form from submitting mismatched passwords
button.addEventListener("click", (e) => {
    if (pass1.value !== pass2.value){
        e.preventDefault();
        alert("Please enter matching passwords.");
    }
});