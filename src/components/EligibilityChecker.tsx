import { useState } from 'react';

interface Country {
  name: string;
  code: string;
  region: string;
}

// Sample countries data - in a real app, this would come from the data directory
const countries: Country[] = [
  { name: 'United States', code: 'US', region: 'North America' },
  { name: 'United Kingdom', code: 'GB', region: 'Europe' },
  { name: 'Canada', code: 'CA', region: 'North America' },
  { name: 'Australia', code: 'AU', region: 'Oceania' },
  { name: 'Germany', code: 'DE', region: 'Europe' },
  { name: 'France', code: 'FR', region: 'Europe' },
  { name: 'Japan', code: 'JP', region: 'Asia' },
  { name: 'Italy', code: 'IT', region: 'Europe' },
  { name: 'Spain', code: 'ES', region: 'Europe' },
  { name: 'Brazil', code: 'BR', region: 'South America' },
];

export default function EligibilityChecker() {
  const [licenseOrigin, setLicenseOrigin] = useState('');
  const [travelDestination, setTravelDestination] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (licenseOrigin && travelDestination) {
      // Simple eligibility logic - in real app, this would be more sophisticated
      const isValid = licenseOrigin !== travelDestination && 
                     countries.some(c => c.code === licenseOrigin) &&
                     countries.some(c => c.code === travelDestination);
      
      setIsEligible(isValid);
      setShowResult(true);
    }
  };

  const reset = () => {
    setLicenseOrigin('');
    setTravelDestination('');
    setShowResult(false);
    setIsEligible(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Check Your IDP Eligibility
      </h3>
      
      {!showResult ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="license-origin" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Where is your driving license from?
            </label>
            <select
              id="license-origin"
              value={licenseOrigin}
              onChange={(e) => setLicenseOrigin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-describedby="license-origin-help"
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <p id="license-origin-help" className="mt-1 text-xs text-gray-500">
              Choose the country that issued your driving license
            </p>
          </div>

          <div>
            <label 
              htmlFor="travel-destination" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Where are you planning to drive?
            </label>
            <select
              id="travel-destination"
              value={travelDestination}
              onChange={(e) => setTravelDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-describedby="travel-destination-help"
            >
              <option value="">Select destination country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <p id="travel-destination-help" className="mt-1 text-xs text-gray-500">
              Choose where you want to drive internationally
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!licenseOrigin || !travelDestination}
          >
            Check Eligibility
          </button>
        </form>
      ) : (
        <div className="text-center">
          {isEligible ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
                <svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-green-800 mb-2">
                  ✅ You're Eligible!
                </h4>
                <p className="text-gray-600 mb-4">
                  Great news! You can get an International Driving Permit to drive in{' '}
                  <span className="font-medium">
                    {countries.find(c => c.code === travelDestination)?.name}
                  </span>{' '}
                  with your{' '}
                  <span className="font-medium">
                    {countries.find(c => c.code === licenseOrigin)?.name}
                  </span>{' '}
                  license.
                </p>
                <a
                  href="/apply"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Now - 5 Minutes
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto">
                <svg 
                  className="w-8 h-8 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-red-800 mb-2">
                  Not Eligible
                </h4>
                <p className="text-gray-600 mb-4">
                  You cannot drive in the same country where your license was issued using an IDP. 
                  Please select a different destination country.
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={reset}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
          >
            Check Another Destination
          </button>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>💡 Pro Tip:</strong> An International Driving Permit is a translation of your 
          domestic license and must be used alongside your original license when driving abroad.
        </p>
      </div>
    </div>
  );
}