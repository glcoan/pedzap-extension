const contentWebAppQrCode = window.location.pathname.includes('/webapp/globais/home');

/* GERADOR QRCODE NA PÁGINA DO WEBAPP */
var color1 = document.querySelector("#webapp-topo").style.background;
var color2 = document.querySelector("#bt-menu").style.color;
if(color1.length > 20){
    var color1 = '#00BC69';
    var color2 = '#FFFFFF';
}
console.log(color1);
console.log(color2);

setTimeout(function(){
    document.querySelector("#balaoQrCode").style.visibility = 'visible';
}, 2100);

function modalQrCode() {
    document.querySelector("head").insertAdjacentHTML('beforeend',
        '<style> #balaoQrCode{ position: fixed; right: 10px; top: 100px; visibility: hidden;'+
        'animation-name: balao; animation-delay: 2s; animation-duration: 1.2s; animation-direction: alternative; box-shadow: 2px 2px 10px -3px #555; }'+
        '@keyframes balao{ 0% { right: -900px; top: 100px; } 80% { right: 15px; top: 100px; } 85% { right: 5px; top: 100px; }'+
        '90% { right: 12px; top: 100px; } 95% { right: 8px; top: 100px; } 100% { right: 10px; top: 100px; }}'+
        '.tooltiptext::after { content: ""; position: absolute; top: 38%; left: 100%; border-width: 5px;'+
        'border-style: solid; border-color: transparent transparent transparent #333; } </style>'
    );

    document.querySelector(".page-container").insertAdjacentHTML('beforeend',
        '<div id="balaoQrCode" class="pt-2 img-rounded" style="width: 90px; height: 115px; background-color: #FFF; padding: 2px 5px 5px 5px;">'+
            '<div>'+
                '<img src="'+document.querySelector("#logo > a > img").src+'" style="margin: 0px 0px 2px 2px; width: 20px;">'+
                '<button id="btnCloseQrCode" type="button" class="btn btn-link" style="margin: 0px 0px 2px 40px; padding: 2px; color: #4e4e4e;"><i class="fa fa-times"></i></button>'+
            '</div>'+
            '<div>'+
                '<button id="btnGeraQrCode" type="button" class="btn btn-info" style="width: 80px; height: 80px; padding-top: 33px; background-color: '+color1+'; border: none;">'+
                    '<a href="" style="color: '+color2+';" download="QrCode.png"><i class="fa fa-qrcode fa-5x"></i></a>'+
                '</button>'+
            '</div>'+
            '<span class="tooltiptext img-rounded" style="top: 148px; right: 100px; position: fixed; color: white; background-color: #333; padding: 3px; visibility: hidden;">'+
                'QrCode baixado com sucesso!<br>Clique <a id="editQrcode" href="#" style="color: #00f1aa;">aqui</a> para customizar'+
            '</span>'+
        '</div>'+
        '<div id="qrCodeGerado" hidden></div>'
    );
}

function geraQrcode() {
    var tagQrCode = document.getElementById("qrCodeGerado");
    var texto = window.location.protocol + "//" + window.location.hostname + "/";
    var logo = document.querySelector("#logo > img");

    if(logo){
        logo = logo.src.replace('_128', '')
        if(logo.includes('?cfc=')){
            logo = logo.slice(0, -13);
            console.log('TEM SETE CARACTERES!');
        }
        if(logo.slice(-1) != 'g'){
            logo = logo + 'g';
        }
    }
    console.log(logo);

    // Options
    var options = {
        text: texto,
        width: 600,
        height: 600,
        logo: logo,
        logoWidth: 270,
        logoHeight: 270,
        logoBackgroundTransparent: true,
        quietZone: 20,
        onRenderingEnd: () => {
            var canvas = document.querySelector('#qrCodeGerado > canvas');
            var dataURL = canvas.toDataURL();
        
            document.querySelector("#btnGeraQrCode > a").href = dataURL;
            console.log("Link injetado!");
        }
    };
    
    // Create QRCode Object
    new QRCode(tagQrCode, options);
}

modalQrCode();
//btnModalQrCode();
setTimeout(() => {
    geraQrcode();
}, 1000);


document.getElementById('btnCloseQrCode').addEventListener("click", function(){
    let id = null;
    //let id2 = null;
    const elem = document.getElementById('balaoQrCode');
    //const elem2 = document.getElementById('btnBalaoEscondido');
    document.querySelector(".tooltiptext").style.visibility = "hidden";
    let pos = 10;
    //let pos2 = -80;
    clearInterval(id);
    //clearInterval(id2);

    id = setInterval(frame, 1);
    function frame() {
        if (pos == 300) {
            clearInterval(id);
            elem.style.visibility = "hidden";
        } else {
            pos++;
            elem.style.right = "-" + pos + "px";
        }
    }
})

document.getElementById('btnGeraQrCode').addEventListener("click", function(){
    document.querySelector(".tooltiptext").style.visibility = "visible";
});

document.querySelector("#editQrcode").addEventListener('click', function(){
    chrome.runtime.sendMessage({mensagem: 'Ola'});
});