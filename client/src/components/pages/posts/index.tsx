import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPosts, getNewTokens } from "../../../shared/fetch";
import { IPost } from "../../../shared/types";
import Post from "../../molecules/post";
import Field from "../../organisms/field";
import styles from "./style.module.css";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [postText, setPostText] = useState("");
  const [inputError, setInputError] = useState("");
  const { createPostContainer, postsContainer, errorMessage } = styles;
  const navigate = useNavigate();

  const handlePostTyping = (text: string) => {
    setPostText(text);
  };

  const handleSignOut = () => {
    navigate("/signOut");
  };

  const handleGettingPosts = async () => {
    if (!postText) {
      setInputError("Type a Post!");
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    const result = await postPosts(accessToken!, postText);
    if (result.error) {
      if (result.type === "invalid") {
        setError(`${result.type}: ${result.error}`);
        setTimeout(() => navigate("/signIn"), 5000);
      } else if (result.type === "expired") {
        const result = await getNewTokens();
        localStorage.setItem("accessToken", result.accessToken);
        const postResult = await postPosts(result.accessToken, postText);
        setPosts([...postResult.posts!]);
        setError("");
      }
    } else if (result.posts) {
      setPosts([...result.posts]);
      setError("");
    }
  };

  return (
    <div>
      <div className={createPostContainer}>
        <Field
          labelName="Create a post"
          type="text"
          placeholder="Type a post"
          onChange={handlePostTyping}
          value={postText}
          error={inputError}
        />
        <button onClick={handleGettingPosts}>Create a post</button>
        <button onClick={handleSignOut}>Sign out</button>
        {error && <p className={errorMessage}>{error}</p>}
      </div>
      <div className={posts.length > 0 ? postsContainer : undefined}>
        {posts.length > 0 &&
          posts.map((p, index) => (
            <Post key={index} username={p.username} post={p.post} />
          ))}
      </div>
    </div>
  );
};
export default Posts;
