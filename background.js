export const urlEstabelecimento = "estabelecimento/";
export const urlCategorias = "estabelecimento/categorias";
export const urlModelos = "estabelecimento/modelos";

export const urlInserirModelos = "estabelecimento/modelos/inserir";
export const urlInserirCategorias = "estabelecimento/categorias/inserir";

export const urlEditarGrupos = "estabelecimento/cardapios_grupos/editar";
export const urlEditarItens = "estabelecimento/itens/editar";
export const urlEditarCategorias = "estabelecimento/categorias/editar";
export const urlEditarModelos = "estabelecimento/modelos/editar";
export const urlEditarTemplates = "estabelecimento/templates/editar";
export const urlEditarPerguntas = "estabelecimento/perguntas/editar";
export const urlEditarRespostas = "estabelecimento/respostas/editar";

export const urlEditarPedidos = "estabelecimento/pedidos/editar";
export const urlWebapp = "webapp/globais/home";

export const urlEstab = "/estabelecimento";
export const urlAdmin = "/administrador";

export function scriptTabMenu() {
	var tabSlide1 = document.getElementById("tab-slide-1");
	var tabSlide2 = document.getElementById("tab-slide-2");
	var sectionSlide1 = document.getElementById("section-slide-1");
	var sectionSlide2 = document.getElementById("section-slide-2");

	document.getElementById("tab-1").addEventListener("click", ()=>{
		if(tabSlide1.classList.contains("invisible") && sectionSlide1.classList.contains("invisible")){
			tabSlide2.style.animation = "tab-slide-to-left 1s";
			tabSlide1.style.animation = "";

			sectionSlide2.style.animation = "section-slide-to-right-1 1s";
			sectionSlide1.style.animation = "section-slide-to-right-2 1s";
			sectionSlide1.classList.remove("invisible");

			setTimeout(() => {
				tabSlide1.classList.remove("invisible");
				tabSlide2.classList.add("invisible");

				sectionSlide2.classList.add("invisible");
			}, 980);
		}
	});
	document.getElementById("tab-2").addEventListener("click", ()=>{
		if(tabSlide2.classList.contains("invisible") && sectionSlide2.classList.contains("invisible")){
			tabSlide1.style.animation = "tab-slide-to-right 1s";
			tabSlide2.style.animation = "";

			sectionSlide1.style.animation = "section-slide-to-left-1 1s";
			sectionSlide2.style.animation = "section-slide-to-left-2 1s";
			sectionSlide2.classList.remove("invisible");

			setTimeout(() => {
				tabSlide1.classList.add("invisible");
				tabSlide2.classList.remove("invisible");

				sectionSlide1.classList.add("invisible");
			}, 980);
		}
	});
}

import { updatePrice, updateModel } from "./backgrounds/backgroundAutoCardapio.js";
import { sendModel, editModels, refreshModels, addPriceModels, removePriceModels, saveModels } from "./backgrounds/backgroundModels.js";
import { sendItem, editItems, refreshItems, addPriceItems, removePriceItems, saveItems } from "./backgrounds/backgroundItems.js";
import { sendAnswer, editAnswers, refreshAnswers, saveAnswers } from "./backgrounds/backgroundAnswers.js";
import { countTabs, closeTabItem, closeTabModel, closeTabAnswer } from "./backgrounds/Tabs.js";

/* ALERTA DE ATUALIZAÇÃO */

chrome.storage.local.get('v3_0_4', (data)=>{
	if(!data.v3_0_4){
		let theme;
		chrome.storage.local.get('theme', (data)=>{
			if(data.theme){
				theme = data.theme;
			}else{
				theme = 'light';
			}
			chrome.storage.local.clear();
			
			let msg = 'Nova versão disponível! (⌒‿⌒)\n>------------{ v0.0.0 }------------<\n';
			chrome.storage.local.set({'atualizacao': msg});
			chrome.storage.local.set({'theme': theme});
		});
	}
});

