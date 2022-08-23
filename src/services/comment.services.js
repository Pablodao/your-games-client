import service from "./config.services";

const newCommentService = (newComment, gameId) => {
  console.log(gameId)
  return service.post(`/comments/${gameId}`, newComment);


};

const findCommentService = (id) => {
  return service.get(`/comments/${id}`);
};

const deleteCommentService = (id) => {
  return service.delete(`/comments/${id}`);
};

const editCommentService = (editedComment, id) => {
  return service.patch(`/comments/${id}`, editedComment);
};

const likeCommentService = () => {

}
// const dislikeCommentService

export {
  newCommentService,
  findCommentService,
  deleteCommentService,
  editCommentService,
};


