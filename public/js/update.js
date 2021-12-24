"use strict";

// Update
console.log("Update");
const formEditar = document.getElementById("guardar");

formEditar.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const work = document.querySelector("#work").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const id = formEditar.dataset.id;

  const data = await fetch(`/agenda/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      work,
      email,
      phone,
    }),
  });

  const res = await data.json();

  if (res.estado) {
    window.location.href = "/agenda";
  } else {
    console.log(res);
  }
});
