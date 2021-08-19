function editAnswers(){
	chrome.storage.local.remove('respostas');
	chrome.tabs.query({}, function(tabs){
		tabs.forEach(function(tab){
			if(tab.url.includes(urlEditarRespostas)){

				var id = tab.id;

				chrome.tabs.executeScript(id, {
					code: 'var id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundEditAnswer.js'});
				});
			}
		});

	});
}

function refreshAnswers(identificador){
	chrome.tabs.query({}, function(tabs){
		if(identificador == 'all_ind'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {
						code: 'var tipo = ' + 2
					}, function(){
						chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundRefreshAnswer.js'});
					});
				}
			});
		}else if(identificador == 'all_vin'){
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas)){
					var id = tab.id;
					chrome.tabs.executeScript(id, {
						code: 'var tipo = ' + 3
					}, function(){
						chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundRefreshAnswer.js'});
					});
				}
			});
		}else{
			tabs.forEach(function(tab){
				if(tab.url.includes(urlEditarRespostas) && tab.id == identificador){
					var id = tab.id;
					chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundRefreshAnswer.js'});
					setTimeout(function(){
						alert('Página atualizada com sucesso!');
					}, 1500);
				}
			});
		}
	});
}

function sendAnswers(){
	chrome.storage.local.get('respostas', function(data){
		var respostas = data.respostas;
		if(respostas){
			respostas.forEach(function(resposta){
				var id = resposta.tab_id;
				chrome.tabs.executeScript(id, {
					code: 'var tab_id = ' + id
				}, function(){
					chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundSendAnswer.js'});
				});
			});
		}else{
			console.log('Função sendAnswers falhou! Respostas indefinídas no storage.');
		}
	});
}

function saveAnswers(){
	chrome.storage.local.get('respostas', function(data){
		var respostas = data.respostas;
		if(respostas){
			respostas.forEach(function(resposta){
				var id = resposta.tab_id;
				chrome.tabs.executeScript(id, {file: 'answers/bg/backgroundSaveAnswer.js'});
			});
		}else{
			console.log('Função saveAnswers falhou! Respostas indefinídas no storage.');
		}
	});
}