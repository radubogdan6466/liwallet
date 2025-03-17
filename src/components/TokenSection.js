// TokenSection.js
import React, { useState } from "react";
import TokenList from "./TokenList";
import { useTranslation } from "react-i18next";
import "./tokenList.css";
import History from "../pages/History";
export default function TokenSection(props) {
  const { t } = useTranslation();
  const [showTokenList, setShowTokenList] = useState(true);
  const toggleView = () => {
    setShowTokenList(!showTokenList);
  };
  const {
    userWallet,
    web3,
    selectedChain,
    ethchain,
    bnbchain,
    dogechain,
    polychain,
    arbitrumchain,
    goerlichain,
    sepoliachain,
    holeskychain,
    basechain,
    avalanchechain,
    opMainnetChain,
    fantomChain,
    cardanoChain,
    gnosisChain,
    celoChain,
    harmonyChain,
    blastChain,
    zetaChain,
    cronosMainnetChain,
    lineaMainnetChain,
    mantleMainnetChain,
    pulseMainnetChain,
    //new
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
    ethBalance,
    handleTokenClick,
    handleTokenBalanceClick,
    onTokenBalanceClick,
  } = props;

  return (
    <div className="tokenList">
      {/* <div className="tohis">
        <h3
          className="tokenListTitle"
          style={{ color: "#f4f3f2" }}
          onClick={toggleView}
        >
          {t("tokens")}
        </h3>
        <h3
          className="tokenListTitle"
          style={{ color: "#f4f3f2" }}
          onClick={toggleView}
        >
          History
        </h3>
      </div> */}
      {showTokenList ? (
        <TokenList
          userWallet={userWallet}
          web3={web3}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          polychain={polychain}
          dogechain={dogechain}
          arbitrumchain={arbitrumchain}
          goerlichain={goerlichain}
          sepoliachain={sepoliachain}
          holeskychain={holeskychain}
          opMainnetChain={opMainnetChain}
          basechain={basechain}
          avalanchechain={avalanchechain}
          cronosMainnetChain={cronosMainnetChain}
          lineaMainnetChain={lineaMainnetChain}
          mantleMainnetChain={mantleMainnetChain}
          pulseMainnetChain={pulseMainnetChain}
          fantomChain={fantomChain}
          cardanoChain={cardanoChain}
          gnosisChain={gnosisChain}
          celoChain={celoChain}
          harmonyChain={harmonyChain}
          blastChain={blastChain}
          zetaChain={zetaChain}
          //new
          apechain={apechain}
          arbitrumnovachain={arbitrumnovachain}
          berachain={berachain}
          bttcchain={bttcchain}
          fraxchain={fraxchain}
          memecorechain={memecorechain}
          moonbeamchain={moonbeamchain}
          moonriverchain={moonriverchain}
          opbnbchain={opbnbchain}
          scrollchain={scrollchain}
          sonicchain={sonicchain}
          swellchain={swellchain}
          taikoalethiachain={taikoalethiachain}
          unichain={unichain}
          wemixchain={wemixchain}
          xaichain={xaichain}
          xdcchain={xdcchain}
          zksyncerachain={zksyncerachain}
          zircuitchain={zircuitchain}
          ethBalance={ethBalance}
          handleTokenClick={handleTokenClick}
          onTokenBalanceClick={onTokenBalanceClick}
        />
      ) : (
        <History selectedChain={selectedChain} />
      )}
    </div>
  );
}
