const products = [
  {
    "id": 1,
    "slug": "elegance-noir",
    "name": "ELEGANCE NOIR",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.",
    "price": 65.99,
    "image_url": "https://fimgs.net/mdimg/perfume-thumbs/375x500.46872.jpg",
    "accent": "black"
  },
  {
    "id": 2,
    "slug": "royal-orchid",
    "name": "ROYAL ORCHID",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.",
    "price": 76.99,
    "image_url": "https://i.pinimg.com/736x/45/08/28/4508288c99fad4e033e5ec72237bd639.jpg",
    "accent": "amber"
  },
  {
    "id": 3,
    "slug": "divine-bliss",
    "name": "DIVINE BLISS",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.",
    "price": 87.99,
    "image_url": "https://www.pinterest.com/pin/627618898114316584/",
    "accent": "rose"
  },
  {
    "id": 4,
    "slug": "midnight-oud",
    "name": "MIDNIGHT OUD",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.",
    "price": 98.99,
    "image_url": "https://www.pinterest.com/pin/1105633777347351691/",
    "accent": "gold"
  },
  {
    "id": 5,
    "slug": "golden-vanilla",
    "name": "GOLDEN VANILLA",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.",
    "price": 109.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 6,
    "slug": "velvet-mystique",
    "name": "VELVET MYSTIQUE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.",
    "price": 120.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 7,
    "slug": "imperial-bloom",
    "name": "IMPERIAL BLOOM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.",
    "price": 131.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 8,
    "slug": "mystic-saffron",
    "name": "MYSTIC SAFFRON",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.",
    "price": 142.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 9,
    "slug": "eternal-charm",
    "name": "ETERNAL CHARM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.",
    "price": 153.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 10,
    "slug": "noble-musk",
    "name": "NOBLE MUSK",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.",
    "price": 74.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 11,
    "slug": "amber-jasmine",
    "name": "AMBER JASMINE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.",
    "price": 85.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 12,
    "slug": "crimson-grace",
    "name": "CRIMSON GRACE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.",
    "price": 96.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 13,
    "slug": "silk-essence",
    "name": "SILK ESSENCE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.",
    "price": 107.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 14,
    "slug": "radiant-velvet",
    "name": "RADIANT VELVET",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.",
    "price": 118.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 15,
    "slug": "opulent-desire",
    "name": "OPULENT DESIRE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.",
    "price": 129.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 16,
    "slug": "serene-rose",
    "name": "SERENE ROSE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.",
    "price": 140.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 17,
    "slug": "aurora-dawn",
    "name": "AURORA DAWN",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.",
    "price": 151.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 18,
    "slug": "celestial-aura",
    "name": "CELESTIAL AURA",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.",
    "price": 72.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 19,
    "slug": "timeless-amber",
    "name": "TIMELESS AMBER",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.",
    "price": 83.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 20,
    "slug": "enchanted-dusk",
    "name": "ENCHANTED DUSK",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.",
    "price": 94.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 21,
    "slug": "sapphire-noir",
    "name": "SAPPHIRE NOIR",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.",
    "price": 105.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 22,
    "slug": "ivory-orchid",
    "name": "IVORY ORCHID",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.",
    "price": 116.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 23,
    "slug": "onyx-bliss",
    "name": "ONYX BLISS",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.",
    "price": 127.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 24,
    "slug": "platinum-oud",
    "name": "PLATINUM OUD",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.",
    "price": 138.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 25,
    "slug": "whisper-vanilla",
    "name": "WHISPER VANILLA",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.",
    "price": 149.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 26,
    "slug": "elegance-mystique",
    "name": "ELEGANCE MYSTIQUE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.",
    "price": 70.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 27,
    "slug": "royal-bloom",
    "name": "ROYAL BLOOM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.",
    "price": 81.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 28,
    "slug": "divine-saffron",
    "name": "DIVINE SAFFRON",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.",
    "price": 92.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 29,
    "slug": "midnight-charm",
    "name": "MIDNIGHT CHARM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.",
    "price": 103.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 30,
    "slug": "golden-musk",
    "name": "GOLDEN MUSK",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.",
    "price": 114.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 31,
    "slug": "velvet-jasmine",
    "name": "VELVET JASMINE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.",
    "price": 125.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 32,
    "slug": "imperial-grace",
    "name": "IMPERIAL GRACE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.",
    "price": 136.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 33,
    "slug": "mystic-essence",
    "name": "MYSTIC ESSENCE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.",
    "price": 147.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 34,
    "slug": "eternal-velvet",
    "name": "ETERNAL VELVET",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.",
    "price": 68.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 35,
    "slug": "noble-desire",
    "name": "NOBLE DESIRE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.",
    "price": 79.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 36,
    "slug": "amber-rose",
    "name": "AMBER ROSE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.",
    "price": 90.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 37,
    "slug": "crimson-dawn",
    "name": "CRIMSON DAWN",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.",
    "price": 101.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 38,
    "slug": "silk-aura",
    "name": "SILK AURA",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.",
    "price": 112.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 39,
    "slug": "radiant-amber",
    "name": "RADIANT AMBER",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.",
    "price": 123.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 40,
    "slug": "opulent-dusk",
    "name": "OPULENT DUSK",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.",
    "price": 134.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 41,
    "slug": "serene-noir",
    "name": "SERENE NOIR",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.",
    "price": 145.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 42,
    "slug": "aurora-orchid",
    "name": "AURORA ORCHID",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.",
    "price": 66.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 43,
    "slug": "celestial-bliss",
    "name": "CELESTIAL BLISS",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.",
    "price": 77.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 44,
    "slug": "timeless-oud",
    "name": "TIMELESS OUD",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.",
    "price": 88.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  },
  {
    "id": 45,
    "slug": "enchanted-vanilla",
    "name": "ENCHANTED VANILLA",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.",
    "price": 99.99,
    "image_url": "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop",
    "accent": "rose"
  },
  {
    "id": 46,
    "slug": "sapphire-mystique",
    "name": "SAPPHIRE MYSTIQUE",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.",
    "price": 110.99,
    "image_url": "https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop",
    "accent": "gold"
  },
  {
    "id": 47,
    "slug": "ivory-bloom",
    "name": "IVORY BLOOM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.",
    "price": 121.99,
    "image_url": "https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop",
    "accent": "noir"
  },
  {
    "id": 48,
    "slug": "onyx-saffron",
    "name": "ONYX SAFFRON",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.",
    "price": 132.99,
    "image_url": "https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop",
    "accent": "ivory"
  },
  {
    "id": 49,
    "slug": "platinum-charm",
    "name": "PLATINUM CHARM",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.",
    "price": 143.99,
    "image_url": "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop",
    "accent": "black"
  },
  {
    "id": 50,
    "slug": "whisper-musk",
    "name": "WHISPER MUSK",
    "subtitle": "Signature Collection",
    "description": "A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.",
    "price": 154.99,
    "image_url": "https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop",
    "accent": "amber"
  }
];

module.exports = { products };
