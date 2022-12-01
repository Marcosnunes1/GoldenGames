const API_KEY  = '228020ed09c64a98beb3f1acc79ff5a5';
const BASE_API_URL 	= 'https://api.rawg.io/api/';
const BASE_IMG_URL = 'https://media.rawg.io/media/games/4a0/';
let listaGeneros = [];
let ListadeJogos = [];

var currentTime = new Date()
dataatual = ''
mespassado = ''
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
if (day < 10){
	var year = currentTime.getFullYear()
	dataatual=(year+"-"+month+"-"+"0"+day);
	mespassado=(year+"-"+(month-1)+"-"+"0"+day);
}
else{
	var year = currentTime.getFullYear()
	dataatual=(year+"-"+month+"-"+day);
	mespassado=(year+"-"+(month-1)+"-"+day);
}

console.log(dataatual)
console.log(mespassado)
console.log(currentTime)

function JogosLancamentos() {
	let carousel = document.querySelector('#carousel-lancamentos .carousel-inner');
	let texto = '';
	let dados = JSON.parse(this.responseText);
	for (i = 0; i < 10; i++) {
		let game = dados.results[i];
		if (game.adult){
			i--;
			continue;
		}
		let lancado = new Date(game.released);
		let lojas = [];
		let generos = [];
		let plataformas = [];
		if (i == 0) {
			texto += `<div class="carousel-item active">`;
		} else {
			texto += `<div class="carousel-item">`;
		}
		for (j = 0; j < game.genres.length; j++) {
			generos.push(game.genres[j].name);
		}
		for (j = 0; j < game.stores.length; j++) {
			lojas.push(game.stores[j].store.name);
		}
		for (j = 0; j < game.parent_platforms.length; j++) {
			plataformas.push(game.parent_platforms[j].platform.name);
		}
		texto += `
				<div class="container">
					<div class="row">
						<div class="col-sm-12 lancamento-poster">
							<a target="_blank" class="text-info" onclick="saveID(event);" id="jogoid" href="/detalhe.html?id=${game.id}">
							<img src="${game.background_image}" />
							</a>
						</div>
						<div id="texto-index" class="col-sm-11">
							<h4>
								<strong>
									<a target="_blank" class="text-info" href="/detalhe.html?id=${game.id}">
										${game.name}
										<small class="text-info"><i aria-hidden="true"></i></small>
									</a>
								</strong>
								<div class="text-info float-right">
									${game.rating} <i class="fa fa-star"></i>
								</div>
							</h4>
							<div class="row">
								<div class="col-12 lancamento-sinopse">
									<strong>Plataformas: </strong>${plataformas.join(", ")}
								</div>
							</div>
							<div class="row">
								<div class="col-12 lancamento-sinopse">
									<strong>Loja: </strong> ${lojas.join(", ")}
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<strong>Gênero: </strong> ${generos.join(", ")}
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<strong>Lançado: </strong> ${lancado.toLocaleDateString()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		ListadeJogos.push([game.id, game.name]);
	};

	carousel.innerHTML = texto;
}

function acrescentaLojas() {
	let destaque = document.querySelector('.cards-loja'); 
	let dados = JSON.parse(this.responseText);
	let texto = '';
	for (i = 0; i < 9; i++) {
		let revisao = dados.results[i];
		var urlGame = revisao.domain; 
		var url_array = urlGame.split('/') 
		var idGame = url_array[url_array.length-1];  
		console.log( idGame );
		texto = `
			<div class="col-12 col-md-6 col-lg-4 thumbnail">
				<div class="card">
				<a target="_blank" href="http://${idGame}">
				<img src="${revisao.image_background}" alt="${revisao.slug}">
				</a>
					<div class="card-body">
						<div class="row">
							<div class="col-2">
								<i class="fa fa-shopping-bag fa-2x"></i>
							</div>
							<div class="col-10">
								<h5 class="card-title">${revisao.name}</h5>
								<strong>Site: </strong><a id="texto-lojas" target="_blank" href="http://${idGame}">${idGame}</a>
								<p class="card-text">${revisao.name.length > 300 ? revisao.content.substr(0, 300) + " ..." : revisao.name}</p>
								<small class="float-right">
									<b>${revisao.games_count} Jogos</b>
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		destaque.innerHTML += texto;
	}

	
}

