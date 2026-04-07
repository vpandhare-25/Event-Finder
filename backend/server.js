// ===============================
// 1) Imports and App Setup
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Read MongoDB URI from environment so secrets are not hardcoded in source.
const MONGO_URI = process.env.MONGO_URI;
// ===============================
// 2) Middleware
// ===============================
// Enable CORS so frontend apps from other origins can call this API.
app.use(cors());
// Parse incoming JSON request bodies.
app.use(express.json());

// ===============================
// 3) MongoDB Connection
// ===============================
async function connectDB() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing. Add it in backend/.env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

connectDB();


// ===============================
// 4) Event Schema and Model
// ===============================
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

// ===============================
// 5) Mock Events Data (Hardcoded)
// ===============================
const mockEvents = [
  {
    title: "City Music Festival",
    date: "2026-05-12",
    location: "San Francisco, CA",
    category: "Music",
    description: "An open-air music festival featuring indie and rock artists.",
    url: "https://example.com/events/city-music-festival",
  },
  {
    title: "Tech Innovators Meetup",
    date: "2026-05-18",
    location: "Austin, TX",
    category: "Technology",
    description: "Networking event for founders, developers, and product leaders.",
    url: "https://example.com/events/tech-innovators-meetup",
  },
  {
    title: "Community Food Fair",
    date: "2026-06-02",
    location: "Seattle, WA",
    category: "Food",
    description: "Taste local cuisine and enjoy live cooking demonstrations.",
    url: "https://example.com/events/community-food-fair",
  },
  {
    title: "Marathon for Charity",
    date: "2026-06-10",
    location: "Boston, MA",
    category: "Sports",
    description: "A city-wide marathon to raise funds for education programs.",
    url: "https://example.com/events/marathon-for-charity",
  },
  {
    title: "Art & Design Expo",
    date: "2026-06-21",
    location: "New York, NY",
    category: "Art",
    description: "Showcase of modern art, design installations, and workshops.",
    url: "https://example.com/events/art-design-expo",
  },
  {
    title: "Startup Pitch Night",
    date: "2026-07-04",
    location: "Chicago, IL",
    category: "Business",
    description: "Early-stage startups pitch to investors and industry mentors.",
    url: "https://example.com/events/startup-pitch-night",
  },
  {
    title: "Wellness Retreat Weekend",
    date: "2026-07-12",
    location: "Denver, CO",
    category: "Health",
    description: "Yoga, mindfulness sessions, and wellness talks in nature.",
    url: "https://example.com/events/wellness-retreat-weekend",
  },
  {
    title: "International Film Screening",
    date: "2026-07-20",
    location: "Los Angeles, CA",
    category: "Film",
    description: "Screening of award-winning short films from around the world.",
    url: "https://example.com/events/international-film-screening",
  },
  {
    title: "Book Lovers Convention",
    date: "2026-08-01",
    location: "Portland, OR",
    category: "Literature",
    description: "Author panels, book signings, and community discussions.",
    url: "https://example.com/events/book-lovers-convention",
  },
];

// ===============================
// 6) Routes
// ===============================

// Health check route to quickly verify the backend is running.
app.get("/", (req, res) => {
  console.log("GET / called");
  res.json({ message: "EventFinder backend is running." });
});

// GET /events
// Returns 8-10 hardcoded mock events.
app.get("/events", (req, res) => {
  console.log("GET /events called - returning mock events");
  res.status(200).json(mockEvents);
});

// POST /events
// Adds a new event to MongoDB.
app.post("/events", async (req, res) => {
  try {
    console.log("POST /events called with body:", req.body);

    const { title, date, location, category, description, url } = req.body;

    const newEvent = new Event({
      title,
      date,
      location,
      category,
      description,
      url,
    });

    const savedEvent = await newEvent.save();
    console.log("New event saved:", savedEvent._id);

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error saving event:", error.message);
    res.status(500).json({ error: "Failed to save event." });
  }
});

// ===============================
// 7) Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
