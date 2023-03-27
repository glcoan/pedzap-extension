import {urlEditarItens} from "../background.js";

export function editItems(){
	chrome.storage.local.remove('itens');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarItens)){
				let id = tab.id;
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: (id)=>{
						var groups = '';

						if(document.getElementById("tem_id").selectedIndex == 0){
							var modo = document.getElementById("ite_modo_preco").selectedIndex;
							switch(modo){
								case 0:
									var option1 = '<option value="PAD">Padrão (Sem Template)</option>';
									var option2 = '<option value="MED">Média ponderada (Sem Template)</option>';
									var option3 = '<option value="MAI">Maior preço (Sem Template)</option>';
									break;
								case 1:
									var option1 = '<option value="PAD" selected>Padrão (Sem Template)</option>';
									var option2 = '<option value="MED">Média ponderada (Sem Template)</option>';
									var option3 = '<option value="MAI">Maior preço (Sem Template)</option>';
									break;
								case 2:
									var option1 = '<option value="PAD">Padrão (Sem Template)</option>';
									var option2 = '<option value="MED" selected>Média ponderada (Sem Template)</option>';
									var option3 = '<option value="MAI">Maior preço (Sem Template)</option>';
									break;
								case 3:
									var option1 = '<option value="PAD">Padrão (Sem Template)</option>';
									var option2 = '<option value="MED">Média ponderada (Sem Template)</option>';
									var option3 = '<option value="MAI" selected>Maior preço (Sem Template)</option>';
									break;
							}

							var option4 = '<option disabled>-------- TEMPLATES ABAIXO --------</option>';

							var templates = option1+option2+option3+option4;

						}else{
							var option1 = '<option value="PAD">Padrão (Sem Template)</option>';
							var option2 = '<option value="MED">Média ponderada (Sem Template)</option>';
							var option3 = '<option value="MAI">Maior preço (Sem Template)</option>';
							var option4 = '<option disabled>-------- TEMPLATES ABAIXO --------</option>';
							
							var templates = option1+option2+option3+option4;
						}

						// Coleta todas as opções de grupos
						document.querySelectorAll("select#gru_id > option").forEach(function(group){
							if(group.selected == true){
								var newGroup = '<option value="'+group.value+'" selected>'+group.innerHTML+'</option>';
								groups = groups+newGroup;
							}else{
								var newGroup = '<option value="'+group.value+'">'+group.innerHTML+'</option>';
								groups = groups+newGroup;
							}
						});

						// Coleta todas as opções de templates
						document.querySelectorAll("select#tem_id > option").forEach(function(template){
							if(template.selected == true && template.innerHTML != 'Nenhum'){
								var newTemplate = '<option value="'+template.value+'" selected>'+template.innerHTML+'</option>';
								templates = templates+newTemplate;
							}else if(template.innerHTML != 'Nenhum'){
								var newTemplate = '<option value="'+template.value+'">'+template.innerHTML+'</option>';
								templates = templates+newTemplate;
							}
						});

						var tipoPreco = document.getElementById("ite_tipo_preco").value;

						if(tipoPreco == "UNI"){
							var price = document.getElementById("ite_preco").value;
							var t_titles = false;
							var t_prices = false;
						}

						if(tipoPreco == "TAB"){
							var t_titles = [];
							var t_prices = [];

							var q_titles = Array.from(document.querySelectorAll("input[class='form-control pre_titulo'"));
							q_titles.shift();
							for(i = 0; i < q_titles.length; i++){
								t_titles.push(q_titles[i].value);
							}

							var q_prices = Array.from(document.querySelectorAll("input[class='form-control pre_preco'"));
							q_prices.shift();
							for(i = 0; i < q_prices.length; i++){
								t_prices.push(q_prices[i].value);
							}

							var price = false;
						}

						var newItem = {
							tab_id: id,
							sku: document.getElementById("ite_sku").value,
							title: document.getElementById("ite_titulo").value,
							description: document.getElementById("ite_descricao").value,
							groups: groups,
							templates: templates,
							price: price,
							t_titles: t_titles,
							t_prices: t_prices,
							sell_robot: document.getElementById("ite_vender_robo").selectedIndex,
							sell_webapp: document.getElementById("ite_vender_webapp").selectedIndex,
							sell_menu: document.getElementById("ite_vender_menu").selectedIndex,
							req_robot: document.getElementById("ite_exigir_quantidade_robo").selectedIndex,
							req_webapp: document.getElementById("ite_exigir_quantidade_webapp").selectedIndex,
							req_menu: document.getElementById("ite_exigir_quantidade_menu").selectedIndex,
							free_delivery: document.getElementById("ite_entrega_gratis").selectedIndex,
							points: document.getElementById("ite_propontos").selectedIndex,
							spacing: document.getElementById("ite_espacamentos").value
						}

						chrome.runtime.sendMessage({newItem: newItem}, (response) => { console.log(response); });
						document.querySelector("#form").onchange = () => {chrome.runtime.sendMessage({refreshExtensionTabs: true}, (response) => { console.log(response); })}
					},
					args: [id]
				});
			}
		});

	});
}

