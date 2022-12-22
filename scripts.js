const landingConfig = {
    countryCode: "ES",
    langCode: "ES"
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


let userAnswer = {
    gender: "",
    response: []
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
    console.log(userAnswer)
}


function nextSlide(){
    
}
