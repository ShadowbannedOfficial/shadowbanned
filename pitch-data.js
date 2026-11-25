/* SHADOWBANNED investor deck
   Edit this file. Every figure, placeholder, and slide sentence is here.
   A value of "[TBD]" renders as a redaction bar. Replace the string to fill it in.
   proposedSplit.showProposedFigures stays true until the split is confirmed.
   Do not add figures that are not already in this file.
   Source: René Bassett quote and early gallery sales, 25 November 2026.
   ECB reference rate 1 EUR = 1.0935 USD on that date. USD figures are the
   quoted euro amounts times 1.0935, rounded half-up to the cent. */
window.PITCH = {
  credit: "B. Moore",
  creditLine: "B. Moore, 2025–26.",
  askUsd: 25000,
  closeLine: "Fund the run. Prove it sells.",

  fx: {
    rate: 1.0935,
    asOf: "25 November 2026",
    source: "ECB",
  },

  quote: {
    manufacturer: "René Bassett",
    origin: "Portugal",
    totalEur: 8405,
    totalUsd: 9190.87,
    totalUsdApprox: 9191,
    blendedLandedUsd: 30.64,
    developmentEur: 60,
    shippingEur: 930,
    shippingLabel: "UPS",
    crewneck: {
      name: "Crewneck, Vintage Black",
      units: 100,
      bulkEur: 31,
      sampleEur: 65,
      landedUsd: 38.07,
      earlyGalleryUsd: 90,
      marginPct: 57.7,
    },
    tees: [
      {
        name: "Tee, Black",
        units: 100,
        bulkEur: 20.5,
        sampleEur: 45,
        landedUsd: 26.59,
        earlyGalleryUsd: 75,
        marginPct: 64.5,
      },
      {
        name: "Tee, Vintage Black",
        units: 100,
        bulkEur: 21.1,
        sampleEur: 45,
        landedUsd: 27.25,
        earlyGalleryUsd: 75,
        marginPct: 63.7,
      },
    ],
  },

  earlySales: {
    label: "Early gallery sales",
    firstSale: "20 March 2025",
    teesAbout: 100,
    teePriceUsd: 75,
    crewnecksAbout: 50,
    crewPriceUsd: 90,
    revenueAboutUsd: 12000,
    pricesChange: "Those are early prices. They will change.",
    channel: "The clothes are sold through B. Moore's gallery.",
  },

  sellThrough: {
    teeUnits: 200,
    teePriceUsd: 75,
    crewUnits: 100,
    crewPriceUsd: 90,
    revenueUsd: 24000,
    productCostUsd: 9190.87,
    grossUsd: 14809.13,
    marginPct: 61.7,
    illustrativeWholesaleUsd: 12000,
    notAForecast: "This is a sell-through case, not a forecast.",
    pricesChange: "Those are early gallery prices. They will change.",
    wholesaleNote: "Wholesale is shown only for context. It is not a committed channel.",
    before:
      "Before duty, labels, packaging, fees, and campaign spend.",
  },

  proposedSplit: {
    showProposedFigures: true,
    productUsd: 15000,
    campaignsUsd: 10000,
    leftoverUsd: 5809.13,
    productLabel: "Product",
    campaignsLabel: "Photo and video",
  },

  placeholders: {
    split: "[TBD]",
    instrument: "[TBD]",
    newRetailPrices: "[TBD]",
    socialHandle: "[TBD]",
    socialCounts: "[TBD]",
  },

  images: {
    wordmark: { src: "logo.png", alt: "SHADOWBANNED", position: "center" },
    brand: {
      src: "images/low-signal.jpg",
      alt: "Tee with the struck-through wordmark",
      position: "center 42%",
    },
    zipper: {
      src: "images/drop-tee.jpg",
      alt: "Crewneck from the back, zipper at the neck, struck-through wordmark",
      position: "center 12%",
    },
    wordmarkGarment: {
      src: "images/shadowbanned-tee.jpg",
      alt: "Black tee with the struck-through wordmark",
      position: "center 40%",
    },
    earlySales: {
      src: "images/hero.jpg",
      alt: "Crewneck worn on the street",
      position: "center 28%",
    },
    positioning: {
      src: "images/hoodie.jpg",
      alt: "Tee with the struck-through wordmark",
      position: "center 35%",
    },
    ask: {
      src: "images/about-hero.jpg",
      alt: "Campaign photograph, face in shadow",
      position: "center 30%",
    },
    museumLabel: null,
    socialGrid: null,
  },

  missingImages: {
    museumLabel: "Placeholder — museum-label close-up is not in the repo",
    socialGrid: "Placeholder — social screenshot is not in the repo",
  },

  copy: {
    brand: [
      "SHADOWBANNED is a streetwear line by B. Moore.",
      "Each piece carries a struck-through wordmark and a woven museum label, CONSPIRACY THEORIES.",
    ],
    manifestoSurvivors: ["is", "inspired by", "dangerous", "conspiracy", "theories"],
    product: [
      "Tees and crewnecks. A 4-inch zipper at the back of the neck, so a hoodie can be pulled through without stretching the collar. The SHADOWBANNED wordmark, front and back. A woven museum label, CONSPIRACY THEORIES, on the outside back.",
      "This zipper is a design feature. Intellectual-property protection is being explored.",
    ],
    positioning: [
      "SHADOWBANNED sits with independent streetwear, sold as a gallery object rather than a mall brand.",
      "Made in Portugal by René Bassett. Sold by B. Moore through his gallery in Texas. A brand partner, a runway model published in Vogue Thailand, represents the line in fashion.",
      "The next step is not a chain of stores. It is one funded production run, and a campaign that shows whether the pieces sell through.",
    ],
    team: [
      {
        name: "B. Moore",
        role: "Founder",
        body: "Fine art photographer and director, based in Texas. He makes the images, directs the campaigns, and sells SHADOWBANNED through his gallery.",
      },
      {
        name: "Brand partner",
        role: "",
        body: "A runway model published in Vogue Thailand. She represents SHADOWBANNED in fashion.",
      },
    ],
    askLead:
      "It funds one thing: this production run, and the campaign that puts it in front of people.",
    instrumentLabel: "What investors receive",
    splitLabel: "Proposed split — not confirmed",
    newRetailLabel: "New retail prices",
    socialLead: "Current handle and counts are still to confirm.",
    socialHandleLabel: "Handle",
    socialCountsLabel: "Counts",
  },
};
