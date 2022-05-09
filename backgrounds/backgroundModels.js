import {urlEditarModelos} from "../background.js";

export function editModels(){
	chrome.storage.local.remove('modelos');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarModelos)){
				let id = tab.id;
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: (id)=>{
						switch(document.getElementById("mod_status").selectedIndex){
							case 1:
								var mod_status = 'Selecione';
							break;

							case 2:
								var mod_status = 'Ativo';
							break;

							case 3:
								var mod_status = 'Suspenso';
							break;

							case 4:
								var mod_status = 'Desativado';
							break;
						}

						var newModel = {
							tab_id: id,
							sku: document.getElementById("mod_sku").value,
							status: mod_status,
							title: document.getElementById("mod_titulo").value,
							description: document.getElementById("mod_descricao").value,
							prices: [],
							maximum: []
						}

						var mod_precos = Array.from(document.querySelectorAll("[data-mask='decimal'"));
						var mod_maximos = Array.from(document.querySelectorAll("[data-mask='inteiro'"));

						// Remove o primeiro registro dos arrays
						mod_precos.shift();
						mod_maximos.shift();
						// Remove o último registro dos arrays
						mod_precos.pop();
						mod_maximos.pop();

						mod_precos.forEach(function(element){
							var valor = element.getAttribute("value");
							if(valor){
								newModel.prices.push(valor);
							}else{
								newModel.prices.push('');
							}
						});

						mod_maximos.forEach(function(element){
							var valor = element.getAttribute("value");
							if(valor){
								newModel.maximum.push(valor);
							}else{
								newModel.maximum.push('');
							}
						});

						chrome.runtime.sendMessage({newModel: newModel});
					},
					args: [id]
				});
			}
		});
	});
}

export function sendModel(propertie, value, priceIndex){
	function changeInput(inputId, type){
		if(type == "input"){
			var input = document.getElementById(inputId);
			input.value = value;
			input.dispatchEvent(new Event('input'));
		}
		if(type == "select"){
			var input = document.getElementById(inputId);
			input.selectedIndex = value;
			input.dispatchEvent(new Event('change'));
		}
		if(type == "decimal" || type == "inteiro"){
			var array = Array.from(document.querySelectorAll("[data-mask="+type+""));
			array.shift();
			array.pop();
			array[priceIndex].value = value;
			array[priceIndex].dispatchEvent(new Event('input'));
		}
	}

	switch (propertie) {
		case 'title':
			changeInput("mod_titulo", "input");
			break;
		case 'description':
			changeInput("mod_descricao", "input");
			break;
		case 'sku':
			changeInput("mod_sku", "input");
			break;
		case 'status':
			changeInput("mod_status", "select");
			break;
		case 'price':
			changeInput("", "decimal");
			break;
		case 'maximum':
			changeInput("", "inteiro");
			break;
	}

	clearTimeout(interval);
	document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
	document.title = "Dados enviados!";
	var interval = setTimeout(() => {
		document.querySelector("link[rel~='icon']").href = "https://www.pedzap.com.br/public/modules/globais/administrador/img/pedzap/favicon.ico";
		document.title = "Editar modelo";
	}, 5000);
}

export function refreshModels(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos) && tab.id == identificador){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{window.location.reload()},
						args: [id]
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{window.location.reload()},
						args: [id]
					});
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
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{document.querySelector("[data-repeater-create]").click()},
						args: [id]
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{document.querySelector("[data-repeater-create]").click()},
						args: [id]
					});
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
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{
							var botoesRemovePreco = Array.from(document.querySelectorAll("[data-repeater-delete]"));
							// Remove o primeiro registro do array, pois é um campo "escondido" na página de edição de modelos
							botoesRemovePreco.shift();

							var ultimo = botoesRemovePreco[botoesRemovePreco.length - 1];
							if(ultimo){
								ultimo.click();
							}
						},
						args: [id]
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{
							var botoesRemovePreco = Array.from(document.querySelectorAll("[data-repeater-delete]"));
							// Remove o primeiro registro do array, pois é um campo "escondido" na página de edição de modelos
							botoesRemovePreco.shift();

							var ultimo = botoesRemovePreco[botoesRemovePreco.length - 1];
							if(ultimo){
								ultimo.click();
							}
						},
						args: [id]
					});
				}
			});
		}
	});
}

export function saveModels(){
	chrome.storage.local.get('modelos', function(data){
		let modelos = data.modelos;
		if(modelos){
			modelos.forEach(function(modelo){
				let id = modelo.tab_id;
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: ()=>{
						var submit = Array.from(document.querySelectorAll("[data-location='editar'"));
    					submit[0].click();
					},
					args: [id]
				});
			});
		}else{
			console.log('Função saveModels falhou! Modelos indefinídos no storage.');
		}
	});
}