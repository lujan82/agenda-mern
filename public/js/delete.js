"use strict";
// Eliminar
const btnEliminar = document.getElementById("btnEliminar");

btnEliminar.addEventListener("click", async () => {
  try {
    const data = await fetch(`/agenda/${btnEliminar.dataset.id}`, {
      method: "delete",
    });
    const res = await data.json();

    if (res.estado) {
      window.location.href = "/agenda";
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error.response);
  }
});
