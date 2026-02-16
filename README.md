# 📌 Portfolio Website — Kellen Ceriani

**Repository:** kellenceriani/kellenceriani.github.io
**Live Site:** *(served via GitHub Pages)*
**Tech Stack:** HTML5, CSS3, JavaScript (Vanilla)
**Purpose:** Personal portfolio showcasing design, game development, multimedia projects, and professional experience.

---

## 🚀 Overview

This repository contains a **static, responsive personal portfolio website** built without frontend frameworks, tailored to present projects, skills, resume, and contact information. It combines interactive UI behavior (smooth scroll, filtering) with custom UX elements like a themed scrollbar and modal project details.

---

## 🎯 Features & Structure

### 🧩 Core Sections

✅ **Hero / About** — Introduces Kellen Ceriani including title and narrative. 
✅ **Projects Grid** — Categorized projects with filters: *Games, Animations, Web Development, Misc*. 
✅ **Project Modals** — Clickable cards reveal extended project descriptions + metadata. 
✅ **Resume** — Embedded preview and downloadable file. 
✅ **Contact & Socials** — Email + social network links. 

---

## 🧠 Technical Details

### 📌 Rendering Logic

All dynamic project rendering and UI interactions are handled in **app.js**:

* **Project Definitions:** Projects are data objects with fields like `id`, `category`, `title`, `date`, `description`, `tools`, `languages`, and optional media URLs. 
* **Render Function:** `renderProjects(filter, showAll)` rebuilds the project grid based on current filter. 
* **Filtering Mechanism:** Buttons capture category state to filter displayed projects. 
* **Slideshow Support:** For select projects, a rotating image slideshow is managed via `setInterval` with pause on hover. 
* **Modal Popup:** A custom modal system displays project details with focus trapping and accessibility support. 

---

### 🎨 Styles & Theming

All presentation is via **style.css**:

* **CSS Variables:** Central theme colors and typography are defined with CSS variables and adapt to dark mode.
* **Dark Mode:** Supported via manual toggle and media query (`prefers-color-scheme`). 
* **Custom Scrollbar:** A bespoke *baseball‑themed* overlay scrollbar with markers and drag‑to‑scroll interactivity. 
* **Responsive Layout:** Grid and flex layouts adjust across breakpoints without external libraries.

---

## 🛠️ Installation (Local Development)

> This site is static — no build system or package manager required.

```bash
# Clone
git clone https://github.com/kellenceriani/kellenceriani.github.io.git

# Navigate into project
cd kellenceriani.github.io

# Open in browser
open index.html
```

Modern development workflows may use a static server for debugging:

```bash
# Python HTTP server
python3 -m http.server 8000
```

---

## 🧪 Key Behaviors & UX

### 🏠 Navigation

* Sticky top navigation with smooth scroll to anchors.
* Hamburger menu for smaller screens.
* Active link highlighting based on scroll position. 

### 🧪 Accessibility

* Keyboard navigable interactive elements.
* Focus outlines and ARIA states for menus and modals.
* Skip link support planned (commented in CSS). 

### 🎥 Media Integration

* YouTube embeds for project previews.
* Image slideshows used where specific media is absent. 

---

## 📁 Repository Layout

```
/
├── index.html         # Main entry point
├── app.js             # UI logic & rendering
├── style.css          # Theming and layout
├── imgs/              # Static image assets
├── audio/             # Audio media
├── OLD_PORTFOLIO/     # Legacy content
```

---

## 🧩 Contributing

This is a personal repository. Please follow **standard GitHub practices**:

1. Fork the repo.
2. Create a feature branch: `feat/your-feature`.
3. Commit with clear messages.
4. Submit a pull request with context.

---

## 📄 License

This repository does not include an explicit open‑source license file.

---

## 💡 Notes
* Designed to be **deployable on GitHub Pages with zero configuration**.

