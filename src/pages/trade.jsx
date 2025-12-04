import '../styles/pages/trade.css';

import MultiCoinChart from "../components/trade/BinanceChart.jsx"

import ChatBot from "../components/trade/ChatBot.jsx"
import UserPanel from "../components/trade/UserPanel.jsx"

import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import { useEffect } from 'react';

export default function TradePage({darkMode}) {
    return (
        <div className="frame">
            <div className="frame-header">
                <Header />
            </div>
                                            
            <div className='frame-main'>
                <div className='frame-main-top'>
                    
                </div>

                <div className="frame-main-botton">
                    <div className='frame-main-bottom-right'>
                        <h2>Trading View</h2>
                        <iframe
                            style={{ border: "none" }}
                            src=
                            {
                                darkMode ?
                                "https://s.tradingview.com/widgetembed/?hideideas=1&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=kr#%7B%22symbol%22%3A%22BTCUSD%22%2C%22frameElementId%22%3A%22tradingview_d5a8e%22%2C%22interval%22%3A%2215%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22dark%22%2C%22timezone%22%3A%22Asia%2FSeoul%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22coinsect.io%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BTCUSD%22%2C%22page-uri%22%3A%22coinsect.io%2F%22%7D" 
                                :
                                "https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr#%7B%22symbol%22%3A%22BTCUSD%22%2C%22frameElementId%22%3A%22tradingview_d2ee5%22%2C%22interval%22%3A%2215%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22light%22%2C%22timezone%22%3A%22Asia%2FSeoul%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22coinsect.io%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BTCUSD%22%2C%22page-uri%22%3A%22coinsect.io%2F%22%7D"
                            }
                            width="100%"
                            height="100%"
                            allowTransparency={true}
                        />
                    </div>
                    <div className='frame-main-bottom-left'>
                        <ChatBot 
                        className='frame-main-right-bottom-chatbot'/>
                    </div>
                </div>
            </div>

            <div className="frame-footer">
                <Footer />
            </div>
        </div>
    );
}

