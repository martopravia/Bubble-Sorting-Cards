/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let palos = ["♠", "♣", "♦", "♥"];
let numerosYLetras = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let cartas = [];
let cartasOrdenadas = [];

let btndrow = document.querySelector(".dibujar");
let btnSort = document.querySelector(".ordenar");

function crearCarta(palo, numero) {
  const carta = document.createElement("div");
  carta.classList.add(
    "carta",
    "mt-3",
    "p-1",
    palos[palo] === "♥" || palos[palo] === "♦" ? "red" : "black"
  );

  const paloArriba = document.createElement("div");
  paloArriba.classList.add("paloArriba", "text-start", "m-0");
  paloArriba.textContent = palos[palo];

  const numeroLetra = document.createElement("div");
  numeroLetra.classList.add("numeroLetra", "text-center");
  numeroLetra.textContent = changeValue(numerosYLetras[numero]);

  const paloAbajo = document.createElement("div");
  paloAbajo.classList.add("paloAbajo", "text-end", "m-0");
  paloAbajo.textContent = palos[palo];

  carta.appendChild(paloArriba);
  carta.appendChild(numeroLetra);
  carta.appendChild(paloAbajo);

  return carta;
}

function changeValue(numero) {
  switch (numero) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return numero;
  }
}

function repartirCartas(numeroIngresado) {
  const cartasRepartidas = document.querySelector("#cartasMano");
  cartasRepartidas.innerHTML = "";
  cartas = [];
  for (let i = 0; i < numeroIngresado; i++) {
    const paloRandom = Math.floor(Math.random() * palos.length);
    const numerosRandom = Math.floor(Math.random() * numerosYLetras.length);
    const carta = { palo: paloRandom, numero: numerosRandom };
    cartas.push(carta);

    cartasRepartidas.appendChild(crearCarta(paloRandom, numerosRandom));
  }
}

function ordenarCartas(cartas) {
  let wall = cartas.length - 1;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (cartas[index].numero > cartas[index + 1].numero) {
        let aux = cartas[index];
        cartas[index] = cartas[index + 1];
        cartas[index + 1] = aux;
        cartasOrdenadas.push([...cartas]);
      }
      index++;
    }
    wall--;
  }
  return cartas;
}

btndrow.addEventListener("click", () => {
  let total = document.getElementById("cardsNumber").value;
  if (total > 0) repartirCartas(total);
  console.log(cartas);
});

btnSort.addEventListener("click", () => {
  ordenarCartas([...cartas]);
  console.log(cartasOrdenadas);
  mostrarOrdenamiento();
});

function mostrarOrdenamiento() {
  const contenedorCartas = document.querySelector(".contenedorCartas");
  contenedorCartas.innerHTML = "";
  for (let i = 0; i < cartasOrdenadas.length; i++) {
    const cartasMano = document.createElement("div");
    cartasMano.classList.add("d-flex");

    for (let j = 0; j < cartasOrdenadas[i].length; j++) {
      cartasMano.appendChild(
        crearCarta(cartasOrdenadas[i][j].palo, cartasOrdenadas[i][j].numero)
      );
    }
    contenedorCartas.appendChild(cartasMano);
  }
}
