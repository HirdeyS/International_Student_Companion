import { seedUsers } from "./users.js";
import { seedListings } from "./listings.js";
export async function runSeed() {
    
    console.log("Checking if seeding is required...");

    const users = await seedUsers();

    const landlords = users.filter(
        (u) => u.role === "landlord"
    );

    if (landlords.length === 0) {
        console.log("No landlords found. Skipping listings.");
        return;
    }

    await seedListings(landlords);

    console.log("Seeding complete.");
}