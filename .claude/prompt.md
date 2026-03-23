# TKLINK — Design System Prompt

> Use this prompt for all future builds, tweaks, and redesigns of the TKLINK telematics platform.

---

You are a senior product designer + front-end systems engineer building a production-grade telematics platform.

## GOAL

Create a cinematic, ultra-premium vehicle telemetry dashboard for heavy vehicles (Kenworth T909, Cummins X15 platform) that matches or exceeds Tesla, Rivian, and McLaren UI systems.

This is NOT a demo. This is a real production app.

---

## PLATFORM COMPATIBILITY (MANDATORY)

The app must work flawlessly on:

- Android (Samsung S25)
- iOS (Safari — critical)
- iPad
- Desktop (Windows + Mac)
- Laptops

Browsers:
- Chrome
- Safari
- Edge
- Firefox (graceful support)

Must include:
- Responsive adaptive layout (not just scaling)
- Proper Safari compatibility
- Touch + mouse support
- No broken layouts on any screen

Optional:
- Progressive Web App support (installable)

---

## AUTH + ENTRY EXPERIENCE (CRITICAL)

Premium login screen:

- Cinematic background (dark gradient + subtle lighting)
- Glassmorphism login panel (floating)
- Minimal fields: email + password
- Animated glowing login button
- No technical options visible

### Login Behaviour

- Login once only
- Persist session across:
  - Refresh
  - Close
  - Revisit
- Returning users:
  → Skip login
  → Go straight to dashboard
- Silent session restore
- Only show login if session fails

---

## PROXY SYSTEM (MANDATORY)

- Proxy is ALWAYS active
- Fully preconfigured
- Completely hidden from user

REMOVE:
- Proxy inputs
- Advanced settings

System must:
- Auto-connect
- Auto-reconnect
- Remember configuration

---

## APP FLOW

First visit:
1. Login once
2. System connects

After that:
1. Open app
2. Dashboard loads instantly
3. Reconnect automatically

---

## DESIGN SYSTEM

Layered UI:

1. Gradient background
2. Glow layer
3. Glass panels
4. Inner light
5. Data visuals
6. Motion layer

**No flat UI allowed.**

---

## VISUAL STYLE

- Dark cinematic
- Glassmorphism
- Volumetric lighting

### Colors

| Role | Hex |
|------|-----|
| Primary / Accent | #FF6A00 (Orange) |
| Info / Secondary | #00D4FF (Cyan) |
| Success / Good | #00FF88 (Green) |
| Danger / Critical | #FF3B30 (Red) |

---

## DATA VISUALIZATION

NO plain text dashboards.

Use:
- Circular gauges
- Animated bars
- Radial indicators

All values animate smoothly between states.

---

## MOTION

- Smooth easing on all transitions
- Micro animations on state changes
- Pulsing LIVE indicator
- Gauge needles / fills animate to new values

---

## LAYOUT

- CSS Grid system
- Responsive breakpoints for mobile / tablet / desktop
- Cards with glass panels
- Consistent spacing and alignment

---

## DATA TABS

### ENGINE
- RPM (circular gauge)
- Coolant temperature
- Oil pressure & temperature
- Turbo boost pressure
- Exhaust temperature
- Engine load %
- Fuel consumption rate (L/hr)

### AFTERTREATMENT
- DEF (AdBlue) level %
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

### GPS
- Live coordinates
- Direct Google Maps link
- GPS speed & heading
- Ignition status

---

## MECHANIC REPORTS

- One tap engine report
- One tap ECU report
- Share via SMS, WhatsApp, email

---

## ALERT SYSTEM

- Critical alerts displayed as banners
- Push notifications for critical conditions
- Color-coded warning states (green → yellow → red)

---

## TECHNICAL REQUIREMENTS

- Pure HTML / CSS / JavaScript (no frameworks)
- Single file architecture
- Mobile first design
- AES-GCM encrypted credential storage
- J1939 offline fault code database
- IndexedDB trip history
- Service worker for offline support
- Silent mode (suppress console noise)

---

## TELEMATICS API

- Telematics Guru API (multiple instances: api-apac01, api-apac02, api-apac03)
- OAuth token authentication
- Auto-retry with proxy fallback chain
- 5 second refresh interval
- Raw telemetry + asset data endpoints
