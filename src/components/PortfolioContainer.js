import React from "react";
import Stock from "./StockComponent";

function PortfolioContainer({ portfolioStocks, onStockClick }) {
  const portfolioStocksArray = portfolioStocks.map(stock => {
    return <Stock key={stock.id} stock={stock} onStockClick={onStockClick} portfolio={true} />
  })
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioStocksArray
      }
    </div>
  );
}

export default PortfolioContainer;
