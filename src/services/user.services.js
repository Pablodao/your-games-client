import service from "./config.services";

const findUserService = () => {
  return service.get(`/profile/my-profile`);
};
export { findUserService };
