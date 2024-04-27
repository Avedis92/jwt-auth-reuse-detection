import { IPost } from "../../../shared/types";
import styles from "./style.module.css";

const Post = ({ username, post }: IPost) => {
  const { container } = styles;
  return (
    <div className={container}>
      <p>
        {username}: {post}
      </p>
    </div>
  );
};

export default Post;
