// All wedding content, transcribed verbatim from the content reference.

export const couple = {
  names: 'Anmol & Tejas',
  shortNames: 'TejMol',
  hashtag: '#TejMolWedding',
  dateLabel: '30 June – 2 July 2027',
  mainDateLabel: 'Thursday 1 July 2027',
  shortDate: '30.06.27 – 02.07.27',
  place: 'Olive Gardens & Ballroom Upper Terrace',
  weddingDate: '2027-07-01T18:00:00+05:30',
  tagline: 'Two hearts, one love, and a lifetime of togetherness.',
  welcome:
    'With the blessings of our families, we warmly invite you to celebrate the wedding festivities of Anmol and Tejas. We look forward to sharing these special moments with you.',
  families: 'Anmol, daughter of Mr Prashant & Karuna Brahmbhatt, and Tejas, son of Mr HEMANG Bhatt & Late Mrs Neela Bhatt',
};

export type Invited = 'all' | 'anmol' | 'tejas';

export interface WeddingEvent {
  slug: string;
  name: string;
  subtitle: string;
  date: string;
  dateLabel: string;
  startTime: string;
  arrivalTime: string;
  finishTime: string;
  venue: string;
  address: string;
  mapQuery: string;
  dressCode: string;
  colours: string;
  setting: string;
  food: string;
  notes: string;
  invited: Invited;
}

const eventList: WeddingEvent[] = [
  {
    slug: 'welcome-party',
    name: 'Welcome Party / Mehndi',
    subtitle: 'Welcome celebration',
    date: '2027-06-30',
    dateLabel: 'Wednesday 30 June 2027',
    startTime: '18:00',
    arrivalTime: '18:00',
    finishTime: '23:59',
    venue: 'Olive Gardens',
    address: 'Olive Gardens',
    mapQuery: 'Olive Gardens',
    dressCode: 'Festive attire',
    colours: 'As you prefer',
    setting: 'To be confirmed',
    food: 'Details to be confirmed',
    notes: 'Welcome Party / Mehndi begins at 6:00 pm onwards.',
    invited: 'all',
  },
  {
    slug: 'haldi',
    name: 'Haldi',
    subtitle: 'Haldi ceremony',
    date: '2027-07-01',
    dateLabel: 'Thursday 1 July 2027',
    startTime: '08:30',
    arrivalTime: '08:30',
    finishTime: '12:00',
    venue: 'Agliolio',
    address: 'Agliolio',
    mapQuery: 'Agliolio',
    dressCode: 'Yellow or festive attire',
    colours: 'Yellow',
    setting: 'To be confirmed',
    food: 'Details to be confirmed',
    notes: 'Haldi begins at 8:30 am onwards.',
    invited: 'all',
  },
  {
    slug: 'wedding',
    name: 'Wedding',
    subtitle: 'Wedding celebration',
    date: '2027-07-01',
    dateLabel: 'Thursday 1 July 2027',
    startTime: '18:00',
    arrivalTime: '18:00',
    finishTime: '23:59',
    venue: 'Ballroom Upper Terrace',
    address: 'Ballroom Upper Terrace',
    mapQuery: 'Ballroom Upper Terrace',
    dressCode: 'Formal festive attire',
    colours: 'As you prefer',
    setting: 'To be confirmed',
    food: 'Details to be confirmed',
    notes: 'Wedding celebration begins at 6:00 pm onwards.',
    invited: 'all',
  },
  {
    slug: 'reception',
    name: 'Reception',
    subtitle: 'Reception celebration',
    date: '2027-07-02',
    dateLabel: 'Friday 2 July 2027',
    startTime: '18:00',
    arrivalTime: '18:00',
    finishTime: '23:59',
    venue: 'Ballroom & Lower Terrace',
    address: 'Ballroom & Lower Terrace',
    mapQuery: 'Ballroom & Lower Terrace',
    dressCode: 'Formal festive attire',
    colours: 'As you prefer',
    setting: 'To be confirmed',
    food: 'Details to be confirmed',
    notes: 'Reception venue: Ballroom & Lower Terrace. Starts at 6:00 pm onwards.',
    invited: 'all',
  },
];

export const events = [...eventList].sort((a, b) =>
  `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`),
);

export const invitedLabels: Record<Invited, string> = {
  all: 'All guests',
  anmol: "Anmol's family",
  tejas: "Tejas's family",
};

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export type AttireSlug = 'mehndi' | 'haldi' | 'sangeet' | 'ceremony' | 'reception';

