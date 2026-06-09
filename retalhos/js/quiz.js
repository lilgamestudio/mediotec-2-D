// Motor de Quiz - Fashion Trace
function answerQuiz(correct, currentNPC, unlocks = [], redirectUrl = null) {
    // Toca o som se a função existir no teu game.js
    if (typeof playSound === "function") {
        playSound(correct ? 'success' : 'error');
    }

    if (correct) {
        // Guarda o progresso no localStorage
        if (typeof unlockNPCs === "function") unlockNPCs(unlocks);
        if (typeof completeNPC === "function") completeNPC(currentNPC);
        
        // Adiciona os Eco-Tokens
        if (typeof addEcoTokens === "function") {
            addEcoTokens(100); 
        }

        alert("🏆 Resposta correta! Avanço registado.");

        // Define o destino: se for Boss vai para o minijogo, se não volta para o index
        const destination = redirectUrl ? redirectUrl : "../index.html";

        // Usa a transição suave que tens no teu game.js
        if (typeof smoothNavigate === "function") {
            smoothNavigate(destination);
        } else {
            window.location.href = destination;
        }
        return true;
    }

    alert("❌ Resposta incorreta. Tenta novamente!");
    return false;
}
