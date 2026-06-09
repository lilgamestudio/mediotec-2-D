// Motor de Quiz - Fashion Trace (Suporte a NPCs normais e Bosses com Minijogos)
function answerQuiz(correct, currentNPC, unlocks = [], redirectUrl = null) {
    // 1. Toca o som correspondente se a função playSound existir no seu game.js
    if (typeof playSound === "function") {
        playSound(correct ? 'success' : 'error');
    }

    if (correct) {
        // 2. Guarda o progresso nas funções globais do game.js
        if (typeof unlockNPCs === "function") unlockNPCs(unlocks);
        if (typeof completeNPC === "function") completeNPC(currentNPC);
        
        // Atribui pontos se a função existir
        if (typeof addEcoTokens === "function") {
            addEcoTokens(100); 
        }

        alert("🏆 Resposta correta! Sistema atualizado.");

        // 3. Define o destino: Se houver URL de minijogo vai para lá, se não volta para o index.html
        // Como os NPCs estão dentro da pasta '/npcs', para voltar à raiz usamos '../index.html'
        const destination = redirectUrl ? redirectUrl : "../index.html";

        // 4. Executa a transição suave se ela existir no seu game.js, caso contrário usa navegação direta
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
