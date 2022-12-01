const API_KEY  = '228020ed09c64a98beb3f1acc79ff5a5';
const BASE_API_URL = 'https://api.rawg.io/api/';

var urlGame = document.URL; 
var url_array = urlGame.split('id=') 
var idGame = url_array[url_array.length-1];  
console.log( idGame ); 
function exibeGame() {
	let game = JSON.parse(this.responseText);
	let sectionJogo = document.getElementById("section-jogo");
	const idGame = urlParams.get(game.id);
	console.log(game.id);

	let lancado = new Date(game.released);
	let generos = [];
	for (i = 0; i < game.genres.length; i++) {
		generos.push(game.genres[i].name);
	}
	let tags = [];
	for (i = 0; i < game.tags.length; i++) {
		tags.push(game.tags[i].name);
	}
	let idiomas = [];
	for (i = 0; i < game.stores.length; i++) {
		idiomas.push(game.stores[i].store.name);
	}
	let produtoras = '';
	for (i = 0; i < game.developers.length; i++) {
		let produtora = game.developers[i];
		
		if (!produtora.image_background) {
			continue;
		}

	}

	sectionJogo.innerHTML = `
	<img id="imagem-borrada" src="${game.background_image_additional}">
		<div class="row">
			<div class="col-lg-5 lancamento-poster">
				<img src="${game.background_image}">
			</div>
			<div id="texto-detalhe" class="col-lg-7">
				<h2>
					<strong class="text-info">${game.name}</strong>
					<small class="text-info float-right">
						${game.rating} <i class="fa fa-star"></i>
						<span class="votos">(${game.ratings_count} votos)</span>
					</small>
				</h2>
				<br>
				<div class="row">
					<div class="col-12">
						<strong>Título Original: </strong>${game.name_original} 
					</div>
				</div>
				<div class="row">
					<div class="col-12 jogo-descricao">
						<strong>Descrição: </strong>${game.description}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Gêneros: </strong>${generos.join(", ")}
					</div>
					<div class="col-12 col-md-6">
						<strong>Data de Lançamento: </strong>${lancado.toLocaleDateString()}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Site: </strong><a href="${game.website}">${game.website}</a>
					</div>
					<div class="col-12 col-md-6">
						<strong>Duração: </strong>${game.playtime} horas gameplay
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Reviews: </strong>${game.reviews_count.toString()}
					</div>
					<div class="col-12 col-md-6">
						<strong>Id: </strong>${game.id.toString()}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Tags: </strong>${tags.join(", ")}
					</div>
					<div class="col-12 col-md-6">
						<strong>Lojas Disponíveis: </strong>${idiomas.join(", ")}
					</div>
				</div>
				<div class="row produtoras-row">
					<div class="col-12">
						${produtoras}
					</div>
				</div>
			</div>
		</div>
	`;
}
const urlParams = new URLSearchParams(window.location.search);
let xhrGame = new XMLHttpRequest();
xhrGame.onload = exibeGame;
xhrGame.open('GET', `${BASE_API_URL}games/${idGame}?key=${API_KEY}`);
xhrGame.send();


document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `/pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});
