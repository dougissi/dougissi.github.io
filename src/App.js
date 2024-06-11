import './App.css';
import { Route, Routes } from "react-router-dom";
import Markdown from './components/Markdown';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

let posts = [
  {
    id: 3,
    title: 'Counting Polygons in Node Graphs',
    fileName: '2020-02-10-counting-polygons-in-node-graphs.md'
  },
  {
    id: 2,
    title: 'Counting Triangles in Node Graphs',
    fileName: '2020-02-06-counting-triangles-in-node-graphs.md'
  },
  {
    id: 1,
    title: 'Export Apple Contacts to CSV',
    fileName: '2019-12-07-export-apple-contacts-to-csv.md'
  }
];

// add date and path attributes to each post object based on fileName
posts = posts.map((post) => {
  const date = post.fileName.slice(0, 10);
  const path = post.fileName.slice(11, post.fileName.length - 3);
  return {...post, date: date, path: path};
});

const Blog = () => {
  return (
    <Stack spacing={2}>
      {posts.map(post => {
        return (
          <Link
            key={`link-${post.path}`}
            component={RouterLink}
            to={post.path}
          >
            {`${post.title} — ${post.date}`}
          </Link>
        );
      })}
    </Stack>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Blog />} />
        {posts.map(post => (
          <Route
            key={`route-${post.path}`}
            path={post.path}
            element={<Markdown fileName={`posts/${post.fileName}`} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
