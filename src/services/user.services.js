import service from "./config.services";

const findOneUserService = (userId) => {
  return service.get(`/profile/${userId}`);
};

const editUserService = (userId) => {
  return service.patch(`/profile/${userId}/edit`);
};

const blockUserAccount = () => {
  return service.patch(`/close-account`);
};
const userFavouriteGames = () => {
  return service.get("/profile/favourites");
};

const favouriteGameService = (gameId) => {
  return service.patch(`/profile/favourites/${gameId}`);
};

export {
  editUserService,
  findOneUserService,
  blockUserAccount,
  favouriteGameService,
  userFavouriteGames,
};
