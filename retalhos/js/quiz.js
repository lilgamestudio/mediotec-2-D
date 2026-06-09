// Motor de Quiz Atualizado - Fashion Trace
// Adicionado suporte a redirecionamento automático e páginas de minijogos
function answerQuiz(correct, currentNPC, unlocks = [], redirectUrl = null) {
    if (correct) {
        // Salva o progresso no localStorage usando as funções do seu game.js
        unlockNPCs(unlocks);
        completeNPC(currentNPC);

        alert("🏆 Resposta correta! Avanço registado.");

        // Se foi passada uma URL de minijogo, vai para lá. Se não, volta para a página principal (index)
        // Como os NPCs estão na pasta /npcs, para voltar ao index usamos "../index.html"
        setTimeout(() => {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                window.location.href = "../index.html";
            }
        }, 500); // Pequena pausa para o jogador ler o alerta

        return true;
    }

    alert("❌ Resposta incorreta. Tenta novamente!");
    return false;
}
