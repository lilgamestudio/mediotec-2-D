function answerQuiz(
    correct,
    currentNPC,
    unlocks = []
){

    if(correct){

        unlockNPCs(unlocks);

        completeNPC(currentNPC);

        alert(
            "Resposta correta!"
        );

        return true;
    }

    alert(
        "Resposta incorreta."
    );

    return false;
}
