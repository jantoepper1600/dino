import { j as jsx, b as _renderSSR, c as _pauseFromContexts, F as Fragment, s as setPlatform, d as componentQrl, i as inlinedQrl, e as _jsxQ, f as _wrapSignal, g as _jsxBranch, u as useServerData, h as useContext, k as _jsxC, S as SkipRender, l as useStylesQrl, m as useStore, n as _weakSerialize, o as useSignal, p as useContextProvider, r as useTaskQrl, t as Slot, w as getPlatform, x as noSerialize, y as createContextId, z as basePathname, A as useLexicalScope, B as getLocale, C as withLocale, D as _fnSignal, E as _jsxS } from "./@qwik-city-plan-064f53c1.mjs";
/**
 * @license
 * @builder.io/qwik/server 1.2.17
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    var _a;
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      var _a;
      const hash = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest2) {
  const platform = createPlatform(opts, manifest2);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,s=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,s,i=s.type)=>{const a="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&s.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,s],(()=>t.isConnected))(s,t);return}const b=r(t,a);if(b){const o=t.closest("[q\\\\:container]"),i=new URL(r(o,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),b=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(o);const p=(await b)[c],u=e[n];if(t.isConnected)try{e[n]=[t,s,r],d("qsymbol",{symbol:c,element:t,reqTime:f}),await p(s,t)}finally{e[n]=u}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},u=e=>{a("-window",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,d("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d("qidle"))),s.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),v=t=>{for(const n of t)s.has(n)||(q(e,n,p,!0),q(o,n,u),s.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    const module = import(\n                    /* @vite-ignore */\n                    url.href.split("#")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,s=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,s,i=s.type)=>{const a="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&s.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,s],(()=>t.isConnected))(s,t);return}const b=r(t,a);if(b){const o=t.closest("[q\\\\:container]"),i=new URL(r(o,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),b=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(o);const p=(await b)[c],u=e[n];if(t.isConnected)try{e[n]=[t,s,r],d("qsymbol",{symbol:c,element:t,reqTime:f}),await p(s,t)}finally{e[n]=u}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},u=e=>{a("-window",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,d("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d("qidle"))),s.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),v=t=>{for(const n of t)s.has(n)||(q(e,n,p,!0),q(o,n,u),s.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,"readystatechange",w),w()}})(document);';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events = new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    const module = import(\n                    /* @vite-ignore */\n                    url.href.split("#")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
function getQwikLoaderScript(opts = {}) {
  if (Array.isArray(opts.events) && opts.events.length > 0) {
    const loader = opts.debug ? QWIK_LOADER_OPTIMIZE_DEBUG : QWIK_LOADER_OPTIMIZE_MINIFIED;
    return loader.replace("window.qEvents", JSON.stringify(opts.events));
  }
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult == null ? void 0 : snapshotResult.qrls;
  const { mapper, manifest: manifest2 } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest2, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest2, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest2.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest2, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}
