import React, { useState, useEffect } from 'react';
import { search } from '../services/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ artists: [], albums: [] });

  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        const result = await search(query);
        setResults(result.data);
      };

      fetchData();
    } else {
      setResults({ artists: [], albums: [] });
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.artists.length > 0 && (
        <div>
          <h2>Artists</h2>
          <ul>
            {results.artists.map((artist) => (
              <li key={artist._id}>
                {artist.name}
                <ul>
                  {artist.albums.map((album) => (
                    <li key={album._id}>
                      {album.title}
                      <ul>
                        {album.songs.map((song, index) => (
                          <li key={index}>{song.title} - {song.length}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.albums.length > 0 && (
        <div>
          <h2>Albums</h2>
          <ul>
            {results.albums.map((album) => (
              <li key={album._id}>
                {album.title}
                <ul>
                  {album.songs.map((song, index) => (
                    <li key={index}>{song.title} - {song.length}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;