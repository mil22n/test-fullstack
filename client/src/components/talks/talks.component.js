import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTalks } from '../../actions/talks.actions';
import renderTalksRow from './render-talks-row';
import './talks.css';
import Icon from '../../assets/icon.png';

class Talks extends Component {
    componentDidMount() {
        this.props.fetchTalks();
    }

    render() {
        return (
            <div className="talks">
                <div className="table">
                    <div className="header">
                        <div className="column number-column">
                            <img className="icon" src={Icon} alt="Icon" />
                        </div>
                        <div className="column title-column">
                            <Link className="title" to="/news">Hacker Talks</Link>
                            <Link to="/submit">submit</Link>
                        </div>
                        <div className="column auth-column">
                            {!this.props.auth.user && <Link to="/login">login</Link>}
                            {this.props.auth.user && <span>{this.props.auth.user.username}</span>}
                        </div>
                    </div>
                    {this.props.talks.map(renderTalksRow.bind(this))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ talks, auth }) => {
    return { talks, auth };
};

export default connect(mapStateToProps, { fetchTalks })(Talks);
