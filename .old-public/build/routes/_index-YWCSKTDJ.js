import {
  Form
} from "/build/_shared/chunk-ZARWO322.js";
import {
  require_jsx_runtime
} from "/build/_shared/chunk-NMZL6IDN.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  createHotContext
} from "/build/_shared/chunk-AAKYQXCA.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:@remix-run/node
var require_node = __commonJS({
  "empty-module:@remix-run/node"(exports, module) {
    module.exports = {};
  }
});

// empty-module:../server/briefing.server
var require_briefing = __commonJS({
  "empty-module:../server/briefing.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/_index.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_briefing = __toESM(require_briefing());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.jsx"
  );
  import.meta.hot.lastModified = "1689050548361.4646";
}
var meta = () => {
  return [{
    title: "New Remix App"
  }, {
    name: "description",
    content: "Welcome to Remix!"
  }];
};
function Index() {
  _s();
  const [youtubeUrl, setYoutubeUrl] = (0, import_react.useState)("");
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [highlights, setHighlights] = (0, import_react.useState)(null);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await fetchGptHighlights({
        youtubeUrl
      });
      setHighlights(result.highlights);
      alert("Resumen generado con \xE9xito");
    } catch (error) {
      alert("Ocurri\xF3 un error al generar el resumen");
    }
    setLoading(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    style: {
      minHeight: "100vh",
      padding: "10px",
      backgroundColor: "#F0F0F0"
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      style: {
        margin: "auto",
        width: "100%",
        maxWidth: "600px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        padding: "20px",
        color: "black"
      },
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
        style: {
          fontSize: "20px"
        },
        children: "YouTube Briefing"
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
        method: "POST",
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
          htmlFor: "youtube-url",
          children: "URL de YouTube"
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
          type: "url",
          name: "youtube-url",
          id: "youtube-url",
          value: youtubeUrl,
          onChange: (e) => setYoutubeUrl(e.target.value),
          style: {
            width: "100%",
            marginTop: "10px"
          }
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "submit",
          style: {
            display: "block",
            width: "100%",
            marginTop: "20px"
          },
          children: "Generar Resumen"
        })]
      }), highlights && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        style: {
          marginTop: "20px",
          borderWidth: "1px",
          borderRadius: "10px",
          padding: "20px",
          borderColor: "#DDD"
        },
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
          style: {
            fontSize: "18px",
            marginBottom: "10px"
          },
          children: "Destacados:"
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          style: {
            whiteSpace: "pre-line"
          },
          children: highlights
        })]
      })]
    })
  });
}
_s(Index, "g6bSk7DUV/i57gFQtIaM45x0HfE=");
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-YWCSKTDJ.js.map
