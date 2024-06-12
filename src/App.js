import './App.css';
import { Route, Routes } from "react-router-dom";
import Markdown from './components/Markdown';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

let posts = [
  {
    id: 13,
    title: 'WordleReplay.com Overhaul with React and Material UI',
    fileName: '2024-06-10-wordlereplay-react.md'
  },
  {
    id: 12,
    title: 'HaleyIssi.com: React App on GitHub Pages with Google Sheets Database',
    fileName: '2024-04-18-haleyissi.md'
  },
  {
    id: 11,
    title: 'Hybrid Tensor Sharing Between Serverless Functions',
    fileName: '2023-12-13-hybrid-tensor-sharing.md'
  },
  {
    id: 10,
    title: 'Stateful Graph Algorithms in Haskell',
    fileName: '2023-08-01-stateful-graph-algorithms-haskell.md'
  },
  {
    id: 9,
    title: 'Parking Spot Detection Prototype with 3 Cameras',
    fileName: '2023-05-07-parking-spot-detection.md'
  },
  {
    id: 8,
    title: 'Self-Driving Vehicle using a Raspberry Pi',
    fileName: '2023-02-05-picar-full-self-driving.md'
  },
  {
    id: 7,
    title: 'Square Root Implementation',
    fileName: '2022-11-26-square-root.md'
  },
  {
    id: 6,
    title: 'Is It Bad to Move to a Higher Tax Bracket?',
    fileName: '2022-11-13-tax-brackets.md'
  },
  {
    id: 5,
    title: 'Wordle Replay',
    fileName: '2022-01-31-wordle-replay.md'
  },
  {
    id: 4,
    title: "Flipping Cards 'Til You Can't",
    fileName: '2021-12-04-x-y-card-flipping.md'
  },
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
