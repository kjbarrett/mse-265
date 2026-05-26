# The Cardinal

Stanford Athletics attendance prototype.

## Development (Vite)

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`). All three role views — **Student**, **RA**, and **Admin** — are migrated. Use the role switcher pill at the bottom of the page to swap between them.

## Legacy standalone

The full monolithic app (CDN React + Babel) lives in [`legacy/index.html`](legacy/index.html) and loads [`ios-frame.jsx`](ios-frame.jsx).

## Project layout

```text
src/
  App.jsx                  # Top-level shell + role switcher + tweaks panel
  components/
    ios/                   # iOS 26 device frame kit
    layout/                # PhoneViewport, BottomNav, RoleHeader, RoleSwitcher
    ui/                    # Avatar, AvatarStack, BadgeCard
    student/               # StudentShell + all student screens
    ra/                    # RAShell + Dorm/Residents/Rally screens
    admin/                 # AdminShell + Register/Dashboard/SecretWord
  hooks/                   # useCountdown, useEditMode, useTweaks
  data/                    # Static seed data
  utils/                   # Pure helpers
  styles/                  # tokens + global CSS
legacy/                    # Pre-migration standalone HTML
```

## Build

```bash
npm run build
npm run preview
```
