// Fecha as janelas helpers e webapp
setTimeout(function(){
    chrome.extension.getBackgroundPage().catchWebappWindow();
}, 1000);

// Fecha as janelas helpers e webapp
$('#bt_close_all').click(function(){
    if(confirm('*ESSA AÇÃO IRÁ FECHAR TODAS AS JANELAS DO HELPERS!*\n\nDeseja mesmo fecha-las?')){
        chrome.storage.local.get('helpers_webapp', function(id){
            var id = id.helpers_webapp;
            console.log(id);
            chrome.storage.local.remove('helpers_webapp_url');
            chrome.extension.getBackgroundPage().closeWebapp(id);
            window.close();
        });
    }
});

// Volta para o helpers e fecha a janela do webapp
$('#bt_voltar').click(function(){
    chrome.storage.local.get('helpers_webapp', function(id){
        var id = id.helpers_webapp;
        console.log(id);
        chrome.storage.local.remove('helpers_webapp_url');
        chrome.extension.getBackgroundPage().closeWebapp(id);
    });
});



/* CUSTOMIZAR WEBAPP */

// FUNÇÃO COPIAR SCRIPT
$('#resultado').hide(); // Esconde o textarea

$('#bt_copy_script').click(function(){
    // Pega valores dos inputs
    // Logo
    var tamanho = document.getElementById("tamanho_logo").value;
    var margem = document.getElementById("margem_logo").value;
    // Barras
    var estiloCor = document.getElementById("estilo_cor").value;
    var corPrimSup = document.getElementById("cor_primaria_superior").value;
    var corSecSup = document.getElementById("cor_secundaria_superior").value;
    var anguloSuperior = document.getElementById("angulo_superior").value;
    var corPrimInf = document.getElementById("cor_primaria_inferior").value;
    var corSecInf = document.getElementById("cor_secundaria_inferior").value;
    var anguloInferior = document.getElementById("angulo_inferior").value;
    
    // Verifica se os valores de tamanho e margem são diferentes do padrão, e se for salva o valor dentro do arrayLogo
    var arrayLogo = [];
    if(tamanho != 256){
        var css_tamanho = "'width': '" + tamanho + "px'";
        arrayLogo.push(css_tamanho);
        console.log(arrayLogo);
    }
    if(margem != 0){
        var css_margem = "'margin-top': '" + margem + "px', 'margin-bottom': '" + margem + "px'";
        arrayLogo.push(css_margem);
        console.log(arrayLogo);
    }

    var arrayScript = [];
    if(arrayLogo != ""){
        // Insere os parametros no script webapp e menu
        var css_webapp = "$('#webapp-home div.flex-container div.flex-box div#logo img').css({" + arrayLogo + "});";
        var css_menu = "$('#menu-home div.flex-container div.flex-box div#logo img').css({" + arrayLogo + "});";

        arrayScript.push("\n// ===== LOGO =====\n" + css_webapp + "\n" + css_menu + "\n");
    }

    if(estiloCor == "gradient"){
        if(btnCheck.checked == true){
            var css_webapp = "$('#webapp-topo, #webapp-rodape').css('background-image', 'linear-gradient("+ anguloSuperior +"deg, "+ corPrimSup +", "+ corSecSup +")');";
            var css_menu = "$('#menu-topo, #menu-rodape').css('background-image', 'linear-gradient("+ anguloSuperior +"deg, "+ corPrimSup +", "+ corSecSup +")');";
            
            arrayScript.push("\n// ===== BARRAS =====\n" + css_webapp + "\n" + css_menu + "\n");
        }
        if(btnCheck.checked == false){
            var css_webappSup = "$('#webapp-topo').css('background-image', 'linear-gradient("+ anguloSuperior +"deg, "+ corPrimSup +", "+ corSecSup +")');";
            var css_menuSup = "$('#menu-topo').css('background-image', 'linear-gradient("+ anguloSuperior +"deg, "+ corPrimSup +", "+ corSecSup +")');";
            var css_webappInf = "$('#webapp-rodape').css('background-image', 'linear-gradient("+ anguloInferior +"deg, "+ corPrimInf +", "+ corSecInf +")');";
            var css_menuInf = "$('#menu-rodape').css('background-image', 'linear-gradient("+ anguloInferior +"deg, "+ corPrimInf +", "+ corSecInf +")');";
            
            arrayScript.push("\n// ===== BARRAS =====\n" + css_webappSup + "\n" + css_menuSup + "\n" + css_webappInf + "\n" + css_menuInf + "\n");
        }
    }


    // Monta tag script
    if(arrayScript != ""){
        var array = arrayScript.join('\n')
        var script = "<script>\n" + array + "\n</script>";
        
        // Função para copiar o script para o "Ctrl + C"
        $('#resultado').show();
        document.getElementById("resultado").innerHTML = script;
        resultado.select();
        document.execCommand("copy");
        $('#resultado').hide();
        
        // Altera o texto do botão e desativa por 2 segundos
        $('#bt_copy_script').html("Script copiado!");
        $('#bt_copy_script').prop('disabled', true);
        
        setTimeout(function(){
            $('#bt_copy_script').html("Copiar script");
            $('#bt_copy_script').prop('disabled', false);
        }, 2000);
    }else{
        alert("\nPor favor, faça uma alteração para gerar o script!");
    }
});



