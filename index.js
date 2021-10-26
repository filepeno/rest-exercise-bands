"use strict";

window.addEventListener("DOMContentLoaded", get);

const url = "https://keafs-8b71.restdb.io/rest/bands";
const headers = {
  "x-apikey": "602e39f15ad3610fb5bb62c6",
  Accept: "application/json",
  "Content-Type": "application/json",
  "cache-control": "no-cache",
};

function get() {
  fetch(url, {
    method: "get",
    headers: headers,
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
  const parent = document.querySelector("section#bands");
  parent.innerHTML = "";
  data.forEach((band) => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = band.name;
    clone.querySelector(`[data-type="genre"]`).textContent = band.genre;
    clone.querySelector(`[data-type="year"]`).textContent = band.year;
    clone.querySelector("button").addEventListener("click", (e) => {
      deleteIt(band._id);
      deleteFromList(e);
    });
    parent.appendChild(clone);
  });
}

//posting data
function post() {
  const payload = {
    name: "New band",
    genre: "pop",
    year: 1900,
  };
  fetch(url, {
    method: "post",
    body: JSON.stringify(payload),
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  get();
}

//deleting data
function deleteIt(id, e) {
  fetch(url + `/${id}`, {
    method: "delete",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

//update view without deleted band
function deleteFromList(e) {
  e.target.parentElement.remove();
}

//edit/update data - PUT

function put() {
  const payload = {
    name: "Brand new name",
  };
  const id = "617695b67b91b61a000ab4e5";

  fetch(url + `/${id}`, {
    method: "put",
    body: JSON.stringify(payload),
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  get();
}
