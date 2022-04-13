
const urlEstab = window.location.pathname.includes('/estabelecimento');
const urlAdmin = window.location.pathname.includes('/administrador');
const editConfigs = window.location.pathname.includes('/estabelecimentos/editar');


/* =============== TEMA PEDZAP =============== */

if(urlEstab || urlAdmin){

	var theme; // Variável que irá armazenar o tema

	
	function atribuiTema() {
		
		document.querySelector("head").insertAdjacentHTML('afterend',
			'<style id="styleDarkMode">'+
				'*::-webkit-scrollbar { width: 16px; height: 16px; } '+
				'*::-webkit-scrollbar-track { background: #37435A; } '+
				'*::-webkit-scrollbar-thumb { background-color: #1F2B3D; border-radius: 20px; border: 3px solid #37435A; } '+

				'.page-content { background-color: #1f2b3d!important; } '+
				'.portlet.light, .page-bar { background-color: #37435a!important; border-color: #37435a!important; color: #efefef!important; } '+
				'.page-container-bg-solid { color: #efefef!important; } '+
				'.selected { border-color: transparent #17c4bb transparent transparent!important; } '+
				'.page-bar .page-breadcrumb>li>i, .page-bar .page-breadcrumb>li>a, .page-bar .page-breadcrumb>li>span { color: #efefef!important; } '+
				'#datatable_ajax > thead > tr > th { background-color: #26344B!important; border-color: #1f2b3d!important; } '+
				'#datatable_ajax > thead > tr { background-color: #43516c!important; border-color: #1f2b3d!important; } '+
				'.form-control[disabled], .form-control[readonly], fieldset[disabled], .form-control, .bootstrap-select .btn, .inputfile-6+label, .inputfile-6+label strong { background-color: #43516c!important; border: 0px!important; color: #efefef!important; } '+
				'.table-scrollable>.table, .table-scrollable { background-color: #26344b!important; border-color: #26344b!important; } '+
				'.portlet>.portlet-title { border-bottom: 1px solid #32c5d2!important; } '+
				'.table-bordered, .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th { border: 0px!important; } '+
				'.mt-checkbox>span { background: #43516c!important; border: 0px!important; } '+
				'#tab_dados .mt-checkbox>span, #tab_configuracoes .mt-checkbox>span { background: #37435a!important; border: 0px!important; } '+
				'#tab_pagamentos > div > div.portlet-body > div.row > div > div > div > div > div > div > label > span { border: 0px!important; background: #37435a!important; } '+
				'#datatable_ajax > tbody > tr:nth-of-type(even) > td > label > span { background: #43516c!important; border: 0px!important; } '+
				'#datatable_ajax > tbody > tr:nth-of-type(odd) > td > label > span { background: #37435a!important; border: 0px!important; } '+
				'.mt-checkbox>span:after { border-color: #17c4bb!important; } '+
				'.page-header.navbar .page-logo { background-color: #2a3e92!important; } '+
				'.page-header.navbar .page-top { background-color: #26344b!important; } '+
				'.page-container-bg-solid .page-title, .page-container-bg-solid .page-title small { color: #efefef!important; font-weight: 400!important; } '+
				'.btn.blue-chambray:not(.btn-outline) { background-color: #43516c!important; border-color: #43516c!important; } '+
				'.form-group .dropdown-menu li a, .form-group .bootstrap-select.open .btn, .form-group .bootstrap-select.open.dropup .btn, .btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover, .open>.btn-default.dropdown-toggle.focus, .open>.btn-default.dropdown-toggle:focus, .open>.btn-default.dropdown-toggle:hover { background-color: #43516c!important; border-color: #1f2b3d!important; color: #efefef!important; } '+
				'.form-group .dropdown-menu li.active a, .dropdown-menu li.active:hover a, .dropdown-menu li:hover a { background-color: #37435a!important; color: #efefef!important; } '+
				'.bootstrap-select.btn-group .no-results { background-color: #43516c!important; } '+
				'#form > div:nth-child(2) > div.portlet-body > div:nth-child(12) > div > div > div { background-color: #43516c!important; border: 0px!important; } '+
				'.table-striped>tbody>tr:nth-of-type(odd), #datatable_ajax > tbody > tr:nth-of-type(odd) > td.sorting_1 { background-color: #43516c!important; border-color: #1f2b3d!important; } '+
				'.table-striped>tbody>tr:nth-of-type(even), #datatable_ajax > tbody > tr:nth-of-type(even) > td.sorting_1 { background: #37435a!important; } '+
				'.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th { border-top: 0px!important; } '+
				'#precos > tbody > tr, #anydesks > tbody > tr, #envolvidos > tbody > tr, #funcionamento > tbody > tr, #custosentrega > tbody > tr { background: #37435a!important; } '+
				'.table-hover>tbody>tr:hover, .table-hover>tbody>tr:hover>td, #datatable_ajax > tbody > tr:nth-of-type(odd):hover > td, #datatable_ajax > tbody > tr:nth-of-type(even):hover > td { background: #3b4963!important; } '+
				'table.dataTable.no-footer { border-bottom-color: #1f2b3d!important; } '+
				'.lx-portlet-datatable #datatable_ajax_wrapper .table-scrollable { border-bottom: 1px solid #26344b!important; } '+
				'.dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_processing, .dataTables_wrapper .dataTables_paginate { color: #efefef!important; }'+
				'.btn.default:not(.btn-outline) { color: #efefef!important; background-color: #26344b!important; border: 0px!important; height: 33px!important; }'+
				'.btn.default:not(.btn-outline):hover {background-color: #1f2b3d!important; }'+
				'#highcharts-0 > svg > rect { fill: rgb(55, 67, 90); color: #efefef!important; }'+
				'#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-0.highcharts-tracker > path { stroke: rgb(239 239 239)!important; } '+
				'body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > div.row > div.col-md-8.col-md-pull-4 > div:nth-child(2) > div > div > div.portlet-body > div:nth-child(2) > div > div > div { border: 1px solid #26344b!important; } '+
				'body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > div.row > div.col-md-4.col-md-push-8 > div:nth-child(1) > div > div > div > i { color: #2c3e50!important; } '+
				'.gestor-foto { border: 5px solid #26344b!important; } '+
				'#highcharts-0 > svg > g.highcharts-legend > g > g > g > text { color: #efefef!important; fill: #efefef!important; } '+
				'#highcharts-0 > svg > g.highcharts-legend > g > g > g:hover > text { color: #bdbdbd!important; fill: #bdbdbd!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown.open .dropdown-toggle, .page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-toggle:hover { background-color: #1f2b3d!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-extended .dropdown-menu { border: 1px solid #1f2b3d!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-extended .dropdown-menu>li.external { background: #26344b!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-extended .dropdown-menu .dropdown-menu-list>li>a { border-bottom: 0px!important; color: #efefef!important; background-color: #43516c!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-extended .dropdown-menu .dropdown-menu-list>li>a:hover { color: #efefef; background-color: #37435a; } '+
				'.dropdown-menu { background-color: #43516c!important; border: 1px solid #37435a!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-menu>li>a, .page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-menu>li>a>i { color: #efefef!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-menu:before, .page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-menu:after { border-bottom: 6px solid #17c4bb!important; } '+
				'.divider { background-color: #32c5d2!important; } '+
				'.font-grey-mint { color: #efefef!important; } '+
				'.font-dark { color: #efefef!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-notification .dropdown-menu .dropdown-menu-list>li>a .time { background: #1f2b3d!important; color: #efefef!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-notification .dropdown-menu .dropdown-menu-list>li>a:hover .time { background: #1f2b3d!important; color: #efefef!important; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-user>.dropdown-menu { border: 1px solid #1f2b3d!important; background-color: #43516c; } '+
				'.page-header.navbar .top-menu .navbar-nav>li.dropdown-user .dropdown-menu>li>a, .page-header.navbar .top-menu .navbar-nav>li.dropdown-user .dropdown-menu>li>a>i { color: #efefef!important; } '+
				'.input-group-addon { background-color: #26344b!important; border: 0px!important; color: #efefef!important; } '+
				'.dropdown-menu>li>a, .dropdown-menu>li>a>i { color: #efefef!important; } '+
				'.dropdown-menu>li>a:focus { background-color: #37435A!important; } '+
				'span.parametros { background: rgb(67 81 108)!important; border: 1px solid rgb(31 43 61)!important; } '+
				'.sweet-alert, .sweet-alert .sa-icon.sa-success::before, .sweet-alert .sa-icon.sa-success::after, .sweet-alert .sa-icon.sa-success .sa-fix { background-color: #37435A!important; } '+
				'.sweet-alert h2, .text-muted { color: #efefef!important; } '+
				'.sweet-alert .sa-icon.sa-success .sa-line { background-color: #36c6d3!important; } '+
				'.sweet-alert .sa-icon.sa-success .sa-placeholder { border: 4px solid rgb(54 198 211 / 20%)!important; } '+
				'.dd-handle { color: #efefef!important; border: 1px solid #1f2b3d!important; background: #43516c!important; } '+
				'.dd-handle:hover { color: #efefef!important; border: 1px solid #1f2b3d!important; background: #37435a!important; } '+
				'.dd-placeholder { border-color: #1f2b3d!important; background: #26344B!important; } '+
				'#tab_dados > div:nth-child(1) > div.portlet-body > div:nth-child(1) > div > div > div, #tab_dados > div:nth-child(1) > div.portlet-body > div:nth-child(4) > div > div > div, #form > div:nth-child(1) > div.portlet-body > div:nth-child(12) > div > div > div { border: 0px!important; background: #43516c!important; } '+
				'.tabbable-custom>.tab-content { border-color: #37435a!important; } '+
				'.tabbable-custom>.nav-tabs>li.active>a { color: #efefef!important; background-color: #37435a!important; } '+
				'.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a { border-left: 1px solid #37435a!important; border-right: 1px solid #37435a!important; } '+
				'.loading-message { background: #32C5D2!important; border-color: #32C5D2!important; } '+
				'.loading-message > span { color: #efefef!important; } '+
				'.loading-message > img { content: url("https://www.negocioseguroaig.com.br/wp-content/uploads/2020/09/carregar.gif")!important; width: 22px!important; } '+
				'.blockOverlay { display: none!important; } '+
				'.font-blue-chambray { color: #efefef!important; } '+
				'#tab_pagamentos > div > div.portlet-body > div.row > div > div > div { border: 0px!important; background: #43516c!important; } '+
				'#tab_pagamentos > div > div.portlet-body > div.row > div > div > div > hr { border-top: 1px solid #26344b!important; } '+
				'#tab_pagamentos > div > div.portlet-body > div.row > div > div > div > div > div > div > div > button, #tab_pagamentos > div > div.portlet-body > div.row > div > div > div > div.row > div > div > input { background-color: #37435a!important; } '+
				'#estTransferencia > div > div > div > div, #estPix > div > div > div > div, #estWhatsappPay > div > div > div > div, #estMercadoPago > div > div > div > div, #estPagseguro > div > div > div > div, #estPicPay > div > div > div > div, #estCielo > div > div > div > div { border: 0px!important; background: #43516c!important; } '+
				'#tab_pagamentos input, #tab_pagamentos textarea, #tab_pagamentos .note.note-info { background: #37435a!important; color: #efefef!important; } '+
				'#tab_incentivos .note.note-info, #tab_autoreply .note.note-info, #tab_gateway .note.note-info, #tab_webapp .note.note-info, #tab_menu .note.note-info, #tab_lojas .note.note-info, #tab_rastreamento .note.note-info, #tab_acesso .note.note-info { background: #43516C!important; color: #efefef!important; } '+
				'#tab_pagamentos a { color: #32c5d2!important; } '+
				'#tab_configuracoes > div > div.portlet-body > div > div.col-md-4 > div > div { background: #43516c!important; border: 0px!important; } '+
				'.iti--separate-dial-code .iti__selected-flag { background-color: #26344b!important; } '+
				'.iti--separate-dial-code .iti__selected-flag:hover { background-color: #1f2b3d!important; } '+
				'.iti__flag-container { padding: 0px!important; } '+
				'.botoes-flutuantes { box-shadow: 0 1px 20px rgb(31 43 61 / 75%)!important; } '+
				'.btn-default { color: #efefef!important; background: #26344b!important; border: 0px!important; } '+
				'.help-block { color: #bdbdbd!important; } '+
				'.pace .pace-progress { background: #32c5d2!important; } '+
				'span.input-group-btn { border-left: 0px!important; } '+
				'#form > div:nth-child(2) > div.portlet-body > div:nth-child(3) > div > div > div { background-color: #43516C!important; border: 0px!important;} '+
				'.popover-content { background-color: #43516C!important;} '+
				'.modal-content { background-color: #37435A!important;} '+
				'.mt-checkbox>span { background-color: #37435a!important;} '+
				'.panel { background-color: #26344b!important;} '+
				'.panel-default { border-color: #1f2b3d!important;} '+
				'.panel-default>.panel-heading { background-color: #1f2b3d!important; color: #dddddd!important;} '+
				'.panel-title > a:hover { color: #3598dc!important;} '+
				'table.dataTable td.sorting_1, table.dataTable td.sorting_2, table.dataTable td.sorting_3, table.dataTable th.sorting_1, table.dataTable th.sorting_2, table.dataTable th.sorting_3 {background-color: #37435a!important;}'+
				'#estAnotacoes > div { background-color: #26344b!important;} '+
				'body > div.page-no-javascript > div.page-container > div.page-content-wrapper > div > div:nth-child(12) > div > div > div.portlet-body > div > div > div > table > thead > tr > th { background-color: #43516c!important;}'+
				'#form > div > div.portlet-body > div:nth-child(3) > div > div > div { background-color: #43516c!important; border-color: #43516c!important;}'+
			'</style>'
		);
	}	
	
	
	function insertBtnPower() {

		document.querySelector("body > div.page-no-javascript > div.page-header.navbar.navbar-fixed-top > div > div.page-top > div > ul").insertAdjacentHTML('afterbegin', 
			'<li class="dropdown dropdown-tasks">'+
				'<a href="#" id="powerDarkMode" class="dropdown-toggle">'+
					'<i class="fa fa-adjust"></i>'+
				'</a>'+
			'</li>'
		);
		
		document.querySelector("#powerDarkMode").addEventListener('click', function () {
			
			if(theme === "dark"){
				chrome.storage.local.set({'tema': "light"});
				tema("light");
				return;
			}
			if(theme === "light"){
				chrome.storage.local.set({'tema': "dark"});
				tema("dark");
				return;
			}
		});

		// Estilo do botão de ligar/desligar tema
		document.querySelector("head").insertAdjacentHTML('beforeend',
		'<style>'+
			'.page-header.navbar .top-menu .navbar-nav>li.dropdown>.dropdown-toggle:last-child { padding-right: 16px; } '+
		'</style>'
		);
	}

	const interval = setInterval(() => {

		if(document.querySelector('body > div.page-no-javascript > div.page-header.navbar.navbar-fixed-top > div > div.page-top > div > ul')){

			insertBtnPower();

			clearInterval(interval);
		}
	}, 0);

	
	// Função te atribui o tema à página
	function tema(t) {
		if(t === "dark"){

			// Chama a função que altera o tema da página
			const interval = setInterval(() => {

				if(document.querySelector('html')){
		
					atribuiTema();
		
					clearInterval(interval);
				}
			}, 0);

			if(editConfigs){
				var buscaTHead = setInterval(()=>{
					if(document.querySelector("#custosentrega_bairro > thead")){
						document.querySelector("#custosentrega_bairro > thead").style.backgroundColor = "#26344B";
						clearInterval(buscaTHead);
					}
				}, 10);
			}

			theme = t; // Atribui a va
		}
		if(t === "light"){

			var styleDarkMode = document.querySelector("#styleDarkMode");
			if(styleDarkMode){ styleDarkMode.parentNode.removeChild(styleDarkMode); }

			if(editConfigs){
				var buscaTHead = setInterval(()=>{
					if(document.querySelector("#custosentrega_bairro > thead")){
						document.querySelector("#custosentrega_bairro > thead").style.backgroundColor = "#fff";
						clearInterval(buscaTHead);
					}
				}, 10);
			}

			theme = t;
		}
	}
	
	// Verifica o tema escolhido pelo usuário no navegador e chama a função que atribui o tema à página
	chrome.storage.local.get('tema', function(data){
		tema(data.tema);
	});

	if(editConfigs){
		var searchElement = setInterval(()=>{
			if(document.querySelector("#custosentrega_bairro > thead")){
				clearInterval(searchElement);
				if(theme == "light"){
					document.querySelector("#custosentrega_bairro > thead").setAttribute('style', 'position: sticky; top: 0; z-index: 3; background-color: #fff;');
				}else{
					document.querySelector("#custosentrega_bairro > thead").setAttribute('style', 'position: sticky; top: 0; z-index: 3; background-color: #26344B;');
				}
			}
		}, 300);
	}

}

/* ====================================== */
