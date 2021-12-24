"use strict";

const login = document.getElementById("login");
login.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        return (document.getElementById("errorText").innerText = data.error);
      }

      let dato = JSON.stringify(data);

      localStorage.setItem("token", data.token);
      window.location.href = "/agenda";
      //localStorage.setItem("email", data.usuario.email);
    })
    .catch((error) => console.log("error", error));
});
