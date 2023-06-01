import React, { useState } from 'react';
import fetchData from '../helpers/fetchCoinList.js';
import '../components/CoinList.css';
import Coin from './Coin';

const CoinInfo = ({ setCoinId }) => {
  const [coinData, setCoinData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchCoinData = async () => {
    try {
      const data = await fetchData();
      setCoinData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCoins = coinData.filter((coin) => {
    const searchTerm = searchInput.toLowerCase();
    const nameMatch = coin.name.toLowerCase().startsWith(searchTerm);
    const symbolMatch = coin.symbol.toLowerCase().startsWith(searchTerm);
    return nameMatch || symbolMatch;
  });
  

  if (coinData.length === 0) {
    fetchCoinData();
  }

  return (
    <div className='wrapperList'>
      <div className='filterContainer'>
        <h1>Control Panel</h1>
        <input
          type='text'
          value={searchInput}
          onChange={handleInputChange}
          className='filterInput'
          placeholder='Enter your search request...'
        />
      </div>
      <p id='cryptoTag'>Crypto Currency</p>
      <div className='listContainer'>
        {searchInput ? (
          filteredCoins.map((coin) => <Coin coinElement={coin} key={coin.id} />)
        ) : (
          coinData.map((coin) => <Coin setCoinId={setCoinId} coinElement={coin} key={coin.id} />)
        )}
      </div>
    </div>
  );
};

export default CoinInfo;
