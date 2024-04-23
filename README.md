## Link Demo

### https://main--storied-buttercream-6019a2.netlify.app/

## User Stories

The following **required** functionality is completed:

- [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
- [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
- [x] Add a search bar.
- [x] User can view movie details by tapping on a cell.
- [x] User sees loading state while waiting for the API.
- [x] User sees an error message when there is a network error.
- [x] Simple responsive.

The following **optional** features are implemented:

- [x] Implement segmented control to switch between list view and grid view.
- [x] All images fade in.
- [x] Implement lazy load image.
- [x] Customize the highlight and selection effect of the cell.
- [x] Improve UX loading by skeleton loading.
- [x] Enhance responsive.

The following **additional** features are implemented:

- [x] Adding blur to a photo
- [x] Use memo skip re-rendering the movies component when its props are unchanged.

## Installation Guide

1. Clone the repo

```bash
git clone https://github.com/RoarkNguyen/test-fe-elotus & cd test-fe-elotus
```

2. Install packages

```bash
npm install
```

3. Obtain an API_KEY from https://developer.themoviedb.org/reference/intro/getting-started and add it to the `.env` file

## Running the project locally

1. `npm run dev`

2. Access `http://localhost:3000` to run the project

## Build Guide

1. Create new source code

```bash
npx create-next-app@latest
```

2. Install sass to use scss in the project

```bash
npm i sass
```

3. Install react-spring to create a fade-in effect for images

```bash
npm install @react-spring/web
```

4. Install react-toastify to display notifications for users

```bash
npm install react-toastify
```

5. Install clsx to use className

```bash
npm i clsx
```
