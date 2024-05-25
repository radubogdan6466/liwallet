import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import up from "../logos/up.png";
// import { getAllTransactions } from "../transfer/utils/localStorageService";
import { getAllTransactionsByChain } from "../transfer/utils/localStorageService";

import { format } from "date-fns";
import {
  ETHERSCAN_BASE_URL,
  BSCSCAN_BASE_URL,
  DOGECHAIN_BASE_URL,
  POLYCHAIN_BASE_URL,
  ARBITRUMCHAIN_BASE_URL,
  GOERLICHAIN_BASE_URL,
  SEPOLIACHAIN_BASE_URL,
  BASECHAIN_BASE_URL,
  AVALANCHECHAIN_BASE_URL,
  OPMAINNETCHAIN_BASE_URL,
  CRONOSMAINNETCHAIN_BASE_URL,
  LINEAMAINNETCHAIN_BASE_URL,
  MANTLEMAINNETCHAIN_BASE_URL,
  PULSEMAINNETCHAIN_BASE_URL,
  FANTOMCHAIN_BASE_URL,
  GNOSISCHAIN_BASE_URL,
  CELOCHAIN_BASE_URL,
  HARMONYCHAIN_BASE_URL,
  BLASTCHAIN_BASE_URL,
  ZETACHAIN_BASE_URL,
} from "../hooks/links.js";
export default function ({
  selectedChain,
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  ethBalance,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
}) {
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const getBaseUrl = (selectedChain) => {
    switch (selectedChain) {
      case ethchain:
        return ETHERSCAN_BASE_URL;
      case bnbchain:
        return BSCSCAN_BASE_URL;
      case dogechain:
        return DOGECHAIN_BASE_URL;
      case polychain:
        return POLYCHAIN_BASE_URL;
      case arbitrumchain:
        return ARBITRUMCHAIN_BASE_URL;
      case goerlichain:
        return GOERLICHAIN_BASE_URL;
      case sepoliachain:
        return SEPOLIACHAIN_BASE_URL;

      case basechain:
        return BASECHAIN_BASE_URL;
      case avalanchechain:
        return AVALANCHECHAIN_BASE_URL;
      case opMainnetChain:
        return OPMAINNETCHAIN_BASE_URL;
      case cronosMainnetChain:
        return CRONOSMAINNETCHAIN_BASE_URL;
      case lineaMainnetChain:
        return LINEAMAINNETCHAIN_BASE_URL;
      case mantleMainnetChain:
        return MANTLEMAINNETCHAIN_BASE_URL;
      case pulseMainnetChain:
        return PULSEMAINNETCHAIN_BASE_URL;
      case fantomChain:
        return FANTOMCHAIN_BASE_URL;
      case gnosisChain:
        return GNOSISCHAIN_BASE_URL;
      case celoChain:
        return CELOCHAIN_BASE_URL;
      case harmonyChain:
        return HARMONYCHAIN_BASE_URL;
      case blastChain:
        return BLASTCHAIN_BASE_URL;
      case zetaChain:
        return ZETACHAIN_BASE_URL;
      default:
        return "";
    }
  };
  const baseUrl = getBaseUrl(selectedChain);
  console.log(baseUrl);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const chainTransactions = await getAllTransactionsByChain(
          selectedChain
        );
        setTransactions(chainTransactions);
        console.log(
          `Tranzacții preluate cu succes pentru lanțul ${selectedChain}:`,
          chainTransactions
        );
      } catch (error) {
        console.error(
          `Eroare la preluarea tranzacțiilor pentru lanțul ${selectedChain}:`,
          error
        );
      }
    };

    fetchTransactions();
    console.log("Chain selectat în istoric", selectedChain);
  }, [selectedChain]);
  const openTxHashLink = (txHash) => {
    const url = `${baseUrl}/tx/${txHash}`;
    window.open(url, "_blank");
  };
  return (
    <div
      className="tokenList"
      style={{ width: "100%", padding: "0 10px 0 10px", margin: 0 }}
    >
      {transactions.length === 0 ? (
        <Typography variant="body2" sx={{ color: "#f2f2f2" }}>
          You have no transactions.
        </Typography>
      ) : (
        <List sx={{ height: "200px", width: "100%", overflowY: "auto" }}>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{ padding: "5px", margin: "0" }}
                alignItems="flex-start"
                onClick={() => openTxHashLink(transaction.txHash)}
              >
                <ListItemAvatar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginRight: "10px",
                  }}
                >
                  <Avatar
                    fontSize="medium"
                    src={up}
                    sx={{
                      color: "#11998e",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "#f2f2f2",
                          marginLeft: "10px",
                        }}
                        component="span"
                      >
                        Sent {transaction.token}
                      </Typography>{" "}
                      <ListItemText
                        primary={format(
                          new Date(transaction.timestamp),
                          "dd-MM-yy HH:mm:ss"
                        )}
                        sx={{ color: "#9b9b9b" }}
                      />
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "#38ef7d",
                          marginLeft: "20px",
                        }}
                        component="span"
                      >
                        {transaction.status}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemText
                  primary={transaction.amount}
                  sx={{ color: "#9b9b9b" }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
}
