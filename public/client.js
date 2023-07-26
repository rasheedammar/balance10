const createTableRow = (account) => {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
      <td>${account.title}</td>
      <td>${account.id}</td>
      <td>${account.name}</td>
      <td>$${account.balance}</td>
      <td>$${account.capital}</td>
      <td>${account.bots.join(', ')}</td>
      <td>${account.percentage}%</td>
      <td>
          <button onclick="closeAllPositions(${account.id})">Close All Positions</button>
          <button onclick="stopAllBots(${account.id})">Stop Bots</button>
      </td>
  `;

  // Apply percentage color based on the percentage value
  const percentageCell = tableRow.querySelector('td:nth-child(7)');
  const percentage = parseFloat(account.percentage);
  if (!isNaN(percentage)) {
    if (percentage < 0) {
      percentageCell.style.color = 'red';
    } else {
      percentageCell.style.color = 'green';
    }
  }

  return tableRow;
};

// Fetch the account data from the server
fetch('/data')
  .then((response) => response.json())
  .then((data) => {
    // ... Your existing code to handle the received data and create account rows
  })
  .catch((error) => {
    console.error('Error fetching account data:', error);
  });
