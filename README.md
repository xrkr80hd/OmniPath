# OmniPath
A modular quest hub and tabletop companion application for managing adventures, parties, characters, and maps.
Quick Start
Open [index.html](index.html) in VS Code and run via a local web server (recommended) so route `fetch()` works.
Suggested option: install the Live Server extension in VS Code and click “Go Live”.
Navigate using the header links: Title, Adventure Select, Session Zero, Party, Party Summary, Maps, Assets, Save / Load, Settings.

Project Structure
Shell: [index.html](index.html) — header/nav + `#viewport` where screens are loaded.
Styles: [styles/main.css](styles/main.css) — app shell styles and screen blocks.
Router: [scripts/app.js](scripts/app.js) — hash-based routing; loads HTML from [screens/](screens/) and runs per-screen init.
Screens: [screens/](screens/) — HTML fragments for each route.

Routing Notes
Routes are mapped to files in [scripts/app.js](scripts/app.js); e.g., `title` → [screens/title.html](screens/title.html).
The app sets the active nav link and marks screens with `data-ready="true"` after load.

Local Serving Tips
Opening from the file system can block `fetch()`; use `http://localhost` via Live Server or any simple static server.
