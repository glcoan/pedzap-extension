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
			document.getElementById("res_status").dispatchEvent(new Event('change'));
			document.getElementById("res_sku").value = resposta.sku;
			document.getElementById("res_sku").dispatchEvent(new Event('input'));
			document.getElementById("res_titulo").value = resposta.title;
			document.getElementById("res_titulo").dispatchEvent(new Event('input'));
			document.getElementById("res_descricao").value = resposta.description;
			document.getElementById("res_descricao").dispatchEvent(new Event('input'));
			document.getElementById("res_preco").value = resposta.price;
			document.getElementById("res_preco").dispatchEvent(new Event('input'));
			document.getElementById("res_exibir_preco").selectedIndex = resposta.show_price;
			document.getElementById("res_exibir_preco").dispatchEvent(new Event('change'));
			if(resposta.template){
				document.getElementById("tem_id").selectedIndex = resposta.template;
				document.getElementById("tem_id").dispatchEvent(new Event('change'));
			}
		}
	});

	res_vinculadas.forEach(function(resposta){
		console.log(resposta);
		if(resposta.tab_id == tab_id){
			document.getElementById("res_status").selectedIndex = resposta.status;
			document.getElementById("res_status").dispatchEvent(new Event('change'));

			if(document.getElementById("cat_id").selectedIndex == resposta.categorie){
				if(document.getElementById("mod_id").selectedIndex == resposta.model){

					document.getElementById("pre_id").selectedIndex = resposta.price;
					document.getElementById("pre_id").dispatchEvent(new Event('change'));

				}else{
					document.querySelector("#estVinculada > div:nth-child(2) > div > div > div > div > ul > li:nth-child("+resposta.model+") > a").click();
					document.getElementById("mod_id").selectedIndex = resposta.model;
					document.getElementById("mod_id").dispatchEvent(new Event('change'));
				}
			}else{
				document.querySelector("#estVinculada > div:nth-child(1) > div > div > div > div > ul > li:nth-child("+resposta.categorie+") > a").click();
				document.getElementById("cat_id").selectedIndex = resposta.categorie;
				document.getElementById("cat_id").dispatchEvent(new Event('change'));
			}

			document.getElementById("res_exibir_preco").selectedIndex = resposta.show_price;
			document.getElementById("res_exibir_preco").dispatchEvent(new Event('change'));
			if(resposta.template){
				document.getElementById("tem_id").selectedIndex = resposta.template;
				document.getElementById("tem_id").dispatchEvent(new Event('change'));
			}
		}
	});

	var pageTitle = document.title;
	document.querySelector("link[rel~='icon']").href = "https://cdn-icons-png.flaticon.com/64/190/190411.png";
	document.title = "Dados enviados!";
	setTimeout(() => {
		document.querySelector("link[rel~='icon']").href = "https://www.deeliv.app/public/modules/globais/estabelecimento/img/deeliv/favicon.ico";
		document.title = pageTitle;
	}, 5000);
});