// ---------- AUTO CARDÁPIO ----------

function backgroundAtualizaPreco(params) {
	chrome.tabs.query({},function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;

			//Verifica se a tab é de resposta do estabelecimento
			//Serve para não tentar execultar o script em todas as abas
			if(tab.url.includes(urlEditarRespostas)){
				chrome.tabs.executeScript(id, {
					code: 'var indexPreco = '+ params.indexPreco
				}, function() {
					chrome.tabs.executeScript(id, {file: 'auto_cardapio/backgroundAtualizaPreco.js'});
				});

				// fecha as tabs
				setTimeout(function(){
					chrome.tabs.remove(id);
				},5000);
			}
		});
	});
}

function backgroundAtualizaModelo(params) {
	chrome.tabs.query({},function(tabs){
		var indexModelo = params.indexModelo;

		tabs.forEach(function(tab){
			let id = tab.id;

			//Verifica se a tab é de resposta do estabelecimento
			//Serve para não tentar execultar o script em todas as abas
			if(tab.url.includes(urlEditarRespostas)){

				chrome.tabs.executeScript(id, {
					code: 'var indexModelo = '+ indexModelo
				}, function() {
					chrome.tabs.executeScript(id, {file: 'auto_cardapio/backgroundAtualizaModelo.js'});
				});

				indexModelo++
			}
		});
	});
}