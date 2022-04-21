// ---------- CONTEXT MENUS ----------

chrome.contextMenus.create({
	"id": "mult",
	"title": "Abrir múltiplas vezes",
	"contexts": ["link"]
});

/*chrome.contextMenus.create({
	"id": "open_all_edit",
	"title": "Abrir todos os botões editar",
	"contexts": ["page"]
});*/

chrome.contextMenus.onClicked.addListener(function(clickData, page){

	// ABRE O LINK MULTIPLAS VEZES
	if(clickData.menuItemId == "mult" && clickData.linkUrl){
		var mult = prompt("Quantas abas deseja abrir?", "1");
		var mult = parseInt(mult);
		if(Number.isInteger(mult)){
			for(var i = 1; i <= mult; i++){
				setTimeout(function(){
					window.open(clickData.linkUrl);
				}, 200 * i);
			}
		}else{
			alert('Operação cancelada!')
		}
	}

	// ABRE TODOS OS LINKS PARA EDITAR DA PAGINA -- INCOMPLETO
	if(clickData.menuItemId == "open_all_edit"){
		console.log(page);

		Array.from(document.querySelectorAll("[data-original-title='Editar'")).forEach(function(element, index){
			console.log(element.getAttribute("href"));
			setTimeout(function(){
				window.open(element.getAttribute("href"));
			}, 200 * (index + 1));
		});
	}
});