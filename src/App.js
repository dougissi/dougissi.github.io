import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';

let posts = [
  {
    id: 13,
    title: 'WordleReplay.com Overhaul with React and Material UI',
    fileName: '2024-06-10-wordlereplay-react.md',
    categories: ['Web Development']
  },
  {
    id: 12,
    title: 'HaleyIssi.com: React App on GitHub Pages with Google Sheets Database',
    fileName: '2024-04-18-haleyissi.md',
    categories: ['Web Development']
  },
  {
    id: 11,
    title: 'Hybrid Tensor Sharing Between Serverless Functions',
    fileName: '2023-12-13-hybrid-tensor-sharing.md',
    categories: ['Machine Learning']
  },
  {
    id: 10,
    title: 'Stateful Graph Algorithms in Haskell',
    fileName: '2023-08-01-stateful-graph-algorithms-haskell.md',
    categories: ['Graph Algorithms']
  },
  {
    id: 9,
    title: 'Parking Spot Detection Prototype with 3 Cameras',
    fileName: '2023-05-07-parking-spot-detection.md',
    categories: ['Computer Vision', 'Internet of Things']
  },
  {
    id: 8,
    title: 'Self-Driving Vehicle using a Raspberry Pi',
    fileName: '2023-02-05-picar-full-self-driving.md',
    categories: ['Internet of Things']
  },
  {
    id: 7,
    title: 'Square Root Implementation',
    fileName: '2022-11-26-square-root.md',
    categories: ['Math', 'Algorithms']
  },
  {
    id: 6,
    title: 'Is It Bad to Move to a Higher Tax Bracket?',
    fileName: '2022-11-13-tax-brackets.md',
    categories: ['Finance', 'Visualization']
  },
  {
    id: 5,
    title: 'Wordle Replay',
    fileName: '2022-01-31-wordle-replay.md',
    categories: ['Web Development']
  },
  {
    id: 4,
    title: "Flipping Cards 'Til You Can't",
    fileName: '2021-12-04-x-y-card-flipping.md',
    categories: ['Web Development', 'Algorithms', 'Math']
  },
  {
    id: 3,
    title: 'Counting Polygons in Node Graphs',
    fileName: '2020-02-10-counting-polygons-in-node-graphs.md',
    categories: ['Graphs', 'Algorithms']
  },
  {
    id: 2,
    title: 'Counting Triangles in Node Graphs',
    fileName: '2020-02-06-counting-triangles-in-node-graphs.md',
    categories: ['Graphs', 'Algorithms']
  },
  {
    id: 1,
    title: 'Export Apple Contacts to CSV',
    fileName: '2019-12-07-export-apple-contacts-to-csv.md',
    categories: ['Tools']
  }
];

// add date and path attributes to each post object based on fileName
posts = posts.map((post) => {
  const date = post.fileName.slice(0, 10);
  const path = post.fileName.slice(11, post.fileName.length - 3);
  return {...post, date: date, path: path};
});

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage posts={posts} />} />
        {posts.map(post => (
          <Route
            key={`route-${post.path}`}
            path={post.path}
            element={<BlogPage post={post} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
