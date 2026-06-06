
async function renderContacts(containerId){

    const response =
        await fetch("../data/npcs.json");

    const npcs =
        await response.json();

    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    Object.entries(npcs).forEach(
        ([id, npc]) => {

        const div =
            document.createElement("div");

        if(id === "ana" || isUnlocked(id)){

            div.innerHTML =
                `✓ ${npc.name}`;

        }else{

            div.innerHTML =
                `🔒 ${npc.name}`;

        }

        container.appendChild(div);

    });

}