function getValidManifest(manifest2) {
  if (manifest2 != null && manifest2.mapping != null && typeof manifest2.mapping === "object" && manifest2.symbols != null && typeof manifest2.symbols === "object" && manifest2.bundles != null && typeof manifest2.bundles === "object") {
    return manifest2;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: `document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  if (input && typeof input === "object") {
    return input;
  }
  return PrefetchImplementationDefault;
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            (_a2 = opts.serverData) == null ? void 0 : _a2.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: (_b = opts.serverData) == null ? void 0 : _b.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: (_c = opts.serverData) == null ? void 0 : _c.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = ((_d = opts.qwikLoader) == null ? void 0 : _d.include) ?? "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: (_e = opts.qwikLoader) == null ? void 0 : _e.events,
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: (_f = opts.serverData) == null ? void 0 : _f.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: (_g = opts.serverData) == null ? void 0 : _g.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: (resolvedManifest == null ? void 0 : resolvedManifest.manifest.manifestHash) || "dev"
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest2) {
  if (!manifest2) {
    return void 0;
  }
  if ("mapper" in manifest2) {
    return manifest2;
  }
  manifest2 = getValidManifest(manifest2);
  if (manifest2) {
    const mapper = {};
    Object.entries(manifest2.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest: manifest2
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/g, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  var _a;
  for (const ctx of elements) {
    const symbol = (_a = ctx.$componentQrl$) == null ? void 0 : _a.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
function serializeFunctions(funcs) {
  return `document.currentScript.qFuncs=[${funcs.join(",\n")}]`;
}
async function setServerPlatform2(manifest2) {
  const platform = createPlatform({ manifest: manifest2 }, resolveManifest(manifest2));
  setPlatform(platform);
}
const manifest = { "manifestHash": "lxpyv3", "symbols": { "s_02wMImzEAbk": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useTask", "canonicalFilename": "s_02wmimzeabk", "hash": "02wMImzEAbk", "ctxKind": "function", "ctxName": "useTask$", "captures": true, "parent": "s_TxCFOy819ag", "loc": [26295, 35258] }, "s_SLPfbhA7aGE": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_useVisibleTask", "canonicalFilename": "s_slpfbha7age", "hash": "SLPfbhA7aGE", "ctxKind": "function", "ctxName": "useVisibleTask$", "captures": true, "parent": "s_EvhnljescmY", "loc": [584, 644] }, "s_0vphQYqOdZI": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_0vphqyqodzi", "hash": "0vphQYqOdZI", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [243, 797] }, "s_8gdLBszqbaM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_8gdlbszqbam", "hash": "8gdLBszqbaM", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [37211, 38862] }, "s_B0lqk5IDDy4": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_b0lqk5iddy4", "hash": "B0lqk5IDDy4", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [134, 160] }, "s_EvhnljescmY": { "origin": "routes/dino/index.tsx", "displayName": "dino_component", "canonicalFilename": "s_evhnljescmy", "hash": "EvhnljescmY", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [106, 14031] }, "s_Nk9PlpjQm9Y": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component", "canonicalFilename": "s_nk9plpjqm9y", "hash": "Nk9PlpjQm9Y", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [48978, 50329] }, "s_TxCFOy819ag": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component", "canonicalFilename": "s_txcfoy819ag", "hash": "TxCFOy819ag", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [23025, 35545] }, "s_VKFlAWJuVm8": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_vkflawjuvm8", "hash": "VKFlAWJuVm8", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [589, 617] }, "s_WmYC5H00wtI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component", "canonicalFilename": "s_wmyc5h00wti", "hash": "WmYC5H00wtI", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [35829, 37092] }, "s_e0ssiDXoeAM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_e0ssidxoeam", "hash": "e0ssiDXoeAM", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [7931, 8645] }, "s_tntnak2DhJ8": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_tntnak2dhj8", "hash": "tntnak2DhJ8", "ctxKind": "function", "ctxName": "component$", "captures": false, "loc": [268, 793] }, "s_RPDJAz33WLA": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useStyles", "canonicalFilename": "s_rpdjaz33wla", "hash": "RPDJAz33WLA", "ctxKind": "function", "ctxName": "useStyles$", "captures": false, "parent": "s_TxCFOy819ag", "loc": [23080, 23114] }, "s_A5bZC7WO00A": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "routeActionQrl_action_submit", "canonicalFilename": "s_a5bzc7wo00a", "hash": "A5bZC7WO00A", "ctxKind": "function", "ctxName": "submit", "captures": true, "loc": [40230, 41864] }, "s_DyVc0YBIqQU": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "spa_init", "canonicalFilename": "s_dyvc0ybiqqu", "hash": "DyVc0YBIqQU", "ctxKind": "function", "ctxName": "spaInit", "captures": false, "loc": [1391, 6872] }, "s_wOIPfiQ04l4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "serverQrl_stuff", "canonicalFilename": "s_woipfiq04l4", "hash": "wOIPfiQ04l4", "ctxKind": "function", "ctxName": "stuff", "captures": true, "loc": [44878, 46864] }, "s_3Z8e0aOi7lg": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_removeActive", "canonicalFilename": "s_3z8e0aoi7lg", "hash": "3Z8e0aOi7lg", "ctxKind": "function", "ctxName": "$", "captures": false, "parent": "s_EvhnljescmY", "loc": [373, 562] }, "s_7tVJE0SOs0M": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_div_div_button_onClick_1", "canonicalFilename": "s_7tvje0sos0m", "hash": "7tVJE0SOs0M", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [7281, 7331] }, "s_BUbtvTyvVRE": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component_goto", "canonicalFilename": "s_bubtvtyvvre", "hash": "BUbtvTyvVRE", "ctxKind": "function", "ctxName": "goto", "captures": false, "parent": "s_WmYC5H00wtI", "loc": [36230, 36291] }, "s_CvwfWi6zZtY": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_nav_button_onClick", "canonicalFilename": "s_cvwfwi6zzty", "hash": "CvwfWi6zZtY", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [812, 835] }, "s_EKpQx60wrSU": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_nav_button_onClick_1", "canonicalFilename": "s_ekpqx60wrsu", "hash": "EKpQx60wrSU", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [928, 951] }, "s_FzoS1B9lehM": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_nav_button_onClick_2", "canonicalFilename": "s_fzos1b9lehm", "hash": "FzoS1B9lehM", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [1040, 1063] }, "s_Gz9RiLpycys": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_addActive", "canonicalFilename": "s_gz9rilpycys", "hash": "Gz9RiLpycys", "ctxKind": "function", "ctxName": "$", "captures": false, "parent": "s_EvhnljescmY", "loc": [203, 345] }, "s_OajZP0bdn9c": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_div_div_button_onClick_2", "canonicalFilename": "s_oajzp0bdn9c", "hash": "OajZP0bdn9c", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [7373, 7421] }, "s_PBnJ0qdKhS4": { "origin": "routes/dino/index.tsx", "displayName": "dino_component_main_div_div_button_onClick", "canonicalFilename": "s_pbnj0qdkhs4", "hash": "PBnJ0qdKhS4", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_EvhnljescmY", "loc": [7192, 7239] }, "s_eBQ0vFsFKsk": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_onPrefetch_event", "canonicalFilename": "s_ebq0vfsfksk", "hash": "eBQ0vFsFKsk", "ctxKind": "function", "ctxName": "event$", "captures": false, "parent": "s_8gdLBszqbaM", "loc": [37738, 37801] }, "s_fX0bDjeJa0E": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_goto", "canonicalFilename": "s_fx0bdjeja0e", "hash": "fX0bDjeJa0E", "ctxKind": "function", "ctxName": "goto", "captures": true, "parent": "s_TxCFOy819ag", "loc": [24364, 25683] }, "s_i1Cv0pYJNR0": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handleClick_event", "canonicalFilename": "s_i1cv0pyjnr0", "hash": "i1Cv0pYJNR0", "ctxKind": "function", "ctxName": "event$", "captures": true, "parent": "s_8gdLBszqbaM", "loc": [37919, 38434] }, "s_p9MSze0ojs4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component_form_onSubmit", "canonicalFilename": "s_p9msze0ojs4", "hash": "p9MSze0ojs4", "ctxKind": "function", "ctxName": "_jsxS", "captures": true, "parent": "s_Nk9PlpjQm9Y", "loc": [49285, 49982] } }, "mapping": { "s_02wMImzEAbk": "q-7d42d634.js", "s_SLPfbhA7aGE": "q-84497260.js", "s_0vphQYqOdZI": "q-1f32b124.js", "s_8gdLBszqbaM": "q-ee00a7a1.js", "s_B0lqk5IDDy4": "q-54207099.js", "s_EvhnljescmY": "q-84497260.js", "s_Nk9PlpjQm9Y": "q-bc457890.js", "s_TxCFOy819ag": "q-7d42d634.js", "s_VKFlAWJuVm8": "q-8f8cbff7.js", "s_WmYC5H00wtI": "q-a4c27f08.js", "s_e0ssiDXoeAM": "q-432edc95.js", "s_tntnak2DhJ8": "q-d85a1209.js", "s_RPDJAz33WLA": "q-7d42d634.js", "s_A5bZC7WO00A": "q-b993f607.js", "s_DyVc0YBIqQU": "q-663033b0.js", "s_wOIPfiQ04l4": "q-0796101a.js", "s_3Z8e0aOi7lg": "q-84497260.js", "s_7tVJE0SOs0M": "q-84497260.js", "s_BUbtvTyvVRE": "q-a4c27f08.js", "s_CvwfWi6zZtY": "q-84497260.js", "s_EKpQx60wrSU": "q-84497260.js", "s_FzoS1B9lehM": "q-84497260.js", "s_Gz9RiLpycys": "q-84497260.js", "s_OajZP0bdn9c": "q-84497260.js", "s_PBnJ0qdKhS4": "q-84497260.js", "s_eBQ0vFsFKsk": "q-bb7086f4.js", "s_fX0bDjeJa0E": "q-7d42d634.js", "s_i1Cv0pYJNR0": "q-ee00a7a1.js", "s_p9MSze0ojs4": "q-bc457890.js" }, "bundles": { "q-0416ada4.js": { "size": 185, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-84497260.js"], "origins": ["src/routes/dino/index.tsx"] }, "q-0796101a.js": { "size": 889, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/entry_serverQrl.js", "src/s_woipfiq04l4.js"], "symbols": ["s_wOIPfiQ04l4"] }, "q-1f32b124.js": { "size": 607, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/entry_RouterHead.js", "src/s_0vphqyqodzi.js"], "symbols": ["s_0vphQYqOdZI"] }, "q-268f46e3.js": { "size": 47555, "origins": ["node_modules/@builder.io/qwik/core.min.mjs"] }, "q-2d78e082.js": { "size": 7493, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-432edc95.js", "q-663033b0.js", "q-7d42d634.js"], "origins": ["@qwik-city-sw-register", "node_modules/@builder.io/qwik-city/index.qwik.mjs"] }, "q-375a752c.js": { "size": 125, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-8ea06850.js"], "origins": ["@qwik-city-entries"] }, "q-432edc95.js": { "size": 462, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_e0ssidxoeam.js"], "symbols": ["s_e0ssiDXoeAM"] }, "q-54207099.js": { "size": 112, "imports": ["q-268f46e3.js"], "origins": ["src/entry_routes.js", "src/s_b0lqk5iddy4.js"], "symbols": ["s_B0lqk5IDDy4"] }, "q-5e4ebac7.js": { "size": 283, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-54207099.js"], "origins": ["src/routes/index.tsx"] }, "q-63b029ee.js": { "size": 288, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-8f8cbff7.js"], "origins": ["src/routes/layout.tsx"] }, "q-663033b0.js": { "size": 2286, "origins": ["src/entry_spaInit.js", "src/s_dyvc0ybiqqu.js"], "symbols": ["s_DyVc0YBIqQU"] }, "q-753c4afa.js": { "size": 202, "imports": ["q-268f46e3.js"], "dynamicImports": ["q-d85a1209.js"], "origins": ["src/global.css", "src/root.tsx"] }, "q-7d42d634.js": { "size": 5690, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "dynamicImports": ["q-0416ada4.js", "q-375a752c.js", "q-5e4ebac7.js", "q-63b029ee.js"], "origins": ["@qwik-city-plan", "src/entry_QwikCityProvider.js", "src/s_02wmimzeabk.js", "src/s_fx0bdjeja0e.js", "src/s_rpdjaz33wla.js", "src/s_txcfoy819ag.js"], "symbols": ["s_02wMImzEAbk", "s_fX0bDjeJa0E", "s_RPDJAz33WLA", "s_TxCFOy819ag"] }, "q-84497260.js": { "size": 15115, "imports": ["q-268f46e3.js"], "origins": ["src/entry_dino.js", "src/s_3z8e0aoi7lg.js", "src/s_7tvje0sos0m.js", "src/s_cvwfwi6zzty.js", "src/s_ekpqx60wrsu.js", "src/s_evhnljescmy.js", "src/s_fzos1b9lehm.js", "src/s_gz9rilpycys.js", "src/s_oajzp0bdn9c.js", "src/s_pbnj0qdkhs4.js", "src/s_slpfbha7age.js"], "symbols": ["s_3Z8e0aOi7lg", "s_7tVJE0SOs0M", "s_CvwfWi6zZtY", "s_EKpQx60wrSU", "s_EvhnljescmY", "s_FzoS1B9lehM", "s_Gz9RiLpycys", "s_OajZP0bdn9c", "s_PBnJ0qdKhS4", "s_SLPfbhA7aGE"] }, "q-8ea06850.js": { "size": 2539, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.ts"] }, "q-8f8cbff7.js": { "size": 102, "imports": ["q-268f46e3.js"], "origins": ["src/entry_layout.js", "src/s_vkflawjuvm8.js"], "symbols": ["s_VKFlAWJuVm8"] }, "q-a4c27f08.js": { "size": 787, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/entry_QwikCityMockProvider.js", "src/s_bubtvtyvvre.js", "src/s_wmyc5h00wti.js"], "symbols": ["s_BUbtvTyvVRE", "s_WmYC5H00wtI"] }, "q-b993f607.js": { "size": 751, "imports": ["q-268f46e3.js"], "origins": ["src/entry_routeActionQrl.js", "src/s_a5bzc7wo00a.js"], "symbols": ["s_A5bZC7WO00A"] }, "q-bb7086f4.js": { "size": 128, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/s_ebq0vfsfksk.js"], "symbols": ["s_eBQ0vFsFKsk"] }, "q-bc457890.js": { "size": 1032, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "origins": ["src/entry_GetForm.js", "src/s_nk9plpjqm9y.js", "src/s_p9msze0ojs4.js"], "symbols": ["s_Nk9PlpjQm9Y", "s_p9MSze0ojs4"] }, "q-d85a1209.js": { "size": 543, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "dynamicImports": ["q-1f32b124.js"], "origins": ["src/components/router-head/router-head.tsx", "src/entry_root.js", "src/s_tntnak2dhj8.js"], "symbols": ["s_tntnak2DhJ8"] }, "q-ee00a7a1.js": { "size": 1149, "imports": ["q-268f46e3.js", "q-2d78e082.js"], "dynamicImports": ["q-bb7086f4.js"], "origins": ["src/entry_Link.js", "src/s_8gdlbszqbam.js", "src/s_i1cv0pyjnr0.js"], "symbols": ["s_8gdLBszqbaM", "s_i1Cv0pYJNR0"] } }, "injections": [{ "tag": "style", "location": "head", "attributes": { "data-src": "/build/q-261fcbdb.css", "dangerouslySetInnerHTML": 'html{-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}*{padding:unset;margin:unset;border:unset;outline:unset}main{padding:0;max-width:1920px;max-height:100vh;line-height:inherit;overflow:hidden;transition:background-color 2s}#ovrly{position:absolute;top:0;right:0;bottom:0;left:0;z-index:10;display:none}#ovrly.active{display:block}.bg-blue{background-color:#87ceeb}.bg-red{background-color:#8b0000}img{display:block}div.img{height:100vh;position:relative}div.img img{position:absolute}.content{display:flex;justify-content:center}.mirror{transform:scaleX(-1)}nav{position:absolute;inset:2rem 1rem auto;z-index:5;display:flex;justify-content:center;gap:.5rem}nav>button{padding:.75rem 1.25rem;border-radius:.25rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;cursor:pointer}nav>button.active{box-shadow:0 0 0 2px #000}.fadeIn{opacity:0;translate:0 3rem;transition:.25s ease-out}.fadeIn.active{opacity:1;translate:0}.fadeIn.one{transition:opacity .25s 1.125s ease-out,translate 0s 1.325s}.fadeIn.one.active{transition:.25s 0s ease-out}.fadeIn.two{transition:opacity .25s 1s ease-out,translate 0s 1.25s}.fadeIn.two.active{transition:.25s .125s ease-out}.fadeIn.three{transition:opacity .25s .825s ease-out,translate 0s 1.125s}.fadeIn.three.active{transition:.25s .25s ease-out}.fadeIn.four{transition:opacity .25s .75s ease-out,translate 0s 1s}.fadeIn.four.active{transition:.25s .325s ease-out}.fadeIn.five{transition:opacity .25s .625s ease-out,translate 0s .825s}.fadeIn.five.active{transition:.25s .5s ease-out}.fadeIn.six{transition:opacity .25s .5s ease-out,translate 0s .75s}.fadeIn.six.active{transition:.25s .625s ease-out}.fadeIn.seven{transition:opacity .25s .325s ease-out,translate 0s .625s}.fadeIn.seven.active{transition:.25s .75s ease-out}.fadeIn.eight{transition:opacity .25s .25s ease-out,translate 0s .5s}.fadeIn.eight.active{transition:.25s .825s ease-out}.fadeIn.nine{transition:opacity .25s .125s ease-out,translate 0s .325s}.fadeIn.nine.active{transition:.25s 1s ease-out}.fadeIn.ten{transition:opacity .25s 0s ease-out,translate 0s .25s}.fadeIn.ten.active{transition:.25s 1.125s ease-out}.popIn{scale:0 1;transition:.25s ease-out}.popIn.active{scale:1}.popIn.one{transition-delay:1s}.popIn.one.active,.popIn.two{transition-delay:.5s}.popIn.two.active{transition-delay:1s}.popIn.three{transition-delay:0s}.popIn.three.active{transition-delay:1.5s}.special{opacity:0;translate:0 -2rem}.special.active{opacity:1;translate:0}.special.one{transition:opacity .25s 0s ease-out,translate 0s .25s}.special.one.active{transition:.5s .5s ease-out}.special.two{transition:opacity .25s .25s ease-out,translate 0s .5s}.special.two.active{transition:.5s .75s ease-out}.rotateIn{opacity:0;rotate:-90deg;transform-origin:bottom;transition:.75s ease-out}.rotateIn.mirror{rotate:90deg}.rotateIn.active{opacity:1;rotate:0deg}.rotateIn.one{transition-delay:.5s}.rotateIn.one.active{transition-delay:1s}.rotateIn.two{transition-delay:.25s}.rotateIn.two.active{transition-delay:1.25s}.rotateIn.three{transition-delay:0s}.rotateIn.three.active{transition-delay:1.5s}.slideIn{translate:150% 0;transition:1s ease-out}.slideIn.active{translate:0}.slideIn2{translate:-150% 0;transition:1s ease-out}.slideIn2.active{translate:0}.bullets>button{width:2rem;height:2rem;position:absolute;inset:auto auto 45rem 80%;background-color:#fff;border:3px solid #00f;border-radius:50%;cursor:pointer}.bullets>button:nth-of-type(2){inset:auto auto 17.5rem 55%}.bullets>button:last-of-type{inset:auto auto 20rem 20%}.popup>div{opacity:0;translate:0 1rem;transition:.25s ease-out}.popup>div.active{opacity:1;translate:0}.dino,.spezies,.flora{padding:2rem;margin-inline:auto;max-width:50rem;position:absolute;inset:6rem 1rem auto;display:flex;flex-direction:column;align-items:center;gap:5rem;background-color:#fff;border-radius:1rem}.dino .left,.spezies .left{display:flex;align-items:center;gap:3rem}.dino .left .legend,.spezies .left .legend{display:flex;flex-direction:column;gap:1rem}.dino .left ul,.spezies .left ul{padding-left:1rem;list-style:square}.dino .left ul li:first-of-type::marker,.spezies .left ul li:first-of-type::marker{color:red}.dino .left ul li:nth-of-type(2)::marker,.spezies .left ul li:nth-of-type(2)::marker{color:#0f0}.dino .left ul li:last-of-type::marker,.spezies .left ul li:last-of-type::marker{color:#00f}.dino .chart{width:12.5rem;aspect-ratio:1;border-radius:50%;background-image:conic-gradient(#f00 0deg 265deg,#0f0 265deg 353deg,#00f 353deg)}.spezies .bar{padding:1rem;width:15rem;display:flex;flex-direction:column;gap:.5rem;background-color:#eee;border-radius:.5rem}.spezies .bar hr{height:1rem}.spezies .bar hr:first-of-type{width:5%;background-color:red}.spezies .bar hr:nth-of-type(2){width:80%;background-color:#0f0}.spezies .bar hr:last-of-type{width:12%;background-color:#00f}\n' } }], "version": "1", "options": { "target": "client", "buildMode": "production", "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "1.2.17", "vite": "", "rollup": "3.29.4", "env": "node", "os": "linux", "node": "20.8.0" } };
const swRegister = '((i,a,r,s)=>{r=e=>{const t=document.querySelector("[q\\\\:base]");t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;a?r(t):i.push(t)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{s=()=>{a=e,i.forEach(r),r({bundles:i})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&s()}):e.active&&s()}).catch(e=>console.error(e))})([])';
const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ createContextId("qc-ir");
const s_DyVc0YBIqQU = (currentScript) => {
  const win = window;
  const currentPath = location.pathname + location.search;
  const spa = "_qCitySPA";
  const historyPatch = "_qCityHistoryPatch";
  const bootstrap = "_qCityBootstrap";
  const initPopstate = "_qCityInitPopstate";
  const initAnchors = "_qCityInitAnchors";
  const initVisibility = "_qCityInitVisibility";
  const initScroll = "_qCityInitScroll";
  const scrollEnabled = "_qCityScrollEnabled";
  const debounceTimeout = "_qCityScrollDebounce";
  const scrollHistory = "_qCityScroll";
  const checkAndScroll = (scrollState) => {
    if (scrollState)
      win.scrollTo(scrollState.x, scrollState.y);
  };
  const currentScrollState2 = () => {
    const elm = document.documentElement;
    return {
      x: elm.scrollLeft,
      y: elm.scrollTop,
      w: Math.max(elm.scrollWidth, elm.clientWidth),
      h: Math.max(elm.scrollHeight, elm.clientHeight)
    };
  };
  const saveScrollState = (scrollState) => {
    const state = history.state || {};
    state[scrollHistory] = scrollState || currentScrollState2();
    history.replaceState(state, "");
  };
  if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
    saveScrollState();
    win[initPopstate] = () => {
      var _a;
      if (win[spa])
        return;
      win[scrollEnabled] = false;
      clearTimeout(win[debounceTimeout]);
      if (currentPath !== location.pathname + location.search) {
        const container = currentScript.closest("[q\\:container]");
        const link = container.querySelector('a[q\\:key="AD_1"]');
        if (link) {
          const container2 = link.closest("[q\\:container]");
          const bootstrapLink = link.cloneNode();
          bootstrapLink.setAttribute("q:nbs", "");
          bootstrapLink.style.display = "none";
          container2.appendChild(bootstrapLink);
          win[bootstrap] = bootstrapLink;
          bootstrapLink.click();
        } else
          location.reload();
      } else if (history.scrollRestoration === "manual") {
        const scrollState = (_a = history.state) == null ? void 0 : _a[scrollHistory];
        checkAndScroll(scrollState);
        win[scrollEnabled] = true;
      }
    };
    if (!win[historyPatch]) {
      win[historyPatch] = true;
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const prepareState = (state) => {
        if (state === null || typeof state === "undefined")
          state = {};
        else if ((state == null ? void 0 : state.constructor) !== Object)
          state = {
            _data: state
          };
        state._qCityScroll = state._qCityScroll || currentScrollState2();
        return state;
      };
      history.pushState = (state, title, url) => {
        state = prepareState(state);
        return pushState.call(history, state, title, url);
      };
      history.replaceState = (state, title, url) => {
        state = prepareState(state);
        return replaceState.call(history, state, title, url);
      };
    }
    win[initAnchors] = (event) => {
      if (win[spa] || event.defaultPrevented)
        return;
      const target = event.target.closest("a[href]");
      if (target && !target.hasAttribute("preventdefault:click")) {
        const href = target.getAttribute("href");
        const prev = new URL(location.href);
        const dest = new URL(href, prev);
        const sameOrigin = dest.origin === prev.origin;
        const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
        if (sameOrigin && samePath) {
          event.preventDefault();
          if (dest.href !== prev.href)
            history.pushState(null, "", dest);
          if (!dest.hash) {
            if (dest.href.endsWith("#"))
              window.scrollTo(0, 0);
            else {
              win[scrollEnabled] = false;
              clearTimeout(win[debounceTimeout]);
              saveScrollState({
                ...currentScrollState2(),
                x: 0,
                y: 0
              });
              location.reload();
            }
          } else {
            const elmId = dest.hash.slice(1);
            const elm = document.getElementById(elmId);
            if (elm)
              elm.scrollIntoView();
          }
        }
      }
    };
    win[initVisibility] = () => {
      if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden")
        saveScrollState();
    };
    win[initScroll] = () => {
      if (win[spa] || !win[scrollEnabled])
        return;
      clearTimeout(win[debounceTimeout]);
      win[debounceTimeout] = setTimeout(() => {
        saveScrollState();
        win[debounceTimeout] = void 0;
      }, 200);
    };
    win[scrollEnabled] = true;
    setTimeout(() => {
      addEventListener("popstate", win[initPopstate]);
      addEventListener("scroll", win[initScroll], {
        passive: true
      });
      document.body.addEventListener("click", win[initAnchors]);
      if (!win.navigation)
        document.addEventListener("visibilitychange", win[initVisibility], {
          passive: true
        });
    }, 0);
  }
};
const spaInit = /* @__PURE__ */ inlinedQrl(s_DyVc0YBIqQU, "s_DyVc0YBIqQU");
const shim = () => {
  {
    const [symbol, bundle] = getPlatform().chunkForSymbol(spaInit.getSymbol(), null);
    const path = basePathname + "build/" + bundle;
    return `(${shim$1.toString()})('${path}','${symbol}');`;
  }
};
const shim$1 = async (path, symbol) => {
  var _a;
  if (!window._qcs && history.scrollRestoration === "manual") {
    window._qcs = true;
    const scrollState = (_a = history.state) == null ? void 0 : _a._qCityScroll;
    if (scrollState)
      window.scrollTo(scrollState.x, scrollState.y);
    const currentScript = document.currentScript;
    (await import(path))[symbol](currentScript);
  }
};
const s_e0ssiDXoeAM = () => {
  const shimScript = shim();
  _jsxBranch();
  const nonce = useServerData("nonce");
  const context = useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      if (context.value[i].default)
        cmp = _jsxC(context.value[i].default, {
          children: cmp
        }, 1, "zl_0");
    return /* @__PURE__ */ _jsxC(Fragment, {
      children: [
        cmp,
        /* @__PURE__ */ _jsxQ("script", {
          dangerouslySetInnerHTML: shimScript
        }, {
          nonce
        }, null, 3, null)
      ]
    }, 1, "zl_1");
  }
  return SkipRender;
};
const RouterOutlet = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_e0ssiDXoeAM, "s_e0ssiDXoeAM"));
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const isSamePath = (a, b) => a.pathname + a.search === b.pathname + b.search;
const isPromise = (value) => {
  return value && typeof value.then === "function";
};
const resolveHead = (endpoint, routeLocation, contentModules, locale) => {
  const head = createDocumentHead();
  const getData = (loaderOrAction) => {
    const id = loaderOrAction.__id;
    if (loaderOrAction.__brand === "server_loader") {
      if (!(id in endpoint.loaders))
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
    }
    const data = endpoint.loaders[id];
    if (isPromise(data))
      throw new Error("Loaders returning a function can not be referred to in the head function.");
    return data;
  };
  const headProps = {
    head,
    withLocale: (fn) => withLocale(locale, fn),
    resolveValue: getData,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head, withLocale(locale, () => contentModuleHead(headProps)));
      else if (typeof contentModuleHead === "object")
        resolveDocumentHead(head, contentModuleHead);
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string")
    resolvedHead.title = updatedHead.title;
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
  mergeArray(resolvedHead.scripts, updatedHead.scripts);
  Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr))
    for (const newItem of newArr) {
      if (typeof newItem.key === "string") {
        const existingIndex = existingArr.findIndex((i) => i.key === newItem.key);
        if (existingIndex > -1) {
          existingArr[existingIndex] = newItem;
          continue;
        }
      }
      existingArr.push(newItem);
    }
};
const createDocumentHead = () => ({
  title: "",
  meta: [],
  links: [],
  styles: [],
  scripts: [],
  frontmatter: {}
});
let Char;
(function(Char2) {
  Char2[Char2["EOL"] = 0] = "EOL";
  Char2[Char2["OPEN_BRACKET"] = 91] = "OPEN_BRACKET";
  Char2[Char2["CLOSE_BRACKET"] = 93] = "CLOSE_BRACKET";
  Char2[Char2["DOT"] = 46] = "DOT";
  Char2[Char2["SLASH"] = 47] = "SLASH";
})(Char || (Char = {}));
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useQwikCityEnv = () => noSerialize(useServerData("qwikcity"));
const s_RPDJAz33WLA = `:root{view-transition-name:none}`;
const s_fX0bDjeJa0E = async (path, opt) => {
  const [actionState2, navResolver2, routeInternal2, routeLocation2] = useLexicalScope();
  const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
    forceReload: opt
  };
  const lastDest = routeInternal2.value.dest;
  const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
  if (!isSameOrigin(dest, lastDest))
    return;
  if (!forceReload && isSamePath(dest, lastDest))
    return;
  routeInternal2.value = {
    type,
    dest,
    forceReload,
    replaceState,
    scroll
  };
  actionState2.value = void 0;
  routeLocation2.isNavigating = true;
  return new Promise((resolve) => {
    navResolver2.r = resolve;
  });
};
const s_02wMImzEAbk = ({ track }) => {
  const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = useLexicalScope();
  async function run() {
    const [navigation, action] = track(() => [
      routeInternal2.value,
      actionState2.value
    ]);
    const locale = getLocale("");
    const prevUrl = routeLocation2.url;
    const navType = action ? "form" : navigation.type;
    navigation.replaceState;
    let trackUrl;
    let clientPageData;
    let loadedRoute = null;
    trackUrl = new URL(navigation.dest, routeLocation2.url);
    loadedRoute = env2.loadedRoute;
    clientPageData = env2.response;
    if (loadedRoute) {
      const [routeName, params, mods, menu] = loadedRoute;
      const contentModules = mods;
      const pageModule = contentModules[contentModules.length - 1];
      routeLocation2.prevUrl = prevUrl;
      routeLocation2.url = trackUrl;
      routeLocation2.params = {
        ...params
      };
      routeInternal2.untrackedValue = {
        type: navType,
        dest: trackUrl
      };
      const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules, locale);
      content2.headings = pageModule.headings;
      content2.menu = menu;
      contentInternal2.value = noSerialize(contentModules);
      documentHead2.links = resolvedHead.links;
      documentHead2.meta = resolvedHead.meta;
      documentHead2.styles = resolvedHead.styles;
      documentHead2.scripts = resolvedHead.scripts;
      documentHead2.title = resolvedHead.title;
      documentHead2.frontmatter = resolvedHead.frontmatter;
    }
  }
  const promise = run();
  return promise;
};
const s_TxCFOy819ag = (props) => {
  useStylesQrl(/* @__PURE__ */ inlinedQrl(s_RPDJAz33WLA, "s_RPDJAz33WLA"));
  const env = useQwikCityEnv();
  if (!(env == null ? void 0 : env.params))
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    params: env.params,
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const navResolver = {};
  const loaderState = _weakSerialize(useStore(env.response.loaders, {
    deep: false
  }));
  const routeInternal = useSignal({
    type: "initial",
    dest: url,
    forceReload: false,
    replaceState: false,
    scroll: true
  });
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useSignal();
  const currentActionId = env.response.action;
  const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
  const actionState = useSignal(currentAction ? {
    id: currentActionId,
    data: env.response.formData,
    output: {
      result: currentAction,
      status: env.response.status
    }
  } : void 0);
  const goto = /* @__PURE__ */ inlinedQrl(s_fX0bDjeJa0E, "s_fX0bDjeJa0E", [
    actionState,
    navResolver,
    routeInternal,
    routeLocation
  ]);
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(s_02wMImzEAbk, "s_02wMImzEAbk", [
    actionState,
    content,
    contentInternal,
    documentHead,
    env,
    goto,
    loaderState,
    navResolver,
    props,
    routeInternal,
    routeLocation
  ]));
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_0");
};
const QwikCityProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_TxCFOy819ag, "s_TxCFOy819ag"));
const ServiceWorkerRegister = (props) => _jsxQ("script", {
  nonce: _wrapSignal(props, "nonce")
}, {
  dangerouslySetInnerHTML: swRegister
}, null, 3, "1Z_0");
const s_0vphQYqOdZI = () => {
  const head = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("title", null, null, "Dinosaurier Infografik", 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: _fnSignal((p0) => p0.url.href, [
          loc
        ], "p0.url.href"),
        rel: "canonical"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport"
      }, null, 3, null),
      head.meta.map((m) => /* @__PURE__ */ _jsxS("meta", {
        ...m
      }, null, 0, m.key)),
      head.links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.styles.map((s) => /* @__PURE__ */ _jsxS("style", {
        ...s.props,
        dangerouslySetInnerHTML: _wrapSignal(s, "style")
      }, null, 0, s.key))
    ]
  }, 1, "0D_0");
};
const RouterHead = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_0vphQYqOdZI, "s_0vphQYqOdZI"));
const global = "";
const s_tntnak2DhJ8 = () => {
  return /* @__PURE__ */ _jsxC(QwikCityProvider, {
    children: [
      /* @__PURE__ */ _jsxQ("head", null, null, [
        /* @__PURE__ */ _jsxQ("meta", null, {
          charSet: "utf-8"
        }, null, 3, null),
        /* @__PURE__ */ _jsxQ("link", null, {
          href: "/manifest.json",
          rel: "manifest"
        }, null, 3, null),
        /* @__PURE__ */ _jsxC(RouterHead, null, 3, "vp_0")
      ], 1, null),
      /* @__PURE__ */ _jsxQ("body", null, {
        lang: "en"
      }, [
        /* @__PURE__ */ _jsxC(RouterOutlet, null, 3, "vp_1"),
        /* @__PURE__ */ _jsxC(ServiceWorkerRegister, null, 3, "vp_2")
      ], 1, null)
    ]
  }, 1, "vp_3");
};
const Root = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_tntnak2DhJ8, "s_tntnak2DhJ8"));
function render(opts) {
  return renderToStream(/* @__PURE__ */ _jsxC(Root, null, 3, "Qb_0"), {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes
    }
  });
}
export {
  manifest as m,
  render as r,
  setServerPlatform2 as s
};
