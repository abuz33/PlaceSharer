const HttpError = require('../models/http-error');
const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { ObjectId } = mongoose.Types;

const addFriendRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid userId or friendId, please check your data.', 422));
  }
  const { userId, friendId } = req.body;
  let user;
  let friend;
  try {
    // Get the user
    user = await User.findOne({ _id: userId }, '-password')
      .populate({ path: 'friends', model: User })
      .populate({ path: 'sentRequests.user', model: User })
      .populate({ path: 'getRequest.user', model: User });
  } catch (error) {
    const err = new HttpError('smt went wrong , could not find a user', 500);
    return next(err);
  }
  if (!user) {
    const err = new HttpError('Could not find a user for given id', 404);
    return next(err);
  }

  try {
    // Find Friend
    friend = await User.findOne({ _id: friendId }, '-password');
    if (!friend) {
      const err = new HttpError('Could not find friend to sent request!', 404);
      return next(err);
    }
    // Check if the user is friend with the person
    if (user.friends && user.friends.some((friend) => ObjectId(friend.id).equals(friendId))) {
      const err = new HttpError('You are already friends with ' + friend.name, 402);
      return next(err);
    }
    // Check if there is an existing request
    if (
      user.sentRequests &&
      user.sentRequests.some((sentRequestItem) =>
        ObjectId(sentRequestItem.user.id).equals(friendId),
      )
    ) {
      const err = new HttpError('You already send a request to ' + friend.name, 402);
      return next(err);
    }
  } catch (error) {}
  try {
    const sentRequest = {
      user: ObjectId(friendId),
      date: Date(),
    };
    const getRequest = {
      user: ObjectId(userId),
      date: sentRequest.date,
    };
    // Update user data
    user.sentRequests.push(sentRequest);

    // Update friend data
    friend.getRequests.push(getRequest);

    // Transaction to save both friend and user information
    const session = await mongoose.startSession();
    session.startTransaction();
    await user.save({ session });
    await friend.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError('Something went wrong, could not send request.', 500);
    return next(error);
  }
  // TODO NOTIFICATION

  res.status(200).json({ message: 'Friend req created!' });
};
exports.addFriendRequest = addFriendRequest;
