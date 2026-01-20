/**
 * ExpandablePersonCard - Shows a person with their spouse and expandable children
 */
function ExpandablePersonCard({
  person,
  getChildrenForPerson,
  hasChildren,
  isExpanded,
  toggleNode,
  depth = 0,
  onJumpToTree,
  getParentCoupleForPerson,
  navigateUp
}) {
  const personHasChildren = hasChildren(person.id);
  const expanded = isExpanded(person.id);
  const familyData = expanded ? getChildrenForPerson(person.id) : [];

  return (
    <div className="expandable-person" style={{ marginLeft: depth > 0 ? '20px' : 0 }}>
      <div
        className={`expandable-person-card ${personHasChildren ? 'has-children' : ''}`}
        onClick={personHasChildren ? () => toggleNode(person.id) : undefined}
      >
        <div className="expandable-person-content">
          <PersonMini
            person={person}
            onJumpToTree={onJumpToTree}
            getParentCoupleForPerson={getParentCoupleForPerson}
            navigateUp={navigateUp}
          />

          {/* Show first spouse inline if exists */}
          {familyData.length > 0 && familyData[0].spouse && (
            <>
              <span className="spouse-connector">&</span>
              <PersonMini
                person={familyData[0].spouse}
                onJumpToTree={onJumpToTree}
                getParentCoupleForPerson={getParentCoupleForPerson}
                navigateUp={navigateUp}
                showAncestors={true}
              />
            </>
          )}
        </div>

        {personHasChildren && (
          <span className={`expand-arrow ${expanded ? 'expanded' : ''}`}>
            {expanded ? '▼' : '▶'}
          </span>
        )}
      </div>

      {/* Expanded children */}
      {expanded && familyData.map((unionData, idx) => (
        <div key={unionData.unionId} className="children-section">
          {/* Show additional spouses for subsequent unions */}
          {idx > 0 && unionData.spouse && (
            <div className="additional-spouse">
              <span className="spouse-label">Also married to:</span>
              <PersonMini
                person={unionData.spouse}
                onJumpToTree={onJumpToTree}
                getParentCoupleForPerson={getParentCoupleForPerson}
                navigateUp={navigateUp}
                showAncestors={true}
              />
            </div>
          )}

          {unionData.children.length > 0 && (
            <div className="children-list">
              {unionData.children.map(child => (
                <ExpandablePersonCard
                  key={child.id}
                  person={child}
                  getChildrenForPerson={getChildrenForPerson}
                  hasChildren={hasChildren}
                  isExpanded={isExpanded}
                  toggleNode={toggleNode}
                  depth={depth + 1}
                  onJumpToTree={onJumpToTree}
                  getParentCoupleForPerson={getParentCoupleForPerson}
                  navigateUp={navigateUp}
                />
              ))}
            </div>
          )}

          {/* Show spouse's children from other relationships */}
          {unionData.spouseOtherChildren && unionData.spouseOtherChildren.length > 0 && (
            <div className="other-relationship-section">
              <div className="other-relationship-label">
                {unionData.spouse?.name}'s children from other relationship:
              </div>
              <div className="children-list">
                {unionData.spouseOtherChildren.map(child => (
                  <ExpandablePersonCard
                    key={child.id}
                    person={child}
                    getChildrenForPerson={getChildrenForPerson}
                    hasChildren={hasChildren}
                    isExpanded={isExpanded}
                    toggleNode={toggleNode}
                    depth={depth + 1}
                    onJumpToTree={onJumpToTree}
                    getParentCoupleForPerson={getParentCoupleForPerson}
                    navigateUp={navigateUp}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Mini person display with full tooltip info
 * Excludes any info that would show question marks
 */
function PersonMini({ person, onJumpToTree, getParentCoupleForPerson, navigateUp, showAncestors = false }) {
  const {
    id,
    name,
    nickname,
    birthyear,
    birthplace,
    deathyear,
    deathplace,
    profession,
    imageLink
  } = person;

  // Check if this person has parents we can navigate to
  const parentCouple = getParentCoupleForPerson ? getParentCoupleForPerson(id) : null;

  const displayName = name;

  // Format birth info - only if we have real data
  const formatBirth = () => {
    if (!birthyear && !birthplace) return null;
    let text = 'Born';
    if (birthyear) text += ` ${birthyear}`;
    if (birthplace) text += ` in ${birthplace}`;
    return text;
  };

  // Format death info - skip if year is unknown (~)
  const formatDeath = () => {
    if (deathyear === '~' && !deathplace) return null;
    if (!deathyear && !deathplace) return null;

    let text = 'Died';
    if (deathyear && deathyear !== '~') text += ` ${deathyear}`;
    if (deathplace) text += ` in ${deathplace}`;

    if (text === 'Died') return null;
    return text;
  };

  const birthInfo = formatBirth();
  const deathInfo = formatDeath();

  return (
    <div className="person-mini" data-person-id={id}>
      {imageLink ? (
        <div className="person-mini-photo">
          <img src={imageLink} alt={displayName} />
        </div>
      ) : (
        <div className="person-mini-photo person-mini-photo-placeholder">
          <span>{displayName?.charAt(0) || '?'}</span>
        </div>
      )}

      <div className="person-mini-info">
        <div className="person-mini-name">
          {displayName}
        </div>
        {nickname && <div className="person-mini-nickname">"{nickname}"</div>}
        {profession && <div className="person-mini-profession">{profession}</div>}
        {birthInfo && <div className="person-mini-birth">{birthInfo}</div>}
        {deathInfo && <div className="person-mini-death">{deathInfo}</div>}
        {showAncestors && parentCouple && navigateUp && (
          <div
            className="person-mini-ancestors"
            onClick={(e) => {
              e.stopPropagation();
              navigateUp(null, [parentCouple]);
            }}
          >
            ↑ View Ancestors
          </div>
        )}
        {onJumpToTree && (
          <div
            className="jump-to-tree"
            onClick={(e) => {
              e.stopPropagation();
              onJumpToTree(id);
            }}
            title="View in tree"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 8M12 8L8 5M12 8L16 5M4 10H20M4 10V20C4 21 5 22 6 22H18C19 22 20 21 20 20V10M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View in Tree
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpandablePersonCard;
