export function editModel(id){
	console.log(id + " - Rodou");
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
}