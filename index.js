const threeCommasAPI = require('3commas-api-node');
const express = require('express');
const path = require('path');

const api1 = new threeCommasAPI({
    apiKey: '35c1fd4032924b3aad132a6d135294f8192816f541da44039dcea439f3e6cce3',
    apiSecret: '25d7622eb5df82eace388295ab8872cdd6b6ea89dfb66bd31dde8ae26cd904c9f32511bdb166baa5b3ac8ddfb181d79e838636ec6baf929a454ad1e96d67e5ffa8d98091d9d51b044122c43638ea0a473688e48832d3a28ba81777bf965a23c5d37b1825',
});

const api2 = new threeCommasAPI({
     apiKey: '4d92b7d77e504372aa71127afca240acf546cf35d70a4dc79d8cc97b85a397c2',
     apiSecret: '43c7fe02916ed459d08b03ef3b45315168a2487e15eedbb34a6fc6a7cd37923c7cfc5d59f120daf2d351e9869bfcef2bc49e40828306f21c1179c229d799afde6862d16d255baca141d36ec3619e37963c66b2e72c3ca0555c3b040b4efee9dccd6d430a',
});

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

const capitalMap = new Map([
  [32101201, 500],
  [31876293, 1000],
  [31814867, 1000],
  [32103676, 2000],
  [32178454, 1000],
  [32427107, 4000],
  [32427154, 2000],
  [32427159, 145],
  [32428979, 2000],
  [32433201, 152],
  [32208556, 500],
  [32268993, 500],
  [32423648, 3000],
  [32244363, 3000],
  [32244371, 2000],
  [32423630, 427],
  [32435532, 2000],
]);

app.get('/data', async (req, res) => {
  try {
    const api1Ids = [
      32101201, 31876293, 32103676, 32178454, 32427154,
      32427107, 32428979, 32433201, 32427159, 31814867,
    ];
    const api2Ids = [
      32208556, 32268993, 32423648, 32244363, 32244371,
      32423630, 32435532,
    ];

    const api1Results = await Promise.all(api1Ids.map(async (id) => {
      const account = await api1.accountLoadBalances(id);
      // Process the account data and return the required object format
      return {
        id,
        name: account?.name,
        balance: Math.floor(account?.primary_display_currency_amount?.amount) || 0,
        capital: capitalMap.get(id) || 0,
      };
    }));

    const api2Results = await Promise.all(api2Ids.map(async (id) => {
      const account = await api2.accountLoadBalances(id);
      // Process the account data and return the required object format
      return {
        id,
        name: account?.name,
        balance: Math.floor(account?.primary_display_currency_amount?.amount) || 0,
        capital: capitalMap.get(id) || 0,
      };
    }));

    const data = {
      api1: api1Results.sort((account1, account2) => account2.balance - account1.balance),
      api2: api2Results.sort((account1, account2) => account2.balance - account1.balance),
    };

    data.api1.forEach((result) => {
      result.percentage = ((result.balance - result.capital) / result.capital * 100).toFixed(1);
      result.percentageColor = result.percentage < 0 ? 'red' : 'green';
    });

    data.api2.forEach((result) => {
      result.percentage = ((result.balance - result.capital) / result.capital * 100).toFixed(1);
      result.percentageColor = result.percentage < 0 ? 'red' : 'green';
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balances from APIs' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
