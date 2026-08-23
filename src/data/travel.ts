export type Trip = {
  slug: string;
  city: string;
  country: string;
  dates: string;
  year: number;
  coords: string;
  summary: string;
  highlights: string[];
  photoCount: number;
  emoji: string;
};

export const trips: Trip[] = [
  {
    slug: "kyoto-2026",
    city: "Kyoto",
    country: "Japan",
    dates: "Apr 2026",
    year: 2026,
    coords: "35.0116° N, 135.7681° E",
    summary:
      "Three weeks of working mornings in a Karasuma coffee shop and walking until the trains stopped. Went for the blossoms, stayed for the joinery.",
    highlights: [
      "Philosopher's Path at 6am, before anyone else",
      "A two-hour conversation with a chisel maker in Higashiyama",
      "Shipped the Atlas v2 rollout from a konbini parking lot",
    ],
    photoCount: 214,
    emoji: "🌸",
  },
  {
    slug: "lofoten-2025",
    city: "Lofoten",
    country: "Norway",
    dates: "Sep 2025",
    year: 2025,
    coords: "68.2094° N, 13.6155° E",
    summary:
      "A week of near-permanent golden hour, one rented Volvo, and the least reliable internet I have ever been grateful for.",
    highlights: [
      "Reinebringen at 4am for a sunrise that never quite committed",
      "Aurora on the third night, from a car park",
      "Zero commits pushed in seven days",
    ],
    photoCount: 168,
    emoji: "🏔️",
  },
  {
    slug: "lisbon-2025",
    city: "Lisbon",
    country: "Portugal",
    dates: "Moved Mar 2025",
    year: 2025,
    coords: "38.7223° N, 9.1393° W",
    summary:
      "Meant to stay two months. Signed a lease in week six. The hills are a personality test and I am failing it slowly.",
    highlights: [
      "A standing Thursday dinner that turned into a small community",
      "Learned enough Portuguese to be politely corrected daily",
      "Best natural light I have ever had at a desk",
    ],
    photoCount: 402,
    emoji: "🚋",
  },
  {
    slug: "patagonia-2024",
    city: "El Chaltén",
    country: "Argentina",
    dates: "Nov 2024",
    year: 2024,
    coords: "49.3315° S, 72.8863° W",
    summary:
      "Ten days of wind that rearranges your opinions. Laguna de los Tres in one long push, then two days of not moving.",
    highlights: [
      "Fitz Roy cleared for exactly eleven minutes",
      "Learned that 'moderate' is a regional term",
      "Read an entire book in a bus station",
    ],
    photoCount: 291,
    emoji: "🥾",
  },
  {
    slug: "seoul-2024",
    city: "Seoul",
    country: "South Korea",
    dates: "Jun 2024",
    year: 2024,
    coords: "37.5665° N, 126.9780° E",
    summary:
      "A conference talk, then two weeks of the best public transit and the worst sleep schedule of my life.",
    highlights: [
      "Gave a 30-minute talk on edge caching to 400 people",
      "Seongsu-dong coffee crawl, seven cafés, one day",
      "Midnight noodles that recalibrated my standards",
    ],
    photoCount: 137,
    emoji: "🏙️",
  },
  {
    slug: "dolomites-2023",
    city: "Dolomites",
    country: "Italy",
    dates: "Aug 2023",
    year: 2023,
    coords: "46.4102° N, 11.8440° E",
    summary:
      "Hut-to-hut for six days with a pack that was four kilos too heavy and a camera that earned every gram.",
    highlights: [
      "Tre Cime loop in fog, then sudden clarity",
      "Rifugio dinners with strangers who became a WhatsApp group",
      "First trip where I left the laptop at home",
    ],
    photoCount: 322,
    emoji: "⛰️",
  },
];

export const travelStats = [
  { label: "Countries", value: "27" },
  { label: "Cities logged", value: "63" },
  { label: "Photos", value: "1,534" },
  { label: "Flights in 2026", value: "9" },
];
