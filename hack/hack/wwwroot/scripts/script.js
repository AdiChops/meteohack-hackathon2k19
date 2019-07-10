
let questions;
let num = 0;
function customAlert(msg,callback) {
    // code to show your custom alert
    // in this case its just a console log
    console.log(msg);
    $('.choices').click(function () {
        $("#visual").show();
        $("#answer1").show();
        $("#multiAnswer").hide();
        $("#next").show()
        $("#btnNext").click(function(){
            $('.choices').off("click")
            $('#btnNext').off("click")
            callback(msg);
        })
      });

    // do callback when ready
    
}
let loopQuestions = function(arr){
    console.log(num)
    $(".answer").hide();
    document.querySelector("#question").innerHTML = `<p>${arr[num]["question"]}</p>`;
    switch(arr[num]["question_type"]){
        case "M":
            document.querySelector('#multiAnswer').style.display="block";
            let answers = arr[num]["answers"];
            console.log(answers);
            answers = shuffle(answers);
            console.log(answers);
            for (a = 0 ; a<answers.length; a++){
                document.querySelector("#choice"+a).innerHTML = answers[a]
            }
            break;
        case "S":
            $("#shortAns").show();
            break;
        case "T":
            $("#trueFalse").show();
            break;
        }
        if (num<arr.length){
            customAlert(arr,loopQuestions)
        }
        
    num ++;
}

let shuffle = function (myArray) {
    for (let i = myArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = myArray[j];
        myArray[j] = myArray[i];
        myArray[i] = temp;
    }
    return myArray;
};
fetch("./data/sample_questions.json")
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        questions = shuffle(data["questions"]);
        loopQuestions(questions)
        
    });

    