$(function(){

/* SCRIPT TAB MENU */

	var tabSlide1 = document.getElementById("tab-slide-1");
	var tabSlide2 = document.getElementById("tab-slide-2");
	var sectionSlide1 = document.getElementById("section-slide-1");
	var sectionSlide2 = document.getElementById("section-slide-2");

	document.getElementById("tab-1").addEventListener("click", ()=>{
		if(tabSlide1.classList.contains("invisible") && sectionSlide1.classList.contains("invisible")){
			tabSlide2.style.animation = "tab-slide-to-left 1s";
			tabSlide1.style.animation = "";

			sectionSlide2.style.animation = "section-slide-to-right-1 1s";
			sectionSlide1.style.animation = "section-slide-to-right-2 1s";
			sectionSlide1.classList.remove("invisible");

			setTimeout(() => {
				tabSlide1.classList.remove("invisible");
				tabSlide2.classList.add("invisible");

				sectionSlide2.classList.add("invisible");
			}, 980);
		}
	});
	document.getElementById("tab-2").addEventListener("click", ()=>{
		if(tabSlide2.classList.contains("invisible") && sectionSlide2.classList.contains("invisible")){
			tabSlide1.style.animation = "tab-slide-to-right 1s";
			tabSlide2.style.animation = "";

			sectionSlide1.style.animation = "section-slide-to-left-1 1s";
			sectionSlide2.style.animation = "section-slide-to-left-2 1s";
			sectionSlide2.classList.remove("invisible");

			setTimeout(() => {
				tabSlide1.classList.add("invisible");
				tabSlide2.classList.remove("invisible");

				sectionSlide1.classList.add("invisible");
			}, 980);
		}
	});

/* ====================================== */



/* AÇÕES AO CARREGAR A PÁGINA */

	// Quando o dom carrega essa função é chamada para listar os modelos
	$(document).ready(function(){
		chrome.runtime.sendMessage({callFunction: "countTabs"});
		listModels();
	});

	// Atualiza listagem de modelos e marca todos os checkbox das propriedades listadas
	$('#bt_refresh_page').click(function(){
		if(confirm("Você PERDERÁ todas as alterações caso não tenha salvo ou enviado para as abas! Deseja mesmo atualizar?")){
			window.location.reload();
		}
	});

	// Timeout de 1 segundo para dar tempo de carregar os registros e aplicar essas alterações
	setTimeout(function(){

		// Coloca borda verde nos elementos alterados e envia as informações para o bg
		$("input, textarea, select").change(function(){
			$(this).addClass('border-success');
			$('#save_models').removeClass('disabled');

			model = {
				id: this.id,
				value: this.value
			}
			chrome.runtime.sendMessage({model: model});
		});
		
		// Coloca borda valores 0 e 1 para preços e máximos + borda verde
		var mod_precos = Array.from(document.querySelectorAll("[id^='mod_price_'"));
		var mod_maximos = Array.from(document.querySelectorAll("[id^='mod_maximum_'"));
		mod_precos.forEach(function(preco){
			if(preco.value == '' && preco.disabled == false){
				preco.value = 0.00;
				$('#'+preco.id).addClass('border-success');
			}
		});
		mod_maximos.forEach(function(maximo){
			if(maximo.value == '' && maximo.disabled == false){
				maximo.value = 1;
				$('#'+maximo.id).addClass('border-success');
			}
		});


		// Pega os dados obtidos das abas a primeira vez e depois de 1 segundo chama a função que coletas os mesmos dados para comparar
		// Para verificar se deu tempo de coletar todos eles atualizados ... Caso não tenha dado tempo, atualiza a pagina para tentar denovo
		var array1 = [];
		chrome.storage.local.get('modelos', function(data){
			if(data.modelos){
				var modelos = data.modelos;
				modelos.sort(function(a, b){
					if(a.tab_id < b.tab_id){
						return -1;
					}else{
						return true;
					}
				});
				modelos = JSON.stringify(modelos);
				console.log("Array-1 = "+modelos);
				array1.push(modelos);
				chrome.runtime.sendMessage({callFunction: "editModels"});
			}
		});

		var array2 = [];
		setTimeout(function(){
			chrome.storage.local.get('modelos', function(data){
				if(data.modelos){
					var modelos = data.modelos;
				
					modelos.sort(function(a, b){
						if(a.tab_id < b.tab_id){
							return -1;
						}else{
							return true;
						}
					});
					modelos = JSON.stringify(modelos);
					console.log("Array-2 = "+modelos);
					array2.push(modelos);
				}
			});
		}, 1000);

		setTimeout(function(){
			if(array1[0] != array2[0]){
				array1 = [];
				array2 = [];
				alert("Informações Incompatíveis! ┐ (° _ °) ┌\n- A página será atualizada ...");
				window.location.reload();
			}else{
				$('.btn').removeClass('disabled');
				$('input, select, textarea').prop('disabled', false);
				$('input[class*="border-danger"').prop('disabled', true);
				$("#loading-2").hide();
				array1 = [];
				array2 = [];
			}
		}, 1500);
		
	}, 1500);

/* ====================================== */



/* FUNÇÃO PARA LISTAR TODOS OS MODELOS */

	function listModels(){

		// Coleta todas as informações dos modelos abertos e armazena no storage
		chrome.runtime.sendMessage({callFunction: "editModels"});

		// Exibe o spinner enquanto o setTimeout abaixo não é executado
		$("body").css({'overflow-y': 'hidden'});
		$("#list_models").html('');
		$("#dashboard").hide();
		$("#loading-1").html('<div id="spinner" class="spinner-border text-success" style="width: 80px; height: 80px;" role="status"><span class="visually-hidden">Loading...</span></div>');


		// setTimeout para dar tempo de coletar todos os dados das abas de modelos
		setTimeout(function(){
			// Remove o spinner para listar os modelos
			$("#spinner").hide();
			$("#dashboard").show();
			$("body").css({'overflow-y': 'auto'});

			// Pega o array de informações dos modelos armazenado no storage
			chrome.storage.local.get('modelos', function(data){
				var modelos = data.modelos;

				// If para não gerar erro caso não tenha nenhum modelo aberto
				if(modelos){
					$('#send_models').removeClass('disabled');
					if(modelos.length == 1){
						$('#qtde_modelos').html(modelos.length);
					}else{
						$('#qtde_modelos').html(modelos.length);
					}

					var thAtualizar = '<th scope="col" class="atualiza-modelo prop-modelo-ext"><a href="#" id="refresh_models" class="btn btn-primary rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
					var thStatus    = '<th scope="col" class="status prop-modelo-ext">Status</th>';
					var thSKU       = '<th scope="col" class="sku prop-modelo-ext">SKU</th>';
					var thTitulo    = '<th scope="col" class="titulo prop-modelo-ext">Título</th>';
					var thDescricao = '<th scope="col" class="descricao prop-modelo-ext" id="th_desc">Descrição</th>';

					// Insere o head da tabela
					$("#list_models").append(
						'<table class="table table-sm table-borderless table-hover" style="--bs-table-hover-bg: rgb(108 117 125 / 30%);">'
						+'<thead class="text-center"><tr id="tr_head">'
						+thAtualizar+thStatus+thSKU+thTitulo+thDescricao
					);

					// botão para atualizar página do modelo
					$('#refresh_models').click(function(){
						if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar Modelos"?')){
							chrome.runtime.sendMessage({callFunction: "refreshModels"});
					
							$('.btn').addClass('disabled');
					
							setTimeout(function(){
								$('.btn').removeClass('disabled');
							}, 3000)
						}
					});

					// Insere a quantidade certa de th para preço e maximo
					chrome.storage.local.get('max_pre', function(qtde){
						console.log('Máximo de preços em um modelo: ' + qtde.max_pre);
						for(var i = 1; i <= qtde.max_pre; i++){
							$("#tr_head").append('<th scope="col" class="preco prop-modelo-ext">Preço</th>');
							$("#tr_head").append('<th scope="col" class="maximo prop-modelo-ext">Max</th>');
						}

						// botão para adicionar preços
						$("#tr_head").append('<th scope="col" class="novo-preco prop-modelo-ext"><a href="#" id="btn-add-preco-all" class="btn btn-success rounded-1"><i class="fas fa-plus"></i></a></th>');
						$("#btn-add-preco-all").click(function(){
							if(confirm("Deseja mesmo adicionar um novo campo de preço para todos os modelos?")){
								chrome.runtime.sendMessage({callFunction: "addPriceModels"});
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 2000);
							}
						});

						// botão para remover o ultimo preço
						$("#tr_head").append('<th scope="col" class="exclui-preco prop-modelo-ext"><a href="#" id="btn-remove-preco-all" class="btn btn-danger rounded-1"><i class="fas fa-minus"></i></a></th></tr>');
						$("#btn-remove-preco-all").click(function(){
							if(confirm("Deseja mesmo remover o último preço de todos os modelos?")){
								chrome.runtime.sendMessage({callFunction: "removePriceModels"});
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 2000);
							}
						});
					});

					
					$("table").append('<tbody id="tbody">');
					modelos.forEach(function(modelo){
						console.log(modelo.title);
					});

					// função para organizar a lista na mesma ordem das abas
					modelos.sort(function(a, b){
						if(a.tab_id < b.tab_id){
							return -1;
						}else{
							return true;
						}
					});

					// Exibe uma nova linha na tabela para cada modelo do array
					modelos.forEach(function(modelo){

						console.log(modelo.title);

						// formata a propriedade "status"
						switch(modelo.status){
							case 'Ativo':
								var status_1 = '<option value="2" selected>Ativo</option>';
								var status_2 = '<option value="3">Suspenso</option>';
								var status_3 = '<option value="4">Desativado</option>';
							break;

							case 'Suspenso':
								var status_1 = '<option value="2">Ativo</option>';
								var status_2 = '<option value="3" selected>Suspenso</option>';
								var status_3 = '<option value="4">Desativado</option>';
							break;

							case 'Desativado':
								var status_1 = '<option value="2">Ativo</option>';
								var status_2 = '<option value="3">Suspenso</option>';
								var status_3 = '<option value="4" selected>Desativado</option>';
							break;
						}

						// Adiciona botão de atualizar página do modelo individualmente	--- Exibe o status, sku, titulo e descrição
						$("#tbody").append('<tr id="'+modelo.tab_id+'"><td id="pro_ref_'+modelo.tab_id+'" class="text-center"><button id="btn-ref-model-'+modelo.tab_id+'" class="btn btn-primary btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td><td id="pro_status_'+modelo.tab_id+'"><select id="mod_status_'+modelo.tab_id+'" class="form-select form-select-sm status">'+status_1+status_2+status_3+'</select></td><td id="pro_sku_'+modelo.tab_id+'"><input id="mod_sku_'+modelo.tab_id+'" class="form-control form-control-sm sku" type="text" value="'+modelo.sku+'"></td><td id="pro_title_'+modelo.tab_id+'"><input id="mod_title_'+modelo.tab_id+'" class="form-control form-control-sm titulo" type="text" value="'+modelo.title+'"></td><td id="pro_description_'+modelo.tab_id+'"><textarea id="mod_description_'+modelo.tab_id+'" class="form-control form-control-sm descricao" type="text" rows="1">'+modelo.description+'</textarea></td>');

						$('#btn-ref-model-'+modelo.tab_id).click(function(){
							if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba do modelo "'+modelo.title+'"?')){
								chrome.runtime.sendMessage({callFunction: "refreshModels_"+modelo.tab_id});
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 2000);
							}
						});

						// Conta quantos preços tem e armazena na variavel prices
						var prices = 0;
						modelo.prices.forEach(function(preco){
							prices = prices + 1;
						});

						chrome.storage.local.get('max_pre', function(qtde){
							// Exibe os preços e máximos com base na quantidade obtida
							for(var i = 0; i < prices; i++){
								$('#'+modelo.tab_id).append('<td id="pro_price_'+i+'_'+modelo.tab_id+'"><input id="mod_price_'+i+'_'+modelo.tab_id+'" class="form-control form-control-sm preco" type="text" value="'+modelo.prices[i]+'"></td>');
								$('#'+modelo.tab_id).append('<td id="pro_maximum_'+i+'_'+modelo.tab_id+'"><input id="mod_maximum_'+i+'_'+modelo.tab_id+'" class="form-control form-control-sm maximo" type="text" value="'+modelo.maximum[i]+'"></td>');
							}

							// Exibe os campos desabilitados caso a quantidade de preços do modelo seja menor que a do modelo com mais preços
							if(prices < qtde.max_pre){
								for(var i = prices; i < qtde.max_pre; i++){
									$('#'+modelo.tab_id).append('<td id="pro_price_'+i+'_'+modelo.tab_id+'"><input id="mod_price_'+i+'_'+modelo.tab_id+'" class="form-control form-control-sm preco border-danger" type="text" value="" disabled></td>');
									$('#'+modelo.tab_id).append('<td id="pro_maximum_'+i+'_'+modelo.tab_id+'"><input id="mod_maximum_'+i+'_'+modelo.tab_id+'" class="form-control form-control-sm maximo border-danger" type="text" value="" disabled></td>');
								}
							}

							// Botão para adicionar preço individualmente
							$('#'+modelo.tab_id).append('<td id="pro_add_'+modelo.tab_id+'" class="text-center"><button id="btn-add-preco-'+modelo.tab_id+'" class="btn btn-success btn-sm rounded-1"><i class="fas fa-plus"></i></button></td>');
							$('#btn-add-preco-'+modelo.tab_id).click(function(){
								chrome.runtime.sendMessage({callFunction: "addPriceModels_"+modelo.tab_id});
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 500);
							});

							// Botão para remover preço individualmente
							$('#'+modelo.tab_id).append('<td id="pro_remove_'+modelo.tab_id+'" class="text-center"><button id="btn-remove-preco-'+modelo.tab_id+'" class="btn btn-danger btn-sm rounded-1"><i class="fas fa-minus"></i></button></td>');
							$('#btn-remove-preco-'+modelo.tab_id).click(function(){
								chrome.runtime.sendMessage({callFunction: "removePriceModels_"+modelo.tab_id});
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 500);
							});
						});

						$("#list_models").append('</tr>');
					});

					$("#list_models").append('</tbody>');
					$("#list_models").append('</table>');

					setTimeout(function(){
						$('.btn').addClass('disabled');
						$('input, select, textarea').prop('disabled', true);
					}, 10);
				}else{

					// Se não existir nenhum modelo aberto, desabilita os botões
					$('.btn').addClass('disabled');
					$('input[type="checkbox"]').prop('disabled', true);
					$("#dashboard").addClass('text-center');
					$("#dashboard").append('<p><strong>Nenhum registro encontrado ...</strong></p><div><button class="btn btn-primary" id="atualizar">Atualizar</button></div>');
					$('#atualizar').click(function(){
						window.location.reload();
					});
				}
			});
		}, 1000);
	}

/* ====================================== */



/* FUNÇÃO PARA SALVAR TODOS OS MODELOS ABERTOS NAS ABAS */

	$('#save_models').click(function(){
		if(confirm("*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*CERTIFIQUE-SE QUE AS INFORMAÇÕES FORAM ENVIADAS ANTES DE SALVAR!*\n\nDeseja mesmo salvar todos os modelos?")){
			$('.btn').addClass('disabled');
			chrome.runtime.sendMessage({callFunction: "saveModels"});
			setTimeout(function(){
				$('.btn').removeClass('disabled');
			}, 3000);
		}
	});

/* ====================================== */



/* FUNÇÃO PARA FECHAR TODOS OS MODELOS ABERTOS NAS ABAS */

	$('#close_models').click(function(){
		if(confirm("*CERTIFIQUE-SE QUE AS INFORMAÇÕES FORAM ENVIADAS ANTES DE FECHAR!*\n\nDeseja mesmo fechar todos os modelos?")){
			chrome.runtime.sendMessage({callFunction: "closeTabModel"});
		}
	});

/* ====================================== */

});