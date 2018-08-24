/* ================================= SETUP ================================= */

import React               from 'react';
import { Link }            from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

// GQL
import FETCH_SONGS         from '../queries/fetchSongs';
import DELETE_SONG         from '../mutations/deleteSong';


/* ============================ EVENT HANDLERS ============================= */

const onDeleteSong = (mutation, songId) => {
  mutation({
    variables      : { id: songId },
    refetchQueries : [{ query: FETCH_SONGS }]
  });
};


/* ============================ PRIVATE METHODS ============================ */

const renderSongs = (data) => data.songs.map(({ id, title }) => (
  <Mutation key={ id } mutation={ DELETE_SONG } >
    { (deleteSong) => (
      <React.Fragment>
        <li className="collection-item">
          <Link to={`/songs/${id}`}>
            { title }
          </Link>
          <i
            className="material-icons"
            onClick={ () => onDeleteSong(deleteSong, id)}
          >
            delete
          </i>
        </li>
      </React.Fragment>
    ) }
  </Mutation>
));


/* ========================= COMPONENT DEFINITION ========================== */

const SongList = () => (
  <Query query={ FETCH_SONGS }>
    {
      ({loading, error, data}) => {
        if (error) { return <p>Error loading songs.</p>; }
        if (loading) { return <p>Loading...</p>; }

        return (
          <React.Fragment>
            <h3>All Songs</h3>
            <ul className="collection">
              { renderSongs(data) }
            </ul>
            <Link
              to="/songs/new"
              className="btn-floating btn-large red right"
            >
              <i className="material-icons">add</i>
            </Link>
          </React.Fragment>
        );
      }
    }
  </Query>
);


/* ================================ EXPORTS ================================ */

export default SongList;
