let shuffle = function (myArray) {
    for (let i = myArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = myArray[j];
        myArray[j] = myArray[i];
        myArray[i] = temp;
    }
    return myArray;
};
fetch("../data/sample_questions.json")
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        let questions = shuffle(data["questions"]);
        for (let i of questions) {
            document.querySelector("#question").innerHTML = `<p>${i["question"]}</p>`;
            if (i["question_type"] == "M") {
                let answers = i["answers"];
                console.log(answers);
                answers = shuffle(answers);
                console.log(answers);
            }
        }
    });