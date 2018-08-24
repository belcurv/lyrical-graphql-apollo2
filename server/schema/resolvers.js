const Lyric = require('../models/lyric');
const Song  = require('../models/song');

module.exports = {

  Lyric: {

    song(parentValue) {
      return Lyric.findById(parentValue._id).populate('song')
        .then(lyric => lyric.song);
    }

  },

  Song: {

    lyrics(parentValue) {
      return Song.findLyrics(parentValue._id);
    }

  },

  Query: {

    // get one song by the song's ID
    song(parentValue, { id }) {
      return Song.findById(id);
    },

    // get all songs
    songs() {
      return Song.find();
    },
    
    // get one lyric by the lyric's ID
    lyric(parentValue, { id }) {
      return Lyric.findById(id);
    }
    
  },

  Mutation: {

    addSong(parentValue, { title }) {
      return Song.create({ title });
    },

    addLyricToSong(parentValue, { content, songId }) {
      return Song.addLyric(songId, content);
    },

    likeLyric(parentValue, { id }) {
      return Lyric.like(id);
    },

    deleteSong(parentValue, { id }) {
      return Song.remove({ _id: id });
    }

  }

};
