import CommunityPost from "../models/CommunityPost.js";

export async function seedCommunityPosts(users) {
    const existing = await CommunityPost.countDocuments();

    if (existing > 0) {
        console.log("Community posts already exist - skipping seed.");
        return;
    }

    console.log("Seeding community posts...");

    const students = users.filter(
        (u) => u.role === "student"
    );

    if (students.length < 3) {
        console.log("Not enough students for community seed.");
        return;
    }


    const posts = [
        {
            user: students[0]._id,

            group: "Housing",

            content:
                "Hey everyone! I am a new international student at Sheridan and I am looking for roommates near campus. Anyone interested in sharing an apartment?",

            status: "approved",

            likes: [
                students[1]._id,
                students[2]._id
            ],

            comments: [
                {
                    user: students[1]._id,
                    text:
                        "I am also looking for a roommate. Let's connect!"
                },
                {
                    user: students[2]._id,
                    text:
                        "There are some good places near Trafalgar Road."
                }
            ]
        },


        {
            user: students[1]._id,

            group: "Friends",

            content:
                "I just moved to Canada and would love to meet new people. Share your Instagram handles if you want to connect and explore Oakville together 😊",

            status: "approved",

            likes: [
                students[0]._id
            ],

            comments: [
                {
                    user: students[0]._id,
                    text:
                        "Welcome to Canada! My Instagram is @alice_student. Let's hang out!"
                }
            ]
        },


        {
            user: students[2]._id,

            group: "Student Life",

            content:
                "Having a hard time adjusting to a new country while managing classes and assignments. Any advice from senior students?",

            status: "approved",

            likes: [
                students[0]._id,
                students[1]._id
            ],

            comments: [
                {
                    user: students[1]._id,
                    text:
                        "Create a schedule and don't forget to take breaks."
                },
                {
                    user: students[0]._id,
                    text:
                        "The Sheridan student services are really helpful."
                }
            ]
        },


        {
            user: students[0]._id,

            group: "Events",

            content:
                "Anyone interested in joining a cultural meetup this weekend? It would be great to meet other international students.",

            status: "approved",

            likes: [
                students[2]._id
            ],

            comments: [
                {
                    user: students[2]._id,
                    text:
                        "Sounds interesting! What time is it happening?"
                }
            ]
        },


        {
            user: students[1]._id,

            group: "Academics",

            content:
                "Looking for students who want to create a study group for upcoming exams. Computer Science students welcome!",

            status: "approved",

            likes: [],

            comments: []
        }
    ];


    await CommunityPost.insertMany(posts);

    console.log("Community posts seeded.");
}