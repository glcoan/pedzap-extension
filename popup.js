$(()=>{

/* BOTÃO "ALTERAR MODELOS" */

	$('#alterar_modelos').click(()=>{
		const indexModelo 		= document.getElementsByName('indexModelo');
		const indexModeloCheck 	= document.getElementsByName('indexModeloCheck');
		const indexPreco 		= document.getElementsByName('indexPreco');
		const indexPrecoCheck 	= document.getElementsByName('indexPrecoCheck');
	
		if(confirm("Deseja mesmo fazer essa alteração?")){
			// Valida se não teve nenhum selecionado
			if(!indexPrecoCheck[0].checked && !indexModeloCheck[0].checked) {
				alert("Você precisa selecionar pelo menos um index para alterar");
				return false;
			}

			/**
			 * Atualiza modelo
			 */
			if(indexModeloCheck[0].checked) {
				if (indexModelo[0].value.length === 0) {
					alert("Você esqueceu de selecionar o início do modelo");
					return false;
				}
				chrome.runtime.sendMessage({callFunction: "updateModel_"+indexModelo[0].value}, (response) => { console.log(response); });
			}
	
			/**
			 * Atualiza só preços
			 * Tem um timeout de 3 segundos para dar tempo de carregar os preços do modelo que são carregados via ajax pelo painel.
			 */
			setTimeout(function(){
				if(indexPrecoCheck[0].checked){
					if(indexPreco[0].value.length === 0){
						alert("Você esqueceu de selecionar o index do preço");
						return false;
					}
					chrome.runtime.sendMessage({callFunction: "updatePrice_"+indexPreco[0].value}, (response) => { console.log(response); });
				}
			}, 3000);
		}
	});

/* ====================================== */



/* CHAMADA DO BOTÃO "AUTOMATIZAR" DO POPUP */

	// A API de storage usada na função de contar abas tem um pequeno delay, por isso os setTimeout's abaixo, para dar tempo de armazenar a quantidade de abas

	function showInfoAutomateTab() {
		// Conta as abas e as classifica
		chrome.runtime.sendMessage({callFunction: "countTabs"}, (response) => { console.log(response); });
		
		// Exibe os botões de itens de acordo com o resultado obtido pela função countTabs
		setTimeout(()=>{
			chrome.storage.local.get('item_tabs', (tabs)=>{
				$('#itens').html(tabs.item_tabs);

				// Desabilita os botões caso não tenha nenhum item aberto
				if(tabs.item_tabs == 0){
					$('#bt_editar_itens').removeClass("col-9 btn btn-primary btn-sm").addClass("col-9 btn btn-primary btn-sm disabled");
					$('#close_item').removeClass("col-2 btn btn-danger btn-sm").addClass("col-2 btn btn-danger btn-sm disabled");
				}else{
					$('#bt_editar_itens').removeClass("col-9 btn btn-primary btn-sm disabled").addClass("col-9 btn btn-primary btn-sm");
					$('#close_item').removeClass("col-2 btn btn-danger btn-sm disabled").addClass("col-2 btn btn-danger btn-sm");
				}
			});
		}, 100);

		// Exibe os botões de modelos de acordo com o resultado obtido pela função countTabs
		setTimeout(()=>{
			chrome.storage.local.get('model_tabs', (tabs)=>{
				$('#modelos').html(tabs.model_tabs);

				// Desabilita os botões caso não tenha nenhum modelo aberto
				if(tabs.model_tabs == 0){
					$('#bt_editar_modelos').removeClass("col-9 btn btn-primary btn-sm").addClass("col-9 btn btn-primary btn-sm disabled");
					$('#close_model').removeClass("col-2 btn btn-danger btn-sm").addClass("col-2 btn btn-danger btn-sm disabled");
				}else{
					$('#bt_editar_modelos').removeClass("col-9 btn btn-primary btn-sm disabled").addClass("col-9 btn btn-primary btn-sm");
					$('#close_model').removeClass("col-2 btn btn-danger btn-sm disabled").addClass("col-2 btn btn-danger btn-sm");
				}
			});
		}, 100);

		// Exibe os botões de respostas de acordo com o resultado obtido pela função countTabs
		setTimeout(()=>{
			chrome.storage.local.get('answer_tabs', (tabs)=>{
				$('#respostas').html(tabs.answer_tabs);

				// Desabilita os botões caso não tenha nenhuma resposta aberta
				if(tabs.answer_tabs == 0){
					$('#bt_editar_respostas').removeClass("col-9 btn btn-primary btn-sm").addClass("col-9 btn btn-primary btn-sm disabled");
					$('#close_answer').removeClass("col-2 btn btn-danger btn-sm").addClass("col-2 btn btn-danger btn-sm disabled");
				}else{
					$('#bt_editar_respostas').removeClass("col-9 btn btn-primary btn-sm disabled").addClass("col-9 btn btn-primary btn-sm");
					$('#close_answer').removeClass("col-2 btn btn-danger btn-sm disabled").addClass("col-2 btn btn-danger btn-sm");                                        
				}
			});
		}, 100);
		setTimeout(()=>{
			chrome.storage.local.get('other_tabs', (tabs)=>{
				$('#outras').html(tabs.other_tabs);
			});
		}, 100);
	}
	$('#bt_automate').click(()=>{showInfoAutomateTab()});
	$('#bt_automate').hover(()=>{showInfoAutomateTab()});

/* ====================================== */



/* BOTÕES DO POPUP */

	// Esconde as sections de helpers e automatizar para exibir sempre o auto cardápio primeiro
	$("#helpers").hide();
	$("#automate").hide();

	// Quando clica no "Auto Cardápio" esconde as outras sections do popup.html
	$('#bt_auto_cardapio').hover(()=>{
		$("#auto_cardapio").show();
		$("#helpers").hide();
		$("#automate").hide();
	});
	// Quando clica no "Automatizar" esconde as outras sections do popup.html
	$('#bt_automate').hover(()=>{
		$("#automate").show();
		$("#auto_cardapio").hide();
		$("#helpers").hide();
	});
	// Quando clica no "Helpers" esconde as outras sections do popup.html
	$('#bt_helpers').hover(()=>{
		$("#automate").hide();
		$("#auto_cardapio").hide();
		$("#helpers").show();
	});

/* ====================================== */



/* BOTÕES DA ABA AUTOMATIZAR (POPUP) */

	function openPage(page) {
		// Fecha o popup.Html (serve para manter apenas uma aba aberta com uma pagina da extensão)
		setTimeout(()=>{
			window.close();
		}, 100);
        chrome.runtime.sendMessage({callFunction: "countTabs"}, (response) => { console.log(response); });
		switch (page) {
			case "modelos":
				window.open('models/editModels.html');
				break;
			case "respostas":
				window.open('answers/editAnswers.html');
				break;
			case "itens":
				window.open('items/editItems.html');
				break;
		}
	}

	$('#bt_editar_modelos').click(()=>{openPage("modelos")});
	$('#bt_editar_respostas').click(()=>{openPage("respostas")});
	$('#bt_editar_itens').click(()=>{openPage("itens")});

/* ====================================== */



/* FUNÇÕES PARA FECHAR AS ABAS ABERTAS */

	$('#close_model').click(()=>{
		if(confirm("Deseja fechar todas as abas de MODELOS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabModel"}, (response) => { console.log(response); });
		}
	});
	$('#close_item').click(()=>{
		if(confirm("Deseja fechar todas as abas de ITENS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabItem"}, (response) => { console.log(response); });
		}
	});
	$('#close_answer').click(()=>{
		if(confirm("Deseja fechar todas as abas de RESPOSTAS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabAnswer"}, (response) => { console.log(response); });
		}
	});

/* ====================================== */



/* ABRE CHANGELOGS */

	$('#changelog').click(()=>{
		window.open("changelog.html");
	});

/* ====================================== */



/* HELPERS */

	$('#bt_mensagem_automatica').click(()=>{
		window.open (
			'./helpers/text-generator.html',
			'_blank',
			'width=600, height=1440, left=570, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
		);
	});

	$('#bt_gerador_qrcode').click(()=>{
		window.open (
			'./helpers/qrcode-generator.html',
			'_blank',
			'width=600, height=1440, left=570, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
		);
	});

/* ====================================== */

});