export const wardrobe: { slug: AttireSlug; event: string; guidance: string; detail: string; western: string }[] = [
  {
    slug: 'mehndi',
    event: 'Mehndi',
    guidance: 'Colourful Indian or festive attire',
    detail: 'Lehengas, anarkalis, kurtas, or a bright summer dress. Henna is messy, so avoid long fitted sleeves.',
    western: 'A bright midi dress, or a linen shirt with chinos.',
  },
  {
    slug: 'haldi',
    event: 'Haldi / Pithi',
    guidance: 'Yellow, orange or light traditional clothing',
    detail: 'Light cotton only. Turmeric paste gets thrown and it does not wash out — nothing precious.',
    western: 'A yellow shirt or cotton dress you no longer love.',
  },
  {
    slug: 'sangeet',
    event: 'Sangeet',
    guidance: 'Glamorous Indian evening wear',
    detail: 'Embellished sarees, sequinned lehengas, velvet sherwanis, bandhgalas. This is the night to go all out.',
    western: 'Cocktail dress or a dark suit.',
  },
  {
    slug: 'ceremony',
    event: 'Wedding Ceremony',
    guidance: 'Traditional Indian formal wear',
    detail: 'Sarees, lehengas, anarkalis, sherwanis or kurta sets. Shoes come off at the mandap, so slip-ons help.',
    western: 'Daytime formal — a modest dress or a light suit.',
  },
  {
    slug: 'reception',
    event: 'Reception',
    guidance: 'Indian or Western black-tie',
    detail: 'Floor-length gowns, formal sarees, tuxedos, or a tailored bandhgala.',
    western: 'Black tie, or a dark formal suit.',
  },
];

export const wardrobeIntro =
  "Malta in late June is hot and bright — think light fabrics, and something for the evening breeze. If you don't own Indian clothing, the Western alternatives below are completely fine.";

export const pleaseAvoid = [
  'White or off-white on the ceremony day — it is worn for mourning in many Hindu families.',
  'Black on the ceremony day. Save it for the reception, where it is very welcome.',
  'Bridal red with heavy gold on the ceremony day.',
];

export const whereToShop =
  "Green Street in Leicester, Southall Broadway in London and Belgrave Road in Birmingham all have plenty of options. Order at least six weeks ahead if anything needs altering — and ask us if you'd like help, we genuinely enjoy it.";

