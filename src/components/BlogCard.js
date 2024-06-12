import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogCard({ linkTo, title, date, summary }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        component={Link}
        to={linkTo}
      >
        <CardMedia
          component="img"
          height="140"
          image="/images/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h6" component="div" color="text.secondary">
            {date}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
