# Movie Vault

A lightweight personal movie-tracking and recommendation website.

## Live site

https://movie-vault-fgye.netlify.app

## What it tracks

- Watched and liked movies
- Streaming subscriptions
- Recommendation rules
- Current next-watch shortlist
- Local search and filtering
- Device-local saved watchlist status

## Recommendation rules

- IMDb rating above 7.0
- English or Hindi only
- Indian titles must have Hindi audio/dub
- Prefer titles included with the configured subscriptions
- Avoid already watched titles

## Deployment

This is a static site with no build step.

- Entry point: `index.html`
- Styles: `styles.css`
- Data and interactions: `app.js`
- Publish directory: repository root (`.`)

Designed for continuous deployment from GitHub to Netlify.
