

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1pU3lfVIpAt0nSdkCZzfj44PSN0KCSypT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


Problem Statement Chosen

The core problem WheelWise aims to solve is the fragmented and overwhelming process of buying a two-wheeler. The application addresses the challenges buyers face in finding consolidated information, effectively comparing models, understanding financial implications, and connecting with local dealers. The goal is to create a unified, user-friendly digital platform that streamlines the entire journey, from research to booking a test ride, simplifying decision-making for consumers.

Detailed Proposal & Prototype Plan
The proposal is to develop "WheelWise" as a feature-rich, AI-enhanced web application that acts as a one-stop marketplace for two-wheelers. The platform is designed to empower users with all the necessary tools and information to make an informed purchase.
The current live application serves as the prototype. It is a Single Page Application (SPA) built with React and demonstrates core functionalities like a dynamic vehicle catalog, a powerful comparison tool, and integration with the Google Gemini API for intelligent features. The development plan is iterative, starting with this robust prototype and continuously adding features based on user feedback and market trends.

Features Implemented
The application includes a comprehensive set of features:
Advanced Vehicle Browsing & Filtering
Side-by-Side Vehicle Comparison
AI-Powered Recommendations
AI-Generated Pros & Cons Reviews
AI Maintenance Helper with Image Upload
User-Managed Favorites & Price Alerts
Dealer Portal to List & Manage Vehicles
EMI & Fuel Cost Calculators
Test Ride Booking System
Local Showroom Finder
Engaging 3D Animations and Modern UI

Tech Stack Used
The project is built with a modern web technology stack:
React & TypeScript: For building a robust and scalable user interface.
Tailwind CSS: For rapid, utility-first styling and a consistent design system.
React Router: For client-side routing.
Google Gemini API: As the core of the intelligent features, providing recommendations, reviews, and diagnostics.
Three.js: To create immersive 3D animations.
React Context API: For efficient global state management.

Contribution Details of Each Team Member
Here is the breakdown of each team member's contributions:

NagaChandrudu (Team Lead & AI Specialist):
Project Architecture
Gemini API Integration (AI Recommendations, Reviews, Maintenance Helper)
State Management Core

Jagadeesh (Frontend Developer):
Vehicle Browsing & Filtering System
Vehicle Detail Page & Comparison Logic
Data Structure & Mockups

V L A Durga Nagesh (UI/UX & 3D Specialist):
Overall UI/UX Design & Styling (Tailwind CSS)
Interactive 3D Animations (Three.js)
Component Library & Layout

Kumar Reddy (Frontend Developer):
User Authentication & Dealer Dashboard
Sell Your Bike & Test Ride Forms
Context API for User State

Harsha (Frontend Developer):
Financial Calculators (EMI, Fuel Cost)
Showrooms & Mapping Integration
Component Reusability & Optimization
