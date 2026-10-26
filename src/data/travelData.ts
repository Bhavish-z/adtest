import { Tour, LocalGuide, BlogPost, Review, MapPOI, Booking } from '../types/travel';

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'tour-1',
    slug: 'kyoto-dawn-tea-gardens',
    title: 'Kyoto Dawn: Ancient Moss Gardens, Master Tea Ceremony & Secret Alleys',
    tagline: 'Step past the crowds with a 3rd-generation Gion native through secluded Zen sanctuaries and private tearooms.',
    destination: 'Kyoto',
    region: 'Kansai',
    country: 'Japan',
    lat: 35.0037,
    lng: 135.7772,
    duration: '6.5 Hours',
    groupSize: 'Max 8 travelers',
    difficulty: 'Easy',
    price: 185,
    originalPrice: 215,
    rating: 4.96,
    reviewCount: 42,
    highlights: [
      'Private dawn entry into a 400-year-old sub-temple moss garden before public hours',
      'Intimate Urasenke matcha ceremony conducted by an 82-year-old master in her historic machiya',
      'Exploration of quiet Gion preservation quarters with zero tourist bus traffic',
      'Multi-course seasonal Kaiseki lunch featuring Kyoto heirloom kyo-yasai vegetables'
    ],
    itinerary: [
      {
        time: '07:30 AM',
        title: 'Dawn Gathering at Kennin-ji Outer Gate',
        description: 'Meet guide Kenji at the peaceful stone approach. Morning stillness introduction over roasted hojicha.',
        sights: ['Kennin-ji Grounds', 'Shirakawa Canal', 'Historic Stone Alleys']
      },
      {
        time: '08:45 AM',
        title: 'Exclusive Access: Sub-temple Moss Enclave',
        description: 'Quiet contemplation in a secluded Zen garden famous for vibrant velvet moss and water-carved stone basins.',
        sights: ['Zen Rock Garden', 'Bamboo Grove Path', 'Dry Landscape Courtyard']
      },
      {
        time: '11:00 AM',
        title: 'Master Tea Ceremony in a Private Machiya',
        description: 'Take off your shoes in an authentic wooden townhouse. Learn the philosophy of ichigo ichie (one time, one meeting).',
        sights: ['Traditional Tokonoma Alcove', 'Ceremonial Matcha Preparation', 'Handcrafted Wagashi Confection']
      },
      {
        time: '01:00 PM',
        title: 'Curated Autumn Kaiseki Banquet & Gion Walk',
        description: 'Conclude with an artisanal multi-course tasting at a century-old neighborhood restaurant tucked along the Shirakawa.',
        sights: ['Tatsumi Bridge', 'Preserved Teahouse Facades', 'Local Artisan Woodblock Workshop']
      }
    ],
    inclusions: [
      'All temple and private garden admissions',
      'Full ceremonial matcha preparation and handmade seasonal wagashi',
      'Artisanal multi-course Kaiseki seasonal lunch',
      'Licensed English-speaking native historian guide',
      'Handmade bamboo pilgrim fan keepsake'
    ],
    exclusions: [
      'Hotel transfers to the central meeting point',
      'Additional alcoholic beverages at lunch'
    ],
    meetingPoint: 'Kennin-ji Temple North Gate Stone Lantern',
    meetingAddress: '584 Komatsucho, Higashiyama-ku, Kyoto 605-0811, Japan',
    meetingCoords: [35.0006, 135.7738],
    coverImage: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg',
    category: 'Historic Alleys',
    nextDates: ['2026-11-04', '2026-11-08', '2026-11-12', '2026-11-18', '2026-11-22'],
    guide: {
      name: 'Kenji Takahashi',
      role: 'Cultural Historian & Kyoto Heritage Steward',
      avatar: 'KT',
      bio: 'Born in Gion to a family of kimono dyers, Kenji has spent 14 years opening doors to historic sanctuaries typically closed to independent travelers.',
      languages: ['Japanese (Native)', 'English (Fluent)'],
      toursLed: 320
    }
  },
  {
    id: 'tour-2',
    slug: 'amalfi-path-of-gods',
    title: 'Amalfi Coastlines: The Path of the Gods & Cliffside Lemon Groves',
    tagline: 'Hike ancient mule trails high above the Tyrrhenian Sea, harvest Sfusato lemons, and feast on cliffside burrata.',
    destination: 'Amalfi Coast',
    region: 'Campania',
    country: 'Italy',
    lat: 40.6340,
    lng: 14.6027,
    duration: '7 Hours',
    groupSize: 'Max 10 travelers',
    difficulty: 'Moderate',
    price: 165,
    originalPrice: 190,
    rating: 4.98,
    reviewCount: 56,
    highlights: [
      'Guided traverse of the legendary Sentiero degli Dei (Path of the Gods) overlooking Positano',
      'Private tour through a 4th-generation terraced lemon grove in Ravello with Limoncello tasting',
      'Rustic alfresco shepherd lunch with warm caciocavallo, hand-pressed olive oil, and organic wine',
      'Coastal boat transfer return bypassing all gridlocked coastal highway traffic'
    ],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Bomerano Alpine Ridge Ascent',
        description: 'Begin high above the sea in the mountain village of Bomerano. Breath-taking panoramic views across the Capri archipelago.',
        sights: ['Grotta del Biscotto', 'Ancient Mule Track', 'Limestone Pinnacles']
      },
      {
        time: '11:15 AM',
        title: 'Nocelle Forest Rest & Shepherds Table',
        description: 'Stop at a private cliffside estate for fresh sourdough bread, warm wood-fired bread with oregano, and fresh mozzarella.',
        sights: ['Nocelle Terraces', 'Old Water Wells', 'Panoramic Sea Balcony']
      },
      {
        time: '01:30 PM',
        title: 'Descent to the Acqua Madre Lemon Terraces',
        description: 'Explore shaded vertical lemon orchards, learn traditional pergola cultivation, and sample freshly extracted lemon granita.',
        sights: ['Sfusato Amalfitano Groves', 'Artisan Distillery', 'Ravello Valley View']
      },
      {
        time: '03:15 PM',
        title: 'Scenic Wooden Boat Run to Amalfi Harbor',
        description: 'Board a traditional gozzo wooden boat at Positano pier for a sea-level glide back along the dramatic cliffs.',
        sights: ['Fiordo di Furore from the water', 'Emerald Grotto Headland', 'Amalfi Port']
      }
    ],
    inclusions: [
      'Certified Alpine and Campania nature guide',
      'Private terraced estate access and organic farm lunch',
      'Handcrafted Limoncello tasting and citrus granita',
      'Coastal boat transfer from Positano to Amalfi',
      'Trekking poles and insulated refillable water canteen'
    ],
    exclusions: [
      'Personal hiking footwear',
      'Gratuities for boat crew'
    ],
    meetingPoint: 'Piazza Paolo Capasso Central Church Steps',
    meetingAddress: 'Piazza Paolo Capasso, 80051 Bomerano, Agerola NA, Italy',
    meetingCoords: [40.6318, 14.5401],
    coverImage: '/src/assets/images/tour_amalfi_coastal_walk_1792975379607.jpg',
    category: 'Coastal & Nature',
    nextDates: ['2026-11-02', '2026-11-06', '2026-11-10', '2026-11-15', '2026-11-20'],
    guide: {
      name: 'Chiara Esposito',
      role: 'Agronomist & Certified Alpine Mountain Guide',
      avatar: 'CE',
      bio: 'Raised on her familys terraced lemon orchard in Ravello, Chiara blends deep botanical knowledge with lively Mediterranean storytelling.',
      languages: ['Italian (Native)', 'English (Fluent)', 'French (Conversational)'],
      toursLed: 245
    }
  },
  {
    id: 'tour-3',
    slug: 'lisbon-fado-culinary-trail',
    title: 'Lisbon Untold: Hidden Fado Taverns & Alfama Artisan Culinary Trail',
    tagline: 'Wander labyrinthine cobblestone alleys to taste century-old petiscos, artisan tinned fish, and raw acoustic fado.',
    destination: 'Lisbon',
    region: 'Estremadura',
    country: 'Portugal',
    lat: 38.7115,
    lng: -9.1355,
    duration: '5 Hours',
    groupSize: 'Max 8 travelers',
    difficulty: 'Easy',
    price: 135,
    rating: 4.94,
    reviewCount: 38,
    highlights: [
      'Private tasting of rare vintage sardines and conserved sea harvests at a 1930s conserveira',
      'Seven curated petiscos paired with natural Alentejo wines and Vinho Verde',
      'Intimate acoustic performance by a resident guitarrista inside a 120-year-old fado taberna',
      'Guided walk through hidden Moorish passageways and quiet tiled viewpoints'
    ],
    itinerary: [
      {
        time: '04:30 PM',
        title: 'Gathering at Miradouro de Santa Luzia',
        description: 'Meet overlooking the terracotta rooftops and shimmering Tagus river. Introduction to Lisbon maritime soul.',
        sights: ['Azulejo Tile Walls', 'Bougainvillea Terrace', 'Castelo Hill Vistas']
      },
      {
        time: '05:30 PM',
        title: 'Historic Conserveira & Petiscos Crawl',
        description: 'Sample smoked mackerel, octopus escabeche, and sheep cheese paired with crisp dry white wines.',
        sights: ['Artisan Fish Preservers', 'Historic Grocery Stalls', 'Rua dos Remédios']
      },
      {
        time: '07:15 PM',
        title: 'Hidden Alfama Alleyways & Traditional Bakery',
        description: 'Discover communal washhouses and secret stairways where neighborhood elders gather to gossip.',
        sights: ['Beco do Carneiro', 'Largo do Chafariz de Dentro', 'Warm Pastel de Nata Atelier']
      },
      {
        time: '08:30 PM',
        title: 'Private Fado Recital with Local Red Wine',
        description: 'Settle into low wooden benches for deep, unamplified song expressing the melancholy beauty of Saudade.',
        sights: ['12-string Portuguese Guitar Masterclass', 'Old Taberna Cellar', 'Midnight Port Toast']
      }
    ],
    inclusions: [
      'All 7 curated food tastings and 4 regional wine pairings',
      'Full private acoustic Fado session with resident master musicians',
      'Licensed Lisbon cultural guide',
      'Illustrated pocket guide to Lisbon historic tile patterns'
    ],
    exclusions: [
      'Optional purchase of preserved cans or wine bottles to take home'
    ],
    meetingPoint: 'Miradouro de Santa Luzia Stone Arch',
    meetingAddress: 'Largo Santa Luzia, 1100-487 Lisboa, Portugal',
    meetingCoords: [38.7118, -9.1305],
    coverImage: '/src/assets/images/blog_artisan_market_culinary_1792975379922.jpg',
    category: 'Culinary & Wine',
    nextDates: ['2026-11-03', '2026-11-07', '2026-11-11', '2026-11-16', '2026-11-24'],
    guide: {
      name: 'Tiago de Sousa',
      role: 'Gastronomy Journalist & Portuguese Guitarist',
      avatar: 'TS',
      bio: 'Tiago has reported for European culinary journals for a decade and plays the traditional 12-string guitar in his spare evenings.',
      languages: ['Portuguese (Native)', 'English (Fluent)', 'Spanish (Fluent)'],
      toursLed: 190
    }
  },
  {
    id: 'tour-4',
    slug: 'oaxaca-ancestral-craft-mezcal',
    title: 'Oaxaca Valley: Ancestral Weavers, Wild Mezcal & Ancient Kitchens',
    tagline: 'Journey into the high Sierra to meet Zapotec master weavers, ancestral mezcal distillers, and market cooks.',
    destination: 'Oaxaca',
    region: 'Central Valleys',
    country: 'Mexico',
    lat: 17.0654,
    lng: -96.7236,
    duration: '8 Hours',
    groupSize: 'Max 8 travelers',
    difficulty: 'Easy',
    price: 150,
    originalPrice: 175,
    rating: 4.97,
    reviewCount: 31,
    highlights: [
      'Hands-on natural cochineal and indigo wool dyeing workshop in Teotitlán del Valle',
      'Private visit to a clay pot ancestral mezcal palenque using wild Tobalá agave',
      'Traditional comal lunch of tlayudas, heirloom criollo corn tortillas, and mole negro',
      'Exclusive tour of a family red and black clay ceramic atelier in San Bartolo Coyotepec'
    ],
    itinerary: [
      {
        time: '08:00 AM',
        title: 'Morning Chocolate & Market Gathering',
        description: 'Taste stone-ground cacao with water and canela at the historic Mercado 20 de Noviembre.',
        sights: ['Mercado 20 de Noviembre', 'Smoked Meat Corridor', 'Heirloom Corn Stalls']
      },
      {
        time: '09:45 AM',
        title: 'Teotitlán del Valle: Master Weaving Dynasty',
        description: 'Grind dried cochineal insects and wild marigold flowers into brilliant natural textile pigments.',
        sights: ['Backstrap and Pedal Looms', 'Botanical Dye Garden', 'Zapotec Geometric Designs']
      },
      {
        time: '01:00 PM',
        title: 'Ancestral Smoke Kitchen Luncheon',
        description: 'Sit at an open-air clay hearth table for hand-pressed tetelas and slow-simmered mole negro over wood embers.',
        sights: ['Traditional Clay Comal', 'Metate Grinding Demo', 'Wild Herbal Infusions']
      },
      {
        time: '03:15 PM',
        title: 'Ancestral Clay-Pot Mezcal Tasting',
        description: 'Learn slow pit-roasting in volcanic stone and taste single-village wild Tobalá and Tepeztate spirits.',
        sights: ['Underground Earth Oven', 'Clay Still Condenser', 'Clay Copita Sipping Session']
      }
    ],
    inclusions: [
      'Private sprinter transport with cold water and fresh fruit',
      'All workshop materials and pigment preparation demo',
      'Full home-cooked traditional Zapotec feast',
      'Guided tasting of 5 single-estate artisanal mezcals',
      'Bilingual anthropologist host'
    ],
    exclusions: [
      'Shipping of larger custom rugs or pottery'
    ],
    meetingPoint: 'Santo Domingo Church Atrium Entrance',
    meetingAddress: 'Calle Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca, Oax., Mexico',
    meetingCoords: [17.0652, -96.7235],
    coverImage: '/src/assets/images/hero_travel_curated_journey_1792975378948.jpg',
    category: 'Artisans & Craft',
    nextDates: ['2026-11-05', '2026-11-09', '2026-11-14', '2026-11-19', '2026-11-25'],
    guide: {
      name: 'Ximena Morales',
      role: 'Indigenous Anthropologist & Food Historian',
      avatar: 'XM',
      bio: 'With roots in the Zapotec highlands, Ximena works closely with artisan cooperatives to ensure ethical traveler patronage and fair pay.',
      languages: ['Spanish (Native)', 'Zapotec (Fluent)', 'English (Fluent)'],
      toursLed: 175
    }
  }
];

