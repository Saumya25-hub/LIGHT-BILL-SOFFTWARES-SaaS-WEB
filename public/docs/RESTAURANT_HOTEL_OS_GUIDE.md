# STOMS SBV1 — Restaurant & Hotel Management OS
## Official Architecture & Operational Guide
**By S TOM’S Enterprises & Signatures IT Groups**  
*Official Web Portal:* [https://sbv1-sofftwares-saa-s-web.vercel.app](https://sbv1-sofftwares-saa-s-web.vercel.app)

---

### Executive Overview
**STOMS SBV1 Restaurant & Hotel OS** is a high-performance, offline-first hospitality management system engineered specifically for dining rooms, bars, food courts, hotels, and resorts.

Unlike legacy cloud-based POS systems that suffer from lag, downtime, and expensive monthly subscriptions, SBV1 operates across a **Zero-Trust Local Area Network (LAN)** with **sub-18ms sync speed**, **0% internet dependency**, and **₹0 monthly cloud fees**.

---

### The 3-Device Synchronized Hardware Ecosystem

```
+-----------------------------------------------------------------------------+
|                          LOCAL WI-FI / LAN ROUTER                           |
|                       (Zero Internet Required • <18ms)                      |
+-----------------------------------------------------------------------------+
          ▲                                    ▲                             ▲
          │                                    │                             │
          ▼                                    ▼                             ▼
+---------------------+             +---------------------+       +---------------------+
|   DEVICE 1: MOBILE  |             |    DEVICE 2: KDS    |       |   DEVICE 3: POS PC  |
| Waiter Android App  |             | Kitchen Display     |       | Windows Desktop PC  |
| Tableside Ordering  |             | Paperless Cook Line |       | Cashier Billing &   |
| Offline Outbox      |             | Urgency Timers      |       | GST Tax Invoices    |
+---------------------+             +---------------------+       +---------------------+
```

1. **Device 1: Android Waiter Mobile Terminal**
   - Runs on any standard Android smartphone or tablet (Android 8.0+).
   - Waiters punch customer orders directly at the dining table with custom notes (e.g. *"Extra spicy, no garlic"*).
   - Equipped with an intelligent **offline outbox queue** that holds orders in outdoor garden seating or Wi-Fi blind spots and flushes them automatically the instant Wi-Fi reconnects.
   - Haptic vibration and audio notification when kitchen marks a dish ready for pickup.

2. **Device 2: Kitchen Display System (KDS)**
   - Runs on any commercial Android tablet, TV, or wall-mounted touch monitor.
   - Eliminates lost paper slips, noisy kitchen shouting, and thermal paper costs.
   - Automatic station routing (Hot Kitchen, Tandoor & Grill, Bar & Beverages, Bakery).
   - Audio chime on ticket arrival with color-coded urgency timers (Green &rarr; Amber &rarr; Red).
   - One-touch bumper button: **"Mark Dish Ready"** notifies the assigned waiter immediately.

3. **Device 3: Windows Desktop POS Counter**
   - Runs natively on the cashier's Windows 10 or 11 computer or laptop.
   - Central coordinator and high-speed embedded SQLite database engine.
   - Real-time floor plan visualization with live color-coded table states (Available, KOT Active, Food Served, Billed).
   - Instant 1-click GST tax invoice printing, dynamic UPI QR code on receipt, split checks, and table shifts.
   - **Hotel Room Folio Integration**: Post restaurant checks directly to guest hotel room folios for unified checkout.

---

### The 5-Step Order Lifecycle

1. **Tableside Punch:** Server enters table number, guest count, and selected dishes on Android phone.
2. **Instant LAN Dispatch (<18ms):** The KOT is cryptographically signed and transmitted across the local Wi-Fi router.
3. **Kitchen Display Chime & Cook:** Line chefs see tickets organized chronologically by station with active prep timers.
4. **Food Ready Notification:** Chef taps "Ready" on the KDS touch screen; the waiter phone vibrates for pickup.
5. **1-Click Cashier Settlement:** Cashier selects table on the PC monitor, accepts cash/UPI/room charge, and prints thermal invoice.

---

### Enterprise Security & Data Sovereignty (High-Level Overview)

- **Zero-Trust Device Enrollment:** Devices connect via a time-limited 6-digit OTP and one-time QR cryptographic handshake. Rogue devices cannot access restaurant data.
- **HMAC-SHA256 Signed Packets:** Every command, table mutation, and sync packet is authenticated with tamper-proof signatures, completely preventing replay attacks.
- **100% On-Premises Data Ownership:** All guest records, menu formulas, and financial receipts reside strictly inside your restaurant's physical hardware. Zero third-party cloud data harvesting.
- **Zero Loss Local Outbox:** Guaranteed order delivery even during Wi-Fi interruptions.

---

### Universal Hardware Freedom

| Component | Minimum Specification | Recommended Hardware |
| :--- | :--- | :--- |
| **Cashier POS Host** | Windows 10/11 (64-bit), Core i3, 4GB RAM | Any Windows PC or Laptop |
| **Waiter Terminals** | Android 8.0 Oreo or higher | Any budget Android Smartphone |
| **Kitchen Display (KDS)** | Any screen or tablet running Android or browser | 10"–15" Tablet or Wall TV |
| **Receipt Printers** | ESC/POS compatible thermal printer | Standard 80mm or 58mm USB/LAN/Bluetooth |
| **Network Router** | Standard 2.4/5GHz Wi-Fi Router | Any standard TP-Link, D-Link, or Netgear |

---

### Comparison: STOMS SBV1 vs Cloud Subscription POS

| Metric | Typical Cloud POS | STOMS SBV1 Restaurant OS |
| :--- | :--- | :--- |
| **Internet Dependency** | 100% Mandatory. Fails when internet drops. | **0% Needed.** Operates 100% offline on local Wi-Fi. |
| **Order Sync Speed** | 1,500ms – 4,000ms cloud round-trip. | **< 18ms** direct local LAN packets. |
| **Recurring Cost** | ₹3,000 – ₹10,000 / month forever. | **₹0 Monthly Fees.** Perpetual license ownership. |
| **Kitchen Display (KDS)** | Proprietary screens or expensive add-on fees. | **Included Free.** Runs on any tablet or TV. |
| **Hardware Freedom** | Locked to proprietary expensive terminals. | **Universal.** Use any PC, Android phone, or TV. |

---

### Official Support & Download
- **Live Web Portal:** [https://sbv1-sofftwares-saa-s-web.vercel.app/restaurant](https://sbv1-sofftwares-saa-s-web.vercel.app/restaurant)
- **Download Windows Installer:** [Free 35-Day Commercial Trial](https://sbv1-sofftwares-saa-s-web.vercel.app/download)
- **Publisher:** S TOM’S Enterprises & Signatures IT Groups
