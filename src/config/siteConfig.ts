/**
 * Authoritative Central Configuration for S TOM'S - SIGNATURES LIGHT BILL ERP
 * All commercial pricing, brand hierarchy, contact channels, and download paths
 * are managed here as the single source of truth for all website components.
 */

export interface SiteConfig {
  company: {
    masterName: string;
    legalEntityName: string; // Placeholder marked for owner confirmation
    foundedYear?: string;
    cinNumber?: string; // Marked for owner confirmation
    panNumber?: string; // Marked for owner confirmation
    gstinNumber?: string; // Marked for owner confirmation
    registeredAddress: string; // Marked for owner confirmation
  };
  brand: {
    productFamily: string;
    productName: string;
    productTagline: string;
    productPhilosophy: string;
    positioning: string;
  };
  contact: {
    supportEmail: string;
    salesEmail: string;
    phone: string;
    whatsappPhone: string;
    hours: string;
  };
  pricing: {
    currencySymbol: string;
    currencyCode: string;
    monthly: {
      price: number;
      periodLabel: string;
    };
    annual: {
      regularPrice: number;
      offerPrice: number;
      savings: number;
      periodLabel: string;
      badgeText: string;
    };
    gstAddon: {
      price: number;
      quota: string;
      periodLabel: string;
      description: string;
    };
    proCombo: {
      monthlyPrice: number;
      annualPrice: number;
      savingsPerMonth: number;
      periodLabel: string;
      badgeText: string;
      description: string;
    };
    trial: {
      days: number;
      headline: string;
      subline: string;
      noCreditCardRequired: boolean;
    };
    taxNote: string;
  };
  download: {
    desktop: {
      version: string;
      releaseDate: string;
      installerFileName: string;
      fileSizeBytes: number;
      fileSizeFormatted: string;
      osSupport: string;
      directDownloadUrl: string; // Relative or CDN url
      sha256Checksum: string;
    };
    android: {
      version: string;
      status: 'coming_soon' | 'live';
      statusLabel: string;
      playStoreUrl: string; // Empty or placeholder until published
    };
  };
  social: {
    githubOrgUrl: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
  };
}

export const siteConfig: SiteConfig = {
  company: {
    masterName: "S TOM’S",
    legalEntityName: "S TOM’S Software (Confirm exact legal entity)",
    registeredAddress: "Surat, Gujarat, India (Confirm official registered address)",
    cinNumber: "[CONFIRM_CIN]",
    panNumber: "[CONFIRM_PAN]",
    gstinNumber: "[CONFIRM_GSTIN]",
  },
  brand: {
    productFamily: "SIGNATURES",
    productName: "SIGNATURES LIGHT BILL ERP",
    productTagline: "Business software, made simple.",
    productPhilosophy: "Powerful inside. Simple outside.",
    positioning: "Offline-first desktop billing ERP with companion mobile visibility and secure private cloud sync.",
  },
  contact: {
    supportEmail: "signaturesltda@gmail.com",
    salesEmail: "signaturesltda@gmail.com",
    phone: "+91 7862930700",
    whatsappPhone: "+91 7862930700",
    hours: "Monday – Saturday, 9:30 AM – 6:30 PM IST",
  },
  pricing: {
    currencySymbol: "₹",
    currencyCode: "INR",
    monthly: {
      price: 299,
      periodLabel: "/month",
    },
    annual: {
      regularPrice: 3588,
      offerPrice: 3200,
      savings: 388,
      periodLabel: "/year",
      badgeText: "MOST POPULAR",
    },
    gstAddon: {
      price: 100,
      quota: "30 GSTIN Auto-Fills / month",
      periodLabel: "/month",
      description: "Direct Government GST API lookup. Auto-fetches Legal Name, Trade Name, Registered Address, and Filing Status with 100% accuracy.",
    },
    proCombo: {
      monthlyPrice: 349,
      annualPrice: 3600,
      savingsPerMonth: 50,
      periodLabel: "/month",
      badgeText: "BEST VALUE BUNDLE",
      description: "Complete Billing ERP + 30 GST API Auto-fills included every month. All-in-one suite for growing businesses.",
    },
    trial: {
      days: 35,
      headline: "35 DAYS FREE",
      subline: "Try SIGNATURES LIGHT BILL ERP before choosing a plan. Full features included.",
      noCreditCardRequired: true,
    },
    taxNote: "All prices in INR. Includes automatic software updates and cloud backups.",
  },
  download: {
    desktop: {
      version: "2.0.0",
      releaseDate: "October 2026",
      installerFileName: "SIGNATURES-BILL-Setup.exe",
      fileSizeBytes: 63133112,
      fileSizeFormatted: "60.2 MB",
      osSupport: "Windows 10 / 11 (64-bit)",
      directDownloadUrl: "https://github.com/Saumya25-hub/LIGHT-BILL-SOFFTWARES-SaaS-WEB/releases/download/v2.0.0/SIGNATURES-BILL-Setup.exe",
      sha256Checksum: "43746ED636748F40B9ACDEE83D707233EFA17679EED196A16E54A89CA35F6174",
    },
    android: {
      version: "1.0.0-beta",
      status: "coming_soon",
      statusLabel: "Coming to Google Play",
      playStoreUrl: "#coming-soon",
    },
  },
  social: {
    githubOrgUrl: "https://github.com/Saumya25-hub",
  },
};
