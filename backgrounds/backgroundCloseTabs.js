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
		if(confirm("Deseja fechar todas as abas de ITENS?")){
			tabs.forEach(function(tab){
				let id = tab.id;
				if(tab.url.includes(urlEditarItens)){
					chrome.tabs.remove(id);
				}
			});
		}
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
		if(confirm("Deseja fechar todas as abas de MODELOS?")){
			tabs.forEach(function(tab){
				let id = tab.id;
				if(tab.url.includes(urlEditarModelos)){
					chrome.tabs.remove(id);
				}
			});
		}
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
		if(confirm("Deseja fechar todas as abas de RESPOSTAS?")){
			tabs.forEach(function(tab){
				let id = tab.id;
				if(tab.url.includes(urlEditarRespostas)){
					chrome.tabs.remove(id);
				}
			});
		}
	});
}