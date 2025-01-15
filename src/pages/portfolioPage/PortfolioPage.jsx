import './PortfolioPage.css';
import logo from '../../assets/logo-white.png';
import billboard from '../../assets/billboard-logo.png';
import axios from 'axios';
import {useState, useEffect} from "react";
import sortData from "../../helpers/sortData.js"
import calculateWaarde from "../../helpers/calculateWaarde.js";
import calculateUnit from "../../helpers/calculateUnit.js";

function PortfolioPage() {

    const [cryptoStats, setCryptoStats] = useState([])

    useEffect(()=>{

        async function fetchData() {

            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd', // Huidige prijs in USD
                        ids: 'bitcoin,ethereum,polkadot,solana,dogecoin,ripple', // Specificeer de crypto's
                    },
                });

               /* console.log(response.data);*/

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



    function sortPrice() {
        const sortedStats = sortData(cryptoStats, "price", "desc");
        setCryptoStats((sortedStats))

    }

    function sortPercent() {
        const sortedStats = sortData(cryptoStats, "changePercent", "desc");
        setCryptoStats((sortedStats))

    }

    /*'bitcoin,ethereum,polkadot,solana,cardano,ripple'*/

    const [cryptoBalance, setCryptoBalance] = useState({
        bitcoin: null,
        ethereum: null,
        polkadot: null,
        solana: null,
        dogecoin: null,
        xrp: null,
    })

    const [walletAdress, setwalletAdress] = useState({
        bitcoin: '',
        ethereum: '',
        polkadot: '',
        solana: '',
        dogecoin: '',
        xrp: '',
    })




    const handleInputChange = (event, blockchain) => {
        setwalletAdress({
            ...walletAdress,
            [blockchain]: event.target.value,
        })
    }

    const [isButtonFetched, setIsButtonFetched] = useState(false);

    const fetchWalletData = async (blockchain) => {

        const API_KEY = 'zpka_cc14c066ab584442aee71a97ae663a32_2b39c313';
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
            setIsButtonFetched(true)


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


                    {/* Bitcoin: bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4 */}
                    <div>

                        <input
                            type="text"
                            value={walletAdress.bitcoin}
                            placeholder="Public Key Bitcoin:"
                            onChange={(e) => handleInputChange(e, 'bitcoin')}
                        />

                        <button
                            onClick={() => fetchWalletData('bitcoin')}
                        >
                            {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>

                        {cryptoBalance.bitcoin ? (
                            <p> Balans: {calculateUnit('bitcoin',cryptoBalance.bitcoin?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 BTC </p>
                        )}

                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[0].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[0].price}</p>
                                <p>${calculateWaarde(calculateUnit('bitcoin', cryptoBalance.bitcoin?.confirmed_balance || "0"), cryptoStats[0].price)}</p>
                                <p className="coinchange">{cryptoStats[0].changePercent}%</p>
                            </>
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
                        > {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>


                        {cryptoBalance.ethereum ? (
                            <p> Balans: {calculateUnit('ethereum',cryptoBalance.ethereum?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 ETH </p>
                        )}

                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[1].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[1].price}</p>
                                <p>${calculateWaarde(calculateUnit('ethereum', cryptoBalance.ethereum?.confirmed_balance || "0"), cryptoStats[1].price)}</p>
                                <p className="coinchange">{cryptoStats[1].changePercent}%</p>
                            </>
                        )}

                    </div>


                    {/*Ripple: rMhkqz3DeU7GUUJKGZofusbrTwZe6bDyb1 */}
                    <div>
                        <input
                            type="text"
                            value={walletAdress.xrp}
                            placeholder="Public Key Ripple:"
                            onChange={(e) => handleInputChange(e, 'xrp')}
                        />

                        <button
                            onClick={() => fetchWalletData('xrp')}
                        > {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>


                        {cryptoBalance.xrp ? (
                            <p> Balans: {calculateUnit('xrp',cryptoBalance.xrp?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 XRP </p>
                        )}

                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[2].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[2].price}</p>
                                <p>${calculateWaarde(calculateUnit('xrp', cryptoBalance.xrp?.confirmed_balance || "0"), cryptoStats[2].price)}</p>
                                <p className="coinchange">{cryptoStats[2].changePercent}%</p>
                            </>
                        )}

                    </div>


                    {/*Solona: 8PjJTv657aeN9p5R2WoM6pPSz385chvTTytUWaEjSjkq */}
                    <div>
                        <input
                            type="text"
                            value={walletAdress.solana}
                            placeholder="Public Key Solana:"
                            onChange={(e) => handleInputChange(e, 'solana')}
                        />

                        <button
                            onClick={() => fetchWalletData('solana')}
                        > {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>


                        {cryptoBalance.solana ? (
                            <p> Balans: {calculateUnit('solana',cryptoBalance.solana?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 SOL </p>
                        )}

                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[3].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[3].price}</p>
                                <p>${calculateWaarde(calculateUnit('solana', cryptoBalance.solana?.confirmed_balance || "0"), cryptoStats[3].price)}</p>
                                <p className="coinchange">{cryptoStats[3].changePercent}%</p>
                            </>
                        )}

                    </div>

                    {/*Dogecoin: D94tDRhr4X9Tjgr8MG1Nrd5ARpesPAM7ZB*/}
                    <div>
                        <input
                            type="text"
                            value={walletAdress.dogecoin}
                            placeholder="Public Key DogeCoin:"
                            onChange={(e) => handleInputChange(e, 'dogecoin')}
                        />

                        <button
                            onClick={() => fetchWalletData('dogecoin')}
                        > {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>


                        {cryptoBalance.dogecoin ? (
                            <p> Balans: {calculateUnit('dogecoin',cryptoBalance.dogecoin?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 DOGE </p>
                        )}

                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[4].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[4].price}</p>
                                <p>${calculateWaarde(calculateUnit('dogecoin', cryptoBalance.dogecoin?.confirmed_balance || "0"), cryptoStats[4].price)}</p>
                                <p className="coinchange">{cryptoStats[4].changePercent}%</p>
                            </>
                        )}

                    </div>



                    {/*Polkadot: 11YYjhjmjwn3csohNDLHa9Kr38nY8kd736a7TkPVagXoRus */}
                    <div>
                        <input
                            type="text"
                            value={walletAdress.polkadot}
                            placeholder="Public Key Ethereum:"
                            onChange={(e) => handleInputChange(e, 'polkadot')}
                        />

                        <button
                            onClick={() => fetchWalletData('polkadot')}
                        > {isButtonFetched ? 'Wijzigen':'Invoeren'}
                        </button>


                        {cryptoBalance.polkadot ? (
                            <p> Balans: {calculateUnit('polkadot',cryptoBalance.polkadot?.confirmed_balance || "0")} </p>
                        ) : (
                            <p> 0 DOT </p>
                        )}
                        {cryptoStats.length > 0 && (
                            <>
                                <img src={cryptoStats[5].logo} className="coinImage" alt="Coins"/>
                                <p>${cryptoStats[5].price}</p>
                                <p>${calculateWaarde(calculateUnit('polkadot', cryptoBalance.polkadot?.confirmed_balance || "0"), cryptoStats[5].price)}</p>
                                <p className="coinchange">{cryptoStats[5].changePercent}%</p>
                            </>
                        )}

                    </div>

                </div>

            </section>

        </>
    );
}

export default PortfolioPage;