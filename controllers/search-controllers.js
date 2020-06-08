const HttpError = require("../models/http-error");
const User = require("../models/user");
const Place = require("../models/place");

const searchUsersPlaces = async (req, res, next) => {
  let users;
  let places;
  try {
    users = await User.find({ name: { $regex: req.query.q } }, "-password");
    places = await Place.find({
      title: { $regex: req.query.q },
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching users, places failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

exports.searchUsersPlaces = searchUsersPlaces;
