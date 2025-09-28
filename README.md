
# Run and deploy your AI Studio app

This contains everything you need to run our app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1pU3lfVIpAt0nSdkCZzfj44PSN0KCSypT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


Problem Statement: Build a two-wheeler marketplace web app

1. Detailed Proposal & Prototype Plan
Proposal: WheelWise is a modern, all-in-one digital marketplace designed to simplify the entire lifecycle of two-wheeler ownership. The platform aims to be the ultimate destination for enthusiasts and daily commuters alike, providing a seamless experience from initial research to purchase, maintenance, and eventual resale. By integrating powerful tools, an intuitive user interface, and cutting-edge AI features, WheelWise will empower users to make informed decisions with confidence and ease.

Prototype Plan:
The development will be phased to ensure a stable and feature-rich rollout.

Phase 1 (Core Functionality - Complete): Build the foundational prototype which includes:
Browsing & Filtering: A comprehensive catalog of vehicles with robust filtering and search capabilities.

Vehicle Details: Detailed specification pages for each model.
Comparison Tool: A side-by-side comparison feature for up to four vehicles.
User Accounts: Basic user login to enable personalized features.

Phase 2 (Interactive Tools & Personalization - Complete): Enhance user engagement with:
Calculators: Implement EMI and Fuel Cost calculators.
Favorites: Allow users to save and track vehicles they are interested in.
AI Recommendations: Use Gemini API to provide personalized suggestions based on user favorites.
AI-Powered Reviews: Generate pros and cons for vehicles on demand.

Phase 3 (Marketplace & Maintenance - Complete): Expand the platform's utility by adding:
Sell Your Bike: A user-friendly form for users to list their own vehicles.
Dealer Dashboard: A dedicated portal for dealers to manage their inventory.
AI Maintenance Helper: An innovative tool for diagnosing vehicle issues using text and images.
Showroom Locator: An interactive page to find nearby showrooms.

3. Features to be Implemented (Based on Current App)
The application already includes a robust set of features:
Dynamic Home Page: Features curated sections for different vehicle types and showcases upcoming models.
AI-Powered Recommendations: Delivers personalized vehicle suggestions to logged-in users based on their favorited items.
Advanced Browsing: A filterable and searchable gallery of bikes, scooters, and bicycles.
Side-by-Side Comparison: An intuitive interface to compare the specifications of multiple vehicles.
Financial Calculators: Tools for calculating loan EMIs and estimating fuel cost savings of EVs over petrol vehicles.
User Vehicle Listings: A "Sell Bike" feature allowing users to add their own vehicles to the marketplace.
User Authentication: A simple login system to manage personal data like favorites and listings.
Favorites System: Allows users to save vehicles for later viewing.
Dealer Dashboard: A specialized view for dealers to track their listings, inventory value, and average ratings.
AI Maintenance Helper: A cutting-edge feature that uses the Gemini API to diagnose vehicle problems from user descriptions and optional photos, providing potential causes and suggested actions.
Showroom Locator: Helps users find official showrooms in their city.
Test Ride Booking: A streamlined form for users to schedule test rides at their preferred showrooms.


5. Tech Stack Used
The application is built using a modern and powerful technology stack:
Frontend Framework: React with TypeScript for building a robust, type-safe, and scalable user interface.
Styling: Tailwind CSS for a utility-first approach to create a responsive and visually appealing design with custom animations.
Routing: React Router for handling client-side navigation between different pages of the application.
AI & Machine Learning: Google Gemini API is integrated for multiple intelligent features, including personalized recommendations, AI-generated reviews, and the vehicle maintenance diagnostician.
3D Graphics: Three.js is used to create immersive 3D animations for the hero section and the opening loading screen, enhancing the user experience.
State Management: React Context API is used for managing global state across components (e.g., vehicle data, user authentication, comparison list).

7. Contribution Details of Each Team Member
Here is a proposed breakdown of responsibilities for the team members listed in the About Page:

Chandu (Lead Frontend & UI/UX):
Responsible for the overall application architecture, component design, and UI/UX strategy.
Implemented the core layout, navigation, and visual theme using Tailwind CSS.
Developed key interactive pages like the HomePage and BrowsePage.

Jagadeesh (State Management & Context):
Focused on managing the application's state using React Context.
Developed VehicleContext, AuthContext, and CompareContext to handle data flow and user interactions seamlessly.
Ensured data persistence using localStorage.

Ayyappa (AI Integration & Services):
Led the integration of the Google Gemini API.
Developed the geminiService.ts file, creating functions for AI recommendations, AI-powered reviews, and the MaintenanceHelperPage diagnostics.
Handled API error handling and data parsing.

Kumar (Component Development & Features):
Developed specialized components and pages like VehicleDetailPage, CalculatorsPage, and the DealerDashboardPage.
Focused on implementing business logic for features like adding reviews, setting price alerts, and displaying stats.

Harsha (Forms & 3D Graphics):
Responsible for creating all user input forms, including SellBikePage, TestRidePage, and LoginPage, ensuring proper validation and state handling.
Implemented the 3D graphics using Three.js for the OpeningAnimation and HeroAnimation, adding a polished, high-tech feel to the application.
