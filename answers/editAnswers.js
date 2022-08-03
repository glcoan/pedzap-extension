import { scriptTabMenu } from "../background.js";

$(function(){

/* SCRIPT TAB MENU */

	scriptTabMenu();

/* ====================================== */



/* AÇÕES AO CARREGAR A PÁGINA */

	// Quando o dom carrega essa função é chamada para listar os respostas
	$(document).ready(function(){
		chrome.runtime.sendMessage({callFunction: "countTabs"}, (response) => { console.log(response); });
		listAnswers();
	});

	// Timeout de 1 segundo para dar tempo de carregar os registros e aplicar essas alterações
	setTimeout(function(){

		// Coloca borda verde nos elementos alterados
		$("input, textarea, select").change(function(){
			$(this).addClass('border-success');
			$(this).removeClass('border-danger');

			if(this.id.includes('res_template_') || this.id.includes('res_categorie_') || this.id.includes('res_model_') || (this.id.includes('res_price_') && this.tagName == 'SELECT') ){
				var answer = {
					id: this.id,
					value: this.selectedIndex
				}
			}else{
				var answer = {
					id: this.id,
					value: this.value
				}
				console.log(answer);
			}
			chrome.runtime.sendMessage({answer: answer}, (response) => { console.log(response); });
		});

        $("[id^='pro_model_']").change(function(){
			let id = this.id.substring(10);

			let select = document.getElementById('res_price_'+id);
			select.selectedIndex = 0;
			select.dispatchEvent(new Event('change'));
			$('#res_price_'+id).prop('disabled', true).addClass('border-danger');

			$('#warning').show();
		});

		$("[id^='pro_categorie_']").change(function(){
			let id = this.id.substring(14);

			let select1 = document.getElementById('res_price_'+id);
			select1.selectedIndex = 0;
			select1.dispatchEvent(new Event('change'));
			$('#res_price_'+id).prop('disabled', true).addClass('border-danger');
			
			let select2 = document.getElementById('res_model_'+id);
			select2.selectedIndex = 0;
			select2.dispatchEvent(new Event('change'));
			$('#res_model_'+id).prop('disabled', true).addClass('border-danger');
			
			$('#warning').show();
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
				chrome.runtime.sendMessage({callFunction: "editAnswers"}, (response) => { console.log(response); });
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

		// Coleta todas as informações dos respostas abertos e armazena no storage
		chrome.runtime.sendMessage({callFunction: "editAnswers"}, (response) => { console.log(response); });

		// Exibe o spinner enquanto o setTimeout abaixo não é executado
		$("body").css({'overflow-y': 'hidden'});
		$("#list_answers_ind").html('');
		$("#list_answers_vin").html('');
		$("#tipo_ind").hide();
		$("#tipo_vin").hide();
		$("#loading-1").html('<div id="spinner" class="spinner-border text-success" style="width: 80px; height: 80px;" role="status"><span class="visually-hidden">Loading...</span></div>');

		// setTimeout para dar tempo de coletar todos os dados das abas de respostas
		setTimeout(function(){
			// Remove o spinner para listar os respostas
			$("#spinner").hide();
			$("body").css({'overflow-y': 'auto'});

			// Pega o array de informações dos respostas armazenado no storage
			chrome.storage.local.get('respostas', function(data){
				var respostas = data.respostas;

				// If para não gerar erro caso não tenha nenhum resposta aberto
				if(respostas){
					if(respostas.length == 1){
						$('#qtde_respostas').html(respostas.length);
					}else{
						$('#qtde_respostas').html(respostas.length);
					}

					$("#tipo_ind").show();
					$("#tipo_vin").show();

					var thAtualizarIND = '<th scope="col" class="atualiza-resposta prop-resposta-ext"><a href="#" id="refresh_answers_allInd" class="btn btn-primary text-light rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
					var thAtualizarVIN = '<th scope="col" class="atualiza-resposta prop-resposta-ext"><a href="#" id="refresh_answers_allVin" class="btn btn-primary text-light rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
					
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
					$('#refresh_answers_allInd').click(function(){
						if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar respostas" individuais?')){
							chrome.runtime.sendMessage({callFunction: "refreshAnswers_allInd"}), (response) => { console.log(response); }; 
					
							$('.btn').addClass('disabled');
					
							setTimeout(function(){
								$('.btn').removeClass('disabled');
							}, 3000)
						}
					});

					// Função do botão de atualizar todas as abas de respostas vinculadas
					$('#refresh_answers_allVin').click(function(){
						if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar respostas" vinculadas?')){
							chrome.runtime.sendMessage({callFunction: "refreshAnswers_allVin"}), (response) => { console.log(response); }; 
					
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

						var tdAtualizar = '<td id="pro_ref_'+resposta.tab_id+'" class="text-center"><button id="btn-ref-answer-'+resposta.tab_id+'" class="btn btn-primary text-light btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
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
							$("#pro_template_"+resposta.tab_id).html('<div style="margin: 0; padding: 0; width: 250px;" class="alert alert-dark text-center"><strong>Resposta de múltipla!</strong></div>');
						}

						$('#btn-ref-answer-'+resposta.tab_id).click(function(){
							if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba da resposta "'+resposta.title+'"?')){
								chrome.runtime.sendMessage({callFunction: "refreshAnswers_"+resposta.tab_id}, (response) => { console.log(response); });
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

						var tdAtualizar = '<td id="pro_ref_'+resposta.tab_id+'" class="text-center"><button id="btn-ref-answer-'+resposta.tab_id+'" class="btn btn-primary text-light btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
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
							$("#pro_template_"+resposta.tab_id).html('<div style="margin: 0; padding: 0; width: 250px;" class="alert alert-dark text-center"><strong>Resposta de múltipla!</strong></div>');
						}

						$('#btn-ref-answer-'+resposta.tab_id).click(function(){
							var modelo = document.getElementById('res_model_'+resposta.tab_id).selectedIndex + 1;
							var modelo = document.querySelector("#res_model_"+resposta.tab_id+" > option:nth-child("+modelo+")").innerHTML;
							if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba da resposta "'+modelo+'"?')){
								chrome.runtime.sendMessage({callFunction: "refreshAnswers_"+resposta.tab_id}, (response) => { console.log(response); });
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
				}
			});
		}, 1000);
	}

/* ====================================== */



/* FUNÇÃO PARA SALVAR TODOS OS RESPOSTAS ABERTOS NAS ABAS */

	$('#save_answers').click(function(){
		if(confirm("*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n\nDeseja mesmo salvar todos as respostas?")){
			$('.btn').addClass('disabled');
			chrome.runtime.sendMessage({callFunction: "saveAnswers"}, (response) => { console.log(response); });
			setTimeout(function(){
				$('.btn').removeClass('disabled');
			}, 1200);
		}
	});

/* ====================================== */



/* FUNÇÃO PARA FECHAR TODOS OS RESPOSTAS ABERTOS NAS ABAS */

	$('#close_answers').click(function(){
		if(confirm("*CERTIFIQUE-SE QUE AS INFORMAÇÕES FORAM SALVAS ANTES DE FECHAR!*\n\nDeseja mesmo fechar todas as respostas?")){
			chrome.runtime.sendMessage({callFunction: "closeTabAnswer"}, (response) => { console.log(response); });
		}
	});

/* ====================================== */

});