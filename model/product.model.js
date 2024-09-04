const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    gender: { type: [String], default: "Male", enum: ["Male", "Female", "Unisex"], unique: true },
    category: {
        type: [String], default: 'Clothing',
        enum: ['Clothing', 'Shoes', 'Handbags', 'Accessories', 'Sunglasses', 'Jewelry'],
        required: true
    },
    subCategoryCloth: {
        type: [String], default: "demo", enum: ["demo", "Activewear", "Coats & Jackets", "Dresses", "Jeans & Denim", "Jumpsuits & Rompers", "Lingerie & Hosiery",
            "Loungewear & Sleepwear", "Pants & Leggings", "Shorts", "Skirts", "Sweaters", "Sweatshirts & Hoodies", "Swimwear & Coverups",
            "Tops & Tees", "Casual Button-Down Shirts", "Dress Shirts", "Pants", "Polo Shirts", "Sport Coats & Blazers",
            "Suits & Separates", "Swimwear", "T-Shirts"]
    },

    subCategoryShoes: {
        type: [String], default: "demo", enum: ["demo", "Boots", "Espadrilles", "Flats", "Mules & Slides", "Oxfords & Loafers", "Pumps & Heels", "Sandals", "Slippers",
            "Sneakers", "Wedges", "Alexander McQueen", "Balenciaga", "Bottega Veneta", "Christian Louboutin", "Dolce & Gabbana", "Fendi",
            "Gianvito Rossi", "Gucci", "Jimmy Choo", "Manolo Blahnik", "Saint Laurent", "Stuart Weitzman", "Salvatore Ferragamo", "Valentino",
            "VEJA", "Drivers, Loafers & Slip", "Oxford & Derby Shoes", "Sandals & Flip Flops", "Burberry",
            "Common Projects", "Giuseppe Zanotti", "Golden Goose", "Off - White", "Versace"
        ]
    },
    subCategoryHandbag: {
        type: [String], default: "demo", enum: ["demo", "Celine", "Chloe", "Givenchy", "Mario Valentino", "Prada", "Stella McCartney", "Bucket-bags",
            "Clutches", "Crossbody Bags", "Hobo Bags", "Satchels", "Shoulder Bags", "Tote Bags", "Travel Bags & Luggage",
            "Women's Wallets & Cardholders"]
    },
    subCategorySunglass: {
        type: [String], default: "demo", enum: ["demo", "Carrera", "Dior", "Ermenegildo Zegna", "Montblanc", "Persol", "Tom Ford", "Emilio Pucci",
            "Fendi", "Oliver Peoples", "Roberto Cavalli"]
    },
    subCategoryDesigners: {
        type: [String], default: "demo", enum: ["demo", "Moschino", "Off-White", "Palm-Angels", "Tod'S", "Vince"]
    },
    subCategoryJewelryWatch: {
        type: [String], default: "demo", enum: ["demo", "Michael Kors", "Red Line", "Bracelets", "Brooches & Pins", "Earrings", "Necklaces",
            "Rings", "Watches", "Men's Jewelry"]
    },
    subCategoryAccessories: {
        type: [String], default: "demo", enum: ["demo", "Belts", "Hats", "Optical & Reading Glasses", "Scarves", "Bag Charms, Straps, & Accessories",
            "Cosmetic Bags", "Gloves", "Scarves & Wraps", "Travel Bags"]
    },

    brand_name: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    origin_countery: { type: [String], required: true },
    stock: { type: Number, required: true },
    images: [{ type: [String], required: true }],
    color: { type: [String], required: true },
    neck_type: { type: [String] },
    dress_type: { type: [String] },
    sleeve_type: { type: [String] },
    material: { type: [String] },
    wash: { type: [String] },
    discount: { type: Number, default: 0 },
    size: { type: [String] },
    rating: { type: Number, default: 0 },
    //   reviews: [{ 
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     rating: { type: Number, required: true },
    //     comment: { type: [String] },
    //   }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    versionKey: false,
    timestamps: true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;