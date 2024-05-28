//////////////////////////////////////////////////
////////////////// ADVERTENCIA ///////////////////

//ESTOS SCRIPTS *NO* SON PARA EL USO DIRECTO DE LOS COMPONENTES
//SON SOLO UNA GUÍA VISUAL DE LO QUE SE VAYA A IMPLEMENTAR
//Y QUIZÁS PARA LA LÓGICA

try {
    //Script para modales ejectudados desde un botón
    const modal = document.querySelector(".modal");
    const btn = document.querySelectorAll(".BtnModal");    
    const closebtn = document.querySelectorAll(".close");

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", ()=>{
            modal.style.display = "block";
        })
    }

    for (let j = 0; j < closebtn.length; j++) {
        closebtn[j].addEventListener("click", ()=>{
            modal.style.display = "none";
        })
    }
    
} catch (error) {
    
}

try {
    //script simple para desplegar dropdown sin captura
    const dropDown = document.querySelectorAll('.dropdown')
    const itemLink = document.querySelectorAll('.dropdown-item')

    for (let i = 0; i < dropDown.length; i++) {
        dropDown[i].addEventListener("click", function() {
            dropDown[i].nextElementSibling.classList.toggle("d-block")
            dropDown[i].classList.toggle("active")
        })
    }

    for (let i = 0; i < dropDown.length; i++) {
        dropDown[i].addEventListener("keydown", (e) => {
            if (e.keyCode == 32){
                e.preventDefault()
                dropDown[i].nextElementSibling.classList.toggle("d-block")
                dropDown[i].classList.toggle("active")
            }
        })
    }

    for (let j = 0; j < itemLink.length; j++) {
        itemLink[j].addEventListener("click", function() {
            let content = itemLink[j].textContent.trim()
            contentTarget = itemLink[j].parentElement.previousElementSibling.childNodes[3]
            contentTarget.innerText = content
            itemLink[j].parentElement.classList.remove('d-block')
        })
    }

} catch (error) {
    
}

try {
    //script para el dropdown de los botones en resultados de búsqueda
    const btndropDown = document.querySelectorAll('.btn-result')

    for (let i = 0; i < btndropDown.length; i++) {
        btndropDown[i].addEventListener("click", function() {
            btndropDown[i].nextElementSibling.classList.toggle("d-block")
        })
    }

} catch (error) {
    
}


// Calificar resultados
try {
    const rateStars = document.querySelectorAll('.rate-star')

    for (let i = 0; i < rateStars.length; i++){
        rateStars[i].setAttribute('data-pos', i + 1)
        //
        rateStars[i].addEventListener('click', (e) => {
            e.preventDefault()
            for (j = 0; j < rateStars.length; j++){
                rateStars[j].classList.remove('checked')
            }
            let pos = rateStars[i].getAttribute('data-pos')        
            onStars(pos)
        })
    }

    function onStars(pos){
        for(let a = 0; a < pos; a++){        
            rateStars[a].classList.add('checked')
        }
    }
} catch (error) {
    console.log(error)
}

try {
    //Menú vertical
    const btnMenu = document.querySelector('.btn-menu')
    const listMenu = document.querySelector('.list-menu')

    for (let i = 0; i < btnMenu.length; i++) {
        btnMenu[i].addEventListener("click", function() {
            btnMenu[i].classList.toggle("close")
        })
    }
    for (let i = 0; i < btnMenu.length; i++) {
        btnMenu[i].addEventListener("click", function() {
            listMenu[i].parentElement.classList.toggle('backdrop')
            listMenu[i].classList.toggle("d-block")
        })
    }
    

} catch (error) {
    
}
