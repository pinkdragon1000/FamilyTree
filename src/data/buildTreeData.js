/**
 * Builds the flat tree data structure from nested family data
 * Automatically generates IDs and unions from the hierarchical structure
 */

import { familyData } from "./familyData.js";

// Maps to track generated data
let personId = 1;
let unionId = 1;
const persons = {};
const personNameToId = {}; // "FamilyName.PersonName" -> id
const pendingRefs = []; // References to resolve after first pass
const foundingCouples = []; // Track founding couples with their IDs
const unionPhotos = {}; // Track familyPhotos per union ID

/**
 * Generate a unique person ID
 */
function nextPersonId() {
  return `id${personId++}`;
}

/**
 * Generate a unique union ID
 */
function nextUnionId() {
  return `u${unionId++}`;
}

/**
 * Create a lookup key for a person
 */
function makeKey(familyName, personName, parentPath = "") {
  // Include parent path for disambiguation (e.g., two people named "Lakshmi Evani")
  if (parentPath) {
    return `${familyName}.${parentPath}.${personName}`;
  }
  return `${familyName}.${personName}`;
}

/**
 * Extract person data (excluding relationship fields)
 */
function extractPersonData(person) {
  const data = {};
  const skipFields = ["spouse", "children", "priorChildren", "ref", "fromFamily"];

  for (const [key, value] of Object.entries(person)) {
    if (!skipFields.includes(key)) {
      data[key] = value;
    }
  }

  return data;
}

/**
 * Process a person and their descendants
 * Returns the person's ID
 */
function processPerson(familyName, person, parentUnionId = null, parentPath = "") {
  // Skip if this is just a reference
  if (person.ref) {
    return null;
  }

  const id = nextPersonId();
  const personData = extractPersonData(person);

  // Add to persons map
  persons[id] = {
    ...personData,
    own_unions: []
  };

  if (parentUnionId) {
    persons[id].parent_union = parentUnionId;
  }

  // Register in lookup map
  const key = makeKey(familyName, person.name, parentPath);
  personNameToId[key] = id;

  // Also register without parent path for simpler lookups
  const simpleKey = makeKey(familyName, person.name);
  if (!personNameToId[simpleKey]) {
    personNameToId[simpleKey] = id;
  }

  return id;
}

/**
 * Process a couple (two people in a union) and their children
 */
function processCouple(familyName, person1, person2, parentPath = "") {
  const unionId = nextUnionId();

  // Process first person
  const id1 = processPerson(familyName, person1, null, parentPath);
  if (id1) {
    persons[id1].own_unions.push(unionId);
    // Check if this person came from another family (for ancestor navigation)
    if (person1.fromFamily?.ref) {
      pendingRefs.push({ personId: id1, ref: person1.fromFamily.ref, type: "parentage" });
    }
  }

  // Process second person (may be inline or a reference)
  let id2 = null;
  if (person2) {
    if (person2.ref) {
      // Will resolve later
      pendingRefs.push({ unionId, ref: person2.ref, type: "spouse" });
    } else {
      id2 = processPerson(familyName, person2, null, parentPath);
      if (id2) {
        persons[id2].own_unions.push(unionId);
        // Check if this person came from another family (for ancestor navigation)
        if (person2.fromFamily?.ref) {
          pendingRefs.push({ personId: id2, ref: person2.fromFamily.ref, type: "parentage" });
        }
      }
    }
  }

  return { unionId, id1, id2 };
}

/**
 * Process children of a union
 */
function processChildren(familyName, children, parentUnionId, parentPath = "") {
  if (!children || children.length === 0) return;

  for (const child of children) {
    const childId = processPerson(familyName, child, parentUnionId, parentPath);
    if (!childId) continue;

    const newParentPath = parentPath ? `${parentPath}.${child.name}` : child.name;

    // If child has a spouse, create a union for them
    if (child.spouse) {
      const childUnionId = nextUnionId();
      persons[childId].own_unions.push(childUnionId);

      if (child.spouse.ref) {
        pendingRefs.push({ unionId: childUnionId, ref: child.spouse.ref, type: "spouse" });
      } else {
        // Inline spouse - married into the family
        const spouseId = processPerson(familyName, child.spouse, null, newParentPath);
        if (spouseId) {
          persons[spouseId].own_unions.push(childUnionId);
          // Check if this spouse came from another family (for ancestor navigation)
          if (child.spouse.fromFamily?.ref) {
            pendingRefs.push({ personId: spouseId, ref: child.spouse.fromFamily.ref, type: "parentage" });
          }
        }

        // Handle prior children from spouse's previous marriage
        if (child.spouse.priorChildren) {
          const priorUnionId = nextUnionId();
          persons[spouseId].own_unions.unshift(priorUnionId); // Add to beginning

          for (const priorChild of child.spouse.priorChildren) {
            const priorChildId = processPerson(familyName, priorChild, priorUnionId, newParentPath);
            if (priorChildId && priorChild.spouse) {
              const priorChildUnionId = nextUnionId();
              persons[priorChildId].own_unions.push(priorChildUnionId);

              if (!priorChild.spouse.ref) {
                const priorSpouseId = processPerson(familyName, priorChild.spouse, null, newParentPath);
                if (priorSpouseId) {
                  persons[priorSpouseId].own_unions.push(priorChildUnionId);
                }
              }

              // Process prior child's children
              if (priorChild.children) {
                processChildren(familyName, priorChild.children, priorChildUnionId, newParentPath);
              }
            }
          }
        }
      }

      // Store family photos for this union
      if (child.familyPhotos) {
        unionPhotos[childUnionId] = child.familyPhotos;
      }

      // Process this child's children
      if (child.children) {
        processChildren(familyName, child.children, childUnionId, newParentPath);
      }
    } else if (child.children) {
      // Child has children but no spouse defined (single parent or spouse unknown)
      const childUnionId = nextUnionId();
      persons[childId].own_unions.push(childUnionId);
      processChildren(familyName, child.children, childUnionId, newParentPath);
    }
  }
}

