import { useState } from "react";
import { REMINDERS_DATA } from "../../data/index.js";
import { unreadReminderCount } from "../../utils/reminders.js";
import { BottomNav } from "../layout/BottomNav.jsx";
import { CheckInScreen } from "./CheckInScreen.jsx";
import { GamesScreen } from "./GamesScreen.jsx";
import { HomeScreen } from "./HomeScreen.jsx";
import { LeaderboardScreen } from "./LeaderboardScreen.jsx";
import { OnboardingScreen } from "./OnboardingScreen.jsx";
import { PhotoUploadScreen } from "./PhotoUploadScreen.jsx";
import { ProfileScreen } from "./ProfileScreen.jsx";
import { SocialScreen } from "./SocialScreen.jsx";

export function StudentShell({
  tweaks,
  skipOnboarding = false,
  onOnboardingComplete,
}) {
  const [studentScreen, setStudentScreen] = useState(
    skipOnboarding ? "main" : "onboarding",
  );
  const [activeTab, setActiveTab] = useState("home");
  const [reminders, setReminders] = useState(REMINDERS_DATA);

  const unreadNotifs = unreadReminderCount(reminders);

  if (studentScreen === "onboarding") {
    return (
      <OnboardingScreen
        onComplete={() => {
          setStudentScreen("main");
          onOnboardingComplete?.();
        }}
      />
    );
  }

  if (studentScreen === "checkin") {
    return (
      <CheckInScreen onSuccess={() => setStudentScreen("photo")} />
    );
  }

  if (studentScreen === "photo") {
    return (
      <PhotoUploadScreen
        tweaks={tweaks}
        onDone={() => setStudentScreen("main")}
      />
    );
  }

  const handleCheckIn = () => setStudentScreen("checkin");

  const mainScreens = {
    home: (
      <HomeScreen tweaks={tweaks} onCheckIn={handleCheckIn} />
    ),
    leaderboard: <LeaderboardScreen tweaks={tweaks} />,
    games: <GamesScreen tweaks={tweaks} />,
    social: (
      <SocialScreen reminders={reminders} setReminders={setReminders} />
    ),
    profile: <ProfileScreen tweaks={tweaks} />,
  };

  return (
    <>
      {mainScreens[activeTab] ?? mainScreens.home}
      <BottomNav
        active={activeTab}
        setActive={setActiveTab}
        notifCount={activeTab !== "social" ? unreadNotifs : 0}
      />
    </>
  );
}
