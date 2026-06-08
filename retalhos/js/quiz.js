// Efeito de Digitação Fluida (Typewriter)
function typeWriter(elementId, text, speed = 25) {
    const el = document.getElementById(elementId);
    if(!el) return;
    el.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Cria e exibe a Notificação Toast na tela
function showToast(message, type = 'success') {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = `show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Avaliação Reativa do Quiz (Juicy 🍊)
function handleQuizAnswer(buttonElement, isCorrect, currentNPC, unlocks = []) {
    // Desativa todos os botões temporariamente para evitar cliques duplos
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        playSound('success');
        buttonElement.classList.add('correct-choice');
        
        // Atribui pontos/moedas se for a primeira vez que completa
        if (!isCompleted(currentNPC)) {
            addEcoTokens(50);
            unlockNPCs(unlocks);
            completeNPC(currentNPC);
            showToast("🎉 Excelente! +50 Eco-Tokens obtidos.", "success");
        } else {
            showToast("✓ Respondido com sucesso!", "success");
        }

        // Aguarda a animação e faz a transição suave de volta
        setTimeout(() => {
            smoothNavigate("../index.html");
        }, 2000);

    } else {
        playSound('error');
        buttonElement.classList.add('wrong-choice');
        showToast("❌ Resposta incorreta. Tenta novamente!", "error");

        // Devolve o controle após a animação de erro acabar
        setTimeout(() => {
            buttonElement.classList.remove('wrong-choice');
            buttons.forEach(btn => btn.disabled = false);
        }, 1000);
    }
}
