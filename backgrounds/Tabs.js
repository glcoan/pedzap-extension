import { 
	urlEditarGrupos,
	urlEditarItens,
	urlEditarCategorias,
	urlEditarModelos,
	urlEditarTemplates,
	urlEditarPerguntas,
	urlEditarRespostas
} from "../background.js";

export function countTabs(){
	console.log("countTabs chamado");

	chrome.storage.local.remove('item_tabs');
	chrome.storage.local.remove('model_tabs');
	chrome.storage.local.remove('answer_tabs');
	chrome.storage.local.remove('other_tabs');
	chrome.tabs.query({}, function(tabs){
		let arrayId = [];
		let itensArray = [];
		let modelosArray = [];
		let respostasArray = [];
		let outrasArray = [];
		tabs.forEach(function(tab){
			let id = tab.id;
			arrayId.push(id);
			if(tab.url.includes(urlEditarItens)){
				itensArray.push(tab.url);
			}
			else if(tab.url.includes(urlEditarModelos)){
				modelosArray.push(tab.url);
			}
			else if(tab.url.includes(urlEditarRespostas)){
				respostasArray.push(tab.url);
			}
			else{
				outrasArray.push(tab.url);
			}
		});

		let itensQtde = itensArray.length;
		let modelosQtde = modelosArray.length;
		let respostasQtde = respostasArray.length;
		let outrasQtde = outrasArray.length;

		chrome.storage.local.set({'item_tabs': itensQtde});
		chrome.storage.local.set({'model_tabs': modelosQtde});
		chrome.storage.local.set({'answer_tabs': respostasQtde});
		chrome.storage.local.set({'other_tabs': outrasQtde});
	});
}

// ---------- FECHAR ABAS ----------

export function closeTabGroup(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarGrupos)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabItem(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarItens)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabCategory(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarCategorias)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabModel(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarModelos)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabTemplate(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarTemplates)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabQuestion(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarPerguntas)){
				chrome.tabs.remove(id);
			}
		});
	});
}

export function closeTabAnswer(){
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarRespostas)){
				chrome.tabs.remove(id);
			}
		});
	});
}