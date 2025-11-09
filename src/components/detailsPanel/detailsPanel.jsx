import './detailsPanel.css';
import { useMemo } from 'react';

export default function DetailsPanel({ open, loading, error, details, onClose }) {
    if (!open) return null;

    const site = details?.links?.homepage?.find(Boolean);
    const rawDescription = details?.description?.nl || details?.description?.en || '';
    const descriptionText = useMemo(() => stripHtml(rawDescription), [rawDescription]);

    return (

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