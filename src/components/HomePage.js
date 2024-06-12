import Blog from "./Blog";

export default function HomePage({ posts }) {
    return (
        <div className="Home">
            <h1>Home</h1>
            <Blog posts={posts} />
        </div>
    );
}