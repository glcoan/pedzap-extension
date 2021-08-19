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

chrome.runtime.sendMessage({newItem: newItem});