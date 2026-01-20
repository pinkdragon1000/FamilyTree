import { useEffect } from 'react';
import { useFamilyTree } from '../hooks/useFamilyTree';
import ExpandablePersonCard from './ExpandablePersonCard';

/**
 * CardView component displays family members starting with 4 founding couples,
 * with level-by-level drill-down and ancestor navigation
 */
function CardView({ data, navStack, setNavStack, onJumpToTree, searchTargetId, onSearchTargetHandled }) {
  const {
    families,
    toggleNode,
    isExpanded,
    getChildrenForPerson,
    hasChildren,
    getSpousesForPerson,
    navigateUp,
    getParentCoupleForPerson,
    navigateToPersonInCards
  } = useFamilyTree(data, navStack, setNavStack);

  // Handle search navigation
  useEffect(() => {
    if (searchTargetId) {
      const targetId = navigateToPersonInCards(searchTargetId);
      onSearchTargetHandled();

      // Scroll to the target after a short delay for DOM to update
      if (targetId) {
        setTimeout(() => {
          const targetElement = document.querySelector(`[data-person-id="${targetId}"]`);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a brief highlight effect
            targetElement.classList.add('search-highlight');
            setTimeout(() => {
              targetElement.classList.remove('search-highlight');
            }, 2000);
          }
        }, 100);
      }
    }
  }, [searchTargetId, navigateToPersonInCards, onSearchTargetHandled]);

  return (
    <div className="card-view">
      {families.map((family) => {
        const familyExpanded = isExpanded(family.id);

        return (
          <section key={family.id} className="family-section" data-family-id={family.id}>
            <div className="family-card">
              {/* Family Header */}
              <div
                className="family-card-header"
                onClick={() => toggleNode(family.id)}
              >
                <h3 className="family-card-title">{family.name} Family</h3>
                <div className="family-card-meta">
                  <span className="descendant-count">
                    {family.totalDescendants} descendants
                  </span>
                  <span className={`expand-arrow ${familyExpanded ? 'expanded' : ''}`}>
                    {familyExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {/* Founding couple display */}
              <div className="founding-couple">
                {family.couple.map((person, idx) => {
                  // Check if this specific person has parents
                  const personParents = family.parentsInfo.parentCouples.find(
                    pc => pc.childName === person.name?.replace(/[*⟷½]/g, '').trim()
                  );

                  return (
                    <div key={person.id} className="founder-person">
                      <FounderMini
                        person={person}
                        onViewAncestors={personParents ? () => navigateUp(family.id, [personParents]) : null}
                        onJumpToTree={onJumpToTree}
                      />
                      {idx === 0 && family.couple.length > 1 && (
                        <span className="couple-connector">&</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct children (first level) */}
              {familyExpanded && family.directChildren.length > 0 && (
                <div className="direct-children">
                  <div className="children-label">Children:</div>
                  <div className="children-list">
                    {family.directChildren.map(child => (
                      <ExpandablePersonCard
                        key={child.id}
                        person={child}
                        getChildrenForPerson={getChildrenForPerson}
                        hasChildren={hasChildren}
                        getSpousesForPerson={getSpousesForPerson}
                        isExpanded={isExpanded}
                        toggleNode={toggleNode}
                        depth={0}
                        onJumpToTree={onJumpToTree}
                        getParentCoupleForPerson={getParentCoupleForPerson}
                        navigateUp={navigateUp}
                      />
                    ))}
                  </div>
                </div>
              )}

              {familyExpanded && family.directChildren.length === 0 && (
                <div className="no-children">No children recorded</div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Founder mini display (slightly larger than regular PersonMini)
 * Shows all tooltip info: name, nickname, profession, birth/death with places
 * Excludes any info that would show question marks
 */
function FounderMini({ person, onViewAncestors, onJumpToTree }) {
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

  const isAdopted = name?.includes('*');
  const isDivorced = name?.includes('⟷');
  const isFromOtherMarriage = name?.includes('½');
  const displayName = name?.replace(/[*⟷½]/g, '').trim();

  // Format birth info - only if we have real data (no question marks)
  const formatBirth = () => {
    if (!birthyear && !birthplace) return null;
    let text = 'Born';
    if (birthyear) text += ` ${birthyear}`;
    if (birthplace) text += ` in ${birthplace}`;
    return text;
  };

  // Format death info - skip if year is unknown (~)
  const formatDeath = () => {
    // Skip entirely if death year is unknown (~) and no place
    if (deathyear === '~' && !deathplace) return null;
    if (!deathyear && !deathplace) return null;

    let text = 'Died';
    // Only add year if it's not unknown
    if (deathyear && deathyear !== '~') text += ` ${deathyear}`;
    if (deathplace) text += ` in ${deathplace}`;

    // If we only have "Died" with no actual info, skip it
    if (text === 'Died') return null;
    return text;
  };

  const birthInfo = formatBirth();
  const deathInfo = formatDeath();

  return (
    <div className="founder-mini" data-person-id={id}>
      {imageLink ? (
        <div className="founder-mini-photo">
          <img src={imageLink} alt={displayName} />
        </div>
      ) : (
        <div className="founder-mini-photo founder-mini-photo-placeholder">
          <span>{displayName?.charAt(0) || '?'}</span>
        </div>
      )}

      <div className="founder-mini-info">
        <div className="founder-mini-name">
          {displayName}
          {isAdopted && <span className="symbol-text symbol-adopted" title="Adopted"> *</span>}
          {isFromOtherMarriage && <span className="symbol-text symbol-other-marriage" title="From another marriage"> ½</span>}
          {isDivorced && <span className="symbol-text symbol-divorced" title="Divorced"> ⟷</span>}
        </div>
        {nickname && <div className="founder-mini-nickname">"{nickname}"</div>}
        {profession && <div className="founder-mini-profession">{profession}</div>}
        {birthInfo && <div className="founder-mini-birth">{birthInfo}</div>}
        {deathInfo && <div className="founder-mini-death">{deathInfo}</div>}
        {onViewAncestors && (
          <div
            className="founder-mini-ancestors"
            onClick={(e) => {
              e.stopPropagation();
              onViewAncestors();
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

export default CardView;
