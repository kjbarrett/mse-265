/** Friends available to add (excludes already-added, matches name search). */
export function filterFriendsToAdd(allFriends, search, existingFriends) {
  const q = search.toLowerCase();
  return allFriends.filter(
    (f) =>
      f.name.toLowerCase().includes(q) &&
      !existingFriends.some((ff) => ff.name === f.name),
  );
}
