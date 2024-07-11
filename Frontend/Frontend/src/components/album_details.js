import React, { useEffect, useState } from 'react';
import {  getAlbums, createAlbum, updateAlbum, deleteAlbum  } from '../services/api';


const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', songs: [], artist: '' });
  const [editAlbum, setEditAlbum] = useState({ id: '', title: '', description: '', songs: [], artist: '' });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAlbums();
      setAlbums(result.data);
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const result = await createAlbum(newAlbum);
    setAlbums([...albums, result.data]);
    setNewAlbum({ title: '', description: '', songs: [], artist: '' });
  };

  const handleUpdate = async (id) => {
    const result = await updateAlbum(id, editAlbum);
    setAlbums(albums.map((album) => (album._id === id ? result.data : album)));
    setEditAlbum({ id: '', title: '', description: '', songs: [], artist: '' });
  };

  const handleDelete = async (id) => {
    await deleteAlbum(id);
    setAlbums(albums.filter((album) => album._id !== id));
  };

  return (
    <div>
      <h1>Albums</h1>
      <input
        type="text"
        value={newAlbum.title}
        onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
        placeholder="Add new album title"
      />
      <input
        type="text"
        value={newAlbum.description}
        onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
        placeholder="Add new album description"
      />
      <input
        type="text"
        value={newAlbum.artist}
        onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
        placeholder="Add artist ID"
      />
      <button onClick={handleCreate}>Add</button>
      <ul>
        {albums.map((album) => (
          <li key={album._id}>
            {editAlbum.id === album._id ? (
              <>
                <input
                  type="text"
                  value={editAlbum.title}
                  onChange={(e) => setEditAlbum({ ...editAlbum, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editAlbum.description}
                  onChange={(e) => setEditAlbum({ ...editAlbum, description: e.target.value })}
                />
                <button onClick={() => handleUpdate(album._id)}>Save</button>
              </>
            ) : (
              <>
                <h2>{album.title}</h2>
                <p>{album.description}</p>
                <button onClick={() => setEditAlbum({ id: album._id, title: album.title, description: album.description, songs: album.songs, artist: album.artist })}>
                  Edit
                </button>
                <button onClick={() => handleDelete(album._id)}>Delete</button>
                <ul>
                  {album.songs.map((song, index) => (
                    <li key={index}>{song.title} - {song.length}</li>
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

export default AlbumList;