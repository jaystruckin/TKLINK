# TKLINK

> Local-only vehicle telematics viewer. Privacy-first. Fully masked.

**TKLINK** is a lightweight web app that gives drivers direct access to live engine telematics, ECU data, and fault codes — straight from their phone browser. No installs, no external data sharing, fully masked identity.

---

## Features

### ENGINE
- Live RPM
- Coolant temperature
- Oil pressure & temperature
- Turbo boost pressure
- Exhaust temperature
- Engine load %
- Fuel consumption rate (L/hr)

### AFTERTREATMENT
- DEF level %
- DPF soot load %
- Regen status
- Fuel level %

### DRIVETRAIN
- Current gear
- Transmission temperature
- Input/output shaft RPM
- Retarder status
- Front & rear air pressures
- Diff temperature
- Vehicle speed & odometer
- Battery voltage & alternator output
- Ambient temperature

### ECU DATA
- Engine model & CPL group
- Rated HP & torque (Nm)
- ECU part number & serial
- Software version & calibration date
- Engine serial number
- Emission certification
- Governed RPM (road & cruise)
- Speed limiter setting
- Idle shutdown parameters
- Engine brake & PTO settings

### FAULT CODES
- All active & inactive fault codes
- Full SPN & FMI codes
- Fault descriptions
- Occurrence count
- Read only — no clearing

---

## Privacy & Security

TKLINK is built with privacy as the core principle:

- **IP address always hidden** — WebRTC leak protection built in
- **Location never exposed** — Geolocation API blocked, GPS tab removed
- **Location spoofing** — randomized coordinates across 6 global regions if anything queries location
- **No outbound data** — navigator.share, sendBeacon all blocked
- **No external fonts/scripts** — system fonts only, zero CDN requests
- **No analytics, tracking, ads, or beacons**
- **No third-party links** — no external service references
- **Credentials local only** — stored in memory, lost on refresh
- **Content Security Policy** enforced via meta tag

---

## Setup

1. Open `index.html` in your phone browser
2. Enter your portal URL
3. Enter your username & password
4. Enter your vehicle ID
5. Tap **CONNECT**

No app store. No install. Just open and go.

---

## Tech Stack

- Pure HTML / CSS / JavaScript
- No frameworks, no dependencies, no external requests
- Single file — runs anywhere
- Mobile first design
- System fonts only (no Google Fonts)

---

## Roadmap

- [ ] Push notifications for critical alerts
- [ ] Trip history & logging
- [ ] Multiple vehicle support
- [ ] Home screen app (PWA)
- [ ] Offline fault code database
- [ ] J1939 direct Bluetooth connection (future)

---

## License

MIT — free to use, modify and share.
