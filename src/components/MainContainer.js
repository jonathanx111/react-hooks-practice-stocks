import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const API_URL = "http://localhost:3001/stocks"

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(stockObjects => {
        setStocks(stockObjects)
      })
  }, [])

  function onStockClick(stock) {
    if (!portfolioStocks.includes(stock) & !stock.inPortfolio) {
    console.log("first")
    stock.inPortfolio = true
    setPortfolioStocks([...portfolioStocks, stock])
    } else if (stock.inPortfolio) {
      stock.inPortfolio = false
      const updatedPortFolioStocks = portfolioStocks.filter(portStock => {
        return portStock.id !== stock.id
      })
      setPortfolioStocks(updatedPortFolioStocks)
    }
    console.log(stock)
  }
  
  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onStockClick={onStockClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} onStockClick={onStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