export function sendItem(propertie, value, priceIndex){
	function changeInput(inputId, type, value, priceIndex){
		if(type == "input"){
			var input = document.getElementById(inputId);
			input.value = value;
			input.dispatchEvent(new Event('input'));
		}
		if(type == "select"){
			if(propertie == "template"){
				switch(value){
					case 0:
						document.querySelector("#tem_id").selectedIndex = 0;
						document.querySelector("#tem_id").dispatchEvent(new Event('change'));
						document.querySelector("#ite_modo_preco").selectedIndex = 1;
						document.querySelector("#ite_modo_preco").dispatchEvent(new Event('change'));
					break;

					case 1:
						document.querySelector("#tem_id").selectedIndex = 0;
						document.querySelector("#tem_id").dispatchEvent(new Event('change'));
						document.querySelector("#ite_modo_preco").selectedIndex = 2;
						document.querySelector("#ite_modo_preco").dispatchEvent(new Event('change'));
					break;

					case 2:
						document.querySelector("#tem_id").selectedIndex = 0;
						document.querySelector("#tem_id").dispatchEvent(new Event('change'));
						document.querySelector("#ite_modo_preco").selectedIndex = 3;
						document.querySelector("#ite_modo_preco").dispatchEvent(new Event('change'));
					break;

					default:
						document.querySelector("#tem_id").selectedIndex = value - 3;
						document.querySelector("#tem_id").dispatchEvent(new Event('change'));
				}
			}else{
				var input = document.getElementById(inputId);
				input.selectedIndex = value;
				input.dispatchEvent(new Event('change'));
			}
		}
		if(type == "decimal" || type == "inteiro"){
			var array = Array.from(document.querySelectorAll('[class="form-control pre_preco"'));
			array.shift();
			array[priceIndex].value = value;
			array[priceIndex].dispatchEvent(new Event('input'));
		}
		if(type == "texto"){
			var array = Array.from(document.querySelectorAll('[class="form-control pre_titulo"'));
			array.shift();
			array[priceIndex].value = value;
			array[priceIndex].dispatchEvent(new Event('input'));
		}
	}

	switch (propertie) {
		case 'sku':
			changeInput("ite_sku", "input", value);
			break;
		case 'group':
			changeInput("gru_id", "select", value);
			break;
		case 'template':
			changeInput("tem_id", "select", value);
			break;
		case 'title':
			changeInput("ite_titulo", "input", value);
			break;
		case 'description':
			changeInput("ite_descricao", "input", value);
			break;
		case 'price':
			changeInput("ite_preco", "input", value);
			break;
		case 'sell_robot':
			changeInput("ite_vender_robo", "select", value);
			break;
		case 'sell_webapp':
			changeInput("ite_vender_webapp", "select", value);
			break;
		case 'sell_menu':
			changeInput("ite_vender_menu", "select", value);
			break;
		case 'req_robot':
			changeInput("ite_exigir_quantidade_robo", "select", value);
			break;
		case 'req_webapp':
			changeInput("ite_exigir_quantidade_webapp", "select", value);
			break;
		case 'req_menu':
			changeInput("ite_exigir_quantidade_menu", "select", value);
			break;
		case 'delivery':
			changeInput("ite_entrega_gratis", "select", value);
			break;
		case 'points':
			changeInput("ite_propontos", "select", value);
			break;
		case 'spacing':
			changeInput("ite_espacamentos", "input", value);
			break;
		case 't_title':
			changeInput("", "texto", value, priceIndex);
			break;
		case 't_price':
			changeInput("", "decimal", value, priceIndex);
			break;
	}

	clearTimeout(interval);
	document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
	document.title = "Dados enviados!";
	var interval = setTimeout(() => {
		document.querySelector("link[rel~='icon']").href = "https://www.deeliv.app/public/modules/globais/estabelecimento/img/deeliv/favicon.ico";
		document.title = "Editar item";
	}, 5000);
}

export function saveItems(){
	chrome.storage.local.get('itens', function(data){
		let itens = data.itens;
		if(itens){
			itens.forEach(function(item){
				let id = item.tab_id;
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
			console.log('Função saveItems falhou! Itens indefinídos no storage.');
		}
	});
}

export function refreshItems(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador == 'allUni'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					let id = tab.id;
					let tipo = 'UNI';
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: (tipo)=>{
							let tipoPreco = document.getElementById("ite_tipo_preco").value;
							if(tipo == tipoPreco){
								window.location.reload();
							}
						},
						args: [tipo]
					});
				}
			});
		}else if(identificador == 'allTab'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					var id = tab.id;
					let tipo = 'TAB';
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: (tipo)=>{
							let tipoPreco = document.getElementById("ite_tipo_preco").value;
							if(tipo == tipoPreco){
								window.location.reload();
							}
						},
						args: [tipo]
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens) && tab.id == identificador){
					var id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{window.location.reload();}
					});
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
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{Array.from(document.querySelectorAll("[data-repeater-create]"))[1].click()},
						args: [id]
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarItens)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{Array.from(document.querySelectorAll("[data-repeater-create]"))[1].click();},
						args: [id]
					});
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
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{
							var botoesRemovePreco = Array.from(document.querySelectorAll("[data-repeater-delete]"));
							// Remove o primeiro registro do array, pois é um campo "escondido" na página de edição de itens
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
				if(tab.url.includes(urlEditarItens)){
					let id = tab.id;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: ()=>{
							var botoesRemovePreco = Array.from(document.querySelectorAll("[data-repeater-delete]"));
							// Remove o primeiro registro do array, pois é um campo "escondido" na página de edição de itens
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