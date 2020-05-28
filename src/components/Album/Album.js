import React from 'react';
import "./Album.css";

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.addAlbum = this.addAlbum.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    addAlbum() {
        console.log("reached");
        this.props.onAddAlbum(this.props.album.id, this.props.album.image, this.props.album.name);
    }
    handleClick() {
        this.props.onAlbumClick(this.props.album.id, this.props.album.image, this.props.album.name);
    }
    render() {
        return (
            <div className="Album">
                <img className="Cover-image" src={this.props.album.image} onClick={this.handleClick}></img>
                <div className="Album-information" onClick={this.handleClick}>
                    <h3>{this.props.album.name}</h3>
                    <p>{this.props.album.artists.map(artist => {
                        return artist.name;
                    }).toString()} | {(this.props.album.album) ? (this.props.album.album.name) : ""}</p>
                </div>
                <button className="Album-action" onClick={this.addAlbum}>
                    +
                </button>
            </div>
        );
    }
}
export default Album;