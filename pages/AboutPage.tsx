import React from 'react';
import { TargetIcon, SparklesIcon } from '../components/Icons';

const AboutPage: React.FC = () => {
  // NOTE: To add your team's images, please replace the placeholder URLs below.
  // The link must be a DIRECT link to the image file (e.g., ending in .jpg or .png).
  // Sharing links from services like Google Drive or OneDrive will not work.
  const teamMembers = [
    { name: 'Chandu', role: 'developer', imageUrl: `https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=` },
    
    { name: 'jagadeesh', role: 'developer ', imageUrl: `https://1drv.ms/i/c/c82aab98b37557b6/EUb33esCfDBGvTJiUfFavyQB-NYkE8z93S_tNlwltiafew?e=nKcoQF` },
    { name: 'ayyappa', role: ' developer', imageUrl: '' },
    { name: 'kumar', role: 'developer', imageUrl: '' },
    { name: 'harsha', role: 'developer', imageUrl: '' },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">About WheelWise</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in the journey to find the perfect two-wheeler.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-brand-dark mb-4 flex items-center">
            <TargetIcon className="h-8 w-8 mr-3 text-brand-primary" />
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At WheelWise, our mission is to simplify the two-wheeler buying and selling process. We aim to empower our customers with comprehensive information, transparent pricing, and innovative tools, making it easier than ever to make confident decisions. We believe that the right ride can bring joy and freedom, and we're here to help you find it.
          </p>
        </div>
        <div className="order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" alt="Motorbike on a scenic road" className="rounded-lg shadow-md" />
        </div>
      </div>

      <div className="mt-16">
         <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg text-center">
                <SparklesIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3" />
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-gray-600">We provide clear, unbiased information so you can choose with confidence.</p>
            </div>
             <div className="p-6 bg-gray-50 rounded-lg text-center">
                <SparklesIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3" />
                <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
                <p className="text-gray-600">Your needs are at the heart of everything we do. We're here to support you.</p>
            </div>
             <div className="p-6 bg-gray-50 rounded-lg text-center">
                <SparklesIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We leverage technology to create a seamless and enjoyable experience.</p>
            </div>
          </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.name} className="text-center">
              <img src={member.imageUrl || 'https://via.placeholder.com/128'} alt={member.name} className="w-32 h-32 rounded-full mx-auto shadow-md bg-gray-200 object-cover" />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-brand-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
