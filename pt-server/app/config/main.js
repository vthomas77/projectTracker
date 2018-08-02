module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'mysecretpassphrase',
  // Database connection information
  //'database': 'mongodb://PTDBAdmin:PTDBApwd123@localhost:27017/ProjectTrackerDB',
  'database': 'mongodb://localhost:27017/ProjectTrackerDB',
  // Setting port for server
  'port': 3000,
  // Expiration for token in seconds
  'tokenDuration': 36000
}
