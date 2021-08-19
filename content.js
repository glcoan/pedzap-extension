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

if(window.location.pathname.includes('/webapp/globais/cardapio/') || window.location.pathname.includes('/webapp/globais/home/')){
	var contentWebAppQrCode = true;
}

const insertCategory = window.location.pathname.includes('/categorias/inserir');
const insertTemplate = window.location.pathname.includes('/templates/inserir');
const insertQuestion = window.location.pathname.includes('/perguntas/inserir');
const insertGroup = window.location.pathname.includes('/cardapios_grupos/inserir');
const insertItem = window.location.pathname.includes('/itens/inserir/');
const insertModel = window.location.pathname.includes('/modelos/inserir/');
const insertAnswer = window.location.pathname.includes('/respostas/inserir/');
const insertPrinter = window.location.pathname.includes('/estabelecimentos_impressoras/inserir');

const editTemplate = window.location.pathname.includes('/templates/editar');
const editCategory = window.location.pathname.includes('/categorias/editar');
const editGroup = window.location.pathname.includes('/cardapios_grupos/editar');

const ordering = window.location.pathname.includes('/ordenacao');
const register = window.location.pathname.includes('/completar/');

// TROLAGEM NOTIFICAÇÕES

//var pedido = document.querySelector("#mp3_novo_pedido");
//var ajuda = document.querySelector("#mp3_ajuda");
//var notificacao = document.querySelector("#mp3_notificacao");

//pedido.parentNode.removeChild(pedido);
//ajuda.parentNode.removeChild(ajuda);
//notificacao.parentNode.removeChild(notificacao);

//document.querySelector("body").insertAdjacentHTML('afterbegin', '<audio id="mp3_novo_pedido" controls="" style="display: none"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/pararanpanpanpan.mp3" type="audio/ogg"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/pararanpanpanpan.mp3" type="audio/mpeg"></audio>');
//document.querySelector("body").insertAdjacentHTML('afterbegin', '<audio id="mp3_ajuda" controls="" style="display: none"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/pia%20de%20bosta.mp3" type="audio/ogg"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/pia%20de%20bosta.mp3" type="audio/mpeg"></audio>');
//document.querySelector("body").insertAdjacentHTML('afterbegin', '<audio id="mp3_notificacao" controls="" style="display: none"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/gemidao.mp3" type="audio/ogg"><source src="https://menumakerpedzap.000webhostapp.com/audiostroll/gemidao.mp3" type="audio/mpeg"></audio>');

