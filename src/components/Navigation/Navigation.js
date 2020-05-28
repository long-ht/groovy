import React from 'react';
import "./Navigation.css"
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleForward = this.handleForward.bind(this);
    }
    handleForward() {
        this.props.onForward();
    }
    handleReturn() {
        this.props.onPrevious();
    }
    render() {
        return (
            <div className="Nav-button">
                <button className="Button" onClick={this.handleReturn}><i className="fas fa-angle-left"></i></button>
                <button className="Button" onClick={this.handleForward}><i className="fas fa-angle-right"></i></button>
                <button className="Playlist-button Button"><a href="#Playlist" style={{color: "#E54B4B", textDecoration: "none"}}><i className="fas fa-angle-down"></i></a></button>
            </div>
        );
    }
}
export default Navigation;