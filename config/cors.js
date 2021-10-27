const cors = require('cors');
const whiteList = ['http://localhost:5000'];

module.exports = cors({
  credentials: true,
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(ApiError.unauthorized());
    }
  },
});
