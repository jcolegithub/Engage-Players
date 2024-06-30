

// engagePlayers.js
Hooks.once('ready', async function() {
    console.log("Engage Players module is ready");

    const users = game.users.contents;
    const gm = users.find(user => user.role === CONST.USER_ROLES.GAMEMASTER);

    if (!gm) {
        console.error("No Game Master found");
        return;
    }

    let playerIndex = 0;
    const players = game.users.players.filter(p => p.active);

    Hooks.on('updateActiveUsers', () => {
        console.log("Active users updated");
        if (players.length === 0) return;
        const currentPlayer = players[playerIndex];
        playerIndex = (playerIndex + 1) % players.length;

        console.log(`Time to engage with ${currentPlayer.name}`);

        ChatMessage.create({
            content: `Time to engage with ${currentPlayer.name}!`,
            whisper: [gm.id],
            speaker: {
                alias: "Engage Players Reminder"
            }
        }, {
            img: "https://assets.forge-vtt.com/6134abd6da52b3fdafaa293c/tokens/all/gm_assistant_token.webp" // Replace with the correct path to your custom image
        });
    });
});