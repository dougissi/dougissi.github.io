import { useState } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import Blog from "./Blog";
import Markdown from "./Markdown";

export default function HomePage({ posts, options, categories, technologies, languages }) {
    const [postsToShow, setPostsToShow] = useState(posts);

    const handleFilterChange = (event, option) => {
        if (option) {
            if (option.type === 'Category') {
                setPostsToShow(categories[option.value]);
            } else if (option.type === 'Technology/Framework') {
                setPostsToShow(technologies[option.value]);
            } else if (option.type === 'Language') {
                setPostsToShow(languages[option.value]);
            }
        } else {  // clear
            setPostsToShow(posts);  // original
        }
    }

    return (
        <div className="Home">
            <Markdown fileName="bio.md" />
            <h1>Posts</h1>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}
                sx={{ paddingBottom: '10px' }}
            >
                <Autocomplete
                    id="filter-posts-by-category"
                    onChange={handleFilterChange}
                    options={options}
                    groupBy={option => option.type}
                    getOptionLabel={option => option.value}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Filter Posts" />}
                />
            </Stack>
            <Blog posts={postsToShow} />
        </div>
    );
}