export const getAllBosses = async (searchQuery = '') => {
  const url = searchQuery
    ? `/api/bosses?search=${encodeURIComponent(searchQuery)}`
    : '/api/bosses';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load bosses');
  }

  return response.json();
};

export const getBossById = async (bossId) => {
  const response = await fetch(`/api/bosses/${bossId}`);
  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
};
