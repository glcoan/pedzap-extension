$(function(){

    function changePropStatus(status, id, icon){
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
    
    chrome.storage.local.get('pro_status_mod', function(data){
        if(data.pro_status_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_status', true);
                $("th.status.prop-modelo-ext").hide();
                $("[id^='pro_status']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_sku_mod', function(data){
        if(data.pro_sku_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_sku', true);
                $("th.sku.prop-modelo-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_title_mod', function(data){
        if(data.pro_title_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_titulo', true);
                $("th.titulo.prop-modelo-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_description_mod', function(data){
        if(data.pro_description_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_descricao', true);
                $("th.descricao.prop-modelo-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_prices_mod', function(data){
        if(data.pro_prices_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_precos', true);
                $("th.preco.prop-modelo-ext").hide();
                $("[id^='pro_price_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_minimum_mod', function(data){
        if(data.pro_maximum_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_min', true);
                $("th.minimo.prop-modelo-ext").hide();
                $("[id^='pro_minimum']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_maximum_mod', function(data){
        if(data.pro_maximum_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_max', true);
                $("th.maximo.prop-modelo-ext").hide();
                $("[id^='pro_maximum']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_refresh_mod', function(data){
        if(data.pro_refresh_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_refresh', false);
                $("th.atualiza-modelo.prop-modelo-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_add_mod', function(data){
        if(data.pro_add_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_add', false);
                $("th.novo-preco.prop-modelo-ext").hide();
                $("[id^='pro_add_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_remove_mod', function(data){
        if(data.pro_remove_mod == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_remove', false);
                $("th.exclui-preco.prop-modelo-ext").hide();
                $("[id^='pro_remove_']").hide();
            }, 1050);
        }
    });
    
    /* ====================================== */
    
    
    
    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR MODELOS */
    
	// Checkbox para mostrar e esconder a propriedade "status" dos modelos
	$('#btn_pro_status').click(function(){
        if($('#btn_pro_status').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_status', true);
            $("th.status.prop-modelo-ext").show();
			$("[id^='pro_status']").show();
			chrome.storage.local.set({'pro_status_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_status', true);
            $("th.status.prop-modelo-ext").hide();
			$("[id^='pro_status']").hide();
			chrome.storage.local.set({'pro_status_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "sku" dos modelos
	$('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_sku', true);
            $("th.sku.prop-modelo-ext").show();
			$("[id^='pro_sku']").show();
			chrome.storage.local.set({'pro_sku_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_sku', true);
            $("th.sku.prop-modelo-ext").hide();
			$("[id^='pro_sku']").hide();
			chrome.storage.local.set({'pro_sku_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "titulo" dos modelos
	$('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_titulo', true);
            $("th.titulo.prop-modelo-ext").show();
			$("[id^='pro_title']").show();
			chrome.storage.local.set({'pro_title_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_titulo', true);
            $("th.titulo.prop-modelo-ext").hide();
			$("[id^='pro_title']").hide();
			chrome.storage.local.set({'pro_title_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "descricao" dos modelos
	$('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_descricao', true);
            $("th.descricao.prop-modelo-ext").show();
			$("[id^='pro_description']").show();
			chrome.storage.local.set({'pro_description_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_descricao', true);
            $("th.descricao.prop-modelo-ext").hide();
			$("[id^='pro_description']").hide();
			chrome.storage.local.set({'pro_description_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "precos" dos modelos
	$('#btn_pro_precos').click(function(){
        if($('#btn_pro_precos').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_precos', true);
            $("th.preco.prop-modelo-ext").show();
			$("[id^='pro_price_']").show();
			chrome.storage.local.set({'pro_prices_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_precos', true);
            $("th.preco.prop-modelo-ext").hide();
			$("[id^='pro_price_']").hide();
			chrome.storage.local.set({'pro_prices_mod': 'hide'});
		}
	});
	
	// Checkbox para mostrar e esconder a propriedade "max" dos modelos
	$('#btn_pro_max').click(function(){
        if($('#btn_pro_max').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_max', true);
            $("th.maximo.prop-modelo-ext").show();
			$("[id^='pro_maximum']").show();
			chrome.storage.local.set({'pro_maximum_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_max', true);
            $("th.maximo.prop-modelo-ext").hide();
			$("[id^='pro_maximum']").hide();
			chrome.storage.local.set({'pro_maximum_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "refresh" dos modelos
	$('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_refresh', false);
            $("th.atualiza-modelo.prop-modelo-ext").show();
			$("[id^='pro_ref_']").show();
			chrome.storage.local.set({'pro_refresh_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_refresh', false);
            $("th.atualiza-modelo.prop-modelo-ext").hide();
			$("[id^='pro_ref_']").hide();
			chrome.storage.local.set({'pro_refresh_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "add" dos modelos
	$('#btn_pro_add').click(function(){
        if($('#btn_pro_add').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_add', false);
            $("th.novo-preco.prop-modelo-ext").show();
			$("[id^='pro_add_']").show();
			chrome.storage.local.set({'pro_add_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_add', false);
            $("th.novo-preco.prop-modelo-ext").hide();
			$("[id^='pro_add_']").hide();
			chrome.storage.local.set({'pro_add_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "remove" dos modelos
	$('#btn_pro_remove').click(function(){
        if($('#btn_pro_remove').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_remove', false);
            $("th.exclui-preco.prop-modelo-ext").show();
			$("[id^='pro_remove_']").show();
			chrome.storage.local.set({'pro_remove_mod': 'show'});
		}else{
            changePropStatus(false, 'btn_pro_remove', false);
            $("th.exclui-preco.prop-modelo-ext").hide();
			$("[id^='pro_remove_']").hide();
			chrome.storage.local.set({'pro_remove_mod': 'hide'});
		}
	});
    
    /* ====================================== */
    
});