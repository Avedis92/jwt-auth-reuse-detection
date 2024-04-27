import { IPost } from "../../../shared/types";

const Post = ({ username, post }: IPost) => {
  return (
    <div>
      <h1>
        {username}: {post}
      </h1>
    </div>
  );
};

export default Post;
