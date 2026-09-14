# WEBSITE AUDIT — S TOM’S / SIGNATURES LIGHT BILL ERP
**Document Date:** September 14, 2026  
**Status:** Pre-Implementation Baseline Audit (First Action Completed)  
**Authoritative Scope:** Comprehensive inspection of `D:\LIGHT BILL SOFFTWARES\`

---

## 1. Executive Summary & Brand Hierarchy

This audit establishes the factual, code-verified baseline for building the new public SaaS website in `D:\LIGHT BILL SOFFTWARES\WEBSITE`.

### Authoritative Brand Architecture
- **Master Company / Parent Brand:** **S TOM’S** (Software Company)
- **Product Family / Brand:** **SIGNATURES**
- **Flagship Commercial Product:** **SIGNATURES LIGHT BILL ERP**
- **Core Positioning:** *Business software, made simple.*
- **Product Philosophy:** *Powerful inside. Simple outside.*
- **Target Audience:** Indian small businesses, retail shop owners, distributors, traders, accountants, and business staff.

---

## 2. Desktop Application Audit (`🧾 Signatures Bill — V1`)

### 2.1 Technology Stack & Architecture
- **Platform:** .NET 8.0 Windows Desktop (`net8.0-windows`), WPF, C# 12.
- **Data Persistence:** Offline-first SQLite database (`Microsoft.Data.Sqlite` 8.0.2) located in `%LOCALAPPDATA%\SignaturesBill\signatures_bill.db`.
- **UI Paradigm:** Hardware-accelerated WPF XAML, MVVM pattern (`ViewModelBase`).
- **Visual Styling:** Polished modern styling with Light/Dark ("Day/Night") mode toggle, ambient water-wave canvas on security screens (`AmbientWaveBackground`), clean typography, and non-intrusive status alerts.

### 2.2 Verified Desktop Subsystems & Capabilities
1. **Sales & GST Billing (`SalesView.xaml`, `InvoiceRepository.cs`):**
   - Create and manage GST-compliant sales invoices (`INV-XXXXX`).
   - Line items with HSN codes, quantity, unit (e.g. PCS), unit rate, percentage discount, and GST rate (5%, 12%, 18%, 28%, etc.).
   - Automatic CGST + SGST (intrastate) or IGST (interstate) tax calculations.
   - Subtotal, taxable value, discount deductions, round-off, and grand total.
   - Payment status tracking (`Paid`, `Unpaid`, `Partial`), amount received, balance receivable.
   - Collapsible party metadata banner (GSTIN, Address, City, State).
   - In-app invoice preview modal (`InvoicePreviewModal.xaml`) and clean print/export capabilities.
2. **Purchase Management (`PurchaseView.xaml`, `PurchaseRepository.cs`):**
   - Record supplier purchase invoices (`PUR-XXXXX`) and supplier bill numbers.
   - Supplier selection, itemized line entries, tax calculation, payment status, amount paid, balance payable.
3. **Products & Inventory Catalog (`ProductListView.xaml`, `ProductEditWindow.xaml`):**
   - Product code, item name, unit, sale rate, purchase rate, MRP, GST rate, opening stock, minimum stock threshold, active status.
   - Low-stock visual alerts when inventory drops below configured minimum.
4. **Parties (Customers & Suppliers) (`PartyListView.xaml`, `PartyEditWindow.xaml`):**
   - Manage customers and suppliers in unified database.
   - Fields: Name, code, contact person, mobile, phone, email, GST registration type, GSTIN, PAN, trade name, billing address, city, state, pincode.
   - Financial attributes: Opening balance (receivable/payable), credit limit, payment terms, current balance.
5. **Stock Tracking (`StockView.xaml`, `StockEngine.cs`):**
   - Real-time stock balance tracking, historical stock transactions (`QuantityIn`, `QuantityOut`, `BalanceAfter`).
6. **Double-Entry Party Ledgers (`LedgerView.xaml`, `LedgerEngine.cs`):**
   - Running ledger statements for customers and suppliers with debit, credit, and running balance.
7. **Business Reports (`ReportsView.xaml`, `ReportSnapshotEngine.cs`):**
   - 6 Core Reports:
     - Sales Report (performance, tax breakdown, invoice summary)
     - Purchase Report (bills & supplier breakdown)
     - Stock Report (inventory movement & valuation)
     - Outstanding Report (customer receivables & supplier payables breakdown)
     - Product Sales Report (top products by quantity & value)
     - Payment Report (customer receipts & supplier payments)
   - Formatted multi-tab Excel export via ClosedXML.
8. **PDF Catalog Studio (`CatalogBuilderView.xaml`, `CatalogPdfBuilder.cs`):**
   - Built-in visual catalog builder for creating luxury product catalogs.
   - Pick products directly from inventory, organize into product groups.
   - Grid layout templates: 1x4 List, 2x2 Classic, 2x3 Standard, 3x3 Compact.
   - 10 Branded Themes: Coffee Brown, Espresso Black, Latte Cream, Mocha Gold, Rustic Wood, Luxury Black, Royal Gold, Platinum Silver, Diamond White, Midnight Blue, Premium White.
   - Real-time live PDF preview panel with zoom and single-click PDF export.
9. **Backup & Cloud Safety (`BackupEngine.cs`, `GoogleDriveCloudService.cs`):**
   - Local encrypted ZIP snapshots with retention management.
   - Google Drive cloud backup with OAuth 2.0 PKCE authentication.
10. **Mobile Sync Publishing Pipeline (`signatures_bill_mobile_sync_engine.md`):**
    - Transactional durable sync journal (`MobileSyncJournal` and `MobileSyncState`).
    - Point-in-time snapshot generator creating `manifest.json` and `data.json`.
    - Staged safe upload to Google Drive folder (`My Drive/SIGNATURES BILL/[Business Name]/Mobile Data`).

---

## 3. Android Mobile Application Audit (`SB(KotlinMobile)Signatures Bill`)

### 3.1 Technology Stack & Architecture
- **Platform:** Android, Kotlin, Jetpack Compose, Kotlin Coroutines & Flow, Kotlinx Serialization.
- **Design Philosophy:** 100% Read-Only companion app for on-the-go business visibility.
- **Architectural Principle:** The desktop SQLite database is the **sole, immutable Source of Truth**. The mobile app connects to Google Drive, downloads sanitized business snapshots, and maintains a local cache. It **never** writes back to cloud and **never** mutates business records.

### 3.2 Verified Android Features & Screens
1. **Branded Splash Screen (`SplashScreen.kt`, `WaveBackground.kt`):**
   - Animated water waves in light blue theme, SB monogram, and official branding.
2. **Security Lock Screen (`LockScreen.kt`, `BiometricAuthManager.kt`):**
   - 4-digit PIN unlock with numerical keypad.
   - Biometric fingerprint authentication support.
   - Encrypted storage for PIN state.
3. **Google Drive Cloud Connection (`ConnectionScreen.kt`, `DriveDiscoveryEngine.kt`):**
   - Secure Google Sign-In / OAuth.
   - Discovers `My Drive/SIGNATURES BILL/[Business Name]/Mobile Data` and downloads `manifest.json` and `data.json`.
4. **Mobile Business Dashboard (`DashboardScreen.kt`, `DashboardViewModel.kt`):**
   - Displays real-time synced KPIs: Today's Sales, Today's Purchases, Total Sales, Total Purchases, Total Receivable, Total Payable, Total Invoices Count, Active Parties, Active Products.
5. **Sales Invoices Viewer (`SalesScreen.kt`, `InvoiceDetailScreen.kt`):**
   - Read-only list of sales invoices with search and date sorting.
   - Full invoice detail view with item breakdown, tax summary, payment status, and grand total.
6. **Purchase Bills Viewer (`PurchaseScreen.kt`, `PurchaseDetailScreen.kt`):**
   - Read-only list of purchase bills and detailed bill view.
7. **Parties Directory (`PartiesScreen.kt`, `PartyDetailsScreen.kt`):**
   - Directory of customers and suppliers with contact info, GSTIN, and current receivable/payable balances.

### 3.3 What Android Does NOT Do (Strict Anti-Fabrication Boundary)
- Does **NOT** create or edit sales invoices or purchase bills.
- Does **NOT** create or modify products or inventory stock.
- Does **NOT** generate PDF catalogs.
- Does **NOT** write data back to Google Drive or Desktop.
- Is **NOT** yet live on Google Play Store (Status: "Coming to Google Play").

---

## 4. Screenshot & Visual Asset Audit

The following authentic screenshots and brand assets were discovered in the project repository:

### 4.1 Real Desktop Screenshots (`D:\LIGHT BILL SOFFTWARES\SETUP-FILE\assets\`)
1. `Screenshot 2026-08-28 025359.png`:
   - **Content:** Desktop Dashboard (Light Day Mode) showing active subscription badge (`Active (27d)`), FY 2026-27, KPI metrics, recent sales table, low-stock card, weekly trend bar chart, and activity log.
2. `Screenshot 2026-08-28 025414.png`:
   - **Content:** Desktop Dashboard (Monthly View) showing month-to-date sales (₹565,670.00), purchases (₹308,500.00), receivables, and payables.
3. `Screenshot 2026-08-28 025632.png`:
   - **Content:** PDF Catalog Studio showing product groupings, customizer with luxury themes, and high-fidelity live preview of gift hampers.
4. `Screenshot 2026-08-28 025647.png`:
   - **Content:** PDF Catalog Studio theme selector (Luxury Black, Royal Gold, Platinum Silver, Diamond White, Midnight Blue, Premium White).
5. `Screenshot 2026-08-28 025810.png`:
   - **Content:** New Sales Invoice Creation interface with customer header (VD, Surat, Gujarat), product line items (`heartbox`, `sqaurebox`), tax calculations, and invoice summary sidebar.
6. `Screenshot 2026-08-28 025826.png`:
   - **Content:** Reports Hub presenting cards for Sales Report, Purchase Report, Stock Report, Outstanding Report, Product Sales Report, and Payment Report.
7. `Screenshot 2026-08-28 025843.png`:
   - **Content:** Desktop Dashboard (Dark / Night Mode) displaying sleek contrast and visual aesthetics.
8. Installer Showcase Slides:
   - `showcase_billing.bmp`, `showcase_catalog.bmp`, `showcase_cloud.bmp`, `showcase_dashboard.bmp`, `showcase_reports.bmp`.

### 4.2 Real Android Visual Specification (`D:\LIGHT BILL SOFFTWARES\SB(KotlinMobile)Signatures Bill\UIUX\DESGIN.png`)
- High-resolution design specification featuring mobile phone screens for the Splash Screen (waves, SB logo) and Lock Screen (PIN keypad, biometric prompt).

### 4.3 Brand Logos & Graphic Marks
- `cube_s_master.png` (`SETUP-FILE\assets`): High-res isometric 3D cube 'S' logo in gold, cyan, black, and white.
- `letter-s (1).svg` (`SB(KotlinMobile)Signatures Bill`): Crisp vector SVG format of the cube 'S' mark.
- `letter-s (1).ico` and `Resources\app.ico`: Windows icon assets.

### 4.4 Multimedia Assets
- `signatures_bill_launch_film_30s.mp4` (`🧾 Signatures Bill — V1`): 30-second official launch video.

---

## 5. Cloud & Sync Architecture Verification

### 5.1 Cloud Synchronization Facts
- **Mechanism:** Google Drive API v3 via OAuth 2.0 PKCE.
- **Folder Structure:** `Google Drive > My Drive > SIGNATURES BILL > [Business Name] > Mobile Data`.
- **Sync Protocol:**
  - Desktop writes atomic `manifest.json` and `data.json`.
  - Android reads `manifest.json` and downloads changes.
  - Zero-latency local operation on both devices (both work fully offline).
  - Sync occurs when connected to the internet.
- **Marketing Phrasing:** Describe as *"Seamless Google Drive Cloud Sync"* or *"Stay connected across Desktop and Mobile via private Google Drive sync"*. Do **NOT** claim "multi-tenant cloud server database" or "web browser SaaS".

---

## 6. Distribution & Release Mechanisms

1. **Desktop Windows Installer:**
   - Compiled installer already exists: `D:\LIGHT BILL SOFFTWARES\InstallerOutput\SIGNATURES-BILL-Setup.exe` (53.6 MB).
   - Generated via Inno Setup 6 (`SETUP-FILE SB.iss`) using published binaries in `d:\LIGHT BILL SOFFTWARES\publish`.
2. **Android Distribution:**
   - Native Kotlin APK built with Gradle.
   - Status: "Coming to Google Play". No public Play Store link exists yet.
3. **Developer Updates Control Plane:**
   - `DEV-TOOL-UPDATE-` GitHub repository handles internal version manifests and releases. Internal developer paths and tokens must remain private and excluded from the public website.

---

## 7. Commercial Terms & Pricing Baseline

- **Monthly Subscription:** ₹249 / month
- **Annual Subscription Regular:** ₹2,988 / year
- **Annual Subscription Offer:** **₹1,999 / year**
- **Savings:** **Save ₹989 / year** (Exact calculation: ₹2,988 - ₹1,999)
- **Free Trial:** **35-Day Full-Featured Free Trial**
- **GST / Taxes Status:** Not stated whether inclusive/exclusive. Marked for owner confirmation.

---

## 8. Public Contact & Legal Metadata Status

- **Identified Support Email:** `signaturesltda@gmail.com`
- **Identified Phone:** `+91 7862930700`
- **Missing Legal Parameters (to be centralized in config placeholders):**
  - Registered Corporate Entity Name
  - Registered Business / Office Address
  - GSTIN and PAN
  - Company Registration Number / CIN
  - Formal Refund & Cancellation policy terms
  - Legal Jurisdiction
