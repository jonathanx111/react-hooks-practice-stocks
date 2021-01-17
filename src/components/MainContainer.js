import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const API_URL = "http://localhost:3001/stocks"

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("All")
  let organizedStocks = [...stocks]

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(stockObjects => {
        setStocks(stockObjects)
      })
  }, [])

  function onStockClick(stock) {
    if (!portfolioStocks.includes(stock) & !stock.inPortfolio) {
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
  
  if (filterBy !== "All") {
    organizedStocks = stocks.filter(stock => {
      return stock.type === filterBy
    })
    .sort((stockA, stockB) => {
      if (sortBy === "Price") {
        return stockA.price - stockB.price
      } else {
        return stockA.name.localeCompare(stockB.name)
      }
    })
  } else {
    organizedStocks.sort((stockA, stockB) => {
      if (sortBy === "Price") {
        return stockA.price - stockB.price
      } else {
        return stockA.name.localeCompare(stockB.name)
      }
    })
  }





  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} setFilterBy={setFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={organizedStocks} onStockClick={onStockClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} onStockClick={onStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
