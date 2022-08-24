import service from "./config.services";

const findUserService = () => {
  return service.get(`/profile/my-profile`);
};

const editUserService = (userId) => {
  return service.patch(`/profile/${userId}/edit`);
};

const findOneUserService = (userId) => {
  return service.get(`/profile/${userId}`);
};

const blockUserAccount = (userId) => {
  return service.patch(`/close-account`);
};

const favouriteGameService = (gameId) => {
  return service.patch(`/favourites/${gameId}`);
};

export {
  findUserService,
  editUserService,
  findOneUserService,
  blockUserAccount,
  favouriteGameService,
};
