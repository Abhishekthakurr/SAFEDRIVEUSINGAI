import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaTimes, FaHistory } from 'react-icons/fa';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function LocationSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError('Google Maps API key is not configured');
      setIsLoading(false);
      return;
    }

    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      initializeMap();
    };
    script.onerror = () => {
      setError('Failed to load Google Maps');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Center on India
      zoom: 5,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        }
      ]
    });

    setMap(mapInstance);
    autocompleteService.current = new window.google.maps.places.AutocompleteService();
    placesService.current = new window.google.maps.places.PlacesService(mapInstance);
  };

  const handleSearch = async (input) => {
    setSearchValue(input);
    if (!input) {
      setPredictions([]);
      return;
    }

    try {
      const response = await new Promise((resolve, reject) => {
        autocompleteService.current.getPlacePredictions(
          { input },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(predictions);
            } else {
              reject(status);
            }
          }
        );
      });

      setPredictions(response);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
  };

  const handleSelectLocation = (prediction) => {
    placesService.current.getDetails(
      { placeId: prediction.place_id },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSelectedLocation(place);
          
          // Add to search history
          const newHistory = [
            { name: place.formatted_address, placeId: place.place_id },
            ...searchHistory.filter(item => item.placeId !== place.place_id)
          ].slice(0, 5);
          setSearchHistory(newHistory);
          
          // Update map
          map.setCenter(place.geometry.location);
          map.setZoom(15);
          
          // Create marker
          new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            animation: window.google.maps.Animation.DROP
          });
        }
      }
    );
    
    setSearchValue(prediction.description);
    setPredictions([]);
  };

  const clearSearch = () => {
    setSearchValue('');
    setPredictions([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Location</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-1">
            Please add your Google Maps API key to the .env file
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowHistory(true)}
                placeholder="Search for a location..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Search Predictions */}
            {predictions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                {predictions.map((prediction) => (
                  <motion.button
                    key={prediction.place_id}
                    onClick={() => handleSelectLocation(prediction)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{prediction.structured_formatting.main_text}</p>
                      <p className="text-sm text-gray-500">{prediction.structured_formatting.secondary_text}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Search History */}
            {showHistory && searchHistory.length > 0 && !predictions.length && !searchValue && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                <div className="px-4 py-2 text-sm font-medium text-gray-500">Recent Searches</div>
                {searchHistory.map((item) => (
                  <motion.button
                    key={item.placeId}
                    onClick={() => handleSearch(item.name)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <FaHistory className="text-gray-400" />
                    <span className="text-gray-700">{item.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Map Container */}
          {!error && (
            <div 
              ref={mapRef}
              className="w-full h-[400px] rounded-lg overflow-hidden"
            />
          )}

          {/* Selected Location Info */}
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <h3 className="font-medium text-gray-900">{selectedLocation.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{selectedLocation.formatted_address}</p>
              {selectedLocation.formatted_phone_number && (
                <p className="text-gray-600 text-sm mt-1">{selectedLocation.formatted_phone_number}</p>
              )}
              {selectedLocation.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{selectedLocation.rating} ({selectedLocation.user_ratings_total} reviews)</span>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
