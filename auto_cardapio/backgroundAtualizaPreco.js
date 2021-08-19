var selectPreco = document.getElementById("pre_id");

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