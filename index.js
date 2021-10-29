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
    });
  // .catch((err) => {
  //   console.error(err);
  // });
}

function showData(data) {
  console.log(data);
  const parent = document.querySelector("section#bands");
  parent.innerHTML = "";
  data.forEach((band) => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector(`[data-type="name"]`).textContent = band.name;
    //status
    if (band.active === true) {
      clone.querySelector(`[data-type="status"]`).textContent = "active";
    } else if (band.active === false) {
      clone.querySelector(`[data-type="status"]`).textContent = "not-active";
    } else {
      clone.querySelector(`[data-type="status"]`).textContent = "unknown";
    }
    //genres
    if (band.genre) {
      const genresTotal = band.genre.length;
      for (let i = 0; i < genresTotal; i++) {
        const newDiv = document.createElement("div");
        const divContent = document.createTextNode(band.genre[i]);
        newDiv.appendChild(divContent);
        clone.querySelector("div#genres").appendChild(newDiv);
      }
    }
    //year
    if (band.year) {
      clone.querySelector(`[data-type="year"]`).textContent = `Founded in ${band.year}.`;
    } else {
      clone.querySelector(`[data-type="year"]`).remove();
    }
    //country
    if (band.country) {
      clone.querySelector(`[data-type="country"]`).textContent = `Originated in ${band.country}.`;
    } else {
      clone.querySelector(`[data-type="country"]`).remove();
    }
    if (band.members) {
      const membersTotal = band.members.length;
      for (let i = 0; i < membersTotal; i++) {
        const newLi = document.createElement("li");
        const liContent = document.createTextNode(band.members[i]);
        newLi.appendChild(liContent);
        clone.querySelector("ul#members").appendChild(newLi);
      }
    }
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
    name: "Just a band",
    genre: ["rock", "punk", "new wave", "folk"],
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
