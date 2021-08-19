$(function(){

/* AÇÕES AO CARREGAR A PÁGINA */

	// Quando o dom carrega essa função é chamada para listar os respostas
	$(document).ready(function(){
		chrome.extension.getBackgroundPage().countTabs();
		listAnswers();
	});

	// Atualiza listagem de respostas e marca todos os checkbox das propriedades listadas
	$('#bt_refresh_page').click(function(){
		if(confirm("Você PERDERÁ todas as alterações caso não tenha salvo ou enviado para as abas! Deseja mesmo atualizar?")){
			window.location.reload();
		}
	});

	// Timeout de 1 segundo para dar tempo de carregar os registros e aplicar essas alterações
	setTimeout(function(){

		// Coloca borda verde nos elementos alterados
		$("input, textarea, select").change(function(){
			$(this).addClass('border-success');
			$(this).removeClass('border-danger');
			$('#save_answers').addClass('disabled');
		});
		
		$("[id^='pro_model_']").change(function(){
			var id = this.id.substring(10);
			$('#res_price_'+id).prop('disabled', true).addClass('border-warning');
			$('#warning').html('<strong>Envie as informações para desbloquear os campos!</strong>');
		});

		$("[id^='pro_categorie_']").change(function(){
			var id = this.id.substring(14);
			$('#res_price_'+id).prop('disabled', true).addClass('border-warning');
			$('#res_model_'+id).prop('disabled', true).addClass('border-warning');
			$('#warning').html('<strong>Envie as informações para desbloquear os campos!</strong>');
		});


		// Insere uma borda vermelha nos selects que estão como "Selecione"
		var selects = document.querySelectorAll("select");
		selects.forEach(function(select){
			try {
				if(select.children[select.selectedIndex].textContent == "Selecione"){
					$(select).addClass('border-danger');
				}
			} catch (error) {
				alert("Ocorreu um erro! ┐ (° _ °) ┌\n- A página será atualizada ...");
				window.location.reload();
			}
		});

		// Pega os dados obtidos das abas a primeira vez e depois de 1 segundo chama a função que coletas os mesmos dados para comparar
		// Para verificar se deu tempo de coletar todos eles atualizados ... Caso não tenha dado tempo, atualiza a pagina para tentar denovo
		var array1 = [];
		chrome.storage.local.get('respostas', function(data){
			if(data.respostas){
				var respostas = data.respostas;
				respostas.sort(function(a, b){
					if(a.tab_id < b.tab_id){
						return -1;
					}else{
						return true;
					}
				});
				respostas = JSON.stringify(respostas);
				console.log("Array-1 = "+respostas);
				array1.push(respostas);
				chrome.extension.getBackgroundPage().editAnswers();
			}
		});

		var array2 = [];
		setTimeout(function(){
			chrome.storage.local.get('respostas', function(data){
				if(data.respostas){
					var respostas = data.respostas;
					respostas.sort(function(a, b){
						if(a.tab_id < b.tab_id){
							return -1;
						}else{
							return true;
						}
					});
					respostas = JSON.stringify(respostas);
					console.log("Array-2 = "+respostas);
					array2.push(respostas);
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
				$("#loading-2").hide();
				array1 = [];
				array2 = [];
			}
		}, 1500);
		
	}, 1500);

/* ====================================== */



/* FUNÇÃO PARA LISTAR TODAS  AS RESPOSTAS */

	function listAnswers(){
		// Conta as abas novamente por prevenção
		chrome.extension.getBackgroundPage().countTabs();

		// Coleta todas as informações dos respostas abertos e armazena no storage
		chrome.extension.getBackgroundPage().editAnswers();

		// Exibe o spinner enquanto o setTimeout abaixo não é executado
		$("body").css({'overflow-y': 'hidden'});
		$("#list_answers_ind").html('');
		$("#list_answers_vin").html('');
		$("#tipo_ind").hide();
		$("#tipo_vin").hide();
		$("#dashboard").hide();
		$("#loading-1").html('<div id="spinner" class="spinner-border text-success" style="width: 80px; height: 80px;" role="status"><span class="visually-hidden">Loading...</span></div>');


		// setTimeout para dar tempo de coletar todos os dados das abas de respostas
		setTimeout(function(){
			// Remove o spinner para listar os respostas
			$("#spinner").hide();
			$("#dashboard").show();
			$("body").css({'overflow-y': 'auto'});

			// Pega o array de informações dos respostas armazenado no storage
			chrome.storage.local.get('respostas', function(data){
				var respostas = data.respostas;

				// If para não gerar erro caso não tenha nenhum resposta aberto
				if(respostas){
					$('#send_answers').removeClass('disabled');
					if(respostas.length == 1){
						$('#qtde_respostas').html('(' + respostas.length + ' resposta)');
					}else{
						$('#qtde_respostas').html('(' + respostas.length + ' respostas)');
					}

					$("#tipo_ind").show();
					$("#tipo_vin").show();

					var thAtualizarIND = '<th scope="col" class="atualiza-resposta prop-resposta-ext"><a href="#" id="refresh_answers_ind" class="btn btn-primary rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
					var thAtualizarVIN = '<th scope="col" class="atualiza-resposta prop-resposta-ext"><a href="#" id="refresh_answers_vin" class="btn btn-primary rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
					
					var thOrigem    = '<th scope="col" class="origem prop-resposta-ext">Origem</th>';
					var thStatus    = '<th scope="col" class="status prop-resposta-ext">Status</th>';
					var thExibir    = '<th scope="col" class="exibir prop-resposta-ext">Exibir</th>';
					var thTemplate  = '<th scope="col" class="template prop-resposta-ext">Template</th>';

					var thSKU       = '<th scope="col" class="sku prop-resposta-ext">SKU</th>';
					var thTitulo    = '<th scope="col" class="titulo prop-resposta-ext">Título</th>';
					var thDescricao = '<th scope="col" class="descricao prop-resposta-ext" id="th_desc">Descrição</th>';
					var thPreco     = '<th scope="col" class="preco prop-resposta-ext">Preço</th>';

					var thCategoria = '<th scope="col" class="categoria prop-resposta-ext">Categoria</th>';
					var thModelo    = '<th scope="col" class="modelo prop-resposta-ext">Modelo</th>';
					var thPrecos    = '<th scope="col" class="precos prop-resposta-ext">Preço</th>';

					// Insere o head da tabela de respostas individuais
					$("#list_answers_ind").append(
						'<table id="table_ind" class="table table-sm table-borderless table-hover" style="--bs-table-hover-bg: rgb(108 117 125 / 30%);">'
						+'<thead class="text-center"><tr id="tr_head">'
						+thAtualizarIND+thOrigem+thStatus+thSKU+thTitulo+thDescricao+thPreco+thExibir+thTemplate+'</tr>'
					);

					// Insere o head da tabela de respostas vinculadas
					$("#list_answers_vin").append(
						'<table id="table_vin" class="table table-sm table-borderless table-hover" style="--bs-table-hover-bg: rgb(108 117 125 / 30%);">'
						+'<thead class="text-center"><tr id="tr_head">'
						+thAtualizarVIN+thOrigem+thStatus+thCategoria+thModelo+thPrecos+thExibir+thTemplate+'</tr>'
					);

					// Função do botão de atualizar todas as abas de respostas individuais
					$('#refresh_answers_ind').click(function(){
						if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar respostas" individuais?')){
							chrome.extension.getBackgroundPage().refreshAnswers('all_ind');
					
							$('.btn').addClass('disabled');
					
							setTimeout(function(){
								$('.btn').removeClass('disabled');
							}, 3000)
						}
					});

					// Função do botão de atualizar todas as abas de respostas vinculadas
					$('#refresh_answers_vin').click(function(){
						if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar respostas" vinculadas?')){
							chrome.extension.getBackgroundPage().refreshAnswers('all_vin');
					
							$('.btn').addClass('disabled');
					
							setTimeout(function(){
								$('.btn').removeClass('disabled');
							}, 3000)
						}
					});

					var res_individuais = [];
					var res_vinculadas = [];

					respostas.forEach(function(resposta){
						if(resposta.title){
							res_individuais.push(resposta);
						}
						if(resposta.models){
							res_vinculadas.push(resposta);
						}
					});

					$("#table_ind").append('<tbody id="tbody_ind">');
					$("#table_vin").append('<tbody id="tbody_vin">');
					
					// função para organizar a lista na mesma ordem das abas
					res_individuais.sort(function(a, b){
						if(a.tab_id < b.tab_id){
							return -1;
						}else{
							return true;
						}
					});

					res_vinculadas.sort(function(a, b){
						if(a.tab_id < b.tab_id){
							return -1;
						}else{
							return true;
						}
					});

					console.log(res_individuais);
					console.log(res_vinculadas);


					// Exibe uma nova linha na tabela de individuais para cada resposta do array
					res_individuais.forEach(function(resposta){

						console.log(resposta);

						// formata a propriedade "status"
						switch(resposta.status){
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

						// formata a propriedade "exibir preço"
						switch(resposta.show_price){
							case 'Sim':
								var show_price_1 = '<option value="1" selected>Sim</option>';
								var show_price_2 = '<option value="2">Não</option>';
							break;

							case 'Não':
								var show_price_1 = '<option value="1">Sim</option>';
								var show_price_2 = '<option value="2" selected>Não</option>';
							break;
						}

						var tdAtualizar = '<td id="pro_ref_'+resposta.tab_id+'" class="text-center"><button id="btn-ref-answer-'+resposta.tab_id+'" class="btn btn-primary btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
						var tdOrigem    = '<td id="pro_origin_'+resposta.origin+'"><input id="res_origin_'+resposta.origin+'" class="form-control form-control-sm origem" type="text" value="'+resposta.origin+'" readonly></td>';
						var tdStatus    = '<td id="pro_status_'+resposta.tab_id+'"><select id="res_status_'+resposta.tab_id+'" class="form-select form-select-sm status">'+status_1+status_2+status_3+'</select></td>';
						var tdSKU       = '<td id="pro_sku_'+resposta.tab_id+'"><input id="res_sku_'+resposta.tab_id+'" class="form-control form-control-sm sku" type="text" value="'+resposta.sku+'"></td>';
						var tdTitulo    = '<td id="pro_title_'+resposta.tab_id+'"><input id="res_title_'+resposta.tab_id+'" class="form-control form-control-sm titulo" type="text" value="'+resposta.title+'"></td>';
						var tdDescricao = '<td id="pro_description_'+resposta.tab_id+'"><textarea id="res_description_'+resposta.tab_id+'" class="form-control form-control-sm descricao" type="text" rows="1">'+resposta.description+'</textarea></td>';
						var tdPreco     = '<td id="pro_price_'+resposta.tab_id+'"><input id="res_price_'+resposta.tab_id+'" class="form-control form-control-sm preco" type="text" value="'+resposta.price+'"></td>';
						var tdExibir    = '<td id="pro_show_price_'+resposta.tab_id+'"><select id="res_show_price_'+resposta.tab_id+'" class="form-select form-select-sm">'+show_price_1+show_price_2+'</select></td>';
						var tdTemplate  = '<td id="pro_template_'+resposta.tab_id+'"><select id="res_template_'+resposta.tab_id+'" class="form-select form-select-sm">'+resposta.templates+'</select></td>';

						$("#tbody_ind").append('<tr id="'+resposta.tab_id+'">'+tdAtualizar+tdOrigem+tdStatus+tdSKU+tdTitulo+tdDescricao+tdPreco+tdExibir+tdTemplate+'</tr>');

						// No caso de resposta de pergunta múltipla, desabilita o select de templates
						if(resposta.templates === false){
							$("#pro_template_"+resposta.tab_id).html('<div style="margin: 0; padding: 0; width: 250px;" class="alert alert-dark text-center"><strong>Resposta de Múltipla!</strong></div>');
						}

						$('#btn-ref-answer-'+resposta.tab_id).click(function(){
							if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba da resposta "'+resposta.title+'"?')){
								chrome.extension.getBackgroundPage().refreshAnswers(resposta.tab_id);
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 2000);
							}
						});

						$("#tbody_ind").append('</tbody>');
						$("#table_ind").append('</table>');
					});

					// Exibe uma nova linha na tabela de vinculadas para cada resposta do array
					res_vinculadas.forEach(function(resposta){

						console.log(resposta);

						// formata a propriedade "status"
						switch(resposta.status){
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

						// formata a propriedade "exibir preço"
						switch(resposta.show_price){
							case 'Sim':
								var show_price_1 = '<option value="1" selected>Sim</option>';
								var show_price_2 = '<option value="2">Não</option>';
							break;

							case 'Não':
								var show_price_1 = '<option value="1">Sim</option>';
								var show_price_2 = '<option value="2" selected>Não</option>';
							break;
						}

						var tdAtualizar = '<td id="pro_ref_'+resposta.tab_id+'" class="text-center"><button id="btn-ref-answer-'+resposta.tab_id+'" class="btn btn-primary btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
						var tdOrigem    = '<td id="pro_origin_'+resposta.origin+'"><input id="res_origin_'+resposta.origin+'" class="form-control form-control-sm origem" type="text" value="'+resposta.origin+'" readonly></td>';
						var tdStatus    = '<td id="pro_status_'+resposta.tab_id+'"><select id="res_status_'+resposta.tab_id+'" class="form-select form-select-sm status">'+status_1+status_2+status_3+'</select></td>';
						var tdCategoria = '<td id="pro_categorie_'+resposta.tab_id+'"><select id="res_categorie_'+resposta.tab_id+'" class="form-select form-select-sm categoria">'+resposta.categories+'</select></td>';
						var tdModelo    = '<td id="pro_model_'+resposta.tab_id+'"><select id="res_model_'+resposta.tab_id+'" class="form-select form-select-sm modelo">'+resposta.models+'</select></td>';
						var tdPreco     = '<td id="pro_price_'+resposta.tab_id+'"><select id="res_price_'+resposta.tab_id+'" class="form-select form-select-sm preco">'+resposta.prices+'</select></td>';
						var tdExibir    = '<td id="pro_show_price_'+resposta.tab_id+'"><select id="res_show_price_'+resposta.tab_id+'" class="form-select form-select-sm">'+show_price_1+show_price_2+'</select></td>';
						var tdTemplate  = '<td id="pro_template_'+resposta.tab_id+'"><select id="res_template_'+resposta.tab_id+'" class="form-select form-select-sm">'+resposta.templates+'</select></td>';

						$("#tbody_vin").append('<tr id="'+resposta.tab_id+'">'+tdAtualizar+tdOrigem+tdStatus+tdCategoria+tdModelo+tdPreco+tdExibir+tdTemplate+'</tr>');

						// No caso de resposta de pergunta múltipla, desabilita o select de templates
						if(resposta.templates === false){
							$("#pro_template_"+resposta.tab_id).html('<div style="margin: 0; padding: 0; width: 250px;" class="alert alert-dark text-center"><strong>Resposta de Múltipla!</strong></div>');
						}

						$('#btn-ref-answer-'+resposta.tab_id).click(function(){
							var modelo = document.getElementById('res_model_'+resposta.tab_id).selectedIndex + 1;
							var modelo = document.querySelector("#res_model_"+resposta.tab_id+" > option:nth-child("+modelo+")").innerHTML;
							if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba da resposta "'+modelo+'"?')){
								chrome.extension.getBackgroundPage().refreshAnswers(resposta.tab_id);
								$('.btn').addClass('disabled');
								setTimeout(function(){
									window.location.reload();
								}, 2000);
							}
						});

						$("#tbody_vin").append('</tbody>');
						$("#table_vin").append('</table>');
					});

					// Esconde a tabela de individuais se não tiver nenhuma
					if(!res_individuais[0]){
						$('#tipo_ind').hide();
						$('#table_ind').hide();
					}

					// Esconde a tabela de vinculadas se não tiver nenhuma
					if(!res_vinculadas[0]){
						$('#tipo_vin').hide();
						$('#table_vin').hide();
					}

					$('.btn').addClass('disabled');
					$('input, select, textarea').prop('disabled', true);
				}else{

					// Se não existir nenhum resposta aberto, desabilita os botões
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


/* FUNÇÃO PARA ENVIAR AS ALTERAÇÕES DAS RESPOSTAS PARA AS ABAS */

	var newAnswer = [];
	$('#send_answers').click(function(){

		// Desabilida os botões pros abestado não fazer cagada (Para garantir que quando forem habilitados novamente, as informações tenham sido enviadas)
		$('.btn').addClass('disabled');

		newAnswer = [];
		chrome.storage.local.get('respostas', function(data){
			var respostas = data.respostas;

			// Coleta todas as informações da lista (tabela)
			if(respostas){

				var res_individuais = [];
				var res_vinculadas = [];

				respostas.forEach(function(resposta){
					if(resposta.title){
						res_individuais.push(resposta);
					}
					if(resposta.models){
						res_vinculadas.push(resposta);
					}
				});

				res_individuais.forEach(function(resposta){

					if(document.getElementById('res_template_'+resposta.tab_id)){
						var addAnswer = {
							tab_id: resposta.tab_id,
							sku: document.getElementById('res_sku_'+resposta.tab_id).value,
							status: document.getElementById('res_status_'+resposta.tab_id).value,
							title: document.getElementById('res_title_'+resposta.tab_id).value,
							description: document.getElementById('res_description_'+resposta.tab_id).value,
							price: document.getElementById('res_price_'+resposta.tab_id).value,
							show_price: document.getElementById('res_show_price_'+resposta.tab_id).value,
							template: document.getElementById('res_template_'+resposta.tab_id).selectedIndex
						}
					}else{
						var addAnswer = {
							tab_id: resposta.tab_id,
							sku: document.getElementById('res_sku_'+resposta.tab_id).value,
							status: document.getElementById('res_status_'+resposta.tab_id).value,
							title: document.getElementById('res_title_'+resposta.tab_id).value,
							description: document.getElementById('res_description_'+resposta.tab_id).value,
							price: document.getElementById('res_price_'+resposta.tab_id).value,
							show_price: document.getElementById('res_show_price_'+resposta.tab_id).value,
							template: false
						}
					}

					console.log(addAnswer);

					newAnswer.push(addAnswer);
				});

				res_vinculadas.forEach(function(resposta){

					if(document.getElementById('res_template_'+resposta.tab_id)){
						var addAnswer = {
							tab_id: resposta.tab_id,
							status: document.getElementById('res_status_'+resposta.tab_id).value,
							categorie: document.getElementById('res_categorie_'+resposta.tab_id).selectedIndex,
							model: document.getElementById('res_model_'+resposta.tab_id).selectedIndex,
							price: document.getElementById('res_price_'+resposta.tab_id).selectedIndex,
							show_price: document.getElementById('res_show_price_'+resposta.tab_id).value,
							template: document.getElementById('res_template_'+resposta.tab_id).selectedIndex
						}
					}else{
						var addAnswer = {
							tab_id: resposta.tab_id,
							status: document.getElementById('res_status_'+resposta.tab_id).value,
							categorie: document.getElementById('res_categorie_'+resposta.tab_id).selectedIndex,
							model: document.getElementById('res_model_'+resposta.tab_id).selectedIndex,
							price: document.getElementById('res_price_'+resposta.tab_id).selectedIndex,
							show_price: document.getElementById('res_show_price_'+resposta.tab_id).value,
							template: false
						}
					}

					console.log(addAnswer);

					newAnswer.push(addAnswer);
				});
			}else{
				console.log(respostas);
			}

			// Seta o novo array "respostas", com as informações do array antigo alteradas pelo usuário
			console.log(newAnswer);
			chrome.storage.local.set({'respostas': newAnswer});

			// Conta as abas denovo pra poder comparar na hora de enviar
			chrome.extension.getBackgroundPage().countTabs();
		});

		// Envia as informações do novo array para as abas
		setTimeout(function(){
			chrome.storage.local.get('answer_tabs', function(tabs){
				chrome.storage.local.get('respostas', function(data){
					console.log('Quantidade de Abas: ' + tabs.answer_tabs);
					console.log('Quantidade de Respostas: ' + data.respostas.length);
	                if(tabs.answer_tabs == data.respostas.length){
	                	console.log('Quantidade válida');
						chrome.extension.getBackgroundPage().sendAnswers();


						// Habilita novamente os botões
						setTimeout(function(){
							alert("Alterações enviadas com sucesso! *(Ainda precisam ser salvas!)*\n- Finalizado em " + (tabs.answer_tabs * 100)/1000 + " segundos");
							window.location.reload();
						}, tabs.model_tabs * 100);
	                }else{
	                	alert('A quantidade de abas abertas para editar os respostas não é igual a quantidade da lista!');
						$('.btn').removeClass('disabled');
	                }
            	});
            });
		}, 1000);
	});

/* ====================================== */



/* FUNÇÃO PARA SALVAR TODOS OS RESPOSTAS ABERTOS NAS ABAS */

	$('#save_answers').click(function(){
		if(confirm("*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*CERTIFIQUE-SE QUE AS INFORMAÇÕES FORAM ENVIADAS ANTES DE SALVAR!*\n\nDeseja mesmo salvar todos as respostas?")){
			$('.btn').addClass('disabled');
			chrome.extension.getBackgroundPage().saveAnswers();
			setTimeout(function(){
				$('.btn').removeClass('disabled');
			}, 1200);
		}
	});

/* ====================================== */



/* FUNÇÃO PARA FECHAR TODOS OS RESPOSTAS ABERTOS NAS ABAS */

	$('#close_answer').click(function(){
		chrome.extension.getBackgroundPage().closeTabAnswer();
	});

/* ====================================== */

});