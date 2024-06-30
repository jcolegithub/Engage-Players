Hooks.on("updateCombat", async (combat, updateData, options, userId) => {
    if (!combat.started && !combat.combatants.find(c => c.defeated === false)) return;

    // Get active Game Master
    let gm = game.users.find(u => u.isGM && u.active);
    if (!gm) {
        console.log("No active Game Master found.");
        return;
    }

    // Get next player to engage
    const nextPlayer = getNextPlayerToEngage();

    // Send whisper message to GM
    await ChatMessage.create({
        user: gm.id,
        content: `It's time to engage ${nextPlayer.name}!`,
        whisper: [gm.id],
        speaker: {
            alias: "Reminder",
            // Custom image URL
            img: "https://assets.forge-vtt.com/6134abd6da52b3fdafaa293c/tokens/all/gm_assistant_token.webp"
        }
    });
});

function getNextPlayerToEngage() {
    // Rotate through the players in a round-robin fashion
    const players = game.users.players.filter(player => player.active);
    if (!players.length) return null;

    // Find the next player to engage (simple round-robin)
    let index = (game.settings.get("engage-players", "lastPlayerIndex") || 0) + 1;
    if (index >= players.length) index = 0;

    // Save the last engaged player index
    game.settings.set("engage-players", "lastPlayerIndex", index);

    return players[index].character;
}
