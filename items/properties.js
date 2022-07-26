$(function(){

    function changePropStatus(status, id, icon){
        console.log(status);
        console.log(id);
        console.log(icon);
        if(status == false){
            $('#' + id).removeClass('props-actived');
            $('#' + id).addClass('props-disabled');
            if(icon == true){
                $('#' + id + ' > div > i').removeClass('fa-check');
                $('#' + id + ' > div > i').addClass('fa-times');
            }
        }
        if(status == true){
            $('#' + id).removeClass('props-disabled');
            $('#' + id).addClass('props-actived');
            if(icon == true){
                $('#' + id + ' > div > i').removeClass('fa-times');
                $('#' + id + ' > div > i').addClass('fa-check');
            }
        }
    }

    /* VERIFICA O ESTADO EM STORAGE DAS PROPRIEDADES LISTADAS, SE TIVER "HIDE", NÃO VAI LISTAR AQUELA PROPRIEDADE ESPECÍFICA */

    chrome.storage.local.get('pro_sku_ite', function(data){
        if(data.pro_sku_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_sku', true);
                $("th.sku.prop-item-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_group_ite', function(data){
        if(data.pro_group_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_group', true);
                $("th.grupo.prop-item-ext").hide();
                $("[id^='pro_group']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_title_ite', function(data){
        if(data.pro_title_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_titulo', true);
                $("th.titulo.prop-item-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_description_ite', function(data){
        if(data.pro_description_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_descricao', true);
                $("th.descricao.prop-item-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_price_ite', function(data){
        if(data.pro_price_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_price', true);
                $("th.preco.prop-item-ext").hide();
                $("[id^='pro_price']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_robot_ite', function(data){
        if(data.pro_sell_robot_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_v_robo', true);
                $("th.robo1.prop-item-ext").hide();
                $("[id^='pro_sell_robot_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_webapp_ite', function(data){
        if(data.pro_sell_webapp_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_v_webapp', true);
                $("th.webapp1.prop-item-ext").hide();
                $("[id^='pro_sell_webapp_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_sell_menu_ite', function(data){
        if(data.pro_sell_menu_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_v_menu', true);
                $("th.menu1.prop-item-ext").hide();
                $("[id^='pro_sell_menu_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_robot_ite', function(data){
        if(data.pro_req_robot_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_q_robo', true);
                $("th.robo2.prop-item-ext").hide();
                $("[id^='pro_req_robot_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_webapp_ite', function(data){
        if(data.pro_req_webapp_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_q_webapp', true);
                $("th.webapp2.prop-item-ext").hide();
                $("[id^='pro_req_webapp_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_req_menu_ite', function(data){
        if(data.pro_req_menu_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_q_menu', true);
                $("th.menu2.prop-item-ext").hide();
                $("[id^='pro_req_menu_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_template_ite', function(data){
        if(data.pro_template_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_template', true);
                $("th.template.prop-item-ext").hide();
                $("[id^='pro_template_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_delivery_ite', function(data){
        if(data.pro_delivery_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_entrega', true);
                $("th.entrega.prop-item-ext").hide();
                $("[id^='pro_delivery_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_points_ite', function(data){
        if(data.pro_points_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_pontos', true);
                $("th.pontos.prop-item-ext").hide();
                $("[id^='pro_points_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_spacing_ite', function(data){
        if(data.pro_spacing_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_espaco', true);
                $("th.espaco.prop-item-ext").hide();
                $("[id^='pro_spacing_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_tab_title_ite', function(data){
        if(data.pro_tab_title_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_t_title', true);
                $("th.t-titulo.prop-item-ext").hide();
                $("[id^='pro_tab_title_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_tab_price_ite', function(data){
        if(data.pro_tab_price_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_t_price', true);
                $("th.t-preco.prop-item-ext").hide();
                $("[id^='pro_tab_price_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_refresh_ite', function(data){
        if(data.pro_refresh_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_refresh', false);
                $("th.atualiza-item.prop-item-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_add_ite', function(data){
        if(data.pro_add_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_add', false);
                $("th.novo-preco.prop-item-ext").hide();
                $("[id^='pro_add_']").hide();
            }, 1200);
        }
    });

    chrome.storage.local.get('pro_remove_ite', function(data){
        if(data.pro_remove_ite == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_remove', false);
                $("th.exclui-preco.prop-item-ext").hide();
                $("[id^='pro_remove_']").hide();
            }, 1200);
        }
    });

    /* ====================================== */
    
    
    
    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR ITENS */
    
	// Checkbox para mostrar e esconder a propriedade "sku" dos itens
	$('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_sku', true);
            $("th.sku.prop-item-ext").show();
			$("[id^='pro_sku']").show();
			chrome.storage.local.set({'pro_sku_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_sku', true);
            $("th.sku.prop-item-ext").hide();
			$("[id^='pro_sku']").hide();
			chrome.storage.local.set({'pro_sku_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "grupo" dos itens
	$('#btn_pro_group').click(function(){
        if($('#btn_pro_group').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_group', true);
            $("th.grupo.prop-item-ext").show();
			$("[id^='pro_group']").show();
			chrome.storage.local.set({'pro_group_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_group', true);
            $("th.grupo.prop-item-ext").hide();
			$("[id^='pro_group']").hide();
			chrome.storage.local.set({'pro_group_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "titulo" dos itens
	$('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_titulo', true);
            $("th.titulo.prop-item-ext").show();
			$("[id^='pro_title']").show();
			chrome.storage.local.set({'pro_title_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_titulo', true);
            $("th.titulo.prop-item-ext").hide();
			$("[id^='pro_title']").hide();
			chrome.storage.local.set({'pro_title_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "descricao" dos itens
	$('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_descricao', true);
            $("th.descricao.prop-item-ext").show();
			$("[id^='pro_description']").show();
			chrome.storage.local.set({'pro_description_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_descricao', true);
            $("th.descricao.prop-item-ext").hide();
			$("[id^='pro_description']").hide();
			chrome.storage.local.set({'pro_description_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "preço" dos itens
	$('#btn_pro_price').click(function(){
        if($('#btn_pro_price').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_price', true);
            $("th.preco.prop-item-ext").show();
			$("[id^='pro_price']").show();
			chrome.storage.local.set({'pro_price_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_price', true);
            $("th.preco.prop-item-ext").hide();
			$("[id^='pro_price']").hide();
			chrome.storage.local.set({'pro_price_ite': 'hide'});
		}
	});
    
    // Checkbox para mostrar e esconder a propriedade "vender no robo" dos itens
	$('#btn_pro_v_robo').click(function(){
        if($('#btn_pro_v_robo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_v_robo', true);
            $("th.robo1.prop-item-ext").show();
			$("[id^='pro_sell_robot_']").show();
			chrome.storage.local.set({'pro_sell_robot_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_v_robo', true);
            $("th.robo1.prop-item-ext").hide();
			$("[id^='pro_sell_robot_']").hide();
			chrome.storage.local.set({'pro_sell_robot_ite': 'hide'});
		}
	});

	// Checkbox para mostrar e esconder a propriedade "vender no webapp" dos itens
	$('#btn_pro_v_webapp').click(function(){
        if($('#btn_pro_v_webapp').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_v_webapp', true);
            $("th.webapp1.prop-item-ext").show();
			$("[id^='pro_sell_webapp_']").show();
			chrome.storage.local.set({'pro_sell_webapp_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_v_webapp', true);
            $("th.webapp1.prop-item-ext").hide();
			$("[id^='pro_sell_webapp_']").hide();
			chrome.storage.local.set({'pro_sell_webapp_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "vender no menu" dos itens
	$('#btn_pro_v_menu').click(function(){
        if($('#btn_pro_v_menu').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_v_menu', true);
            $("th.menu1.prop-item-ext").show();
			$("[id^='pro_sell_menu_']").show();
			chrome.storage.local.set({'pro_sell_menu_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_v_menu', true);
            $("th.menu1.prop-item-ext").hide();
			$("[id^='pro_sell_menu_']").hide();
			chrome.storage.local.set({'pro_sell_menu_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no robo" dos itens
	$('#btn_pro_q_robo').click(function(){
        if($('#btn_pro_q_robo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_q_robo', true);
            $("th.robo2.prop-item-ext").show();
			$("[id^='pro_req_robot_']").show();
			chrome.storage.local.set({'pro_req_robot_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_q_robo', true);
            $("th.robo2.prop-item-ext").hide();
			$("[id^='pro_req_robot_']").hide();
			chrome.storage.local.set({'pro_req_robot_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no webapp" dos itens
	$('#btn_pro_q_webapp').click(function(){
        if($('#btn_pro_q_webapp').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_q_webapp', true);
            $("th.webapp2.prop-item-ext").show();
			$("[id^='pro_req_webapp_']").show();
			chrome.storage.local.set({'pro_req_webapp_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_q_webapp', true);
            $("th.webapp2.prop-item-ext").hide();
			$("[id^='pro_req_webapp_']").hide();
			chrome.storage.local.set({'pro_req_webapp_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "quantidade no menu" dos itens
	$('#btn_pro_q_menu').click(function(){
        if($('#btn_pro_q_menu').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_q_menu', true);
            $("th.menu2.prop-item-ext").show();
			$("[id^='pro_req_menu_']").show();
			chrome.storage.local.set({'pro_req_menu_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_q_menu', true);
            $("th.menu2.prop-item-ext").hide();
			$("[id^='pro_req_menu_']").hide();
			chrome.storage.local.set({'pro_req_menu_ite': 'hide'});
		}
	});
	
	// Checkbox para mostrar e esconder a propriedade "template" dos itens
	$('#btn_pro_template').click(function(){
        if($('#btn_pro_template').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_template', true);
            $("th.template.prop-item-ext").show();
			$("[id^='pro_template']").show();
			chrome.storage.local.set({'pro_template_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_template', true);
            $("th.template.prop-item-ext").hide();
			$("[id^='pro_template']").hide();
			chrome.storage.local.set({'pro_template_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "entrega grátis" dos itens
	$('#btn_pro_entrega').click(function(){
        if($('#btn_pro_entrega').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_entrega', true);
            $("th.entrega.prop-item-ext").show();
			$("[id^='pro_delivery']").show();
			chrome.storage.local.set({'pro_delivery_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_entrega', true);
            $("th.entrega.prop-item-ext").hide();
			$("[id^='pro_delivery']").hide();
			chrome.storage.local.set({'pro_delivery_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "contabilizar pontos" dos itens
	$('#btn_pro_pontos').click(function(){
        if($('#btn_pro_pontos').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_pontos', true);
            $("th.pontos.prop-item-ext").show();
			$("[id^='pro_points']").show();
			chrome.storage.local.set({'pro_points_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_pontos', true);
            $("th.pontos.prop-item-ext").hide();
			$("[id^='pro_points']").hide();
			chrome.storage.local.set({'pro_points_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "espaçamento" dos itens
	$('#btn_pro_espaco').click(function(){
        if($('#btn_pro_espaco').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_espaco', true);
            $("th.espaco.prop-item-ext").show();
			$("[id^='pro_spacing']").show();
			chrome.storage.local.set({'pro_spacing_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_espaco', true);
            $("th.espaco.prop-item-ext").hide();
			$("[id^='pro_spacing']").hide();
			chrome.storage.local.set({'pro_spacing_ite': 'hide'});
		}
	});
    
    // Checkbox para mostrar e esconder a propriedade "titulos na tabela" dos itens
	$('#btn_pro_t_title').click(function(){
        if($('#btn_pro_t_title').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_t_title', true);
            $("th.t-titulo.prop-item-ext").show();
			$("[id^='pro_tab_title_']").show();
			chrome.storage.local.set({'pro_tab_title_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_t_title', true);
            $("th.t-titulo.prop-item-ext").hide();
			$("[id^='pro_tab_title_']").hide();
			chrome.storage.local.set({'pro_tab_title_ite': 'hide'});
		}
	});

    // Checkbox para mostrar e esconder a propriedade "preços na tabela" dos itens
	$('#btn_pro_t_price').click(function(){
        if($('#btn_pro_t_price').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_t_price', true);
            $("th.t-preco.prop-item-ext").show();
			$("[id^='pro_tab_price_']").show();
			chrome.storage.local.set({'pro_tab_price_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_t_price', true);
            $("th.t-preco.prop-item-ext").hide();
			$("[id^='pro_tab_price_']").hide();
			chrome.storage.local.set({'pro_tab_price_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "refresh" dos itens
	$('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_refresh', false);
            $("th.atualiza-item.prop-item-ext").show();
			$("[id^='pro_ref_']").show();
			chrome.storage.local.set({'pro_refresh_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_refresh', false);
            $("th.atualiza-item.prop-item-ext").hide();
			$("[id^='pro_ref_']").hide();
			chrome.storage.local.set({'pro_refresh_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "add" dos itens
	$('#btn_pro_add').click(function(){
        if($('#btn_pro_add').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_add', false);
            $("th.novo-preco.prop-item-ext").show();
			$("[id^='pro_add_']").show();
			chrome.storage.local.set({'pro_add_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_add', false);
            $("th.novo-preco.prop-item-ext").hide();
			$("[id^='pro_add_']").hide();
			chrome.storage.local.set({'pro_add_ite': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "remove" dos itens
	$('#btn_pro_remove').click(function(){
        if($('#btn_pro_remove').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_remove', false);
            $("th.exclui-preco.prop-item-ext").show();
			$("[id^='pro_remove_']").show();
			chrome.storage.local.set({'pro_remove_ite': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_remove', false);
            $("th.exclui-preco.prop-item-ext").hide();
			$("[id^='pro_remove_']").hide();
			chrome.storage.local.set({'pro_remove_ite': 'hide'});
		}
	});
    
    /* ====================================== */
    
});