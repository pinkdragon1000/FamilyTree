import Icon from './Icons.jsx';
import FamilyPhotoCarousel from './FamilyPhotoCarousel';

/**
 * ExpandablePersonCard - Shows a person with their spouse and expandable children
 */
function ExpandablePersonCard({
  person,
  getChildrenForPerson,
  hasChildren,
  getSpousesForPerson,
  isExpanded,
  toggleNode,
  depth = 0,
  onJumpToTree,
  getParentCoupleForPerson,
  navigateUp,
}) {
  const personHasChildren = hasChildren(person.id);
  const expanded = isExpanded(person.id);
  const familyData = expanded ? getChildrenForPerson(person.id) : [];

  // Get spouses regardless of whether there are children
  const spouses = getSpousesForPerson ? getSpousesForPerson(person.id) : [];
  const firstSpouse = spouses.length > 0 ? spouses[0] : null;

  // Expandable if has children OR has a spouse
  const isExpandable = personHasChildren || firstSpouse;

  const handleKeyDown = (e) => {
    if (isExpandable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleNode(person.id);
    }
  };

  return (
    <div
      className="expandable-person"
      style={{ marginLeft: depth > 0 ? "20px" : 0 }}
    >
      <div
        className={`expandable-person-card ${isExpandable ? "has-children" : ""}`}
        onClick={isExpandable ? () => toggleNode(person.id) : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={isExpandable ? 0 : undefined}
        role={isExpandable ? "button" : undefined}
        aria-expanded={isExpandable ? expanded : undefined}
        aria-label={
          isExpandable
            ? `${person.name}. ${expanded ? "Collapse" : "Expand"}`
            : undefined
        }
      >
        <div className="expandable-person-content">
          <PersonMini
            person={person}
            onJumpToTree={onJumpToTree}
            getParentCoupleForPerson={getParentCoupleForPerson}
            navigateUp={navigateUp}
          />

          {/* Show first spouse only when expanded */}
          {expanded && firstSpouse && (
            <>
              <span className="spouse-connector">&</span>
              <PersonMini
                person={firstSpouse}
                onJumpToTree={onJumpToTree}
                getParentCoupleForPerson={getParentCoupleForPerson}
                navigateUp={navigateUp}
                showAncestors={true}
              />
            </>
          )}
        </div>

        {isExpandable && (
          <span
            className={`expand-arrow ${expanded ? "expanded" : ""}`}
            aria-hidden="true"
          >
            {expanded ? "▼" : "▶"}
          </span>
        )}
      </div>

      {/* Expanded children */}
      {expanded &&
        familyData.map((unionData, idx) => (
          <div key={unionData.unionId} className="children-section">
            {unionData.familyPhotos && (
              <FamilyPhotoCarousel photos={unionData.familyPhotos} />
            )}

            {unionData.children.length > 0 && (
              <div className="children-list">
                {unionData.children.map((child) => (
                  <ExpandablePersonCard
                    key={child.id}
                    person={child}
                    getChildrenForPerson={getChildrenForPerson}
                    hasChildren={hasChildren}
                    getSpousesForPerson={getSpousesForPerson}
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
            {unionData.spouseOtherChildren &&
              unionData.spouseOtherChildren.length > 0 && (
                <div className="other-relationship-section">
                  <div className="other-relationship-label">
                    {unionData.spouse?.name}'s children from other relationship:
                  </div>
                  <div className="children-list">
                    {unionData.spouseOtherChildren.map((child) => (
                      <ExpandablePersonCard
                        key={child.id}
                        person={child}
                        getChildrenForPerson={getChildrenForPerson}
                        hasChildren={hasChildren}
                        getSpousesForPerson={getSpousesForPerson}
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

            {/* Show person's own children from other relationships */}
            {unionData.personOtherChildren &&
              unionData.personOtherChildren.length > 0 && (
                <div className="other-relationship-section">
                  <div className="other-relationship-label">
                    {unionData.personName}'s children from other relationship:
                  </div>
                  <div className="children-list">
                    {unionData.personOtherChildren.map((child) => (
                      <ExpandablePersonCard
                        key={child.id}
                        person={child}
                        getChildrenForPerson={getChildrenForPerson}
                        hasChildren={hasChildren}
                        getSpousesForPerson={getSpousesForPerson}
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
function PersonMini({
  person,
  onJumpToTree,
  getParentCoupleForPerson,
  navigateUp,
  showAncestors = false,
}) {
  const {
    id,
    name,
    nickname,
    birthyear,
    birthplace,
    deathyear,
    deathplace,
    profession,
    militaryService,
    otherSpouses,
    imageLink,
    gender,
  } = person;

  // Gender symbol helper
  const genderSymbol = gender === "M" ? "♂" : gender === "F" ? "♀" : null;

  // Check if this person has parents we can navigate to
  const parentCouple = getParentCoupleForPerson
    ? getParentCoupleForPerson(id)
    : null;

  const displayName = name;

  // Format birth info - only if we have real data
  const formatBirth = () => {
    if (!birthyear && !birthplace) return null;
    let text = "Born";
    if (birthyear) text += ` ${birthyear}`;
    if (birthplace) text += ` in ${birthplace}`;
    return text;
  };

  // Format death info - skip if year is unknown (~)
  const formatDeath = () => {
    if (deathyear === "~" && !deathplace) return null;
    if (!deathyear && !deathplace) return null;

    let text = "Died";
    if (deathyear && deathyear !== "~") text += ` ${deathyear}`;
    if (deathplace) text += ` in ${deathplace}`;

    if (text === "Died") return null;
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
          <span>{displayName?.charAt(0) || "?"}</span>
        </div>
      )}

      <div className="person-mini-info">
        <div className="person-mini-name">
          <span className="name-with-symbols">{displayName}{genderSymbol && <span className="gender-symbol">{genderSymbol}</span>}</span>
        </div>
        {nickname && <div className="person-mini-nickname">"{nickname}"</div>}
        {profession && (
          <div className="person-mini-profession">{profession}</div>
        )}
        {militaryService && (
          <div className="person-mini-military">🎖️ {militaryService}</div>
        )}
        {birthInfo && <div className="person-mini-birth">{birthInfo}</div>}
        {deathInfo && <div className="person-mini-death">{deathInfo}</div>}
        {otherSpouses && otherSpouses.length > 0 && (
          <div className="person-mini-other-spouses">
            Also married: {otherSpouses.map((s) => s.name).join(", ")}
          </div>
        )}
        {showAncestors && parentCouple && navigateUp && (
          <div
            className="person-mini-ancestors"
            onClick={(e) => {
              e.stopPropagation();
              navigateUp(null, [parentCouple]);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                navigateUp(null, [parentCouple]);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ancestors of ${displayName}`}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onJumpToTree(id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${displayName} in tree`}
          >
            <Icon name="tree" />
            View in Tree
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpandablePersonCard;
