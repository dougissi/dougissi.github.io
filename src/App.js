import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';

let posts = [
  {
    id: 13,
    title: 'WordleReplay.com Overhaul with React and Material UI',
    summary: '',
    mdFileName: '2024-06-10-wordlereplay-react.md',
    imgFileName: '/assets/wordlereplay/wordlereplay_react_mui.png',
    categories: ['Web Development']
  },
  {
    id: 12,
    title: 'HaleyIssi.com: React App on GitHub Pages with Google Sheets Database',
    summary: '',
    mdFileName: '2024-04-18-haleyissi.md',
    // imgFileName: '/assets/images/haleyissi-logo.png',
    imgFileName: 'https://haleyissi.com/static/media/haleyissi-coffee-portrait-440kb.cd3af01ed82140f2b5df.jpg',
    categories: ['Web Development']
  },
  {
    id: 11,
    title: 'Hybrid Tensor Sharing Between Serverless Functions',
    summary: '',
    mdFileName: '2023-12-13-hybrid-tensor-sharing.md',
    imgFileName: '/assets/images/tensor_sharing_rest_vs_s3.png',
    categories: ['Machine Learning']
  },
  {
    id: 10,
    title: 'Stateful Graph Algorithms in Haskell',
    summary: '',
    mdFileName: '2023-08-01-stateful-graph-algorithms-haskell.md',
    imgFileName: '/assets/graph_algos_haskell/haskell_graph_logo.png',
    categories: ['Graph Algorithms']
  },
  {
    id: 9,
    title: 'Parking Spot Detection Prototype with 3 Cameras',
    mdFileName: '2023-05-07-parking-spot-detection.md',
    imgFileName: '/assets/images/parking_spot_detection_prototype.jpg',
    categories: ['Computer Vision', 'Internet of Things']
  },
  {
    id: 8,
    title: 'Self-Driving Vehicle using a Raspberry Pi',
    summary: '',
    mdFileName: '2023-02-05-picar-full-self-driving.md',
    imgFileName: '/assets/images/picar.png',
    categories: ['Internet of Things']
  },
  {
    id: 7,
    title: 'Square Root Implementation',
    summary: '',
    mdFileName: '2022-11-26-square-root.md',
    imgFileName: '/assets/square_root/sqr_root_logo.png',
    categories: ['Math', 'Algorithms']
  },
  {
    id: 6,
    title: 'Is It Bad to Move to a Higher Tax Bracket?',
    summary: '',
    mdFileName: '2022-11-13-tax-brackets.md',
    imgFileName: '/assets/tax_brackets/next-tax-bracket_2400x1258.jpg',
    categories: ['Finance', 'Visualization']
  },
  {
    id: 5,
    title: 'Wordle Replay',
    mdFileName: '2022-01-31-wordle-replay.md',
    imgFileName: '/assets/wordlereplay/wordle_replay_share_icon_1200x600.png',
    categories: ['Web Development']
  },
  {
    id: 4,
    title: "Flipping Cards 'Til You Can't",
    summary: '',
    mdFileName: '2021-12-04-x-y-card-flipping.md',
    imgFileName: '/assets/x_plus_y_demo/assets/flipping_cards_icon.png',
    categories: ['Web Development', 'Algorithms', 'Math']
  },
  {
    id: 3,
    title: 'Counting Polygons in Node Graphs',
    summary: '',
    mdFileName: '2020-02-10-counting-polygons-in-node-graphs.md',
    imgFileName: 'https://www.dougissi.com/counting-polygons/assets/counting_polygons_icon.jpg',
    categories: ['Graphs', 'Algorithms']
  },
  {
    id: 2,
    title: 'Counting Triangles in Node Graphs',
    summary: '',
    mdFileName: '2020-02-06-counting-triangles-in-node-graphs.md',
    imgFileName: 'https://www.dougissi.com/counting-triangles/assets/counting_triangles_icon.jpg',
    categories: ['Graphs', 'Algorithms']
  },
  {
    id: 1,
    title: 'Export Apple Contacts to CSV',
    summary: '',
    mdFileName: '2019-12-07-export-apple-contacts-to-csv.md',
    imgFileName: '/assets/images/apple_contacts_football.jpg',
    categories: ['Tools']
  }
];

// add date and path attributes to each post object based on mdFileName
posts = posts.map((post) => {
  const date = post.mdFileName.slice(0, 10);
  const path = post.mdFileName.slice(11, post.mdFileName.length - 3);
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