export const travel = {
  intro: "Everything happens within a 25-minute drive, so wherever you stay you'll be close to it all.",
  airport: {
    name: 'Malta International Airport (MLA), Luqa',
    detail:
      "The island's only airport, about 20 minutes from Mdina and 25 from St Julian's. Flight routes from the UK, India and the US are set out below.",
    mapQuery: 'Malta International Airport',
  },
  arrivalAdvice:
    'Guests from all three regions should aim to land by Saturday 26 June — the first events begin Sunday morning. Family arriving for the pujas, please fly in by Friday 25 June.',
  flights: [
    {
      region: 'Botswana to Malta',
      intro:
        'There are no direct flights from India to Malta. The smoothest one-stop routes go through the Gulf or Istanbul, with a total journey of 11–14 hours.',
      routes: [
        'Common Connecting Hubs: Travelers usually depart from Sir Seretse Khama International Airport (GBE) in Gaborone. Common 1-to-2 stop flight paths connect north through major international hubs such as Johannesburg (JNB), Doha (DOH), or Dubai (DXB) using airlines like Skyscanner / Emirates or Ethiopian Airlines.',
        'Total Travel Time: Depending on your layover schedules, a typical multi-stop flight journey takes between 18 and 21 hours to reach Malta International Airport (MLA).',
      ],
      note: undefined as string | undefined,
    },
    {
      region: 'Johannesburg to Malta',
      intro: undefined as string | undefined,
      routes: [
        'Straight-Line Distance: About 4,362 miles (7,020 kilometers)',
        'Flight Route: There are no direct flights. You must book a connecting flight leaving from O.R. Tambo International Airport (JNB) and arriving at Malta International Airport (MLA).',
        'Common Layovers: Popular stops include Istanbul (IST) via Turkish Airlines or cities like Frankfurt and Zurich via carriers such as Lufthansa and SWISS.',
        'Travel Time: Total journey times average between 14 to 18 hours depending on your layover.',
      ],
      note: 'Indian passport holders need a Schengen visa for Malta. Apply well in advance through VFS Global — we can provide a wedding invitation letter for your appointment.',
    },
    // {
    //   region: 'From the US',
    //   intro:
    //     'There are no direct flights from the US to Malta, so plan for one stop through a European hub — around 12–14 hours door to door.',
    //   routes: [
    //     'New York (JFK/Newark), Boston, Chicago, Washington → London Heathrow → Malta — one ticket with British Airways',
    //     'US cities → Frankfurt, Munich, Paris or Rome → Malta — Lufthansa, Air France, ITA Airways and United partners',
    //     'US East Coast → Amsterdam → Malta — KLM',
    //   ],
    //   note: 'Book the whole journey on a single ticket so bags are checked through. Arrive by Saturday 26 June and fly home on or after Thursday 1 July.',
    // },
  ],
  ferry: {
    name: 'Valletta & Sliema ferries',
    detail:
      'There are no trains on Malta. The Valletta–Sliema ferry runs every 30 minutes and is the nicest way to cross the harbour. Gozo ferries leave from Ċirkewwa.',
    mapQuery: 'Valletta Ferry Terminal, Malta',
  },
  hotels: [
    {
      name: 'Corinthia Palace, Attard',
      detail: "Our main room block. Quote 'Brahmbhatt–Patel Wedding' for the group rate.",
      price: 'From €185 per night, B&B',
      mapQuery: 'Corinthia Palace Malta, Attard',
    },
    {
      name: 'The Xara Palace, Mdina',
      detail: 'Inside the old city walls, two minutes from the ceremony. Small, and it books out fast.',
      price: 'From €320 per night',
      mapQuery: 'The Xara Palace, Mdina',
    },
    {
      name: "Hilton Malta, St Julian's",
      detail: 'On the marina, closest to the Sangeet and to everything open late.',
      price: 'From €210 per night',
      mapQuery: "Hilton Malta, St Julian's",
    },
  ],
  checkIn:
    'Check-in from 15:00, check-out by 11:00. Late check-out on 1 July is available at the Corinthia and the Hilton — just ask at reception.',
  parking:
    'Free parking at Villa Arrigo, Palazzo Parisio and the Corinthia. Cars cannot enter Mdina — use the Main Gate car park and walk in, about five minutes.',
  taxis:
    "Bolt and eCabs work across Malta and cost far less than airport taxis. Uber runs here too. St Julian's to Mdina is roughly €20.",
  shuttles: [
    { time: '19:15', route: 'All hotels → Café del Mar (Welcome Party)', day: 'Sun 27 June' },
    { time: '13:30', route: 'Corinthia → Palazzo Parisio (Mehndi)', day: 'Mon 28 June' },
    { time: '18:45', route: 'All hotels → Hilton (Sangeet)', day: 'Tue 29 June' },
    { time: '08:45', route: 'Corinthia & Hilton → Mdina (Baraat)', day: 'Wed 30 June' },
    { time: '14:00', route: 'Mdina → all hotels', day: 'Wed 30 June' },
    { time: '18:15', route: 'All hotels → Villa Arrigo (Reception)', day: 'Wed 30 June' },
    { time: '00:30 / 01:15 / 02:00', route: 'Villa Arrigo → all hotels', day: 'Thu 1 July' },
  ],
  pickup: 'All coaches leave from the main hotel entrances. Look for the marigold sign in the windscreen.',
};

export const ceremonies = [
  {
    title: 'Ganesh Puja',
    body: 'The celebrations open with a prayer to Ganesh, who removes obstacles. Quiet and unhurried — a priest, a small fire, and close family.',
  },
  {
    title: 'Baraat',
    body: 'The procession. We arrive with family dancing ahead of us behind a dhol drum. There is no wrong way to join in — just dance.',
  },
  { title: 'Milni', body: 'The two families formally meet at the entrance, greeting each other pair by pair with garlands.' },
  {
    title: 'Jai Mala / Varmala',
    body: "We exchange flower garlands. Expect friends to lift us up so the other can't reach. It is meant to be funny.",
  },
  {
    title: 'Mandap',
    body: 'The four-pillared canopy the ceremony happens under. The pillars stand for our parents holding up the marriage.',
  },
  {
    title: 'Kanyadaan',
    body: 'The formal giving of a hand in marriage by the family. Usually the most emotional part of the day.',
  },
  { title: 'Hasta Melap', body: 'The joining of hands, with a scarf tied between us to bind us together.' },
  {
    title: 'Mangal Pheras / Saptapadi',
    body: "We circle the sacred fire, taking seven steps and making seven promises. When we finish, we're married.",
  },
  {
    title: 'Sindoor & Mangalsutra',
    body: 'The final visible signs of marriage — sindoor in the hair parting and the mangalsutra necklace.',
  },
];

export const guideIntro =
  "No prior knowledge needed, and nothing is expected of you except showing up. Here's what happens and roughly in what order.";

