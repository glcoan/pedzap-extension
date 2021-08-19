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
	var res_url = "https://www.pedzap.com.br/estabelecimento/respostas/editar/"+res_id;
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

	console.log(newAnswer);

	// Zera as variáveis para não acumular infinitamente
	templates = '';
	categorias = '';
	modelos = '';
	precos = '';
}

chrome.runtime.sendMessage({newAnswer: newAnswer});

/*alert('ID: ' + newAnswer.tab_id + "\nSKU: " + newAnswer.sku + "\nStatus: " + newAnswer.status + "\nTítulo: " +
	newAnswer.title + "\nDescrição: " + newAnswer.description + "\nPreços: " + 
	newAnswer.prices[0] + " " + newAnswer.prices[1] + " " + newAnswer.prices[2] + 
	"\nMaximos: " + newAnswer.maximum[0] + " " + newAnswer.maximum[1] + " " + newAnswer.maximum[2]);
*/