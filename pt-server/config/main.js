module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'mysecretpassphrase',
  // Database connection information
  'database': 'mongodb://localhost:27017/myapp',
  // Setting port for server
  'port': 3000,
  // Expiration for token in seconds
  'tokenDuration': 3600
}
