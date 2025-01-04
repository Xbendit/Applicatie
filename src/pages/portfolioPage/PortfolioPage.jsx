import './PortfolioPage.css';
import logo from '../../assets/logo-white.png';
import billboard from '../../assets/billboard-logo.png';
import axios from 'axios';
import {useState,useEffect} from "react";
import sortData from "../../helpers/sortData.js"

function PortfolioPage() {

    const [cryptoStats, setCryptoStats] = useState([])

    useEffect(()=>{

        async function fetchData() {

            try {
                const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
                console.log(response)

                const filteredPrices = response.data.filter(item => ['BTCUSDT', 'ETHUSDT', 'USDTUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'].includes(item.symbol)
                )
                console.log(filteredPrices)

                const formattedPrices = filteredPrices.map((item) => ({
                    symbol: item.symbol,
                    price: parseFloat(item.lastPrice).toFixed(2),
                    changePercent: parseFloat(item.priceChangePercent).toFixed(2)
                }));

                setCryptoStats(formattedPrices)
                console.log(formattedPrices)

            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

    },[]);

    function sortPrice () {
        const sortedStats = sortData(cryptoStats,"price","desc");
        setCryptoStats((sortedStats))

    }
    function sortPercent () {
        const sortedStats = sortData(cryptoStats,"changePercent","desc");
        setCryptoStats((sortedStats))

    }

    async function fetchWalletData() {
        const walletAddress = 'bc1qr4dl5wa7kl8yu792dceg9z5knl2gkn220lk7a9'

        try {
            const response1 = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${walletAddress}`)
            console.log(response1)
        } catch (e) {
            console.error(e);
        }
    }



    return (<>
            <header className="header outer-content-container">
                <div data-layer="BitGo" className="Bitgo">BitGo</div>
            </header>
            <section className="section-home-branding outer-content-container">
                <div className="inner-content-container__text-restriction">
                    <h1>Hier worden de 5 belangrijkste crypto's weergegeven</h1>


                    <button
                        onClick={fetchWalletData}
                    > Invoeren</button>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Public Key:"/>

                    <button
                        onClick={sortPrice}
                        className="button1"
                    >Sorteer prijs
                    </button>

                    <button
                        onClick={sortPercent}
                        className="button2"
                    >Sorteer 24h
                    </button>

                </div>

            </section>
            <section>
                {cryptoStats.length > 0 ? (
                    <ul>
                        {cryptoStats.map((coin) => (
                            <li key={coin.symbol}>
                                <p>${coin.price} 24%: {coin.changePercent}</p>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Bezig met laden.. </p>
                )}
            </section>
        </>
    );
}

export default PortfolioPage;