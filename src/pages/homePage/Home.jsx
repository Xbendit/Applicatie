import './Home.css';
import axios from 'axios';
import {useState, useEffect, useRef} from "react";
import sortData from "../../helpers/sortData.js"
import CryptoInfoHome from "../../components/cryptoInfoHome/CryptoInfoHome.jsx";
import ButtonSort from "../../components/button/ButtonSort.jsx";
import DetailsPanel from "../../components/detailsPanel/DetailsPanel.jsx";

function Home() {

    const [cryptoStats, setCryptoStats] = useState([])

    const [selectedCoinId, setSelectedCoinId] = useState(null);
    const [details, setDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const detailsCacheRef = useRef({});


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        ids: 'bitcoin,ethereum,polkadot,solana,cardano,ripple',
                    },
                });
                const formattedData = response.data.map((coin) => ({
                    id:coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    price: coin.current_price.toFixed(2),
                    changePercent: coin.price_change_percentage_24h.toFixed(2),
                    marketCap: coin.market_cap.toLocaleString(),
                    marketCapRank: coin.market_cap_rank,
                    logo: coin.image,
                }));
                setCryptoStats(formattedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if (!selectedCoinId) return;

        if (detailsCacheRef.current[selectedCoinId]) {
            setDetails(detailsCacheRef.current[selectedCoinId]);
            setDetailsError(null);
            return;
        }

        const controller = new AbortController();
        setLoadingDetails(true);
        setDetailsError(null);

        axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoinId}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: false,
                community_data: false,
                developer_data: false,
                sparkline: false,
            },
            signal: controller.signal,
        })
            .then((res) => {
                detailsCacheRef.current[selectedCoinId] = res.data;
                setDetails(res.data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setDetailsError('Kon coin-details niet laden');
            })
            .finally(() => setLoadingDetails(false));

        return () => controller.abort();
    }, [selectedCoinId]);



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


    function handleIconClick(coinId) {
        console.log('klik op', coinId);
        setSelectedCoinId(coinId);
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
                                key={coin.symbol} //symbol
                                id={coin.id}
                                marketCapRank={coin.name}
                                image={coin.logo}
                                marketCap={coin.marketCap}
                                price={coin.price}
                                change={coin.changePercent}

                                onIconClick={() => handleIconClick(coin.id)}
                                /*onIconClick={handleIconClick}*/

                            />
                        ))}
                    </ul>
                ) : (
                    <p>Bezig met laden.. </p>
                )}
            </section>


            <DetailsPanel
                open={!!selectedCoinId}
                loading={loadingDetails}
                error={detailsError}
                details={details}
                onClose={() => setSelectedCoinId(null)}
            />

        </>
    );
}


export default Home;