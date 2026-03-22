# Changelog

All notable changes to TKLINK will be documented here.

---

## [0.2.0] - 2026-03-22

### Performance

- Reduced live data refresh interval from 5 seconds to 2 seconds for faster updates
- Replaced render-blocking `@import` font loading with non-blocking `<link rel="preload">`
- Added `preconnect` and `dns-prefetch` hints for Google Fonts domains
- Added CSS `contain` on gauge and fault cards for faster layout recalculation
- Added `will-change` hints on animated gauge bars and live dot
- Shortened gauge bar CSS transition from 0.5s to 0.3s for snappier feel
- Optimized fault list rendering with `DocumentFragment` instead of `innerHTML`
- Added 6-second timeout on login API attempts and try all endpoints in parallel
- Added 4-second timeout on live data fetch to avoid hanging requests
- Upgraded service worker to stale-while-revalidate strategy for instant repeat loads
- Pre-cached all icon files and fonts in service worker
- Bumped service worker cache version to v2

### Added

- **Find Agents** button on login screen to discover all available MacTrack agents (vehicles)
- Parallel authentication — all auth endpoints tried simultaneously for maximum speed
- Parallel agent endpoint fetching — all API variants queried at once; first successful response wins
- Full pagination — iterates all pages automatically so every agent is returned, no cap
- Agent list panel shows vehicle name, ID and online/offline status badge
- Tap any agent to auto-fill the Vehicle ID field
- Demo agents shown when MacTrack API is unreachable
- **SPEED tab** — a dedicated full-screen speedometer for at-a-glance driving use
  - Giant digital speed readout (colour-coded: green → yellow → red at speed limit)
  - GPS speed and ECU speed side-by-side with active-source badge
  - Current gear, engine RPM, and heading stat cards
  - Speed-vs-limit progress bar showing % of programmed ECU speed limit
  - Works in both live and demo modes
  - Accessible via `#speed` URL hash for direct navigation

---

## [0.1.2] - 2026-03-22

### Improved

- Added GitHub Pages deployment status badge to README
- Service worker now pre-caches all PWA icon assets (icon.svg, icon-192.png, icon-512.png) for full offline support
- Bumped service worker cache to v2

---

## [0.1.1] - 2026-03-21

### Added

- Trial link on login screen — "No account? Try Demo" lets users explore the app with simulated T909 telemetry data
- Demo data covers all tabs: engine gauges, drivetrain, faults, ECU, and GPS
- Demo data refreshes every 5 seconds with realistic value variation

---

## [0.1.0] - 2026-03-18

### Initial Release

- Login screen with MacTrack portal URL, username, password and vehicle ID
- ENGINE tab: RPM, coolant temp, oil pressure, oil temp, turbo boost, exhaust temp, engine load, fuel rate
- AFTERTREATMENT tab: DEF level, DPF soot %, regen status, fuel level
- DRIVETRAIN tab: gear, transmission temp, shaft RPM, air pressures, diff temp, speed, odometer, battery, alternator, ambient temp
- ECU tab: engine model, CPL group, rated HP, torque, part numbers, software version, calibration date, serial numbers, emission cert, all programmed parameters
- FAULTS tab: all active and inactive fault codes with SPN, FMI, description and count
- GPS tab: live coordinates, Google Maps link, speed, heading, ignition status
- Colour coded gauges: green / yellow / red warning states
- Alert bar for critical conditions
- Share engine report to mechanic via SMS/WhatsApp/email
- Share ECU report to mechanic
- 5 second live refresh
- Dark industrial UI theme
- Single file — no install required
- Mobile first design

---

## Upcoming

- Full MacTrack API integration
- Push notifications for critical alerts
- Offline fault code database
