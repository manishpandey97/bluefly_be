const mongoose = require('mongoose');
const productModel = require(`./model/product.model`); // Adjust the path as needed

const generateProducts = async () => {
    await mongoose.connect(`mongodb+srv://manish123:manish1234@cluster0.7sj0y25.mongodb.net/bluefly?retryWrites=true&w=majority&appName=Cluster0`,
        { useNewUrlParser: true, useUnifiedTopology: true });

    const products = Array.from({ length: 500 }).map((_, index) => ({
        _id: new mongoose.Types.ObjectId(),
        title: `Product ${index + 1}`,
        gender: ['Male', 'Female', 'Unisex'][Math.floor(Math.random() * 3)],
        category: ['Clothing', 'Shoes', 'Handbags', 'Accessories', 'Sunglasses', 'Jewelry'],
        subCategoryCloth: [
            "Activewear", "Coats & Jackets", "Dresses", "Jeans & Denim", "Jumpsuits & Rompers", "Lingerie & Hosiery",
            "Loungewear & Sleepwear", "Pants & Leggings", "Shorts", "Skirts", "Sweaters", "Sweatshirts & Hoodies", "Swimwear & Coverups",
            "Tops & Tees", "Casual Button-Down Shirts", "Dress Shirts", "Pants", "Polo Shirts", "Sport Coats & Blazers",
            "Suits & Separates", "Swimwear", "T-Shirts"],

        subCategoryShoes: ["Boots", "Espadrilles", "Flats", "Mules & Slides", "Oxfords & Loafers", "Pumps & Heels", "Sandals", "Slippers",
            "Sneakers", "Wedges", "Alexander McQueen", "Balenciaga", "Bottega Veneta", "Christian Louboutin", "Dolce & Gabbana", "Fendi",
            "Gianvito Rossi", "Gucci", "Jimmy Choo", "Manolo Blahnik", "Saint Laurent", "Stuart Weitzman", "Salvatore Ferragamo", "Valentino",
            "VEJA", "Drivers, Loafers & Slip", "Oxford & Derby Shoes", "Sandals & Flip Flops", "Burberry",
            "Common Projects", "Giuseppe Zanotti", "Golden Goose", "Off - White", "Versace"
        ],
        subCategoryHandbag: [
            "Celine", "Chloe", "Givenchy", "Mario Valentino", "Prada", "Stella McCartney", "Bucket-bags",
            "Clutches", "Crossbody Bags", "Hobo Bags", "Satchels", "Shoulder Bags", "Tote Bags", "Travel Bags & Luggage",
            "Women's Wallets & Cardholders"],
        subCategorySunglass: [
            "Carrera", "Dior", "Ermenegildo Zegna", "Montblanc", "Persol", "Tom Ford", "Emilio Pucci",
            "Fendi", "Oliver Peoples", "Roberto Cavalli"],
        subCategoryDesigners: [
            "Moschino", "Off-White", "Palm-Angels", "Tod'S", "Vince"],
        subCategoryJewelryWatch: [
            "Michael Kors", "Red Line", "Bracelets", "Brooches & Pins", "Earrings", "Necklaces",
            "Rings", "Watches", "Men's Jewelry"],
            subCategoryAccessories: [
                "Belts", "Hats", "Optical & Reading Glasses", "Scarves", "Bag Charms, Straps, & Accessories",
                "Cosmetic Bags", "Gloves", "Scarves & Wraps", "Travel Bags"],
            brand_name: ['Gucci', 'Valentino', 'Christian Louboutin', 'Saint Laurent', 'Balenciaga', 'Ferragamo',
                'Valentino By Mario Valentino'],
            // brandId: new mongoose.Types.ObjectId(),
            price: (Math.random() * 500).toFixed(2),
            description: `Description for Product ${index + 1}`,
            origin_countery: ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan",
                "India", "Brazil", "South Africa"],
            stock: Math.floor(Math.random() * 10) + 1,
            images: ['image1.jpg', 'image2.jpg'], // Example images
            color: ['Black', "White", "Blue", "Pink", "Brown", "Green", "Red"],
            neck_type: ["Round Neck", "Rounded V-Neck", "Deep Round", "Square Neck", "Boat Neck", "High Neck"],
            dress_type: ["Casual", "Formal", "Party", "Beachwear", "Cocktail", "Evening Gown"],
            sleeve_type: ["Short Sleeve", "Long Sleeve", "Sleeveless", "Three-Quarter Sleeve", "Cap Sleeve"],
            material: ["Cotton", "Polyester", "Silk", "Linen", "Rayon"],
            wash: ["Machine Wash", "Hand Wash", "Dry Clean", "Cold Wash", "Delicate Wash"],
            discount: Math.floor(Math.random() * 30),
            size: ['S', 'M', 'L'],
            rating: (Math.random() * 5).toFixed(1),
            userId: new mongoose.Types.ObjectId()
        }));

    await productModel.insertMany(products);
    console.log('500 products created!');
    mongoose.disconnect();
};

generateProducts();
