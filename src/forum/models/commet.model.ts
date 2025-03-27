export interface CommentModel {
  id?: string;
  content: string;
  postId: string;
  userId: string;
  parentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
