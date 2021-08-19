$(function(){

    /* VERIFICA O ESTADO EM STORAGE DAS PROPRIEDADES LISTADAS, SE TIVER "HIDE", NÃO VAI LISTAR AQUELA PROPRIEDADE ESPECÍFICA */

    chrome.storage.local.get('pro_refresh_res', function(data){
        if(data.pro_refresh_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_refresh').prop('checked', false);
                $("th.atualiza-resposta.prop-resposta-ext").hide();
                $("[id^='pro_ref_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_origin_res', function(data){
        if(data.pro_origin_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_origem').prop('checked', false);
                $("th.origem.prop-resposta-ext").hide();
                $("[id^='pro_origin']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_status_res', function(data){
        if(data.pro_status_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_status').prop('checked', false);
                $("th.status.prop-resposta-ext").hide();
                $("[id^='pro_status']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_sku_res', function(data){
        if(data.pro_sku_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_sku').prop('checked', false);
                $("th.sku.prop-resposta-ext").hide();
                $("[id^='pro_sku']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_title_res', function(data){
        if(data.pro_title_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_titulo').prop('checked', false);
                $("th.titulo.prop-resposta-ext").hide();
                $("[id^='pro_title']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_categorie_res', function(data){
        if(data.pro_categorie_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_categoria').prop('checked', false);
                $("th.categoria.prop-resposta-ext").hide();
                $("[id^='pro_categorie']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_model_res', function(data){
        if(data.pro_model_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_modelo').prop('checked', false);
                $("th.modelo.prop-resposta-ext").hide();
                $("[id^='pro_model']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_description_res', function(data){
        if(data.pro_description_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_descricao').prop('checked', false);
                $("th.descricao.prop-resposta-ext").hide();
                $("[id^='pro_description']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_price_res', function(data){
        if(data.pro_price_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_preco').prop('checked', false);
                $("th.preco.prop-resposta-ext").hide();
                $("th.precos.prop-resposta-ext").hide();
                $("[id^='pro_price_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_show_price_res', function(data){
        if(data.pro_show_price_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_show_price').prop('checked', false);
                $("th.exibir.prop-resposta-ext").hide();
                $("[id^='pro_show_price_']").hide();
            }, 1050);
        }
    });

    chrome.storage.local.get('pro_template_res', function(data){
        if(data.pro_template_res == 'hide'){
            setTimeout(function(){
                $('#btn_pro_template').prop('checked', false);
                $("th.template.prop-resposta-ext").hide();
                $("[id^='pro_template_']").hide();
            }, 1050);
        }
    });

    /* ====================================== */



    /* FUNÇÕES PARA OS CHECKBOX'S DO CARD "PROPRIEDADES LISTADAS" NA PAGINA DE EDITAR RESPOSTAS */

    // Botão para clicar em todos os checkbox's
    $('#btn_pro_all').click(function(){
        $('input[type=checkbox]').click();
    });

    // Checkbox para mostrar e esconder a propriedade "refresh" das respostas
    $('#btn_pro_refresh').click(function(){
        if($('#btn_pro_refresh').is(':checked')){
            $("th.atualiza-resposta.prop-resposta-ext").show();
            $("[id^='pro_ref_']").show();
            chrome.storage.local.set({'pro_refresh_res': 'show'});
        }else{
            $("th.atualiza-resposta.prop-resposta-ext").hide();
            $("[id^='pro_ref_']").hide();
            chrome.storage.local.set({'pro_refresh_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "origem" das respostas
    $('#btn_pro_origem').click(function(){
        if($('#btn_pro_origem').is(':checked')){
            $("th.origem.prop-resposta-ext").show();
            $("[id^='pro_origin']").show();
            chrome.storage.local.set({'pro_origin_res': 'show'});
        }else{
            $("th.origem.prop-resposta-ext").hide();
            $("[id^='pro_origin']").hide();
            chrome.storage.local.set({'pro_origin_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "status" das respostas
    $('#btn_pro_status').click(function(){
        if($('#btn_pro_status').is(':checked')){
            $("th.status.prop-resposta-ext").show();
            $("[id^='pro_status']").show();
            chrome.storage.local.set({'pro_status_res': 'show'});
        }else{
            $("th.status.prop-resposta-ext").hide();
            $("[id^='pro_status']").hide();
            chrome.storage.local.set({'pro_status_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "sku" das respostas
    $('#btn_pro_sku').click(function(){
        if($('#btn_pro_sku').is(':checked')){
            $("th.sku.prop-resposta-ext").show();
            $("[id^='pro_sku']").show();
            chrome.storage.local.set({'pro_sku_res': 'show'});
        }else{
            $("th.sku.prop-resposta-ext").hide();
            $("[id^='pro_sku']").hide();
            chrome.storage.local.set({'pro_sku_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "titulo" das respostas
    $('#btn_pro_titulo').click(function(){
        if($('#btn_pro_titulo').is(':checked')){
            $("th.titulo.prop-resposta-ext").show();
            $("[id^='pro_title']").show();
            chrome.storage.local.set({'pro_title_res': 'show'});
        }else{
            $("th.titulo.prop-resposta-ext").hide();
            $("[id^='pro_title']").hide();
            chrome.storage.local.set({'pro_title_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "descrição" das respostas
    $('#btn_pro_descricao').click(function(){
        if($('#btn_pro_descricao').is(':checked')){
            $("th.descricao.prop-resposta-ext").show();
            $("[id^='pro_description']").show();
            chrome.storage.local.set({'pro_description_res': 'show'});
        }else{
            $("th.descricao.prop-resposta-ext").hide();
            $("[id^='pro_description']").hide();
            chrome.storage.local.set({'pro_description_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "preço" das respostas
    $('#btn_pro_preco').click(function(){
        if($('#btn_pro_preco').is(':checked')){
            $("th.preco.prop-resposta-ext").show();
            $("th.precos.prop-resposta-ext").show();
            $("[id^='pro_price_']").show();
            chrome.storage.local.set({'pro_price_res': 'show'});
        }else{
            $("th.preco.prop-resposta-ext").hide();
            $("th.precos.prop-resposta-ext").hide();
            $("[id^='pro_price_']").hide();
            chrome.storage.local.set({'pro_price_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "exibir preço" das respostas
    $('#btn_pro_show_price').click(function(){
        if($('#btn_pro_show_price').is(':checked')){
            $("th.exibir.prop-resposta-ext").show();
            $("[id^='pro_show_price_']").show();
            chrome.storage.local.set({'pro_show_price_res': 'show'});
        }else{
            $("th.exibir.prop-resposta-ext").hide();
            $("[id^='pro_show_price_']").hide();
            chrome.storage.local.set({'pro_show_price_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "template" das respostas
    $('#btn_pro_template').click(function(){
        if($('#btn_pro_template').is(':checked')){
            $("th.template.prop-resposta-ext").show();
            $("[id^='pro_template_']").show();
            chrome.storage.local.set({'pro_template_res': 'show'});
        }else{
            $("th.template.prop-resposta-ext").hide();
            $("[id^='pro_template_']").hide();
            chrome.storage.local.set({'pro_template_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "categoria" das respostas
    $('#btn_pro_categoria').click(function(){
        if($('#btn_pro_categoria').is(':checked')){
            $("th.categoria.prop-resposta-ext").show();
            $("[id^='pro_categorie_']").show();
            chrome.storage.local.set({'pro_categorie_res': 'show'});
        }else{
            $("th.categoria.prop-resposta-ext").hide();
            $("[id^='pro_categorie_']").hide();
            chrome.storage.local.set({'pro_categorie_res': 'hide'});
        }
    });

    // Checkbox para mostrar e esconder a propriedade "modelo" das respostas
    $('#btn_pro_modelo').click(function(){
        if($('#btn_pro_modelo').is(':checked')){
            $("th.modelo.prop-resposta-ext").show();
            $("[id^='pro_model_']").show();
            chrome.storage.local.set({'pro_model_res': 'show'});
        }else{
            $("th.modelo.prop-resposta-ext").hide();
            $("[id^='pro_model_']").hide();
            chrome.storage.local.set({'pro_model_res': 'hide'});
        }
    });

    /* ====================================== */

});