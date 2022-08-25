import service from "./config.services";

const findOneUserService = (userId) => {
  return service.get(`/profile/${userId}`);
};

const editUserService = (userId, editedUser) => {
  return service.patch(`/profile/${userId}/edit`, editedUser);
};

const blockUserAccount = () => {
  return service.patch(`/close-account`);
};
const userFavouriteGames = () => {
  return service.get("/profile/favourites");
};

const favouriteGameService = (gameId, editedFavourite) => {
  return service.patch(`/profile/favourites/${gameId}`, editedFavourite);
};

export {
  editUserService,
  findOneUserService,
  blockUserAccount,
  favouriteGameService,
  userFavouriteGames,
};
