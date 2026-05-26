export function applyUserDormRank(leaderboard, dormName, dormRank) {
  return leaderboard.map((d) =>
    d.dorm === dormName ? { ...d, rank: dormRank, isYours: true } : d,
  );
}
