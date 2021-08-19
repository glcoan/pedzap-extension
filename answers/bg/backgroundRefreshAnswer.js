var tipoResposta = document.getElementById("res_tipo").selectedIndex;
if(typeof tipo == "undefined"){
    window.location.reload();
}else{
    if(tipo == tipoResposta){
        window.location.reload();
    }
}