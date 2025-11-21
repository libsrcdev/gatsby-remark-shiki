# gatsby-remark-shiki

This plugin uses [`shiki`](https://github.com/octref/shiki) to add code highlighting to pages that are built with [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/).

## How to install

```
npm i --save https://gitpkg.now.sh/libsrcdev/gatsby-remark-shiki?main
```

## When should I use this plugin?

You need it to highlight code blocks (```) in your markdown files. You can use many popular [themes](https://github.com/octref/shiki/blob/master/packages/themes/README.md#literal-values) that are available in IDEs like VSCode, e.g. Nord.

## Usage

Refer to the official [Shiki v3 documentation](https://shiki.style/packages/core/) for all available options and advanced usage details.

Example:

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-shiki`,
          options: {
            // To create the highlighter instance with custom options, set to null if you are only using codeToHtml() API
            highlighterOptions: {
              // ...See Shiki docs for more
            },

            // Options for codeToHtml() API
            codeToHtmlOptions: {
              // ...See Shiki docs for more
            },

            // You can optionally provide a function to infer language from code block content when language is not specified
            inferLang: async (code) => { ... }, // Optional
          },
        },
      ],
    },
  },
];
```
