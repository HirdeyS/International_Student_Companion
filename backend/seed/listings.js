import Listing from "../models/Listing.js"

const SHERIDAN = {
    lat: 43.4695,
    lng: -79.7007,
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function seedListings(landlords) {
    const existing = await Listing.countDocuments();
    
    if (existing > 0) {
        console.log("Listings already exist - skipping listing seed.");
        return;
    }

    console.log("Seeding sample listings...");

    const landlord1 = landlords[0];
    const landlord2 = landlords[1] || landlords[0];

    const fixedListings = [
        {
        title: "Modern Studio Near Sheridan",
        description: "Fully furnished studio ideal for students.",
        address: "1430 Trafalgar Rd, Oakville, ON",
        price: 1400,
        furnished: true,
        shared: false,
        isVerified: true,
        latitude: 43.4696,
        longitude: -79.7005,
        landlord: landlord1._id,
        availableFrom: "2025-03-01",
        },

        {
        title: "Affordable Shared Student Room",
        description: "Shared accommodation with utilities included.",
        address: "380 Upper Middle Rd, Oakville, ON",
        price: 850,
        furnished: false,
        shared: true,
        isVerified: false,
        latitude: 43.4621,
        longitude: -79.7140,
        landlord: landlord2._id,
        availableFrom: "2025-02-20",
        },

        {
        title: "Basement Apartment with Private Entrance",
        description: "Quiet home, private entrance, furnished.",
        address: "1200 Grosvenor St, Oakville, ON",
        price: 1200,
        furnished: true,
        shared: false,
        isVerified: true,
        latitude: 43.4709,
        longitude: -79.7134,
        landlord: landlord1._id,
        availableFrom: "2025-03-10",
        },

        {
        title: "Two Bedroom Condo Near Oakville GO",
        description: "Perfect for 2 students splitting rent.",
        address: "99 Oak Park Blvd, Oakville, ON",
        price: 2300,
        furnished: false,
        shared: false,
        isVerified: true,
        latitude: 43.4753,
        longitude: -79.6954,
        landlord: landlord2._id,
        availableFrom: "2025-03-15",
        },

        {
        title: "Bright Room in Quiet Home Near Campus",
        description: "Private furnished room in family home.",
        address: "240 Trafalgar Rd, Oakville, ON",
        price: 950,
        furnished: true,
        shared: false,
        isVerified: false,
        latitude: 43.4664,
        longitude: -79.6899,
        landlord: landlord1._id,
        availableFrom: "2025-03-05",
        },
    ];

    const withDistance = fixedListings.map((l) => {
        const distance = calculateDistance(
            SHERIDAN.lat,
            SHERIDAN.lng,
            l.latitude,
            l.longitude
        );

        return {
            ...l,
            distanceFromCampus: Number(distance.toFixed(2)),
        };
    });

    await Listing.insertMany(withDistance);

    console.log("Sample listings seeded.");
}