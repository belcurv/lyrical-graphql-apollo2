/* ================================= SETUP ================================= */

import React        from 'react';
import PropTypes    from 'prop-types';
import { Mutation } from 'react-apollo';

// GQL
import ADD_LYRIC    from '../mutations/addLyricToSong';


/* ========================= COMPONENT DEFINITION ========================== */

class LyricCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onSubmit(event, mutation) {
    event.preventDefault();
    mutation({
      variables: {
        content : this.state.content,
        songId  : this.props.songId
      }
    });
    this.setState({ content: '' });
  }

  render() {
    return (
      <Mutation mutation={ ADD_LYRIC }>
        {
          (addLyricToSong) => (
            <form onSubmit={ e => this.onSubmit(e, addLyricToSong) }>
              <label>Add a Lyric</label>
              <input
                type="text"
                value={ this.state.content }
                onChange={ e => this.setState({ content: e.target.value }) }
              />
            </form>
          )
        }
      </Mutation>
    );
  }
}

LyricCreate.propTypes = {
  songId : PropTypes.string,
  mutate : PropTypes.func
};


/* ================================ EXPORTS ================================ */

export default LyricCreate;
