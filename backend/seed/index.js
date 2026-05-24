import { seedUsers } from "./users.js";
import { seedListings } from "./listings.js";

export async function runSeed() {
    console.log("Checking if seeding is required...");

    const users = await seedUsers();
    const landlords = users.filter((u) => u.role === "landlord");

    await seedListings(landlords);

    console.log("Seeding complete.");
}