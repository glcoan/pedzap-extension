/* FUNCÕES PARA EXECUÇÃO DO HELPER (PARTE LÓGICA) */

function verifyLoading(status, deelivButtons, qtde){
    let c = 0;
    let loadingFinished = true;
    document.querySelectorAll("a[href*='set_status']").forEach((btn)=>{
        if(btn.classList == deelivButtons[c].classList && btn.classList.contains(status) != true){
            loadingFinished = false;
            c++;
        }
    });
    if(loadingFinished){
        setTimeout(()=>{
            changeStatus(status);
        }, qtde * 100)
    }else{
        setTimeout(()=>{
            verifyLoading(status, deelivButtons);
        }, qtde * 100)
    }
}

function changeStatus(status){
    document.getElementById("btn_status_1") ? document.getElementById("btn_status_1").classList.add("disabled") : '';
    document.getElementById("btn_status_2") ? document.getElementById("btn_status_2").classList.add("disabled") : '';
    document.getElementById("btn_status_3") ? document.getElementById("btn_status_3").classList.add("disabled") : '';
    document.getElementById("btn_status_4") ? document.getElementById("btn_status_4").classList.add("disabled") : '';

    let deelivButtons = document.querySelectorAll("a[href*='set_status']");
    let allButtonsDone = true;
    deelivButtons.forEach((btn)=>{
        if(btn.classList.contains(status) == false){
            allButtonsDone = false;
            btn.click();
        }
    });

    if(allButtonsDone == false){
        verifyLoading(status, deelivButtons, deelivButtons.length);
    }else{
        document.getElementById("btn_status_1") ? document.getElementById("btn_status_1").classList.remove("disabled") : '';
        document.getElementById("btn_status_2") ? document.getElementById("btn_status_2").classList.remove("disabled") : '';
        document.getElementById("btn_status_3") ? document.getElementById("btn_status_3").classList.remove("disabled") : '';
        document.getElementById("btn_status_4") ? document.getElementById("btn_status_4").classList.remove("disabled") : '';
        swal({
            title: 'Sucesso',
            text: 'Todos os registros tiveram seu status atualizado com sucesso.',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }
}

/* ====================================== */



/* CRIA OS BOTÕES, ADICIONA-OS NA TABELA E DEFINE OS EVENTOS DE CLIQUE */

const listItems = window.location.pathname.includes('/itens/index');
const listModels = window.location.pathname.includes('/modelos/index');
const listAnswers = window.location.pathname.includes('/respostas/index');

let btn_status_1 = '<a class="btn green-jungle btn-icon-only" id="btn_status_1"><i class="fa fa-check-circle"></i></a>';
let btn_status_2 = '<a class="btn blue btn-icon-only" id="btn_status_2"><i class="fa fa-check-circle"></i></a>';
let btn_status_3 = '<a class="btn grey-steel btn-icon-only" id="btn_status_3"><i class="fa fa-check-circle"></i></a>';
let btn_status_4 = '<a class="btn red-thunderbird btn-icon-only" id="btn_status_4"><i class="fa fa-check-circle"></i></a>';

if(listModels){
    document.querySelector("#datatable_ajax > thead > tr > th:last-child").insertAdjacentHTML("afterbegin", '<div style="width: 112px; margin-left: -8px;">'+btn_status_1+btn_status_2+btn_status_3+'</div>');
}else{
    document.querySelector("#datatable_ajax > thead > tr > th:last-child").insertAdjacentHTML("afterbegin", '<div style="width: 151px; margin-left: -8px;">'+btn_status_1+btn_status_2+btn_status_3+btn_status_4+'</div>');
}

document.querySelector("#btn_status_1").addEventListener("click", ()=>{
    let ativo = "green-jungle";
    if(confirm("Confirme para definir todos como ATIVOS:")){
        changeStatus(ativo);
    }
});

document.querySelector("#btn_status_2").addEventListener("click", ()=>{
    let suspenso = "blue";
    if(confirm("Confirme para definir todos como SUSPENSOS:")){
        changeStatus(suspenso);
    }
});

document.querySelector("#btn_status_3").addEventListener("click", ()=>{
    let desativado = "grey-steel";
    if(confirm("Confirme para definir todos como DESATIVADOS:")){
        changeStatus(desativado);
    }
});

if(listItems){
    document.querySelector("#btn_status_4").addEventListener("click", ()=>{
        let bloqueado = "red-thunderbird";
        if(confirm("Confirme para definir todos como BLOQUEADOS:")){
            changeStatus(bloqueado);
        }
    });
}
if(listAnswers){
    document.querySelector("#btn_status_4").classList.add("disabled");
}

/* ====================================== */