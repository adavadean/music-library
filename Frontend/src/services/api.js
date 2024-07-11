import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getArtists = () => api.get('/artists');
export const createArtist = (artist) => api.post('/artists', artist);
export const updateArtist = (id, artist) => api.put(`/artists/${id}`, artist);
export const deleteArtist = (id) => api.delete(`/artists/${id}`);

export const getAlbums = () => api.get('/albums');
export const createAlbum = (album) => api.post('/albums', album);
export const updateAlbum = (id, album) => api.put(`/albums/${id}`, album);
export const deleteAlbum = (id) => api.delete(`/albums/${id}`);

export const search = (query) => api.get(`/search?query=${query}`);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

export default api;
