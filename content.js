//ABRIR EDITAR E PERGUNTAS

const listGroups = window.location.pathname.includes('/cardapios_grupos');
const listCategories = window.location.pathname.includes('/categorias');
const listTemplates = window.location.pathname.includes('/templates');
const listItems = window.location.pathname.includes('/itens/index');
const listModels = window.location.pathname.includes('/modelos/index');
const listQuestions = window.location.pathname.includes('/perguntas/index');
const listAnswers = window.location.pathname.includes('/respostas/index');
const listOrders = window.location.pathname.includes('/pedidos');
const listClients = window.location.pathname.includes('/clientes');

const insertCategory = window.location.pathname.includes('/categorias/inserir');
const insertTemplate = window.location.pathname.includes('/templates/inserir');
const insertQuestion = window.location.pathname.includes('/perguntas/inserir');
const insertGroup = window.location.pathname.includes('/cardapios_grupos/inserir');
const insertItem = window.location.pathname.includes('/itens/inserir/');
const insertModel = window.location.pathname.includes('/modelos/inserir/');
const insertAnswer = window.location.pathname.includes('/respostas/inserir/');
const insertPrinter = window.location.pathname.includes('/estabelecimentos_impressoras/inserir');
const insertBot = window.location.pathname.includes('/administrador/bots/inserir');

const editTemplate = window.location.pathname.includes('/templates/editar');
const editCategory = window.location.pathname.includes('/categorias/editar');
const editGroup = window.location.pathname.includes('/cardapios_grupos/editar');

const editModel = window.location.pathname.includes('/modelos/editar');
const editItem = window.location.pathname.includes('/itens/editar');
const editAnswer = window.location.pathname.includes('/respostas/editar');

const ordering = window.location.pathname.includes('/ordenacao');
const register = window.location.pathname.includes('/completar/');

function injectCode(src) {
	const script = document.createElement('script');
    // This is why it works!
    script.src = src;
    script.onload = function() {
        this.remove();
    };
	const interval = setInterval(() => {
		if(document.head){
			document.head.insertAdjacentElement("beforeend", script);
			clearInterval(interval);
		}
	}, 1);
}

var verifyEditConfigs = setInterval(() => {
	if(editConfigs != undefined){
		clearInterval(verifyEditConfigs);
		if(editConfigs == true){
				
			var btn1 = '<a class="btn btn-circle green tooltips" id="ext-copy-address" '+
			'data-original-title="[EXT] Copiar Endereço" data-placement="bottom" '+
			'style="margin: 17px 0px 17px 2px; width: 50px"><i class="fa fa-map-marker"></i></a>';
			document.getElementById('estBotoes').insertAdjacentHTML('beforeend', btn1);
			
			var button = document.getElementById("ext-copy-address");
			button.addEventListener("click", ()=>{
				var address = document.querySelector("#est_endereco").value;
				var number = document.querySelector("#est_numero").value;
				var complement = document.querySelector("#est_complemento").value;
				var district = document.querySelector("#est_bairro").value;
				var city = document.querySelector("#estabelecimentos_cid_id").selectedIndex + 1;
				city = document.querySelector("#estabelecimentos_cid_id > option:nth-child("+city+")").innerText;
				var state =  document.querySelector("#estabelecimentos_cid_uf").value;
				
				if(complement == ''){
					var completeAddress = address+', '+number+' - '+district+' - '+city+'/'+state;
				}else{
					var completeAddress = address+', '+number+', '+complement+' - '+district+' - '+city+'/'+state;
				}

				var textareaValue = document.querySelector("#est_anotacoes").value;
				var textarea = document.querySelector("#est_anotacoes");

				textarea.value = completeAddress;
				textarea.select();
				document.execCommand("copy");
				alert('Endereço copiado para a área de transferência!\n\n"'+completeAddress+'"');

				textarea.value = textareaValue;
			});
		}
	}
}, 100);

