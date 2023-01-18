const consoleDiv = document.querySelector("#console")
const app = document.querySelector("#app")


const landingConfig = {
    countryCode: "ES",
    langCode: "ES",
    langId: "-5"
}


let userAnswer = {
    gender: "",
    response: []
}


const answers = [
    {
        patterns: [ [0,0,0,0],[0,0,1,0],[1,0,1,0],[1,0,1,1] ],
        response: "trendsetter"
    },
    {
        patterns: [ [0,1,0,0], [0,1,1,1], [1,1,0,1], [1,1,1,1] ],
        response: "boho"
    },
    {
        patterns: [ [1,0,0,0], [1,1,1,0], [0,1,1,0], [1,1,0,0] ],
        response: "atrevido"
    },
    {
        patterns: [ [0,0,0,1], [1,0,0,1], [0,0,1,1], [0,1,0,1] ],
        response: "comfy"
    }
]


// -----------------------

// RESETEA EL ARRAY "RESPONSES" PARA EVITAR CONFLICTOS CON LAS RESPUESTAS
answers[0].patterns[0].map(function(){
    userAnswer.response.push(null)
})


async function loadTradus() {
    const url = './tradus.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function getTradu(langId) {
    try {
        let tradus = await loadTradus()

        if(tradus[langId]){
            return tradus[langId]
        }
    
        return tradus["-1"]
    } catch (error) {
        console.log(error);
    }
}


function templateLayout(data){
    return app.innerHTML = `
        <section class="slide__container slide__container--cover" id="slideCover">
            <div class="slide__media">
                <picture>
                    <img src="./assets/cover.jpg" alt="${data.txtSldSubtitle}" />
                </picture>
            </div>
            <div class="slide__content">
                <header>
                    <h1>${data.txtSldTitle}</h1>
                    <h2>${data.txtSldSubtitle}</h2>
                </header>

                <footer>
                    <p>${data.txtGenderSelect}</p>

                    <button class="btn__default" type="button" onclick="setGender(this);" id="genderWoman" value="woman">${data.genderWoman}</button>
                    <button class="btn__default" type="button" onclick="setGender(this);" id="genderMan" value="man">${data.genderMan}</button>
                </footer>
            </div>
        </section>

        <section class="questions__container" id="questions"> </section>

        <section class="slide__container slide__container--result" id="slideResult">
            <div class="slide__media">
                <picture>
                    <img src="./assets/result.jpg" alt="" />
                </picture>
            </div>
            <div class="slide__content">
                <header>
                    <h1>${data.txtResultDesc}</h1>
                    <h2>${data.txtResult1Name}</h2>
                </header>

                <main>
                    <h3>${data.txtResult1Desc01}</h3>
                    <p>${data.txtResult1Desc02}</p>
                </main>

                <footer>
                    <button class="btn__default" type="button" onclick="" id="productLink">${data.txtCtaResult}</button>
                </footer>
            </div>
        </section>
    `
}


function templateQuestions(data){
    const questionsContainer = document.querySelector("#questions")

    if(questionsContainer){
        answers[0].patterns[0].map(function(item,index){

            questionsContainer.innerHTML += `
            <section class="slide__container slide__container--question slide__container--question-${index}" id="slideQuestion${index}">
                <div class="slide__media">
                    <picture>
                        <img src="./assets/question-${index}.jpg" alt="" />
                    </picture>
                </div>
                
                <div class="slide__content">
                    <header>
                        <h1>${data["txtSlide"+index]}</h1>
                    </header>

                    <footer>
                        <button class="btn__default" type="button" onclick="setAnswer(this,${index});" value="0">${data["ctaSlide"+index+"Opt01"]}</button>

                        <button class="btn__default" type="button" onclick="setAnswer(this,${index});" value="1">${data["ctaSlide"+index+"Opt02"]}</button>
                    </footer>
                </div>
            </section>
            `
        }) 
    }
}


async function setTemplates(){
    try {
        let data = await getTradu(landingConfig.langId)

        console.log(data)

        templateLayout(data)
        templateQuestions(data)
    } catch (error) {
        console.log(error);
    }
}


function getResponse(){
    for(let answer of answers){
        //console.log(answer.response)
        for(let pattern of answer.patterns){
            //console.log(pattern)
            if(userAnswer.response.every((element, index) => element === pattern[index])){
                // console.log(pattern)
                //console.log(answer.response)
                return answer.response
            }
        }
    }
    return false
}


function setGender(elem){
    userAnswer.gender = elem.value
    consoleDiv.innerHTML = JSON.stringify(userAnswer)
}


function setAnswer(elem,index){
    userAnswer.response[index] = parseInt(elem.value)
    consoleDiv.innerHTML = JSON.stringify(userAnswer) + " - " + getResponse()
    
}


function nextSlide(){
    
}

setTemplates()