import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = event => this.setState({ text: event.target.value });


    onSubmit = event => {
        event.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please enter a search term', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' })
        }
    }

    render() {
        const { showClear, clearUsers } = this.props;
        const { text } = this.state;

        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search Users..." value={text} onChange={this.onChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
            </div>
        )
    }
}

export default Search
