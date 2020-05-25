import React from 'react';
import "./Track.css";

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction() {
        return (this.props.isRemoval) ? "-" : "+";
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
        console.log(this.props.track);
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artists.map(artist=>{
                        return artist.name;
                    }).toString()} | {this.props.track.album.name}</p>
                </div>
                <button className="Track-action" onClick={(this.props.isRemoval) ? this.removeTrack : this.addTrack}>
                    {this.renderAction()}
                </button>
            </div>
        );
    }
}
export default Track;