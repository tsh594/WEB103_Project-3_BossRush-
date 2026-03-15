export const getAllEvents = async (locationId = '') => {
  const endpoint = locationId
    ? `/api/events?locationId=${encodeURIComponent(locationId)}`
    : '/api/events';

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load events');
  }

  return response.json();
};
