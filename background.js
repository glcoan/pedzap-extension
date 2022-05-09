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

import {} from "./backgrounds/Answers.js";
import {} from "./backgrounds/AutoCardapio.js";
import {} from "./backgrounds/backgroundItems.js";

import {
	sendModel,
	editModels,
	refreshModels,
	addPriceModels,
	removePriceModels,
	saveModels
} from "./backgrounds/backgroundModels.js";

import {} from "./backgrounds/CustomWebapp.js";
import { countTabs, closeTabItem, closeTabModel, closeTabAnswer } from "./backgrounds/Tabs.js";



/* ============= TEMA PADRÃO ============ 

function temaPadrao() {
	chrome.storage.local.get('temaPadrao', function(data){
		if(!data.temaPadrao){
			window.tema_padrao = 'light';
		}else{
			window.tema_padrao = data.temaPadrao;
		}
	});
}
temaPadrao();

/* ====================================== */



/* ALERTA DE ATUALIZAÇÃO 

chrome.storage.local.get('v3_0_0', function(data){
	if(!data.v3_0_0){
		chrome.storage.local.clear();
		var msg = 'Nova versão disponível! (⌒‿⌒)\n>------------{ v0.0.0 }------------<\n';
		chrome.storage.local.set({'atualizacao': msg});
	}
});

setTimeout(function(){
	chrome.storage.local.get('atualizacao', function(data){
		if(data.atualizacao){
			window.open("changelog.html");

			// Limpa o storage
			chrome.storage.local.clear();

			// Define a váriavel de tema padrão
			chrome.storage.local.set({'temaPadrao': window.tema_padrao});
			chrome.storage.local.set({'tema': window.tema_padrao});
			
			// Define a váriavel de versão para não aparecer o alerta denovo
			chrome.storage.local.set({'v2_2_0': 'Mensagem de atualizacao já recebida!'});
		}
	});
}, 5000);

/* ====================================== */



/* DEFINE FUNÇÕES PARA SEREM USADAS QUANDO CHEGAR UMA MENSAGEM NO ONMESSAGE */



const functions = {
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

	removePriceModels(i){
		removePriceModels(i);
	},

	saveModels(){
		saveModels();
	}
}

/* ====================================== */



/* RECEBE AS MENSAGENS ENVIADAS PELAS ABAS PARA ARMAZENAR OS DADOS DE REGISTROS E SALVAR EM UM ARRAY NO STORAGE */

let modelos = [];
let max_pre = 1;
let max_tit = 1;
let respostas = [];
let itens = [];

chrome.runtime.onMessage.addListener(function(request){
	if(request.callFunction){
		let message = request.callFunction.split("_");
		message.length == 1 ? functions[message[0]]() : functions[message[0]](message[1]);
	}
	if(request.mensagem){
		window.open (
			'helpers/qrcode-generator.html',
			'window',
			'width=580, height=1440, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
		);
	}
	if(request.newModel){

		chrome.storage.local.get('model_tabs', function(data){
			if(data.model_tabs){
				
				var qtde = data.model_tabs;
				var newModel = request.newModel;
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
	if(request.newAnswer){

		chrome.storage.local.get('answer_tabs', function(data){
			if(data.answer_tabs){
	
				var qtde = data.answer_tabs;
				var newAnswer = request.newAnswer;
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
	if(request.newItem){

		chrome.storage.local.get('item_tabs', function(data){
			if(data.item_tabs){
	
				var qtde = data.item_tabs;
				var newItem = request.newItem;
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
	if(request.model){
		let model = request.model.id.split('_');

		let tab_id = parseInt(model[model.length - 1]);
		let propertie = model[1];
		let value = request.model.value;

		if(propertie == "price" || propertie == "maximum"){
			let priceIndex = model[2];
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
	return true;
});

/* ====================================== */



/* PREPARAR PEDIDOS AUTOMATICAMENTE

function autoPrepare(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarPedidos)){
				var id = tab.id;
				chrome.tabs.executeScript(id, {file: 'helpers/auto-prepare.js'});

				setTimeout(function(){
					chrome.tabs.remove(id);
				},8000);
			}
		});
	});
}
*/