setTimeout(()=>{
	chrome.storage.local.get('atualizacao', (data)=>{
		if(data.atualizacao){
			chrome.tabs.create({
				url: 'changelog.html'
			});

			let theme;
			chrome.storage.local.get('theme', (data)=>{
				theme = data.theme;
				
				// Limpa o storage
				chrome.storage.local.clear();
				
				// Define a váriavel de versão para não aparecer o alerta denovo
				chrome.storage.local.set({'v3_0_4': 'Mensagem de atualizacao já recebida!'});
				chrome.storage.local.set({'theme': theme});
			});
		}else{
			//console.log("Sem atualizacao");
		}
	});
}, 2000);

/* ====================================== */



/* DEFINE FUNÇÕES PARA SEREM USADAS QUANDO CHEGAR UMA MENSAGEM NO ONMESSAGE */

const functions = {
	updatePrice(i){
		updatePrice(i);
	},
	updateModel(i){
		updateModel(i);
	},

	countTabs(){
		countTabs();
	},
	closeTabItem(){
		closeTabItem();
	},
	closeTabModel(){
		closeTabModel();
	},
	closeTabAnswer(){
		closeTabAnswer();
	},

	editItems(){
		countTabs();
		editItems();
	},
	editModels(){
		countTabs();
		editModels();
	},
	editAnswers(){
		countTabs();
		editAnswers();
	},

	refreshItems(i){
		refreshItems(i);
	},
	refreshModels(i){
		refreshModels(i);
	},
	refreshAnswers(i){
		refreshAnswers(i);
	},

	addPriceModels(i){
		addPriceModels(i);
	},
	addPriceItems(i){
		addPriceItems(i);
	},

	removePriceModels(i){
		removePriceModels(i);
	},
	removePriceItems(i){
		removePriceItems(i);
	},

	saveModels(){
		saveModels();
	},
	saveItems(){
		saveItems();
	},
	saveAnswers(){
		saveAnswers();
	}
}

/* ====================================== */



/* RECEBE AS MENSAGENS ENVIADAS PELAS ABAS PARA ARMAZENAR OS DADOS DE REGISTROS E SALVAR EM UM ARRAY NO STORAGE */

