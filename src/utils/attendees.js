export function cloneAttendeesSeed(seed) {
  return Object.fromEntries(
    Object.entries(seed).map(([gameId, list]) => [gameId, [...list]]),
  );
}

export function filterFriends(allFriends, query) {
  const q = query.trim().toLowerCase();
  if (!q) return allFriends;
  return allFriends.filter(
    (f) =>
      f.name.toLowerCase().includes(q) || f.dorm.toLowerCase().includes(q),
  );
}
