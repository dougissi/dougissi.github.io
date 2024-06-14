import { Stack } from '@mui/material';
import BlogCard from './BlogCard';


export default function Blog({ posts }) {
  return (
    <Stack 
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {posts.map(post => {
        return (
          <BlogCard
            key={`blog-card-${post.path}`}
            post={post}
          />
        );
      })}
    </Stack>
  );
}