/**
 * Process a founding family
 */
function processFamily(familyName, family) {
  const [founder1, founder2] = family.founders;
  const { unionId, id1, id2 } = processCouple(familyName, founder1, founder2);

  // Store family photos for this founding union
  if (family.familyPhotos) {
    unionPhotos[unionId] = family.familyPhotos;
  }

  // Track founding couple
  const mainFamilies = ["Robinson", "Davis", "Royyuru", "Viswanadham"];
  const secondaryFamilies = ["Evani", "Furbee", "Long", "Conant", "Zuber"];
  const allFamilies = [...mainFamilies, ...secondaryFamilies]; // Evani reachable via "View Ancestors"

  if (allFamilies.includes(familyName)) {
    foundingCouples.push({
      ids: [id1, id2].filter(Boolean),
      name: familyName,
      isMainFamily: mainFamilies.includes(familyName) // false for Evani
    });
  }

  // Process children
  if (family.children) {
    processChildren(familyName, family.children, unionId);
  }
}

/**
 * Find a person ID by reference path
 */
function findPersonByRef(ref) {
  const parts = ref.split(".");
  const familyName = parts[0];
  const personName = parts[parts.length - 1];

  // Try full path
  let targetId = personNameToId[ref];

  // Try family + person name
  if (!targetId) {
    targetId = personNameToId[`${familyName}.${personName}`];
  }

  // Try with intermediate path
  if (!targetId && parts.length > 2) {
    const intermediatePath = parts.slice(1, -1).join(".");
    targetId = personNameToId[`${familyName}.${intermediatePath}.${personName}`];
  }

  return targetId;
}

/**
 * Resolve cross-family references
 */
function resolveRefs() {
  for (const pending of pendingRefs) {
    const { ref, type } = pending;
    const targetId = findPersonByRef(ref);

    if (!targetId || !persons[targetId]) {
      console.warn(`Could not resolve reference: ${ref}`);
      continue;
    }

    if (type === "spouse") {
      // Add to union as spouse
      const { unionId } = pending;
      if (!persons[targetId].own_unions.includes(unionId)) {
        persons[targetId].own_unions.push(unionId);
      }
    } else if (type === "parentage") {
      // Set parent_union - find the union where targetId is a parent
      const { personId } = pending;
      const targetPerson = persons[targetId];
      if (targetPerson?.own_unions?.length > 0) {
        // Use the first union of the target as the parent union
        persons[personId].parent_union = targetPerson.own_unions[0];
      }
    }
  }
}

/**
 * Generate unions from persons data
 */
function getUnions() {
  const unions = {};

  for (const [personId, person] of Object.entries(persons)) {
    for (const unionId of person.own_unions) {
      if (unionId in unions) {
        unions[unionId].partner.push(personId);
      } else {
        const photos = unionPhotos[unionId];
        unions[unionId] = { partner: [personId], children: [], ...(photos && { familyPhotos: photos }) };
      }
    }

    if (person.parent_union) {
      const parentUnion = person.parent_union;
      if (parentUnion in unions) {
        unions[parentUnion].children.push(personId);
      } else {
        unions[parentUnion] = { partner: [], children: [personId] };
      }
    }
  }

  return unions;
}

/**
 * Generate links from unions
 */
function getLinks(unions) {
  const links = [];

  for (const [unionId, union] of Object.entries(unions)) {
    for (const partner of union.partner) {
      links.push([partner, unionId]);
    }
    for (const child of union.children) {
      links.push([unionId, child]);
    }
  }

  return links;
}

/**
 * Build the complete tree data structure
 */
export function buildTreeData() {
  // Reset state
  personId = 1;
  unionId = 1;
  Object.keys(persons).forEach(k => delete persons[k]);
  Object.keys(personNameToId).forEach(k => delete personNameToId[k]);
  pendingRefs.length = 0;
  foundingCouples.length = 0;
  Object.keys(unionPhotos).forEach(k => delete unionPhotos[k]);

  // Process each family
  for (const [familyName, family] of Object.entries(familyData)) {
    processFamily(familyName, family);
  }

  // Resolve cross-family references
  resolveRefs();

  // Build unions and links
  const unions = getUnions();
  const links = getLinks(unions);

  return {
    start: "id1",
    persons: { ...persons },
    unions,
    links,
    foundingCouples: [...foundingCouples]
  };
}

// Export the built data
export const data = buildTreeData();

// Export main founding couples for card view (4 families)
export const INITIAL_COUPLES = data.foundingCouples.filter(c => c.isMainFamily);

// Export all founding couples including Evani (for ancestor navigation)
export const ALL_FOUNDING_COUPLES = data.foundingCouples;

// For debugging - export the lookup map
export const debugLookup = () => ({ ...personNameToId });
