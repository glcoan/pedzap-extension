export function sendModel(){
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
}