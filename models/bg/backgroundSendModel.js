/*chrome.storage.local.get('modelos', function(data){
	console.log(tab_id);
	console.log(data.modelos);
	var array = data.modelos;
	array.forEach(function(modelo){
		if(modelo.tab_id == tab_id){
			document.getElementById("mod_status").selectedIndex = modelo.status;
			document.getElementById("mod_status").dispatchEvent(new Event('change'));
			document.getElementById("mod_sku").value = modelo.sku;
			document.getElementById("mod_sku").dispatchEvent(new Event('input'));
			document.getElementById("mod_titulo").value = modelo.title;
			document.getElementById("mod_titulo").dispatchEvent(new Event('input'));
			document.getElementById("mod_descricao").value = modelo.description;
			document.getElementById("mod_descricao").dispatchEvent(new Event('input'));
			var prices = modelo.prices;
			var maximum = modelo.maximum;
			for(i = 0; i < prices.length; i++){
				var mod_precos = Array.from(document.querySelectorAll("[data-mask='decimal'"));
				mod_precos.shift();
				mod_precos.pop();
				mod_precos.forEach(function(element){
					if(element == mod_precos[i]){
						element.value = prices[i];
						element.setAttribute('value', prices[i]);
						element.dispatchEvent(new Event('input'));
					}
				});

				var mod_maximos = Array.from(document.querySelectorAll("[data-mask='inteiro'"));
				mod_maximos.shift();
				mod_maximos.pop();
				mod_maximos.forEach(function(element){
					if(element == mod_maximos[i]){
						element.value = maximum[i];
						element.setAttribute('value', maximum[i]);
						element.dispatchEvent(new Event('input'));
					}
				});
			}
		}
	});

	var pageTitle = document.title;
	document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
	document.title = "Dados enviados!";
	setTimeout(() => {
		document.querySelector("link[rel~='icon']").href = "https://www.pedzap.com.br/public/modules/globais/administrador/img/pedzap/favicon.ico";
		document.title = pageTitle;
	}, 5000);
});
*/

function changeInput(inputId, type){
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
	if(type == "decimal" || type == "inteiro"){
		var array = Array.from(document.querySelectorAll("[data-mask="+type+""));
		array.shift();
		array.pop();
		array[priceIndex].value = value;
		array[priceIndex].dispatchEvent(new Event('input'));
	}
}

switch (propertie) {
	case 'title':
		changeInput("mod_titulo", "input");
		break;
	case 'description':
		changeInput("mod_descricao", "input");
		break;
	case 'sku':
		changeInput("mod_sku", "input");
		break;
	case 'status':
		changeInput("mod_status", "select");
		break;
	case 'price':
		changeInput("", "decimal");
		break;
	case 'maximum':
		changeInput("", "inteiro");
		break;
}

clearTimeout(interval);
document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
document.title = "Dados enviados!";
var interval = setTimeout(() => {
	document.querySelector("link[rel~='icon']").href = "https://www.pedzap.com.br/public/modules/globais/administrador/img/pedzap/favicon.ico";
	document.title = "Editar modelo";
}, 5000);