import "../../styles/common/Header.css"

import { useUpbitTicker } from '../../services/Socket/UpbitSocket.jsx';

import BitcoinLogo from '../../assets/Bitcoin_logo.png';
import EthuLogo from '../../assets/Ethereum_logo.png';
import DogeLogo from '../../assets/Doge_log.png';
import SolanaLogo from '../../assets/Solana_logo.png';
import XRPLogo from '../../assets/XRP_logo.png';

import { useEffect, useState } from "react";


export default function Header() {

    const { btcPrice, ethPrice, dogePrice, solPrice, xrpPrice } = useUpbitTicker();
    
    return (
        <div className="custom-header">
            <div className="header-title">
                <h2>Arena Bot Trading</h2>
            </div>
            <div className="header-ticker-container">
                
                <div className="total">
                    <div className="TICKER">
                        <a href="https://kr.investing.com/crypto/bitcoin"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                src={BitcoinLogo}
                            />
                            BTC
                        </a>
                        <label>{btcPrice} KRW</label>
                    </div>
                    <div className="TICKER">
                        <a href="https://kr.investing.com/indices/investing.com-eth-usd"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                src={EthuLogo}
                            />
                            ETH
                        </a>
                        <label>{ethPrice} KRW</label>
                    </div>
                </div>

                <div className="only">
                    <div className="TICKER">
                        <a href="https://kr.investing.com/indices/investing.com-doge-usd"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                src={DogeLogo}
                            />
                            DOGE
                        </a>
                        <label>{dogePrice} KRW</label>
                    </div>
                    <div className="TICKER">
                        <a href="https://kr.investing.com/indices/investing.com-sol-usd"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                src={SolanaLogo}
                            />
                            SOL
                        </a>
                        <label>{solPrice} KRW</label>
                    </div>
                    <div className="TICKER">
                        <a href="https://kr.investing.com/indices/investing.com-xrp-usd"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                src={XRPLogo}
                            />
                            XRP
                        </a>
                        <label>{xrpPrice} KRW</label>
                    </div>
                </div>
                
            </div>
            <div className="header-login-sign">
                <button className="login-button">
                    
                </button>
                <button className="sign-button">
                    
                </button>
            </div>
        </div>
    )
}