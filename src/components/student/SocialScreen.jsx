import { useState } from "react";
import {
  ALL_FRIENDS,
  CHALLENGES,
  FRIEND_ACTIVITY,
} from "../../data/index.js";
import { CARDINAL, CARDINAL_LIGHT } from "../../styles/tokens.js";
import {
  markAllRemindersRead,
  toggleChallengeJoined,
  unreadReminderCount,
} from "../../utils/reminders.js";
import { filterFriendsToAdd } from "../../utils/friends.js";
import { Avatar } from "../ui/Avatar.jsx";

function difficultyColor(difficulty) {
  if (difficulty === "Easy") return "#22C55E";
  if (difficulty === "Medium") return "#F59E0B";
  return "#EF4444";
}

export function SocialScreen({ reminders, setReminders }) {
  const [subTab, setSubTab] = useState("friends");
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState(ALL_FRIENDS.slice(0, 5));
  const [addedFriends, setAddedFriends] = useState([]);

  const unreadCount = unreadReminderCount(reminders);
  const filteredFriends = filterFriendsToAdd(
    ALL_FRIENDS,
    friendSearch,
    friends,
  );

  const markAllRead = () => setReminders(markAllRemindersRead(reminders));

  const toggleChallenge = (id) => {
    setChallenges((prev) => toggleChallengeJoined(prev, id));
  };

  const markReminderRead = (id) => {
    setReminders((prev) =>
      prev.map((x) => (x.id === id ? { ...x, read: true } : x)),
    );
  };

  const addFriend = (f) => {
    setFriends((prev) => [...prev, f]);
    setAddedFriends((prev) => [...prev, f.name]);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#FAFAFA",
      }}
    >
      <div
        style={{
          background: CARDINAL,
          paddingTop: 58,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              Friends
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
              Challenges, activity & alerts
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddFriend(true)}
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 12,
              padding: "7px 12px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 16 }}>+</span> Add Friend
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 0,
            background: "rgba(0,0,0,0.2)",
            borderRadius: 12,
            padding: 3,
          }}
        >
          {[
            { id: "friends", label: "Friends" },
            { id: "challenges", label: "Challenges" },
            {
              id: "reminders",
              label: `Alerts${unreadCount > 0 ? ` (${unreadCount})` : ""}`,
            },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              style={{
                flex: 1,
                padding: "7px 4px",
                borderRadius: 9,
                background: subTab === t.id ? "#fff" : "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: subTab === t.id ? 700 : 500,
                color: subTab === t.id ? CARDINAL : "rgba(255,255,255,0.75)",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ height: 14 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
        {subTab === "friends" && (
          <div
            style={{
              padding: "12px 12px 0",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#AAA",
                fontWeight: 500,
                paddingLeft: 4,
                paddingBottom: 4,
              }}
            >
              FRIEND ACTIVITY
            </p>
            {FRIEND_ACTIVITY.map((item) => (
              <div
                key={item.time + item.person.name}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "12px 14px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <Avatar person={item.person} size={36} />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1A1A1A",
                      lineHeight: "18px",
                    }}
                  >
                    <span style={{ color: item.person.color }}>
                      {item.person.name.split(" ")[0]}
                    </span>{" "}
                    {item.action}
                    {item.game && (
                      <span style={{ fontWeight: 700 }}> {item.game}</span>
                    )}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 3,
                    }}
                  >
                    <span style={{ fontSize: 11, color: "#BBB" }}>{item.time}</span>
                    {item.pts && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: CARDINAL,
                          background: CARDINAL_LIGHT,
                          borderRadius: 6,
                          padding: "1px 6px",
                        }}
                      >
                        +{item.pts} pts
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
              </div>
            ))}

            <p
              style={{
                fontSize: 12,
                color: "#AAA",
                fontWeight: 500,
                paddingLeft: 4,
                paddingTop: 8,
                paddingBottom: 4,
              }}
            >
              MY FRIENDS ({friends.length})
            </p>
            {friends.map((f) => (
              <div
                key={f.name}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <Avatar person={f} size={36} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
                    {f.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#AAA" }}>
                    {f.dorm} · {f.games} games · {f.streak}🔥 streak
                  </p>
                </div>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: f.streak > 3 ? "#22C55E" : "#DDD",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {subTab === "challenges" && (
          <div
            style={{
              padding: "12px 12px 0",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                background: CARDINAL_LIGHT,
                borderRadius: 14,
                padding: "12px 14px",
                border: `1px solid ${CARDINAL}22`,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: CARDINAL,
                  fontWeight: 600,
                  lineHeight: "18px",
                }}
              >
                🏆 Complete challenges with friends to earn bonus points!
              </p>
            </div>
            {challenges.map((c) => {
              const diffColor = difficultyColor(c.difficulty);
              return (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: c.joined
                      ? `0 2px 14px ${CARDINAL}22`
                      : "0 1px 8px rgba(0,0,0,0.06)",
                    border: c.joined
                      ? `1.5px solid ${CARDINAL}44`
                      : "1.5px solid transparent",
                    overflow: "hidden",
                  }}
                >
                  {c.joined && (
                    <div
                      style={{
                        height: 3,
                        background: `linear-gradient(90deg, ${CARDINAL}, #E85555)`,
                      }}
                    />
                  )}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 4,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#1A1A1A",
                          }}
                        >
                          {c.name}
                        </p>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: diffColor,
                            background: diffColor + "18",
                            borderRadius: 6,
                            padding: "1px 6px",
                          }}
                        >
                          {c.difficulty}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#666",
                          lineHeight: "17px",
                        }}
                      >
                        {c.desc}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#F59E0B",
                          }}
                        >
                          🏅 {c.reward}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#BBB",
                            marginLeft: 10,
                          }}
                        >
                          · Due {c.deadline}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleChallenge(c.id)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 10,
                          background: c.joined ? "#22C55E" : CARDINAL,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 700,
                          transition: "background 0.2s",
                        }}
                      >
                        {c.joined ? "✓ Joined" : "Join"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {subTab === "reminders" && (
          <div
            style={{
              padding: "12px 12px 0",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: CARDINAL,
                  fontWeight: 600,
                  textAlign: "right",
                  padding: "0 4px 4px",
                  alignSelf: "flex-end",
                }}
              >
                Mark all read
              </button>
            )}
            {reminders.map((r) => (
              <div
                key={r.id}
                role="button"
                tabIndex={0}
                onClick={() => markReminderRead(r.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") markReminderRead(r.id);
                }}
                style={{
                  background: r.read ? "#fff" : `${CARDINAL}08`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  border: r.read
                    ? "1px solid #F0F0F0"
                    : `1px solid ${CARDINAL}22`,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: r.read ? "#F5F5F5" : CARDINAL_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {r.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1A1A1A",
                      }}
                    >
                      {r.title}
                    </p>
                    {!r.read && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          background: CARDINAL,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginTop: 2,
                      lineHeight: "16px",
                    }}
                  >
                    {r.body}
                  </p>
                  <p style={{ fontSize: 11, color: "#BBB", marginTop: 4 }}>
                    {r.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddFriend && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setShowAddFriend(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowAddFriend(false);
          }}
          role="presentation"
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px 20px 0 0",
              padding: "20px 16px 40px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Add friends"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <p style={{ fontSize: 17, fontWeight: 800, color: "#1A1A1A" }}>
                Add Friends
              </p>
              <button
                type="button"
                onClick={() => setShowAddFriend(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ✕
              </button>
            </div>
            <input
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              placeholder="Search by name..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1.5px solid #EEE",
                fontSize: 14,
                outline: "none",
                marginBottom: 12,
                fontFamily: "Inter, sans-serif",
                boxSizing: "border-box",
              }}
            />
            {filteredFriends.length === 0 && (
              <p
                style={{
                  fontSize: 13,
                  color: "#BBB",
                  textAlign: "center",
                  padding: "16px 0",
                }}
              >
                No results found
              </p>
            )}
            {filteredFriends.map((f, i) => (
              <div
                key={f.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom:
                    i < filteredFriends.length - 1
                      ? "1px solid #F5F5F5"
                      : "none",
                }}
              >
                <Avatar person={f} size={36} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
                    {f.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#AAA" }}>{f.dorm}</p>
                </div>
                <button
                  type="button"
                  onClick={() => addFriend(f)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 10,
                    background: addedFriends.includes(f.name)
                      ? "#22C55E"
                      : CARDINAL,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {addedFriends.includes(f.name) ? "✓" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
