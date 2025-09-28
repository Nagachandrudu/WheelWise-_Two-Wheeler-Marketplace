
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


Problem Statement : Build a two-wheeler marketplace web app

The process of buying a two-wheeler is often fragmented and overwhelming. Prospective buyers face challenges in finding consolidated information, comparing models effectively, understanding financial implications, and connecting with local dealers. WheelWise addresses this by creating a unified, user-friendly digital platform that streamlines the entire journey—from initial research to booking a test ride—simplifying decision-making for consumers.

Detailed Proposal & Prototype Plan
Our proposal is to develop "WheelWise," a feature-rich, AI-enhanced web application serving as a one-stop marketplace for two-wheelers. The platform is designed to empower users with all the necessary tools and information to make an informed purchase.
The prototype, which is the current live application, is built as a Single Page Application (SPA) using React. It demonstrates the core functionalities, including a dynamic vehicle catalog, a powerful comparison tool, and integration with the Google Gemini API for intelligent features. Our plan focuses on iterative development, starting with this robust prototype and continuously adding features based on user feedback and market trends. The architecture is modular, allowing for easy expansion and maintenance.

Features Implemented
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
React & TypeScript: For building a robust and scalable user interface.
Tailwind CSS: For rapid, utility-first styling and a consistent design system.
React Router: For client-side routing in our Single Page Application (SPA).
Google Gemini API: The core of our intelligent features, providing recommendations, reviews, and diagnostics.
Three.js: To create immersive 3D animations for the hero section and loading screens.
React Context API: For efficient global state management across the application.

Contribution Details of Each Team Member

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
