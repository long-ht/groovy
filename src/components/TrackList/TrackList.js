import React from 'react';
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.trackList.map(element => {
                    return (
                        <Track
                            key={element.id}
                            onRemove={this.props.onRemove}
                            track={element}
                            isRemoval={this.props.isRemoval}
                            onAddTrack={this.props.onAddTrack}
                        />);
                })}
            </div>
        );
    }
}
export default TrackList;