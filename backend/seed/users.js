import User from "../models/User.js";

export async function seedUsers() {
    console.log("Checking users...");

    const seedUsers = [
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


    for (const user of seedUsers) {
        const exists = await User.findOne({
            email: user.email
        });

        if (!exists) {
            await User.create(user);
            console.log(`Created ${user.role}: ${user.name}`);
        }
    }


    const users = await User.find({});

    console.log("User check complete.");

    return users;
}