if((!insertQuestion && !ordering && !insertCategory && !insertTemplate && !insertGroup && !editTemplate && !editCategory && !editGroup) && (listGroups || listCategories || listTemplates || listItems || listModels || listQuestions || listAnswers || listOrders || listClients)){
	
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

			if(document.getElementById('startIntro')){
				document.getElementById('startIntro').style.display = "none";
			}
			if(document.getElementById('estChatBotao')){
				document.getElementById('estChatBotao').style.display = "none";
			}
			if(document.getElementsByClassName('btn btn-circle red-thunderbird tooltips')[1]){
				document.getElementsByClassName('btn btn-circle red-thunderbird tooltips')[1].style.display = "none";
			}

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

/* GERADOR QRCODE NA PÁGINA DO WEBAPP */

if(contentWebAppQrCode){

	var color1 = document.querySelector("#webapp-topo").style.background;
	var color2 = document.querySelector("#bt-menu").style.color;
	if(color1.length > 20){
		var color1 = '#00BC69';
		var color2 = '#FFFFFF';
	}
	console.log(color1);
	console.log(color2);

	setTimeout(function(){
		document.querySelector("#balaoQrCode").style.visibility = 'visible';
	}, 2100);

	function modalQrCode() {
		document.querySelector("head").insertAdjacentHTML('beforeend',
			'<style> #balaoQrCode{ position: fixed; right: 10px; top: 100px; visibility: hidden;'+
			'animation-name: balao; animation-delay: 2s; animation-duration: 1.2s; animation-direction: alternative; box-shadow: 2px 2px 10px -3px #555; }'+
			'@keyframes balao{ 0% { right: -900px; top: 100px; } 80% { right: 15px; top: 100px; } 85% { right: 5px; top: 100px; }'+
			'90% { right: 12px; top: 100px; } 95% { right: 8px; top: 100px; } 100% { right: 10px; top: 100px; }}'+
			'.tooltiptext::after { content: ""; position: absolute; top: 38%; left: 100%; border-width: 5px;'+
			'border-style: solid; border-color: transparent transparent transparent #333; } </style>'
		);

		document.querySelector(".page-container").insertAdjacentHTML('beforeend',
			'<div id="balaoQrCode" class="pt-2 img-rounded" style="width: 90px; height: 115px; background-color: #FFF; padding: 2px 5px 5px 5px;">'+
				'<div>'+
					'<img src="https://www.pedzap.com.br/uploads/estabelecimentos/644_174_644_webapp_logomarca_256-_1__full.png" style="margin: 0px 0px 2px 2px; width: 20px;">'+
					'<button id="btnCloseQrCode" type="button" class="btn btn-link" style="margin: 0px 0px 2px 40px; padding: 2px; color: #4e4e4e;"><i class="fa fa-times"></i></button>'+
				'</div>'+
				'<div>'+
					'<button id="btnGeraQrCode" type="button" class="btn btn-info" style="width: 80px; height: 80px; padding-top: 33px; background-color: '+color1+'; border: none;">'+
						'<a href="" style="color: '+color2+';" download="QrCode.png"><i class="fa fa-qrcode fa-5x"></i></a>'+
					'</button>'+
				'</div>'+
				'<span class="tooltiptext img-rounded" style="top: 148px; right: 100px; position: fixed; color: white; background-color: #333; padding: 3px; visibility: hidden;">'+
					'QrCode baixado com sucesso!<br>Clique <a id="editQrcode" href="#" style="color: #00f1aa;">aqui</a> para customizar'+
				'</span>'+
			'</div>'+
			'<div id="qrCodeGerado" hidden></div>'
		);
	}

	function geraQrcode() {
		var tagQrCode = document.getElementById("qrCodeGerado");
		var texto = window.location.protocol + "//" + window.location.hostname + "/";
		var logo = document.querySelector("#logo > img");

		if(logo){
			logo = logo.src.replace('_128', '')
			if(logo.includes('?cfc=')){
				logo = logo.slice(0, -13);
				console.log('TEM SETE CARACTERES!');
			}
			if(logo.slice(-1) != 'g'){
				logo = logo + 'g';
			}
		}
		console.log(logo);

		// Options
		var options = {
			text: texto,
			width: 600,
			height: 600,
			logo: logo,
			logoWidth: 270,
			logoHeight: 270,
			logoBackgroundTransparent: true,
			quietZone: 20,
			onRenderingEnd: () => {
				var canvas = document.querySelector('#qrCodeGerado > canvas');
				var dataURL = canvas.toDataURL();
			
				document.querySelector("#btnGeraQrCode > a").href = dataURL;
				console.log("Link injetado!");
			}
		};
		
		// Create QRCode Object
		new QRCode(tagQrCode, options);
	}

	modalQrCode();
	//btnModalQrCode();
	setTimeout(() => {
		geraQrcode();
	}, 1000);


	document.getElementById('btnCloseQrCode').addEventListener("click", function(){
		let id = null;
		//let id2 = null;
		const elem = document.getElementById('balaoQrCode');
		//const elem2 = document.getElementById('btnBalaoEscondido');
		document.querySelector(".tooltiptext").style.visibility = "hidden";
		let pos = 10;
		//let pos2 = -80;
		clearInterval(id);
		//clearInterval(id2);

		id = setInterval(frame, 1);
		function frame() {
			if (pos == 300) {
				clearInterval(id);
				elem.style.visibility = "hidden";
			} else {
				pos++;
				elem.style.right = "-" + pos + "px";
			}
		}
	})

	document.getElementById('btnGeraQrCode').addEventListener("click", function(){
		document.querySelector(".tooltiptext").style.visibility = "visible";
	});

	document.querySelector("#editQrcode").addEventListener('click', function(){
		chrome.runtime.sendMessage({mensagem: 'Ola'});
	});
}

if(register){
	// PAGAMENTOS
	document.querySelector("#est_aceita_dinheiro").click();
	document.querySelector("#est_aceita_debito").click();
	document.querySelector("#est_aceita_credito").click();

	// CONFIGURAÇÕES
	document.querySelector("#est_entrega").selectedIndex = 1;
	document.querySelector("#est_entrega").dispatchEvent(new Event('change'));

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
	
	// COLOCA O NOME FANTASIA NOS CAMPOS DE NOME DO WEBAPP E MENU
	document.querySelector("#est_nomefantasia").addEventListener('keyup', function(){
		document.querySelector("#est_webapp_nome").value = document.querySelector("#est_nomefantasia").value;
		document.querySelector("#est_menu_nome").value = document.querySelector("#est_nomefantasia").value;
		document.querySelector("#usu_nome").value = document.querySelector("#est_nomefantasia").value;
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

	document.querySelector("#form > div:nth-child(1) > div.portlet-title").insertAdjacentHTML('beforeEnd', 
	'<img id="autoDrink" class="pull-right" style="width: 40px; cursor: pointer;" '+
	'src="https://www.pedzap.com.br/uploads/estabelecimentos/644_176_bottle_full.png">');

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

		document.querySelector("#ite_dias_venda_all").click();
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
}

if(insertQuestion){
	document.querySelector("#per_status").selectedIndex = 2;
	document.querySelector("#per_status").dispatchEvent(new Event('change'));
}

if(insertPrinter){
	document.querySelector("#imp_status").selectedIndex = 2;
	document.querySelector("#imp_status").dispatchEvent(new Event('change'));

	document.querySelector("#imp_qztray").selectedIndex = 3;
	document.querySelector("#imp_qztray").dispatchEvent(new Event('change'));

	document.querySelector("#todas").click();

	document.querySelector("#imp_nome").value = "Impressora";

	document.querySelector("#imp_dispositivo").selectedIndex = 1;
	document.querySelector("#imp_dispositivo").dispatchEvent(new Event('change'));

	document.querySelector("#imp_tracejados").focus();
	document.querySelector("#imp_tracejados").value = 46;

	document.querySelector("#imp_fonte").selectedIndex = 1;
	document.querySelector("#imp_fonte").dispatchEvent(new Event('change'));

	document.querySelector("#imp_tamanhofonte").selectedIndex = 1;
	document.querySelector("#imp_tamanhofonte").dispatchEvent(new Event('change'));

	document.querySelector("#imp_espacamentolinha").value = 10;

	document.querySelector("#imp_margemesquerda").value = 0;

	document.querySelector("#imp_margemtopo").value = 0;

	document.querySelector("#imp_margemrodape").value = 3;

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

	document.querySelector("#imp_qrcode_entregador").selectedIndex = 2;
	document.querySelector("#imp_qrcode_entregador").dispatchEvent(new Event('change'));

	document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(2)").click();
}