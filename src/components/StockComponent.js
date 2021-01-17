import React from "react";

function StockComponent({ stock, onStockClick, portfolio }) {
  const {id, ticker, name, type, price} = stock
  
  function handleStockClick() {
    if (!portfolio & stock.inPortfolio) return alert("Already in Port")
    onStockClick(stock)
  }
  
  return (
    <div>
      <div className="card">
        <div onClick={handleStockClick} className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
}
export default StockComponent;
