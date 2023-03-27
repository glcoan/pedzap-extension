import {urlEditarRespostas} from "../background.js";

export function editAnswers(){
	chrome.storage.local.remove('respostas');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarRespostas)){
				let id = tab.id;
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: (id)=>{
						switch(document.getElementById("res_status").selectedIndex){
                            case 1:
                                var res_status = 'Selecione';
                            break;
                        
                            case 2:
                                var res_status = 'Ativo';
                            break;
                        
                            case 3:
                                var res_status = 'Suspenso';
                            break;
                        
                            case 4:
                                var res_status = 'Desativado';
                            break;
                        }
                        
                        switch(document.getElementById("res_exibir_preco").selectedIndex){
                            case 1:
                                var res_exibir_preco = 'Sim';
                            break;
                        
                            case 2:
                                var res_exibir_preco = 'Não';
                            break;
                        }
                        
                        try{
                            var tipoPergunta = document.querySelector("#form > div:nth-child(3) > div.portlet-body > div:nth-child(1) > div > div > input").value;
                            var tipoResposta = document.getElementById("res_tipo").selectedIndex;
                        }catch(error){
                            var res_id = document.getElementById("res_id").value;
                            var res_url = "https://www.deeliv.app/estabelecimento/respostas/editar/"+res_id;
                            window.open(res_url,"_self");
                        }
                        
                        var templates = '';
                        var categorias = '';
                        var modelos = '';
                        var precos = '';
                        
                        // Coleta todas as opções de templates
                        document.querySelectorAll("select#tem_id > option").forEach(function(template){
                            if(template.selected == true){
                                var newTemplate = '<option value="'+template.value+'" selected>'+template.innerHTML+'</option>';
                                templates = templates+newTemplate;
                            }else{
                                var newTemplate = '<option value="'+template.value+'">'+template.innerHTML+'</option>';
                                templates = templates+newTemplate;
                            }
                        });
                        
                        // Se tipo da resposta for individual
                        if(tipoResposta == 2){
                            if(tipoPergunta == 'Unica'){
                                var newAnswer = {
                                    tab_id: id,
                                    sku: document.getElementById("res_sku").value,
                                    origin: document.querySelector("body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > h5 > div").innerHTML,
                                    status: res_status,
                                    title: document.getElementById("res_titulo").value,
                                    description: document.getElementById("res_descricao").value,
                                    price: document.getElementById("res_preco").value,
                                    show_price: res_exibir_preco,
                                    templates: templates
                                }
                            }else{
                                var newAnswer = {
                                    tab_id: id,
                                    sku: document.getElementById("res_sku").value,
                                    origin: document.querySelector("body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > h5 > div").innerHTML,
                                    status: res_status,
                                    title: document.getElementById("res_titulo").value,
                                    description: document.getElementById("res_descricao").value,
                                    price: document.getElementById("res_preco").value,
                                    show_price: res_exibir_preco,
                                    templates: false
                                }
                            }
                            // Zera a variável para não acumular infinitamente
                            templates = '';
                        }
                        
                        // Se tipo da resposta for vinculada
                        if(tipoResposta == 3){
                        
                            // Coleta todas as opções de categorias
                            document.querySelectorAll("select#cat_id > option").forEach(function(categoria){
                                if(categoria.selected == true){
                                    var newCategorie = '<option value="'+categoria.value+'" selected>'+categoria.innerHTML+'</option>';
                                    categorias = categorias+newCategorie;
                                }else{
                                    var newCategorie = '<option value="'+categoria.value+'">'+categoria.innerHTML+'</option>';
                                    categorias = categorias+newCategorie;
                                }
                            });
                        
                            // Coleta todas as opções de modelos
                            document.querySelectorAll("select#mod_id > option").forEach(function(modelo){
                                if(modelo.selected == true){
                                    var newModel = '<option value="'+modelo.value+'" selected>'+modelo.innerHTML+'</option>';
                                    modelos = modelos+newModel;
                                }else{
                                    var newModel = '<option value="'+modelo.value+'">'+modelo.innerHTML+'</option>';
                                    modelos = modelos+newModel;
                                }
                            });
                        
                            // Coleta todas as opções de preços
                            document.querySelectorAll("select#pre_id > option").forEach(function(preco){
                                if(preco.selected == true){
                                    var newPrice = '<option value="'+preco.value+'" selected>'+preco.innerHTML+'</option>';
                                    precos = precos+newPrice;
                                }else{
                                    var newPrice = '<option value="'+preco.value+'">'+preco.innerHTML+'</option>';
                                    precos = precos+newPrice;
                                }
                            });
                            
                            if(tipoPergunta == 'Unica'){
                                var newAnswer = {
                                    tab_id: id,
                                    status: res_status,
                                    origin: document.querySelector("body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > h5 > div").innerHTML,
                                    categories: categorias,
                                    models: modelos,
                                    prices: precos,
                                    show_price: res_exibir_preco,
                                    templates: templates
                                }
                            }else{
                                var newAnswer = {
                                    tab_id: id,
                                    status: res_status,
                                    origin: document.querySelector("body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > h5 > div").innerHTML,
                                    categories: categorias,
                                    models: modelos,
                                    prices: precos,
                                    show_price: res_exibir_preco,
                                    templates: false
                                }
                            }
                        
                            // Zera as variáveis para não acumular infinitamente
                            templates = '';
                            categorias = '';
                            modelos = '';
                            precos = '';
                        }
                        
                        chrome.runtime.sendMessage({newAnswer: newAnswer}, (response) => { console.log(response); });
						document.querySelector("#form").onchange = () => {chrome.runtime.sendMessage({refreshExtensionTabs: true}, (response) => { console.log(response); })}
					},
					args: [id]
				});
			}
		});
	});
}

