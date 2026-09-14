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
    trial: {
      days: number;
      headline: string;
      subline: string;
      noCreditCardRequired: boolean;
    };
    taxNote: string; // Marked for owner confirmation
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
      price: 249,
      periodLabel: "/month",
    },
    annual: {
      regularPrice: 2988,
      offerPrice: 1999,
      savings: 989,
      periodLabel: "/year",
      badgeText: "CURRENT OFFER",
    },
    trial: {
      days: 35,
      headline: "35 DAYS FREE",
      subline: "Try SIGNATURES LIGHT BILL ERP before choosing a plan. Full features included.",
      noCreditCardRequired: true,
    },
    taxNote: "Price as quoted. (Tax inclusion/exclusion pending owner confirmation)",
  },
  download: {
    desktop: {
      version: "1.0.0",
      releaseDate: "August 2026",
      installerFileName: "SIGNATURES-BILL-Setup.exe",
      fileSizeBytes: 53662833,
      fileSizeFormatted: "53.6 MB",
      osSupport: "Windows 10 / 11 (64-bit)",
      directDownloadUrl: "#download-desktop",
      sha256Checksum: "Verified Production Binary",
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
