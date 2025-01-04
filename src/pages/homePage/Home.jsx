import './Home.css';
import logo from '../../assets/logo-white.png';
import billboard from '../../assets/billboard-logo.png';
import axios from 'axios';
import {useState,useEffect} from "react";
import sortData from "../../helpers/sortData.js"


function Home() {

    const [cryptoStats, setCryptoStats] = useState([])

   useEffect(()=>{

    async function fetchData() {

        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd', // Huidige prijs in USD
                    ids: 'bitcoin,ethereum,polkadot,solana,cardano,ripple', // Specificeer de crypto's
                },
            });

            console.log(response.data);

            const formattedData = response.data.map((coin) => ({
                name: coin.name,
                symbol: coin.symbol,
                price: coin.current_price.toFixed(2), // Huidige prijs
                changePercent: coin.price_change_percentage_24h.toFixed(2), // 24-uurs verandering
                marketCap: coin.market_cap.toLocaleString(), // Market cap in leesbaar formaat
                marketCapRank:coin.market_cap_rank,
                logo: coin.image, // Logo URL
            }));

            console.log(formattedData);
            setCryptoStats(formattedData)
        } catch (error) {
            console.error('Error fetching data:', error);
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



    return (<>
        <header className="header outer-content-container">
            <div data-layer="BitGo" className="Bitgo">BitGo</div>
        </header>
        <section className="section-home-branding outer-content-container">
            <div className="inner-content-container__text-restriction">
                <h1>Hier worden de 5 belangrijkste crypto's weergegeven</h1>

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

            <section className="listcoins">
                {cryptoStats.length > 0 ? (
                    <ul>
                        {cryptoStats.map((coin) =>(
                            <li className="coinitem" key={coin.symbol}>
                                <p className="coinMCR">{coin.marketCapRank}</p>
                                <img src={coin.logo} className="coinImage" alt="Coins"/>
                                <p className="coinMC">${coin.marketCap}</p>
                                <p className="coinprice">${coin.price}</p>
                                <p className="coinchange">{coin.changePercent}%</p>
                            </li>
                        ))}
                    </ul>
                ):(
                    <p>Bezig met laden.. </p>
                )}
        </section>
    </>
    );
}


export default Home;