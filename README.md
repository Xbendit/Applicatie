

![logo.png](src/assets/Bitgo.png)

# BitGo CryptoApp

--> Screenshot

## Inleiding

BitGo is een Web-applicatie om op de hoogte te blijven van de koersen van belangrijke cryptocurrencies en om jouw crypto portfuille te tracken.
De applicatie bevat 4 belangrijke functionaliteiten:
1.  Je hebt de mogelijkheid tot registreren en inloggen met de Novi back-end. 

2. Op de ‘home pagina’  wordt een lijst weergegeven met crypto currencies, dit verschilt niet met de status ingelogt of niet. 
De volgende data zal meegenomen worden in de lijst (Name, Ticker,  Price, 24h%), dit aan de hand van de CoinGecko API en zal 6
belangrijke cryptocurrencies omvatten. Ook kunnen de cryptocurrencies gesorteerd worden op Price, 24h% en marketcap.  
 

3. Wanneer je als gebruiker inlogt en op de knop portfolio drukt, verschijnt er een veld waar jij voor elke crypto currency 
jouw wallet adres kan invoeren. Wanneer je op invoeren drukt, zal het aantal crypto currencies uitgelezen worden uit de blockchain 
(d.m.v. Blockdemon API) en worden weergegeven in de applicatie.  

4. Met de prijsdata vanuit de CoinGecko API, kunnen we de totale waarde van de crypto bepalen op een bepaald moment. 

## De applicatie starten

Als eerste stap is het project te clonen op github volgens de link: https://github.com/Xbendit/Applicatie

Als je het project gecloned hebt naar jouw locale machine, installeer je eerst alle dependencies door het volgende commando in de terminal te runnen:

```shell
npm install
```
Wanneer dit klaar is, kun je de applicatie starten met behulp van:

```shell
npm run dev
```

Open http://localhost:5173/ om de pagina in de browser te bekijken.

## API key's
Om de code te laten werken is het nodig de volgende API keys toe te voegen aan de code.

In de PortfolioPage.jsx moet de volgende API key toegevoegd worden: -------------

In de LoginPage.jsx en RegisterPage.jsx moet de volgende API key toegevoegd worden: 0EGScyLvFHmmJFd0N4qG

## Account gegevens

Als eerst zal je niet op de portfolio pagina kunnen komen. Hiervoor moet eerst ingelogt worden, dit kan met de volgende gegevens:
Username: benno
Wachtwoord: 12345678

## Wallets om applicatie te testen

Om de applicatie te testen kan je gebruik maken van de volgende wallets, deze kunnen ingevoerd worden in de frontend waarna er gedrukt moet worden op invoeren.

Bitcoin: bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4
Ethereum: 0x0a4c79ce84202b03e95b7a692e5d728d83c44c76
Ripple: rMhkqz3DeU7GUUJKGZofusbrTwZe6bDyb1
Solona: 8PjJTv657aeN9p5R2WoM6pPSz385chvTTytUWaEjSjkq
Dogecoin: D94tDRhr4X9Tjgr8MG1Nrd5ARpesPAM7ZB
Polkadot: 11YYjhjmjwn3csohNDLHa9Kr38nY8kd736a7TkPVagXoRus

Dit zijn random publieke adressen, maar je kan natuurlijk ook een andere wallet van het internet halen en of je eigen wallet testen!

Veel plezier met de Applicatie! 







