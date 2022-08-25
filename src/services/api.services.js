import service from "./config.services";

const gameListService = (page) => {
  return service.get(`/apiCall/${page}`);
};

const gameDetailsService = (gameId) => {
  return service.get(`/apiCall/details/${gameId}`);
};
export { gameListService, gameDetailsService };
