

import React, { useState } from 'react';
import { diagnoseVehicleProblem, Diagnosis } from '../services/geminiService';
import { SHOWROOMS } from '../constants';
import { WrenchIcon, CheckCircleIcon, AlertTriangleIcon, MapPinIcon, PhoneIcon } from '../components/Icons';

const MaintenanceHelperPage: React.FC = () => {
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          const [header, data] = result.split(',');
          const mimeType = header.match(/:(.*?);/)?.[1];
          if (mimeType && data) {
            resolve({ mimeType, data });
          } else {
            reject(new Error("Could not parse base64 string."));
          }
        };
        reader.onerror = error => reject(error);
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) {
            setError("Please describe the issue.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setDiagnosis(null);

        try {
            let imagePayload;
            if (imageFile) {
                imagePayload = await fileToBase64(imageFile);
            }
            const result = await diagnoseVehicleProblem(description, imagePayload);
            setDiagnosis(result);
        } catch (err) {
            setError("Failed to get diagnosis. The AI mechanic might be busy. Please try again later.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const Recommendation: React.FC<{ rec: Diagnosis['recommendation'] }> = ({ rec }) => {
        if (rec === 'PROFESSIONAL_HELP_RECOMMENDED') {
            return (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg">
                    <h3 className="font-bold flex items-center"><AlertTriangleIcon className="mr-2" />Recommendation: Seek Professional Help</h3>
                    <p>This issue could be serious. We strongly recommend visiting a qualified mechanic to prevent further damage.</p>
                </div>
            );
        }
        if (rec === 'CAUTION_ADVISED') {
            return (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg">
                    <h3 className="font-bold flex items-center"><AlertTriangleIcon className="mr-2" />Recommendation: Proceed with Caution</h3>
                    <p>If you're not comfortable with the suggested steps, it's best to consult a professional.</p>
                </div>
            );
        }
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg">
                <h3 className="font-bold flex items-center"><CheckCircleIcon className="mr-2" />Recommendation: DIY Friendly</h3>
                <p>This is likely a minor issue that you can resolve yourself by following the steps above.</p>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <WrenchIcon className="h-16 w-16 mx-auto text-brand-primary" />
                <h1 className="text-4xl font-bold text-brand-dark mt-4">AI Maintenance Helper</h1>
                <p className="text-lg text-gray-600 mt-2">Describe your vehicle's issue to get instant advice from our AI mechanic.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Describe the problem
                        </label>
                        <textarea
                            id="description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., 'My bike is making a strange clicking noise from the back wheel when I accelerate.'"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            Upload a photo (optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-primary hover:file:bg-blue-200"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md shadow-sm" />
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-brand-primary text-white rounded-md font-semibold text-lg btn-animated-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Diagnosing...' : 'Get AI Diagnosis'}
                        </button>
                    </div>
                </form>
            </div>

            {isLoading && (
                 <div className="text-center py-10">
                    <p className="text-lg text-gray-600">Our AI mechanic is inspecting your vehicle...</p>
                 </div>
            )}

            {error && (
                <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
                    <p>{error}</p>
                </div>
            )}

            {diagnosis && (
                <div className="mt-8 space-y-8">
                    <h2 className="text-2xl font-bold text-center">Diagnosis Result</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-brand-dark">Potential Causes</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {diagnosis.potentialCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                            </ul>
                        </div>
                        <div className="border-t pt-6">
                            <h3 className="text-xl font-semibold mb-3 text-brand-dark">Suggested Steps</h3>
                            <ul className="list-decimal list-inside space-y-2 text-gray-700">
                                {diagnosis.suggestedSteps.map((step, i) => <li key={i}>{step}</li>)}
                            </ul>
                        </div>
                        <div className="border-t pt-6">
                             <Recommendation rec={diagnosis.recommendation} />
                        </div>
                    </div>

                    {diagnosis.recommendation === 'PROFESSIONAL_HELP_RECOMMENDED' && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Find a Local Expert</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {SHOWROOMS.slice(0, 4).map(showroom => ( // Show a few relevant showrooms
                                    <div key={showroom.id} className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-bold text-brand-dark">{showroom.name}</h3>
                                        <div className="mt-3 space-y-2 text-gray-600 text-sm">
                                            <div className="flex items-start">
                                                <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{showroom.address}, {showroom.city}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span>{showroom.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default MaintenanceHelperPage;