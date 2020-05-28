import React from 'react';
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";
import AlbumList from "../AlbumList/AlbumList.js";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.handleReturn = this.handleReturn.bind(this);
        this.handleForward = this.handleForward.bind(this);
        this.renderResult = this.renderResult.bind(this);
    }
    handleForward() {
        this.props.onForward();
    }
    handleReturn() {
        this.props.onReturn();
    }
    renderResult() {
        if (this.props.searchResults[0] && this.props.searchResults[0].album) {
            return (
                <TrackList
                    onAddTrack={this.props.onAddTrack}
                    isRemoval={false}
                    trackList={this.props.searchResults}
                />
            );
        } else {
            return (
                <AlbumList
                    albumList={this.props.searchResults}
                    onAlbumClick={this.props.onAlbumClick}
                    onAddAlbum={this.props.onAddAlbum}
                />
            );
        }
    }

    render() {
        return (
            <div className="SearchResults">
                <div className="Result">Results</div>
                {this.renderResult()}
            </div>
        );
    }
}
export default SearchResults;
