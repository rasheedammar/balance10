const threeCommasAPI = require('3commas-api-node');
const express = require('express');
const path = require('path');




const api1 = new threeCommasAPI({
  //Trusted IPs: 5.27.45.192
//apiKey:'19210c07ebe54264a5427bacbd1163f22b7204c6488e437e974a70c87afa6ff4',
//apiSecret: '4b4e208a88a568b30bd9f809fa5d57d48c8d1ce6e5de84cc4f24311062245c69066130fcdacea9ffe8be881df4f659b9beb437380b2c7737b2d83556df3a63266268e1118e2bbf8586df12c0a1fc6ad6c213be11c498c3e0aa895ed13ff323e294d47dc9',
apiKey: '35c1fd4032924b3aad132a6d135294f8192816f541da44039dcea439f3e6cce3',
  apiSecret: '25d7622eb5df82eace388295ab8872cdd6b6ea89dfb66bd31dde8ae26cd904c9f32511bdb166baa5b3ac8ddfb181d79e838636ec6baf929a454ad1e96d67e5ffa8d98091d9d51b044122c43638ea0a473688e48832d3a28ba81777bf965a23c5d37b1825',

});


//bot api9
const api2 = new threeCommasAPI({
 //Trusted IPs: 5.27.45.192
 
//apiKey:'a0ddf51a8f2644819e16f03867521dc5056adca764a046f690b6f061b0da73a9'  ,
//apiSecret: '3fdb25c54ecee703faff68818d35c9d5c906602da48db221a0ad57eb9e414663579992debc574cecb51970cc6c76bdd7b7c66c901b5374823d2287f86caa322d6c88da3153c50a20363a38c7a9f816ebaa93556f8de9a2c81fb2478536261798d4663f60',

     apiKey: '4d92b7d77e504372aa71127afca240acf546cf35d70a4dc79d8cc97b85a397c2',
     apiSecret: '43c7fe02916ed459d08b03ef3b45315168a2487e15eedbb34a6fc6a7cd37923c7cfc5d59f120daf2d351e9869bfcef2bc49e40828306f21c1179c229d799afde6862d16d255baca141d36ec3619e37963c66b2e72c3ca0555c3b040b4efee9dccd6d430a',

});












   


const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

const capitalMap = new Map([
  [ 32260429,{title: 'G30 ',Strategy:'Dca (1% TP)',capital: 100, bots: ['botId1', 'botId2'] }],

  [ 32152427,{title: 'G22',Strategy:'Dca (1% TP)',capital: 100, bots: ['botId1', 'botId2'] }],  

  [ 32244961,{title: 'G56 ',Strategy:'DCA-Fast (0.58% TP)',capital: 100, bots: ['botId1', 'botId2'] }],

  [ 32101635,{title: 'G16' ,Strategy:'DCA-Fast (0.58% TP)',capital: 100, bots: ['botId1', 'botId2'] }],  

 // [ 32190991,{title: 'Paper2' ,Strategy:'414450',capital: 100, bots: ['botId1', 'botId2'] }],  

  //[ 32205842,{title: 'Paper1' ,Strategy:'1418002',capital: 100, bots: ['botId1', 'botId2'] }],  


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
    Strategy: capitalInfo?.Strategy || '',
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
    Strategy: capitalInfo?.Strategy || '',
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


app.get('/ver1/bots/:botId/deals_stats', async (req, res) => {
  try {
    const botId = req.params.botId;

    // Replace the following line with your logic to fetch deal statistics for the specified bot ID
    const dealsStats = await fetchDealStatistics(botId);

    res.json(dealsStats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching deal statistics' });
  }
});

