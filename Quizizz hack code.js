// Here is the function to parse the json object. 
// It returns object with key/value pair where key is the question and value is the answer
function parseFile (fileObject) {
    let allAnswers = {}

    for (question of fileObject.data.quiz.info.questions) {
        let answer;
        if (question.type === "MCQ") {
            if (question.structure.options[question.structure.answer].text == "") {
                answer = question.structure.options[question.structure.answer].media[0].url;
            } else {
                answer = question.structure.options[question.structure.answer].text.replace("<p>", "").replace("</p>", "");
            }
        } else if (question.type == "MSQ") {
            answer = []
            for (answerC in question["structure"]["answer"]) {
                if (question.structure.options[answerC].text == "") {
                    answer.push(question.structure.options[answerC].media[0].url);
                } else {
                    answer.push(question.structure.options[answerC].text.replace("<p>", "").replace("</p>", ""));
                }
            }
        }
    
        questionStr = question.structure.query.text.replace('"', '\\"').replace("<p>", "").replace("</p>", "").replace("<strong>", "").replace("</strong>", "");
        allAnswers[questionStr] = answer;
    
    }
    return allAnswers;
}
