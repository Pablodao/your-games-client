import service from "./config.services";

const newCommentService = (newComment, gameId) => {
  return service.post(`/comments/${gameId}`, newComment);
};

const findCommentService = (id) => {
  return service.get(`/comments/${id}`);
};

const findUserCommentsService = (id) => {
  return service.get(`/comments/user/${id}`);
};

const deleteCommentService = (id) => {
  return service.delete(`/comments/${id}`);
};

const editCommentService = (editedComment, id) => {
  return service.patch(`/comments/${id}`, editedComment);
};

const likeCommentService = (id) => {
  return service.patch(`/comments/${id}/like`);
};
const dislikeCommentService = (id) => {
  return service.patch(`/comments/${id}/dislike`);
};

export {
  newCommentService,
  findCommentService,
  deleteCommentService,
  editCommentService,
  likeCommentService,
  dislikeCommentService,
  findUserCommentsService
};
