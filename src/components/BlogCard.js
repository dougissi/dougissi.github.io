import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <Card sx={{ width: '90%', maxWidth: '1000px' }} elevation={5}>
      <CardActionArea
        component={Link}
        to={post.path}
      >
        <CardContent>

          <Typography variant="h5" component="div">
            {post.title}
          </Typography>

          <Typography gutterBottom variant="h6" component="div" color="text.secondary">
            {post.date}
          </Typography>

          {post.tags}

          <Typography color="text.secondary" sx={{ pt: 1, m: 'auto' }}>
            {post.summary}
          </Typography>

        </CardContent>
        <CardMedia
          component="img"
          sx={{  // TODO: commonize with .markdown-img CSS class
            width: 'auto',
            height: 'auto',
            maxWidth: .9,
            maxHeight: '50vh',
            margin: 'auto',
            paddingBottom: '10px'
          }}
          image={post.imgFileName || "/assets/images/contemplative-reptile.jpg"}
          alt={post.imgFileName || "/assets/images/contemplative-reptile.jpg"}  // TODO: make better
        />
      </CardActionArea>
    </Card>
  );
}
