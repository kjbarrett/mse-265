export function percentClamped(value, max) {
  return Math.min(100, (value / max) * 100);
}

export function prizeEligibility(totalPoints, threshold) {
  const progress = percentClamped(totalPoints, threshold);
  return {
    progress,
    isEligible: totalPoints >= threshold,
  };
}

export function publishedEventCount(events) {
  return events.filter((e) => e.published).length;
}

export function avgPoints(residents) {
  if (!residents.length) return 0;
  const total = residents.reduce((sum, r) => sum + r.pts, 0);
  return Math.round(total / residents.length);
}
