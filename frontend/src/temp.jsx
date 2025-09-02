const inventory = {
    "Dairy": {
      items: [
        { id: 1, name: "Organic Whole Milk", price: 4.99, stock: 35, unit: "per gallon" },
        { id: 2, name: "Free Range Eggs", price: 3.49, stock: 42, unit: "per dozen" },
        { id: 3, name: "Sharp Cheddar Cheese", price: 5.99, stock: 28, unit: "per 12oz block" },
        { id: 4, name: "Greek Yogurt - Vanilla", price: 1.79, stock: 56, unit: "per 6oz cup" },
        { id: 5, name: "Unsalted Butter", price: 4.29, stock: 33, unit: "per 1lb pack" }
      ]
    },
    "Baby Section": {
      items: [
        { id: 6, name: "Baby Formula - Stage 1", price: 28.99, stock: 18, unit: "per 12.4oz can" },
        { id: 7, name: "Newborn Diapers", price: 24.99, stock: 25, unit: "per 84-count pack" },
        { id: 8, name: "Baby Wipes - Sensitive", price: 4.99, stock: 67, unit: "per 80-count pack" },
        { id: 9, name: "Baby Food - Mixed Vegetables", price: 1.29, stock: 89, unit: "per 4oz jar" },
        { id: 10, name: "Pacifiers - Silicone", price: 8.99, stock: 34, unit: "per 2-pack" }
      ]
    },
    "Shoes": {
      items: [
        { id: 11, name: "Running Shoes - Women's", price: 89.99, stock: 12, unit: "per pair" },
        { id: 12, name: "Kids Sneakers", price: 34.99, stock: 28, unit: "per pair" },
        { id: 13, name: "Men's Work Boots", price: 124.99, stock: 8, unit: "per pair" },
        { id: 14, name: "Sandals - Casual", price: 19.99, stock: 45, unit: "per pair" },
        { id: 15, name: "House Slippers", price: 12.99, stock: 36, unit: "per pair" }
      ]
    },
    "Electronics": {
      items: [
        { id: 16, name: "Wireless Earbuds", price: 49.99, stock: 15, unit: "per pair" },
        { id: 17, name: "Phone Charger Cable", price: 14.99, stock: 78, unit: "each" },
        { id: 18, name: "Bluetooth Speaker", price: 79.99, stock: 9, unit: "each" },
        { id: 19, name: "Power Bank", price: 29.99, stock: 22, unit: "each" },
        { id: 20, name: "Screen Protector", price: 9.99, stock: 54, unit: "per 2-pack" }
      ]
    },
    "Books": {
      items: [
        { id: 21, name: "Mystery Novel - Bestseller", price: 14.99, stock: 23, unit: "each" },
        { id: 22, name: "Children's Picture Book", price: 8.99, stock: 45, unit: "each" },
        { id: 23, name: "Cookbook - Italian Cuisine", price: 19.99, stock: 16, unit: "each" },
        { id: 24, name: "Self-Help Guide", price: 16.99, stock: 31, unit: "each" },
        { id: 25, name: "Magazine - Home & Garden", price: 4.99, stock: 67, unit: "each" }
      ]
    },
    "Toys": {
      items: [
        { id: 26, name: "LEGO Building Set", price: 39.99, stock: 14, unit: "each" },
        { id: 27, name: "Stuffed Animal - Teddy Bear", price: 12.99, stock: 38, unit: "each" },
        { id: 28, name: "Puzzle - 1000 pieces", price: 18.99, stock: 22, unit: "each" },
        { id: 29, name: "Action Figure", price: 24.99, stock: 29, unit: "each" },
        { id: 30, name: "Board Game - Family", price: 29.99, stock: 17, unit: "each" }
      ]
    },
    "Sporting Goods": {
      items: [
        { id: 31, name: "Yoga Mat", price: 24.99, stock: 26, unit: "each" },
        { id: 32, name: "Basketball", price: 19.99, stock: 15, unit: "each" },
        { id: 33, name: "Dumbbells - 10lb Set", price: 49.99, stock: 12, unit: "per pair" },
        { id: 34, name: "Tennis Racket", price: 89.99, stock: 7, unit: "each" },
        { id: 35, name: "Water Bottle - Insulated", price: 16.99, stock: 41, unit: "each" }
      ]
    },
    "Auto Care": {
      items: [
        { id: 36, name: "Motor Oil - 5W-30", price: 24.99, stock: 18, unit: "per 5qt bottle" },
        { id: 37, name: "Car Wash Soap", price: 7.99, stock: 33, unit: "per 64oz bottle" },
        { id: 38, name: "Tire Pressure Gauge", price: 12.99, stock: 24, unit: "each" },
        { id: 39, name: "Jumper Cables", price: 34.99, stock: 11, unit: "each" },
        { id: 40, name: "Air Freshener - Pine", price: 2.99, stock: 76, unit: "each" }
      ]
    },
    "Grocery": {
      items: [
        { id: 41, name: "Whole Wheat Pasta", price: 1.99, stock: 48, unit: "per 16oz box" },
        { id: 42, name: "Olive Oil - Extra Virgin", price: 8.99, stock: 27, unit: "per 500ml bottle" },
        { id: 43, name: "Canned Tomatoes - Diced", price: 1.49, stock: 65, unit: "per 14.5oz can" },
        { id: 44, name: "Basmati Rice", price: 6.99, stock: 34, unit: "per 2lb bag" },
        { id: 45, name: "Honey - Raw", price: 9.99, stock: 19, unit: "per 12oz jar" }
      ]
    },
    "Produce": {
      items: [
        { id: 46, name: "Organic Bananas", price: 1.99, stock: 67, unit: "per bunch" },
        { id: 47, name: "Avocados - Hass", price: 2.49, stock: 43, unit: "per 4-pack" },
        { id: 48, name: "Baby Spinach", price: 3.99, stock: 29, unit: "per 5oz bag" },
        { id: 49, name: "Sweet Potatoes", price: 2.99, stock: 52, unit: "per 3lb bag" },
        { id: 50, name: "Bell Peppers - Mixed", price: 4.99, stock: 36, unit: "per 3-pack" }
      ]
    },
    "Sea Food": {
      items: [
        { id: 51, name: "Atlantic Salmon Fillet", price: 12.99, stock: 16, unit: "per lb" },
        { id: 52, name: "Frozen Shrimp - Large", price: 14.99, stock: 22, unit: "per 1lb bag" },
        { id: 53, name: "Crab Cakes - Prepared", price: 8.99, stock: 11, unit: "per 2-pack" },
        { id: 54, name: "Tuna Steaks", price: 15.99, stock: 8, unit: "per lb" },
        { id: 55, name: "Mussels - Fresh", price: 4.99, stock: 14, unit: "per 2lb bag" }
      ]
    },
    "Meat & Poultry": {
      items: [
        { id: 56, name: "Ground Beef - 85/15", price: 6.99, stock: 34, unit: "per lb" },
        { id: 57, name: "Chicken Breast - Boneless", price: 5.99, stock: 28, unit: "per lb" },
        { id: 58, name: "Pork Chops - Center Cut", price: 7.99, stock: 19, unit: "per lb" },
        { id: 59, name: "Turkey Deli Slices", price: 4.99, stock: 41, unit: "per 8oz pack" },
        { id: 60, name: "Italian Sausage", price: 5.49, stock: 23, unit: "per lb" }
      ]
    },
    "Bakery": {
      items: [
        { id: 61, name: "Artisan Sourdough Bread", price: 4.99, stock: 18, unit: "per loaf" },
        { id: 62, name: "Chocolate Croissants", price: 6.99, stock: 12, unit: "per 4-pack" },
        { id: 63, name: "Birthday Cake - Vanilla", price: 19.99, stock: 6, unit: "each" },
        { id: 64, name: "Fresh Bagels - Everything", price: 4.49, stock: 24, unit: "per 6-pack" },
        { id: 65, name: "Apple Pie", price: 12.99, stock: 8, unit: "each" }
      ]
    },
    "Girls": {
      items: [
        { id: 66, name: "Girls T-Shirt - Unicorn Print", price: 12.99, stock: 35, unit: "each" },
        { id: 67, name: "Denim Jeans - Girls Size 8", price: 19.99, stock: 22, unit: "each" },
        { id: 68, name: "Hair Accessories Set", price: 8.99, stock: 48, unit: "per 10-piece set" },
        { id: 69, name: "Girls Dress - Floral", price: 24.99, stock: 16, unit: "each" },
        { id: 70, name: "School Backpack - Pink", price: 29.99, stock: 19, unit: "each" }
      ]
    },
    "Women": {
      items: [
        { id: 71, name: "Women's Blouse - Business", price: 39.99, stock: 14, unit: "each" },
        { id: 72, name: "Leggings - Black", price: 16.99, stock: 42, unit: "each" },
        { id: 73, name: "Scarf - Silk", price: 24.99, stock: 27, unit: "each" },
        { id: 74, name: "Handbag - Crossbody", price: 49.99, stock: 18, unit: "each" },
        { id: 75, name: "Cardigan - Wool Blend", price: 34.99, stock: 21, unit: "each" }
      ]
    },
    "Boys": {
      items: [
        { id: 76, name: "Boys Polo Shirt", price: 14.99, stock: 38, unit: "each" },
        { id: 77, name: "Cargo Shorts - Khaki", price: 16.99, stock: 29, unit: "each" },
        { id: 78, name: "Baseball Cap", price: 12.99, stock: 44, unit: "each" },
        { id: 79, name: "Graphic T-Shirt - Superhero", price: 11.99, stock: 52, unit: "each" },
        { id: 80, name: "Athletic Shorts", price: 13.99, stock: 36, unit: "each" }
      ]
    },
    "Men": {
      items: [
        { id: 81, name: "Men's Dress Shirt - White", price: 29.99, stock: 24, unit: "each" },
        { id: 82, name: "Jeans - Regular Fit", price: 39.99, stock: 31, unit: "each" },
        { id: 83, name: "Leather Belt - Brown", price: 19.99, stock: 26, unit: "each" },
        { id: 84, name: "Polo Shirt - Navy", price: 22.99, stock: 33, unit: "each" },
        { id: 85, name: "Wool Socks - 3 Pack", price: 14.99, stock: 47, unit: "per 3-pack" }
      ]
    },
    "Home Decor": {
      items: [
        { id: 86, name: "Throw Pillow - Velvet", price: 18.99, stock: 32, unit: "each" },
        { id: 87, name: "Wall Art - Abstract", price: 49.99, stock: 15, unit: "each" },
        { id: 88, name: "Table Lamp - Modern", price: 69.99, stock: 11, unit: "each" },
        { id: 89, name: "Decorative Vase - Ceramic", price: 24.99, stock: 23, unit: "each" },
        { id: 90, name: "Area Rug - 5x7", price: 129.99, stock: 8, unit: "each" }
      ]
    },
    "Home Office": {
      items: [
        { id: 91, name: "Desk Chair - Ergonomic", price: 149.99, stock: 7, unit: "each" },
        { id: 92, name: "Notebook - Lined", price: 3.99, stock: 76, unit: "each" },
        { id: 93, name: "Desk Organizer", price: 19.99, stock: 28, unit: "each" },
        { id: 94, name: "Computer Monitor Stand", price: 34.99, stock: 16, unit: "each" },
        { id: 95, name: "Wireless Mouse", price: 24.99, stock: 39, unit: "each" }
      ]
    },
    "Celebrate": {
      items: [
        { id: 96, name: "Birthday Party Balloons", price: 4.99, stock: 58, unit: "per 20-pack" },
        { id: 97, name: "Gift Wrapping Paper", price: 7.99, stock: 34, unit: "per roll" },
        { id: 98, name: "Party Streamers", price: 2.99, stock: 67, unit: "per pack" },
        { id: 99, name: "Greeting Cards - Birthday", price: 3.49, stock: 89, unit: "each" },
        { id: 100, name: "Candles - Number Set", price: 5.99, stock: 42, unit: "per 10-pack" }
      ]
    },
    "Jeweller/Accessories": {
      items: [
        { id: 101, name: "Silver Necklace - Chain", price: 39.99, stock: 18, unit: "each" },
        { id: 102, name: "Wristwatch - Digital", price: 79.99, stock: 12, unit: "each" },
        { id: 103, name: "Sunglasses - Aviator", price: 24.99, stock: 31, unit: "each" },
        { id: 104, name: "Earrings - Stud", price: 16.99, stock: 26, unit: "per pair" },
        { id: 105, name: "Bracelet - Gold Plated", price: 29.99, stock: 21, unit: "each" }
      ]
    },
    "Storage & Laundry": {
      items: [
        { id: 106, name: "Storage Bins - Clear", price: 12.99, stock: 35, unit: "per 3-pack" },
        { id: 107, name: "Laundry Detergent - Liquid", price: 8.99, stock: 44, unit: "per 64oz bottle" },
        { id: 108, name: "Fabric Softener", price: 4.99, stock: 52, unit: "per 40oz bottle" },
        { id: 109, name: "Hangers - Velvet", price: 14.99, stock: 28, unit: "per 20-pack" },
        { id: 110, name: "Laundry Basket", price: 16.99, stock: 23, unit: "each" }
      ]
    },
    "Home Mid": {
      items: [
        { id: 111, name: "Vacuum Cleaner Bags", price: 9.99, stock: 33, unit: "per 5-pack" },
        { id: 112, name: "Air Freshener - Plugin", price: 6.99, stock: 47, unit: "each" },
        { id: 113, name: "Light Bulbs - LED", price: 11.99, stock: 38, unit: "per 4-pack" },
        { id: 114, name: "Extension Cord", price: 14.99, stock: 19, unit: "each" },
        { id: 115, name: "Batteries - AA", price: 7.99, stock: 56, unit: "per 8-pack" }
      ]
    },
    "Kitchen & Dining": {
      items: [
        { id: 116, name: "Non-Stick Frying Pan", price: 29.99, stock: 22, unit: "each" },
        { id: 117, name: "Dinner Plates Set", price: 39.99, stock: 16, unit: "per 4-piece set" },
        { id: 118, name: "Coffee Mugs", price: 12.99, stock: 41, unit: "per 2-pack" },
        { id: 119, name: "Kitchen Towels", price: 8.99, stock: 54, unit: "per 4-pack" },
        { id: 120, name: "Cutting Board - Bamboo", price: 18.99, stock: 27, unit: "each" }
      ]
    },
    "Seasonal": {
      items: [
        { id: 121, name: "Halloween Decorations", price: 15.99, stock: 34, unit: "per set" },
        { id: 122, name: "Christmas Lights - LED", price: 19.99, stock: 28, unit: "per 100-count" },
        { id: 123, name: "Beach Umbrella", price: 49.99, stock: 12, unit: "each" },
        { id: 124, name: "Garden Gnome", price: 24.99, stock: 18, unit: "each" },
        { id: 125, name: "Snow Shovel", price: 34.99, stock: 15, unit: "each" }
      ]
    },
    "Fabric": {
      items: [
        { id: 126, name: "Cotton Fabric - Floral Print", price: 8.99, stock: 25, unit: "per yard" },
        { id: 127, name: "Sewing Thread Set", price: 12.99, stock: 36, unit: "per 24-spool set" },
        { id: 128, name: "Quilting Batting", price: 16.99, stock: 14, unit: "per yard" },
        { id: 129, name: "Fabric Scissors", price: 19.99, stock: 22, unit: "each" },
        { id: 130, name: "Measuring Tape", price: 4.99, stock: 48, unit: "each" }
      ]
    },
    "Bedding": {
      items: [
        { id: 131, name: "Sheet Set - Queen", price: 34.99, stock: 19, unit: "per 4-piece set" },
        { id: 132, name: "Down Comforter", price: 89.99, stock: 11, unit: "each" },
        { id: 133, name: "Pillows - Memory Foam", price: 24.99, stock: 26, unit: "per 2-pack" },
        { id: 134, name: "Mattress Protector", price: 29.99, stock: 17, unit: "each" },
        { id: 135, name: "Blanket - Fleece", price: 19.99, stock: 33, unit: "each" }
      ]
    },
    "Paint & Hardware": {
      items: [
        { id: 136, name: "Interior Paint - Eggshell", price: 32.99, stock: 18, unit: "per gallon" },
        { id: 137, name: "Paint Brushes Set", price: 14.99, stock: 27, unit: "per 5-piece set" },
        { id: 138, name: "Screwdriver Set", price: 19.99, stock: 23, unit: "per 8-piece set" },
        { id: 139, name: "Wall Anchors", price: 5.99, stock: 44, unit: "per 20-pack" },
        { id: 140, name: "Sandpaper - Assorted", price: 8.99, stock: 35, unit: "per 10-pack" }
      ]
    },
    "Bath": {
      items: [
        { id: 141, name: "Bath Towels - Egyptian Cotton", price: 24.99, stock: 28, unit: "per 2-pack" },
        { id: 142, name: "Shower Curtain", price: 16.99, stock: 21, unit: "each" },
        { id: 143, name: "Bath Mat - Non-Slip", price: 12.99, stock: 34, unit: "each" },
        { id: 144, name: "Toilet Paper - 12 Roll", price: 8.99, stock: 67, unit: "per 12-pack" },
        { id: 145, name: "Body Wash - Moisturizing", price: 6.99, stock: 52, unit: "per 18oz bottle" }
      ]
    },
    "Cosmetics": {
      items: [
        { id: 146, name: "Foundation - Medium", price: 19.99, stock: 24, unit: "each" },
        { id: 147, name: "Lipstick - Red", price: 12.99, stock: 38, unit: "each" },
        { id: 148, name: "Mascara - Waterproof", price: 14.99, stock: 31, unit: "each" },
        { id: 149, name: "Nail Polish - Pink", price: 7.99, stock: 45, unit: "each" },
        { id: 150, name: "Makeup Brushes Set", price: 29.99, stock: 16, unit: "per 12-piece set" }
      ]
    },
    "Deli": {
      items: [
        { id: 151, name: "Sliced Ham - Honey", price: 7.99, stock: 23, unit: "per lb" },
        { id: 152, name: "Fresh Mozzarella", price: 5.99, stock: 18, unit: "per 8oz ball" },
        { id: 153, name: "Potato Salad", price: 3.99, stock: 15, unit: "per lb" },
        { id: 154, name: "Rotisserie Chicken", price: 8.99, stock: 12, unit: "each" },
        { id: 155, name: "Olive Tapenade", price: 6.49, stock: 21, unit: "per 6oz container" }
      ]
    },
    "Pharmacy": {
      items: [
        { id: 156, name: "Pain Reliever - Ibuprofen", price: 8.99, stock: 45, unit: "per 100-count bottle" },
        { id: 157, name: "Multivitamins", price: 16.99, stock: 32, unit: "per 60-count bottle" },
        { id: 158, name: "First Aid Kit", price: 24.99, stock: 19, unit: "each" },
        { id: 159, name: "Thermometer - Digital", price: 12.99, stock: 26, unit: "each" },
        { id: 160, name: "Hand Sanitizer", price: 3.99, stock: 78, unit: "per 8oz bottle" }
      ]
    },
    "Hair Salon": {
      items: [
        { id: 161, name: "Professional Shampoo", price: 24.99, stock: 18, unit: "per 16oz bottle" },
        { id: 162, name: "Hair Conditioner", price: 22.99, stock: 21, unit: "per 16oz bottle" },
        { id: 163, name: "Hair Styling Gel", price: 9.99, stock: 35, unit: "per 8oz jar" },
        { id: 164, name: "Hair Brush - Boar Bristle", price: 19.99, stock: 14, unit: "each" },
        { id: 165, name: "Hair Dryer", price: 79.99, stock: 8, unit: "each" }
      ]
    },
    "Health & Beauty": {
      items: [
        { id: 166, name: "Moisturizer - Anti-Aging", price: 29.99, stock: 22, unit: "per 2oz jar" },
        { id: 167, name: "Sunscreen - SPF 50", price: 11.99, stock: 41, unit: "per 6oz tube" },
        { id: 168, name: "Face Cleanser", price: 14.99, stock: 33, unit: "per 8oz bottle" },
        { id: 169, name: "Dental Floss", price: 4.99, stock: 67, unit: "each" },
        { id: 170, name: "Electric Toothbrush", price: 49.99, stock: 15, unit: "each" }
      ]
    },
    "Pet Care": {
      items: [
        { id: 171, name: "Dog Food - Dry", price: 34.99, stock: 26, unit: "per 15lb bag" },
        { id: 172, name: "Cat Litter - Clumping", price: 12.99, stock: 33, unit: "per 20lb bag" },
        { id: 173, name: "Pet Toys - Rope", price: 6.99, stock: 48, unit: "each" },
        { id: 174, name: "Dog Leash - Retractable", price: 19.99, stock: 17, unit: "each" },
        { id: 175, name: "Pet Treats - Dental", price: 8.99, stock: 52, unit: "per 12oz bag" }
      ]
    },
    "Garden Center": {
      items: [
        { id: 176, name: "Tomato Seeds - Heirloom", price: 3.99, stock: 34, unit: "per packet" },
        { id: 177, name: "Garden Soil - Potting Mix", price: 8.99, stock: 28, unit: "per 16qt bag" },
        { id: 178, name: "Watering Can - 2 Gallon", price: 16.99, stock: 15, unit: "each" },
        { id: 179, name: "Plant Fertilizer - Organic", price: 12.99, stock: 22, unit: "per 4lb bag" },
        { id: 180, name: "Garden Gloves", price: 7.99, stock: 41, unit: "per pair" }
      ]
    }
  };