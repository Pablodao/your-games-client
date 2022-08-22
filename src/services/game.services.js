import service from "./config.services";

const gameDetailsService = (id) => {
  return service.get(`/games/${id}`);
};
export { gameDetailsService };
