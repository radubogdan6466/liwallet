// Balance.js
import React from "react";
import { Box } from "@mui/material";
import { TypographyTitle } from "../hooks/styles";
import { useTheme } from "@mui/material/styles";

export default function Balance({
  ethBalance,
  selectedChain,
  ethchain,
  bnbchain,
  polychain,
  dogechain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  holeskychain,
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
  //NEW
  apechain,
  arbitrumnovachain,
  berachain,
  bttcchain,
  fraxchain,
  memecorechain,
  moonbeamchain,
  moonriverchain,
  opbnbchain,
  scrollchain,
  sonicchain,
  swellchain,
  taikoalethiachain,
  unichain,
  wemixchain,
  xaichain,
  xdcchain,
  zksyncerachain,
  zircuitchain,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <TypographyTitle variant="h5">
        {Number(ethBalance).toFixed(4)}
        {selectedChain === ethchain
          ? "   ETH"
          : selectedChain === bnbchain
          ? "   BNB"
          : selectedChain === polychain
          ? "   MATIC"
          : selectedChain === dogechain
          ? "   DOGECOIN"
          : selectedChain === arbitrumchain
          ? "   ETH"
          : selectedChain === goerlichain
          ? "   ETH"
          : selectedChain === sepoliachain
          ? "   ETH"
          : selectedChain === holeskychain
          ? "   ETH"
          : selectedChain === basechain
          ? "   ETH"
          : selectedChain === avalanchechain
          ? "   AVAX"
          : selectedChain === opMainnetChain
          ? "   ETH"
          : selectedChain === cronosMainnetChain
          ? "   CRO"
          : selectedChain === lineaMainnetChain
          ? "   ETH"
          : selectedChain === mantleMainnetChain
          ? "   MNT"
          : selectedChain === pulseMainnetChain
          ? "   PLS"
          : selectedChain === fantomChain
          ? "   FTM"
          : selectedChain === gnosisChain
          ? "   XDAI"
          : selectedChain === celoChain
          ? "   CELO"
          : selectedChain === harmonyChain
          ? "   ONE"
          : selectedChain === blastChain
          ? "   ETH"
          : selectedChain === zetaChain
          ? "   ZETA"
          : //NEW
          selectedChain === apechain
          ? "   APE"
          : selectedChain === arbitrumnovachain
          ? "   ARB"
          : selectedChain === berachain
          ? "   BERA"
          : selectedChain === bttcchain
          ? "   BTTC"
          : selectedChain === fraxchain
          ? "   FRAX"
          : selectedChain === memecorechain
          ? "   MEME"
          : selectedChain === moonbeamchain
          ? "   GLMR"
          : selectedChain === moonriverchain
          ? "   MOVR"
          : selectedChain === opbnbchain
          ? "   OPBNB"
          : selectedChain === scrollchain
          ? "   SCRL"
          : selectedChain === sonicchain
          ? "   SONIC"
          : selectedChain === swellchain
          ? "   SWELL"
          : selectedChain === taikoalethiachain
          ? "   TAIKO"
          : selectedChain === unichain
          ? "   UNI"
          : selectedChain === wemixchain
          ? "   WEMIX"
          : selectedChain === xaichain
          ? "   XAI"
          : selectedChain === xdcchain
          ? "   XDC"
          : selectedChain === zksyncerachain
          ? "   ZKS"
          : selectedChain === zircuitchain
          ? "   ZIRCUIT"
          : "   Unknown Chain"}
      </TypographyTitle>
    </Box>
  );
}
