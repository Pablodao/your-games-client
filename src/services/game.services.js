import service from "./config.services";

const newGameValorationService = (gameId, newValoration) => {
  return service.post(`/games/${gameId}`, newValoration);
};

const userGameValorationService = (gameId) => {
  return service.get(`/games/${gameId}`);
};

const allGameValorationService = (gameId) => {
  return service.get(`/games/${gameId}/valorations`);
};

const editGameValorationService = (gameId, editedValoration) => {
  return service.patch(`/games/${gameId}`, editedValoration);
};

export {
  newGameValorationService,
  userGameValorationService,
  allGameValorationService,
  editGameValorationService,
};