if(
	(
		!insertQuestion &&
		!ordering &&
		!insertCategory &&
		!insertTemplate &&
		!insertGroup &&
		!editTemplate &&
		!editCategory &&
		!editGroup
	)
&& 
	(
		listGroups ||
		listCategories ||
		listTemplates ||
		listItems ||
		listModels ||
		listQuestions ||
		listAnswers ||
		listOrders ||
		listClients
	)
){
	
	document.querySelector("#datatable_ajax_length > label > select").selectedIndex = 7;
	document.querySelector("#datatable_ajax_length > label > select").dispatchEvent(new Event('change'));

	function getLinks(){
		var edit_all = Array.from(document.querySelectorAll("[data-original-title='Editar'"));
		var quest_all = Array.from(document.querySelectorAll("[data-original-title='Perguntas'"));
		var noLinks = document.querySelector("#datatable_ajax > tbody > tr > td");
		var estButttons = document.getElementById('estBotoes');

		var btn1 = '<a class="btn btn-circle green tooltips" id="ext-open-link-edit" '+
		'data-original-title="[EXT] Editar todos" data-placement="bottom" '+
		'style="margin: 17px 0px 17px 2px; width: 60px"><b>'+
		edit_all.length+' </b><i class="fa fa-edit"></i></a>';

		var btn2 = '<a class="btn btn-circle green tooltips" id="ext-open-link-quest" '+
		'data-original-title="[EXT] Abrir todas as perguntas" '+
		'data-placement="bottom" style="margin: 17px 0px 17px 5px; width: 60px"><b>'+
		quest_all.length+' </b><i class="fa fa-question-circle"></i></a>';
		
		if(edit_all.length == 0 && noLinks){
			clearInterval(interval1);
		}
		if(edit_all.length != 0 && estButttons){
			clearInterval(interval1);

			if(document.querySelector("#ext-open-link-quest")){
				document.querySelector("#ext-open-link-edit").remove();
				document.querySelector("#ext-open-link-quest").remove();
			}
			estBotoes.insertAdjacentHTML('beforeend', btn1+btn2);
			var button1 = document.getElementById("ext-open-link-edit");
			var button2 = document.getElementById("ext-open-link-quest");

			if(quest_all.length == 0){
				button2.style.display = "none";
			}

			button1.addEventListener("click", function() {
				if(confirm(edit_all.length +" links encontrados. Deseja abrir todos?")){
					edit_all.forEach(function(element, index){
						setTimeout(function(){
							window.open(element.getAttribute("href"));
						}, 200 * (index + 1));
					});
				}
			}, false);
		
			button2.addEventListener("click", function() {
				if(confirm(quest_all.length +" links encontrados. Deseja abrir todos?")){
					quest_all.forEach(function(element, index){
						setTimeout(function(){
							window.open(element.getAttribute("href"));
						}, 200 * (index + 1));
					});
				}
			}, false);
		}
	}
	
	var interval1 = setInterval(function(){
		getLinks();
	}, 200);

	document.querySelector("#datatable_ajax_filter > label > input").addEventListener('keyup', function(){
		setTimeout(function(){
			getLinks();
		}, 3000);
	});

	document.querySelector("#datatable_ajax > thead > tr").addEventListener('click', function(){
		setTimeout(function(){
			getLinks();
		}, 1000);
	});

	if(!listOrders && !listClients){
		document.querySelector("#datatable_ajax_wrapper > div:nth-child(1) > div:nth-child(2) > div > button").addEventListener('click', function(){
			setTimeout(function(){
				getLinks();
			}, 1000);
		});
	}

	document.querySelector("#datatable_ajax_length > label > select").addEventListener('change', function(){
		setTimeout(function(){
			getLinks();
		}, 1000);
	});	
}

if(document.getElementById('startIntro')){
	document.getElementById('startIntro').style.display = "none";
}
if(document.getElementById('estChatBotao')){
	document.getElementById('estChatBotao').style.display = "none";
}
if(document.getElementsByClassName('btn btn-circle red-thunderbird tooltips')[1]){
	document.getElementsByClassName('btn btn-circle red-thunderbird tooltips')[1].style.display = "none";
}

