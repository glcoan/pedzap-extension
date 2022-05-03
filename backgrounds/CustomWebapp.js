/* FUNÇÃO QUE ENVIA ALTERAÇÕES EM TEMPO REAL PARA WEBAPP */

export function sendScriptLogo(tamanhoLogo,margemLogo){
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(function(tab){
            if(tab.url.includes(urlWebapp)){
                var id = tab.id;
                chrome.tabs.executeScript(id, {
                    code: 
                        'var tamanhoLogo = "' + tamanhoLogo + '"; var margemLogo = "' + margemLogo + '"; var margemLogo = "' + margemLogo + '";'+
                        'document.querySelector("#webapp-home #logo img").style = "min-width: 256px; max-width: 60%; width: " + tamanhoLogo + "px; margin-top: " + margemLogo + "px; margin-bottom: " + margemLogo + "px;";'
                });
            }
        });
    });
}

export function sendScriptBarra(edit){
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(function(tab){
            if(tab.url.includes(urlWebapp)){
                var id = tab.id;
                chrome.tabs.executeScript(id, {
                    code:
                        'var corPrimSup = "' + edit.corPrimSup + '";'+
                        'var corSecSup = "' + edit.corSecSup + '";'+
                        'var anguloSuperior = "' + edit.anguloSuperior + '";'+
                        'var corPrimInf = "' + edit.corPrimInf + '";'+
                        'var corSecInf = "' + edit.corSecInf + '";'+
                        'var anguloInferior = "' + edit.anguloInferior + '";'+
                        'var corFonte = "' + edit.corFonte + '";'+
                        
                        'document.querySelector("#webapp-topo").style.backgroundImage = "linear-gradient("+ anguloSuperior +"deg,"+ corPrimSup +", "+ corSecSup +")";'+
                        'document.querySelector("#webapp-rodape").style.backgroundImage = "linear-gradient("+ anguloInferior +"deg,"+ corPrimInf +", "+ corSecInf +")";'+
                        'document.querySelector("#bt-menu").style = "color: "+ corFonte +"; border: 1px solid "+ corFonte +";";'+
                        'document.querySelectorAll("ul.menu > li > a").forEach(function(link){ link.style.color = corFonte; });'
                });
            }
        });
    });
}

export function sendScriptStatus(){
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(function(tab){
            if(tab.url.includes(urlWebapp)){
                var id = tab.id;
                chrome.tabs.executeScript(id, {
                    code:
                        'const status = $("div#status > div").html();'+
                        'const texto = status.substring(8, status.length -1);'+
                        'const cor = $("#bt-menu").css("color");'+
                        
                        '$("#webapp-topo > div > div.col-xs-8").append('+'<div style="text-align: center; box-sizing: border-box; border-radius: 0!important; display: inline-block; font-size: 12px; border: 1px solid '+cor+'; color: '+cor+'; padding: 5px 10px;">'+texto+'</div>'+');'+
                        '$(".ribbon.ribbon-clip.ribbon-color-warning.uppercase > i").css("color", "#FFFF00");'
                });
            }
        });
    });
}

/* ====================================== */



/* FUNÇÃO QUE PEGA URL DO WEBAPP */

export function catchWebappWindow(){
    var webapps = [];
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlWebapp)){
                webapps.push(id);
			}
		});
    });
    setTimeout(function(){
        if(webapps.length > 1){
            var webapp = webapps[webapps.length - 1];
            chrome.storage.local.set({'helpers_webapp': webapp});
        }else{
            var webapp = webapps[0];
            chrome.storage.local.set({'helpers_webapp': webapp});
        }
        webapps = [];
    }, 100);
}

export function catchWebappOpened(){
    var urls = [];
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			let url = tab.url;
			if(tab.url.includes(urlWebapp)){
                urls.push(url);
			}
		});
    });
    setTimeout(function(){
        if(urls.length > 1){
            var url = urls[urls.length - 1];
            chrome.storage.local.set({'helpers_webapp_url': url});
        }else{
            var url = urls[0];
            chrome.storage.local.set({'helpers_webapp_url': url});
        }
        urls = [];
    }, 100);
}

/* ====================================== */



/* FUNÇÃO QUE FECHA WEBAPP ABERTO PELO HELPERS */

export function closeWebapp(id){
    chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.id == id){
                chrome.tabs.remove(id);
			}
		});
    });
}

/* ====================================== */

/*
var texto = document.querySelector("div.portlet-body.form");
resultado = texto.replaceChild("Não", "Pão");
$(".ribbon-content[rel='Não'").html("");
*/