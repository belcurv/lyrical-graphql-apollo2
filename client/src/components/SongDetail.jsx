/* ================================= SETUP ================================= */

import React       from 'react';
import PropTypes   from 'prop-types';
import { Link }    from 'react-router-dom';
import { Query }   from 'react-apollo';

// components
import LyricCreate from './LyricCreate';
import LyricList   from './LyricList';

// GQL
import FETCH_SONG  from '../queries/fetchOneSong';


/* ========================= COMPONENT DEFINITION ========================== */

const SongDetail = ({ match }) => {
  return (
    <Query query={ FETCH_SONG } variables={{ id: match.params.id }} >
      {
        ({ loading, error, data}) => {
          if (error) { return <p>Error loading song.</p>; }
          if (loading) { return <p>Loading song details...</p>; }

          const { song } = data;

          return (
            <React.Fragment>
              <Link to="/">Back</Link>
              <h3>{ song.title }</h3>
              <LyricList lyrics={ song.lyrics } />
              <LyricCreate songId={ song.id } />
            </React.Fragment>
          );
        }
      }
    </Query>
  );
};

SongDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
};


/* ================================ EXPORTS ================================ */

export default SongDetail;
