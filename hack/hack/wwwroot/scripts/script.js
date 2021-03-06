
let questions;
let num = 0;
function customAlert(msg,callback) {
    // code to show your custom alert
    // in this case its just a console log
    
    $("iframe").hide()
    $("#desc").text("");
    if ("map" ==msg[num]["media"]){
        $("#map").show();
    }
    if(msg[num]["question_type"] != "S"){
        $('.choices').click(function () {
            $("#map").hide();
            if("chart" ==msg[num-1]["media"]){
                $("#chart").show();
            }
            console.log(num)
            if ($(this).text() ==msg[num-1]["correct"]){
                document.querySelector("#question").innerHTML = `<p>Correct!</p>`;
            }
            else{
                document.querySelector("#question").innerHTML = `<p>Incorrect!</p>`;
            }
            $("#visual").addClass('animated');
            $("#visual").addClass('flip');
            $("#visual").css("padding-bottom", "inherit");
            $("#visual").css("background-image", "none");
            $("#answer1").show();
            $(".answer").hide();
            $("#desc").text(msg[num-1]["description"]);

            $("#next").show()
           
            $("#btnNext").click(function(){
                $('.choices').off("click")
                $('#btnNext').off("click")
                $("#visual").removeClass('animated');
                $("#visual").removeClass('flip');
                callback(msg);
            })

           
          });
    }
    else{
        $('#submit').click(function () {
            $("#map").hide();
            if("chart" ==msg[num-1]["media"]){
                $("#chart").show();
            }
            if ($("#ans").val().toLowerCase() ==msg[num-1]["correct"].toString().toLowerCase()){
                document.querySelector("#question").innerHTML = `<p>Correct!</p>`;
            }
            else{
                document.querySelector("#question").innerHTML = `<p>Incorrect!</p>`;
            }
            $("#visual").addClass('animated');
            $("#visual").addClass('flip');
            $("#visual").css("padding-bottom", "inherit");
            $("#visual").css("background-image", "none");
            $("#answer1").show();
            $(".answer").hide();
            $("#next").show()
           
            $("#btnNext").click(function(){
                $('.choices').off("click");
                $('#btnNext').off("click");
                $("#visual").removeClass('animated');
                $("#visual").removeClass('flip');
                callback(msg);
            })
        });
    }
    

    // do callback when ready
    
}
let loopQuestions = function(arr){
    
    
    console.log(num)
    if (num<arr.length){
        if ("map" !=arr[num]["media"]){
            let image = './images/canada.png';
            $("#visual").css("padding-bottom", "30%");
            $("#visual").css("background-image", 'url("' + image + '")');
        }
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
        
            customAlert(arr,loopQuestions)
            console.log(33)
            num ++;
        }
        else{
            window.location="./endState.html";
        }

        
   
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

    
