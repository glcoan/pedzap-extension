var tagQrCode = document.getElementById("qrcode");
var logo;

function geraQrcode() {
    var texto = document.getElementById("texto").value;
    var qrcode_size = document.getElementById("qrcode-size").value;
    var logo_size = document.getElementById("logo-size").value;
    
    if(texto === ""){
        confirm('Coloque um texto ou link para gerar o QrCode!');
        return;
    }

    tagQrCode.innerHTML = "";

    // Options
    var options = {
        text: texto,
        width: parseInt(qrcode_size),
        height: parseInt(qrcode_size),
        logo: logo,
        logoWidth: logo_size,
        logoHeight: logo_size,
        logoBackgroundTransparent: true,
        quietZone: 20,
        onRenderingEnd: () => {
            var canvas = document.querySelector('#qrcode > canvas');
            var dataURL = canvas.toDataURL();

            document.getElementById("qrcode").href = dataURL;

            $('#qrcode').tooltip({ boundary: 'window' });
        }
    };
    
    // Create QRCode Object
    new QRCode(tagQrCode, options);
}

$('#btnGerar').click(function(){
    $('#canvaBranco').hide();
    document.querySelector(".tooltiptext").style.visibility = "visible";

    if(document.getElementById('formFile').files.length === 0){
        logo = "";
        geraQrcode();
    }else{
        logo = URL.createObjectURL(document.getElementById('formFile').files[0]);
        geraQrcode();
    }
});

$('#button-addon2').click(function(){
    $("#formFile").val("");
});