require('colors')

module.exports = function() {
  return function(err, req, res, next) {
    console.log(err.red);
    res.status(500).send(err);
  };
}
