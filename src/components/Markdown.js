import { Link } from '@mui/material';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';  // also consider hljs instead of prism
import { convertToId } from '../utils';


const MARKDOWN_FOLDER = '/markdown';

const YouTubeIFrame = ({ src }) => {
    return (
        <iframe
            className="markdown-iframe"
            width="560"
            height="315"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    );
}

const BottomIFrame = ({ src, title }) => {
    return (
        <iframe
            className="markdown-iframe"
            style={{ width: '100%', height: '100vh', border: '1px black solid', overflow: 'hidden' }}
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    );
}

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
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    a(props) {
                        const {node, href, children, ...rest} = props;
                        if (href.startsWith('http') || href.startsWith('/assets')) {  // open external pages in new tab
                            rest.target = "_blank";
                            rest.rel = "noopener noreferrer";
                        }
                        return <Link href={href} {...rest}>{children}</Link>;
                    },
                    img(props) {
                        const {node, children, alt, src, ...rest} = props;

                        // hack to include embeddings via Markdown image syntax
                        // format: `![alt title](embedding/<embeddingId>)`
                        if (src.startsWith('embedding')) {
                            const embeddingId = src.split('/')[1];
                            if (embeddingId === 'x+y-youtube-iframe') {
                                return <YouTubeIFrame src="https://www.youtube.com/embed/04x4ZdLpN-0?start=83" />;
                            } else if (embeddingId === 'tax-brackets-instagram-npr-post') {
                                return (
                                    <iframe
                                        id="NPR-IG-tax-bracket-post-embedding"
                                        className="markdown-iframe"
                                        style={{ width: "400px", height: "600px" }}
                                        src="https://www.instagram.com/reel/ChAgBYlJX13/embed/captioned"
                                        title="NPR Tax Bracket Post Embedding"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                );
                            } else if (embeddingId === 'haleyissi.com') {
                                return <BottomIFrame src="https://haleyissi.com" title={alt} />;
                            } else if (embeddingId === 'hybrid-tensor-sharing-paper') {
                                return <BottomIFrame src="/assets/hybrid-tensor-sharing/hts_preprint.pdf" title={alt} />;
                            } else if (embeddingId === 'parking-spot-detection') {
                                return <YouTubeIFrame src="https://www.youtube.com/embed/f4gAlq0qjvo" />;
                            } else if (embeddingId === 'picar-roomba') {
                                return <YouTubeIFrame src="https://www.youtube.com/embed/_FRNL_yRdVg" />;
                            } else if (embeddingId === 'picar-full-self-driving') {
                                return <YouTubeIFrame src="https://www.youtube.com/embed/4dY-V5tbMBI" />;
                            } else if (embeddingId === 'nth-root-notebook') {
                                return <BottomIFrame src="/assets/square_root/Nth_Root.html" title={alt} />;
                            } else if (embeddingId === 'tax-bracket-notebook') {
                                return <BottomIFrame src="/assets/tax_brackets/Tax_Owed_Across_Tax_Brackets.html" title={alt} />;
                            } else if (embeddingId === 'original-wordle-replay') {
                                return <BottomIFrame src="https://dougissi.com/wordle-replay" title={alt} />;
                            } else if (embeddingId === 'x+y-card-flipping-demo') {
                                return <BottomIFrame src="/assets/x_plus_y_demo/index.html" title={alt} />;
                            } else if (embeddingId === 'counting-polygons-notebook') {
                                return <BottomIFrame src="https://www.dougissi.com/counting-polygons/jupyter-notebook.html" title={alt} />;
                            } else if (embeddingId === 'counting-triangles-notebook') {
                                return <BottomIFrame src="https://www.dougissi.com/counting-triangles/jupyter-notebook.html" title={alt} />;
                            } else if (embeddingId === 'memorize-with-me-youtube') {
                                return <YouTubeIFrame src="https://www.youtube.com/embed/XkOAkyWKdr4" title={alt} />;
                            }
                        }

                        // otherwise regular image
                        return <img className="markdown-img" alt={alt} src={src} {...rest}>{children}</img>;
                    },
                    code(props) {
                        const {children, className, node, ...rest} = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={style}
                            />
                        ) : (
                            <code {...rest} className="code-inline">
                                {children}
                            </code>
                        );
                    },
                    h1(props) {
                        const {children, node, ...rest} = props;
                        return <h1 id={convertToId(children)} {...rest}>{children}</h1>
                    },
                    h2(props) {
                        const {children, node, ...rest} = props;
                        return <h2 id={convertToId(children)} {...rest}>{children}</h2>
                    },
                    h3(props) {
                        const {children, node, ...rest} = props;
                        return <h3 id={convertToId(children)} {...rest}>{children}</h3>
                    },
                    h4(props) {
                        const {children, node, ...rest} = props;
                        return <h4 id={convertToId(children)} {...rest}>{children}</h4>
                    },
                    h5(props) {
                        const {children, node, ...rest} = props;
                        return <h5 id={convertToId(children)} {...rest}>{children}</h5>
                    },
                    h6(props) {
                        const {children, node, ...rest} = props;
                        return <h6 id={convertToId(children)} {...rest}>{children}</h6>
                    },
                    h7(props) {
                        const {children, node, ...rest} = props;
                        return <h7 id={convertToId(children)} {...rest}>{children}</h7>
                    },
                }}
            >
                {markdownContent}
            </ReactMarkdown>
        </div>
    );
}

export default Markdown;
