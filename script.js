// Tab navigation and small helpers for Caio Oliveira's online resume.

/**
 * Entry point.
 * Waits for the DOM to be fully parsed before wiring up the resume's
 * interactive behaviour (footer year, tab switching, and deep linking).
 */
document.addEventListener("DOMContentLoaded", () => {
  // Set the current year in the footer.
  const buildYear = document.getElementById("buildYear");
  if (buildYear) {
    buildYear.textContent = new Date().getFullYear();
  }

  // Collect the tab buttons and their matching content panels once, up front.
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  /**
   * Show a single resume section and hide the others.
   *
   * @param {string} name - The id of the panel to display (e.g. "career",
   *   "education", "contact"). If it does not match a known panel, the
   *   function falls back to the "career" tab.
   *
   * Side effects:
   *   - Updates each tab's `aria-selected` state for accessibility and styling.
   *   - Toggles the `hidden` attribute on each panel so only the target shows.
   */
  function activateTab(name) {
    // Guard against invalid hashes / unknown ids by defaulting to "career".
    const target = panels.some((panel) => panel.id === name) ? name : "career";

    // Mark the matching tab as selected (drives the active underline styling).
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.tab === target));
    });

    // Reveal only the target panel; hide the rest.
    panels.forEach((panel) => {
      panel.hidden = panel.id !== target;
    });
  }

  // Wire each tab button to switch panels and update the URL hash on click,
  // so the active section can be bookmarked or shared without reloading.
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.tab;
      activateTab(name);
      history.replaceState(null, "", `#${name}`);
    });
  });

  // Open the tab referenced in the URL hash (e.g. #contact), default to career.
  const initial = window.location.hash.replace("#", "");
  activateTab(initial || "career");
});

