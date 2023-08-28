document.addEventListener('DOMContentLoaded', async () => {
    const botSelect = document.getElementById('bot-select');
    const dealsList = document.getElementById('deals-list');
  
    try {
      const response = await fetch('/data');
      const data = await response.json();
  
      data.api1.forEach((account) => {
        account.bots.forEach((botId) => {
          const option = document.createElement('option');
          option.value = botId;
          option.textContent = `Bot ID: ${botId} (Account: ${account.title})`;
          botSelect.appendChild(option);
        });
      });
  
      botSelect.addEventListener('change', async () => {
        const selectedBotId = botSelect.value;
        dealsList.innerHTML = '';
    
        if (selectedBotId) {
          try {
            const response = await fetch(`/ver1/bots/${selectedBotId}/deals_stats`);
            const dealsStats = await response.json();
    
            if (Array.isArray(dealsStats)) {
              dealsStats.forEach((dealStats) => {
                const dealItem = document.createElement('li');
                dealItem.textContent = `Bot ID: ${selectedBotId}, Deal Stats: ${JSON.stringify(dealStats)}`;
                dealsList.appendChild(dealItem);
              });
            } else {
              console.error('Deals stats data is not an array:', dealsStats);
            }
          } catch (error) {
            console.error('Error fetching deals stats:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  });
  