// Function to create an account row with a stop bot button
const createAccountRow = (accountId, accountData) => {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
      <td>${accountData.title}</td>
      <td>${accountId}</td>
      <td>${accountData.name}</td>
      <td>$${accountData.balance}</td>
      <td>$${accountData.capital}</td>
      <td>${accountData.bots.join(', ')}</td>
      <td>${accountData.percentage}%</td>
      <td>
          <button onclick="closeAllPositions(${accountId})">Close All Positions</button>
          <button onclick="stopAllBots(${accountId})">Stop Bots</button>
      </td>
  `;

  // Apply percentage color based on the percentage value
  const percentageCell = tableRow.querySelector('td:nth-child(7)');
  const percentage = parseFloat(accountData.percentage);
  if (!isNaN(percentage)) {
    if (percentage < 0) {
      percentageCell.style.color = 'red';
    } else {
      percentageCell.style.color = 'green';
    }
  }

  return tableRow;
};

<<<<<<< HEAD
// Fetch the account data from the server and append rows to api1-table and api2-table
fetch('/data')
  .then((response) => response.json())
  .then((data) => {
=======
const fetchData = async () => {
  try {
    const response = await fetch('/data');
    const data = await response.json();

>>>>>>> 16eac168b742fbce1c948ef1054b2604ce820723
    const api1Table = document.getElementById('api1-table');
    const api2Table = document.getElementById('api2-table');

    if (data !== null) {
<<<<<<< HEAD

      api1Table.innerHTML = '';
      api2Table.innerHTML = '';
      
      // Iterate over the account data and create the table rows for API1
      data.api1.forEach((account) => {
        const row = createAccountRow(account.id, account);
        api1Table.appendChild(row);
      });

      // Iterate over the account data and create the table rows for API2
      data.api2.forEach((account) => {
        const row = createAccountRow(account.id, account);
=======
      api1Table.innerHTML = '';
      api2Table.innerHTML = '';

      data.api1.forEach((account) => {
        const row = createTableRow(account);
        api1Table.appendChild(row);
      });

      data.api2.forEach((account) => {
        const row = createTableRow(account);
>>>>>>> 16eac168b742fbce1c948ef1054b2604ce820723
        api2Table.appendChild(row);
      });
    } else {
      console.error('Account data is null or empty.');
    }
<<<<<<< HEAD
  })
  .catch((error) => {
=======
  } catch (error) {
>>>>>>> 16eac168b742fbce1c948ef1054b2604ce820723
    console.error('Error fetching account data:', error);
  }
};

// Call the fetchData function when the page loads
fetchData();
