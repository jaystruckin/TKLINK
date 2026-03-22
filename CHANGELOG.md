# Changelog

All notable changes to TKLINK will be documented here.

---

## [0.1.2] - 2026-03-22

### Improved

- Added GitHub Pages deployment status badge to README
- Service worker now pre-caches all PWA icon assets (icon.svg, icon-192.png, icon-512.png) for full offline support
- Bumped service worker cache to v2

---

## [0.1.1] - 2026-03-21

### Added

- Trial link on login screen — "No account? Try Demo" lets users explore the app with simulated T409 telemetry data
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
