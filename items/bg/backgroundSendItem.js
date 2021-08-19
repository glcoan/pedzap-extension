chrome.storage.local.get('itens', function(data){
	console.log(tab_id);
	console.log(data.itens);
	var array = data.itens;

	var ite_unico = [];
	var ite_tabela = [];

	array.forEach(function(item){
		if(item.price){
			ite_unico.push(item);
		}
		if(item.t_titles){
			ite_tabela.push(item);
		}
	});

	console.log(ite_unico);
	console.log(ite_tabela);

	ite_unico.forEach(function(item){
		if(item.tab_id == tab_id){
			document.getElementById("ite_preco").value = item.price;
		}
	});

	ite_tabela.forEach(function(item){
		if(item.tab_id == tab_id){
			var titles = item.t_titles;
			var prices = item.t_prices;

			for(i = 0; i < prices.length; i++){
				var ite_prices = Array.from(document.querySelectorAll("input[class='form-control pre_preco'"));
				ite_prices.shift();
				ite_prices.forEach(function(element){
					if(element == ite_prices[i]){
						element.value = prices[i];
						element.setAttribute('value', prices[i]);
					}
				});

				var ite_titles = Array.from(document.querySelectorAll("input[class='form-control pre_titulo'"));
				ite_titles.shift();
				ite_titles.forEach(function(element){
					if(element == ite_titles[i]){
						element.value = titles[i];
						element.setAttribute('value', titles[i]);
					}
				});
			}
		}
	});

	array.forEach(function(item){
		if(item.tab_id == tab_id){
			document.getElementById("ite_sku").value = item.sku;
			document.getElementById("gru_id").selectedIndex = item.group;

			switch(item.template){
				case 0:
					document.querySelector("#tem_id").selectedIndex = 0;
					document.querySelector("#ite_modo_preco").selectedIndex = 1;
				break;

				case 1:
					document.querySelector("#tem_id").selectedIndex = 0;
					document.querySelector("#ite_modo_preco").selectedIndex = 2;
				break;

				case 2:
					document.querySelector("#tem_id").selectedIndex = 0;
					document.querySelector("#ite_modo_preco").selectedIndex = 3;
				break;

				default:
					var index = item.template - 2;
					document.querySelector("#tem_id > option:nth-child("+index+")").selected = true;
			}

			document.getElementById("ite_titulo").value = item.title;
			document.getElementById("ite_descricao").value = item.description;
			document.getElementById("ite_espacamentos").value = item.spacing;

			document.getElementById("ite_vender_robo").selectedIndex = item.sell_robot;
			document.getElementById("ite_vender_robo").value = parseInt(item.sell_robot);

			document.getElementById("ite_vender_webapp").selectedIndex = item.sell_webapp;
			document.getElementById("ite_vender_webapp").value = parseInt(item.sell_webapp);
			
			document.getElementById("ite_vender_menu").selectedIndex = item.sell_menu;
			document.getElementById("ite_vender_menu").value = parseInt(item.sell_menu);

			document.getElementById("ite_exigir_quantidade_robo").selectedIndex = item.req_robot;
			document.getElementById("ite_exigir_quantidade_robo").value = parseInt(item.req_robot);

			document.getElementById("ite_exigir_quantidade_webapp").selectedIndex = item.req_webapp;
			document.getElementById("ite_exigir_quantidade_webapp").value = parseInt(item.req_webapp);

			document.getElementById("ite_exigir_quantidade_menu").selectedIndex = item.req_menu;
			document.getElementById("ite_exigir_quantidade_menu").value = parseInt(item.req_menu);

			document.getElementById("ite_entrega_gratis").selectedIndex = item.free_delivery;
			document.getElementById("ite_entrega_gratis").value = parseInt(item.free_delivery);
			
			document.getElementById("ite_propontos").selectedIndex = item.points;
			document.getElementById("ite_propontos").value = parseInt(item.points);
		}
	});
});