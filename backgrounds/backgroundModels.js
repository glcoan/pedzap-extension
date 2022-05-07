import {urlEditarModelos} from "../background.js";
import { editModel, saveModel, addPriceModel, removePriceModel, refreshModel } from "../models/handleModel.js";

export function editModels(){
	chrome.storage.local.remove('modelos');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarModelos)){
				let id = tab.id;
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: editModel,
					args: [id]
				});
			}
		});
	});
}

export function refreshModels(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos) && tab.id == identificador){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: refreshModel,
						args: [id]
					});
					setTimeout(function(){
						alert('Página atualizada com sucesso!');
					}, 1500);
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarModelos)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: refreshModel,
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
						func: addPriceModel,
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
						func: addPriceModel,
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
						func: removePriceModel,
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
						func: removePriceModel,
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
					func: saveModel,
					args: [id]
				});
			});
		}else{
			console.log('Função saveModels falhou! Modelos indefinídos no storage.');
		}
	});
}