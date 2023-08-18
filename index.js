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
  [ 32260429,{title: 'G30',capital: 100, bots: ['botId1', 'botId2'] }],

  [ 32244961,{title: 'G54 Fast',capital: 100, bots: ['botId1', 'botId2'] }],

  [ 32152427,{title: 'G22',capital: 100, bots: ['botId1', 'botId2'] }],  
  [ 32101635,{title: 'G16 Fast',capital: 100, bots: ['botId1', 'botId2'] }],  


  

]);

app.get('/data', async (req, res) => {
  try {
    const api1Ids = [
    32152427,32101635,
    ];
    const api2Ids = [
      32260429,32244961,
    ];

    // ... (Your existing code)

const api1Results = await Promise.all(api1Ids.map(async (id) => {
  const account = await api1.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = (((balance/5) - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    balance,
    capital,
    percentage,
  };
}));

const api2Results = await Promise.all(api2Ids.map(async (id) => {
  const account = await api2.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = (((balance/5) - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    balance,
    capital,
    percentage,
  };
}));

// ... (Your existing code)


    const data = {
      api1: api1Results.sort((account1, account2) => account2.balance - account1.balance),
      api2: api2Results.sort((account1, account2) => account2.balance - account1.balance),
    };

   
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balances from APIs' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
