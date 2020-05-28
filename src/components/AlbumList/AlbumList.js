import React from 'react';
import "./AlbumList.css";
import Album from "../Album/Album";

class AlbumList extends React.Component {
    render() {
        return (
            <div className="AlbumList">
                {this.props.albumList.map(element => {
                    return (
                        <Album
                            key={element.id}
                            album={element}
                            onAddAlbum={this.props.onAddAlbum}
                            onAlbumClick={this.props.onAlbumClick}
                        />);
                })}
            </div>
        );
    }
}
export default AlbumList;