// BOTÕES PARA MUDAR TODOS OS STATUS DAS OPÇÕES DAS LISTAS
if (listItems || listModels || listAnswers) {
	injectCode(chrome.runtime.getURL('helpers/changeStatus.js'));
}
// FIM DO SCRIPT DOS BOTÕES PARA MUDAR TODOS OS STATUS DAS OPÇÕES DAS LISTAS

if(register){
	// PAGAMENTOS
	document.querySelector("#est_aceita_dinheiro").click();
	document.querySelector("#est_aceita_debito").click();
	document.querySelector("#est_aceita_credito").click();

	// CONFIGURAÇÕES
	document.querySelector("#est_entrega").selectedIndex = 1;
	document.querySelector("#est_entrega").dispatchEvent(new Event('change'));
	document.querySelector("#est_pedidominimo_entrega").value = 0;
	document.querySelector("#est_pedidominimo_entrega").dispatchEvent(new Event('input'));


	// DEIXAR ESSA PARTE MESMO QUE NÃO ESTEJA MAIS APARECENDO NA RECEPÇÃO, ELA APENAS ESTÁ ESCONDIDA
	document.querySelector("#est_cardapio_modo").selectedIndex = 2;
	document.querySelector("#est_cardapio_modo").dispatchEvent(new Event('change'));

	document.querySelector("#est_cardapio_paginas").selectedIndex = 2;
	document.querySelector("#est_cardapio_paginas").dispatchEvent(new Event('change'));

	document.querySelector("#est_cardapio_entrega").selectedIndex = 2;
	document.querySelector("#est_cardapio_entrega").dispatchEvent(new Event('change'));

	document.querySelector("#est_videointroducao_modo_1").click();
	document.querySelector("#est_videointroducao_modo_2").click();
	document.querySelector("#est_videointroducao_modo_3").click();
	
	//FUNCIONAMENTO
	for(i=1;i<=7;i++){
		document.querySelector("#funcionamento > thead > tr > th.no-sort > button").click();
	}
	document.querySelector("#funcionamento\\[1\\]\\[fun_dia\\]").selectedIndex = 1;
	document.querySelector("#funcionamento\\[2\\]\\[fun_dia\\]").selectedIndex = 2;
	document.querySelector("#funcionamento\\[3\\]\\[fun_dia\\]").selectedIndex = 3;
	document.querySelector("#funcionamento\\[4\\]\\[fun_dia\\]").selectedIndex = 4;
	document.querySelector("#funcionamento\\[5\\]\\[fun_dia\\]").selectedIndex = 5;
	document.querySelector("#funcionamento\\[6\\]\\[fun_dia\\]").selectedIndex = 6;
	document.querySelector("#funcionamento\\[7\\]\\[fun_dia\\]").selectedIndex = 7;
	

	// COLOCA O EMAIL DA ABA DADOS NO USUÁRIO
	document.querySelector("#usu_email").value = document.querySelector("#est_emails").value;
	
	// COLOCA O WHATSAPP PRINCIPAL NO TELEFONE DO USUÁRIO
	document.querySelector("#est_telefone1").addEventListener('keyup', function(){
		document.querySelector("#usu_telefone").value = document.querySelector("#est_telefone1").value;
		document.querySelector("#usu_telefone").dispatchEvent(new Event('input'));
	});

	// COLOCA O NOME FANTASIA NOS CAMPOS DE NOME DO WEBAPP E MENU E NOME DE USUÁRIO
	document.querySelector("#est_nomefantasia").addEventListener('keyup', function(){
		document.querySelector("#est_webapp_nome").value = document.querySelector("#est_nomefantasia").value;
		document.querySelector("#est_menu_nome").value = document.querySelector("#est_nomefantasia").value;
		document.querySelector("#usu_nome").value = document.querySelector("#est_nomefantasia").value;
		document.querySelector("#usu_usuario").value = document.querySelector("#est_nomefantasia").value.toLowerCase();
		document.querySelector("#usu_usuario").dispatchEvent(new Event('input'));
	});

	//COLOCA O HORÁRIO DE FUNCIONAMENTO DO WEBAPP NO DO MENU DIGITAL
	document.querySelector("#est_webapp_funcionamento").addEventListener('keyup', function(){
		document.querySelector("#est_menu_funcionamento").value = document.querySelector("#est_webapp_funcionamento").value;
	});

	//COLOCA O HORÁRIO DE FUNCIONAMENTO DO MENU DIGITAL NO DO WEBAPP
	document.querySelector("#est_menu_funcionamento").addEventListener('keyup', function(){
		document.querySelector("#est_webapp_funcionamento").value = document.querySelector("#est_menu_funcionamento").value;
	});

	document.querySelector("#est_custoentrega_modo").selectedIndex = 1;
	document.querySelector("#est_custoentrega_modo").dispatchEvent(new Event('change'));

	document.querySelector("#est_aceitar_regiao_nao_atendida").selectedIndex = 1;
	document.querySelector("#est_aceitar_regiao_nao_atendida").dispatchEvent(new Event('change'));

	document.querySelector("#est_autocompletar").selectedIndex = 1;
	document.querySelector("#est_autocompletar").dispatchEvent(new Event('change'));
}

