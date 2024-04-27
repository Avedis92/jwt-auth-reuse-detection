import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, getNewTokens } from "../../../shared/fetch";
import { IPost } from "../../../shared/types";
import Post from "../../molecules/post";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGettingPosts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const result = await getPosts(accessToken!);
    if (result.error) {
      if (result.type === "invalid") {
        setError(`${result.type}: ${result.error}`);
        setTimeout(() => navigate("/signIn"), 5000);
      } else if (result.type === "expired") {
        const result = await getNewTokens();
        localStorage.setItem("accessToken", result.accessToken);
        const postResult = await getPosts(result.accessToken);
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
      <h1>Show users posts</h1>
      {error && <h1>{error}</h1>}
      <button onClick={handleGettingPosts}>Get posts</button>
      {posts.length > 0 &&
        posts.map((p, index) => (
          <Post key={index} username={p.username} post={p.post} />
        ))}
    </div>
  );
};
export default Posts;
