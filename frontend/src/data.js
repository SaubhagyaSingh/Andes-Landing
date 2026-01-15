// Import images
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

import ironImage from './assets/iron.jpg';
import washFoldImage from './assets/wash_fold.jpg';
import washIronImage from './assets/wash_iron.jpg';
import blazersImage from './assets/blazers.jpeg';
import shirtPantImage from './assets/shirt_pant.jpeg';
import bedsheetSingleImage from './assets/bedsheet_single.jpeg';
import uniformImage from './assets/Uniform.jpeg';
import simpleShoesImage from './assets/simple_shoes.jpg';
import loafersSneakersImage from './assets/loafers_sneakers.jpg';
import sareeEmbroideryImage from './assets/saree_embroidery.jpg';
import sareeImage from './assets/saree.jpeg';
import bedsheetBlanketImage from './assets/bedsheet_blanket.jpg';
import blouseImage from './assets/blouse.jpg';
import Kurta from './assets/kurta.jpeg';
import sweater from './assets/sweater.jpeg';
import jacket from './assets/jacket.jpg';
import sherwani from './assets/sherwani.jpeg';   
import shorts from './assets/shorts.jpeg';
// import pyjama from './assets/pyjama.jpeg';
// import nightyGown from './assets/gownNighty.jpeg';  
import hoodiee from './assets/hoodiee.jpeg';
import pantTrouser from './assets/pantTrouser.jpg';
import shirtTshirt from './assets/shirtTshirt.jpg';
import jeansImage from './assets/jeans.jpg';
import blanketImage from './assets/singleBlanket.jpg';
import doubleBlanketImage from './assets/doubleBlanket.jpg';
import curtain from './assets/curtain.jpg';
import carpet from './assets/carpet.jpg';
import jerkin from './assets/jerkin.jpg';
import pillowCover from './assets/pillow_cover.jpg';
import LadiesSuit from './assets/ladies_suit_3piece.jpg';
import LadiesSuit2 from './assets/ladies_suit_2piece.jpg';




