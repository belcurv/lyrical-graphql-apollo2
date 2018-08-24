/* ================================= SETUP ================================= */

import React        from 'react';
import PropTypes    from 'prop-types';
import { Mutation } from 'react-apollo';

// GQL
import LIKE_LYRIC   from '../mutations/likeLyric';


/* ============================ EVENT HANDLERS ============================= */

const onLikeLyric = (mutation, lyricId, likes) => {
  mutation({
    variables: { id: lyricId },
    optimisticResponse: {
      __typename: 'Mutation',
      likeLyric: {
        __typename : 'Lyric',
        id         : lyricId,
        likes      : likes + 1  // we guess mutation will succedd
      }
    }
  });
};


/* ============================ PRIVATE METHODS ============================ */

const renderLyrics = (lyrics) => lyrics.map(({ id, content, likes }) => (
  <Mutation key={ id } mutation={ LIKE_LYRIC } >
    {
      (likeLyric) => (
        <React.Fragment>
          <li className="collection-item">
            { content }
            <div className="vote-box">
              <i
                className="material-icons"
                onClick={ () => onLikeLyric(likeLyric, id, likes) }
              >
                thumb_up
              </i>
              { likes }
            </div>
          </li>
        </React.Fragment>
      )
    }
  </Mutation>
));


/* ========================= COMPONENT DEFINITION ========================== */

const LyricList = ({ lyrics }) => (
  <ul className="collection">
    { renderLyrics(lyrics) }
  </ul>
);

LyricList.propTypes = {
  lyrics: PropTypes.array
};


/* ================================ EXPORTS ================================ */

export default LyricList;
