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


function randomInt(maxNumber){
    return Math.floor(Math.random() * maxNumber);
}


function templateLayout(data){
    const randomPortrait = randomInt(10)
    const randomBackground = randomInt(4)

    return app.innerHTML = `
        <section class="slide__container slide__container--cover" id="slideCover">
            <article class="slide__cover slide__cover--${randomBackground}">
                <picture class="cover__picture">
                    <img src="./assets/cover-face-${randomPortrait}.jpg" alt="${data.txtSldSubtitle}" />
                </picture>
            </article>

            <article class="slide__content">
                <div class="content__wrapper">
                    <header class="content__header">
                        <h1 class="content__title">${data.txtSldTitle}</h1>
                    </header>

                    <main class="content__body">
                        <p class="element__paragraph element__paragraph--large">${data.txtSldSubtitle}</p>
                    </main>

                    <footer class="content__footer">
                        <button class="btn__default" type="button" onclick="startQuiz(this);" id="startQuiz" value="start">
                            <span class="btn__content">${data.ctaStart}</span>
                        </button>
                    </footer>
                </div>
            </article>
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
        questionsContainer.innerHTML += `
            <section class="slide__container slide__container--question slide__container--question-0" id="slideQuestion0">
                <article class="question__media">
                    <picture class="question__cover">
                        <img src="./assets/slide-0.jpg" alt="" />
                    </picture>
                </article>
                
                <article class="question__content">
                    <div class="content__wrapper">
                        <header class="question__header">
                            <h1 class="content__title">${data.txtSlide0}</h1>
                        </header>

                        <footer class="question__footer">
                            <button class="btn__default" type="button" onclick="setGender(this);" id="genderWoman" value="woman">
                                <span class="btn__content">${data.ctaSlide0Opt02}</span>
                            </button>

                            <button class="btn__default" type="button" onclick="setGender(this);" id="genderMan" value="man">
                                <span class="btn__content">${data.ctaSlide0Opt01}</span>
                            </button>
                        </footer>
                    </div>
                </article>
            </section>
            `

        answers[0].patterns[0].map(function(item, index){
            index = index + 1

            questionsContainer.innerHTML += `
            <section class="slide__container slide__container--question slide__container--question-${index}" id="slideQuestion${index}">
                <article class="question__media">
                    <picture class="question__cover">
                        <img src="./assets/slide-${index}.jpg" alt="" />
                    </picture>
                </article>
                
                <article class="question__content">
                    <div class="content__wrapper">
                        <header class="question__header">
                            <h1 class="content__title">${data["txtSlide"+index]}</h1>
                        </header>

                        <footer class="question__footer">
                            <button class="btn__default" type="button" onclick="setAnswer(this,${index});" value="0">
                                <span class="btn__content">
                                    ${data["ctaSlide"+index+"Opt01"]}
                                </span>
                            </button>

                            <button class="btn__default" type="button" onclick="setAnswer(this,${index});" value="1">
                                <span class="btn__content">
                                    ${data["ctaSlide"+index+"Opt02"]}
                                </span>
                            </button>
                        </footer>
                    </div>
                </article>
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
        // console.log(answer.response)
        for(let pattern of answer.patterns){
            // console.log(pattern)
            if(userAnswer.response.every((element, index) => element === pattern[index])){
                // console.log(pattern)
                // console.log(answer.response)
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