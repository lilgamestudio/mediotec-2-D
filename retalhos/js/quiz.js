// Avaliação Reativa do Quiz (Suporta Redirecionamento para Minijogos/Bosses)
function handleQuizAnswer(buttonElement, isCorrect, currentNPC, unlocks = [], redirectUrl = null) {
    // Desativa todos os botões temporariamente para evitar cliques duplos
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        playSound('success');
        buttonElement.classList.add('correct-choice');
        
        // Atribui pontos/moedas se for a primeira vez que completa
        if (!isCompleted(currentNPC)) {
            addEcoTokens(100); // Bosses podem dar mais pontos!
            unlockNPCs(unlocks);
            completeNPC(currentNPC);
            showToast("🏆 BOSS SUPERADO! +100 Eco-Tokens obtidos.", "success");
        } else {
            showToast("✓ Boss rejogado com sucesso!", "success");
        }

        // Aguarda a animação e faz a transição suave
        setTimeout(() => {
            // Se houver uma página especial (minigame), vai para lá. Se não, volta ao index.
            const destination = redirectUrl ? redirectUrl : "../index.html";
            smoothNavigate(destination);
        }, 2000);

    } else {
        playSound('error');
        buttonElement.classList.add('wrong-choice');
        showToast("❌ Resposta incorreta. O Boss bloqueou o teu avanço!", "error");

        // Devolve o controle após a animação de erro acabar
        setTimeout(() => {
            buttonElement.classList.remove('wrong-choice');
            buttons.forEach(btn => btn.disabled = false);
        }, 1000);
    }
}
