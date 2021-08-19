$(function(){

    /* VERIFICA O ESTADO EM STORAGE DAS PROPRIEDADES LISTADAS, SE TIVER "HIDE", NÃO VAI LISTAR AQUELA PROPRIEDADE ESPECÍFICA */

    chrome.storage.local.get('pro_sku_ite', function(data){
        if(data.pro_sku_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_sku').prop('checked', false);
                $("th.sku.prop-item-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_group_ite', function(data){
        if(data.pro_group_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_group').prop('checked', false);
                $("th.grupo.prop-item-ext").hide();
                $("[id^='pro_group']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_title_ite', function(data){
        if(data.pro_title_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_titulo').prop('checked', false);
                $("th.titulo.prop-item-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_description_ite', function(data){
        if(data.pro_description_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_descricao').prop('checked', false);
                $("th.descricao.prop-item-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_price_ite', function(data){
        if(data.pro_price_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_price').prop('checked', false);
                $("th.preco.prop-item-ext").hide();
                $("[id^='pro_price']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_robot_ite', function(data){
        if(data.pro_sell_robot_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_v_robo').prop('checked', false);
                $("th.robo1.prop-item-ext").hide();
                $("[id^='pro_sell_robot_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_webapp_ite', function(data){
        if(data.pro_sell_webapp_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_v_webapp').prop('checked', false);
                $("th.webapp1.prop-item-ext").hide();
                $("[id^='pro_sell_webapp_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_menu_ite', function(data){
        if(data.pro_sell_menu_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_v_menu').prop('checked', false);
                $("th.menu1.prop-item-ext").hide();
                $("[id^='pro_sell_menu_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_robot_ite', function(data){
        if(data.pro_req_robot_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_q_robo').prop('checked', false);
                $("th.robo2.prop-item-ext").hide();
                $("[id^='pro_req_robot_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_webapp_ite', function(data){
        if(data.pro_req_webapp_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_q_webapp').prop('checked', false);
                $("th.webapp2.prop-item-ext").hide();
                $("[id^='pro_req_webapp_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_menu_ite', function(data){
        if(data.pro_req_menu_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_q_menu').prop('checked', false);
                $("th.menu2.prop-item-ext").hide();
                $("[id^='pro_req_menu_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_template_ite', function(data){
        if(data.pro_template_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_template').prop('checked', false);
                $("th.template.prop-item-ext").hide();
                $("[id^='pro_template_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_delivery_ite', function(data){
        if(data.pro_delivery_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_entrega').prop('checked', false);
                $("th.entrega.prop-item-ext").hide();
                $("[id^='pro_delivery_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_points_ite', function(data){
        if(data.pro_points_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_pontos').prop('checked', false);
                $("th.pontos.prop-item-ext").hide();
                $("[id^='pro_points_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_spacing_ite', function(data){
        if(data.pro_spacing_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_espaco').prop('checked', false);
                $("th.espaco.prop-item-ext").hide();
                $("[id^='pro_spacing_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_tab_title_ite', function(data){
        if(data.pro_tab_title_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_t_title').prop('checked', false);
                $("th.t-titulo.prop-item-ext").hide();
                $("[id^='pro_tab_title_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_tab_price_ite', function(data){
        if(data.pro_tab_price_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_t_price').prop('checked', false);
                $("th.t-preco.prop-item-ext").hide();
                $("[id^='pro_tab_price_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_refresh_ite', function(data){
        if(data.pro_refresh_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_refresh').prop('checked', false);
                $("th.atualiza-item.prop-item-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_add_ite', function(data){
        if(data.pro_add_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_add').prop('checked', false);
                $("th.novo-preco.prop-item-ext").hide();
                $("[id^='pro_add_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_remove_ite', function(data){
        if(data.pro_remove_ite == 'hide'){
            setTimeout(function(){
                $('#btn_pro_remove').prop('checked', false);
                $("th.exclui-preco.prop-item-ext").hide();
                $("[id^='pro_remove_']").hide();
            }, 1200);
        }
    });

    /* ====================================== */
    
    
    
    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR ITENS */
    
	// Botão para clicar em todos os checkbox's
	$('#btn_pro_all').click(function(){
        $('input[type=checkbox]').click();
	});
    
	// Checkbox para mostrar e esconder a propriedade "sku" dos itens
	$('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').is(':checked')){
            $("th.sku.prop-item-ext").show();
			$("[id^='pro_sku']").show();
			chrome.storage.local.set({'pro_sku_ite': 'show'});
		}else{
            $("th.sku.prop-item-ext").hide();
			$("[id^='pro_sku']").hide();
			chrome.storage.local.set({'pro_sku_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "grupo" dos itens
	$('#btn_pro_group').click(function(){
        if($('#btn_pro_group').is(':checked')){
            $("th.grupo.prop-item-ext").show();
			$("[id^='pro_group']").show();
			chrome.storage.local.set({'pro_group_ite': 'show'});
		}else{
            $("th.grupo.prop-item-ext").hide();
			$("[id^='pro_group']").hide();
			chrome.storage.local.set({'pro_group_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "titulo" dos itens
	$('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').is(':checked')){
            $("th.titulo.prop-item-ext").show();
			$("[id^='pro_title']").show();
			chrome.storage.local.set({'pro_title_ite': 'show'});
		}else{
            $("th.titulo.prop-item-ext").hide();
			$("[id^='pro_title']").hide();
			chrome.storage.local.set({'pro_title_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "descricao" dos itens
	$('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').is(':checked')){
            $("th.descricao.prop-item-ext").show();
			$("[id^='pro_description']").show();
			chrome.storage.local.set({'pro_description_ite': 'show'});
		}else{
            $("th.descricao.prop-item-ext").hide();
			$("[id^='pro_description']").hide();
			chrome.storage.local.set({'pro_description_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "preço" dos itens
	$('#btn_pro_price').click(function(){
        if($('#btn_pro_price').is(':checked')){
            $("th.preco.prop-item-ext").show();
			$("[id^='pro_price']").show();
			chrome.storage.local.set({'pro_price_ite': 'show'});
		}else{
            $("th.preco.prop-item-ext").hide();
			$("[id^='pro_price']").hide();
			chrome.storage.local.set({'pro_price_ite': 'hide'});
		}
	});
    
    // Checkbox para mostrar e esconder a propriedade "vender no robo" dos itens
	$('#btn_pro_v_robo').click(function(){
        if($('#btn_pro_v_robo').is(':checked')){
            $("th.robo1.prop-item-ext").show();
			$("[id^='pro_sell_robot_']").show();
			chrome.storage.local.set({'pro_sell_robot_ite': 'show'});
		}else{
            $("th.robo1.prop-item-ext").hide();
			$("[id^='pro_sell_robot_']").hide();
			chrome.storage.local.set({'pro_sell_robot_ite': 'hide'});
		}
	});

	// Checkbox para mostrar e esconder a propriedade "vender no webapp" dos itens
	$('#btn_pro_v_webapp').click(function(){
        if($('#btn_pro_v_webapp').is(':checked')){
            $("th.webapp1.prop-item-ext").show();
			$("[id^='pro_sell_webapp_']").show();
			chrome.storage.local.set({'pro_sell_webapp_ite': 'show'});
		}else{
            $("th.webapp1.prop-item-ext").hide();
			$("[id^='pro_sell_webapp_']").hide();
			chrome.storage.local.set({'pro_sell_webapp_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "vender no menu" dos itens
	$('#btn_pro_v_menu').click(function(){
        if($('#btn_pro_v_menu').is(':checked')){
            $("th.menu1.prop-item-ext").show();
			$("[id^='pro_sell_menu_']").show();
			chrome.storage.local.set({'pro_sell_menu_ite': 'show'});
		}else{
            $("th.menu1.prop-item-ext").hide();
			$("[id^='pro_sell_menu_']").hide();
			chrome.storage.local.set({'pro_sell_menu_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no robo" dos itens
	$('#btn_pro_q_robo').click(function(){
        if($('#btn_pro_q_robo').is(':checked')){
            $("th.robo2.prop-item-ext").show();
			$("[id^='pro_req_robot_']").show();
			chrome.storage.local.set({'pro_req_robot_ite': 'show'});
		}else{
            $("th.robo2.prop-item-ext").hide();
			$("[id^='pro_req_robot_']").hide();
			chrome.storage.local.set({'pro_req_robot_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no webapp" dos itens
	$('#btn_pro_q_webapp').click(function(){
        if($('#btn_pro_q_webapp').is(':checked')){
            $("th.webapp2.prop-item-ext").show();
			$("[id^='pro_req_webapp_']").show();
			chrome.storage.local.set({'pro_req_webapp_ite': 'show'});
		}else{
            $("th.webapp2.prop-item-ext").hide();
			$("[id^='pro_req_webapp_']").hide();
			chrome.storage.local.set({'pro_req_webapp_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no menu" dos itens
	$('#btn_pro_q_menu').click(function(){
        if($('#btn_pro_q_menu').is(':checked')){
            $("th.menu2.prop-item-ext").show();
			$("[id^='pro_req_menu_']").show();
			chrome.storage.local.set({'pro_req_menu_ite': 'show'});
		}else{
            $("th.menu2.prop-item-ext").hide();
			$("[id^='pro_req_menu_']").hide();
			chrome.storage.local.set({'pro_req_menu_ite': 'hide'});
		}
	});
	
	// Checkbox para mostrar e esconder a propriedade "template" dos itens
	$('#btn_pro_template').click(function(){
        if($('#btn_pro_template').is(':checked')){
            $("th.template.prop-item-ext").show();
			$("[id^='pro_template']").show();
			chrome.storage.local.set({'pro_template_ite': 'show'});
		}else{
            $("th.template.prop-item-ext").hide();
			$("[id^='pro_template']").hide();
			chrome.storage.local.set({'pro_template_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "entrega grátis" dos itens
	$('#btn_pro_entrega').click(function(){
        if($('#btn_pro_entrega').is(':checked')){
            $("th.entrega.prop-item-ext").show();
			$("[id^='pro_delivery']").show();
			chrome.storage.local.set({'pro_delivery_ite': 'show'});
		}else{
            $("th.entrega.prop-item-ext").hide();
			$("[id^='pro_delivery']").hide();
			chrome.storage.local.set({'pro_delivery_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "contabilizar pontos" dos itens
	$('#btn_pro_pontos').click(function(){
        if($('#btn_pro_pontos').is(':checked')){
            $("th.pontos.prop-item-ext").show();
			$("[id^='pro_points']").show();
			chrome.storage.local.set({'pro_points_ite': 'show'});
		}else{
            $("th.pontos.prop-item-ext").hide();
			$("[id^='pro_points']").hide();
			chrome.storage.local.set({'pro_points_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "espaçamento" dos itens
	$('#btn_pro_espaco').click(function(){
        if($('#btn_pro_espaco').is(':checked')){
            $("th.espaco.prop-item-ext").show();
			$("[id^='pro_spacing']").show();
			chrome.storage.local.set({'pro_spacing_ite': 'show'});
		}else{
            $("th.espaco.prop-item-ext").hide();
			$("[id^='pro_spacing']").hide();
			chrome.storage.local.set({'pro_spacing_ite': 'hide'});
		}
	});
    
    // Checkbox para mostrar e esconder a propriedade "titulos na tabela" dos itens
	$('#btn_pro_t_title').click(function(){
        if($('#btn_pro_t_title').is(':checked')){
            $("th.t-titulo.prop-item-ext").show();
			$("[id^='pro_tab_title_']").show();
			chrome.storage.local.set({'pro_tab_title_ite': 'show'});
		}else{
            $("th.t-titulo.prop-item-ext").hide();
			$("[id^='pro_tab_title_']").hide();
			chrome.storage.local.set({'pro_tab_title_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "preços na tabela" dos itens
	$('#btn_pro_t_price').click(function(){
        if($('#btn_pro_t_price').is(':checked')){
            $("th.t-preco.prop-item-ext").show();
			$("[id^='pro_tab_price_']").show();
			chrome.storage.local.set({'pro_tab_price_ite': 'show'});
		}else{
            $("th.t-preco.prop-item-ext").hide();
			$("[id^='pro_tab_price_']").hide();
			chrome.storage.local.set({'pro_tab_price_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "refresh" dos itens
	$('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').is(':checked')){
            $("th.atualiza-item.prop-item-ext").show();
			$("[id^='pro_ref_']").show();
			chrome.storage.local.set({'pro_refresh_ite': 'show'});
		}else{
            $("th.atualiza-item.prop-item-ext").hide();
			$("[id^='pro_ref_']").hide();
			chrome.storage.local.set({'pro_refresh_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "add" dos itens
	$('#btn_pro_add').click(function(){
        if($('#btn_pro_add').is(':checked')){
            $("th.novo-preco.prop-item-ext").show();
			$("[id^='pro_add_']").show();
			chrome.storage.local.set({'pro_add_ite': 'show'});
		}else{
            $("th.novo-preco.prop-item-ext").hide();
			$("[id^='pro_add_']").hide();
			chrome.storage.local.set({'pro_add_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "remove" dos itens
	$('#btn_pro_remove').click(function(){
        if($('#btn_pro_remove').is(':checked')){
            $("th.exclui-preco.prop-item-ext").show();
			$("[id^='pro_remove_']").show();
			chrome.storage.local.set({'pro_remove_ite': 'show'});
		}else{
            $("th.exclui-preco.prop-item-ext").hide();
			$("[id^='pro_remove_']").hide();
			chrome.storage.local.set({'pro_remove_ite': 'hide'});
		}
	});
    
    /* ====================================== */
    
});