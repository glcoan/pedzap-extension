chrome.storage.local.get('modelos', function(data){
	console.log(tab_id);
	console.log(data.modelos);
	var array = data.modelos;
	array.forEach(function(modelo){
		if(modelo.tab_id == tab_id){
			document.getElementById("mod_status").selectedIndex = modelo.status;
			document.getElementById("mod_sku").value = modelo.sku;
			document.getElementById("mod_titulo").value = modelo.title;
			document.getElementById("mod_descricao").value = modelo.description;
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
					}
				});

				var mod_maximos = Array.from(document.querySelectorAll("[data-mask='inteiro'"));
				mod_maximos.shift();
				mod_maximos.pop();
				mod_maximos.forEach(function(element){
					if(element == mod_maximos[i]){
						element.value = maximum[i];
						element.setAttribute('value', maximum[i]);
					}
				});
			}
		}
	});
});