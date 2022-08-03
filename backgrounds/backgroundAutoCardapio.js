import {urlEditarRespostas} from "../background.js";

export function updatePrice(index) {
	chrome.tabs.query({},function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarRespostas)){
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: (indexPreco)=>{
						let selectPreco = document.getElementById("pre_id");

						if(indexPreco > selectPreco.length){
							alert("Não existe o INDEX: "+ indexPreco+ " existe apenas "+ selectPreco.length+ " INDEX")
						}else{
							Array.from(document.querySelector("#pre_id").options).forEach(function(element, index) {
								if(index === Number(indexPreco)){
									selectPreco.value = element.value;
									selectPreco.dispatchEvent( new Event('change'));
									document.getElementById("form").submit();
								}
							});
						}
					},
					args: [index]
				});

				setTimeout(function(){
					chrome.tabs.remove(id);
				},5000);
			}
		});
	});
}

export function updateModel(index) {
	chrome.tabs.query({},function(tabs){
		tabs.forEach(function(tab){
			let id = tab.id;
			if(tab.url.includes(urlEditarRespostas)){
				chrome.scripting.executeScript( {
					target: {tabId: id},
					func: (indexModelo)=>{
						let selectModelo = document.getElementById("mod_id");

						if(indexModelo > selectModelo.length){
							alert("Não existe o INDEX: "+ indexModelo+ " existe apenas "+ selectModelo.length+ " INDEX")
						}else{
							Array.from(document.querySelector("#mod_id").options).forEach(function(element, index) {
								if(index === Number(indexModelo)){
									selectModelo.value = element.value;
									selectModelo.dispatchEvent( new Event('change'));
								}
							});
						}
					},
					args: [index]
				});

				index++
			}
		});
	});
}