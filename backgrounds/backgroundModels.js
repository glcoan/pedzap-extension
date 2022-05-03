import {urlEditarModelos} from "../background.js";

export function editModels(){
	chrome.storage.local.remove('modelos');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarModelos)){

				var id = tab.id;
				console.log(id);
				function getId(id) {
					var id = id;
				}
				chrome.scripting.executeScript(
					{
						target: {tabId: tab.id},
						files: ['models/bg/backgroundEditModel.js'],
						func: getId,
						args: [id]
					}
				);
				/*chrome.tabs.executeScript(id, {
					code: 'var id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundEditModel.js'});
				});*/
			}
		});

	});
}

export function refreshModels(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundRefreshModel.js'});
					setTimeout(function(){
						alert('Página atualizada com sucesso!');
					}, 1500);
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundRefreshModel.js'});
				}
			});
		}
	});
}

export function addPriceModels(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundAddPriceModel.js'});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundAddPriceModel.js'});
				}
			});
		}

	});
}

export function removePriceModels(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundRemovePriceModel.js'});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundRemovePriceModel.js'});
				}
			});
		}
	});
}

export function sendModels(){
	chrome.storage.local.get('modelos', function(data){
		var modelos = data.modelos;
		if(modelos){
			modelos.forEach(function(modelo){
				var id = modelo.tab_id;
				chrome.tabs.executeScript(id, {
					code: 'var tab_id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundSendModel.js'});
				});
			});
		}else{
			console.log('Função sendModels falhou! Modelos indefinídos no storage.');
		}
	});
}

export function saveModels(){
	chrome.storage.local.get('modelos', function(data){
		var modelos = data.modelos;
		if(modelos){
			modelos.forEach(function(modelo){
				var id = modelo.tab_id;
				chrome.tabs.executeScript(id, {file: 'models/bg/backgroundSaveModel.js'});
			});
		}else{
			console.log('Função saveModels falhou! Modelos indefinídos no storage.');
		}
	});
}