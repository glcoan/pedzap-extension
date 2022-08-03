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

    chrome.storage.local.get('pro_refresh_res', function(data){
        if(data.pro_refresh_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_refresh', false);
                $("th.atualiza-resposta.prop-resposta-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_origin_res', function(data){
        if(data.pro_origin_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_origem', true);
                $("th.origem.prop-resposta-ext").hide();
                $("[id^='pro_origin']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_status_res', function(data){
        if(data.pro_status_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_status', true);
                $("th.status.prop-resposta-ext").hide();
                $("[id^='pro_status']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_sku_res', function(data){
        if(data.pro_sku_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_sku', true);
                $("th.sku.prop-resposta-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_title_res', function(data){
        if(data.pro_title_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_titulo', true);
                $("th.titulo.prop-resposta-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_categorie_res', function(data){
        if(data.pro_categorie_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_categoria', true);
                $("th.categoria.prop-resposta-ext").hide();
                $("[id^='pro_categorie']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_model_res', function(data){
        if(data.pro_model_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_modelo', true);
                $("th.modelo.prop-resposta-ext").hide();
                $("[id^='pro_model']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_description_res', function(data){
        if(data.pro_description_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_descricao', true);
                $("th.descricao.prop-resposta-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_price_res', function(data){
        if(data.pro_price_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_preco', true);
                $("th.preco.prop-resposta-ext").hide();
                $("th.precos.prop-resposta-ext").hide();
                $("[id^='pro_price_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_show_price_res', function(data){
        if(data.pro_show_price_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_show_price', true);
                $("th.exibir.prop-resposta-ext").hide();
                $("[id^='pro_show_price_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_template_res', function(data){
        if(data.pro_template_res == 'hide'){
            setTimeout(function(){
                changePropStatus(false, 'btn_pro_template', true);
                $("th.template.prop-resposta-ext").hide();
                $("[id^='pro_template_']").hide();
            }, 1050);
        }
    });

    /* ====================================== */



    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR RESPOSTAS */

    // Checkbox para mostrar e esconder a propriedade "refresh" das respostas
    $('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_refresh', false);
            $("th.atualiza-resposta.prop-resposta-ext").show();
            $("[id^='pro_ref_']").show();
            chrome.storage.local.set({'pro_refresh_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_refresh', false);
            $("th.atualiza-resposta.prop-resposta-ext").hide();
            $("[id^='pro_ref_']").hide();
            chrome.storage.local.set({'pro_refresh_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "origem" das respostas
    $('#btn_pro_origem').click(function(){
        if($('#btn_pro_origem').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_origem', true);
            $("th.origem.prop-resposta-ext").show();
            $("[id^='pro_origin']").show();
            chrome.storage.local.set({'pro_origin_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_origem', true);
            $("th.origem.prop-resposta-ext").hide();
            $("[id^='pro_origin']").hide();
            chrome.storage.local.set({'pro_origin_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "status" das respostas
    $('#btn_pro_status').click(function(){
        if($('#btn_pro_status').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_status', true);
            $("th.status.prop-resposta-ext").show();
            $("[id^='pro_status']").show();
            chrome.storage.local.set({'pro_status_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_status', true);
            $("th.status.prop-resposta-ext").hide();
            $("[id^='pro_status']").hide();
            chrome.storage.local.set({'pro_status_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "sku" das respostas
    $('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_sku', true);
            $("th.sku.prop-resposta-ext").show();
            $("[id^='pro_sku']").show();
            chrome.storage.local.set({'pro_sku_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_sku', true);
            $("th.sku.prop-resposta-ext").hide();
            $("[id^='pro_sku']").hide();
            chrome.storage.local.set({'pro_sku_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "titulo" das respostas
    $('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_titulo', true);
            $("th.titulo.prop-resposta-ext").show();
            $("[id^='pro_title']").show();
            chrome.storage.local.set({'pro_title_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_titulo', true);
            $("th.titulo.prop-resposta-ext").hide();
            $("[id^='pro_title']").hide();
            chrome.storage.local.set({'pro_title_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "descrição" das respostas
    $('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_descricao', true);
            $("th.descricao.prop-resposta-ext").show();
            $("[id^='pro_description']").show();
            chrome.storage.local.set({'pro_description_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_descricao', true);
            $("th.descricao.prop-resposta-ext").hide();
            $("[id^='pro_description']").hide();
            chrome.storage.local.set({'pro_description_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "preço" das respostas
    $('#btn_pro_preco').click(function(){
        if($('#btn_pro_preco').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_preco', true);
            $("th.preco.prop-resposta-ext").show();
            $("th.precos.prop-resposta-ext").show();
            $("[id^='pro_price_']").show();
            chrome.storage.local.set({'pro_price_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_preco', true);
            $("th.preco.prop-resposta-ext").hide();
            $("th.precos.prop-resposta-ext").hide();
            $("[id^='pro_price_']").hide();
            chrome.storage.local.set({'pro_price_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "exibir preço" das respostas
    $('#btn_pro_show_price').click(function(){
        if($('#btn_pro_show_price').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_show_price', true);
            $("th.exibir.prop-resposta-ext").show();
            $("[id^='pro_show_price_']").show();
            chrome.storage.local.set({'pro_show_price_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_show_price', true);
            $("th.exibir.prop-resposta-ext").hide();
            $("[id^='pro_show_price_']").hide();
            chrome.storage.local.set({'pro_show_price_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "template" das respostas
    $('#btn_pro_template').click(function(){
        if($('#btn_pro_template').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_template', true);
            $("th.template.prop-resposta-ext").show();
            $("[id^='pro_template_']").show();
            chrome.storage.local.set({'pro_template_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_template', true);
            $("th.template.prop-resposta-ext").hide();
            $("[id^='pro_template_']").hide();
            chrome.storage.local.set({'pro_template_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "categoria" das respostas
    $('#btn_pro_categoria').click(function(){
        if($('#btn_pro_categoria').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_categoria', true);
            $("th.categoria.prop-resposta-ext").show();
            $("[id^='pro_categorie_']").show();
            chrome.storage.local.set({'pro_categorie_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_categoria', true);
            $("th.categoria.prop-resposta-ext").hide();
            $("[id^='pro_categorie_']").hide();
            chrome.storage.local.set({'pro_categorie_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "modelo" das respostas
    $('#btn_pro_modelo').click(function(){
        if($('#btn_pro_modelo').hasClass('props-disabled')){
            changePropStatus(true, 'btn_pro_modelo', true);
            $("th.modelo.prop-resposta-ext").show();
            $("[id^='pro_model_']").show();
            chrome.storage.local.set({'pro_model_res': 'show'});
        }else{
            changePropStatus(false, 'btn_pro_modelo', true);
            $("th.modelo.prop-resposta-ext").hide();
            $("[id^='pro_model_']").hide();
            chrome.storage.local.set({'pro_model_res': 'hide'});
        }
    });

    /* ====================================== */

});