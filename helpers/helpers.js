setTimeout(function(){
    chrome.extension.getBackgroundPage().catchWebappOpened();
    console.log("Clicou");
}, 300);

/* VAI PARA PÁGINA CUSTOMIZAR WEBAPP */

$('#bt_gera_script').click(function(){
    chrome.storage.local.get('helpers_webapp_url', function(url){
        var url = url.helpers_webapp_url;
        console.log(url);

        if(!url){
            var url = prompt('Nenhum WebApp encontrado! O Webapp precisa estar na "Home".\nInforme a URL do WebApp que deseja customizar:');
            if(url != null && url.includes("https://") || url != null && url.includes("http://")){
                window.open (
                    url,
                    '_blank',
                    'width=1350, height=1440, left=570, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
                );
            }else if(url != null && url != false){
                window.location.href = "helpers.html";
                alert("URL Inválida!");
            }else{
                window.location.href = "helpers.html";
            }
        }else{
            window.open (
                url,
                '_blank',
                'width=1350, height=1440, left=570, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=0, fullscreen=no'
            );
        }
    });
});
    
/* ====================================== */



/* PREPARAR PEDIDOS AUTOMATICAMENTE */

$('#auto-prepare').click(function(){
	if(confirm('TODOS OS PEDIDOS TERÃO STATUS "PREPARADO" E NOTIFICAR CLIENTE COMO "NÃO"!\n\nDeseja mesmo fazer isso?')){
		chrome.extension.getBackgroundPage().autoPrepare();
	}
});

/* ====================================== */