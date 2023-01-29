# Snippet Generator

A simple local script to generate a snippet of HTML which can be useful if embedding a link to a web page in an email.

## Installation

Install with `yarn` or `npm i`.

## Usage

```bash
yarn snippet <URL>
```

This should return an output like:

```html
  <div style="display: flex; align-items: center">
    <div class="content" style="width: 100%">
      <h3 style="margin-top: 0"><a href="https://codepen.io/amy_e_carrigan/pen/JjBvNqB" style="color: rgb(60, 128, 245); font-weight: bold">Voronoi Triangles Paradox</a></h3>
      <p>...</p>
      <p><a href="https://codepen.io/amy_e_carrigan/pen/JjBvNqB" style="color: rgb(60, 128, 245); font-weight: bold">Check it out</a></p>
    </div>
    <div class="image">
      <a href="https://codepen.io/amy_e_carrigan/pen/JjBvNqB">
        <img
        src="https://shots.codepen.io/amy_e_carrigan/pen/JjBvNqB-800.jpg?version=1674714077"
        style="object-fit: cover; width: 120px; height: 120px; border-radius: 5px; margin: 0 0 0 20px;"
      />
      </a>
    </div>
  </div>
```

## How it works

It runs Puppeteer locally, loading the given URL, and parses out the title, url, description and thumbnail image from the page. It then uses this to generate a snippet you can copy and paste into your email editor.

To adjust the HTML produced, edit the template in `index.js`.

## License

MIT