export function sendAnswer(propertie, value){
	function changeInput(inputId, type, value){
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
	}
	
	switch (propertie) {
		case 'title':
			changeInput("res_titulo", "input", value);
			break;
		case 'description':
			changeInput("res_descricao", "input", value);
			break;
		case 'sku':
			changeInput("res_sku", "input", value);
			break;
		case 'status':
			changeInput("res_status", "select", value);
			break;
		case 'price':
            if(document.getElementById("res_tipo").selectedIndex == 2){
                changeInput("res_preco", "input", value);
            }else{
                changeInput("pre_id", "select", value);
            }
			break;
        case 'model':
            changeInput("mod_id", "select", value);
            break;
        case 'categorie':
            changeInput("cat_id", "select", value);
            break;
		case 'show_price':
			changeInput("res_exibir_preco", "select", value);
			break;
        case 'template':
			changeInput("tem_id", "select", value);
			break;
	}

	clearTimeout(interval);
	document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
	document.title = "Dados enviados!";
	var interval = setTimeout(() => {
		document.querySelector("link[rel~='icon']").href = "https://www.deeliv.app/public/modules/globais/estabelecimento/img/deeliv/favicon.ico";
		document.title = "Editar resposta";
	}, 5000);
}

export function refreshAnswers(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador == 'allInd'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas)){
					let id = tab.id;
                    let tipo = 2;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: (tipo)=>{
                            var tipoResposta = document.getElementById("res_tipo").selectedIndex;
                            if(tipo == tipoResposta){
                                window.location.reload();
                            }
                        },
						args: [tipo]
					});
				}
			});
		}else if(identificador == 'allVin'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas)){
					let id = tab.id;
                    let tipo = 3;
					chrome.scripting.executeScript( {
						target: {tabId: id},
						func: (tipo)=>{
                            var tipoResposta = document.getElementById("res_tipo").selectedIndex;
                            if(tipo == tipoResposta){
                                window.location.reload();
                            }
                        },
						args: [tipo]
					});
				}
			});
		}else{
            tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas) && tab.id == identificador){
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

export function saveAnswers(){
	chrome.storage.local.get('respostas', function(data){
		let respostas = data.respostas;
		if(respostas){
			respostas.forEach(function(resposta){
				let id = resposta.tab_id;
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
			console.log('Função saveAnswers falhou! Respostas indefinídas no storage.');
		}
	});
}