import Blog from "./Blog";
import Markdown from "./Markdown";

export default function HomePage({ posts }) {
    return (
        <div className="Home">
            <Markdown fileName="bio.md" />
            <h1>Posts</h1>
            <Blog posts={posts} />
        </div>
    );
}