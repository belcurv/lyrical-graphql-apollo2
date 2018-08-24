const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const LyricSchema = mongoose.Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = function(id) {
  return this.findById(id)
    .then(lyric => {
      ++lyric.likes;
      return lyric.save();
    });
};

module.exports = mongoose.model('Lyric', LyricSchema);
