# Changelog

All notable changes to TKLINK will be documented here.

---

## [0.2.0] - 2026-03-18

### Full Privacy Masking

- Removed all third-party branding and external references
- Removed Google Fonts — replaced with system fonts (zero external requests)
- Removed GPS tab entirely — coordinates never displayed
- Removed Google Maps link
- Removed "Send Report to Mechanic" share buttons (engine + ECU)
- Removed navigator.share and sendBeacon — all outbound data blocked
- Removed all outbound API login/fetch calls — app runs local-only
- Added WebRTC IP leak protection — IP address never exposed
- Added Geolocation API blocking — device location never accessed
- Added location spoofing engine — randomizes coordinates across 6 global regions
- Added Content Security Policy meta tag
- Added privacy badge in header showing masked status
- Replaced all external font references with system font stack
- Removed all third-party service names and phone numbers
- App identity fully masked — branded only as TKLINK

---

## [0.1.0] - 2026-03-18

### Initial Release

- Login screen with portal URL, username, password and vehicle ID
- ENGINE tab: RPM, coolant temp, oil pressure, oil temp, turbo boost, exhaust temp, engine load, fuel rate
- AFTERTREATMENT: DEF level, DPF soot %, regen status, fuel level
- DRIVETRAIN tab: gear, transmission temp, shaft RPM, air pressures, diff temp, speed, odometer, battery, alternator, ambient temp
- ECU tab: engine model, CPL group, rated HP, torque, part numbers, software version, calibration date, serial numbers, emission cert, all programmed parameters
- FAULTS tab: all active and inactive fault codes with SPN, FMI, description and count
- Colour coded gauges: green / yellow / red warning states
- Alert bar for critical conditions
- 5 second live refresh
- Dark industrial UI theme
- Single file — no install required
- Mobile first design
