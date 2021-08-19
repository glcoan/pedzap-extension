var botoesRemovePreco = Array.from(document.querySelectorAll("[data-repeater-delete]"));
// Remove o primeiro registro do array, pois é um campo "escondido" na página de edição de modelos
botoesRemovePreco.shift();

var ultimo = botoesRemovePreco[botoesRemovePreco.length - 1];
if(ultimo){
    ultimo.click();
}