function findInArray(array, id) {
	for (i = 0; i < array.length; i++) {
		if (array[i][0] === id){
			return array[i][1];
		}
	}
}

function JogosDestaque() {
	let destaque = document.querySelector('.mais-jogados');
	let texto = '';

	let dados = JSON.parse(this.responseText);

	for (i = 0; i < 4; i++) {
		let game = dados.results[i];
		if (game.adult){
			i--;
			continue;
		}
		
		let lancado = new Date(game.released);

		texto += `
			<div class="jogo-destaque col-12 col-md-6 col-lg-3 thumbnail ">
				<a target="_blank" href="/detalhe.html?id=${game.id}">
					<img src="${game.background_image}" alt="${game.slug}">
				</a>
				<p>
					<strong>${game.name}</strong> (${lancado.getFullYear()})
					<small class="text-info float-right">
						${game.rating} <i class="fa fa-star"></i>
					</small>
				</p>
			</div>
		`;
	};

	destaque.innerHTML = texto;
}

document.getElementById("destaque-categorias").addEventListener("change", (e) => {
	let xhrDestaque = new XMLHttpRequest();
	xhrDestaque.onload = JogosDestaque;
	xhrDestaque.open('GET', `${BASE_API_URL}games?${e.target.value}&key=${API_KEY}`);
	xhrDestaque.send();

	document.querySelector(".mais-destaques").style.display = "inline";
});

function MaisJogosDestaque() {
	let destaque = document.querySelector('.mais-jogados');
	let texto = '';

	let dados = JSON.parse(this.responseText);

	let qtd = document.querySelectorAll(".jogo-destaque").length;

	for (i = qtd; i < qtd+4; i++) {
		let game = dados.results[i];
		console.log(game[i])
		let lancado = new Date(game.released);

		texto += `
			<div class="jogo-destaque col-12 col-md-6 col-lg-3 thumbnail ">
				<a target="_blank" href="/detalhe.html?id=${game.id}">
					<img src="${game.background_image}" alt="${game.slug}">
				</a>
				<p>
					<strong>${game.name}</strong> (${lancado.getFullYear()})
					<small class="text-info float-right">
						${game.rating} <i class="fa fa-star"></i>
					</small>
				</p>
			</div>
		`;
	};

	if (qtd == 16) {
		document.querySelector(".mais-destaques").style.display = "none";
	}

	destaque.innerHTML += texto;
}

document.querySelector(".mais-destaques").addEventListener("click", () => {
	let xhrDestaque = new XMLHttpRequest();
	xhrDestaque.onload = MaisJogosDestaque;
	xhrDestaque.open('GET', `${BASE_API_URL}games?id=${document.getElementById("destaque-categorias").value}&key=${API_KEY}&page=1`);
	xhrDestaque.send();
});

function buscaInformacoesIniciais() {
	let xhrLancamentos = new XMLHttpRequest();
	xhrLancamentos.onload = JogosLancamentos;
	xhrLancamentos.open('GET', `${BASE_API_URL}games?key=${API_KEY}&dates=${mespassado},${dataatual}`);
	xhrLancamentos.send();

	let xhrDestaque = new XMLHttpRequest();
	xhrDestaque.onload = JogosDestaque;
	xhrDestaque.open('GET', `${BASE_API_URL}games?key=${API_KEY}`);
	xhrDestaque.send();

	let xhrLojas = new XMLHttpRequest();
	xhrLojas.onload = acrescentaLojas;
	xhrLojas.open('GET', `${BASE_API_URL}stores?key=${API_KEY}`);
	xhrLojas.send();

}
document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `/pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});

buscaInformacoesIniciais();
