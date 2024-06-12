import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// import rehypeRaw from "rehype-raw";

const MARKDOWN_FOLDER = '/markdown';

function Markdown({ fileName }) {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        async function fetchMarkdownContent() {
            try {
                const response = await fetch(`${MARKDOWN_FOLDER}/${fileName}`);
                const markdown = await response.text();
                setMarkdownContent(markdown);
            } catch (error) {
                console.error('Error fetching Markdown content:', error);
            }
        }

        fetchMarkdownContent();
    }, [fileName]);

    return (
        <div className="Markdown">
            <ReactMarkdown
                // rehypePlugins={[rehypeRaw]}
                // remarkPlugins={[remarkIframe]}
                components={{
                    a(props) {
                        const {node, href, children, ...rest} = props;
                        if (href.startsWith('http')) {  // open external pages in new tab
                            rest.target = "_blank";
                            rest.rel = "noopener noreferrer";
                        }
                        return (
                            <Link
                                component={RouterLink}  // use react-router-dom link for faster internal routing
                                to={href}
                                {...rest}
                            >
                                {children}
                            </Link>
                        );
                    },
                    img(props) {
                        const {node, children, alt, src, ...rest} = props;
                        if (src === '/wow') {
                            return <iframe width="560" height="315" src="https://www.youtube.com/embed/04x4ZdLpN-0?si=K17zvUcbZ_YoqZPG&amp;start=83" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;
                        }
                        return <img className="markdown-img" alt={alt} src={src} {...rest}>{children}</img>;
                    },
                    iframe(props) {
                        return <div>hey DOUG!</div>;
                    }
                }}
            >
                {markdownContent}
            </ReactMarkdown>
        </div>
    );
}

export default Markdown;
