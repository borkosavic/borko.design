# Gemini Project - borko.design

This document provides an overview of the borko.design portfolio project, its structure, and how to work with it.

## Project Overview

This is a static website that serves as a UX/Product Design portfolio. It is built with HTML and styled with Tailwind CSS. The site is composed of several static pages, including a home page, a projects page, a resume page, and a contact page.

## Technologies

- **HTML**: The core markup language for the web pages.
- **Tailwind CSS**: A utility-first CSS framework for styling the website.
- **JavaScript**: Used for minor interactive elements, such as the mobile navigation menu.
- **Node.js**: Used for dependency management and running scripts.

## Project Structure

The project is organized into the following main directories and files:

- **`/` (root)**: Contains the main HTML files (`index.html`, `projects.html`, `resume.html`, `contact.html`), configuration files (`tailwind.config.js`, `package.json`), and this `gemini.md` file.
- **`/assets`**: Contains all the static assets for the website.
  - **`/assets/css`**: Contains the compiled CSS file (`style.css`).
  - **`/assets/fonts`**: Contains the custom fonts used on the website.
  - **`/assets/images`**: Contains images and favicons.
  - **`/assets/js`**: Contains the main JavaScript file (`main.js`).
- **`/projects`**: Contains the individual project pages as HTML files.
- **`/src`**: Contains the source CSS file (`input.css`) for Tailwind CSS.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or a compatible package manager) must be installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bashi 
    cd borko.design
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server with live reloading for CSS changes, run the following command:

```bash
npm run dev
```

This command will watch the `./src/input.css` file and recompile the CSS to `./assets/css/style.css` whenever a change is detected.

### Building for Production

To build the CSS for production, including minification, run the following command:

```bash
npm run build
```

This will generate a minified `style.css` file in the `./assets/css` directory.

## Customization

### Tailwind CSS

The Tailwind CSS configuration can be found in the `tailwind.config.js` file. You can customize the theme, add new colors, fonts, and more in this file.

### Content

The content of the website can be edited directly in the HTML files. The project pages are located in the `/projects` directory.
