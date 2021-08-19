$(function(){

    /* AÇÕES AO CARREGAR A PÁGINA */
    
        // Quando o dom carrega essa função é chamada para listar os itens
        $(document).ready(function(){
            chrome.extension.getBackgroundPage().countTabs();
            listItems();
        });
    
        // Atualiza listagem de itens e marca todos os checkbox das propriedades listadas
        $('#bt_refresh_page').click(function(){
            if(confirm("Você PERDERÁ todas as alterações caso não tenha salvo ou enviado para as abas! Deseja mesmo atualizar?")){
                window.location.reload();
            }
        });
    
        // Timeout de 1 segundo para dar tempo de carregar os registros e aplicar essas alterações
        setTimeout(function(){
    
            // Coloca borda verde nos elementos alterados
            $("input, textarea, select").change(function(){
                $(this).addClass('border-success');
                $('#save_itens').addClass('disabled');
            });
            
            // Coloca borda valores 0 e 1 para preços e máximos + borda verde
            var ite_precos = Array.from(document.querySelectorAll("[id^='ite_price_'"));
            var ite_maximos = Array.from(document.querySelectorAll("[id^='ite_maximum_'"));
            ite_precos.forEach(function(preco){
                if(preco.value == '' && preco.disabled == false){
                    preco.value = 0.00;
                    $('#'+preco.id).addClass('border-success');
                }
            });
            ite_maximos.forEach(function(maximo){
                if(maximo.value == '' && maximo.disabled == false){
                    maximo.value = 1;
                    $('#'+maximo.id).addClass('border-success');
                }
            });
    
    
            // Pega os dados obtidos das abas a primeira vez e depois de 1 segundo chama a função que coletas os mesmos dados para comparar
            // Para verificar se deu tempo de coletar todos eles atualizados ... Caso não tenha dado tempo, atualiza a pagina para tentar denovo
            var array1 = [];
            chrome.storage.local.get('itens', function(data){
                if(data.itens){
                    var itens = data.itens;
                    itens.sort(function(a, b){
                        if(a.tab_id < b.tab_id){
                            return -1;
                        }else{
                            return true;
                        }
                    });
                    itens = JSON.stringify(itens);
                    console.log("Array-1 = "+itens);
                    array1.push(itens);
                    chrome.extension.getBackgroundPage().editItems();
                }
            });
    
            var array2 = [];
            setTimeout(function(){
                chrome.storage.local.get('itens', function(data){
                    if(data.itens){
                        var itens = data.itens;
                    
                        itens.sort(function(a, b){
                            if(a.tab_id < b.tab_id){
                                return -1;
                            }else{
                                return true;
                            }
                        });
                        itens = JSON.stringify(itens);
                        console.log("Array-2 = "+itens);
                        array2.push(itens);
                    }
                });
            }, 1200);
    
            setTimeout(function(){
                if(array1[0] != array2[0]){
                    array1 = [];
                    array2 = [];
                    alert("Informações Incompatíveis! ┐ (° _ °) ┌\n- A página será atualizada ...");
                    window.location.reload();
                }else{
                    $('.btn').removeClass('disabled');
                    $('input, select, textarea').prop('disabled', false);
                    $('input[class*="border-danger"').prop('disabled', true);
                    $("#loading-2").hide();
                    array1 = [];
                    array2 = [];
                }
            }, 1500);
            
        }, 1500);
    
    /* ====================================== */
    
    
    
    /* FUNÇÃO PARA LISTAR TODOS OS ITENS */
    
        function listItems(){
            // Conta as abas novamente por prevenção
            chrome.extension.getBackgroundPage().countTabs();
    
            // Coleta todas as informações dos itens abertos e armazena no storage
            chrome.extension.getBackgroundPage().editItems();
    
            // Exibe o spinner enquanto o setTimeout abaixo não é executado
            $("body").css({'overflow-y': 'hidden'});
            $("#list_items_uni").html('');
            $("#list_items_tab").html('');
            $("#tipo_uni").hide();
            $("#tipo_tab").hide();
            $("#dashboard").hide();
            $("#loading-1").html('<div id="spinner" class="spinner-border text-success" style="width: 80px; height: 80px;" role="status"><span class="visually-hidden">Loading...</span></div>');
    
    
            // setTimeout para dar tempo de coletar todos os dados das abas de itens
            setTimeout(function(){
                // Remove o spinner para listar os itens
                $("#spinner").hide();
                $("#dashboard").show();
                $("body").css({'overflow-y': 'auto'});
    
                // Pega o array de informações dos itens armazenado no storage
                chrome.storage.local.get('itens', function(data){
                    var itens = data.itens;
    
                    // If para não gerar erro caso não tenha nenhum item aberto
                    if(itens){
                        $('#send_items').removeClass('disabled');
                        if(itens.length == 1){
                            $('#qtde_itens').html('(' + itens.length + ' item)');
                        }else{
                            $('#qtde_itens').html('(' + itens.length + ' itens)');
                        }

                        $("#tipo_uni").show();
                        $("#tipo_tab").show();
    
                        var thAtualizarUNI = '<th scope="col" class="atualiza-item prop-item-ext"><a href="#" id="refresh_items_uni" class="btn btn-primary rounded-1"><i class="fas fa-redo-alt"></i></a></th>';
                        var thAtualizarTAB = '<th scope="col" class="atualiza-item prop-item-ext"><a href="#" id="refresh_items_tab" class="btn btn-primary rounded-1"><i class="fas fa-redo-alt"></i></a></th>';

                        var thSKU       = '<th scope="col" class="sku prop-item-ext">SKU</th>';
                        var thGrupo     = '<th scope="col" class="grupo prop-item-ext">Grupo</th>';
                        var thTitulo    = '<th scope="col" class="titulo prop-item-ext">Título</th>';
                        var thDescricao = '<th scope="col" class="descricao prop-item-ext" id="th_desc">Descrição</th>';
                        var thPreco     = '<th scope="col" class="preco prop-item-ext">Preço</th>';

                        var thRobo1     = '<th scope="col" class="robo1 prop-item-ext">V-Robô</th>';
                        var thWebapp1   = '<th scope="col" class="webapp1 prop-item-ext">V-Web</th>';
                        var thMenu1     = '<th scope="col" class="menu1 prop-item-ext">V-Menu</th>';
                        var thRobo2     = '<th scope="col" class="robo2 prop-item-ext">Q-Robô</th>';
                        var thWebapp2   = '<th scope="col" class="webapp2 prop-item-ext">Q-Web</th>';
                        var thMenu2     = '<th scope="col" class="menu2 prop-item-ext">Q-Menu</th>';

                        var thTemplate  = '<th scope="col" class="template prop-item-ext">Template / Tipo Preço</th>';
                        var thEntrega   = '<th scope="col" class="entrega prop-item-ext">Entrega</th>';
                        var thPontos    = '<th scope="col" class="pontos prop-item-ext">Pontos</th>';
                        var thEspaco    = '<th scope="col" class="espaco prop-item-ext">Espaço</th>';
    
                        // Insere o head da tabela de itens com preço únicos
                        $("#list_items_uni").append(
                            '<table id="table_uni" class="table table-sm table-borderless table-hover" style="--bs-table-hover-bg: rgb(108 117 125 / 30%);">'
                            +'<thead class="text-center"><tr id="tr_head_uni">'
                            +thAtualizarUNI+thSKU+thGrupo+thTitulo+thDescricao+thPreco+thRobo1+thWebapp1+thMenu1+thRobo2+thWebapp2+thMenu2+thTemplate+thEntrega+thPontos+thEspaco
                        );

                        /// Insere o head da tabela de itens com preço tabela
                        $("#list_items_tab").append(
                            '<table id="table_tab" class="table table-sm table-borderless table-hover" style="--bs-table-hover-bg: rgb(108 117 125 / 30%);">'
                            +'<thead class="text-center"><tr id="tr_head_tab">'
                            +thAtualizarTAB+thSKU+thGrupo+thTitulo+thDescricao+thRobo1+thWebapp1+thMenu1+thRobo2+thWebapp2+thMenu2+thTemplate+thEntrega+thPontos+thEspaco
                        );
    
                        // Função do botão de atualizar todas as abas de itens com preço único
                        $('#refresh_items_uni').click(function(){
                            if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar Itens"?')){
                                chrome.extension.getBackgroundPage().refreshItems('all_uni');
                        
                                $('.btn').addClass('disabled');
                        
                                setTimeout(function(){
                                    $('.btn').removeClass('disabled');
                                }, 3000)
                            }
                        });

                        // Função do botão de atualizar todas as abas de itens com preço tabela
                        $('#refresh_items_tab').click(function(){
                            if(confirm('*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar todas as páginas "Editar Itens"?')){
                                chrome.extension.getBackgroundPage().refreshItems('all_tab');
                        
                                $('.btn').addClass('disabled');
                        
                                setTimeout(function(){
                                    $('.btn').removeClass('disabled');
                                }, 3000)
                            }
                        });

                        // Insere a quantidade certa de th para titulo e preço na tabela
                        chrome.storage.local.get('max_tit', function(qtde){
                            console.log('Máximo de preços em um item: ' + qtde.max_tit);
                            for(var i = 1; i <= qtde.max_tit; i++){
                                $("#tr_head_tab").append('<th scope="col" class="t-titulo prop-item-ext">T-Título</th>');
                                $("#tr_head_tab").append('<th scope="col" class="t-preco prop-item-ext">T-Preço</th>');
                            }
    
                            // botão para adicionar preços
                            $("#tr_head_tab").append('<th scope="col" class="novo-preco prop-item-ext"><a href="#" id="btn-add-preco-all" class="btn btn-success rounded-1"><i class="fas fa-plus"></i></a></th>');
                            $("#btn-add-preco-all").click(function(){
                                if(confirm("Deseja mesmo adicionar um novo campo de preço para todos os itens?")){
                                    chrome.extension.getBackgroundPage().addPriceItems();
                                    $('#send_items').click();
                                }
                            });
    
                            // botão para remover o ultimo preço
                            $("#tr_head_tab").append('<th scope="col" class="exclui-preco prop-item-ext"><a href="#" id="btn-remove-preco-all" class="btn btn-danger rounded-1"><i class="fas fa-minus"></i></a></th></tr>');
                            $("#btn-remove-preco-all").click(function(){
                                if(confirm("Deseja mesmo remover o último preço de todos os itens?")){
                                    chrome.extension.getBackgroundPage().removePriceItems();
                                    $('#send_items').click();
                                }
                            });
                        });

                        var ite_unico = [];
                        var ite_tabela = [];
    
                        itens.forEach(function(item){
                            if(item.price){
                                ite_unico.push(item);
                            }
                            if(item.t_titles){
                                ite_tabela.push(item);
                            }
                        });

                        $("#table_uni").append('<tbody id="tbody_uni">');
					    $("#table_tab").append('<tbody id="tbody_tab">');
                        
                        itens.forEach(function(item){
                            console.log(item.title);
                        });
    
                        // função para organizar a lista na mesma ordem das abas
                        ite_unico.sort(function(a, b){
                            if(a.tab_id < b.tab_id){
                                return -1;
                            }else{
                                return true;
                            }
                        });

                        // função para organizar a lista na mesma ordem das abas
                        ite_tabela.sort(function(a, b){
                            if(a.tab_id < b.tab_id){
                                return -1;
                            }else{
                                return true;
                            }
                        });

                        console.log(ite_unico);
					    console.log(ite_tabela);
    
                        // Exibe uma nova linha na tabela para cada item com preço único do array
                        ite_unico.forEach(function(item){
    
                            console.log(item.title);

                            // formata a propriedade "Vender no Robô"
                            switch(item.sell_robot){
                                case 1:
                                    var sell_robot_1 = '<option value="1" selected>Sim</option>';
                                    var sell_robot_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_robot_1 = '<option value="1">Sim</option>';
                                    var sell_robot_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Vender no Webapp"
                            switch(item.sell_webapp){
                                case 1:
                                    var sell_webapp_1 = '<option value="1" selected>Sim</option>';
                                    var sell_webapp_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_webapp_1 = '<option value="1">Sim</option>';
                                    var sell_webapp_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Vender no Menu"
                            switch(item.sell_menu){
                                case 1:
                                    var sell_menu_1 = '<option value="1" selected>Sim</option>';
                                    var sell_menu_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_menu_1 = '<option value="1">Sim</option>';
                                    var sell_menu_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Exigir Qtde no Robo"
                            switch(item.req_robot){
                                case 1:
                                    var req_robot_1 = '<option value="1" selected>Sim</option>';
                                    var req_robot_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_robot_1 = '<option value="1">Sim</option>';
                                    var req_robot_2 = '<option value="0" selected>Não</option>';
                                break;
                            }
                            
                            // formata a propriedade "Exigir Qtde no Webapp"
                            switch(item.req_webapp){
                                case 1:
                                    var req_webapp_1 = '<option value="1" selected>Sim</option>';
                                    var req_webapp_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_webapp_1 = '<option value="1">Sim</option>';
                                    var req_webapp_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Exigir Qtde no Menu"
                            switch(item.req_menu){
                                case 1:
                                    var req_menu_1 = '<option value="1" selected>Sim</option>';
                                    var req_menu_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_menu_1 = '<option value="1">Sim</option>';
                                    var req_menu_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Entrega Grátis"
                            switch(item.free_delivery){
                                case 1:
                                    var free_delivery_1 = '<option value="1" selected>Sim</option>';
                                    var free_delivery_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var free_delivery_1 = '<option value="1">Sim</option>';
                                    var free_delivery_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Contabilizar Pontos"
                            switch(item.points){
                                case 1:
                                    var points_1 = '<option value="1" selected>Sim</option>';
                                    var points_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var points_1 = '<option value="1">Sim</option>';
                                    var points_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            var tdAtualizar = '<td id="pro_ref_'+item.tab_id+'" class="text-center"><button id="btn-ref-item-'+item.tab_id+'" class="btn btn-primary btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
                            var tdSKU       = '<td id="pro_sku_'+item.tab_id+'"><input id="ite_sku_'+item.tab_id+'" class="form-control form-control-sm sku" type="text" value="'+item.sku+'"></td>';
                            var tdGrupo     = '<td id="pro_group_'+item.tab_id+'"><select id="ite_group_'+item.tab_id+'" class="form-select form-select-sm">'+item.groups+'</select></td>';
                            var tdTitulo    = '<td id="pro_title_'+item.tab_id+'"><input id="ite_title_'+item.tab_id+'" class="form-control form-control-sm titulo" type="text" value="'+item.title+'"></td>';
                            var tdDescricao = '<td id="pro_description_'+item.tab_id+'"><textarea id="ite_description_'+item.tab_id+'" class="form-control form-control-sm descricao" type="text" rows="1">'+item.description+'</textarea></td>';
                            var tdPreco     = '<td id="pro_price_'+item.tab_id+'"><input id="ite_price_'+item.tab_id+'" class="form-control form-control-sm preco" type="text" value="'+item.price+'"></td>';
                            var tdRobo1     = '<td id="pro_sell_robot_'+item.tab_id+'"><select id="ite_sell_robot_'+item.tab_id+'" class="form-select form-select-sm">'+sell_robot_1+sell_robot_2+'</select></td>';
                            var tdWebapp1   = '<td id="pro_sell_webapp_'+item.tab_id+'"><select id="ite_sell_webapp_'+item.tab_id+'" class="form-select form-select-sm">'+sell_webapp_1+sell_webapp_2+'</select></td>';
                            var tdMenu1     = '<td id="pro_sell_menu_'+item.tab_id+'"><select id="ite_sell_menu_'+item.tab_id+'" class="form-select form-select-sm">'+sell_menu_1+sell_menu_2+'</select></td>';
                            var tdRobo2     = '<td id="pro_req_robot_'+item.tab_id+'"><select id="ite_req_robot_'+item.tab_id+'" class="form-select form-select-sm">'+req_robot_1+req_robot_2+'</select></td>';
                            var tdWebapp2   = '<td id="pro_req_webapp_'+item.tab_id+'"><select id="ite_req_webapp_'+item.tab_id+'" class="form-select form-select-sm">'+req_webapp_1+req_webapp_2+'</select></td>';
                            var tdMenu2     = '<td id="pro_req_menu_'+item.tab_id+'"><select id="ite_req_menu_'+item.tab_id+'" class="form-select form-select-sm">'+req_menu_1+req_menu_2+'</select></td>';
                            var tdTemplate  = '<td id="pro_template_'+item.tab_id+'"><select id="ite_template_'+item.tab_id+'" class="form-select form-select-sm">'+item.templates+'</select></td>';
                            var tdEntrega   = '<td id="pro_delivery_'+item.tab_id+'"><select id="ite_delivery_'+item.tab_id+'" class="form-select form-select-sm">'+free_delivery_1+free_delivery_2+'</select></td>';
                            var tdPontos    = '<td id="pro_points_'+item.tab_id+'"><select id="ite_points_'+item.tab_id+'" class="form-select form-select-sm">'+points_1+points_2+'</select></td>';
                            var tdEspaco    = '<td id="pro_spacing_'+item.tab_id+'"><input id="ite_spacing_'+item.tab_id+'" class="form-control form-control-sm espaco" type="text" value="'+item.spacing+'"></td>';

                            // Adiciona botão de atualizar página do item individualmente	--- Exibe o status, sku, titulo e descrição ...
                            $("#tbody_uni").append('<tr id="'+item.tab_id+'">'+tdAtualizar+tdSKU+tdGrupo+tdTitulo+tdDescricao+tdPreco+tdRobo1+tdWebapp1+tdMenu1+tdRobo2+tdWebapp2+tdMenu2+tdTemplate+tdEntrega+tdPontos+tdEspaco+'</tr>');
    
                            $('#btn-ref-item-'+item.tab_id).click(function(){
                                if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba do item "'+item.title+'"?')){
                                    chrome.extension.getBackgroundPage().refreshItems(item.tab_id);
                                    $('.btn').addClass('disabled');
                                    setTimeout(function(){
                                        window.location.reload();
                                    }, 2000);
                                }
                            });
                           
                            $("#tbody_uni").append('</tbody>');
						    $("#table_uni").append('</table>');
                        });

                        // Exibe uma nova linha na tabela para cada item com preço único do array
                        ite_tabela.forEach(function(item){
    
                            console.log(item.title);

                            // formata a propriedade "Vender no Robô"
                            switch(item.sell_robot){
                                case 1:
                                    var sell_robot_1 = '<option value="1" selected>Sim</option>';
                                    var sell_robot_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_robot_1 = '<option value="1">Sim</option>';
                                    var sell_robot_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Vender no Webapp"
                            switch(item.sell_webapp){
                                case 1:
                                    var sell_webapp_1 = '<option value="1" selected>Sim</option>';
                                    var sell_webapp_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_webapp_1 = '<option value="1">Sim</option>';
                                    var sell_webapp_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Vender no Menu"
                            switch(item.sell_menu){
                                case 1:
                                    var sell_menu_1 = '<option value="1" selected>Sim</option>';
                                    var sell_menu_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var sell_menu_1 = '<option value="1">Sim</option>';
                                    var sell_menu_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Exigir Qtde no Robo"
                            switch(item.req_robot){
                                case 1:
                                    var req_robot_1 = '<option value="1" selected>Sim</option>';
                                    var req_robot_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_robot_1 = '<option value="1">Sim</option>';
                                    var req_robot_2 = '<option value="0" selected>Não</option>';
                                break;
                            }
                            
                            // formata a propriedade "Exigir Qtde no Webapp"
                            switch(item.req_webapp){
                                case 1:
                                    var req_webapp_1 = '<option value="1" selected>Sim</option>';
                                    var req_webapp_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_webapp_1 = '<option value="1">Sim</option>';
                                    var req_webapp_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Exigir Qtde no Menu"
                            switch(item.req_menu){
                                case 1:
                                    var req_menu_1 = '<option value="1" selected>Sim</option>';
                                    var req_menu_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var req_menu_1 = '<option value="1">Sim</option>';
                                    var req_menu_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Entrega Grátis"
                            switch(item.free_delivery){
                                case 1:
                                    var free_delivery_1 = '<option value="1" selected>Sim</option>';
                                    var free_delivery_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var free_delivery_1 = '<option value="1">Sim</option>';
                                    var free_delivery_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            // formata a propriedade "Contabilizar Pontos"
                            switch(item.points){
                                case 1:
                                    var points_1 = '<option value="1" selected>Sim</option>';
                                    var points_2 = '<option value="0">Não</option>';
                                break;

                                case 2:
                                    var points_1 = '<option value="1">Sim</option>';
                                    var points_2 = '<option value="0" selected>Não</option>';
                                break;
                            }

                            var tdAtualizar = '<td id="pro_ref_'+item.tab_id+'" class="text-center"><button id="btn-ref-item-'+item.tab_id+'" class="btn btn-primary btn-sm rounded-1"><i class="fas fa-redo-alt"></i></button></td>';
                            var tdSKU       = '<td id="pro_sku_'+item.tab_id+'"><input id="ite_sku_'+item.tab_id+'" class="form-control form-control-sm sku" type="text" value="'+item.sku+'"></td>';
                            var tdGrupo     = '<td id="pro_group_'+item.tab_id+'"><select id="ite_group_'+item.tab_id+'" class="form-select form-select-sm">'+item.groups+'</select></td>';
                            var tdTitulo    = '<td id="pro_title_'+item.tab_id+'"><input id="ite_title_'+item.tab_id+'" class="form-control form-control-sm titulo" type="text" value="'+item.title+'"></td>';
                            var tdDescricao = '<td id="pro_description_'+item.tab_id+'"><textarea id="ite_description_'+item.tab_id+'" class="form-control form-control-sm descricao" type="text" rows="1">'+item.description+'</textarea></td>';
                            var tdRobo1     = '<td id="pro_sell_robot_'+item.tab_id+'"><select id="ite_sell_robot_'+item.tab_id+'" class="form-select form-select-sm">'+sell_robot_1+sell_robot_2+'</select></td>';
                            var tdWebapp1   = '<td id="pro_sell_webapp_'+item.tab_id+'"><select id="ite_sell_webapp_'+item.tab_id+'" class="form-select form-select-sm">'+sell_webapp_1+sell_webapp_2+'</select></td>';
                            var tdMenu1     = '<td id="pro_sell_menu_'+item.tab_id+'"><select id="ite_sell_menu_'+item.tab_id+'" class="form-select form-select-sm">'+sell_menu_1+sell_menu_2+'</select></td>';
                            var tdRobo2     = '<td id="pro_req_robot_'+item.tab_id+'"><select id="ite_req_robot_'+item.tab_id+'" class="form-select form-select-sm">'+req_robot_1+req_robot_2+'</select></td>';
                            var tdWebapp2   = '<td id="pro_req_webapp_'+item.tab_id+'"><select id="ite_req_webapp_'+item.tab_id+'" class="form-select form-select-sm">'+req_webapp_1+req_webapp_2+'</select></td>';
                            var tdMenu2     = '<td id="pro_req_menu_'+item.tab_id+'"><select id="ite_req_menu_'+item.tab_id+'" class="form-select form-select-sm">'+req_menu_1+req_menu_2+'</select></td>';
                            var tdTemplate  = '<td id="pro_template_'+item.tab_id+'"><select id="ite_template_'+item.tab_id+'" class="form-select form-select-sm">'+item.templates+'</select></td>';
                            var tdEntrega   = '<td id="pro_delivery_'+item.tab_id+'"><select id="ite_delivery_'+item.tab_id+'" class="form-select form-select-sm">'+free_delivery_1+free_delivery_2+'</select></td>';
                            var tdPontos    = '<td id="pro_points_'+item.tab_id+'"><select id="ite_points_'+item.tab_id+'" class="form-select form-select-sm">'+points_1+points_2+'</select></td>';
                            var tdEspaco    = '<td id="pro_spacing_'+item.tab_id+'"><input id="ite_spacing_'+item.tab_id+'" class="form-control form-control-sm espaco" type="text" value="'+item.spacing+'"></td>';

                            // Adiciona botão de atualizar página do item individualmente	--- Exibe o status, sku, titulo e descrição ...
                            $("#tbody_tab").append('<tr id="'+item.tab_id+'">'+tdAtualizar+tdSKU+tdGrupo+tdTitulo+tdDescricao+tdRobo1+tdWebapp1+tdMenu1+tdRobo2+tdWebapp2+tdMenu2+tdTemplate+tdEntrega+tdPontos+tdEspaco+'</tr>');
    
                            $('#btn-ref-item-'+item.tab_id).click(function(){
                                if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo atualizar a aba do item "'+item.title+'"?')){
                                    chrome.extension.getBackgroundPage().refreshItems(item.tab_id);
                                    $('.btn').addClass('disabled');
                                    setTimeout(function(){
                                        window.location.reload();
                                    }, 2000);
                                }
                            });
                            
                            // Conta quantos preços tem e armazena na variavel prices
                            var prices = 0;
                            item.t_prices.forEach(function(preco){
                                prices = prices + 1;
                            });
    
                            chrome.storage.local.get('max_tit', function(qtde){
                                // Exibe os preços e máximos com base na quantidade obtida
                                for(var i = 0; i < prices; i++){
                                    $('#'+item.tab_id).append('<td id="pro_tab_title_'+i+'_'+item.tab_id+'"><input id="ite_t_title_'+i+'_'+item.tab_id+'" class="form-control form-control-sm t-titulo" type="text" value="'+item.t_titles[i]+'"></td>');
                                    $('#'+item.tab_id).append('<td id="pro_tab_price_'+i+'_'+item.tab_id+'"><input id="ite_t_price_'+i+'_'+item.tab_id+'" class="form-control form-control-sm preco" type="text" value="'+item.t_prices[i]+'"></td>');
                                }
    
                                // Exibe os campos desabilitados caso a quantidade de preços do item seja menor que a do item com mais preços
                                if(prices < qtde.max_tit){
                                    for(var i = prices; i < qtde.max_tit; i++){
                                        $('#'+item.tab_id).append('<td id="pro_tab_title_'+i+'_'+item.tab_id+'"><input id="ite_t_title_'+i+'_'+item.tab_id+'" class="form-control form-control-sm t-titulo border-danger" type="text" value="" disabled></td>');
                                        $('#'+item.tab_id).append('<td id="pro_tab_price_'+i+'_'+item.tab_id+'"><input id="ite_t_price_'+i+'_'+item.tab_id+'" class="form-control form-control-sm preco border-danger" type="text" value="" disabled></td>');
                                    }
                                }
    
                                // Botão para adicionar preço individualmente
                                $('#'+item.tab_id).append('<td id="pro_add_'+item.tab_id+'" class="text-center"><button id="btn-add-preco-'+item.tab_id+'" class="btn btn-success btn-sm rounded-1"><i class="fas fa-plus"></i></button></td>');
                                $('#btn-add-preco-'+item.tab_id).click(function(){
                                    if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo adicionar um novo campo de preço para o item "'+item.title+'"?')){
                                        chrome.extension.getBackgroundPage().addPriceItems(item.tab_id);
                                        $('.btn').addClass('disabled');
                                        setTimeout(function(){
                                            window.location.reload();
                                        }, 500);
                                    }
                                });
    
                                // Botão para remover preço individualmente
                                $('#'+item.tab_id).append('<td id="pro_remove_'+item.tab_id+'" class="text-center"><button id="btn-remove-preco-'+item.tab_id+'" class="btn btn-danger btn-sm rounded-1"><i class="fas fa-minus"></i></button></td>');
                                $('#btn-remove-preco-'+item.tab_id).click(function(){
                                    if(confirm('*A PÁGINA SERÁ ATUALIZADA E AS INFORMAÇÕES NÃO ENVIADAS SERÃO PERDIDAS!*\n\nDeseja mesmo remover o último campo de preço do item "'+item.title+'"?')){
                                        chrome.extension.getBackgroundPage().removePriceItems(item.tab_id);
                                        $('.btn').addClass('disabled');
                                        setTimeout(function(){
                                            window.location.reload();
                                        }, 500);
                                    }
                                });
                            });
                            
                           
                            $("#tbody_tab").append('</tbody>');
						    $("#table_tab").append('</table>');
                        });

                        // Esconde a lista de itens com preço unico
                        if(!ite_unico[0]){
                            $('#tipo_uni').hide();
                            $('#table_uni').hide();
                        }

                        // Esconde a lista de itens com preço tabela
                        if(!ite_tabela[0]){
                            $('#tipo_tab').hide();
                            $('#table_tab').hide();
                        }
    
                        setTimeout(function(){
                            $('.btn').addClass('disabled');
                            $('input, select, textarea').prop('disabled', true);
                        }, 10);
                    }else{
    
                        // Se não existir nenhum item aberto, desabilita os botões
                        $('.btn').addClass('disabled');
                        $('input[type="checkbox"]').prop('disabled', true);
                        $("#dashboard").addClass('text-center');
                        $("#dashboard").append('<p><strong>Nenhum registro encontrado ...</strong></p><div><button class="btn btn-primary" id="atualizar">Atualizar</button></div>');
                        $('#atualizar').click(function(){
                            window.location.reload();
                        });
                    }
                });
            }, 1000);
        }
    
    /* ====================================== */
    
    
    
    /* FUNÇÃO PARA ENVIAR AS ALTERAÇÕES NOS ITENS PARA AS ABAS */
    
        var newItem = [];
        $('#send_items').click(function(){
    
            // Desabilida os botões de enviar e salvar pros abestado não fazer cagada (Para garantir que quando forem habilitados novamente, as informações tenham sido enviadas)
            $('.btn').addClass('disabled');
    
            newItem = [];
            chrome.storage.local.get('itens', function(data){
                var itens = data.itens;
    
                // Coleta todas as informações da lista (tabela)
                if(itens){

                    var ite_unico = [];
                    var ite_tabela = [];

                    itens.forEach(function(item){
                        if(item.price){
                            ite_unico.push(item);
                        }
                        if(item.t_titles){
                            ite_tabela.push(item);
                        }
                    });

                    ite_unico.forEach(function(item){
                        var addItem = {
                            tab_id: item.tab_id,
                            sku: document.getElementById('ite_sku_'+item.tab_id).value,
                            title: document.getElementById('ite_title_'+item.tab_id).value,
                            description: document.getElementById('ite_description_'+item.tab_id).value,
                            group: document.getElementById('ite_group_'+item.tab_id).selectedIndex,
                            price: document.getElementById('ite_price_'+item.tab_id).value,
                            template: document.getElementById('ite_template_'+item.tab_id).selectedIndex,
                            sell_robot: document.getElementById('ite_sell_robot_'+item.tab_id).value,
                            sell_webapp: document.getElementById('ite_sell_webapp_'+item.tab_id).value,
                            sell_menu: document.getElementById('ite_sell_menu_'+item.tab_id).value,
                            req_robot: document.getElementById('ite_req_robot_'+item.tab_id).value,
                            req_webapp: document.getElementById('ite_req_webapp_'+item.tab_id).value,
                            req_menu: document.getElementById('ite_req_menu_'+item.tab_id).value,
                            free_delivery: document.getElementById('ite_delivery_'+item.tab_id).value,
                            points: document.getElementById('ite_points_'+item.tab_id).value,
                            spacing: document.getElementById('ite_spacing_'+item.tab_id).value,
                        }

                        console.log(addItem);
    
                        newItem.push(addItem);
                    });

                    ite_tabela.forEach(function(item){
                        var addItem = {
                            tab_id: item.tab_id,
                            sku: document.getElementById('ite_sku_'+item.tab_id).value,
                            title: document.getElementById('ite_title_'+item.tab_id).value,
                            description: document.getElementById('ite_description_'+item.tab_id).value,
                            group: document.getElementById('ite_group_'+item.tab_id).selectedIndex,
                            template: document.getElementById('ite_template_'+item.tab_id).selectedIndex,
                            sell_robot: document.getElementById('ite_sell_robot_'+item.tab_id).value,
                            sell_webapp: document.getElementById('ite_sell_webapp_'+item.tab_id).value,
                            sell_menu: document.getElementById('ite_sell_menu_'+item.tab_id).value,
                            req_robot: document.getElementById('ite_req_robot_'+item.tab_id).value,
                            req_webapp: document.getElementById('ite_req_webapp_'+item.tab_id).value,
                            req_menu: document.getElementById('ite_req_menu_'+item.tab_id).value,
                            free_delivery: document.getElementById('ite_delivery_'+item.tab_id).value,
                            points: document.getElementById('ite_points_'+item.tab_id).value,
                            spacing: document.getElementById('ite_spacing_'+item.tab_id).value,
                            t_titles: [],
	                        t_prices: []
                        }

                        console.log(addItem);

                        for(i = 0; i < item.t_prices.length; i++){
                            var title = document.getElementById('ite_t_title_'+i+'_'+item.tab_id).value;
                            var price = document.getElementById('ite_t_price_'+i+'_'+item.tab_id).value;
                            addItem.t_titles.push(title);
                            addItem.t_prices.push(price);
                            console.log(title + " - " + price);
                        }

                        console.log("==================");
    
                        newItem.push(addItem);
                    });

                }else{
                    console.log(itens);
                }
    
                // Seta o novo array "itens", com as informações do array antigo alteradas pelo usuário
                console.log(newItem);
                chrome.storage.local.set({'itens': newItem});
    
                // Conta as abas denovo pra poder comparar na hora de enviar
                chrome.extension.getBackgroundPage().countTabs();
            });
    
            // Envia as informações do novo array para as abas
            setTimeout(function(){
                chrome.storage.local.get('item_tabs', function(tabs){
                    chrome.storage.local.get('itens', function(data){
                        console.log('Quantidade de Abas: ' + tabs.item_tabs);
                        console.log('Quantidade de Itens: ' + data.itens.length);
                        if(tabs.item_tabs == data.itens.length){
                            console.log('Quantidade válida');
                            console.log(data.itens);
                            chrome.extension.getBackgroundPage().sendItems();
    
                            // Habilita novamente os botões
                            setTimeout(function(){
                                alert("Alterações enviadas com sucesso! *(Ainda precisam ser salvas!)*\n- Finalizado em " + (tabs.item_tabs * 100)/1000 + " segundos");
                                window.location.reload();
                            }, tabs.item_tabs * 100);
                        }else{
                            alert('A quantidade de abas abertas para editar os itens não é igual a quantidade da lista!');
                            $('.btn').removeClass('disabled');
                        }
                    });
                });
            }, 1000);
        });
    
    /* ====================================== */
    
    
    
    /* FUNÇÃO PARA SALVAR TODOS OS ITENS ABERTOS NAS ABAS */
    
        $('#save_items').click(function(){
            if(confirm("*ISSO PODE TRAVAR O NAVEGADOR POR UM TEMPO EM CASO DE MUITAS ABAS!*\n*CERTIFIQUE-SE QUE AS INFORMAÇÕES FORAM ENVIADAS ANTES DE SALVAR!*\n\nDeseja mesmo salvar todos os itens?")){
                $('.btn').addClass('disabled');
                chrome.extension.getBackgroundPage().saveItems();
                setTimeout(function(){
                    $('.btn').removeClass('disabled');
                }, 3000);
            }
        });
    
    /* ====================================== */
    
    
    
    /* FUNÇÃO PARA FECHAR TODOS OS ITENS ABERTOS NAS ABAS */
    
        $('#close_item').click(function(){
            chrome.extension.getBackgroundPage().closeTabItem();
        });
    
    /* ====================================== */
    
    });