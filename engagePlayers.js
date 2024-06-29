let currentPlayerIndex = 0;

function engageNextPlayer() {
  const players = game.users.players.filter(player => player.active);
  if (players.length === 0) {
    console.log("No active players to engage.");
    return;
  }

  // Get the next player in the round-robin
  const player = players[currentPlayerIndex];
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

  // Notify the GM to engage the player
  ui.notifications.info(`Engage with ${player.name}`);

  // Optional: log to console
  console.log(`Engage with ${player.name}`);

  // Send a message to the chat log for GMs only
  const gmIds = game.users.filter(user => user.isGM).map(user => user.id);
  if (gmIds.length > 0) {
    ChatMessage.create({
      speaker: { alias: "Game Master Assistant" },
      content: `<b>It's time to engage with ${player.name}.</b>`,
      whisper: gmIds, // Ensure the message is only whispered to the GMs
      img: "https://assets.forge-vtt.com/6134abd6da52b3fdafaa293c/tokens/all/gm_assistant_token.webp" // Set the path to your custom image here
    });
  }
}

// Schedule the engageNextPlayer function to run every 5 minutes (300000 milliseconds)
setInterval(engageNextPlayer, 300000);

Hooks.once('ready', () => {
  console.log("Engage Players Reminder module loaded.");
});
