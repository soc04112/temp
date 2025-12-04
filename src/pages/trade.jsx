import '../styles/pages/trade.css';

import MultiCoinChart from "../components/trade/BinanceChart.jsx"

import ChatBot from "../components/trade/ChatBot.jsx"
import UserPanel from "../components/trade/UserPanel.jsx"
import TradeNavi from "../components/trade/TradeViewNavi.jsx"
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

export default function TradePage() {
    return (
        <div className="frame">
            <div className="frame-header">
                <Header />
            </div>
                                            
            <div className='frame-main'>
                <div className='frame-main-left'>
                    <TradeNavi />
                </div>

                <div className="frame-main-right">
                    <MultiCoinChart 
                    className='frame-main-right-top'/>
                    <div className='frame-main-right-center'/>

                    <div className='frame-main-right-bottom'>
                        <ChatBot 
                        className='frame-main-right-bottom-chatbot'/>
                        <UserPanel
                        className='frame-main-right-bottom-userpanel'/>
                    </div>
                </div>
            </div>

            <div className="frame-footer">
                <Footer />
            </div>
        </div>
    );
}

