import './PortfolioPage.css';
import axios from 'axios';
import {useState, useEffect} from "react";
import sortData from "../../helpers/sortData.js"
import CryptoInfoPortfolio from "../../components/cryptoInfoPortfolio/CryptoInfoPortfolio.jsx";
import calculateTotal from "../../helpers/calculateTotal.js"

function PortfolioPage() {

    const [cryptoStats, setCryptoStats] = useState([])
    const [cryptoBalance, setCryptoBalance] = useState({});
    const [walletAdress, setwalletAdress] = useState({});
    const [isButtonFetched, setIsButtonFetched] = useState({});

    const [askPrices, setAskPrices] = useState({});

    useEffect(()=>{

        async function fetchData() {

            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd', // Huidige prijs in USD
                        ids: 'bitcoin,ethereum,polkadot,solana,dogecoin,ripple', // Specificeer de crypto's
                    },
                });

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

        async function fetchAskPrices() {
            try {
                const response = await axios.get('https://api.binance.com/api/v3/ticker/bookTicker');

                const filteredPrices = {
                    bitcoin: response.data.find((coin) => coin.symbol === "BTCUSDT")?.askPrice || 0,
                    ethereum: response.data.find((coin) => coin.symbol === "ETHUSDT")?.askPrice || 0,
                    polkadot: response.data.find((coin) => coin.symbol === "DOTUSDT")?.askPrice || 0,
                    solana: response.data.find((coin) => coin.symbol === "SOLUSDT")?.askPrice || 0,
                    dogecoin: response.data.find((coin) => coin.symbol === "DOGEUSDT")?.askPrice || 0,
                    xrp: response.data.find((coin) => coin.symbol === "XRPUSDT")?.askPrice || 0
                };

                setAskPrices(filteredPrices);
                console.log("Ask Prices:", filteredPrices);
            } catch (error) {
                console.error("Error fetching ask prices:", error);
            }
        }

        fetchAskPrices();

    },[]);

    function sortPrice() {
        const sortedStats = sortData(cryptoStats, "price", "desc");
        setCryptoStats((sortedStats))

    }

    function sortPercent() {
        const sortedStats = sortData(cryptoStats, "changePercent", "desc");
        setCryptoStats((sortedStats))

    }

    const handleInputChange = (event, blockchain) => {
        setwalletAdress({
            ...walletAdress,
            [blockchain]: event.target.value,
        })
    }


    const fetchWalletData = async (blockchain) => {

        const API_KEY = import.meta.env.VITE_API_KEY;
        const BASE_URL = 'https://svc.blockdaemon.com'; // Blockdaemon API basis-URL


        try {
            const response = await axios.get(`${BASE_URL}/universal/v1/${blockchain}/mainnet/account/${walletAdress[blockchain]}`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            console.log(response)
            setCryptoBalance({...cryptoBalance, [blockchain]: response.data[0]})

            setIsButtonFetched((prevState) => ({
                ...prevState,
                [blockchain]: true,
            }));

        } catch (e) {
            console.error(e);
        }
    }

    const totalPortfolioValue = calculateTotal(cryptoBalance, askPrices);

    return (<>
            <header className="header outer-content-container">
                <div data-layer="BitGo" className="Bitgo">Portfolio</div>
            </header>
<div className='Total'>
    <h2>Totale verkoopwaarde: ${totalPortfolioValue} USD</h2>
</div>
            <section className="section-home-branding outer-content-container">

                    <div className="portfolio-page">
                        {['bitcoin', 'ethereum', 'polkadot', 'solana', 'dogecoin', 'xrp'].map((blockchain) => {
                            const blockchainSymbol = {
                                bitcoin: 'btc',
                                ethereum: 'eth',
                                polkadot: 'dot',
                                solana: 'sol',
                                dogecoin: 'doge',
                                xrp: 'xrp'
                            }[blockchain];

                            const blockchainStats = cryptoStats.find(stats => stats.symbol === blockchainSymbol);

                            return (
                                <CryptoInfoPortfolio
                                    key={blockchain}
                                    blockchain={blockchain}
                                    walletAdress={walletAdress[blockchain] || ''}
                                    handleInputChange={handleInputChange}
                                    fetchWalletData={fetchWalletData}
                                    isButtonFetched={isButtonFetched[blockchain]}
                                    cryptoBalance={cryptoBalance[blockchain]}
                                    cryptoStats={blockchainStats} // Pass correct stats
                                />
                            );
                        })}

                    </div>

            </section>

        </>
    );
}

export default PortfolioPage;