// FUNÇÃO ALTERAR TAMANHO E MARGEM DA LOGO EM TEMPO REAL
// Quando deslizar o input range, ele pega o valor do tamanho e envia para a página do webapp
$("#range_tamanho_logo").on("input", function(){
    var tamanho = document.getElementById("range_tamanho_logo").value;
    var margem = document.getElementById("margem_logo").value;
    chrome.extension.getBackgroundPage().sendScriptLogo(tamanho,margem);
    document.getElementById("tamanho_logo").value = tamanho;
});

// Quando digitar no input number, ele pega o valor do tamanho e envia para a página do webapp
$("#tamanho_logo").on("input", function(){
    var tamanho = document.getElementById("tamanho_logo").value;
    var margem = document.getElementById("margem_logo").value;
    chrome.extension.getBackgroundPage().sendScriptLogo(tamanho,margem);
    document.getElementById("range_tamanho_logo").value = tamanho;
});

// MARGEM DA LOGO
// Quando deslizar o input range, ele pega o valor da margem e envia para a página do webapp
$("#range_margem_logo").on("input", function(){
    var tamanho = document.getElementById("tamanho_logo").value;
    var margem = document.getElementById("range_margem_logo").value;
    chrome.extension.getBackgroundPage().sendScriptLogo(tamanho,margem);
    document.getElementById("margem_logo").value = margem;
});

// Quando digitar no input number, ele pega o valor da margem e envia para a página do webapp
$("#margem_logo").on("input", function(){
    var margem = document.getElementById("margem_logo").value;
    var tamanho = document.getElementById("tamanho_logo").value;
    chrome.extension.getBackgroundPage().sendScriptLogo(tamanho,margem);
    document.getElementById("range_margem_logo").value = margem;
});



$("#cor_solida").hide();
$("#estilo_cor").on("input",  function(){
    var estilo_cor = document.getElementById("estilo_cor").value;
    if(estilo_cor == "solida"){
        $("#cor_solida").show();
        $("#cor_degrade").hide();
    }else if(estilo_cor == "gradient"){
        $("#cor_degrade").show();
        $("#cor_solida").hide();
    }
});

/*
    if($("#btn-check-2-outlined").is(':checked')){
        console.log("checked");
    }else{
        console.log("no checked");
    }

    if($("#btn-check-2-outlined").on("click", function(){

    }));
*/

function coresWebApp() {
    var edit = {
        corPrimSup: document.getElementById("cor_primaria_superior").value,
        corSecSup: document.getElementById("cor_secundaria_superior").value,
        anguloSuperior: document.getElementById("angulo_superior").value,
        corPrimInf: document.getElementById("cor_primaria_inferior").value,
        corSecInf: document.getElementById("cor_secundaria_inferior").value,
        anguloInferior: document.getElementById("angulo_inferior").value,
        corFonte: document.getElementById("cor_fonte").value
    }

    chrome.extension.getBackgroundPage().sendScriptBarra(edit);
}

var btnCheck = document.getElementById("btn-check-2-outlined");
const funcs = {
    checkGradient(id,value){
        if(btnCheck.checked == true){
            var x = document.querySelectorAll(id);
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].value = value.value;
            }

            coresWebApp();
        }
        if(btnCheck.checked == false){
            coresWebApp();
        }
    }
}

/* ============= BARRA SUPERIOR ============= */
$("#cor_primaria_superior").on("input",  function(){
    funcs.checkGradient("#cor_primaria_inferior",this);
});

$("#cor_secundaria_superior").on("input",  function(){
    funcs.checkGradient("#cor_secundaria_inferior",this);
});

$("#range_angulo_superior").on("input",  function(){
    funcs.checkGradient("#range_angulo_inferior, #angulo_inferior",this);
    document.getElementById("angulo_superior").value = this.value;
});

$("#angulo_superior").on("input",  function(){
    funcs.checkGradient("#angulo_inferior, #range_angulo_inferior",this);
    document.getElementById("range_angulo_superior").value = this.value;
});

/* ============= BARRA INFERIOR ============= */
$("#cor_primaria_inferior").on("input",  function(){
    funcs.checkGradient("#cor_primaria_superior",this);
});

$("#cor_secundaria_inferior").on("input",  function(){
    funcs.checkGradient("#cor_secundaria_superior",this);
});

$("#range_angulo_inferior").on("input",  function(){
    funcs.checkGradient("#angulo_superior, #range_angulo_superior",this);
    document.getElementById("angulo_inferior").value = this.value;
});

$("#angulo_inferior").on("input",  function(){
    funcs.checkGradient("#range_angulo_superior, #angulo_superior",this);
    document.getElementById("range_angulo_inferior").value = this.value;
});


/* ======== FONTE ======== */

$("#cor_fonte").on("input",  function(){
    coresWebApp();
});

$("#flexSwitchCheckDefault").on("input",  function(){
    if(this.checked){
        chrome.extension.getBackgroundPage().sendScriptStatus();
    }else{
        chrome.extension.getBackgroundPage().sendScriptStatus();
    }
});

/* ====================================== */