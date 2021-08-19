var selectModelo = document.getElementById("mod_id");

if(indexModelo > selectModelo.length){
	alert("Não existe o INDEX: "+ indexModelo+ " existe apenas "+ selectModelo.length+ " INDEX")
}else{
	Array.from(document.querySelector("#mod_id").options).forEach(function(element, index) {
		if(index === Number(indexModelo)){
			selectModelo.value = element.value;
			selectModelo.dispatchEvent( new Event('change'));
			// document.getElementById("form").submit();
		}
	});
}