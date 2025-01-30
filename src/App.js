import './App.css';
import { Route, Routes } from "react-router-dom";
import dayjs from 'dayjs';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import { Chip, Stack } from '@mui/material';

let posts = [
  {
    id: 15,
    title: 'Memorize With Me: AI Memorization Partner (Proof-of-Concept)',
    summary: 'Using a FastAPI (Python) backend server to query OpenAI endpoints and a React (Javascript) frontend, this proof-of-concept AI memorization partner application demonstrates its ability to help with Bible memorization',
    mdFileName: '2024-11-15-memorize-with-me.md',
    imgFileName: '/assets/images/memorize_with_me_screenshot.png',
    categories: ['Web Development'],
    languages: ['React', 'FastAPI', 'JavaScript', 'Python']
  },
  {
    id: 13,
    title: 'WordleReplay.com Overhaul with React and Material UI',
    summary: 'Complete rewrite of WordleReplay.com web app using React and Material UI, greatly improving the user experience compared to the original from 2022 that used only JQuery and Bootstrap',
    mdFileName: '2024-06-10-wordlereplay-react.md',
    imgFileName: '/assets/wordlereplay/wordlereplay_react_mui.png',
    categories: ['Web Development'],
    languages: ['React', 'JavaScript']
  },
  {
    id: 12,
    title: 'HaleyIssi.com: React App on GitHub Pages with Google Sheets Database',
    summary: 'My wife Haley has been growing some of her Instagram accounts around some her hobbies like latte art and cooking, so we desired to create a simple website where we could post referral links for products on Amazon',
    mdFileName: '2024-04-18-haleyissi.md',
    // imgFileName: '/assets/images/haleyissi-logo.png',
    imgFileName: 'https://haleyissi.com/static/media/haleyissi-coffee-portrait-440kb.cd3af01ed82140f2b5df.jpg',
    categories: ['Web Development'],
    languages: ['React', 'JavaScript']
  },
  {
    id: 11,
    title: 'Hybrid Tensor Sharing Between Serverless Functions',
    summary: "Capstone research paper at the end of my CS master's program where we discovered a faster way to share Deep Neural Network tensors between AWS Lambda functions",
    mdFileName: '2023-12-13-hybrid-tensor-sharing.md',
    imgFileName: '/assets/images/tensor_sharing_rest_vs_s3.png',
    categories: ['Machine Learning'],
    languages: ['Python']
  },
  {
    id: 10,
    title: 'Stateful Graph Algorithms in Haskell',
    summary: 'Seeing as Haskell is a functional programming language, managing state requires great care, so I explored this concept by implementing several graph algorithms',
    mdFileName: '2023-08-01-stateful-graph-algorithms-haskell.md',
    imgFileName: '/assets/graph_algos_haskell/haskell_graph_logo.png',
    categories: ['Graphs', 'Algorithms'],
    languages: ['Haskell']
  },
  {
    id: 9,
    title: 'Parking Spot Detection Prototype with 3 Cameras',
    summary: "When approaching a large, busy parking lot, wouldn't it be nice to be able to navigate directly to an open parking spot? Well, I made a prototype demonstrating that it's possible.",
    mdFileName: '2023-05-07-parking-spot-detection.md',
    imgFileName: '/assets/images/parking_spot_detection_prototype.jpg',
    categories: ['Computer Vision', 'Internet of Things'],
    languages: ['Python']
  },
  {
    id: 8,
    title: 'Self-Driving Vehicle using a Raspberry Pi',
    summary: 'With this small programmable car equipped with an ultrasonic sensor and a camera, and I was able to implement simple yet powerful self-driving capabilities',
    mdFileName: '2023-02-05-picar-full-self-driving.md',
    imgFileName: '/assets/images/picar.png',
    categories: ['Internet of Things'],
    languages: ['Python']
  },
  {
    id: 7,
    title: 'Square Root Implementation',
    summary: "During the final stage of a three-part technical interview for Senior Software Engineer position at a publicly traded software company in Silicon Valley, this question got me, which was humiliating given my BS in Mathematics from Stanford. Don't neglect learning CS, kids.",
    mdFileName: '2022-11-26-square-root.md',
    imgFileName: '/assets/square_root/sqr_root_logo.png',
    categories: ['Math', 'Algorithms'],
    languages: ['Python']
  },
  {
    id: 6,
    title: 'Is It Bad to Move to a Higher Tax Bracket?',
    summary: "Spoiler: it's not bad to move to a higher tax bracket. Even though I had been doing my taxes by hand since 2018, it wasn't until I performed this analysis that I finally understood why.",
    mdFileName: '2022-11-13-tax-brackets.md',
    imgFileName: '/assets/tax_brackets/next-tax-bracket_2400x1258.jpg',
    categories: ['Finance', 'Visualization'],
    languages: ['Python']
  },
  {
    id: 5,
    title: 'Wordle Replay (Original Version)',
    summary: "By early 2022, Wordle had taken the world by storm, so as my first genuine attempt at web development, I built WordleReplay.com to both help solve puzzles and allow users to replay old ones.",
    mdFileName: '2022-01-31-wordlereplay-original.md',
    imgFileName: '/assets/wordlereplay/wordle_replay_share_icon_cropped.png',
    categories: ['Web Development'],
    languages: ['JQuery', 'JavaScript']

  },
  {
    id: 4,
    title: "Flipping Cards 'Til You Can't",
    summary: "Interactive simulation of a card-flipping game from a viral movie clip — a game that, mathematically, must end",
    mdFileName: '2021-12-04-x-y-card-flipping.md',
    imgFileName: '/assets/x_plus_y_demo/assets/flipping_cards_icon.png',
    categories: ['Web Development', 'Algorithms', 'Math'],
    languages: ['JavaScript', 'JQuery']
  },
  {
    id: 3,
    title: 'Counting Polygons in Node Graphs',
    summary: "After learning how to count triangles in node graphs (see previous post), I developed new algorithms to count quadrilaterals and pentagons in node graphs.",
    mdFileName: '2020-02-10-counting-polygons-in-node-graphs.md',
    imgFileName: 'https://www.dougissi.com/counting-polygons/assets/counting_polygons_icon.jpg',
    categories: ['Graphs', 'Algorithms'],
    languages: ['Python']
  },
  {
    id: 2,
    title: 'Counting Triangles in Node Graphs',
    summary: "At work I came across an elegant method to count the number of triangles in a node graph, so I set out to understand why it works.",
    mdFileName: '2020-02-06-counting-triangles-in-node-graphs.md',
    imgFileName: 'https://www.dougissi.com/counting-triangles/assets/counting_triangles_icon.jpg',
    categories: ['Graphs', 'Algorithms'],
    languages: ['Python']
  },
  {
    id: 1,
    title: 'Export Apple Contacts to CSV',
    summary: "Wouldn't it be really great if you could get all the emails, phone numbers, and addresses, of the people your Apple Contacts into a spreadsheet?",
    mdFileName: '2019-12-07-export-apple-contacts-to-csv.md',
    imgFileName: '/assets/images/apple_contacts_football.jpg',
    categories: ['Tools'],
    languages: ['AppleScript']
  }
];

