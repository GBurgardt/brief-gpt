import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-ZARWO322.js";
import {
  require_jsx_runtime
} from "/build/_shared/chunk-NMZL6IDN.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  createHotContext
} from "/build/_shared/chunk-AAKYQXCA.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/root.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime());

// css-bundle-update-plugin-ns:/Users/germanburgardt/projects/brief-gpt-remix/brief-gpt/node_modules/@remix-run/css-bundle/dist/esm/index.js
var cssBundleHref = false ? void 0 : void 0;

// app/root.jsx
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.jsx"
  );
  import.meta.hot.lastModified = "1689038173311.3682";
}
var links = () => [...cssBundleHref ? [{
  rel: "stylesheet",
  href: cssBundleHref
}] : []];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "en",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Links, {})]
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollRestoration, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveReload, {})]
    })]
  });
}
_c = App;
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default,
  links
};
/*! Bundled license information:

@remix-run/css-bundle/dist/esm/index.js:
  (**
   * @remix-run/css-bundle v1.18.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=/build/root-NV7OGAQG.js.map
