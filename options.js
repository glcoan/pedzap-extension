// Salva as configurações
$('#btnSalvarConfig').click(function() {

    // Mostra o alerta de config salva
    document.getElementById('alertSave').classList.remove('alertSave');
    document.getElementById('alertSave').classList.add('alertSaveShow');

    setTimeout(() => {
        document.getElementById('alertSave').classList.remove('alertSaveShow');
        document.getElementById('alertSave').classList.add('alertSaveHide');
    }, 5000);

    // Tema padrão
    if($('#tema-claro').is(":checked")){
        chrome.storage.local.set({'theme': "light"});
    }
    if($('#tema-escuro').is(":checked")){
        chrome.storage.local.set({'theme': "dark"});
    }
})

// Seleciona a opção referente ao tema salvo
chrome.storage.local.get('theme', function(data){
    if(data.theme === "light"){
        $('#tema-claro').prop('checked', true);
    }
    if(data.theme === "dark"){
        $('#tema-escuro').prop('checked', true);
    }
});