// add date and path attributes to each post object based on mdFileName
posts = posts.map((post) => {
  const date = post.mdFileName.slice(0, 10);
  const path = post.mdFileName.slice(11, post.mdFileName.length - 3);
  return {
    ...post,
    date: dayjs(date).format('MMMM D, YYYY'),
    path: path,
    tags: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        useFlexGap
        flexWrap="wrap"
      >
        {post.categories.map(cat => (
          <Chip key={`chip-cat-${cat}-post${post.id}`} label={cat} color="primary" variant="outlined" />
        ))}
        {post.languages.map(lang => (
          <Chip key={`chip-lang-${lang}-post${post.id}`} label={lang} color="success" variant="outlined" />
        ))}
      </Stack>
    )
  };
});

// get unique categories and languages
const categories = {};
const languages = {};
posts.forEach(post => {
  const addToObj = (obj, key) => {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = [];
    }
    obj[key].push(post);
  };
  post.categories.forEach(cat => addToObj(categories, cat));
  post.languages.forEach(lang => addToObj(languages, lang));
});

// combine categories and languages into single options list
const options = [];
Object.keys(categories).sort().forEach(cat => options.push({type: 'Category', value: cat}));
Object.keys(languages).sort().forEach(lang => options.push({type: 'Language', value: lang}));

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage posts={posts} options={options} categories={categories} languages={languages} />} />
        {posts.map(post => (
          <Route
            key={`route-${post.path}`}
            path={post.path}
            element={<BlogPage post={post} />}
          />
        ))}
      </Routes>
      <div style={{ margin: "10px" }}>{`© ${dayjs().year()} Douglas Issichopoulos`}</div>
    </div>
  );
}

export default App;
