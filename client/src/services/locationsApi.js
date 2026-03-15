export const getAllLocations = async () => {
  const response = await fetch('/api/locations');
  if (!response.ok) {
    throw new Error('Failed to load locations');
  }
  return response.json();
};

export const getLocationEvents = async (locationId) => {
  const response = await fetch(`/api/locations/${locationId}/events`);
  if (!response.ok) {
    throw new Error('Failed to load events for this location');
  }
  return response.json();
};