if(insertItem){

	let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined){
        recognition = new SpeechRecognition();
    }

	document.querySelector("#form > div:nth-child(1) > div.portlet-body > div:nth-child(3) > div > div > label").insertAdjacentHTML(
		'afterEnd', 
		'<div style="display: inline; margin: 0px 8px; padding: 0px 5px; color: #32C4D1; border: 1px solid #32C4D1; cursor: pointer;" id="mic-input-titulo"><i class="fa fa-microphone"></i></div>'
	);

	document.querySelector("#mic-input-titulo").addEventListener("click", ()=>{
		if(recognition !== null) {
			console.log("Clicou e instanciou o onjeto!")
			recognition.onstart = () => {
				console.log("iniciou");
			}
			recognition.onend = () => {
				console.log("encerrou");
			}
			recognition.onresult = (e) => {
				let texto = e.results[0][0].transcript;
				texto = texto[0].toUpperCase() + texto.substr(1);
				document.querySelector("#ite_titulo").value = texto;
			}
			recognition.start();
		}
	});

	document.querySelector("#form > div:nth-child(1) > div.portlet-title").insertAdjacentHTML('beforeEnd',
	'<a href="#" id="autoDrink" class="btn btn-outline green pull-right"><i class="fa fa-bolt fa-lg"></i></a>');

	document.querySelector("#autoDrink").addEventListener('click', function(){

		document.querySelector("#coz_id").selectedIndex = 1;
		document.querySelector("#coz_id").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_vender_robo").selectedIndex = 1;
		document.querySelector("#ite_vender_robo").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_vender_webapp").selectedIndex = 1;
		document.querySelector("#ite_vender_webapp").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_vender_menu").selectedIndex = 1;
		document.querySelector("#ite_vender_menu").dispatchEvent(new Event('change'));

		document.querySelector("#ite_exigir_quantidade_robo").selectedIndex = 1;
		document.querySelector("#ite_exigir_quantidade_robo").dispatchEvent(new Event('change'));

		document.querySelector("#ite_exigir_quantidade_webapp").selectedIndex = 1;
		document.querySelector("#ite_exigir_quantidade_webapp").dispatchEvent(new Event('change'));

		document.querySelector("#ite_exigir_quantidade_menu").selectedIndex = 1;
		document.querySelector("#ite_exigir_quantidade_menu").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_entrega_gratis").selectedIndex = 2;
		document.querySelector("#ite_entrega_gratis").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_propontos").selectedIndex = 1;
		document.querySelector("#ite_propontos").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_propontos_multiplicador").selectedIndex = 1;
		document.querySelector("#ite_propontos_multiplicador").dispatchEvent(new Event('change'));
		
		document.querySelector("#ite_modo_preco").selectedIndex = 1;
		document.querySelector("#ite_modo_preco").dispatchEvent(new Event('change'));

		document.querySelector("#ite_tipo_preco").selectedIndex = 1;
		document.querySelector("#ite_tipo_preco").dispatchEvent(new Event('change'));

		//Script para marcar os checkbox de dias para venda com verificação se já está selecionado caso clique duas vezes 
		for (let i = 0; i <= 6; i++) {
			if(document.getElementsByClassName('dias_venda')[i].checked == true){
				var dias = true;
			}
			if(dias == true){
				break;
			}
			if(i == 6){
				if(document.querySelector("#ite_dias_venda_all").checked == true){
					document.querySelector("#ite_dias_venda_all").click();
					document.querySelector("#ite_dias_venda_all").click();
				}else{
					document.querySelector("#ite_dias_venda_all").click();
				}
			}
		}

		document.querySelector("#ite_horarios_venda").selectedIndex = 2;
		document.querySelector("#ite_horarios_venda").dispatchEvent(new Event('change'));
	});
}