export const INITIAL_GUIDES: LocalGuide[] = [
  {
    id: 'guide-kyoto',
    slug: 'kyoto-slow-travel',
    title: 'A Slow Traveler\'s Guide to Kyoto: Moss Temples, Tea Masters & Quiet Canals',
    destination: 'Kyoto',
    country: 'Japan',
    category: 'Historic Sanctuaries',
    readTime: '9 min read',
    excerpt: 'How to experience the timeless soul of ancient Japan beyond the tour bus corridors, from secret early morning gardens to family-run tofu makers.',
    bestTimeToVisit: 'Late October to early December for fiery autumn maples, or April for weeping sakura blossoms.',
    intro: 'Kyoto is a city best understood on foot, at a measured pace. While mainstream crowds cluster in front of gilded pavilions, the true spirit of the old capital lingers along quiet stone lanes lined with low-slung wooden machiya houses, where the sound of raked gravel and bamboo water fountains creates an unbroken rhythm of contemplation.',
    centerCoords: [35.0116, 135.7681],
    zoomLevel: 13,
    districts: [
      {
        name: 'Higashiyama North & Philosopher\'s Walk',
        vibe: 'Contemplative, scholarly, and serene stone paths',
        description: 'A quiet green ribbon flanking the Lake Biwa canal, home to peaceful sub-temples and pottery workshops.',
        insiderTips: [
          'Arrive at Honen-in before 8:00 AM to see sunlight piercing through the thatched gate.',
          'Look for the tiny unlabelled kissaten (coffee parlor) serving pour-over coffee in antique Meiji porcelain cups.'
        ]
      },
      {
        name: 'Gion South Preservation District',
        vibe: 'Historic wooden lattice architecture and discreet lantern glow',
        description: 'Tucked away from the main thoroughfare, the southern alleys feature preserved Edo-era townhouses and private tea houses.',
        insiderTips: [
          'Never point cameras at walking Geiko or Maiko; keep phones pocketed out of respect.',
          'Visit Shirakawa canal at dusk when warm paper lanterns reflect on the clear flowing stream.'
        ]
      },
      {
        name: 'Sagano & Arashiyama Backstreets',
        vibe: 'Bamboo groves, rural farm plots, and thatch-roof hermitage temples',
        description: 'Wander two kilometers north of the famous bamboo path to discover Gio-ji, a moss-draped hermitage hidden under maple canopies.',
        insiderTips: [
          'Rent a simple single-speed mamachari bicycle from the station to reach Saga-Toriimoto preservation street.',
          'Stop at an artisan bamboo weaver to watch master craftsmen carve everyday whisks and baskets.'
        ]
      }
    ],
    topSpots: [
      {
        name: 'Honen-in Temple',
        category: 'Heritage',
        description: 'A tranquil forest sanctuary with a thatched entrance gate and sculpted white sand mounds raked daily.',
        coords: [35.0241, 135.7972],
        localTip: 'Admission to the main grounds is free; pause on the wooden bridge to watch koi glide in the mountain pond.'
      },
      {
        name: 'Ippodo Tea Kyoto Flagship',
        category: 'Culinary',
        description: 'Providing premium Uji green tea since 1717. Features a peaceful tearoom where staff teach correct water temperature brewing.',
        coords: [35.0149, 135.7686],
        localTip: 'Order the Gyokuro flight to experience the deep, savory umami sweetness unique to shaded tea leaves.'
      },
      {
        name: 'Murin-an Garden & Villa',
        category: 'Nature',
        description: 'A masterpiece Meiji-period stroll garden designed by Ogawa Jihei VII, incorporating borrow-scenery of the Higashiyama hills.',
        coords: [35.0118, 135.7865],
        localTip: 'Book an advance morning ticket to sit on the tatami veranda with a bowl of whisked green tea.'
      },
      {
        name: 'Kennin-ji Sub-temple',
        category: 'Heritage',
        description: 'The oldest Zen temple in Kyoto, founded by Eisai who brought tea seeds from China to Japan.',
        coords: [35.0006, 135.7738],
        localTip: 'Look upward in the main Dharma hall to admire the powerful ink twin dragons painted across the ceiling.'
      }
    ],
    dayPlan: [
      {
        period: 'Morning',
        title: 'Morning Solitude in Higashiyama',
        activity: 'Walk the shaded trail through Honen-in and Gio-ji gardens while mist still lingers on the stone lanterns.',
        recommendedVenue: 'Honen-in Forest Approach'
      },
      {
        period: 'Afternoon',
        title: 'Artisan Crafts & Slow Tea Tasting',
        activity: 'Visit historic ceramics studios along Gojozaka and learn tea brewing nuances at Ippodo.',
        recommendedVenue: 'Ippodo Tea Salon'
      },
      {
        period: 'Evening',
        title: 'Quiet Dusk Walk & Kaiseki Supper',
        activity: 'Stroll the lantern-lit Shirakawa canal followed by a quiet seasonal vegetarian Shojin Ryori meal.',
        recommendedVenue: 'Shirakawa Waterway'
      }
    ],
    localEtiquette: [
      'Always remove outdoor shoes before stepping onto wooden temple floors or tatami mats.',
      'Refrain from walking while eating street food; finish your snack beside the vendor stall.',
      'Kyoto residents speak in gentle, indirect cadences; avoid loud speakerphone conversations on public transit.',
      'Small cash (100-yen and 1000-yen notes) is essential for temple entrance fees and neighborhood tram fares.'
    ],
    coverImage: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg',
    relatedTourId: 'tour-1'
  },
  {
    id: 'guide-amalfi',
    slug: 'amalfi-coastal-sanctuaries',
    title: 'The Amalfi Coast Beyond the Postcards: Terraced Trails & Fishermen Harbors',
    destination: 'Amalfi Coast',
    country: 'Italy',
    category: 'Coastal Wandering',
    readTime: '8 min read',
    excerpt: 'Escape the crowded ferry quays to discover high cliff paths, organic lemon groves, and family trattorias clinging to sheer rock.',
    bestTimeToVisit: 'May to June or September to mid-October for balmy swimming temperatures and crisp trail air.',
    intro: 'The vertical landscape of Campania is a testament to centuries of human perseverance. Here, families have carved stone terraces into sheer rock faces for a thousand years, cultivating giant sweet Sfusato lemons and sweet cherry tomatoes fed by sea breezes and Mediterranean sun.',
    centerCoords: [40.6340, 14.6027],
    zoomLevel: 12,
    districts: [
      {
        name: 'Agerola & The High Ridges',
        vibe: 'Mountain air, artisan cow milk cheeses, and sweeping gulf vistas',
        description: 'Perched 600 meters above the sea, this agricultural plateau is the peaceful starting gate for high coastal treks.',
        insiderTips: [
          'Pick up fresh wood-fired pane biscottato and provolone del Monaco cheese in Bomerano before hitting the trail.',
          'Start hikes before 9:00 AM to beat midday heat and capture golden maritime light.'
        ]
      },
      {
        name: 'Ravello & Valley of the Mills',
        vibe: 'Medieval gardens, stone aqueducts, and cascading mountain streams',
        description: 'A tranquil hilltop haven beloved by poets and composers, home to terraced lemon groves and historic paper mills.',
        insiderTips: [
          'Hike down from Ravello to Minori via the ancient lemon trail (Sentiero dei Limoni) instead of taking the bus.',
          'Visit Villa Cimbrone late in the afternoon when day-trippers depart and the Terrace of Infinity clears.'
        ]
      }
    ],
    topSpots: [
      {
        name: 'Sentiero degli Dei (Path of the Gods)',
        category: 'Nature',
        description: 'A panoramic mule track tracing the limestone cliffs with jaw-dropping views of Positano and the Island of Capri.',
        coords: [40.6276, 14.5085],
        localTip: 'Bring sturdy footwear with grip; limestone rocks can be slippery when coated with sea mist.'
      },
      {
        name: 'Villa Cimbrone Belvedere',
        category: 'Viewpoint',
        description: 'Perched high above Amalfi, offering what Gore Vidal called the most beautiful view in the world.',
        coords: [40.6475, 14.6112],
        localTip: 'Linger until sunset when the Mediterranean turns from cobalt blue to molten gold.'
      },
      {
        name: 'Fiordo di Furore',
        category: 'Heritage',
        description: 'A deep natural cleft in the cliff wall sheltering a tiny fishermen cove and arched stone bridge.',
        coords: [40.6152, 14.5508],
        localTip: 'View the fjord from a small wooden boat offshore to fully grasp the colossal scale of the rock arch.'
      }
    ],
    dayPlan: [
      {
        period: 'Morning',
        title: 'Traverse the Path of the Gods',
        activity: 'Hike the ridge trail from Bomerano down to Nocelle with panoramic coastal views.',
        recommendedVenue: 'Path of the Gods Overlook'
      },
      {
        period: 'Afternoon',
        title: 'Lemon Grove Harvest & Limoncello',
        activity: 'Walk terraced pergolas, taste fresh lemon salad with mint, and sample artisanal cold liqueurs.',
        recommendedVenue: 'Terraced Lemon Orchard'
      },
      {
        period: 'Evening',
        title: 'Sunset Coastline Boat Glide',
        activity: 'Board a wooden gozzo boat at Positano and watch the cliffside village illuminate with fairy lights.',
        recommendedVenue: 'Amalfi Marina'
      }
    ],
    localEtiquette: [
      'Carry coins for public restrooms and bus tickets; drivers do not sell tickets on board.',
      'Always dress respectfully (cover shoulders and knees) when entering local village churches.',
      'Greet shopkeepers and villagers with a courteous Buongiorno or Buonasera upon entering.',
      'Respect private lemon pergolas; never pick citrus without permission from the grove steward.'
    ],
    coverImage: '/src/assets/images/tour_amalfi_coastal_walk_1792975379607.jpg',
    relatedTourId: 'tour-2'
  },
  {
    id: 'guide-lisbon',
    slug: 'lisbon-alfama-and-beyond',
    title: 'Lisbon\'s Soulful Quarters: Miradouros, Tile Ateliers & Midnight Fado',
    destination: 'Lisbon',
    country: 'Portugal',
    category: 'Urban Heritage',
    readTime: '7 min read',
    excerpt: 'How to navigate Lisbon\'s seven hills like a local, finding artisanal tinned fish, vintage streetcars, and acoustic guitar sessions.',
    bestTimeToVisit: 'March through June, or September through November for sunny days and pleasant evening breezes.',
    intro: 'Lisbon is bathed in an extraordinary luminous light that bounces off the Tagus River and washes across pastel limestone facades. Built across steep hills, its neighborhoods each preserve a distinct village character, where laundry flutters from iron balconies and the melancholy chords of fado drift from open tavern windows.',
    centerCoords: [38.7115, -9.1355],
    zoomLevel: 14,
    districts: [
      {
        name: 'Alfama & Mouraria',
        vibe: 'Moorish alleyways, communal life, and the home of traditional Fado',
        description: 'The oldest quarter in the city survived the great 1755 earthquake, preserving its medieval labyrinthine layout.',
        insiderTips: [
          'Ditch the crowded Tram 28 and explore the stairs of Escadinhas de São Miguel on foot.',
          'Stop at doorsteps marked with small chalk signs for a glass of homemade sour cherry Ginjinha.'
        ]
      },
      {
        name: 'Graça & Penha de França',
        vibe: 'Bohemian viewpoints, neighborhood bistros, and vibrant tile murals',
        description: 'Perched on Lisbon highest hill, offering commanding views across the red roofs and the 25 de Abril suspension bridge.',
        insiderTips: [
          'Watch the sunset from Miradouro da Senhora do Monte with a cold craft beer from a local kiosk.',
          'Explore Tuesday and Saturday flea markets at Feira da Ladra for vintage hand-painted azulejos.'
        ]
      }
    ],
    topSpots: [
      {
        name: 'Miradouro de Santa Luzia',
        category: 'Viewpoint',
        description: 'A romantic pergola lined with blue and white azulejos depicting Lisbon before the 1755 earthquake.',
        coords: [38.7118, -9.1305],
        localTip: 'Arrive at sunrise to hear the city bells chime across the empty river harbor.'
      },
      {
        name: 'Conserveira de Lisboa',
        category: 'Culinary',
        description: 'Operating since 1930 with wooden counters, selling premium tins of sardine fillets, octopus, and cod.',
        coords: [38.7093, -9.1345],
        localTip: 'Ask the shopkeeper for tins wrapped in original vintage 1930s paper wrappers.'
      },
      {
        name: 'National Tile Museum (Museu do Azulejo)',
        category: 'Artisan',
        description: 'Housed in a 16th-century convent, chronicling five centuries of Portuguese decorative ceramic history.',
        coords: [38.7247, -9.1139],
        localTip: 'Do not miss the 23-meter-long ceramic panorama of Lisbon created in 1738.'
      }
    ],
    dayPlan: [
      {
        period: 'Morning',
        title: 'Sunrise at Santa Luzia & Moorish Steps',
        activity: 'Watch the Tagus glow from the bougainvillea terrace before wandering the quiet steps of Alfama.',
        recommendedVenue: 'Santa Luzia Terrace'
      },
      {
        period: 'Afternoon',
        title: 'Tile Painting & Petiscos Tasting',
        activity: 'Visit an artisan ceramic workshop to watch hand-stenciled glazing, followed by petiscos and green wine.',
        recommendedVenue: 'Historic Tile Studio'
      },
      {
        period: 'Evening',
        title: 'Authentic Acoustic Fado Session',
        activity: 'Spend the evening in a modest neighborhood taberna listening to unamplified guitar and vocalists.',
        recommendedVenue: 'Old Alfama Taberna'
      }
    ],
    localEtiquette: [
      'Wear sturdy shoes with rubber grip; Lisbon polished Portuguese pavement (calçada) can be slick.',
      'Never break a bread roll with a knife in traditional restaurants; break it gently with your fingers.',
      'Keep quiet during Fado performances; making loud conversation while the fadista sings is strictly frowned upon.',
      'Say Obrigado (if male) or Obrigada (if female) as a polite gesture of gratitude.'
    ],
    coverImage: '/src/assets/images/blog_artisan_market_culinary_1792975379922.jpg',
    relatedTourId: 'tour-3'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'secret-dawn-markets-kyoto',
    title: 'The Secret Dawn Markets of Kyoto: What Guidebooks Miss',
    category: 'Local Lore & Culture',
    readTime: '6 min read',
    publishedDate: 'October 18, 2026',
    author: {
      name: 'Kenji Takahashi',
      role: 'Kyoto Resident & Guide'
    },
    excerpt: 'Before temple bells toll and tour coaches arrive, Kyoto awaken in a quiet dance of fresh yuba, hand-cut soba, and centuries-old temple flea stalls.',
    coverImage: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg',
    paragraphs: [
      'Most visitors know Nishiki Market, Kyoto\'s famed food arcade. But at 6:00 AM, long before the tourist shutters roll up, an entirely different ritual takes place in the temple courtyards and riverfront wholesale alleys. At To-ji temple, when the monthly Kobo-san market stirs to life before sunrise, elderly antique dealers unpack Edo-era ceramics from wooden kiri-boxes using kerosene lanterns for illumination.',
      'Here, you will find master carpenters selling restored planes with forged steel blades, grandmother farmers displaying purple Kamo eggplants wrapped in straw, and monks sweeping stone paths under the silhouette of Japan\'s tallest five-story wooden pagoda.',
      'The morning air in late autumn carries the crisp scent of burning cedar incense and boiling dashi broth. Slipping into a neighborhood noodle stall with steam condensing on the sliding glass door, a bowl of piping hot Kitsune Udon with sweet fried tofu costs barely 500 yen, yet tastes like two hundred years of refined culinary memory.'
    ],
    quote: {
      text: 'To understand Kyoto, you do not look at the monumental gold; you look at how an artisan sweeps the leaves between cobblestones before dawn.',
      source: 'Kenji Takahashi, Kyoto Cultural Steward'
    },
    keyTakeaways: [
      'Visit To-ji temple on the 21st of any month for the historic Kobo-san dawn flea market.',
      'Look for the blue noren curtains of unadvertised tofu shops along the Shirakawa canal between 6:30 and 8:00 AM.',
      'Carry cash coins; early morning market elders rarely accept cards or digital passes.'
    ],
    relatedTourId: 'tour-1',
    comments: [
      {
        id: 'c-1',
        author: 'Elena Rostova',
        date: 'October 21, 2026',
        text: 'This advice changed our entire Kyoto visit. We set our alarms for 5:30 AM to walk Kennin-ji in the mist and it felt like another dimension.'
      },
      {
        id: 'c-2',
        author: 'Marcus Vance',
        date: 'October 23, 2026',
        text: 'The recommendation for the morning soba stall near the canal was spot on. True travel writing.'
      }
    ]
  },
  {
    id: 'blog-2',
    slug: 'foragers-guide-coastal-herbs',
    title: 'A Forager\'s Notebook: Wild Herbs, Sea Fennel & Ancient Citrus Along Mediterranean Trails',
    category: 'Culinary Journeys',
    readTime: '5 min read',
    publishedDate: 'October 12, 2026',
    author: {
      name: 'Chiara Esposito',
      role: 'Agronomist & Alpine Guide'
    },
    excerpt: 'High above the turquoise bays of Campania, cliffside microclimates yield aromatic botanical treasures used in coastal kitchens for millenia.',
    coverImage: '/src/assets/images/tour_amalfi_coastal_walk_1792975379607.jpg',
    paragraphs: [
      'When you walk the mule tracks between Bomerano and Nocelle, your boots crush wild thyme, sage, and maritime fennel growing in limestone crevices. The air changes every fifty yards: first the salty tang of sea spray rising up the cliff face, then the intoxicating honeysuckle sweetness of wild myrtle blossoms, and finally the sharp, invigorating perfume of sun-warmed lemon leaves.',
      'In our family kitchen, we don\'t just cook with the fruit of the lemon tree—we use the thick, bitter-sweet white pith (the albedo) tossed with wild mint and chili for a refreshing summer antipasto. Lemon leaves themselves are brushed with olive oil, wrapped around rounds of fresh provolone, and baked over embers until the cheese melts and absorbs the citrus oils.',
      'Travelers frequently ask why food tastes so vivid on the coast. It is not complex culinary technique; it is that the ingredients have grown rooted in volcanic soil, soaked in Mediterranean sun, and harvested only minutes before hitting the table.'
    ],
    quote: {
      text: 'Good cooking on the Amalfi cliffs is not about adding luxury; it is about paying attention to the wild herbs growing beneath your boots.',
      source: 'Chiara Esposito'
    },
    keyTakeaways: [
      'Rub lemon tree leaves between fingers to identify the sweet Sfusato varietal by its pure floral fragrance.',
      'Sample insalata di limoni (peeled lemon salad with mint and garlic) at rustic hill trattorias.',
      'Support family-run organic groves that preserve traditional chestnut-wood pergolas.'
    ],
    relatedTourId: 'tour-2',
    comments: [
      {
        id: 'c-3',
        author: 'Sofia Lindqvist',
        date: 'October 15, 2026',
        text: 'The lemon leaf wrapped baked cheese was one of the greatest things I have ever tasted during our hike with Chiara!'
      }
    ]
  },
  {
    id: 'blog-3',
    slug: 'ethics-of-living-cultural-heritage',
    title: 'How to Ethically Experience Living Cultural Heritage',
    category: 'Sustainable Travel',
    readTime: '7 min read',
    publishedDate: 'September 28, 2026',
    author: {
      name: 'Ximena Morales',
      role: 'Indigenous Anthropologist'
    },
    excerpt: 'Practical principles for travelers visiting artisan cooperatives, indigenous communities, and living sacred traditions without turning culture into a spectacle.',
    coverImage: '/src/assets/images/hero_travel_curated_journey_1792975378948.jpg',
    paragraphs: [
      'Tourism can either be a force that preserves ancestral craftsmanship through dignified livelihood, or an extractive force that commodifies ceremonies into staged performances for cameras. When we lead travelers into the weaving studios of the Zapotec highlands in Oaxaca, our primary rule is simple: we arrive as invited guests, not spectators.',
      'True cultural exchange requires presence. Before taking a photograph of an artisan preparing natural indigo dye or spinning wool, take twenty minutes to listen to their story. Ask about the plants they cultivate, how the patterns have been passed down through five generations, and what challenges their craft faces in the modern world.',
      'Purchasing directly from makers at fair, dignified prices ensures that young artisans see a viable future in carrying forward their heritage, rather than being forced to migrate to urban factories.'
    ],
    quote: {
      text: 'Culture is not a museum display behind glass; it is the living breath and livelihood of communities. Walk with humility.',
      source: 'Ximena Morales'
    },
    keyTakeaways: [
      'Always seek permission before photographing artisans or their work.',
      'Buy directly from family cooperatives rather than commercial souvenir brokers.',
      'Choose small-group tours capped at 8-10 travelers to minimize disruption to neighborhood rhythms.'
    ],
    relatedTourId: 'tour-4',
    comments: [
      {
        id: 'c-4',
        author: 'David Chen',
        date: 'October 02, 2026',
        text: 'This is the manifesto every modern traveler needs to read. Thank you for setting this standard.'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tourId: 'tour-1',
    author: {
      name: 'Claire Beauchamp',
      country: 'France',
      travelerType: 'Solo'
    },
    date: 'October 14, 2026',
    rating: 5,
    title: 'The highlight of two weeks in Japan',
    comment: 'Kenji is an extraordinary guide. Having private dawn access to the moss garden before any crowds was sublime—you could literally hear water droplets falling on stones. The tea ceremony in the private machiya was deeply moving and completely authentic. Worth every single yen.',
    breakdown: {
      knowledge: 5,
      pacing: 5,
      sights: 5,
      value: 5
    },
    helpfulCount: 24,
    verified: true
  },
  {
    id: 'rev-2',
    tourId: 'tour-1',
    author: {
      name: 'Julian & Sarah Miller',
      country: 'United Kingdom',
      travelerType: 'Couple'
    },
    date: 'September 29, 2026',
    rating: 5,
    title: 'Intimate, respectful, and visually breathtaking',
    comment: 'The small group size of just 6 travelers made it feel like a private walk with a knowledgeable friend. The Kaiseki lunch along the Shirakawa canal was the best meal we had in Kyoto. Kenji was gracious and patient with all our questions about Zen philosophy.',
    breakdown: {
      knowledge: 5,
      pacing: 4.8,
      sights: 5,
      value: 4.9
    },
    helpfulCount: 19,
    verified: true
  },
  {
    id: 'rev-3',
    tourId: 'tour-2',
    author: {
      name: 'Matteo & Sofia Rossi',
      country: 'Switzerland',
      travelerType: 'Couple'
    },
    date: 'October 19, 2026',
    rating: 5,
    title: 'Chiara is a treasure! Unforgettable cliff views and rustic food',
    comment: 'We have hiked across Europe, but this tour was something special. Chiara took us through her familys private lemon terraces where her father offered us freshly made granita. The shepherd lunch on the cliff was unforgettable, and returning by wooden boat saved us from grueling traffic.',
    breakdown: {
      knowledge: 5,
      pacing: 5,
      sights: 5,
      value: 5
    },
    helpfulCount: 31,
    verified: true
  },
  {
    id: 'rev-4',
    tourId: 'tour-3',
    author: {
      name: 'Hannah Ward',
      country: 'Canada',
      travelerType: 'Small Group'
    },
    date: 'October 08, 2026',
    rating: 5,
    title: 'Real acoustic Fado with goosebumps',
    comment: 'Tiago showed us Alfama through the eyes of an insider. The canned fish tasting at the 1930s conserveira completely blew my expectations, and the late-night Fado performance in the stone cellar made half our group cry. Truly poetic.',
    breakdown: {
      knowledge: 5,
      pacing: 4.9,
      sights: 4.8,
      value: 5
    },
    helpfulCount: 17,
    verified: true
  },
  {
    id: 'rev-5',
    tourId: 'tour-4',
    author: {
      name: 'Lucas Morales',
      country: 'United States',
      travelerType: 'Couple'
    },
    date: 'September 22, 2026',
    rating: 5,
    title: 'Transformative immersion into Zapotec traditions',
    comment: 'Ximena is a brilliant guide who treats every artisan with deep respect. Grinding our own cochineal pigments and tasting wild mezcal from a clay still were once-in-a-lifetime memories. The mole negro was simply sublime.',
    breakdown: {
      knowledge: 5,
      pacing: 5,
      sights: 5,
      value: 5
    },
    helpfulCount: 22,
    verified: true
  }
];

export const INITIAL_MAP_POIS: MapPOI[] = [
  {
    id: 'poi-1',
    name: 'Kennin-ji Sub-temple Moss Garden',
    category: 'Heritage',
    destination: 'Kyoto',
    lat: 35.0006,
    lng: 135.7738,
    description: 'Kyoto oldest Zen temple grounds sheltering secluded dry landscape rock and moss gardens.',
    localTip: 'Best visited at 8:00 AM before gates open to tour groups.',
    relatedTourId: 'tour-1',
    image: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg'
  },
  {
    id: 'poi-2',
    name: 'Ippodo Traditional Tea Salon',
    category: 'Culinary',
    destination: 'Kyoto',
    lat: 35.0149,
    lng: 135.7686,
    description: 'Centuries-old green tea merchant teaching delicate whisking and water temperatures.',
    localTip: 'Order the Gyokuro shaded green tea flight with fresh seasonal wagashi.',
    relatedTourId: 'tour-1',
    image: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg'
  },
  {
    id: 'poi-3',
    name: 'Shirakawa Canal & Tatsumi Bridge',
    category: 'Viewpoint',
    destination: 'Kyoto',
    lat: 35.0058,
    lng: 135.7744,
    description: 'Atmospheric stone canal flanked by willows, cherry trees, and preserved wooden teahouses.',
    localTip: 'Walk here at dusk when lanterns glow across the clear river waters.',
    relatedTourId: 'tour-1',
    image: '/src/assets/images/tour_kyoto_tea_gardens_1792975378942.jpg'
  },
  {
    id: 'poi-4',
    name: 'Sentiero degli Dei Ridge Overlook',
    category: 'Nature',
    destination: 'Amalfi Coast',
    lat: 40.6276,
    lng: 14.5085,
    description: 'Precipitous clifftop trail 500 meters above the azure waters of the Salerno Gulf.',
    localTip: 'Bring hiking poles; morning clouds often part by 10 AM to reveal Capri.',
    relatedTourId: 'tour-2',
    image: '/src/assets/images/tour_amalfi_coastal_walk_1792975379607.jpg'
  },
  {
    id: 'poi-5',
    name: 'Acqua Madre Lemon Pergolas',
    category: 'Artisan',
    destination: 'Amalfi Coast',
    lat: 40.6355,
    lng: 14.5880,
    description: 'Fourth-generation organic lemon farm cultivating sweet Sfusato Amalfitano citrus.',
    localTip: 'Try the fresh lemon granita sprinkled with freshly cracked mint leaves.',
    relatedTourId: 'tour-2',
    image: '/src/assets/images/tour_amalfi_coastal_walk_1792975379607.jpg'
  },
  {
    id: 'poi-6',
    name: 'Miradouro de Santa Luzia Terrace',
    category: 'Viewpoint',
    destination: 'Lisbon',
    lat: 38.7118,
    lng: -9.1305,
    description: 'Bougainvillea-shaded balcony adorned with blue azulejo tiles overlooking the Tagus river.',
    localTip: 'Sunrise is magic here; local acoustic guitarists often practice on benches.',
    relatedTourId: 'tour-3',
    image: '/src/assets/images/blog_artisan_market_culinary_1792975379922.jpg'
  },
  {
    id: 'poi-7',
    name: 'Conserveira de Lisboa Heritage Shop',
    category: 'Culinary',
    destination: 'Lisbon',
    lat: 38.7093,
    lng: -9.1345,
    description: 'Vintage grocery store selling hand-wrapped tins of spiced sardines, tuna, and sea bounty.',
    localTip: 'Look for the Tricana label tins packaged in 1930s graphic wrappers.',
    relatedTourId: 'tour-3',
    image: '/src/assets/images/blog_artisan_market_culinary_1792975379922.jpg'
  },
  {
    id: 'poi-8',
    name: 'Teotitlán Zapotec Weaving Studio',
    category: 'Artisan',
    destination: 'Oaxaca',
    lat: 17.0267,
    lng: -96.5186,
    description: 'Cooperative workshop producing virgin wool rugs dyed with cochineal, indigo, and rock moss.',
    localTip: 'Ask master weavers to show you the metate grinding of wild cochineal insects.',
    relatedTourId: 'tour-4',
    image: '/src/assets/images/hero_travel_curated_journey_1792975378948.jpg'
  },
  {
    id: 'poi-9',
    name: 'Palenque El Tobalá Ancestral Distillery',
    category: 'Culinary',
    destination: 'Oaxaca',
    lat: 16.9450,
    lng: -96.5820,
    description: 'Earth pit roasting oven and clay pot stills crafting small-batch wild agave mezcal.',
    localTip: 'Sip mezcal slowly from a traditional jícara gourd, paired with fresh orange slices.',
    relatedTourId: 'tour-4',
    image: '/src/assets/images/hero_travel_curated_journey_1792975378948.jpg'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingRef: 'WL-78241',
    tourId: 'tour-1',
    tourTitle: 'Kyoto Dawn: Ancient Moss Gardens, Master Tea Ceremony & Secret Alleys',
    destination: 'Kyoto',
    date: '2026-11-12',
    timeSlot: '07:30 AM',
    guests: {
      adults: 2,
      children: 0
    },
    totalPrice: 370,
    leadTraveler: {
      fullName: 'Emma Watson',
      email: 'emma.watson@example.com',
      phone: '+44 7700 900123',
      country: 'United Kingdom',
      dietaryNotes: 'One vegetarian, no seafood.'
    },
    status: 'confirmed',
    bookedAt: '2026-10-24T14:32:00Z',
    qrCodeId: 'WL-KYOTO-78241'
  }
];
