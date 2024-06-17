![HaleyIssi.com Hero Image](https://haleyissi.com/static/media/haleyissi-coffee-portrait-440kb.cd3af01ed82140f2b5df.jpg)

- [Motivation](#motivation)
- [Process](#process)
  - [Purchase Custom Domain](#purchase-custom-domain)
  - [Create GitHub Repository, Initialize GitHub Pages with this Custom Domain](#create-github-repository-initialize-github-pages-with-this-custom-domain)
  - [Clone Repository Locally](#clone-repository-locally)
  - [Initialize Local React App](#initialize-local-react-app)
  - [Deploy Local React App to GitHub Pages](#deploy-local-react-app-to-github-pages)
  - [Build out React App Locally](#build-out-react-app-locally)
    - [Routing (Separate webpages within site)](#routing-separate-webpages-within-site)
    - [Favicon](#favicon)
    - [Website Metadata for Sharing](#website-metadata-for-sharing)
    - [Add Google Analytics Tracking](#add-google-analytics-tracking)
    - [Material UI Components](#material-ui-components)
    - [Google Sheets Database](#google-sheets-database)
    - [SVG Logo](#svg-logo)
- [HaleyIssi.com Embedding](#haleyissicom-embedding)



## Motivation
My wife Haley has been growing some of her Instagram accounts around some her hobbies like latte art and cooking, so we desired to create a simple website where we could post referral links for products on Amazon.

For those of you following along who may be creating your own web app, I'll write what I did as second-person imperative ("do this") rather than first-person simple past tense ("I did this"). Just keep an eye out for **haleyissi**-specific commands and adjust according to your needs.

## Process

### Purchase Custom Domain

First purchase your ideal custom domain **haleyissi.com** from somewhere like [SquareSpace](https://domains.squarespace.com/). I used to prefer Google Domains, but they sold to Squarespace. Most domains won't cost too much annually. For us it was $12/year.

### Create GitHub Repository, Initialize GitHub Pages with this Custom Domain

Create a new public repository called **haleyissi**, without a README.

Next, add the custom domain to the Settings -> Pages. This involves adjusting the DNS settings in SquareSpace as well, and it could take up to 24 hours, but in my experience it was more on the order of minutes than hours. 

Additional details can be found [here](https://emilymdubois.medium.com/using-a-squarespace-domain-with-github-pages-438951d4f5b7).

This should result in a CNAME file being added to the repository. In my case, it just had "haleyissi.com" as its only content (without quotation marks).

### Clone Repository Locally

In the desired location on my machine, clone this new **haleyissi** (essentially empty) repository via the command line.

```zsh
cd ~/CodeProjects
git clone https://github.com/dougissi/haleyissi.git
```

Navigate to the newly created directory for this git repository. By default, the directory will have the same name as the repository.

```zsh
cd haleyissi
```

### Initialize Local React App

Details can be found here at the [create-react-app getting started page](https://create-react-app.dev/docs/getting-started). But a summary of the steps is described below.

Via the command line:
```zsh
npx create-react-app .
npm start
```

If it worked, many you should see many new files in this haleyissi directory, and the command line output should direct you the local server address (something like http://127.0.0.1:3000) now running. If you navigate to that address in your browser, you should see the placeholder web app displayed (courtesy of the create-react-app team).

Don't forget: ensure the "CNAME" file is in the "public" directory.

At this point, you can choose whether you want to build out the main app functionality *locally* or get the deployment to GitHub Pages set up. I'd recommend getting the deployment stuff set up right away so that you don't have to worry about it later.

### Deploy Local React App to GitHub Pages

The goal here is to deploy the React App that we can run locally to the GitHub Pages associated with the **haleyissi** repository we created earlier. This will allow our app to be publicly available.

Detailed instructions can be found at the [create-react-app GitHub Pages deployment instructions](https://create-react-app.dev/docs/deployment#github-pages). A summary of the steps is shared here.

Note: Some guides have said that you need to add the custom website to the "package.json" file, but I haven't found that to be the case. It may have even caused issues for me. I can confidently say that we did not use it for our **haleyissi** project.

Install `gh-pages` package via command line
```zsh
npm install --save gh-pages
```

Add the following `predeploy` and `deploy` scripts to the "package.json" file.
```diff
  "scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

To deploy the current version of the website to GitHub Pages, use either of the following two commands.

```zsh
npm run deploy
```

```zsh
npm run deploy -- -m "commit message"
```

Back on the **haleyissi** repository on GitHub, navigate back to Settings -> Pages. Under the "Build and deployment section, it should show that the "Branch" of the GitHub Pages site is `gh-pages`. If not, be sure to set it to that.

It may take up a minute or two, but now you should see these changes reflected at your public website, [haleyissi.com](https://haleyissi.com).

You can run this `npm run deploy` command whenever you want to push these changes to your *live* website. NOTE: simply pushing commits to your "main" branch will NOT cause an update to your live website; only changes to the "gh-pages" branch will be reflected, and the `npm run deploy` command does that for you.


### Build out React App Locally

#### Routing (Separate webpages within site)
If you anticipate needing to have separate web pages as part of your site (e.g., haleyissi.com/coffee or haleyissi.com/kitchen), you'll need to set up routing

Here are the approximate steps:
* `npm install react-router-dom`
* Add `Routes` to the `App` component
* In "index.js", wrap `App` component in `BrowserRouter`
* Custom scripts for this single page web app (detailed instructions can be found [here](https://github.com/rafgraph/spa-github-pages)) in the public directory
  * creating a custom "404.html" file
  * adding a script to existing "index.html" file

#### Favicon

The little graphics next to each tab in our web browser are favicons. It's nice to have a custom one.

For early drafts of a website and to serve as a placeholder, it may be most efficient to simple produce a 64x64 pixel version of an image you already have.

The typical filename for this image is "favicon.ico", and it should reside in your "public" directory.

Later on, we created a logo (see [the SVG Logo](#svg-logo) section below) and updated the favicon.ico file with our new logo.

#### Website Metadata for Sharing

Adding this meta information to the index.html file allows for pretty links to haleyissi.com to be shared. This is especially noticeable for links shared via mobile devices.

```html
<head>
    <meta charset="utf-8" />
    <meta name="author" content="Doug Issichopoulos" />
    <title>Haley Issi | For the love of cooking</title>
    <meta name="title" property="og:title" content="Haley Issi | For the love of cooking" />
    <meta name="type" property="og:type" content="website" />
    <meta name="url" property="og:url" content="https://www.haleyissi.com/" />
    <meta name="image:url" property="og:image:url" content="%PUBLIC_URL%/logo512.png" />
    <meta name="description" property="og:description" content="For the love of cooking. Recipes, sourdough, coffee, etc. SF Bay Area, CA." />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="shortcut icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->

    <!-- Rest of head tag content follows below -->
</head>
```

I'd recommend taking a look at the comment above on the `%PUBLIC_URL%` variable.

#### Add Google Analytics Tracking

It's great to get a picture of whether people are actually visiting the site you just built, and Google Analytics is the ticket.

The process is straightforward: create an account for the website on the [Google Analytics](https://analytics.google.com/) page, and then add the short script within the `<head>` tag of the "index.html" file.

For example, here's the script that we added for haleyissi.com

```html
<head>
    <!-- Prior head tag content above -->

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QHMW3C580D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-QHMW3C580D');
    </script>
    <!-- End Google tag-->
</head>
```

Note: Google says to put this at the *top* of the `<head>` tag. You probably should, but I've never run into a problem by having it at the bottom.

Also, it takes about a day for the "Reports" page within Google Analytics to be populated, but you should be able to start seeing "Realtime" visits to your site within a couple of minutes of getting this tag script added.


#### Material UI Components
There's no reason to recreate the wheel. Many of the essential components of a website have been build and optimized for React by the Material UI team. See the list of all [Material UI components](https://mui.com/material-ui/all-components/) here, and it has a nice graphical representation of each.

Here are some of the especially useful ones for haleyissi.com
* `AppBar` -- top menu bar as seen on many websites
* `AutoComplete` -- search feature for items within the website
* `Card` -- clickable product card
* `SvgIcon` -- custom svg icon component, as described below in making our [logo](#svg-logo)

#### Google Sheets Database

We decided to err on the side of simplicity by having haleyissi.com pull information on the products from a Google Sheet. This would allow my wife to edit the spreadsheet whenever she wanted without necessitating a code change from me. There are clearly downsides with this approach, but for our purposes it should work nicely at this small scale.

1. Add data to [our Google sheet](https://docs.google.com/spreadsheets/d/13r8RJmgC9v8P7m70wSA43sYLSyvzMfpTJRtafiJB2pw/edit?usp=sharing)
2. File -> Share -> Publish to web
3. In the pop-up window, and then change the drop down "Entire Document" to the specific sheet, and also change the drop down "Web Page" to "Comma-separated values (.csv)". Then copy the link.
4. Back in the React app, see the [`ProductsFetcher` component](https://github.com/dougissi/haleyissi/blob/main/src/components/ProductsFetcher.js) which actually fetches this information from the Google sheet. I used the [papaparse](https://www.npmjs.com/package/papaparse) library to do the CSV parsing.
5. Use the product data to construct our [`LinkCard` component](https://github.com/dougissi/haleyissi/blob/main/src/components/LinkCard.js) for each product, which is based off of this [Material UI Primary Action Card](https://mui.com/material-ui/react-card/#primary-action).

#### SVG Logo

![HaleyIssi.com Logo](/assets/images/haleyissi-logo.png)

The image above is the logo we designed for haleyissi.com. While JPG or PNG files would be better for photorealistic images, SVG files are smaller and more scalable for simple vector graphics (SVG stands for Scalable Vector Graphics).

If you're looking for a free, open-source alternative to Adobe Illustrator, I used [Inkscape](https://inkscape.org/). Once we created the logo, we saved it as an SVG file.

If you open the SVG file in a text editor, you'll see somewhat understandable XML code. You can copy this info into the Material UI SvgIcon component to create your own logo component, as shown [here](https://github.com/dougissi/haleyissi/blob/main/src/components/LogoIcon.js), below where it says "Your SVG markup".

One important note is that you'll have to change each `style` attribute within the SVG markup text to fit the React syntax as opposed to a simple string, as shown below.

```js
{/* original */}
style="display:none;fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:4;stroke-dasharray:none"

{/* updated */}
style={{display: "inline", fill: "#000000", fillOpacity: 0, stroke: "#000000", strokeWidth: 4, strokeDasharray: "none"}}
```

## HaleyIssi.com Embedding
Embedded below is the live version of haleyissi.com. The products shown on the page come from this [this Google sheet](https://docs.google.com/spreadsheets/d/13r8RJmgC9v8P7m70wSA43sYLSyvzMfpTJRtafiJB2pw/edit?usp=sharing).

![HaleyIssi.com Embedding](embedding/haleyissi.com)
