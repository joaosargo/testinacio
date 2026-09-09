// Minimal, dependency-free happy-path tests for the unit-static-page Hello World page.
// Run with: node --test
// Uses Node's built-in test runner to honor the no-build-step constraint (dec-static-html-only).

const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// req-display-hello-world: the page displays the "Hello World" label.
test("displays the Hello World label", () => {
  assert.match(html, />\s*Hello World\s*</);
});

// req-center-label / dec-css-centering: the label is centered via CSS flexbox.
test("centers the label with flexbox", () => {
  assert.match(html, /display:\s*flex/);
  assert.match(html, /align-items:\s*center/);
  assert.match(html, /justify-content:\s*center/);
});

// req-self-contained-static / nfr-browser-portability: single self-contained file,
// no external scripts or stylesheets so it opens directly via file://.
test("is a self-contained static file with no external sub-resources", () => {
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /<link\b[^>]*rel=["']?stylesheet/i);
  assert.doesNotMatch(html, /src\s*=\s*["']https?:/i);
});
