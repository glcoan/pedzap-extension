export function editItems(){
	chrome.storage.local.remove('itens');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarItens)){

				var id = tab.id;

				chrome.tabs.executeScript(id, {
					code: 'var id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundEditItem.js'});
				});
			}
		});

	});
}

export function sendItems(){
	chrome.storage.local.get('itens', function(data){
		var itens = data.itens;
		if(itens){
			itens.forEach(function(item){
				var id = item.tab_id;
				console.log("===" + item.title + "===");
				console.log(item.t_prices);
				console.log("========");
				chrome.tabs.executeScript(id, {
					code: 'var tab_id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundSendItem.js'});
				});
			});
		}else{
			console.log('Função sendItems falhou! Itens indefinídas no storage.');
		}
	});
}

export function saveItems(){
	chrome.storage.local.get('itens', function(data){
		var itens = data.itens;
		if(itens){
			itens.forEach(function(item){
				var id = item.tab_id;
				chrome.tabs.executeScript(id, {file: 'items/bg/backgroundSaveItem.js'});
			});
		}else{
			console.log('Função saveItems falhou! Itens indefinídos no storage.');
		}
	});
}

export function refreshItems(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador == 'all_uni'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {
						code: 'var tipo = "UNI"'
					}, function(){
						chrome.tabs.executeScript(id, {file: 'items/bg/backgroundRefreshItem.js'});
					});
				}
			});
		}else if(identificador == 'all_tab'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {
						code: 'var tipo = "TAB"'
					}, function(){
						chrome.tabs.executeScript(id, {file: 'items/bg/backgroundRefreshItem.js'});
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundRefreshItem.js'});
					setTimeout(function(){
						alert('Página atualizada com sucesso!');
					}, 1500);
				}
			});
		}
	});
}

export function addPriceItems(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundAddPriceItem.js'});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundAddPriceItem.js'});
				}
			});
		}

	});
}

export function removePriceItems(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundRemovePriceItem.js'});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'items/bg/backgroundRemovePriceItem.js'});
				}
			});
		}
	});
}