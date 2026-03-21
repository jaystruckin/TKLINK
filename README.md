# TKLINK 🚛

> Live truck telematics for drivers. Built by a driver, for drivers.

**TKLINK** is a lightweight web app that gives truck drivers direct access to live engine telematics, ECU data, fault codes and GPS — straight from their phone browser. No installs, no fleet manager needed, just the data you need to keep your truck safe on the road.

---

## Features

### 🔴 ENGINE
- Live RPM
- Coolant temperature
- Oil pressure & temperature
- Turbo boost pressure
- Exhaust temperature
- Engine load %
- Fuel consumption rate (L/hr)

### 🟡 AFTERTREATMENT
- DEF (AdBlue) level %
- DPF soot load %
- Regen status
- Fuel level %

### ⚙️ DRIVETRAIN
- Current gear
- Transmission temperature
- Input/output shaft RPM
- Retarder status
- Front & rear air pressures
- Diff temperature
- Vehicle speed & odometer
- Battery voltage & alternator output
- Ambient temperature

### 🔧 ECU DATA
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

### ⚠️ FAULT CODES
- All active & inactive fault codes
- Full SPN & FMI codes
- Fault descriptions
- Occurrence count
- Read only — no clearing

### 📍 GPS
- Live coordinates
- Direct Google Maps link
- GPS speed & heading
- Ignition status

### 📤 MECHANIC REPORTS
- One tap engine report
- One tap ECU report
- Share via SMS, WhatsApp, email

---

## How It Works

```
MacTrack device (installed in truck)
        ↓
Cellular → MacTrack cloud
        ↓
TKLINK logs in with your credentials
        ↓
Pulls only your truck's data
        ↓
Displays clean on your phone
        ↓
Refreshes every 5 seconds
```

**Read only.** TKLINK never writes, edits or sends commands to the vehicle. It only reads.

---

## Open TKLINK

👉 **[Open TKLINK](https://jaystruckin.github.io/TKLINK/index.html)**

### Test It Now (Demo Mode)

No MacTrack account needed — jump straight into the app with simulated T909 data:

👉 **[Launch Demo](https://jaystruckin.github.io/TKLINK/index.html?demo)**

Or open the app and tap the **TEST WITH DEMO DATA** button on the login screen.

Demo mode shows realistic engine, drivetrain, ECU, GPS and fault data that refreshes every 5 seconds.

📖 **[Full trial guide with ghost links to every tab → LEARN.md](LEARN.md)**

### Direct Page Links

Jump straight to a specific tab by adding a hash to the URL:

| Page | Link |
|------|------|
| Engine | `index.html#engine` |
| Drivetrain | `index.html#drivetrain` |
| Faults | `index.html#faults` |
| ECU | `index.html#ecu` |
| GPS | `index.html#gps` |

These work with demo mode too: `index.html?demo#engine`

---

## Setup

1. Open the link above in your phone browser
2. Enter your MacTrack portal URL
3. Enter your MacTrack username & password
4. Enter your vehicle ID or truck number
5. Tap **CONNECT**

No app store. No install. Just open and go.

---

## Requirements

- MacTrack account with access to your vehicle
- Any modern phone browser (Chrome, Safari)
- MacTrack telematics hardware installed in truck
- Internet connection (4G/5G)

---

## Tech Stack

- Pure HTML / CSS / JavaScript
- No frameworks, no dependencies
- Single file — runs anywhere
- Mobile first design

---

## Roadmap

- [ ] MacTrack API integration (full live data)
- [ ] Push notifications for critical alerts
- [ ] Trip history & logging
- [ ] Multiple truck support
- [ ] Android home screen app (PWA)
- [ ] Offline fault code database
- [ ] J1939 direct Bluetooth connection (future)

---

## Security

- Credentials stored locally on device only
- No data sent anywhere except MacTrack servers
- Read only access — zero write permissions
- No tracking, no analytics, no ads

---

## License

MIT — free to use, modify and share.