if(insertModel){
	document.querySelector("#mod_status").selectedIndex = 2;
	document.querySelector("#mod_status").dispatchEvent(new Event('change'));

	document.querySelector("#precos > thead > tr > th.no-sort > button").click();
}

if(insertAnswer){
	document.querySelector("#res_status").selectedIndex = 2;
	document.querySelector("#res_status").dispatchEvent(new Event('change'));

	if(document.querySelector("#res_tipo").selectedIndex == 4){
		alert("vinculado!");
	}
}

if(insertQuestion){
	document.querySelector("#per_status").selectedIndex = 2;
	document.querySelector("#per_status").dispatchEvent(new Event('change'));
}

if(insertPrinter){

	document.querySelector("#form > div.portlet > div.portlet-title").insertAdjacentHTML('beforeEnd', 
	'<img id="autoPrinter" class="pull-right" style="width: 40px; cursor: pointer;" '+
	'src="https://images.tcdn.com.br/img/img_prod/687149/impressora_termica_epson_tm_t20x_usb_serial_101435_1_20201212200134.png">');

	document.querySelector("#autoPrinter").addEventListener('click', function(){

		
		document.querySelector("#imp_status").selectedIndex = 2;
		document.querySelector("#imp_status").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_qztray").selectedIndex = 3;
		document.querySelector("#imp_qztray").dispatchEvent(new Event('change'));
		
		document.querySelector("#todas").click();
		
		document.querySelector("#imp_nome").value = "Impressora";

		document.querySelector("#imp_template").selectedIndex = 1;
		document.querySelector("#imp_template").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_dispositivo").selectedIndex = 1;
		document.querySelector("#imp_dispositivo").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_tracejados").value = 30;
		document.querySelector("#imp_tracejados").dispatchEvent(new Event('input'));
		
		document.querySelector("#imp_fonte").selectedIndex = 1;
		document.querySelector("#imp_fonte").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_tamanhofonte").selectedIndex = 1;
		document.querySelector("#imp_tamanhofonte").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_espacamentolinha").value = 10;
		
		document.querySelector("#imp_margemesquerda").value = 0;
		document.querySelector("#imp_margemesquerda").dispatchEvent(new Event('input'));
		
		document.querySelector("#imp_margemtopo").value = 0;
		document.querySelector("#imp_margemtopo").dispatchEvent(new Event('input'));
		
		document.querySelector("#imp_margemrodape").value = 3;
		document.querySelector("#imp_margemrodape").dispatchEvent(new Event('input'));
		
		document.querySelector("#imp_imprimirpendente").selectedIndex = 2;
		document.querySelector("#imp_imprimirpendente").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimiraceito").selectedIndex = 1;
		document.querySelector("#imp_imprimiraceito").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimirpreparado").selectedIndex = 2;
		document.querySelector("#imp_imprimirpreparado").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimirfechamento").selectedIndex = 1;
		document.querySelector("#imp_imprimirfechamento").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_limites").selectedIndex = 2;
		document.querySelector("#imp_imprimir_limites").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_contato").selectedIndex = 1;
		document.querySelector("#imp_imprimir_contato").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_realizados").selectedIndex = 2;
		document.querySelector("#imp_imprimir_realizados").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_endereco").selectedIndex = 1;
		document.querySelector("#imp_imprimir_endereco").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_itens").selectedIndex = 1;
		document.querySelector("#imp_imprimir_itens").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_itens_preco").selectedIndex = 1;
		document.querySelector("#imp_imprimir_itens_preco").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_itens_codigo").selectedIndex = 2;
		document.querySelector("#imp_imprimir_itens_codigo").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_itens_sku").selectedIndex = 2;
		document.querySelector("#imp_imprimir_itens_sku").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_itens_quantidade").selectedIndex = 1;
		document.querySelector("#imp_imprimir_itens_quantidade").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_observacoes").selectedIndex = 1;
		document.querySelector("#imp_imprimir_observacoes").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_imprimir_total").selectedIndex = 1;
		document.querySelector("#imp_imprimir_total").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_modo_multiplas").selectedIndex = 2;
		document.querySelector("#imp_modo_multiplas").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_ocultar_nulos").selectedIndex = 1;
		document.querySelector("#imp_ocultar_nulos").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_remover_acentuacao").selectedIndex = 1;
		document.querySelector("#imp_remover_acentuacao").dispatchEvent(new Event('change'));
		
		document.querySelector("#imp_qrcode_entregador").selectedIndex = 1;
		document.querySelector("#imp_qrcode_entregador").dispatchEvent(new Event('change'));

		document.querySelector("#imp_qrcode_entregador_modo").selectedIndex = 2;
		document.querySelector("#imp_qrcode_entregador_modo").dispatchEvent(new Event('change'));
		
		//document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(2)").click();
	});
}

