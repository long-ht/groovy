import React from 'react';
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this);
    }
    handleNameChange(e){
        this.props.onNameChange(document.getElementById("Playlist-Name").value);
    }

    render() {
        return (
            <div id="Playlist" className="Playlist">
                <input id="Playlist-Name" onChange={this.handleNameChange} value={this.props.name} />
                <TrackList
                    isRemoval={true}
                    trackList={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
export default Playlist;