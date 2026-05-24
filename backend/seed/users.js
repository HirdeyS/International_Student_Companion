import User from "../models/User.js";

export async function seedUsers() {
    const existing = await User.countDocuments();
    if (existing > 0) {
        console.log("Users already exist - skipping user seed.")
        return await User.find({});
    }

    console.log("Seeding sample users...");

    const users = [
        {
            name: "Alice Student",
            email: "alice@student.com",
            password: "Password123!",
            role: "student",
            isVerified: true,
        },
        {
            name: "Bob Student",
            email: "bob@student.com",
            password: "Password123!",
            role: "student",
            isVerified: true,
        },
        {
            name: "Charlie Student",
            email: "charlie@student.com",
            password: "Password123!",
            role: "student",
            isVerified: true,
        },
        {
            name: "Liam Landlord",
            email: "liam@landlord.com",
            password: "Password123!",
            role: "landlord",
            isVerified: true,
        },
        {
            name: "Emma Landlord",
            email: "emma@landlord.com",
            password: "Password123!",
            role: "landlord",
            isVerified: true,
        },
    ];

    const created = await User.insertMany(users);
    console.log("Users seeded.");

    return created;
}