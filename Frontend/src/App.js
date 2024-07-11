import React from 'react';
import ArtistList from './components/artist_list';
import AlbumList from './components/album_details';
import Search from './components/search_bar';

function App() {
  return (
    <div className="App">
      <Search />
      <ArtistList />
      <AlbumList />
    </div>
  );
}

export default App;
