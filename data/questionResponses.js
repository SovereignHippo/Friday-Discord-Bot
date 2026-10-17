let questionResponses = [
    //Positive
    "It is certain, sir.",
    "It is decidedly so, sir.",
    "Without a doubt, sir.",
    "Yes most definitely, sir.",
    "You may rely on it, sir.",
    "As I see it, yes, sir.",
    "Most likely, sir.",
    "Outlook is good sir.",
    "Yes, sir.",
    "Signs point to yes, sir.",
    //Non-committal
    "Reply is hazy, please try again, sir.",
    "Please ask again later, sir.",
    "I'm afraid it is better not tell you now, sir.",
    "Sorry sir, I cannot predict that right now.",
    "Please concentrate and ask again, sir.",
    //Negative
    "I wouldn't count on it, sir.",
    "My reply is no, sir.",
    "According to my sources; no, sir.",
    "Outlook is not so good, sir.",
    "I am very doubtful, sir."

];

export function GenerateRandomQuestionResponse(){
    let randomInt = Math.floor(Math.random() * questionResponses.length);

    return questionResponses[randomInt];
}