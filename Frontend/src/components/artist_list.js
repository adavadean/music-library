import React, { useEffect, useState } from 'react';
import { getArtists, createArtist, updateArtist, deleteArtist } from '../services/api';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState('');
  const [editArtist, setEditArtist] = useState({ id: '', name: '' });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArtists();
      setArtists(result.data);
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const result = await createArtist({ name: newArtist });
    setArtists([...artists, result.data]);
    setNewArtist('');
  };

  const handleUpdate = async (id) => {
    const result = await updateArtist(id, { name: editArtist.name });
    setArtists(artists.map((artist) => (artist._id === id ? result.data : artist)));
    setEditArtist({ id: '', name: '' });
  };

  const handleDelete = async (id) => {
    await deleteArtist(id);
    setArtists(artists.filter((artist) => artist._id !== id));
  };

  return (
    <div>
      <h1>Artists</h1>
      <input
        type="text"
        value={newArtist}
        onChange={(e) => setNewArtist(e.target.value)}
        placeholder="Add new artist"
      />
      <button onClick={handleCreate}>Add</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist._id}>
            {editArtist.id === artist._id ? (
              <>
                <input
                  type="text"
                  value={editArtist.name}
                  onChange={(e) => setEditArtist({ ...editArtist, name: e.target.value })}
                />
                <button onClick={() => handleUpdate(artist._id)}>Save</button>
              </>
            ) : (
              <>
                <h2>{artist.name}</h2>
                <button onClick={() => setEditArtist({ id: artist._id, name: artist.name })}>
                  Edit
                </button>
                <button onClick={() => handleDelete(artist._id)}>Delete</button>
                <ul>
                  {artist.albums.map((album) => (
                    <li key={album._id}>
                      <h3>{album.title}</h3>
                      <p>{album.description}</p>
                      <ul>
                        {album.songs.map((song, index) => (
                          <li key={index}>{song.title} - {song.length}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;