import { useState } from 'react';

function FamilyPhotoCarousel({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (!photos || photos.length === 0) return null;

  const prev = (e) => { e.stopPropagation(); setIndex((index - 1 + photos.length) % photos.length); };
  const next = (e) => { e.stopPropagation(); setIndex((index + 1) % photos.length); };

  return (
    <>
      <button
        className="family-photos-btn"
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); setIndex(0); }}
      >
        📷 Photos ({photos.length})
      </button>

      {isOpen && (
        <div className="photo-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>

            <div className="photo-modal-content">
              {photos.length > 1 && (
                <button className="photo-modal-arrow photo-modal-prev" onClick={prev} aria-label="Previous">‹</button>
              )}
              <img src={photos[index]} alt={`Family photo ${index + 1} of ${photos.length}`} className="photo-modal-img" />
              {photos.length > 1 && (
                <button className="photo-modal-arrow photo-modal-next" onClick={next} aria-label="Next">›</button>
              )}
            </div>

            {photos.length > 1 && (
              <div className="photo-modal-dots">
                {photos.map((_, i) => (
                  <span
                    key={i}
                    className={`photo-modal-dot ${i === index ? 'active' : ''}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FamilyPhotoCarousel;
