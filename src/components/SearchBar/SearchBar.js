import React from 'react';
import "./SearchBar.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            searchBy: "Track",
            searchOptions: ["Track", "Album"],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    handleSearch() {
        this.props.onSearch(this.state.term, this.state.searchBy);
    }
    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }
    handleSearchOptions(option) {
        this.setState({ searchBy: option });
    }
    render() {
        return (
            <div className="SearchBar">
                <div className="input-group ">
                    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} type="text" className="form-control" aria-label="Text input with dropdown button" />
                    <div className="input-group-append">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.searchBy}</button>
                        <div className="dropdown-menu">
                            {this.state.searchOptions.map(option => {
                                return <a className="dropdown-item" onClick={this.handleSearchOptions.bind(this, option)}>{option}</a>
                            })}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row"> 
                    <button className="SearchButton" onClick={this.handleSearch}>SEARCH</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
