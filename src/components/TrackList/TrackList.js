import React from 'react';
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.trackList.map(track => {
                    return (
                        <Track
                            key={track.id}
                            onRemove={this.props.onRemove}
                            track={track}
                            isRemoval={this.props.isRemoval}
                            onAdd={this.props.onAdd}
                        />);
                })}
            </div>
        );
    }
}
export default TrackList;