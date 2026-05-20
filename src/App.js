import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import TripPage from './components/TripPage';
import { Chip, Stack } from '@mui/material';
import postsData from './posts.json';

// Post data lives in src/posts.json (shared with the build-time OG share-card
// generator in scripts/generate-og-routes.js).
let posts = postsData;


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
        {post.technologies.map(tech => (
          <Chip key={`chip-tech-${tech}-post${post.id}`} label={tech} color="secondary" variant="outlined" />
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
const technologies = {};
const languages = {};
posts.forEach(post => {
  const addToObj = (obj, key) => {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = [];
    }
    obj[key].push(post);
  };
  post.categories.forEach(cat => addToObj(categories, cat));
  post.technologies.forEach(tech => addToObj(technologies, tech));
  post.languages.forEach(lang => addToObj(languages, lang));
});

// combine categories and languages into single options list
const options = [];
Object.keys(categories).sort().forEach(cat => options.push({type: 'Category', value: cat}));
Object.keys(technologies).sort().forEach(tech => options.push({type: 'Technology/Framework', value: tech}));
Object.keys(languages).sort().forEach(lang => options.push({type: 'Language', value: lang}));

function App() {
  const hideNav = useLocation().pathname.startsWith('/trips');
  return (
    <div className="App">
      {!hideNav && <NavBar />}
      <Routes>
        <Route path='/' element={<HomePage posts={posts} options={options} categories={categories} technologies={technologies} languages={languages} />} />
        {posts.map(post => (
          <Route
            key={`route-${post.path}`}
            path={post.path}
            element={<BlogPage post={post} />}
          />
        ))}
        <Route
          path="trips/zambia"
          element={
            <TripPage
              title="Zambia Mission Trip — June 5-15, 2026"
              mdFileName="trips/zambia.md"
              qrBasePath="/assets/zambia/qr"
            />
          }
        />
      </Routes>
      <div style={{ margin: "10px" }}>{`© ${dayjs().year()} Douglas Issichopoulos`}</div>
    </div>
  );
}

export default App;
