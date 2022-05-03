$(function(){

/* CHAMADA DO BOTÃO "AUTOMATIZAR" DO POPUP */

	// A API de storage usada na função de contar abas tem um pequeno delay, por isso os setTimeout's abaixo, para dar tempo de armazenar a quantidade de abas

	$('#bt_automate').click(function(){
		
		// Conta as abas e as classifica
		chrome.runtime.sendMessage({callFunction: "countTabs"});
		
		// Exibe os botões de itens de acordo com o resultado obtido pela função countTabs
        setTimeout(function(){
            chrome.storage.local.get('item_tabs', function(tabs){
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
        }, 10);

		// Exibe os botões de modelos de acordo com o resultado obtido pela função countTabs
        setTimeout(function(){
            chrome.storage.local.get('model_tabs', function(tabs){
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
        }, 10);

		// Exibe os botões de respostas de acordo com o resultado obtido pela função countTabs
        setTimeout(function(){
            chrome.storage.local.get('answer_tabs', function(tabs){
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
        }, 10);
        setTimeout(function(){
            chrome.storage.local.get('other_tabs', function(tabs){
            	$('#outras').html(tabs.other_tabs);
            });
        }, 10);
    });

/* ====================================== */



/* BOTÕES DA ABA AUTOMATIZAR (POPUP) */

	// Esconde as sections de helpers e automatizar para exibir sempre o auto cardápio primeiro
	$("#helpers").hide();
	$("#automate").hide();

	// Quando clica no "Auto Cardápio" esconde as outras sections do popup.html
	$('#bt_auto_cardapio').click(function(){
		$("#auto_cardapio").show();
		$("#helpers").hide();
		$("#automate").hide();
	});
	// Quando clica no "Automatizar" esconde as outras sections do popup.html
	$('#bt_automate').click(function(){
		$("#automate").show();
		$("#auto_cardapio").hide();
		$("#helpers").hide();
	});
	// Quando clica no "Helpers" esconde as outras sections do popup.html
	$('#bt_helpers').click(function(){
		window.open (
			'helpers/helpers.html',
			'window',
			'width=580, height=1440, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
		);
		setTimeout(function(){
			window.close();
		}, 100);
	});

/* ====================================== */



/* BOTÕES DA ABA AUTOMATIZAR (POPUP) */

	function openPage(page) {
		// Fecha o popup.Html (serve para manter apenas uma aba aberta com uma pagina da extensão)
		setTimeout(function(){
			window.close();
		}, 100);
        chrome.runtime.sendMessage({callFunction: "countTabs"});
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

	$('#bt_editar_modelos').click(function(){openPage("modelos")});
	$('#bt_editar_respostas').click(function(){openPage("respostas")});
	$('#bt_editar_itens').click(function(){openPage("itens")});

/* ====================================== */



/* FUNÇÕES PARA FECHAR AS ABAS ABERTAS */

	$('#close_model').click(function(){
		if(confirm("Deseja fechar todas as abas de MODELOS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabModel"})
		}
	});
	$('#close_item').click(function(){
		if(confirm("Deseja fechar todas as abas de ITENS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabItem"})
		}
	});
	$('#close_answer').click(function(){
		if(confirm("Deseja fechar todas as abas de RESPOSTAS?")){
			chrome.runtime.sendMessage({callFunction: "closeTabAnswer"})
		}
	});

/* ====================================== */



/* ABRE CHANGELOGS */

	$('#changelog').click(function(){
		window.open("changelog.html");
	});

/* ====================================== */

});