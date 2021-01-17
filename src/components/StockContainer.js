import React from "react";
import StockComponent from "./StockComponent";

function StockContainer({ stocks, onStockClick }) {
  const stockComponentArray = stocks.map(stock => {
    return <StockComponent key={stock.id} stock={stock} onStockClick={onStockClick} />
  })
  return (
    <div>
      <h2>Stocks</h2>
      {stockComponentArray}
    </div>
  );
}

export default StockContainer;
