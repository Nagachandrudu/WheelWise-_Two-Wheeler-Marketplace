import React from 'react';
import { TargetIcon, CheckCircleIcon, SparklesIcon } from '../components/Icons';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { 
      name: 'NagaChandrudu', 
      role: 'Team Lead & AI Specialist', 
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4D16AQEcftqe-ts1WQ/profile-displaybackgroundimage-shrink_350_1400/B4DZY6RTB6G4Ac-/0/1744734336136?e=1761782400&v=beta&t=BNnFDEQXiLUDIbRwxVeT7TIc8R47N01Zh2Ow4TpD1kU', 
      contributions: ['Project Architecture', 'Gemini API Integration (AI Recommendations, Reviews, Maintenance Helper)', 'State Management Core'] 
    },
    { 
      name: 'Jagadeesh', 
      role: 'Frontend Developer', 
      imageUrl: 'https://via.placeholder.com/128', 
      contributions: ['Vehicle Browsing & Filtering System', 'Vehicle Detail Page & Comparison Logic', 'Data Structure & Mockups'] 
    },
    { 
      name: 'V L A Durga Nagesh', 
      role: 'UI/UX & 3D Specialist', 
      imageUrl: 'https://via.placeholder.com/128', 
      contributions: ['Overall UI/UX Design & Styling (Tailwind CSS)', 'Interactive 3D Animations (Three.js)', 'Component Library & Layout'] 
    },
    { 
      name: 'Kumar Reddy', 
      role: 'Frontend Developer', 
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQE6glxhDepFKg/profile-displayphoto-crop_800_800/B56ZmOxRSIG4AI-/0/1759036909197?e=1761782400&v=beta&t=7fwnL1ig2naeokUdaQbsQ_vgXPb0goEw_Xo_SfZoIh0', 
      contributions: ['User Authentication & Dealer Dashboard', 'Sell Your Bike & Test Ride Forms', 'Context API for User State'] 
    },
    { 
      name: 'Harsha', 
      role: 'Frontend Developer', 
      imageUrl: 'https://via.placeholder.com/128', 
      contributions: ['Financial Calculators (EMI, Fuel Cost)', 'Showrooms & Mapping Integration', 'Component Reusability & Optimization'] 
    },
  ];

  const features = [
      'Advanced Vehicle Browsing & Filtering',
      'Side-by-Side Vehicle Comparison',
      'AI-Powered Recommendations',
      'AI-Generated Pros & Cons Reviews',
      'AI Maintenance Helper with Image Upload',
      'User-Managed Favorites & Price Alerts',
      'Dealer Portal to List & Manage Vehicles',
      'EMI & Fuel Cost Calculators',
      'Test Ride Booking System',
      'Local Showroom Finder',
      'Engaging 3D Animations and Modern UI'
  ];

  const techStack = [
      { name: 'React & TypeScript', description: 'For building a robust and scalable user interface.' },
      { name: 'Tailwind CSS', description: 'For rapid, utility-first styling and a consistent design system.' },
      { name: 'React Router', description: 'For client-side routing in our Single Page Application (SPA).' },
      { name: 'Google Gemini API', description: 'The core of our intelligent features, providing recommendations, reviews, and diagnostics.' },
      { name: 'Three.js', description: 'To create immersive 3D animations for the hero section and loading screens.' },
      { name: 'React Context API', description: 'For efficient global state management across the application.' },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg space-y-16">
      
      <header className="text-center border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Project WheelWise</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive overview of our two-wheeler marketplace platform.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-bold text-brand-dark mb-4 flex items-center">
          <TargetIcon className="h-8 w-8 mr-3 text-brand-primary" />
          Problem Statement
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The process of buying a two-wheeler is often fragmented and overwhelming. Prospective buyers face challenges in finding consolidated information, comparing models effectively, understanding financial implications, and connecting with local dealers. WheelWise addresses this by creating a unified, user-friendly digital platform that streamlines the entire journey—from initial research to booking a test ride—simplifying decision-making for consumers.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">
          Detailed Proposal & Prototype Plan
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our proposal is to develop "WheelWise," a feature-rich, AI-enhanced web application serving as a one-stop marketplace for two-wheelers. The platform is designed to empower users with all the necessary tools and information to make an informed purchase.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The prototype, which is the current live application, is built as a Single Page Application (SPA) using React. It demonstrates the core functionalities, including a dynamic vehicle catalog, a powerful comparison tool, and integration with the Google Gemini API for intelligent features. Our plan focuses on iterative development, starting with this robust prototype and continuously adding features based on user feedback and market trends. The architecture is modular, allowing for easy expansion and maintenance.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-brand-dark mb-6">
          Features Implemented
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-brand-secondary mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-800">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-brand-dark mb-6">
          Technology Stack
        </h2>
        <div className="space-y-4">
          {techStack.map((tech, index) => (
            <div key={index} className="bg-brand-light/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-brand-dark">{tech.name}</h3>
              <p className="text-gray-700">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">
          Team Contributions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map(member => (
            <div key={member.name} className="bg-white p-6 rounded-lg shadow-md border flex flex-col">
              <div className="text-center mb-4">
                <img src={member.imageUrl || 'https://via.placeholder.com/128'} alt={member.name} className="w-24 h-24 rounded-full mx-auto shadow-md bg-gray-200 object-cover" />
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-brand-primary">{member.role}</p>
              </div>
              <div className="flex-grow border-t pt-4">
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {(member.contributions || []).map((contribution, index) => <li key={index}>{contribution}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
