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

const fetchData = async () => {
  try {
    const response = await fetch('/data');
    const data = await response.json();

    const api1Table = document.getElementById('api1-table');
    const api2Table = document.getElementById('api2-table');

    if (data !== null) {
      api1Table.innerHTML = '';
      api2Table.innerHTML = '';

      data.api1.forEach((account) => {
        const row = createTableRow(account);
        api1Table.appendChild(row);
      });

      data.api2.forEach((account) => {
        const row = createTableRow(account);
        api2Table.appendChild(row);
      });
    } else {
      console.error('Account data is null or empty.');
    }
  } catch (error) {
    console.error('Error fetching account data:', error);
  }
};

// Call the fetchData function when the page loads
fetchData();
