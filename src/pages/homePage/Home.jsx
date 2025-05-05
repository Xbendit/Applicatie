import './Home.css';
import axios from 'axios';
import {useState, useEffect} from "react";
import sortData from "../../helpers/sortData.js"
import CryptoInfoHome from "../../components/cryptoInfoHome/CryptoInfoHome.jsx";
import ButtonSort from "../../components/button/ButtonSort.jsx";

function Home() {

    const [cryptoStats, setCryptoStats] = useState([])

    useEffect(() => {

        async function fetchData() {

            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd', // Huidige prijs in USD
                        ids: 'bitcoin,ethereum,polkadot,solana,cardano,ripple', // Specificeer de crypto's
                    },
                });

                const formattedData = response.data.map((coin) => ({
                    name: coin.name,
                    symbol: coin.symbol,
                    price: coin.current_price.toFixed(2), // Huidige prijs
                    changePercent: coin.price_change_percentage_24h.toFixed(2), // 24-uurs verandering
                    marketCap: coin.market_cap.toLocaleString(), // Market cap in leesbaar formaat
                    marketCapRank: coin.market_cap_rank,
                    logo: coin.image, // Logo URL
                }));

                setCryptoStats(formattedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

    }, []);

    function sortPrice() {
        const sortedStats = sortData(cryptoStats, "price", "desc");
        setCryptoStats((sortedStats))

    }

    function sortPercent() {
        const sortedStats = sortData(cryptoStats, "changePercent", "desc");
        setCryptoStats((sortedStats))

    }

    function sortMarketCap() {
        const sortedStats = sortData(cryptoStats, "marketCapRank", "asc");
        setCryptoStats((sortedStats))

    }


    return (
        <>

            <header className="header outer-content-container">
                <div data-layer="BitGo" className="Bitgo">BitGo</div>
            </header>

            <section className="listcoins">

                <div className="coinHeader">

                    <div className="buttoncon">
                        <ButtonSort
                            onClick={sortMarketCap}
                            className="buttonMC"
                        >Sorteer op Market Cap
                        </ButtonSort>
                    </div>
                    <div className="buttoncon">

                        <ButtonSort
                            onClick={sortPrice}
                            className="buttonPrice"
                        >Sorteer op Prijs
                        </ButtonSort>
                    </div>
                    <div className="buttoncon">

                        <ButtonSort
                            onClick={sortPercent}
                            className="buttonPercentage"
                        >Sorteer op 24h%
                        </ButtonSort>
                    </div>
                </div>


                {cryptoStats.length > 0 ? (
                    <ul className="coinlist">
                        {cryptoStats.map((coin) => (
                            <CryptoInfoHome
                                key={coin.symbol}
                                marketCapRank={coin.name}
                                image={coin.logo}
                                marketCap={coin.marketCap}
                                price={coin.price}
                                change={coin.changePercent}
                            />
                        ))}
                    </ul>
                ) : (
                    <p>Bezig met laden.. </p>
                )}
            </section>

        </>
    );
}


export default Home;