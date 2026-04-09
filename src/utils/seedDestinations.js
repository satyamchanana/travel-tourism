import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const destinationsData = [
  {
    name: "Goa", type: "Beach",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    rating: 4.8, price: 8000,
    desc: "Sun, sand and seafood — Goa is India's ultimate beach paradise with Portuguese heritage, vibrant nightlife, and stunning coastlines stretching across North and South Goa.",
    lat: 15.2993, lng: 74.1240,
    bestTime: "November to February", duration: "4-6 Days",
    highlights: ["Water Sports", "Portuguese Architecture", "Beach Shacks", "Nightlife", "Spice Plantations"],
    spots: [
      { name: "Baga Beach", desc: "Most popular beach known for water sports and nightlife", lat: 15.5524, lng: 73.7515 },
      { name: "Basilica of Bom Jesus", desc: "UNESCO World Heritage Site, 16th century Portuguese church", lat: 15.5009, lng: 73.9117 },
      { name: "Fort Aguada", desc: "17th century Portuguese fort with lighthouse and sea views", lat: 15.4891, lng: 73.7732 },
      { name: "Dudhsagar Falls", desc: "One of India's tallest waterfalls deep in the Western Ghats", lat: 15.3144, lng: 74.3144 },
      { name: "Anjuna Flea Market", desc: "Iconic Wednesday market for clothes, jewelry and souvenirs", lat: 15.5738, lng: 73.7394 },
    ]
  },
  {
    name: "Manali", type: "Mountain",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    rating: 4.7, price: 10000,
    desc: "Snow-capped peaks, lush valleys and thrilling adventure sports make Manali one of India's most beloved hill stations nestled in the heart of Himachal Pradesh.",
    lat: 32.2432, lng: 77.1892,
    bestTime: "October to June", duration: "5-7 Days",
    highlights: ["Snow Activities", "Paragliding", "River Rafting", "Ancient Temples", "Apple Orchards"],
    spots: [
      { name: "Rohtang Pass", desc: "High mountain pass at 3,978m with stunning snow views", lat: 32.3710, lng: 77.2448 },
      { name: "Solang Valley", desc: "Adventure hub for skiing, paragliding and zorbing", lat: 32.3195, lng: 77.1585 },
      { name: "Hadimba Temple", desc: "Ancient wooden temple surrounded by cedar forest", lat: 32.2396, lng: 77.1763 },
      { name: "Old Manali", desc: "Charming village with cafes, guesthouses and hippie culture", lat: 32.2539, lng: 77.1734 },
      { name: "Beas River", desc: "Scenic river perfect for rafting and riverside walks", lat: 32.2165, lng: 77.1927 },
    ]
  },
  {
    name: "Jaipur", type: "Heritage",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    rating: 4.6, price: 6000,
    desc: "The Pink City of India — Jaipur is a royal treasure trove of magnificent forts, ornate palaces, vibrant bazaars and rich Rajasthani culture.",
    lat: 26.9124, lng: 75.7873,
    bestTime: "October to March", duration: "3-4 Days",
    highlights: ["Royal Forts", "Elephant Rides", "Rajasthani Cuisine", "Gem Shopping", "Cultural Shows"],
    spots: [
      { name: "Amber Fort", desc: "Majestic fort-palace with stunning architecture and elephant rides", lat: 26.9855, lng: 75.8513 },
      { name: "Hawa Mahal", desc: "Iconic Palace of Winds with 953 small windows", lat: 26.9239, lng: 75.8267 },
      { name: "City Palace", desc: "Royal residence with museums, courtyards and beautiful art", lat: 26.9258, lng: 75.8237 },
      { name: "Jantar Mantar", desc: "UNESCO listed astronomical observatory built in 18th century", lat: 26.9246, lng: 75.8242 },
      { name: "Johari Bazaar", desc: "Famous market for gemstones, jewelry and Rajasthani crafts", lat: 26.9182, lng: 75.8228 },
    ]
  },
  {
    name: "Kerala", type: "Nature",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    rating: 4.9, price: 12000,
    desc: "God's Own Country — Kerala enchants visitors with serene backwaters, lush tea gardens, exotic wildlife and rich cultural traditions.",
    lat: 10.8505, lng: 76.2711,
    bestTime: "September to March", duration: "6-8 Days",
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Tea Plantation Tour", "Kathakali Dance", "Wildlife Safari"],
    spots: [
      { name: "Alleppey Backwaters", desc: "Iconic houseboat rides through tranquil canals and lagoons", lat: 9.4981, lng: 76.3388 },
      { name: "Munnar Tea Gardens", desc: "Rolling hills covered in lush green tea plantations", lat: 10.0889, lng: 77.0595 },
      { name: "Periyar Wildlife Sanctuary", desc: "Tiger reserve famous for elephants and boat safaris", lat: 9.4588, lng: 77.1567 },
      { name: "Kovalam Beach", desc: "Crescent-shaped beach popular for Ayurvedic resorts", lat: 8.3988, lng: 76.9782 },
      { name: "Fort Kochi", desc: "Historic area with Chinese fishing nets and colonial architecture", lat: 9.9658, lng: 76.2421 },
    ]
  },
  {
    name: "Agra", type: "Heritage",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    rating: 4.7, price: 5000,
    desc: "Home to the immortal Taj Mahal — Agra is a city where love is etched in marble, a UNESCO World Heritage Site and one of the Seven Wonders of the World.",
    lat: 27.1767, lng: 78.0081,
    bestTime: "October to March", duration: "2-3 Days",
    highlights: ["Taj Mahal Sunrise", "Mughal Architecture", "Marble Handicrafts", "Petha Sweets", "Sunset Views"],
    spots: [
      { name: "Taj Mahal", desc: "Iconic ivory-white marble mausoleum, symbol of eternal love", lat: 27.1751, lng: 78.0421 },
      { name: "Agra Fort", desc: "UNESCO listed Mughal fort with palaces and mosques inside", lat: 27.1795, lng: 78.0211 },
      { name: "Fatehpur Sikri", desc: "Abandoned Mughal capital city with stunning red sandstone buildings", lat: 27.0945, lng: 77.6679 },
      { name: "Mehtab Bagh", desc: "Moonlit garden offering the best sunset view of the Taj Mahal", lat: 27.1800, lng: 78.0443 },
      { name: "Kinari Bazaar", desc: "Bustling market for marble handicrafts and local sweets", lat: 27.1817, lng: 78.0195 },
    ]
  },
  {
    name: "Andaman", type: "Beach",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    rating: 4.9, price: 18000,
    desc: "Crystal clear turquoise waters, pristine white sand beaches and vibrant coral reefs make the Andaman Islands India's most exotic tropical destination.",
    lat: 11.7401, lng: 92.6586,
    bestTime: "October to May", duration: "6-8 Days",
    highlights: ["Scuba Diving", "Snorkeling", "Sea Walking", "Island Hopping", "Bioluminescent Beaches"],
    spots: [
      { name: "Radhanagar Beach", desc: "Rated Asia's best beach with powder-white sand and clear waters", lat: 11.9869, lng: 92.9546 },
      { name: "Cellular Jail", desc: "Historic colonial prison, now a national memorial and light show venue", lat: 11.6695, lng: 92.7463 },
      { name: "Havelock Island", desc: "Most popular island for snorkeling, diving and beach resorts", lat: 11.9812, lng: 93.0012 },
      { name: "Neil Island", desc: "Quiet laid-back island known for natural coral bridges", lat: 11.8322, lng: 93.0507 },
      { name: "North Bay Island", desc: "Ideal for glass-bottom boat rides and sea walking", lat: 11.7033, lng: 92.7661 },
    ]
  },
  {
    name: "Rishikesh", type: "Adventure",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    rating: 4.7, price: 7000,
    desc: "The Yoga Capital of the World sits at the foothills of the Himalayas, offering thrilling river rafting, ancient temples and a deeply spiritual atmosphere.",
    lat: 30.0869, lng: 78.2676,
    bestTime: "September to June", duration: "3-5 Days",
    highlights: ["River Rafting", "Bungee Jumping", "Yoga Retreats", "Ganga Aarti", "Camping"],
    spots: [
      { name: "Laxman Jhula", desc: "Iconic iron suspension bridge over the holy Ganges river", lat: 30.1234, lng: 78.3210 },
      { name: "Ram Jhula", desc: "Sacred bridge connecting ashrams on both banks of the Ganga", lat: 30.1065, lng: 78.3098 },
      { name: "Triveni Ghat", desc: "Sacred bathing ghat with spectacular Ganga Aarti every evening", lat: 30.1048, lng: 78.2975 },
      { name: "Neer Garh Waterfall", desc: "Beautiful waterfall trek through the forest 4km from town", lat: 30.1347, lng: 78.3452 },
      { name: "Beatles Ashram", desc: "Famous abandoned ashram where The Beatles meditated in 1968", lat: 30.1082, lng: 78.3194 },
    ]
  },
  {
    name: "Varanasi", type: "Heritage",
    img: "https://images.unsplash.com/photo-1561361058-c24e01dc5c8a?w=800",
    rating: 4.6, price: 4500,
    desc: "One of the world's oldest living cities — Varanasi is the spiritual heart of India where ancient traditions, sacred ghats and the holy Ganges converge.",
    lat: 25.3176, lng: 82.9739,
    bestTime: "October to March", duration: "2-3 Days",
    highlights: ["Ganga Aarti", "Boat Ride at Sunrise", "Ancient Temples", "Banarasi Silk", "Street Food"],
    spots: [
      { name: "Dashashwamedh Ghat", desc: "Main ghat famous for the spectacular evening Ganga Aarti", lat: 25.3065, lng: 83.0109 },
      { name: "Kashi Vishwanath Temple", desc: "One of the most sacred Hindu temples dedicated to Lord Shiva", lat: 25.3109, lng: 83.0107 },
      { name: "Manikarnika Ghat", desc: "The sacred cremation ghat burning continuously for thousands of years", lat: 25.3080, lng: 83.0122 },
      { name: "Sarnath", desc: "Where Buddha gave his first sermon 13km from Varanasi", lat: 25.3811, lng: 83.0228 },
      { name: "Ramnagar Fort", desc: "18th century fort and museum on the opposite bank of Ganga", lat: 25.2803, lng: 83.0369 },
    ]
  },
  {
    name: "Coorg", type: "Nature",
    img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800",
    rating: 4.8, price: 9000,
    desc: "The Scotland of India — Coorg is a misty paradise of coffee plantations, rolling hills, roaring waterfalls and rich Kodava culture in Karnataka.",
    lat: 12.3375, lng: 75.8069,
    bestTime: "October to March", duration: "3-4 Days",
    highlights: ["Coffee Plantation Tour", "Elephant Camp", "Waterfall Treks", "Coorg Cuisine", "Monastery Visit"],
    spots: [
      { name: "Abbey Falls", desc: "Stunning waterfall surrounded by coffee plantations and spice estates", lat: 12.4147, lng: 75.7352 },
      { name: "Raja's Seat", desc: "Scenic garden with breathtaking sunset views over misty valleys", lat: 12.4211, lng: 75.7379 },
      { name: "Namdroling Monastery", desc: "Golden Temple, one of the largest Tibetan Buddhist monasteries", lat: 12.3522, lng: 75.9317 },
      { name: "Dubare Elephant Camp", desc: "Interactive elephant camp on the banks of river Cauvery", lat: 12.3498, lng: 75.9421 },
      { name: "Brahmagiri Peak", desc: "Trekking destination with panoramic views of the Western Ghats", lat: 11.9368, lng: 75.8924 },
    ]
  },
  {
    name: "Ladakh", type: "Adventure",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.9, price: 15000,
    desc: "The Land of High Passes — Ladakh is a surreal high-altitude desert with monasteries perched on cliffsides, crystal lakes and some of the world's most dramatic landscapes.",
    lat: 34.1526, lng: 77.5771,
    bestTime: "June to September", duration: "7-10 Days",
    highlights: ["Pangong Lake", "Monastery Visits", "Mountain Biking", "Stargazing", "Bike Expeditions"],
    spots: [
      { name: "Pangong Lake", desc: "Stunning high-altitude lake that changes colours through the day", lat: 33.7540, lng: 78.6638 },
      { name: "Thiksey Monastery", desc: "Magnificent 12-storey monastery resembling Potala Palace in Tibet", lat: 33.9774, lng: 77.6680 },
      { name: "Nubra Valley", desc: "High-altitude cold desert with double-humped Bactrian camels", lat: 34.6504, lng: 77.5619 },
      { name: "Magnetic Hill", desc: "Mysterious hill where vehicles appear to move uphill on their own", lat: 34.1700, lng: 77.3200 },
      { name: "Khardung La Pass", desc: "One of the world's highest motorable roads at 5,359m", lat: 34.2768, lng: 77.6028 },
    ]
  },
  {
    name: "Shimla", type: "Mountain",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    rating: 4.6, price: 8500,
    desc: "The Queen of Hills — Shimla is a charming colonial hill station with toy trains, snow-covered peaks, Victorian architecture and a relaxed mountain vibe.",
    lat: 31.1048, lng: 77.1734,
    bestTime: "October to June", duration: "3-5 Days",
    highlights: ["Toy Train Ride", "Mall Road", "Snow Activities", "Colonial Architecture", "Trekking"],
    spots: [
      { name: "Mall Road", desc: "Heart of Shimla with shops, restaurants and stunning valley views", lat: 31.1041, lng: 77.1670 },
      { name: "Christ Church", desc: "Second oldest church in North India with beautiful stained glass", lat: 31.1048, lng: 77.1695 },
      { name: "Jakhu Temple", desc: "Ancient Hanuman temple on the highest peak of Shimla", lat: 31.1080, lng: 77.1794 },
      { name: "Kufri", desc: "Popular ski resort with panoramic Himalayan views 13km from Shimla", lat: 31.0986, lng: 77.2674 },
      { name: "Kalka-Shimla Railway", desc: "UNESCO listed narrow gauge toy train through 102 tunnels", lat: 31.1008, lng: 77.1671 },
    ]
  },
  {
    name: "Mysore", type: "Heritage",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    rating: 4.7, price: 6500,
    desc: "The City of Palaces — Mysore is a regal city famous for its grand palace, silk sarees, sandalwood products and the spectacular Dasara celebrations.",
    lat: 12.2958, lng: 76.6394,
    bestTime: "October to February", duration: "2-3 Days",
    highlights: ["Mysore Palace", "Silk Shopping", "Chamundi Hills", "Dasara Festival", "Sandalwood Products"],
    spots: [
      { name: "Mysore Palace", desc: "Magnificent royal palace illuminated by 97,000 bulbs on weekends", lat: 12.3052, lng: 76.6552 },
      { name: "Chamundi Hills", desc: "Sacred hilltop temple with sweeping views over Mysore city", lat: 12.2723, lng: 76.6722 },
      { name: "Brindavan Gardens", desc: "Beautiful terraced gardens with musical fountain shows at night", lat: 12.4244, lng: 76.5726 },
      { name: "Devaraja Market", desc: "Vibrant 100-year-old market famous for flowers, spices and silk", lat: 12.3074, lng: 76.6545 },
      { name: "St. Philomena's Church", desc: "Neo-Gothic church, one of the tallest in India", lat: 12.3141, lng: 76.6455 },
    ]
  },
]

export const seedDestinations = async () => {
  console.log('Seeding destinations...')
  for (const dest of destinationsData) {
    await addDoc(collection(db, 'destinations'), dest)
    console.log(`Added: ${dest.name}`)
  }
  console.log('Done! All destinations seeded.')
}