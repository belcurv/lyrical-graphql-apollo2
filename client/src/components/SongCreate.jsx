/* ================================= SETUP ================================= */

import React                from 'react';
import PropTypes            from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Mutation }         from 'react-apollo';

// GQL
import FETCH_SONGS          from '../queries/fetchSongs';
import ADD_SONG             from '../mutations/addSong';


/* ========================= COMPONENT DEFINITION ========================== */

class SongCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onAddSong(event, mutation) {
    event.preventDefault();
    mutation({
      variables      : { title: this.state.title },
      refetchQueries : [{ query: FETCH_SONGS }]
    })
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <Mutation mutation={ ADD_SONG } >
        {
          (addSong) => (
            <React.Fragment>
              <Link to="/">Back</Link>
              <h3>Create a New Song</h3>
              <form onSubmit={ e => this.onAddSong(e, addSong) }>
                <label>Song Title:</label>
                <input
                  type="text"
                  onChange={ e => this.setState({ title: e.target.value })}
                  value={ this.state.title }
                />
              </form>
            </React.Fragment>
          )
        }
      </Mutation>
    );
  }
}

SongCreate.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};


/* ================================ EXPORTS ================================ */

export default withRouter(SongCreate);
