export function unreadReminderCount(reminders) {
  return reminders.filter((r) => !r.read).length;
}

export function markAllRemindersRead(reminders) {
  return reminders.map((r) => ({ ...r, read: true }));
}

export function toggleChallengeJoined(challenges, id) {
  return challenges.map((c) =>
    c.id === id ? { ...c, joined: !c.joined } : c,
  );
}

export function sortResidentsByPoints(residents) {
  return [...residents].sort((a, b) => b.pts - a.pts);
}
