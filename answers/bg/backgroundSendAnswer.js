chrome.storage.local.get('respostas', function(data){
	console.log(tab_id);
	console.log(data.respostas);
	var array = data.respostas;

	var res_individuais = [];
	var res_vinculadas = [];

	array.forEach(function(resposta){
		if(resposta.title){
			res_individuais.push(resposta);
		}
		if(resposta.categorie){
			res_vinculadas.push(resposta);
		}
	});

	console.log(res_individuais);
	console.log(res_vinculadas);

	res_individuais.forEach(function(resposta){
		if(resposta.tab_id == tab_id){
			document.getElementById("res_status").selectedIndex = resposta.status;
			document.getElementById("res_sku").value = resposta.sku;
			document.getElementById("res_titulo").value = resposta.title;
			document.getElementById("res_descricao").value = resposta.description;
			document.getElementById("res_preco").value = resposta.price;
			document.getElementById("res_exibir_preco").selectedIndex = resposta.show_price;
			if(resposta.template){
				document.getElementById("tem_id").selectedIndex = resposta.template;
			}
		}
	});

	res_vinculadas.forEach(function(resposta){
		console.log(resposta);
		if(resposta.tab_id == tab_id){
			document.getElementById("res_status").selectedIndex = resposta.status;

			if(document.getElementById("cat_id").selectedIndex == resposta.categorie){
				if(document.getElementById("mod_id").selectedIndex == resposta.model){

					document.getElementById("pre_id").selectedIndex = resposta.price;

				}else{
					document.querySelector("#estVinculada > div:nth-child(2) > div > div > div > div > ul > li:nth-child("+resposta.model+") > a").click();
					document.getElementById("mod_id").selectedIndex = resposta.model;
				}
			}else{
				document.querySelector("#estVinculada > div:nth-child(1) > div > div > div > div > ul > li:nth-child("+resposta.categorie+") > a").click();
				document.getElementById("cat_id").selectedIndex = resposta.categorie;
			}

			document.getElementById("res_exibir_preco").selectedIndex = resposta.show_price;
			if(resposta.template){
				document.getElementById("tem_id").selectedIndex = resposta.template;
			}
		}
	});
});