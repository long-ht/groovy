import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // { name: "Dazzling Smile", artist: "Hirata", album: {name:"P4"}, id: 4 },
        // { name: "Burn My Dread", artist: "Kawamura", album: {name:"P3"}, id: 5 },
        // { name: "Life Will Change", artist: "Lyn", album: {name:"P5"}, id: 6 },
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        // { name: "Never More", artist: "Hirata", album: {name:"P4"}, id: 1 },
        // { name: "Memories of You", artist: "Kawamura", album: {name:"P3"}, id: 2 },
        // { name: "With the Stars and Us", artist: "Lyn", album: {name:"P5"}, id: 3 },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);

  }
  async search(term) {
    const results = await Spotify.search(term);
    this.setState({ searchResults: results });
  }
  addTrack(track) {
    if (!this.state.playlistTracks.some(element => {
      return element.id === track.id;
    })) {
      this.state.playlistTracks.push(track);
      this.setState(this.state.playlistTracks);
    }
  }
  removeTrack(track) {
    const newList = this.state.playlistTracks.filter(element => {
      return element.id !== track.id;
    });
    this.setState({ playlistTracks: newList });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlayList() {
    const trackURIs = this.state.playlistTracks.map(element => {
      return element.uri;
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  }

  render() {
    return (
      <div>
        <h1>Gr<span className="highlight">oo</span>vy</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              name={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
