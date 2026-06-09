// Gestão de Moedas (Eco-Tokens)
function getEcoTokens() {
    return parseInt(localStorage.getItem("eco_tokens") || "0");
}

function addEcoTokens(amount) {
    const current = getEcoTokens();
    localStorage.setItem("eco_tokens", current + amount);
    updateHUD();
}

// Mecânicas de Progresso e Desbloqueio
function unlockNPCs(ids){
    ids.forEach(id => {
        localStorage.setItem(`npc_${id}`, "unlocked");
    });
}

function completeNPC(id){
    localStorage.setItem(`completed_${id}`, "true");
}

function isUnlocked(id){
    return localStorage.getItem(`npc_${id}`) === "unlocked";
}

function isCompleted(id){
    return localStorage.getItem(`completed_${id}`) === "true";
}

// Função Utilitária de Áudio Reativo (SFX Sintetizado via Web Audio API)
function playSound(type) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start(); osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start(); osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
    }
}

// Efeito Visual de Fade-Out para Transição Suave de Telas
function smoothNavigate(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

// Atualização Dinâmica da Interface (HUD)
function updateHUD() {
    const tokensEl = document.getElementById("token-count");
    if(tokensEl) tokensEl.innerText = getEcoTokens();

    // Atualizado para incluir os 6 NPCs do jogo
    const npcs = ['ana', 'carlos', 'helena', 'felipe', 'beatriz', 'diogo'];
    const completedCount = npcs.filter(id => isCompleted(id)).length;
    const percentage = Math.round((completedCount / npcs.length) * 100);

    const fillEl = document.getElementById("progress-fill");
    const textEl = document.getElementById("progress-text");
    if(fillEl) fillEl.style.width = `${percentage}%`;
    if(textEl) textEl.innerText = `${percentage}%`;
}

function resetProgress(){
    localStorage.clear();
    location.reload();
}

// Inicia com fade-in suave
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = '1';
    updateHUD();
});
