if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

function copySnippet(text, buttonElement) {
  if (!text) return;

  navigator.clipboard
    .writeText(text.trim())
    .then(() => {
      const textSpan = buttonElement.querySelector(".btn-text");

      if (textSpan) {
        const originalText = textSpan.textContent;
        textSpan.textContent = "Copied!";
        buttonElement.classList.add("is-copied");

        setTimeout(() => {
          textSpan.textContent = originalText;
          buttonElement.classList.remove("is-copied");
        }, 1800);
      }
    })
    .catch((err) => {
      console.error("Clipboard copy failure", err);
    });
}

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-toggle-icon");
const html = document.documentElement;

function syncThemeIcon() {
  if (html.classList.contains("dark")) {
    themeIcon.textContent = "light_mode";
  } else {
    themeIcon.textContent = "dark_mode";
  }
}

syncThemeIcon();

themeToggle.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  syncThemeIcon();
});

// Preserve inline action behaviour without inline JavaScript in the HTML.
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");

  if (!target) return;

  const action = target.dataset.action;
  const match = action.match(/^copySnippet\((.*),\s*this\)$/);

  if (!match) return;

  let text;

  try {
    text = Function(`return (${match[1]})`)();
  } catch {
    return;
  }

  copySnippet(text, target);
});

const mobileDrawer = document.getElementById("mobile-drawer");
const mobileBtn = document.getElementById("mobile-menu-btn");

if (mobileBtn && mobileDrawer) {
  mobileBtn.addEventListener("click", () => {
    mobileDrawer.classList.toggle("is-open");
  });
}
