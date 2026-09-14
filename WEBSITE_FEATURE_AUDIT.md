# WEBSITE FEATURE AUDIT — VERIFIED FEATURE INVENTORY
**Product:** SIGNATURES LIGHT BILL ERP  
**Company:** S TOM’S  
**Document Status:** Pre-Build Verification Gate  
**Rule:** Only features with verified software source code/artifacts may appear as existing product capabilities on the website.

---

## Verified Feature Matrix

| Feature | Desktop Verified | Android Verified | Website Mentioned | Source Code / Artifact | Notes |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Sales Invoicing** | ✓ | Read-Only | Yes | `SalesView.xaml`, `InvoiceRepository.cs`, `SalesScreen.kt` | Desktop creates invoices; Android views synced invoices & line items. |
| **GST Calculation (CGST/SGST/IGST)** | ✓ | Read-Only | Yes | `SalesView.xaml`, `InvoiceItem.cs`, `MobileSaleItemDto` | Automatic tax calculation based on party state vs company state. |
| **Invoice Line Items (HSN, Qty, Rate, Disc)** | ✓ | Read-Only | Yes | `InvoiceItem.cs`, `MobileSaleItemDto` | Line items with HSN codes, discounts, taxable value, and tax breakdown. |
| **Payment Status Tracking (Paid/Unpaid)** | ✓ | Read-Only | Yes | `InvoiceRepository.cs`, `SalesScreen.kt` | Tracks paid, unpaid, and partial payment states with balance due. |
| **Invoice Preview & Export** | ✓ | Read-Only | Yes | `InvoicePreviewModal.xaml`, `InvoiceDetailScreen.kt` | In-app modal preview, printing, and sharing. |
| **Purchase Bill Management** | ✓ | Read-Only | Yes | `PurchaseView.xaml`, `PurchaseRepository.cs`, `PurchaseScreen.kt` | Desktop logs purchases & supplier bills; Android views synced records. |
| **Supplier Balances & Payables** | ✓ | Read-Only | Yes | `PurchaseRepository.cs`, `DashboardScreen.kt` | Real-time payables aggregation on desktop & mobile dashboard. |
| **Product & Inventory Catalog** | ✓ | Read-Only | Yes | `ProductListView.xaml`, `ProductEditWindow.xaml`, `MobileProductDto` | Item codes, names, units (PCS), sale/purchase rates, MRP, GST rate. |
| **Low-Stock Alerting** | ✓ | ✗ | Yes | `StockEngine.cs`, `Screenshot 2026-08-28 025359.png` | Desktop monitors minimum stock threshold and triggers alerts. |
| **Stock Balance History** | ✓ | ✗ | Yes | `StockView.xaml`, `StockEngine.cs`, `StockTransaction.cs` | Tracks QuantityIn, QuantityOut, and BalanceAfter for all items. |
| **Parties (Customers & Suppliers)** | ✓ | Read-Only | Yes | `PartyListView.xaml`, `PartyEditWindow.xaml`, `PartiesScreen.kt` | Directory with contact person, phone, GSTIN, PAN, and address. |
| **Party Credit Limits & Terms** | ✓ | Read-Only | Yes | `PartyRepository.cs`, `MobilePartyDto` | Tracks opening balances, payment terms (e.g., 30 Days), and limits. |
| **Party Ledgers (Double-Entry)** | ✓ | ✗ | Yes | `LedgerView.xaml`, `LedgerEngine.cs` | Detailed debit, credit, and running balance statements on Desktop. |
| **Business Reports (6 Core Reports)** | ✓ | ✗ | Yes | `ReportsView.xaml`, `ReportSnapshotEngine.cs` | Sales, Purchase, Stock, Outstanding, Product Sales, Payment reports. |
| **Excel Export for Reports** | ✓ | ✗ | Yes | `ClosedXML.dll`, `ReportsView.xaml.cs` | Formatted multi-tab `.xlsx` workbooks exported on demand. |
| **Branded PDF Catalog Studio** | ✓ | ✗ | Yes | `CatalogBuilderView.xaml`, `CatalogPdfBuilder.cs` | Product grouping, 4 grid templates (1x4, 2x2, 2x3, 3x3), 10 luxury themes. |
| **Real-time Live PDF Preview** | ✓ | ✗ | Yes | `CatalogPreviewControl.xaml`, `Screenshot 2026-08-28 025632.png` | Live zoomable preview before exporting branded catalogs. |
| **Google Drive Cloud Sync** | ✓ | ✓ | Yes | `signatures_bill_mobile_sync_engine.md`, `DriveDiscoveryEngine.kt` | Atomic snapshot sync to private Google Drive folder without public servers. |
| **Offline-First Operation** | ✓ | ✓ | Yes | SQLite (`Microsoft.Data.Sqlite`), Room/Cache in Android | Full functionality without internet; syncs whenever connected. |
| **Local Data Protection & PBKDF2** | ✓ | ✓ | Yes | `LocalAuthService.cs`, `LockScreen.kt` | 100,000 PBKDF2 iterations on desktop; PIN + Biometrics on Android. |
| **Biometric & PIN Mobile Security** | ✗ | ✓ | Yes | `BiometricAuthManager.kt`, `PinScreen.kt` | 4-digit PIN unlock + fingerprint authentication on Android. |
| **Day / Night (Light/Dark) Theme** | ✓ | Planned | Yes | `MainWindow.xaml`, `Screenshot 2026-08-28 025843.png` | Seamless switch between high-contrast day and sleek dark mode. |
| **Keyboard Shortcuts & Quick Search** | ✓ | ✗ | Yes | `KeyboardShortcutsHelpWindow.xaml`, Ctrl+K Omnibar | Quick navigation and rapid transaction entry on Desktop. |
| **35-Day Free Trial** | ✓ | Planned | Yes | User specification & commercial terms | Unrestricted 35-day trial to experience full product capabilities. |
| **Transparent Pricing (₹249/mo, ₹1,999/yr)**| ✓ | ✓ | Yes | Owner commercial instruction | Clear monthly & annual pricing with ₹989 savings highlighted. |

---

## Features STRICTLY EXCLUDED from Website (Anti-Fabrication Enforcement)

| Claim / Feature | Status | Reason for Exclusion |
| :--- | :--- | :--- |
| **Automatic GSTR-1 / GSTR-3B Portal Filing** | **EXCLUDED** | Not implemented. Product generates GST invoices and Excel reports, but does not perform direct API portal filing. |
| **e-Way Bill / e-Invoice Portal Integration** | **EXCLUDED** | Not present in codebase. |
| **Direct Bank API Reconciliation** | **EXCLUDED** | Bank accounts and UPI IDs are stored for display on invoices, not API banking. |
| **Payroll Tax Compliance / PF / ESI** | **EXCLUDED** | While an internal EMS module exists, tax compliance is not built. |
| **Multi-Tenant Web-App SaaS** | **EXCLUDED** | Product is Desktop + Android synced via Google Drive, not a browser-based multi-tenant cloud database. |
| **Mobile Invoice Creation** | **EXCLUDED** | Android app is strictly read-only by architectural design. |
| **Fabricated Customer Counts / Testimonials** | **EXCLUDED** | Zero customer numbers, awards, or fake reviews will be published. |
| **Stock Photography as Real Customers** | **EXCLUDED** | Only authentic software screenshots and brand graphics are permitted. |
