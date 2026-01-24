import { useMemo, useState, useCallback } from 'react';
import { INITIAL_COUPLES, ALL_FOUNDING_COUPLES } from '../data/buildTreeData.js';

/**
 * Custom hook to manage expandable family tree for card view.
 * Supports level-by-level drill-down and navigation up to ancestors.
 */
export function useFamilyTree(data, navStack, setNavStack) {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const { persons, unions } = data;

  // Get current view from nav stack
  const currentView = navStack[navStack.length - 1];
  const canGoBack = navStack.length > 1;

  // Build family structure for current view
  const families = useMemo(() => {
    return currentView.couples.map(couple => {
      const couplePersons = couple.ids
        .map(id => ({ id, ...persons[id] }))
        .filter(p => p.name);

      // Find the union between this couple
      const unionId = findSharedUnion(couple.ids, persons);
      const directChildren = unionId ? getChildrenFromUnion(unionId, unions, persons) : [];

      // Count total descendants for display
      const totalDescendants = countAllDescendants(couple.ids, persons, unions);

      // Check if either person has parents we can navigate to
      const parentsInfo = getParentsInfo(couple.ids, persons, unions);

      return {
        id: couple.ids.join('-'),
        name: couple.name,
        couple: couplePersons,
        directChildren,
        totalDescendants,
        parentsInfo // { hasParents: bool, parentCouples: [...] }
      };
    });
  }, [currentView, persons, unions]);

  // Find ancestry path from a person to one of the founding couples (including Evani)
  // Returns { familyId, path, family } where path is array of person IDs to expand
  const findPathToInitialCouple = useCallback((targetId) => {
    const allFoundingPersonIds = new Set(ALL_FOUNDING_COUPLES.flatMap(c => c.ids));

    // BFS up through parent unions (and spouse connections) to find path to founding couple
    const visited = new Set();
    const queue = [{ id: targetId, path: [], isSpouse: false }];

    while (queue.length > 0) {
      const { id, path, isSpouse } = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);

      // Check if this person is one of the founding persons
      if (allFoundingPersonIds.has(id)) {
        // Find which family this belongs to
        const family = ALL_FOUNDING_COUPLES.find(c => c.ids.includes(id));
        return { familyId: family.ids.join('-'), path, targetIsSpouse: isSpouse, family };
      }

      const person = persons[id];
      if (!person) continue;

      // Go up through parent union
      if (person.parent_union) {
        const parentUnion = unions[person.parent_union];
        if (parentUnion?.partner) {
          for (const parentId of parentUnion.partner) {
            if (!visited.has(parentId)) {
              // Add current person to path (they need to be expanded to show target)
              queue.push({ id: parentId, path: [id, ...path], isSpouse: false });
            }
          }
        }
      } else if (person.own_unions && person.own_unions.length > 0) {
        // No parent_union - this person married in, try to find path through spouse
        for (const unionId of person.own_unions) {
          const union = unions[unionId];
          if (!union?.partner) continue;

          for (const spouseId of union.partner) {
            if (spouseId !== id && !visited.has(spouseId)) {
              // Go through spouse - the spouse needs to be expanded to show this person
              queue.push({ id: spouseId, path: [spouseId, ...path], isSpouse: true });
            }
          }
        }
      }
    }

    return null; // Not found
  }, [persons, unions]);

  // Navigate up to see ancestors
  const navigateUp = useCallback((familyId, parentCouples) => {
    if (!parentCouples || parentCouples.length === 0) return;

    const parentCouple = parentCouples[0];

    // Find the parent who is a descendant of one of the founding families
    let descendantId = null;
    for (const id of parentCouple.ids) {
      const person = persons[id];
      if (person?.parent_union) {
        descendantId = id;
        break;
      }
    }

    // If no descendant found, use first parent
    if (!descendantId) descendantId = parentCouple.ids[0];

    // Find which founding family this descendant belongs to
    const result = findPathToInitialCouple(descendantId);

    if (result) {
      // Descendant is reachable from one of the founding families
      const { familyId: foundFamilyId, path, family } = result;

      // Check if this is a main family (shown on home page) or secondary (like Evani)
      const isMainFamily = family.isMainFamily;

      if (isMainFamily) {
        // Reset to initial view first
        setNavStack([{ couples: INITIAL_COUPLES }]);

        // Expand the family and all nodes along the path
        const nodesToExpand = new Set([foundFamilyId, ...path]);
        setExpandedNodes(nodesToExpand);

        // Scroll to the parents and highlight both after DOM updates
        setTimeout(() => {
          const parentElements = parentCouple.ids
            .map(id => document.querySelector(`[data-person-id="${id}"]`))
            .filter(el => el);

          if (parentElements.length > 0) {
            // Scroll to the first parent
            parentElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight both parents
            parentElements.forEach(el => {
              el.classList.add('search-highlight');
            });

            setTimeout(() => {
              parentElements.forEach(el => {
                el.classList.remove('search-highlight');
              });
            }, 2000);
          }
        }, 150);
      } else {
        // Secondary family (like Evani) - navigate to new screen
        setExpandedNodes(new Set());
        setNavStack(prev => [...prev, {
          couples: [{ ids: family.ids, name: family.name }]
        }]);
      }
    } else {
      // Parent not reachable from founding families - navigate to new screen
      setExpandedNodes(new Set());
      setNavStack(prev => [...prev, {
        couples: parentCouples
      }]);
    }
  }, [persons, findPathToInitialCouple, setNavStack]);

  // Navigate back (to descendants)
  const navigateBack = useCallback(() => {
    setExpandedNodes(new Set());
    setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  // Get children for a specific person (for drill-down)
  const getChildrenForPerson = useCallback((personId) => {
    const person = persons[personId];
    if (!person || !person.own_unions) return [];

    const result = [];
    const seenSpouses = new Set();

    for (const unionId of person.own_unions) {
      const union = unions[unionId];
      if (!union) continue;

      const spouseId = (union.partner || []).find(id => id !== personId);
      const spouse = spouseId ? { id: spouseId, ...persons[spouseId] } : null;

      const unionChildren = (union.children || []).map(childId => ({
        id: childId,
        ...persons[childId]
      }));

      // Get spouse's children from OTHER relationships
      let spouseOtherChildren = [];
      if (spouse && !seenSpouses.has(spouseId)) {
        seenSpouses.add(spouseId);
        const spouseData = persons[spouseId];
        if (spouseData?.own_unions) {
          for (const spouseUnionId of spouseData.own_unions) {
            if (spouseUnionId === unionId) continue;
            const spouseUnion = unions[spouseUnionId];
            if (spouseUnion?.children) {
              const otherKids = spouseUnion.children.map(childId => ({
                id: childId,
                ...persons[childId]
              }));
              spouseOtherChildren = [...spouseOtherChildren, ...otherKids];
            }
          }
        }
      }

      if (unionChildren.length > 0 || spouse) {
        result.push({
          unionId,
          spouse,
          children: unionChildren,
          spouseOtherChildren: spouseOtherChildren.length > 0 ? spouseOtherChildren : null
        });
      }
    }

    return result;
  }, [persons, unions]);

  // Check if a person has children to expand
  const hasChildren = useCallback((personId) => {
    const person = persons[personId];
    if (!person || !person.own_unions) return false;

    for (const unionId of person.own_unions) {
      const union = unions[unionId];
      if (union && union.children && union.children.length > 0) {
        return true;
      }
    }
    return false;
  }, [persons, unions]);

  const toggleNode = useCallback((nodeId) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback((nodeId) => {
    return expandedNodes.has(nodeId);
  }, [expandedNodes]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  // Navigate to a specific person in card view
  const navigateToPersonInCards = useCallback((targetId) => {
    // Reset to initial view
    setNavStack([{ couples: INITIAL_COUPLES }]);

    // Find path to target
    const result = findPathToInitialCouple(targetId);
    if (!result) return null;

    const { familyId, path } = result;

    // Expand all nodes along the path (including the family)
    const nodesToExpand = new Set([familyId, ...path]);

    // Also add the target if it has children (so it appears expanded)
    const targetPerson = persons[targetId];
    if (targetPerson?.own_unions?.length > 0) {
      for (const unionId of targetPerson.own_unions) {
        const union = unions[unionId];
        if (union?.children?.length > 0) {
          nodesToExpand.add(targetId);
          break;
        }
      }
    }

    setExpandedNodes(nodesToExpand);

    return targetId; // Return for scrolling
  }, [persons, unions, findPathToInitialCouple, setNavStack]);

  // Get spouse(s) for a person (regardless of whether they have children)
  const getSpousesForPerson = useCallback((personId) => {
    const person = persons[personId];
    if (!person || !person.own_unions) return [];

    const spouses = [];
    for (const unionId of person.own_unions) {
      const union = unions[unionId];
      if (!union) continue;

      const spouseId = (union.partner || []).find(id => id !== personId);
      if (spouseId && persons[spouseId]) {
        spouses.push({ id: spouseId, ...persons[spouseId] });
      }
    }
    return spouses;
  }, [persons, unions]);

  // Get parent couple info for a single person
  const getParentCoupleForPerson = useCallback((personId) => {
    const person = persons[personId];
    if (!person?.parent_union) return null;

    const parentUnion = unions[person.parent_union];
    if (!parentUnion?.partner) return null;

    const parentIds = parentUnion.partner;
    if (parentIds.length === 0) return null;

    const firstParent = persons[parentIds[0]];
    const familyName = extractLastName(firstParent?.name);

    return {
      ids: parentIds,
      name: familyName,
      childName: person.name?.replace(/[*⟷½]/g, '').trim()
    };
  }, [persons, unions]);

  return {
    families,
    toggleNode,
    isExpanded,
    getChildrenForPerson,
    hasChildren,
    getSpousesForPerson,
    collapseAll,
    getParentCoupleForPerson,
    navigateToPersonInCards,
    // Navigation
    canGoBack,
    navigateUp,
    navigateBack
  };
}

/**
 * Find the union shared by two persons (i.e., their marriage)
 */
function findSharedUnion(personIds, persons) {
  const [id1, id2] = personIds;
  const person1 = persons[id1];
  const person2 = persons[id2];

  if (!person1?.own_unions || !person2?.own_unions) return null;

  for (const unionId of person1.own_unions) {
    if (person2.own_unions.includes(unionId)) {
      return unionId;
    }
  }
  return null;
}

/**
 * Get children from a specific union
 */
function getChildrenFromUnion(unionId, unions, persons) {
  const union = unions[unionId];
  if (!union || !union.children) return [];

  return union.children
    .map(childId => ({ id: childId, ...persons[childId] }))
    .filter(child => child.name)
    .sort((a, b) => {
      if (a.birthyear && b.birthyear) {
        return Number(a.birthyear) - Number(b.birthyear);
      }
      return (a.name || '').localeCompare(b.name || '');
    });
}

/**
 * Get parents info for a couple - finds if either person has parents
 */
function getParentsInfo(personIds, persons, unions) {
  const parentCouples = [];
  const seenUnions = new Set();

  for (const personId of personIds) {
    const person = persons[personId];
    if (!person?.parent_union) continue;

    const parentUnionId = person.parent_union;
    if (seenUnions.has(parentUnionId)) continue;
    seenUnions.add(parentUnionId);

    const parentUnion = unions[parentUnionId];
    if (!parentUnion?.partner) continue;

    // Get the parent couple
    const parentIds = parentUnion.partner;
    if (parentIds.length > 0) {
      // Derive family name from first parent's last name
      const firstParent = persons[parentIds[0]];
      const familyName = extractLastName(firstParent?.name);

      parentCouples.push({
        ids: parentIds,
        name: familyName,
        childName: person.name?.replace(/[*⟷½]/g, '').trim()
      });
    }
  }

  return {
    hasParents: parentCouples.length > 0,
    parentCouples
  };
}

/**
 * Extract last name from full name
 */
function extractLastName(name) {
  if (!name) return 'Unknown';
  const cleanName = name.replace(/[*⟷½]/g, '').trim();
  const words = cleanName.split(/\s+/);
  return words.length > 0 ? words[words.length - 1] : 'Unknown';
}

/**
 * Count all descendants of given person IDs
 */
function countAllDescendants(startIds, persons, unions) {
  const visited = new Set(startIds);
  const queue = [...startIds];
  let count = 0;

  while (queue.length > 0) {
    const currentId = queue.shift();
    const person = persons[currentId];
    if (!person) continue;

    for (const unionId of person.own_unions || []) {
      const union = unions[unionId];
      if (!union) continue;

      for (const partnerId of union.partner || []) {
        if (!visited.has(partnerId)) {
          visited.add(partnerId);
          count++;
          queue.push(partnerId);
        }
      }

      for (const childId of union.children || []) {
        if (!visited.has(childId)) {
          visited.add(childId);
          count++;
          queue.push(childId);
        }
      }
    }
  }

  return count;
}

export default useFamilyTree;
