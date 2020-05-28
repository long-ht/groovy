import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Navigation from "../Navigation/Navigation";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [[]],
      searchIndex: 0,
      playlistName: "New Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    this.previous = this.previous.bind(this);
    this.forward = this.forward.bind(this);
    this.addAlbumToPlaylist = this.addAlbumToPlaylist.bind(this);
    this.albumClick = this.albumClick.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
  }
  async search(term, searchBy) {
    const result = await Spotify.search(term, searchBy.toLowerCase());
    this.state.searchResults.push(result);
    if (this.state.searchResults.length > 10) {
      this.state.searchResults.shift();
    }
    this.setState({ searchResults: this.state.searchResults, searchIndex: this.state.searchResults.length - 1 });
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some(element => {
      return element.id === track.id;
    })) {
      this.state.playlistTracks.push(track);
    }
  }
  addTrackToPlaylist(track) {
    this.addTrack(track);
    this.setState(this.state.playlistTracks);
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
    alert("Playlist Saved");
  }
  previous() {
    if (this.state.searchIndex > 0) {
      this.setState({ searchIndex: (this.state.searchIndex - 1) });
    }
  }
  forward() {
    if (this.state.searchIndex < this.state.searchResults.length - 1) {
      this.setState({ searchIndex: (this.state.searchIndex + 1) });
    }
  }
  async albumClick(id, imageUrl, name) {
    const result = await Spotify.onAlbumClick(id, imageUrl, name);
    this.state.searchResults.splice(this.state.searchIndex + 1, this.state.searchResults.length - this.state.searchIndex - 1);
    this.state.searchResults.push(result);
    if (this.state.searchResults.length > 10) {
      this.state.searchResults.shift();
    }
    this.setState({ searchResults: this.state.searchResults, searchIndex: this.state.searchResults.length - 1 });
  }
  async addAlbumToPlaylist(id, imageUrl, name) {
    const result = await Spotify.onAlbumClick(id, imageUrl, name);
    result.forEach(track => {
      console.log(track);
      this.addTrack(track);
    })
    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  render() {
    return (
      <div>
        <h1>Groovy</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <Navigation
            onPrevious={this.previous}
            onForward={this.forward}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults[this.state.searchIndex]}
              onAddTrack={this.addTrackToPlaylist}
              onAddAlbum={this.addAlbumToPlaylist}
              onAlbumClick={this.albumClick}
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
