"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  const url = "https://keafs-8b71.restdb.io/rest/bands";

  fetch(url, {
    method: "get",
    headers: {
      "x-apikey": "602e39f15ad3610fb5bb62c6",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      showData(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function showData(data) {
  console.log(data);
  data.forEach((band) => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = band.name;
    clone.querySelector(`[data-type="genre"]`).textContent = band.genre;
    clone.querySelector(`[data-type="year"]`).textContent = band.year;
    const parent = document.querySelector("section#bands");
    parent.appendChild(clone);
  });
}
