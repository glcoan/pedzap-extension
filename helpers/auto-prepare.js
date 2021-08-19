var tipo = document.querySelector("#form > div:nth-child(4) > div.portlet-body > div:nth-child(1) > div > div > div").innerText;

if(tipo == " Painel"){
    document.querySelector("#ped_status").selectedIndex = 5;
    setTimeout(function(){
        document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(1)").click();
    }, 3000);
}else if(tipo == " Menu digital"){
    document.querySelector("#ped_status").selectedIndex = 5;
    document.querySelector("#ped_notificar").selectedIndex = 1;
    setTimeout(function(){
        document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(1)").click();
    }, 3000);
}else{
    document.querySelector("#ped_status").selectedIndex = 5;
    document.querySelector("#ped_notificar").selectedIndex = 2;
    setTimeout(function(){
        document.querySelector("#botoes-flutuantes > div > div > div.hidden-xs > button:nth-child(1)").click();
    }, 3000);
}