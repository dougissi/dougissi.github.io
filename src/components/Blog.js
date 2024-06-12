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
            linkTo={post.path}
            title={post.title}
            date={post.date}
            summary="Placeholder summary information about this blog post. Isn't it great!"
          />
        );
      })}
    </Stack>
  );
}
