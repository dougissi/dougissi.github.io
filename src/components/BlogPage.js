import Typography from '@mui/material/Typography';
import Markdown from './Markdown';

export default function BlogPage({ post }) {
  return (
    <div className="BlogPage" style={{ paddingTop: '10px' }}>
      <Typography
        variant="h4"
        component="div"
        style={{  // TODO: commonize with .Markdown class and BlogCard
          margin: 'auto',
          maxWidth: '1000px',
          paddingRight: '5%',
          paddingLeft: '5%'
        }}
      >
        {post.title}
      </Typography>
      <Typography gutterBottom variant="h5" component="div" color="text.secondary">
        {post.date}
      </Typography>
      {post.tags}
      <Markdown fileName={`posts/${post.mdFileName}`} />
    </div>
  );
}
