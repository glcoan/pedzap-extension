function editModels(){
	chrome.storage.local.remove('modelos');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarModelos)){

				var id = tab.id;

				chrome.tabs.executeScript(id, {
					code: 'var id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'models/bg/backgroundEditModel.js'});
				});
			}
		});

	});
}

function refreshModels(identificador){
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

function addPriceModels(identificador){
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

function removePriceModels(identificador){
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

function sendModels(){
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

function saveModels(){
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