if(ordering){
	document.querySelector("#estBotoes > a:last-child").remove();
	document.querySelector("#estBotoes > a:last-child").remove();
	sortButton = document.querySelector("#estBotoes").insertAdjacentHTML("beforeEnd", '<a class="btn btn-circle green tooltips" id="ext-sort-list"'+
	'data-original-title="[EXT] Ordem alfabética" data-placement="bottom"'+
	' style="margin: 17px 0px 17px 2px; width: 50px"><i class="fa fa-sort-alpha-asc"></i></a>');

	var sortButton = document.getElementById("ext-sort-list");
	sortButton.addEventListener("click", function() {
		if(confirm("Deseja mesmo ordenar a lista? Esta ação é irreversível!")){
			var ordem = [];
			// Converte a string JSON retornada do input para um array de objetos
			ordem = JSON.parse(document.querySelector("#ordenacao").value);
			
			// Adiciona o titulo aos objetos onde antes só tinham o ID
			var c = 0;
			document.querySelectorAll("#lista > ol > li > div").forEach((div)=>{
				// Normalize remove todas as acentuações das letras
				ordem[c] = {id: ordem[c].id, titulo:div.innerHTML.normalize("NFD")};
				c += 1;
			});
			
			// Coloca o array em ordem alfabética
			ordem.sort((a, b)=>{
				return (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0);
			});
			
			// Remove o titulo dos objetos do array para inserir no input de volta
			ordem.forEach((item)=>{
				delete item.titulo;
			});
			
			// Por fim define o valor do input que controla a ordem e salva
			document.querySelector("#ordenacao").value = JSON.stringify(ordem);
			document.querySelector("#ordenacao").dispatchEvent(new Event('input'));
			document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(1)").click();
		}
	}, false);
}