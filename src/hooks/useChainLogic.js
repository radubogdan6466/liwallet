import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

export function useChainLogic(initialChain) {
  const [selectedChain, setSelectedChain] = useState(initialChain);
  const [web3, setWeb3] = useState(
    new Web3(new Web3.providers.HttpProvider(initialChain))
  );
  //console.log("initial chain", initialChain);
  useEffect(() => {
    setWeb3(new Web3(new Web3.providers.HttpProvider(selectedChain)));
  }, [selectedChain]);

  const handleChainChange = useCallback((selectedValue) => {
    // Salvare în localStorage la schimbarea lanțului
    localStorage.setItem("selectedChain", selectedValue);

    // Afișare în consolă la schimbarea lanțului
    //console.log("Chain selectat:", selectedValue);
    setSelectedChain(selectedValue);
  }, []);

  return { selectedChain, web3, handleChainChange };
}
