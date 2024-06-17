# DougIssi.com

## About
[DougIssi.com](https://dougissi.com) is a personal software blog for Doug Issichopoulos. 

In terms of implementation, it is a web application written using the [React](https://react.dev/) framework and uses [Material UI](https://mui.com/) components. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Development

To run the app locally, clone the repo and then navigate to the project directory. At that point these scripts are useful for local development.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Most of the Javascript utility functions have unit tests using Jest, located in the `src/tests` folder.

## Add a New Post

To add a news post, create a new Markdown .md file in the `public/markdown/posts` folder that contains all of the content of the post (yes, using Markdown).

The filename requires a particular format:
* format: `<YYYY-MM-DD>-<url-pathname>.md`
* example: `2024-04-18-haleyissi.md`
  * the date and the url pathname will be inferred from the file
  * url: "dougissi.com/haleyissi"
  * date: "April 18, 2024"

To _embed_ anything in the posts, a hack was used to convert traditional image syntax to handle embeddings
* example syntax: `![IFrame Embedding](embedding/embeddingId)`
* Using the `embeddingId`, add it to the `if/else` cascade in Markdown (and reference other examples)

Afterward, add metadata about the post to the `posts` array in `src/App.js`, following the pattern shown for adding an image, title, category tags, and language tags, etc.

Notes:
* Do not change a post filename without first looking for the original pathname in the links of other posts!
* Do not include the title in the Markdown file, as that will be based on the `newsPost` array (see below)
* Do not include any h1 in the Markdown file (e.g., `# My Page Title`).
* Posts only expect headings down to h7
* Headings (and their respective anchor links) can handle simple `code` and $\LaTeX{}$ formatting, but avoid anything too complicated.

## Deployment

Currently the app is deployed using GitHub pages, based on the main branch and the `docs` folder.

### `npm run predeploy`

This is the only script that needs to be run to prep the project for deployment. It does the following:

1. Builds the app for production to the `build` folder.
2. Deletes the contents of the `docs` folder.
3. Copies the contents of the `build` folder to the `docs` folder.

After running this script, you must commit and push to the main branch to deploy your changes.

See the "predeploy" script in "package.json" for its implementation details.

The scripts that follow in this section are not necessary for deployment, but they're included here for reference.

### `npm run build`

This script is run automatically by the "predeploy" script above, but I've included it here for reference.

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).