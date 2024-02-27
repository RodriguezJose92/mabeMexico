/** Server response */
let dataServer;

async function conectServer(skuNumber){

    const myBody = {
        "skus":[skuNumber]
    };

    try {

        /** We make the request to the MUDI server */
        const 
        request = await fetch('https://mudiview.mudi.com.co:7443/product/getProductsUrl',{
            method:'POST',
            headers:{   "Content-type":"application/json",
                        "tokenapi":"fUJzZmH4AteszjZEnYG7"
            },
            body: JSON.stringify(myBody)
        })
        const 
        response = await request.json();
        dataServer=response.data[0];   

    } catch (error) {console.error(`Mudi Error:\n${error}`)}
    
    return dataServer;
};

function createStyles(){
    const link = document.createElement('LINK');
    link.setAttribute('rel','stylesheet');
    link.id="stylesMudiGeneral";
    link.href=`https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeMexico@latest/index.css`; /* Pueden tomarlos de esta ruta */
   
    document.head.appendChild(link)
};

function createButon(father){

    /** We create a container for the 3D button */
    const 
    container       = document.createElement('DIV');
    container.id    =`containerBtnsMudi`;
    container.classList.add(`ContainerBtnsMudi`);

        /* We create an informative poster */
        const 
        tooltip     = document.createElement('P');
        tooltip.id  = `tooltipMudi` ;
        tooltip.classList.add(`mudiTooltip`);
        tooltip.innerHTML=`<p class="paragraphMudi"><b class="newMudi">¡Nuevo!</b><br> Descubre como se ve este producto en <b>3D y realidad aumentada</b> en tu espacio</p>`;
    
        /** The 3D botton is an image */
        const 
        button3D    = document.createElement('IMG');
        button3D.id = `btn3DProdId`;
        button3D.src= `https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeMexico@latest/btn3D.png`;
        button3D.classList.add(`btnMudi3D`);
        button3D.addEventListener('click',createModal,false)

    /** Add tooltip and 3D buttton to "container" */
    container.appendChild(tooltip);
    container.appendChild(button3D);

    /** Add container to DOM */
    father.appendChild(container);

};

function createModal(){

    /** We create a shell for the MUDI modal */
    const 
    modalMudi = document.createElement('DIV');
    modalMudi.id=`modalMudi`;
    modalMudi.classList.add(`mudiModal`);
    modalMudi.innerHTML=`
        <div class="iframeMudi3D">
            <button class="closeModalMudi">X</button>
            <iframe class="modelMudi" src="${dataServer.URL_WEB}"></iframe>
            <img id='btnVerEnMiEspacioId' class="btnMudiAR" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeMexico@latest/btnAR.png"/>
        </div>
    `;

    /** We close the MUDI modal*/
    modalMudi.querySelector(`.closeModalMudi`).addEventListener('click',()=>{
        document.body.querySelector('#modalMudi').remove();
    });

    /** Init ARExperience */
    modalMudi.querySelector(`#btnVerEnMiEspacioId`).addEventListener('click',()=>{
        if(window.innerWidth>1000) initARDESK();
        else window.open(`${dataServer.URL_AR}`,"_BLANK")
    });

    document.body.appendChild(modalMudi)

};

function initARDESK(){
    const 
    modalMudi = document.createElement('DIV');
    modalMudi.id=`containerQR`;
    modalMudi.classList.add(`containerQRMudi`);
    modalMudi.innerHTML=`
        <img class="mudiQR" src="${dataServer.URL_QR}" >

        <div>
            <div>
                <h4>ESCANÉAME PARA <br><b>VER EN TU ESPACIO</b></h4>
                <hr>
            </div>

            <div>
                <div>
                    <img src="">
                </div>
                <p>Apunta el teléfono al piso.</p>
            </div>

            <div>
                <div>
                    <img src="">
                </div>
                <p>Desplaza para visualizar.</p>
            </div>

            <div>
                <div>
                    <img src="">
                </div>
                <p>Amplia y detalla el producto.</p>
            </div>

            <div>
                <div>
                    <img src="">
                </div>
                <p>Toca dos veces para restablecer.</p>
            </div>

        </div>

    `;
};

async function mudiExperience({skuNumber,fatherContainer}){

    const 
    dataServer = await conectServer(skuNumber);
    console.log(dataServer)
    
    if(!dataServer){
        console.warn(`El SKU ${skuNumber} No posee experiencias de 3D y realidad aumentada`)
        return;
    };

    createStyles();
    createButon( fatherContainer );
    
}

mudiExperience({
    skuNumber:"WEM7643CSIS0_MabeMex",
    fatherContainer: document.body.querySelector(`.owl-wrapper-outer`)
})