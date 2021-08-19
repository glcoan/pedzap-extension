$(function(){

    /* VERIFICA O ESTADO EM STORAGE DAS PROPRIEDADES LISTADAS, SE TIVER "HIDE", NÃO VAI LISTAR AQUELA PROPRIEDADE ESPECÍFICA */
    
    chrome.storage.local.get('pro_status_mod', function(data){
        if(data.pro_status_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_status').prop('checked', false);
                $("th.status.prop-modelo-ext").hide();
                $("[id^='pro_status']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_sku_mod', function(data){
        if(data.pro_sku_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_sku').prop('checked', false);
                $("th.sku.prop-modelo-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_title_mod', function(data){
        if(data.pro_title_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_titulo').prop('checked', false);
                $("th.titulo.prop-modelo-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_description_mod', function(data){
        if(data.pro_description_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_descricao').prop('checked', false);
                $("th.descricao.prop-modelo-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_prices_mod', function(data){
        if(data.pro_prices_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_precos').prop('checked', false);
                $("th.preco.prop-modelo-ext").hide();
                $("[id^='pro_price_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_maximum_mod', function(data){
        if(data.pro_maximum_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_max').prop('checked', false);
                $("th.maximo.prop-modelo-ext").hide();
                $("[id^='pro_maximum']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_refresh_mod', function(data){
        if(data.pro_refresh_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_refresh').prop('checked', false);
                $("th.atualiza-modelo.prop-modelo-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_add_mod', function(data){
        if(data.pro_add_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_add').prop('checked', false);
                $("th.novo-preco.prop-modelo-ext").hide();
                $("[id^='pro_add_']").hide();
            }, 1050);
        }
    });
    
    chrome.storage.local.get('pro_remove_mod', function(data){
        if(data.pro_remove_mod == 'hide'){
            setTimeout(function(){
                $('#btn_pro_remove').prop('checked', false);
                $("th.exclui-preco.prop-modelo-ext").hide();
                $("[id^='pro_remove_']").hide();
            }, 1050);
        }
    });
    
    /* ====================================== */
    
    
    
    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR MODELOS */
    
	// Botão para clicar em todos os checkbox's
	$('#btn_pro_all').click(function(){
        $('input[type=checkbox]').click();
	});
    
	// Checkbox para mostrar e esconder a propriedade "status" dos modelos
	$('#btn_pro_status').click(function(){
        if($('#btn_pro_status').is(':checked')){
            $("th.status.prop-modelo-ext").show();
			$("[id^='pro_status']").show();
			chrome.storage.local.set({'pro_status_mod': 'show'});
		}else{
            $("th.status.prop-modelo-ext").hide();
			$("[id^='pro_status']").hide();
			chrome.storage.local.set({'pro_status_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "sku" dos modelos
	$('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').is(':checked')){
            $("th.sku.prop-modelo-ext").show();
			$("[id^='pro_sku']").show();
			chrome.storage.local.set({'pro_sku_mod': 'show'});
		}else{
            $("th.sku.prop-modelo-ext").hide();
			$("[id^='pro_sku']").hide();
			chrome.storage.local.set({'pro_sku_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "titulo" dos modelos
	$('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').is(':checked')){
            $("th.titulo.prop-modelo-ext").show();
			$("[id^='pro_title']").show();
			chrome.storage.local.set({'pro_title_mod': 'show'});
		}else{
            $("th.titulo.prop-modelo-ext").hide();
			$("[id^='pro_title']").hide();
			chrome.storage.local.set({'pro_title_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "descricao" dos modelos
	$('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').is(':checked')){
            $("th.descricao.prop-modelo-ext").show();
			$("[id^='pro_description']").show();
			chrome.storage.local.set({'pro_description_mod': 'show'});
		}else{
            $("th.descricao.prop-modelo-ext").hide();
			$("[id^='pro_description']").hide();
			chrome.storage.local.set({'pro_description_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "precos" dos modelos
	$('#btn_pro_precos').click(function(){
        if($('#btn_pro_precos').is(':checked')){
            $("th.preco.prop-modelo-ext").show();
			$("[id^='pro_price_']").show();
			chrome.storage.local.set({'pro_prices_mod': 'show'});
		}else{
            $("th.preco.prop-modelo-ext").hide();
			$("[id^='pro_price_']").hide();
			chrome.storage.local.set({'pro_prices_mod': 'hide'});
		}
	});
	
	// Checkbox para mostrar e esconder a propriedade "max" dos modelos
	$('#btn_pro_max').click(function(){
        if($('#btn_pro_max').is(':checked')){
            $("th.maximo.prop-modelo-ext").show();
			$("[id^='pro_maximum']").show();
			chrome.storage.local.set({'pro_maximum_mod': 'show'});
		}else{
            $("th.maximo.prop-modelo-ext").hide();
			$("[id^='pro_maximum']").hide();
			chrome.storage.local.set({'pro_maximum_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "refresh" dos modelos
	$('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').is(':checked')){
            $("th.atualiza-modelo.prop-modelo-ext").show();
			$("[id^='pro_ref_']").show();
			chrome.storage.local.set({'pro_refresh_mod': 'show'});
		}else{
            $("th.atualiza-modelo.prop-modelo-ext").hide();
			$("[id^='pro_ref_']").hide();
			chrome.storage.local.set({'pro_refresh_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "add" dos modelos
	$('#btn_pro_add').click(function(){
        if($('#btn_pro_add').is(':checked')){
            $("th.novo-preco.prop-modelo-ext").show();
			$("[id^='pro_add_']").show();
			chrome.storage.local.set({'pro_add_mod': 'show'});
		}else{
            $("th.novo-preco.prop-modelo-ext").hide();
			$("[id^='pro_add_']").hide();
			chrome.storage.local.set({'pro_add_mod': 'hide'});
		}
	});
    
	// Checkbox para mostrar e esconder a propriedade "remove" dos modelos
	$('#btn_pro_remove').click(function(){
        if($('#btn_pro_remove').is(':checked')){
            $("th.exclui-preco.prop-modelo-ext").show();
			$("[id^='pro_remove_']").show();
			chrome.storage.local.set({'pro_remove_mod': 'show'});
		}else{
            $("th.exclui-preco.prop-modelo-ext").hide();
			$("[id^='pro_remove_']").hide();
			chrome.storage.local.set({'pro_remove_mod': 'hide'});
		}
	});
    
    /* ====================================== */
    
});