var tipoPreco = document.getElementById("ite_tipo_preco").value;
if(typeof tipo == "undefined"){
    window.location.reload();
}else{
    if(tipo == tipoPreco){
        window.location.reload();
    }
}