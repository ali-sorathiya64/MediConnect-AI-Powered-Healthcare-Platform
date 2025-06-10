interface Coordinates {
  lat: number;
  lon: number;
}

interface OSMHospital {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
    "addr:street"?: string;
    "addr:city"?: string;
    "addr:postcode"?: string;
    healthcare?: string;
    [key: string]: string | undefined; // Index signature for additional tags
  };
}

interface FormattedHospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  coordinates: Coordinates;
}

// Convert pincode to coordinates using Nominatim
export async function getPincodeCoordinates(
  pincode: string
): Promise<Coordinates> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pincode)}&country=india&format=json`,
      {
        headers: {
          "User-Agent": "MediConnect/1.0 (contact@example.com)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to geocode pincode: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.length) {
      throw new Error("Pincode not found");
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates received");
    }

    return { lat, lon };
  } catch (error) {
    console.error("Error in getPincodeCoordinates:", error);
    throw error;
  }
}

// Get hospitals near coordinates using Overpass API
export async function getHospitalsNearby(
  coords: Coordinates,
  radius: number = 5000
): Promise<OSMHospital[]> {
  try {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        way["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        relation["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        node["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
        way["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
        relation["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hospitals: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.elements || !Array.isArray(data.elements)) {
      throw new Error("Invalid data format received from Overpass API");
    }

    return data.elements.filter((el: any) => {
      // Filter elements that have coordinates and at least a name or healthcare tag
      return (
        (el.lat && el.lon) &&
        (el.tags?.name || el.tags?.healthcare)
      );
    }) as OSMHospital[];
  } catch (error) {
    console.error("Error in getHospitalsNearby:", error);
    throw error;
  }
}

// Calculate distance between two coordinates in kilometers
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format OSM hospital data into our Hospital interface
export function formatHospitalData(
  osmHospital: OSMHospital,
  userLat: number,
  userLon: number
): FormattedHospital {
  try {
    // Calculate distance
    const distance = calculateDistance(
      userLat,
      userLon,
      osmHospital.lat,
      osmHospital.lon
    );
    
    // Build address parts
    const addressParts = [];
    if (osmHospital.tags?.["addr:street"]) {
      addressParts.push(osmHospital.tags["addr:street"]);
    }
    if (osmHospital.tags?.["addr:city"]) {
      addressParts.push(osmHospital.tags["addr:city"]);
    }
    if (osmHospital.tags?.["addr:postcode"]) {
      addressParts.push(osmHospital.tags["addr:postcode"]);
    }
    
    // Fallback to other address-related tags if standard ones are missing
    if (addressParts.length === 0) {
      if (osmHospital.tags?.["addr:housename"]) {
        addressParts.push(osmHospital.tags["addr:housename"]);
      }
      if (osmHospital.tags?.["addr:housenumber"]) {
        addressParts.push(osmHospital.tags["addr:housenumber"]);
      }
    }
    
    // Get the best available name
    const name = osmHospital.tags?.name || 
                osmHospital.tags?.["operator"] || 
                "Unnamed Hospital";

    return {
      id: osmHospital.id?.toString() || `${osmHospital.lat}-${osmHospital.lon}`,
      name: name,
      distance: parseFloat(distance.toFixed(1)),
      address: addressParts.length > 0 ? addressParts.join(", ") : "Address not available",
      coordinates: {
        lat: osmHospital.lat,
        lon: osmHospital.lon,
      },
    };
  } catch (error) {
    console.error("Error formatting hospital data:", error, osmHospital);
    return {
      id: "error",
      name: "Error loading hospital",
      distance: 0,
      address: "Address not available",
      coordinates: {
        lat: 0,
        lon: 0,
      },
    };
  }
}

// Main function to get formatted hospitals near a pincode
export async function getNearbyHospitals(
  pincode: string,
  radius: number = 5000
): Promise<FormattedHospital[]> {
  try {
    const coords = await getPincodeCoordinates(pincode);
    const hospitals = await getHospitalsNearby(coords, radius);
    
    return hospitals
      .map(hospital => formatHospitalData(hospital, coords.lat, coords.lon))
      .sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error("Error in getNearbyHospitals:", error);
    throw error;
  }
}