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
  [32101201, { title: 'G9', capital: 500, bots: ['11454883', '11454884'] }],

  [31876293, { title: 'G11', capital: 1000, bots: ['botId1', 'botId2'] }],

  [31814867, { title: 'G13', capital: 1000, bots: ['botId1', 'botId2'] }],

  [32103676, {title: 'G14', capital: 2000, bots: ['botId1', 'botId2'] }],    

  [32178454, { title: 'G24',capital: 1000, bots: ['botId1', 'botId2'] }],    

  [32427107 ,{ title: 'G122',capital: 4000, bots: ['botId1', 'botId2'] }],    

  [32427154,{ title: 'G124', capital: 2000, bots: ['botId1', 'botId2'] }],    

  [32427159, { title: 'G125',capital: 145, bots: ['botId1', 'botId2'] }],    

  [32428979, { title: 'G66',capital: 2000, bots: ['botId1', 'botId2'] }],    

  [32433201 ,{ title: 'G67',capital: 152, bots: ['botId1', 'botId2'] }],    

  [32208556 ,{ title: 'G27',capital: 500, bots: ['botId1', 'botId2'] }],    

  [32268993 ,{title:  'G112',capital: 500, bots: ['botId1', 'botId2'] }],    

  [32423648, { title: '103',capital: 3000, bots: ['botId1', 'botId2'] }],    

  [32244363, { title: 'G117',capital: 3000, bots: ['botId1', 'botId2'] }],    

  [32244371, { title: 'G118',capital: 2000, bots: ['botId1', 'botId2'] }],    

  [32423630 ,{title: 'G98',capital: 427, bots: ['botId1', 'botId2'] }],    

  [ 32435532,{title: 'G72',capital: 2000, bots: ['botId1', 'botId2'] }],    

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

    // ... (Your existing code)

const api1Results = await Promise.all(api1Ids.map(async (id) => {
  const account = await api1.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = ((balance - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    id,
    name: account?.name,
    balance,
    capital,
    bots: capitalInfo?.bots || [],
    percentage,
  };
}));

const api2Results = await Promise.all(api2Ids.map(async (id) => {
  const account = await api2.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = ((balance - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    id,
    name: account?.name,
    balance,
    capital,
    bots: capitalInfo?.bots || [],
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

const stopAllBots = async (accountId) => {
  try {
    const api1Ids = [32101201, 31876293, 32103676, 32178454, 32427154, 32427107, 32428979, 32433201, 32427159, 31814867];
    const api2Ids = [32208556, 32268993, 32423648, 32244363, 32244371, 32423630, 32435532];

    if (api1Ids.includes(accountId)) {
      // Implement the logic to stop all bots for the given account ID using API 1
      // ... (Your logic to stop bots using API 1 goes here)
      return { success: true, message: 'All bots stopped successfully for account ID: ' + accountId };
    } else if (api2Ids.includes(accountId)) {
      // Implement the logic to stop all bots for the given account ID using API 2
      // ... (Your logic to stop bots using API 2 goes here)
      return { success: true, message: 'All bots stopped successfully for account ID: ' + accountId };
    } else {
      throw new Error('Invalid account ID');
    }
  } catch (error) {
    console.error('Error stopping bots:', error);
    throw new Error('Error stopping bots for account ID: ' + accountId);
  }
};

app.post('/stop-all-bots', async (req, res) => {
  try {
    const { accountId } = req.body;
    const result = await stopAllBots(accountId);
    res.json(result);
  } catch (error) {
    console.error('Error stopping bots:', error);
    res.status(500).json({ error: 'Error stopping bots' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
