function unlockNPCs(ids){

    ids.forEach(id => {

        localStorage.setItem(
            `npc_${id}`,
            "unlocked"
        );

    });

}

function completeNPC(id){

    localStorage.setItem(
        `completed_${id}`,
        "true"
    );

}

function isUnlocked(id){

    return localStorage.getItem(
        `npc_${id}`
    ) === "unlocked";

}

function isCompleted(id){

    return localStorage.getItem(
        `completed_${id}`
    ) === "true";

}

function resetProgress(){

    localStorage.clear();

    location.reload();

}
