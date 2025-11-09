import './detailsPanel.css';
import { useMemo } from 'react';

export default function DetailsPanel({ open, loading, error, details, onClose }) {
    if (!open) return null;

    /*const m = details?.market_data;
    const price = m?.current_price?.usd;
    const cap = m?.market_cap?.usd;
    const change24h = m?.price_change_percentage_24h;
    const high24h = m?.high_24h?.usd;
    const low24h = m?.low_24h?.usd;*/

    /*const site = details?.links?.homepage?.[0];*/
    const site = details?.links?.homepage?.find(Boolean);
    const rawDescription = details?.description?.nl || details?.description?.en || '';
    const descriptionText = useMemo(() => stripHtml(rawDescription), [rawDescription]);

    return (
        /*<div className="details-panel" role="dialog" aria-modal="true" aria-label={`${details?.name} details`}>
            <div className="details-header">
                <div className="details-title">
                    {details?.image?.small && (
                        <img className="details-logo" src={details.image.small} alt={`${details?.name} logo`} />
                    )}
                    <strong>{details?.name}</strong>
                    {details?.symbol && <span className="details-symbol">({details.symbol.toUpperCase()})</span>}
                </div>
                <button className="details-close" onClick={onClose} aria-label="Sluit details">Sluiten</button>
            </div>

            {loading && <p>Laden…</p>}
            {error && <p className="details-error">{error}</p>}

            {!loading && !error && details && (
                <div className="details-content">
                    <p>Prijs: ${price?.toLocaleString()}</p>
                    <p>Market cap: ${cap?.toLocaleString()}</p>
                    <p>24u verandering: {change24h?.toFixed?.(2)}%</p>
                    <p>Hoog (24u): ${high24h?.toLocaleString()} • Laag (24u): ${low24h?.toLocaleString()}</p>
                    {site && <p>Website: <a href={site} target="_blank" rel="noreferrer">{site}</a></p>}
                    {details?.description?.en && (
                        <p className="details-description">{details.description.en.slice(0, 220)}…</p>
                    )}
                </div>
            )}
        </div>
    );
}*/
        <div className="details-panel" role="dialog" aria-modal="true" aria-label={`${details?.name} details`}>
            <div className="details-header">
                <div className="details-title">
                    {details?.image?.small && (
                        <img className="details-logo" src={details.image.small} alt={`${details?.name} logo`} />
                    )}
                    <strong>{details?.name}</strong>
                    {details?.symbol && <span className="details-symbol">({details.symbol.toUpperCase()})</span>}
                </div>
                <button className="details-close" onClick={onClose}>Sluiten</button>
            </div>

            {loading && <p>Laden…</p>}
            {error && <p className="details-error">{error}</p>}

            {!loading && !error && (
                <div className="details-content">
                    {descriptionText
                        ? <p className="details-description">{descriptionText}</p>
                        : <p className="details-description">Geen beschrijving beschikbaar.</p>
                    }

                    {site && (
                        <p>Website: <a href={site} target="_blank" rel="noreferrer">{site}</a></p>
                    )}
                </div>
            )}
        </div>
    );
}

function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}