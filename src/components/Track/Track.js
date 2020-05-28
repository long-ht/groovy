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
        this.props.onAddTrack(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
            <div className="Track">
                <img className="Cover-image" src={this.props.track.image}></img>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artists.map(artist => {
                        return artist.name;
                    }).toString()} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={(this.props.isRemoval) ? this.removeTrack : this.addTrack}>
                    {this.renderAction()}
                </button>
            </div>
        );
    }
}
export default Track;