import React, { useEffect } from "react";
import ChainSelector from "../../hooks/ChainSelector";

const ChainSelectorUi = ({ selectedChain, handleChainChange }) => {
  return (
    <div className="chain-btn-home">
      <div className="chain-btn-home">
        <ChainSelector
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
        />
      </div>
    </div>
  );
};

export default ChainSelectorUi;
