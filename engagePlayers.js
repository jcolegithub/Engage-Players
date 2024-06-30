
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

  const FIVE_MINUTES = 1000 * 60 * 5; // Convert 5 minutes to milliseconds

  let intervalId = setInterval(() => {
    if (players.length === 0) return;
    const currentPlayer = players[playerIndex];
    playerIndex = (playerIndex + 1) % players.length;

    console.log(`Time to engage with ${currentPlayer.name}`);

    ChatMessage.create({
      content: `Time to engage with ${currentPlayer.name}!`,
      speaker: {
        alias: "Engage Players Reminder"
      }
    }, {
      img: "tokens/all/gm_assistant_token.webp" // Replace with the actual path to your image
    });
  }, FIVE_MINUTES);

  // Cleanup function to clear the interval on module unload
  Hooks.once('module.disable', () => clearInterval(intervalId));
});
