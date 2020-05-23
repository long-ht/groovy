import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "Dazzling Smile", artist: "Hirata", album: "P4", id: 4 },
        { name: "Burn My Dread", artist: "Kawamura", album: "P3", id: 5 },
        { name: "Life Will Change", artist: "Lyn", album: "P5", id: 6 },
      ],
      playlistName: "test",
      playlistTracks: [
        { name: "Never More", artist: "Hirata", album: "P4", id: 1 },
        { name: "Memories of You", artist: "Kawamura", album: "P3", id: 2 },
        { name: "With the Stars and Us", artist: "Lyn", album: "P5", id: 3 },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  render() {
    return (
      <div>
        <h1>Gr<span className="highlight">oo</span>vy</h1>
        <div className="App">
          <SearchBar />
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
