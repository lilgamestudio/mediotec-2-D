// Cria a div de feedback dinamicamente caso ela não exista na página
function showScreenFeedback(message, isSuccess) {
    let feedbackEl = document.getElementById("game-feedback");
    
    if (!feedbackEl) {
        feedbackEl = document.createElement("div");
        feedbackEl.id = "game-feedback";
        document.body.appendChild(feedbackEl);
    }

    // Configura a mensagem e o tipo (sucesso ou erro)
    feedbackEl.innerText = message;
    feedbackEl.className = isSuccess ? "show success" : "show error";

    // Remove a mensagem após 3 segundos com efeito suave
    setTimeout(() => {
        feedbackEl.classList.remove("show");
    }, 3000);
}

function answerQuiz(correct, currentNPC, unlocks = []){
    if(correct){
        unlockNPCs(unlocks);
        completeNPC(currentNPC);
        
        showScreenFeedback("🎉 Resposta Correta! Novos NPCs liberados.", true);
        
        // Espera a animação acabar antes de voltar para o menu
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);

        return true;
    }

    showScreenFeedback("❌ Resposta incorreta. Tente novamente!", false);
    return false;
}
