$(function(){

    $('#copiar').click(function(){
        var texto = document.querySelector("textarea").value;
        navigator.clipboard.writeText(texto);
        $('#copiar').html('Mensagem Copiada!').prop('disabled', true);
        setTimeout(() => {
            $('#copiar').html('Copiar Mensagem').prop('disabled', false);
        }, 2000);
    });

    $('#bt_refresh_page').click(function(){
		window.location.reload();
	});

    $('#div_robo, #div_app, #div_pontos, #div_desconto, #div_entrega').hide();

    $('#bt_webapp').click(function(){
        if($('#bt_webapp').is(':checked')){
            $("#div_webapp").show();
		}else{
            $("#div_webapp").hide();
		}
	});

    $('#bt_robo').click(function(){
        if($('#bt_robo').is(':checked')){
            $("#div_robo").show();
		}else{
            $("#div_robo").hide();
		}
	});

    $('#bt_app').click(function(){
        if($('#bt_app').is(':checked')){
            $("#div_app").show();
		}else{
            $("#div_app").hide();
		}
	});

    $('#bt_pontos').click(function(){
        if($('#bt_pontos').is(':checked')){
            $("#div_pontos").show();
		}else{
            $("#div_pontos").hide();
		}
	});

    $('#bt_desconto').click(function(){
        if($('#bt_desconto').is(':checked')){
            $("#div_desconto").show();
		}else{
            $("#div_desconto").hide();
		}
	});

    $('#bt_entrega').click(function(){
        if($('#bt_entrega').is(':checked')){
            $("#div_entrega").show();
		}else{
            $("#div_entrega").hide();
		}
	});

    $("input").keyup(function(){
        gerar();
    });
    $("select").change(function(){
        gerar();
    });
    $("input").change(function(){
        gerar();
    });

    function gerar(){
        var inicio = document.getElementById("inicio").value;
        var nome = document.getElementById("nome").value;
        var emoji = document.getElementById("emoji").value;

        var msg = inicio+" "+nome+" "+emoji+"\n\n";

        var qtde_links = 0;
        var qtde_incentivos = [];

        if($("#bt_webapp").is(':checked')){
            var webapp = "???? *FA??A SEU PEDIDO AQUI* ????\n";
            //Remove espa??os do subdominio e deixa em letra minuscula
            var subdominio = document.getElementById("subdominio").value.replace(/\s+/g, '').toLowerCase();
            //Remove acentua????o
            subdominio = subdominio.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            var url = "https://"+subdominio+".pedzap.com.br\n\n";
            msg = msg+webapp+url;
            qtde_links = qtde_links+1;
        }

        if($("#bt_app").is(':checked')){
            if(qtde_links == 0){
                var app = "???? *FA??A SEU PEDIDO AQUI* ????\n";
            }else{
                var app = "???? *App na Play Store* ????\n";
            }
            var link = document.getElementById("app").value+"\n\n";
            msg = msg+app+link;
            qtde_links = qtde_links+1;
        }

        if($("#bt_robo").is(':checked')){
            if(qtde_links == 0){
                var robo = "???? *FA??A SEU PEDIDO AQUI* ????\n";
            }else{
                var robo = "???? Rob?? de atendimento:\n";
            }
            var codigo = document.getElementById("codigo").value.replace(/\s+/g, '').toUpperCase();
            var url = "https://www.pedzap.com.br/h/"+codigo+"\n\n";
            msg = msg+robo+url;
            qtde_links = qtde_links+1;
        }

        if($("#bt_desconto").is(':checked')){
            var percentual = document.getElementById("percentual").value;
            var pedido = document.getElementById("pedido").value;
        }

        if($("#bt_entrega").is(':checked')){
            var entrega = document.getElementById("entrega").value;
        }

        if($("#bt_pontos").is(':checked')){
            var minimo = document.getElementById("minimo").value;
            if(minimo == 0){
                minimo = " ";
            }else{
                minimo = " (M??nimo R$"+minimo+",00) ";
            }
        }

        switch(qtde_links){
            case 1:
                var inicio = "_Pe??a no link";
                break;
            case 2:
            case 3:
                var inicio = "_Pe??a nos links";
                break;
            default:
                var inicio = "SEM LINKS!!";
        }

        if($("#bt_sorteio").is(':checked')){
            if(percentual && entrega && minimo){

                var sorteio = inicio+" para participar dos *SORTEIOS*: *IPHONE 11* e mais!_ ????\n";
                if(pedido == " " && entrega == " " && minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*, *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " " && entrega == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*, *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(pedido == " " && minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(entrega == " " && minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(entrega == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(percentual && entrega){

                var sorteio = inicio+" para participar dos *SORTEIOS*: *IPHONE 11* e mais!_ ????\n";
                if(pedido == " " && entrega == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*!_ ????";
                }else if(pedido == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO*!_ ????";
                }else if(entrega == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS*!_ ????";
                }else{
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"!_";
                    incentivo = incentivo.substring(0, incentivo.length - 3) + "!_ ????";
                }

            }else if(percentual && minimo){
                
                var sorteio = inicio+" para participar dos *SORTEIOS*: *IPHONE 11* e mais!_ ????\n";
                if(pedido == " " && minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*"+pedido+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = sorteio+"_Al??m disso, ganhe *"+percentual+"% EM DESCONTO*"+pedido+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(entrega && minimo){
                
                var sorteio = inicio+" para participar dos *SORTEIOS*: *IPHONE 11* e mais!_ ????\n";
                if(entrega == " " && minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(entrega == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = sorteio+"_Al??m disso, ganhe *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(minimo){
                var incentivo = inicio+", acumule *PONTOS*"+minimo+"para compras futuras e participe dos *SORTEIOS*: *IPHONE 11* e mais!_ ????";
            }else if(percentual){
                var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"e participe dos *SORTEIOS*: *IPHONE 11* e mais!_ ????";
            }else if(entrega){
                var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"e participe dos *SORTEIOS*: *IPHONE 11* e mais!_ ????";
            }else{
                var incentivo = inicio+" para participar dos *SORTEIOS*: *IPHONE 11* e mais!_ ????";
            }
            msg = msg+incentivo;
        }else{
            if(percentual && entrega && minimo){

                if(pedido == " " && entrega == " " && minimo == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*, *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " " && entrega == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*, *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(pedido == " " && minimo == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(entrega == " " && minimo == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(entrega == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(percentual && entrega){

                if(pedido == " " && entrega == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*!_ ????";
                }else if(pedido == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"+ *"+percentual+"% EM DESCONTO*!_ ????";
                }else if(entrega == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"+ *ENTREGA GR??TIS*!_ ????";
                }else{
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* + *ENTREGA GR??TIS*"+entrega+"!_";
                    incentivo = incentivo.substring(0, incentivo.length - 3) + "!_ ????";
                }

            }else if(percentual && minimo){
                
                if(pedido == " " && minimo == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(pedido == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = inicio+", ganhe *"+percentual+"% EM DESCONTO*"+pedido+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(entrega && minimo){
                
                if(entrega == " " && minimo == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS* e acumule *PONTOS* para compras futuras!_ ????";
                }else if(entrega == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS* e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }else if(minimo == " "){
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS* para compras futuras!_ ????";
                }else{
                    var incentivo = inicio+", ganhe *ENTREGA GR??TIS*"+entrega+"e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
                }

            }else if(minimo){
                var incentivo = inicio+" e acumule *PONTOS*"+minimo+"para compras futuras!_ ????";
            }else if(percentual){
                var incentivo = inicio+" e ganhe *"+percentual+"% EM DESCONTO*"+pedido+"!_ ????";
                incentivo = incentivo.substring(0, incentivo.length - 6) + "!_ ????";
            }else if(entrega){
                var incentivo = inicio+" e ganhe *ENTREGA GR??TIS*"+entrega+"!_ ????";
                incentivo = incentivo.substring(0, incentivo.length - 6) + "!_ ????";
            }else{
                var incentivo = "";
            }
            msg = msg+incentivo;
        }
        $("#msg").html(msg);
    }
});