export const etiquette = [
  'Hindu weddings vary hugely between families and regions. Everything here reflects the Gujarati traditions our two families follow.',
  'Shoes come off before the mandap and before the puja room. There are racks, and someone to help.',
  'Sit whenever you like during the ceremony — it runs about three hours and people come and go. Please stand for the Jai Mala and the final blessing.',
  'Photos are welcome everywhere except during the pheras, when we ask for phones down.',
  'Post freely, and tag #TejMolWedding so we see everything.',
  "Greeting elders with a slight bow or a 'Namaste' always lands well.",
  "You're warmly invited to join the Baraat dancing, the Jai Mala cheering and the Garba at the Sangeet.",
];

export const faq = [
  { q: 'What should I wear?', a: 'See the Wardrobe page — guidance and inspiration for every event, including Western alternatives.' },
  { q: "Can I wear Indian clothes if I'm not Indian?", a: "Yes, and we'd love it. Ask us if you need help finding something." },
  { q: 'Are children invited?', a: "Yes, at every event except the Reception, where there's a supervised kids' room from 19:00." },
  { q: 'Can I bring a plus-one?', a: "Your invitation lists exactly who's included. If you're unsure, ask Priya, our coordinator." },
  { q: 'Will food be provided?', a: 'At every event. Everything is vegetarian, with clearly labelled vegan and nut-free options.' },
  { q: 'Is alcohol being served?', a: 'Full bar at the Welcome Party, Sangeet and Reception. The daytime ceremonies are dry.' },
  { q: 'Can I take photos during the ceremony?', a: "Yes, except during the pheras. We'll let you know when." },
  { q: 'Where should I park?', a: 'Free parking at every venue except Mdina, which is car-free — use the Main Gate car park.' },
  { q: 'Is transport provided?', a: 'Yes, coaches run between the hotels and every main event. Timetable on the Travel page.' },
  { q: 'What time should I arrive?', a: 'Every event card lists a recommended arrival time, usually 15–30 minutes before the start.' },
  {
    q: 'What should I bring?',
    a: "Sunscreen, a refillable water bottle, comfortable shoes for Mdina's cobbles, and a shawl for the evening breeze.",
  },
  { q: 'Who do I contact if I need help?', a: 'Priya, our wedding coordinator — please contact her rather than us on the wedding day.' },
];

export const contacts = [
  { role: 'Wedding coordinator', name: 'Priya Menon', phone: '+356 7900 1122', note: 'Your first call for anything on the day.' },
  { role: "Anmol's family", name: 'Meera Brahmbhatt', phone: '+44 7700 900145', note: '' },
  { role: "Tejas's family", name: 'Arun Patel', phone: '+44 7700 900288', note: '' },
  { role: 'Transport coordinator', name: 'Joseph Camilleri', phone: '+356 7900 4477', note: 'Coaches, taxis and airport runs.' },
  { role: 'Hotel — Corinthia Palace', name: 'Front desk', phone: '+356 2144 0301', note: '' },
  { role: 'Venue — Villa Arrigo', name: 'Events office', phone: '+356 2141 3060', note: '' },
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

export const updates = [
  {
    time: 'Sun 27 June, 09:12',
    title: 'Welcome Party coach leaves at 19:15',
    body: "From the main entrance of every hotel. Don't be the one we wait for.",
    urgent: true,
  },
  {
    time: 'Sat 26 June, 18:40',
    title: 'Mehndi moved to the shaded lower garden',
    body: "It's 33°C on Monday, so we've moved everything under the orange trees. Same time, same entrance.",
    urgent: false,
  },
  {
    time: 'Thu 24 June, 12:05',
    title: 'Extra reception coach added',
    body: "We've added a 01:15 coach back to the hotels after popular demand.",
    urgent: false,
  },
];

export const gifts = {
  wording:
    'Having everyone we love fly across oceans to be with us in Malta is already more than we could ask for — honestly, that is the gift. If you would still like to give something, a card with an enveloped present is warmly received.',
  envelope:
    'Enveloped presents — please bring your envelope on the wedding day. There will be a decorated card box at the Reception, and family will be collecting them at the Sangeet too.',
  more: 'A full gift list will be added here soon.',
};

export const story = [
  {
    title: 'How we met',
    body: "A quick add on Snapchat — that's genuinely where it started. Tejas appeared in Anmol's quick add, Anmol sent a happy birthday message, and the replies never really stopped.",
  },
  {
    title: 'Why Malta',
    body: 'Malta is the perfect place for an Indian wedding. The Mediterranean ocean, the golden old cities, the summer sun — we couldn\'t imagine our families anywhere else.',
  },
];

export const galleryNote = 'Photos will appear here after the celebrations. Share yours with #TejMolWedding.';
