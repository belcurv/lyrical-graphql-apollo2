const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = mongoose.Schema({
  title: { type: String },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'Lyric'
  }]
}, {
  usePushEach: true
});

SongSchema.statics.addLyric = function addLyric(id, content) {
  const Lyric = mongoose.model('Lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song });
      song.lyrics.push(lyric);
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
};

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
};

module.exports = mongoose.model('Song', SongSchema);
