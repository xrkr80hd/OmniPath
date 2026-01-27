// OmniPath router and screen initializers (ES module)

const viewport = document.getElementById("viewport");
const navLinks = Array.from(document.querySelectorAll(".app-nav a[data-route]"));

const routes = {
  title: "screens/title.html",
  "adventure-select": "screens/adventure-select.html",
  "session-zero": "screens/session-zero.html",
  party: "screens/party.html",
  "party-summary": "screens/party-summary.html",
  maps: "screens/maps.html",
  assets: "screens/assets.html",
  "save-load": "screens/save-load.html",
  settings: "screens/settings.html",
};

const defaultRoute = "title";

const setActiveNav = (route) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === route);
  });
};

export const initTitle = () => {
  const screen = document.querySelector(".screen-title");
  if (screen) screen.dataset.ready = "true";
};
export const initAdventureSelect = () => {
  const screen = document.querySelector(".screen-adventure-select");
  if (screen) screen.dataset.ready = "true";
};
export const initSessionZero = () => {
  const screen = document.querySelector(".screen-session-zero");
  if (screen) screen.dataset.ready = "true";
};
export const initParty = () => {
  const screen = document.querySelector(".screen-party");
  if (screen) screen.dataset.ready = "true";
};
export const initPartySummary = () => {
  const screen = document.querySelector(".screen-party-summary");
  if (screen) screen.dataset.ready = "true";
};
export const initMaps = () => {
  const screen = document.querySelector(".screen-maps");
  if (screen) screen.dataset.ready = "true";
};
export const initAssets = () => {
  const screen = document.querySelector(".screen-assets");
  if (screen) screen.dataset.ready = "true";
};
export const initSaveLoad = () => {
  const screen = document.querySelector(".screen-save-load");
  if (screen) screen.dataset.ready = "true";
};
export const initSettings = () => {
  const screen = document.querySelector(".screen-settings");
  if (screen) screen.dataset.ready = "true";
};

const initByRoute = {
  title: initTitle,
  "adventure-select": initAdventureSelect,
  "session-zero": initSessionZero,
  party: initParty,
  "party-summary": initPartySummary,
  maps: initMaps,
  assets: initAssets,
  "save-load": initSaveLoad,
  settings: initSettings,
};

const loadScreen = async (route) => {
  const screenPath = routes[route] || routes[defaultRoute];
  try {
    const response = await fetch(screenPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${screenPath}`);
    }
    const markup = await response.text();
    viewport.innerHTML = markup;
    setActiveNav(route);
    const init = initByRoute[route] || initByRoute[defaultRoute];
    if (typeof init === "function") init();
  } catch (error) {
    viewport.innerHTML = `
      <section class="screen">
        <h2>Screen Unavailable</h2>
        <p>${error.message}</p>
      </section>
    `;
  }
};

const getRouteFromHash = () => {
  const hash = window.location.hash.replace("#", "").trim();
  return hash || defaultRoute;
};

const handleRouteChange = () => {
  const route = getRouteFromHash();
  loadScreen(route);
};

window.addEventListener("hashchange", handleRouteChange);

if (!window.location.hash) {
  window.location.hash = `#${defaultRoute}`;
} else {
  handleRouteChange();
}
