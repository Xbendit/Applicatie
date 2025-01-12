import './PortfolioPage.css';
import logo from '../../assets/logo-white.png';
import billboard from '../../assets/billboard-logo.png';
import axios from 'axios';
import {useState, useEffect} from "react";
import sortData from "../../helpers/sortData.js"

function PortfolioPage() {

    const [cryptoStats, setCryptoStats] = useState([])

    useEffect(() => {

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

    }, []);

    function sortPrice() {
        const sortedStats = sortData(cryptoStats, "price", "desc");
        setCryptoStats((sortedStats))

    }

    function sortPercent() {
        const sortedStats = sortData(cryptoStats, "changePercent", "desc");
        setCryptoStats((sortedStats))

    }


    /*const [cryptoBalance,setCryptoBalance] = useState(null)
        const [inputValue, setInputValue] = useState('')
        const [blockchaintype ,setBlockchaintype] = useState('')


        const handleInputChange = (event) => {
            setInputValue(event.target.value)
        }

        async function fetchWalletData() {
            /!*const walletAddress = 'bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4'*!/
            const API_KEY = 'zpka_cc14c066ab584442aee71a97ae663a32_2b39c313';
            const BASE_URL = 'https://svc.blockdaemon.com'; // Blockdaemon API basis-URL
            const blockchain = 'bitcoin';

            try {
                const response = await axios.get(`${BASE_URL}/universal/v1/${blockchain}/mainnet/account/${inputValue}`,{
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
                console.log(response)
        setCryptoBalance(response.data)


            } catch (e) {
                console.error(e);
            }
        }*/


    const [cryptoBalance, setCryptoBalance] = useState({
        bitcoin: null,
        ethereum: null,
    },)

    const [walletAdress, setwalletAdress] = useState({
        bitcoin: '',
        ethereum: '',
    })

    /*const [blockchaintype ,setBlockchaintype] = useState('')*/


    const handleInputChange = (event, blockchain) => {
        setwalletAdress({
            ...walletAdress,
            [blockchain]: event.target.value,
        })
    }

    const fetchWalletData = async (blockchain) => {

        const API_KEY =
        const BASE_URL = 'https://svc.blockdaemon.com'; // Blockdaemon API basis-URL


        try {
            const response = await axios.get(`${BASE_URL}/universal/v1/${blockchain}/mainnet/account/${walletAdress[blockchain]}`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            console.log(response)
            setCryptoBalance({...cryptoBalance, [blockchain]: response.data[0],})


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

                    <div>

                        {/* Bitcoin: bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4*/}

                        <input
                            type="text"
                            value={walletAdress.bitcoin}
                            placeholder="Public Key Bitcoin:"
                            onChange={(e) => handleInputChange(e, 'bitcoin')}
                        />

                        <button
                            onClick={() => fetchWalletData('bitcoin')}
                        > Ophalen Bitcoin balans
                        </button>


                        {cryptoBalance.bitcoin ? (
                            <p> Balans: {cryptoBalance.bitcoin?.confirmed_balance || "0"} </p>
                        ) : (
                            <p> 0 BTC </p>
                        )}

                    </div>

                    {/* Ethereum: 0x0a4c79ce84202b03e95b7a692e5d728d83c44c76*/}
                    <div>
                        <input
                            type="text"
                            value={walletAdress.ethereum}
                            placeholder="Public Key Ethereum:"
                            onChange={(e) => handleInputChange(e, 'ethereum')}
                        />

                        <button
                            onClick={() => fetchWalletData('ethereum')}
                        > Ophalen Ethereum balans
                        </button>


                        {cryptoBalance.ethereum ? (
                            <p> Balans: {cryptoBalance.ethereum?.confirmed_balance || "0"} </p>
                        ) : (
                            <p> 0 ETH </p>
                        )}

                    </div>

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