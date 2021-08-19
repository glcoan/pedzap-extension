console.log("popup.js");
// Clique no botão alterar
document.getElementById("alterar").addEventListener("click", function(){

	const indexModelo 		= document.getElementsByName('indexModelo');
	const indexModeloCheck 	= document.getElementsByName('indexModeloCheck');
	const indexPreco 		= document.getElementsByName('indexPreco');
	const indexPrecoCheck 	= document.getElementsByName('indexPrecoCheck');

	if (confirm("Deseja mesmo fazer essa alteração?")) {

		// valida se não teve nenhum selecionado
		if(!indexPrecoCheck[0].checked && !indexModeloCheck[0].checked) { alert("Você precisa selecionar pelo menos um index para alterar"); return false }

		/**
		 * Atualiza modelo
		 */
		if(indexModeloCheck[0].checked) {
			if (indexModelo[0].value.length === 0) { alert("Você esqueceu de selecionar o início do modelo"); return false}

			chrome.extension.getBackgroundPage().backgroundAtualizaModelo({
				indexModelo: indexModelo[0].value,
				// indexModelo: indexModelo[0].value,
			});
		}

		/**
		 * Atualiza só preços
		 * Tem um timeout de 1 segundo para dar tempo de carregar os preços do modelo que é carregado via ajax pelo painel.
		 */
		setTimeout(function(){
			if(indexPrecoCheck[0].checked) {
				if (indexPreco[0].value.length === 0) {alert("Você esqueceu de selecionar o index do preço"); return false}

				chrome.extension.getBackgroundPage().backgroundAtualizaPreco({
					indexPreco: indexPreco[0].value
				});
			}
		},3000);

	}
});