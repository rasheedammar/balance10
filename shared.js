// shared.js

// Function to create an account row with a stop bot button
const createAccountRow = (accountId, accountData) => {
    const row = document.createElement('div');
    row.classList.add('account-row');
    row.innerHTML = `
      <span>Account ID: ${accountId}</span>
      <button class="stop-bot-btn" data-account-id="${accountId}">Stop Bots</button>
    `;
  
    // Attach a click event listener to the button
    const stopBotButton = row.querySelector('.stop-bot-btn');
    stopBotButton.addEventListener('click', () => {
      const botIds = accountData.bots || [];
      try {
        // Call the function to stop all bots for the selected account
        stopAllBots(botIds); // Send only the bot IDs
      } catch (error) {
        console.error('Error stopping bots:', error);
      }
    });
  
    return row;
  };
  
  const stopAllBots = async (botIds) => {
    try {
      const response = await fetch('/stop-all-bots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botIds }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error stopping bots:', error);
    }
  };
  