import service from "./config.services";

const newGameService = (id) => {
  return service.post(`/games/${id}`);
};

const gameDetailsService = (id) => {
  return service.get(`/games/${id}`);
};

export { newGameService, gameDetailsService };