const data = {
    serviceModes: [
      // { id: 0, name: "By Piece/Pair", key: "piece" },
      { id: 1, name: "By Kg", key: "kg" }
    ],
    serviceCategories: [
      { id: 0, name: "General", key: "general", discount: 30, noteByKg: "1Kg contains approximately 4 clothes." },
      { id: 1, name: "Dry Cleaning", key: "dry_cleaning", discount: 35, noteByKg: "NOTE: Dry cleaning prices are per piece." },
      { id: 2, name: "Shoes", key: "shoes", discount: 25, noteByKg: "NOTE: Special care for all types of footwear." }, // New category
      // { id: 3, name: "Others", key: "others", discount: 35, noteByKg: "NOTE: Specialized cleaning services." }
    ],
    services: [
    {
      id: 1,
      name: "IRON",
      description: "Professional ironing service for wrinkle-free clothes.",
      categories: ["general"],
      rateByPiece: 18,
      discountedRateByPiece: 12,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Iron",
      customText: "₹15",
      image: ironImage,
      discount: 33,
      
    },
    {
      id: 2,
      name: "WASH & FOLD",
      description: "Complete washing and folding service for your clothes.",
      categories: ["general"],
      rateByPiece: 0,
      discountedRateByPiece: 0,
      rateByKg: 70,
      discountedRateByKg: 50,
      unit: "kg",
      displayName: "By Kg",
      customText: "₹69 - ₹89",
      image: washFoldImage,
      discount: 31,
      washAndFoldPrice: 99,
      washAndFoldDiscountedPrice: 69,
      washAndIronPrice: 129,
      washAndIronDiscountedPrice: 89
    },
    {
      id: 4,
      name: "BLAZERS",
      description: "Professional dry cleaning for blazers to maintain their shape.",
      categories: ["dry_cleaning"],
      rateByPiece: 165,
      discountedRateByPiece: 110,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Blazers",
      customText: "₹165",
      image: blazersImage,
      discount: 33
    },
    {
      id: 5,
      name: "SHIRT & PANT",
      description: "Dry cleaning service for formal shirts and pants.",
      categories: ["dry_cleaning"],
      rateByPiece: 70,
      discountedRateByPiece: 49,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Shirt & Pant",
      customText: "₹70",
      image: shirtPantImage,
      discount: 30
    },
    {
      id: 6,
      name: "BEDSHEET (SINGLE)",
      description: "Dry cleaning service for single bedsheets.",
      categories: ["dry_cleaning"],
      rateByPiece: 213,
      discountedRateByPiece: 149,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Bedsheet (Single)",
      customText: "₹213",
      image: bedsheetBlanketImage,
      discount: 30
    },
    // {
    //   id: 7,
    //   name: "Blanket (Single)",
    //   description: "Wash service for single bedsheets.",
    //   categories: ["dry_cleaning"],
    //   rateByPiece: 60,
    //   discountedRateByPiece: 40,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Bedsheet (Single)",
    //   customText: "₹60",
    //   image: bedsheetSingleImage,
      
    // },
    {
      id: 8,
      name: "UNIFORM",
      description: "Professional cleaning service for school and work uniforms.",
      categories: ["general", "others"],
      rateByPiece: 75,
      discountedRateByPiece: 50,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Uniform",
      customText: "₹50 - ₹69",
      image: uniformImage,
      discount: 33,
      washAndFoldPrice: 70,
      washAndFoldDiscountedPrice: 50,
      washAndIronPrice: 99,
      washAndIronDiscountedPrice: 69
    },
    {
      id: 9,
      name: "SIMPLE SHOES/SPORTS SHOES",
      description: "Cleaning service for casual shoes.",
      categories: ["others", "shoes"],
      rateByPiece: 213,
      discountedRateByPiece: 149,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "pair",
      displayName: "Simple Shoes",
      customText: "₹150",
      image: simpleShoesImage,
      discount: 30
    },
    {
      id: 10,
      name: "LOAFERS/SNEAKERS",
      description: "Premium cleaning service for loafers and sneakers.",
      categories: ["others", "shoes"],
      rateByPiece: 285,
      discountedRateByPiece: 199,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "pair",
      displayName: "Loafers/Sneakers(shoes)",
      customText: "₹135",
      image: loafersSneakersImage,
      discount: 30
    },
    // {
    //   id: 12,
    //   name: "SAREE - EMBROIDERY",
    //   description: "cleaning for embroidered sarees.",
    //   categories: [ "general"],
    //   rateByPiece: 150,
    //   discountedRateByPiece: 100,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Saree (Embroidery)",
    //   customText: "₹100 - ₹110",
    //   image: sareeEmbroideryImage,
    //   discount: 33,
    //   washAndFoldPrice: 140,
    //   washAndFoldDiscountedPrice: 100,
    //   washAndIronPrice: 155,
    //   washAndIronDiscountedPrice: 110
    // },
    {
      id: 13,
      name: "SAREE - premium",
      description: "Special dry cleaning for embroidered sarees.",
      categories: ["dry_cleaning"],
      rateByPiece: 715,
      discountedRateByPiece: 499,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Saree (Embroidery)",
      customText: "₹100 - ₹110",
      image: sareeEmbroideryImage,
      discount: 33
    },
    {
      id: 14,
      name: "SAREE",
      description: "Dry cleaning service for regular sarees.",
      categories: ["dry_cleaning"],
      rateByPiece: 285,
      discountedRateByPiece: 199,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Saree",
      customText: "₹285",
      image: sareeImage,
      discount: 30
    },
    // {
    //   id: 15,
    //   name: "SAREE",
    //   description: "Cleaning  service for silk sarees.",
    //   categories: ["general"],
    //   rateByPiece: 135,
    //   discountedRateByPiece: 90,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Silk Saree",
    //   customText: "₹80 - ₹90",
    //   image: sareeImage,
    //   discount: 33,
    //   washAndFoldPrice: 115,
    //   washAndFoldDiscountedPrice: 80,
    //   washAndIronPrice: 125,
    //   washAndIronDiscountedPrice: 90
    // },
    {
      id: 16,
      name: "BLOUSE",
      description: "Dry cleaning service for blouses.",
      categories: ["dry_cleaning"],
      rateByPiece: 99,
      discountedRateByPiece: 69,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Blouse",
      customText: "₹55",
      image: blouseImage,
      discount: 30
    },
    // {
    //   id: 17,
    //   name: "SHIRT/T-SHIRT",
    //   description: "Cleaning service for shirts and t-shirts.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Shirt/T-Shirt",
    //   customText: "₹20 - ₹30",
    //   image: shirtTshirt,
    //   discount: 33,
    //   washAndFoldPrice: 30,
    //   washAndFoldDiscountedPrice: 20,
    //   washAndIronPrice: 40,
    //   washAndIronDiscountedPrice: 30
    // },
    // {
    //   id: 18,
    //   name: "KURTA/KURTI",
    //   description: "Cleaning service for kurtas and kurtis.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Kurta/Kurti",
    //   customText: "₹20 - ₹30",
    //   image: Kurta,
    //   discount: 33,
    //   washAndFoldPrice: 30,
    //   washAndFoldDiscountedPrice: 20,
    //   washAndIronPrice: 45,
    //   washAndIronDiscountedPrice: 30
    // },
    // {
    //   id: 19,
    //   name: "JACKET",
    //   description: "Cleaning service for jackets.",
    //   categories: ["general"],
    //   rateByPiece: 38,
    //   discountedRateByPiece: 25,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Jacket",
    //   customText: "₹25 - ₹35",
    //   image: jacket,
    //   discount: 34,
    //   washAndFoldPrice: 38,
    //   washAndFoldDiscountedPrice: 25,
    //   washAndIronPrice: 50,
    //   washAndIronDiscountedPrice: 35
    // },
    // {
    //   id: 20,
    //   name: "SWEATER",
    //   description: "Cleaning service for sweaters.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Sweater",
    //   customText: "₹20 - ₹30",
    //   image: sweater,
    //   discount: 33,
    //   washAndFoldPrice: 30,
    //   washAndFoldDiscountedPrice: 20,
    //   washAndIronPrice: 42,
    //   washAndIronDiscountedPrice: 30
    // },
    // {
    //   id: 21,
    //   name: "SHERWANI",
    //   description: "Dry cleaning service for sherwanis.",
    //   categories: ["dry_cleaning"],
    //   rateByPiece: 173,
    //   discountedRateByPiece: 115,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Sherwani",
    //   customText: "₹200",
    //   image: sherwani,
    //   discount: 34
    // },
    // {
    //   id: 22,
    //   name: "SHORTS",
    //   description: "Cleaning service for shorts.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Shorts",
    //   customText: "₹20 - ₹30",
    //   image: shorts,
    //   discount: 33,
    //   washAndFoldPrice: 30,
    //   washAndFoldDiscountedPrice: 20,
    //   washAndIronPrice: 40,
    //   washAndIronDiscountedPrice: 30
    // },
    // {
    //   id: 23,
    //   name: "PYJAMA",
    //   description: "Cleaning service for pyjamas.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Pyjama",
    //   customText: "₹60",
    //   image: pyjama,
    //   discount: 33,
    //   washAndFoldPrice: 20,
    //   washAndFoldDiscountedPrice: 15,
    //   washAndIronPrice: 30,
    //   washAndIronDiscountedPrice: 20
    // },
    // {
    //   id: 24,
    //   name: "NIGHTY/GOWN",
    //   description: "Cleaning service for nighties and gowns.",
    //   categories: ["general"],
    //   rateByPiece: 75,
    //   discountedRateByPiece: 50,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Nighty/Gown",
    //   customText: "₹75",
    //   image: nightyGown,
    //   discount: 34,
    //   washAndFoldPrice: 50,
    //   washAndFoldDiscountedPrice: 35,
    //   washAndIronPrice: 75,
    //   washAndIronDiscountedPrice: 50
    // },
    // {
    //   id: 25,
    //   name: "HOODIE",
    //   description: "Cleaning service for hoodies.",
    //   categories: ["general"],
    //   rateByPiece: 33,
    //   discountedRateByPiece: 22,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Hoodie",
    //   customText: "₹22 - ₹33",
    //   image: hoodiee,
    //   discount: 33,
    //   washAndFoldPrice: 33,
    //   washAndFoldDiscountedPrice: 22,
    //   washAndIronPrice: 45,
    //   washAndIronDiscountedPrice: 33
    // },
    // {
    //   id: 26,
    //   name: "PANTS/TROUSERS",
    //   description: "Cleaning service for pants.",
    //   categories: ["general"],
    //   rateByPiece: 30,
    //   discountedRateByPiece: 20,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Pants/Trousers",
    //   customText: "₹20 - ₹30",
    //   image: pantTrouser,
    //   discount: 33,
    //   washAndFoldPrice: 30,
    //   washAndFoldDiscountedPrice: 20,
    //   washAndIronPrice: 30,
    //   washAndIronDiscountedPrice: 30
    // },
    // {
    //   id: 27,
    //   name: "JEANS",
    //   description: "Washing and Ironing service for jeans.",
    //   categories: ["general"],
    //   rateByPiece: 33,
    //   discountedRateByPiece: 33,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Jeans (Wash)",
    //   customText: "₹22 -₹33",
    //   image: jeansImage,
    //   discount: 33,
    //   washAndFoldPrice: 33,
    //   washAndFoldDiscountedPrice: 22,
    //   washAndIronPrice: 44,
    //   washAndIronDiscountedPrice: 33
    // },
    // {
    //   id: 28,
    //   name: "Single Bedsheet/Blanket",
    //   description: "Dry cleaning service for blankets.",
    //   categories: ["general"],
    //   rateByPiece: 80,
    //   discountedRateByPiece: 55,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Single Bedsheet/Blanket",
    //   customText: "₹40 - ₹50",
    //   image: bedsheetSingleImage,
    //   discount: 31,
    //   washAndFoldPrice: 60,
    //   washAndFoldDiscountedPrice: 40,
    //   washAndIronPrice: 77,
    //   washAndIronDiscountedPrice: 50
    // },
    // {
    //   id: 29,
    //   name: "BLANKET (DOUBLE)",
    //   description: "Dry cleaning service for double blankets.",
    //   categories: ["general"],
    //   rateByPiece: 165,
    //   discountedRateByPiece: 110,
    //   rateByKg: 0,
    //   discountedRateByKg: 0,
    //   unit: "piece",
    //   displayName: "Blanket (Double)",
    //   customText: "₹165",
    //   image: doubleBlanketImage,
    //   discount: 33,
    //   washAndFoldPrice: 120,
    //   washAndFoldDiscountedPrice: 80,
    //   washAndIronPrice: 165,
    //   washAndIronDiscountedPrice: 110
    // }
    {
      id: 29,
      name: "BLANKET (DOUBLE)",
      description: "Dry cleaning service for double blankets.",
      categories: ["dry_cleaning"],
      rateByPiece: 285,
      discountedRateByPiece: 199,
      rateByKg: 0,
      discountedRateByKg: 0,
      unit: "piece",
      displayName: "Blanket (Double)",
      customText: "₹285",
      image: doubleBlanketImage,
      discount: 30,

    }
  ],

    
 

    // Add new array for instant delivery services
  instantDeliveryServices: [
    {
      "id": 101,
      "name": "Wash and Fold",
      "description": "Quick turnaround wash and dry service with same day delivery when ordered before 2PM.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 0,
      "discountedRateByPiece": 0,
      "rateByKg": 141,
      "discountedRateByKg": 99,
      "unit": "kg",
      "displayName": "Wash and Fold",
      "customText": "₹110",
      "image": washFoldImage,
      "discount": 35,
      "isInstantDelivery": true
    },
      {
      "id": 102,
      "name": "Wash and Iron",
      "description": "Quick turnaround wash and Iron service with same day delivery when ordered before 2PM.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 0,
      "discountedRateByPiece": 0,
      "rateByKg": 198,
      "discountedRateByKg": 139,
      "unit": "kg",
      "displayName": "Wash and Iron",
      "customText": "₹110",
      "image": washIronImage,
      "discount": 30,
      "isInstantDelivery": true
    },
    {
      "id": 103,
      "name": "INSTANT IRON",
      "description": "Express ironing service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 35,
      "discountedRateByPiece": 25,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "Express Iron",
      "customText": "₹24",
      "image": ironImage,
      "discount": 33,
      "isInstantDelivery": true
    },
    {
      "id": 104,
      "name": "Uniform",
      "description": "Express ironing service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 127,
      "discountedRateByPiece": 89,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "Uniform",
      "customText": "₹42",
      "image": uniformImage,
      "discount": 30,
      "isInstantDelivery": true
    },
    {
      "id": 105,
      "name": "Shirts",
      "description": "Shirts service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 127,
      "discountedRateByPiece": 89,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "Shirts",
      "customText": "₹42",
      "image": shirtTshirt,
      "discount": 30,
      "isInstantDelivery": true
    },
     {
      "id": 106,
      "name": "T-Shirts/Pants",
      "description": "T-Shirts/Pants service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 127,
      "discountedRateByPiece": 89,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "T-Shirts/Pants",
      "customText": "₹42",
      "image": shirtPantImage,
      "discount": 30,
      "isInstantDelivery": true
    },
     {
      "id": 107,
      "name": "Jeans",
      "description": "Jeans service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 127,
      "discountedRateByPiece": 89,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "Jeans",
      "customText": "₹57",
      "image": jeansImage,
      "discount": 30,
      "isInstantDelivery": true
    },
     {
      "id": 108,
      "name": "Kurta",
      "description": "Kurta service with same day delivery, perfect for last-minute needs.",
      "categories": ["general", "instant_delivery"],
      "rateByPiece": 127,
      "discountedRateByPiece": 89,
      "rateByKg": 0,
      "discountedRateByKg": 0,
      "unit": "piece",
      "displayName": "Kurta",
      "customText": "₹42",
      "image": Kurta,
      "discount": 30,
      "isInstantDelivery": true
    },
    



  ],




    donationService: {
      name: "Clothing Donation",
      description: "Help those in need with your old clothes",
      rate: 0,
      unit: "donation",
      icon: "♥",
      image: "donation.jpg"
    },

    // Function to fetch services from Firestore 
    async fetchPremiumServices() {
      try {
        // Query documents with category starting with "premium"
        const q1 = query(
          collection(db, 'prices'),
          where('category', '==', 'premiumGeneral')
        );
        
        const q2 = query(
          collection(db, 'prices'),
          where('category', '==', 'premiumOthers')
        );

        const [querySnapshot1, querySnapshot2] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);

        const premiumServices = [];
        
        // Process premiumGeneral services
        querySnapshot1.forEach((doc) => {
          const serviceData = doc.data();
          const premiumService = this.transformFirebaseService(doc.id, serviceData);
          premiumServices.push(premiumService);
        });

        // Process premiumOthers services
        querySnapshot2.forEach((doc) => {
          const serviceData = doc.data();
          const premiumService = this.transformFirebaseService(doc.id, serviceData);
          premiumServices.push(premiumService);
        });
        
        // Update the premiumServices array
        this.premiumServices = premiumServices;
        return premiumServices;
        
      } catch (error) {
        console.error('Error fetching premium services from prices collection:', error);
        return [];
      }
    },

    // Function to transform Firebase service data to match your structure
    transformFirebaseService(docId, serviceData) {
      // Map category to appropriate array
      const categoryMap = {
        'premiumGeneral': ['premium', 'general'],
        'premiumOthers': ['premium', 'others']
      };

      // Calculate discount percentage
      const originalRate = serviceData.originalRateByPiece || 0;
      const currentRate = serviceData.rateByPiece || 0;
      const discountPercentage = serviceData.discountPercentage || 
        (originalRate > 0 ? Math.round(((originalRate - currentRate) / originalRate) * 100) : 0);

      return {
        id: `premium_${docId}`,
        name: serviceData.serviceName?.toUpperCase() || 'PREMIUM SERVICE',
        description: `Premium ${serviceData.serviceName?.toLowerCase() || 'service'} with enhanced care and faster delivery.`,
        categories: categoryMap[serviceData.category] || ['premium'],
        rateByPiece: originalRate,
        discountedRateByPiece: currentRate,
        rateByKg: serviceData.originalRateByKg || 0,
        discountedRateByKg: serviceData.rateByKg || 0,
        unit: serviceData.unit || "piece",
        displayName: `Premium ${serviceData.serviceName || 'Service'}`,
        customText: `₹${currentRate}`,
        // Use Cloudinary image if imagePublicId exists, otherwise use appropriate fallback
        image:  
          this.getDefaultImageForService(serviceData.serviceName),
        discount: discountPercentage,
        isPremium: true,
        features: serviceData.features || ['Premium Quality', 'Fast Delivery', 'Expert Care'],
        deliveryTime: serviceData.deliveryTime || "24-48 hours",
        priority: serviceData.priority || 1,
        createdAt: serviceData.createdAt,
        updatedAt: serviceData.updatedAt
      };
    },

    // Function to get default image based on service name
    getDefaultImageForService(serviceName) {
      if (!serviceName) return bedsheetSingleImage;
      
      const serviceNameLower = serviceName.toLowerCase();
      
      if (serviceNameLower.includes('kurta') || serviceNameLower.includes('kurti')) return Kurta;
      if (serviceNameLower.includes('saree')) return sareeImage;
      if (serviceNameLower.includes('shirt')) return shirtTshirt;
      if (serviceNameLower.includes('pant') || serviceNameLower.includes('trouser')) return pantTrouser;
      if (serviceNameLower.includes('jacket')) return jacket;
      if (serviceNameLower.includes('coat')) return blazersImage;

      if (serviceNameLower.includes('sweater')) return sweater;
      if (serviceNameLower.includes('hoodie')) return hoodiee;
      if (serviceNameLower.includes('jean')) return jeansImage;
      if (serviceNameLower.includes('short')) return shorts;
      if (serviceNameLower.includes('pyjama')) return pyjama;
      if (serviceNameLower.includes('blazer')) return blazersImage;
      if (serviceNameLower.includes('sherwani')) return sherwani;
      if (serviceNameLower.includes('blouse')) return blouseImage;
      if (serviceNameLower.includes('uniform')) return uniformImage;
      if (serviceNameLower.includes('blanket')) return blanketImage;
      if (serviceNameLower.includes('bedsheet')) return bedsheetSingleImage;
      if (serviceNameLower.includes('curtain')) return curtain;
      if (serviceNameLower.includes('carpet')) return carpet;
      if (serviceNameLower.includes('jerkin')) return jerkin;
      if (serviceNameLower.includes('pillow cover')) return pillowCover;
      if (serviceNameLower.includes('ladies suit(2piece)') || serviceNameLower.includes('2 piece suit')) return LadiesSuit2;

      if (serviceNameLower.includes('ladies suit') || serviceNameLower.includes('3 piece suit')) return LadiesSuit;
      if (serviceNameLower.includes('shoes')) return simpleShoesImage;
      if (serviceNameLower.includes('gown') || serviceNameLower.includes('nighty')) return nightyGown;
      
      // Default fallback
      return ironImage;
    },

    // Function to listen for real-time updates from "prices" collection
    subscribeToPremiumServices(callback) {
      const q1 = query(
        collection(db, 'prices'),
        where('category', '==', 'premiumGeneral')
      );
      
      const q2 = query(
        collection(db, 'prices'),
        where('category', '==', 'premiumOthers')
      );

      // Subscribe to both queries
      const unsubscribe1 = onSnapshot(q1, () => this.handleRealtimeUpdate(callback));
      const unsubscribe2 = onSnapshot(q2, () => this.handleRealtimeUpdate(callback));

      // Return combined unsubscribe function
      return () => {
        unsubscribe1();
        unsubscribe2();
      };
    },

    // Handle real-time updates
    async handleRealtimeUpdate(callback) {
      try {
        const services = await this.fetchPremiumServices();
        if (callback) callback(services);
      } catch (error) {
        console.error('Error handling real-time update:', error);
        if (callback) callback([]);
      }
    },

    // Function to get all services (regular + premium + instant)
    getAllServices() {
      return [
        ...this.services,
        ...this.instantDeliveryServices,
        ...this.premiumServices
      ];
    },

    // Function to get services by category
    getServicesByCategory(category) {
      const allServices = this.getAllServices();
      return allServices.filter(service => 
        service.categories && service.categories.includes(category)
      );
    },

    // Function to get premium services by type
    getPremiumServicesByType(type) {
      return this.premiumServices.filter(service => 
        service.categories.includes(type)
      );
    }
  };
  export default data; // Export as default
