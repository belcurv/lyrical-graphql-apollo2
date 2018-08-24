const whitelist = [
  /^http:\/\/localhost(:[0-9]{0,4})?\/?$/,
];

module.exports = {
  origin: whitelist,
  methods: ['GET', 'PUT', 'POST'],
  optionsSuccessStatus: 200
};