let modelos = [];
let max_pre = 1;
let max_tit = 1;
let respostas = [];
let itens = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message);
	if(message.callFunction){
		let split_message = message.callFunction.split("_");
		split_message.length == 1 ? functions[split_message[0]]() : functions[split_message[0]](split_message[1]);
	}

	if(message.newModel){

		chrome.storage.local.get('model_tabs', function(data){
			if(data.model_tabs){
				
				var qtde = data.model_tabs;
				var newModel = message.newModel;
				if(newModel.prices.length > max_pre){
					max_pre = newModel.prices.length;
				}
				modelos.push(newModel);
				
				if(modelos.length == qtde){
					chrome.storage.local.set({'modelos': modelos});
					chrome.storage.local.set({'max_pre': max_pre});
					
					// Define as variáveis ao estado original para uma próxima chamada
					modelos = [];
					max_pre = 1;
					console.log(modelos);
				}
				
			}
		});

	}
	if(message.newAnswer){

		chrome.storage.local.get('answer_tabs', function(data){
			if(data.answer_tabs){
	
				var qtde = data.answer_tabs;
				var newAnswer = message.newAnswer;
				respostas.push(newAnswer);
	
				if(respostas.length == qtde){
					chrome.storage.local.set({'respostas': respostas});
					
					// Define as variáveis ao estado original para uma próxima chamada
					respostas = [];
					console.log(respostas);
				}
	
			}
		});
		
	}
	if(message.newItem){

		chrome.storage.local.get('item_tabs', function(data){
			if(data.item_tabs){
	
				var qtde = data.item_tabs;
				var newItem = message.newItem;
				if(newItem.t_titles.length > max_tit){
					max_tit = newItem.t_titles.length;
				}
				itens.push(newItem);

				if(itens.length == qtde){
					chrome.storage.local.set({'itens': itens});
					chrome.storage.local.set({'max_tit': max_tit});
					
					// Define as variáveis ao estado original para uma próxima chamada
					itens = [];
					max_tit = 1;
					console.log(itens);
				}
	
			}
		});
		
	}

	if(message.model){
		let model = message.model.id.split('_');

		let tab_id = parseInt(model[model.length - 1]);
		let propertie = model[1];
		let value = message.model.value;

		console.log('model: ' + model);
		console.log('tab_id: ' + tab_id);
		console.log('propertie: ' + propertie);
		console.log('value: ' + value);

		if(propertie == "price" || propertie == "minimum" || propertie == "maximum" || propertie == "prititle"){
			let priceIndex = model[2];
			console.log('priceIndex: ' + priceIndex);
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendModel,
				args: [propertie, value, priceIndex]
			});
		}else{
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendModel,
				args: [propertie, value]
			});
		}
	}
	if(message.item){
		let item = message.item.id.split('_');

		let tab_id = parseInt(item[item.length - 1]);
		let propertie = item[1];
		let value = message.item.value;

		if(propertie == "sell" || propertie == "req"){
			propertie = propertie+'_'+item[2];
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendItem,
				args: [propertie, value]
			});
		}else if(propertie == "t"){
			propertie = propertie+'_'+item[2];
			let priceIndex = item[3];
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendItem,
				args: [propertie, value, priceIndex]
			});
		}else{
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendItem,
				args: [propertie, value]
			});
		}
	}
	if(message.answer){
		let answer = message.answer.id.split('_');

		let tab_id = parseInt(answer[answer.length - 1]);
		let propertie = answer[1];
		let value = message.answer.value;

		if(propertie == "show"){
			propertie = propertie+'_'+answer[2];
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendAnswer,
				args: [propertie, value]
			});
		}else{
			chrome.scripting.executeScript({
				target: {tabId: tab_id},
				func: sendAnswer,
				args: [propertie, value]
			});
		}
	}

	if(message.refreshExtensionTabs){
		chrome.tabs.query({}, (tabs)=>{
			tabs.forEach((tab)=>{
				if(tab.url.includes("editModels") || tab.url.includes("editItems") || tab.url.includes("editAnswers")){
					chrome.tabs.reload(tab.id);
				}
			});
		});
	}
	
	sendResponse(true);
});

/* ====================================== */



/* CONTEXT MENU */
console.log('Log 0: background');
chrome.runtime.onInstalled.addListener(() => {
	console.log('Log 1: onInstalled');
	chrome.contextMenus.create({
		"id": "mult",
		"title": "Abrir múltiplas vezes",
		"contexts": ["link"]
	}, console.log('Log 2: contextMenus.create'));
	chrome.contextMenus.onClicked.addListener(function(clickData){
		console.log('Log 3: contextMenus.onClicked');
		console.log('Log 3.2: Valores para serem verificados no próximo IF => '+clickData.menuItemId+' - '+clickData.linkUrl);
		if(clickData.menuItemId == "mult" && clickData.linkUrl){
			console.log('Log 4: clickData.menuItemId == "mult"');
			chrome.tabs.query({currentWindow: true, active : true}, (tabs)=>{
				console.log('Log 5: tabs.query');
				tabs.forEach(function(tab){
					console.log('Log 6: tabs.forEach('+tab.id+')');
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: (clickData)=>{
							console.log('Log 7: scripting.executeScript');
							let mult = prompt("Quantas abas deseja abrir?", "1");
							mult = parseInt(mult);
							if(Number.isInteger(mult)){
								for(var i = 1; i <= mult; i++){
									setTimeout(function(){
										window.open(clickData.linkUrl);
									}, 200 * i);
								}
							}else{
								alert('Operação cancelada!')
							}
						},
						args: [clickData]
					});
				});
			});
		}
	});
});

/* ====================================== */