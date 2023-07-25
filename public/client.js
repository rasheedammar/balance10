const createTableRow = (account) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${account.name}</td>
      <td>$${account.balance}</td>
      <td class="${account.percentageColor}">${account.percentage}%</td>
      <td><button onclick="closeAllPositions(${account.id})">Close All Positions</button></td>
    `;
    return tableRow;
  };
  
  const renderData = (data) => {
    const api1Table = document.getElementById('api1-table');
    const api2Table = document.getElementById('api2-table');
  
    data.api1.forEach((account) => {
      const tableRow = createTableRow(account);
      api1Table.appendChild(tableRow);
    });
  
    data.api2.forEach((account) => {
      const tableRow = createTableRow(account);
      api2Table.appendChild(tableRow);
    });
  };
  
  fetch('/data')
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  
  function closeAllPositions(accountId) {
    console.log(`Closing all positions for
  