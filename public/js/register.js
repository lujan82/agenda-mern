"use strict";

const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error");

  fetch("/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error == "ok") {
        window.location.href = "/agenda";
      } else {
        document.getElementById("error").innerText = data.mensaje;
      }
    })
    .catch((error) => console.error("error", error.response));

  localStorage.setItem("email", email);
});
