const API_KEY  = '228020ed09c64a98beb3f1acc79ff5a5';
const BASE_API_URL = 'https://api.rawg.io/api/';
let Generos = [];


const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const page = urlParams.get('page');

function exibeLista() {
	let lista = JSON.parse(this.responseText);
	let sectionPesquisa = document.getElementById("section-pesquisa");

	if (lista.status_code < 200 || lista.status_code > 300) {
		document.querySelector(".titulo-pesquisa").innerText = `Conteúdo Não Encontrado`;
		sectionPesquisa.innerHTML = `<i class="fa fa-warning"></i> Não foi encontrado nenhum conteúdo correspondente à pesquisa. Por favor, tente com outros termos.`;
		return;
	}

	document.querySelector(".titulo-pesquisa").innerText = `Resultados para "${query}"`;

	let texto = `<div class="list-group">`;
	let generos = [];
	for (i = 0; i < lista.length; i++) {
		generos.push(lista.genres[i].name);
	}
	for (i = 0; i < lista.results.length; i++) {
		let registro = lista.results[i];
		switch (registro.user_game) {
			case null:
				var data = '';
				if (registro.released != "") {
					data = new Date(registro.released);
					data = `<small>${data.toLocaleString().substring(0,10)}</small>`;
				}
				texto += `
					<a href="/detalhe.html?id=${registro.id}" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
						<div class="row">
							<div class="col-12 col-md-2">
								<img src="${registro.background_image}">
							</div>
							<div class="col-12 col-md-10">	
								<div class="d-flex w-100 justify-content-between">
									<h5 class="mb-1">${registro.name}</h5>
									<p id="data-pesquisa">${data}</p>
								</div>
								<p class="mb-1">${registro.rating}<i class="fa fa-star"></i></p>
								<small>${registro.ratings_count}<i class="fa fa-user"></i></small>
							</div>
						</div>
					</a>
				`;
				break;
		}
	}

	sectionPesquisa.innerHTML = texto;
	console.log(lista);
}

let xhrPesquisa = new XMLHttpRequest();
xhrPesquisa.onload = exibeLista;
xhrPesquisa.open('GET', `${BASE_API_URL}games?search=${query}&key=${API_KEY}`);
xhrPesquisa.send();

document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `/pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});