import service from "./config.services";

const newCommentService = (newComment, gameId) => {
  return service.post(`/comments/${gameId}`, newComment);
};

const findCommentService = (id) => {
  return service.get(`/comments/${id}`);
};

const deleteCommentService = (id) => {
  return service.delete(`/comments/${id}`);
};

export { newCommentService, findCommentService , deleteCommentService};
