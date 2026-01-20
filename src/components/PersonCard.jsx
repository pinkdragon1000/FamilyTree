/**
 * PersonCard component displays individual family member information
 */
function PersonCard({ person }) {
  const {
    name,
    nickname,
    full,
    birthyear,
    birthplace,
    deathyear,
    deathplace,
    profession,
    imageLink
  } = person;

  const deathYearUnknown = deathyear === '~';
  const displayName = name;

  // Format life years
  const formatYears = () => {
    if (!birthyear && !deathyear) return null;

    let yearStr = '';
    if (birthyear) {
      yearStr = String(birthyear);
    }
    if (deathyear) {
      yearStr += ` - ${deathYearUnknown ? '?' : deathyear}`;
    } else if (birthyear) {
      yearStr += ' - Present';
    }
    return yearStr;
  };

  const years = formatYears();

  return (
    <div className="person-card">
      {imageLink ? (
        <div className="person-card-photo">
          <img src={imageLink} alt={displayName} />
        </div>
      ) : (
        <div className="person-card-photo person-card-photo-placeholder">
          <span>{displayName?.charAt(0) || '?'}</span>
        </div>
      )}

      <div className="person-card-info">
        <div className="person-card-name">
          {displayName}
      
        </div>

        {nickname && (
          <div className="person-card-nickname">"{nickname}"</div>
        )}

        {full && (
          <div className="person-card-full-name">{full}</div>
        )}

        {years && (
          <div className="person-card-years">{years}</div>
        )}

        {(birthplace || deathplace) && (
          <div className="person-card-places">
            {birthplace && <div className="person-card-place">Born: {birthplace}</div>}
            {deathplace && <div className="person-card-place">Died: {deathplace}</div>}
          </div>
        )}

        {profession && (
          <div className="person-card-profession">{profession}</div>
        )}
      </div>
    </div>
  );
}

export default PersonCard;
