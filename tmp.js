(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/App.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_framer_motion = __require("framer-motion");
  var import_Navbar = __toESM(__require("./components/Navbar"), 1);
  var import_Hero = __toESM(__require("./components/Hero"), 1);
  var import_TrustedBy = __toESM(__require("./components/TrustedBy"), 1);
  var import_WhyLosingMoney = __toESM(__require("./components/WhyLosingMoney"), 1);
  var import_ScrollReveal = __toESM(__require("./components/ScrollReveal"), 1);
  var import_ComparisonTable = __toESM(__require("./components/ComparisonTable"), 1);
  var import_Intelligence = __toESM(__require("./components/Intelligence"), 1);
  var import_Infrastructure = __toESM(__require("./components/Infrastructure"), 1);
  var import_AutomationFeatures = __toESM(__require("./components/AutomationFeatures"), 1);
  var import_CaseStudies = __toESM(__require("./components/CaseStudies"), 1);
  var import_SimpleSetup = __toESM(__require("./components/SimpleSetup"), 1);
  var import_Team = __toESM(__require("./components/Team"), 1);
  var import_RoiCalculator = __toESM(__require("./components/RoiCalculator"), 1);
  var import_Pricing = __toESM(__require("./components/Pricing"), 1);
  var import_Guarantees = __toESM(__require("./components/Guarantees"), 1);
  var import_FinalCta = __toESM(__require("./components/FinalCta"), 1);
  var import_FAQ = __toESM(__require("./components/FAQ"), 1);
  var import_Booking = __toESM(__require("./components/Booking"), 1);
  var import_ScrollingText = __toESM(__require("./components/ScrollingText"), 1);
  var import_Footer = __toESM(__require("./components/Footer"), 1);
  var import_ScrollProgress = __toESM(__require("./components/ScrollProgress"), 1);
  var import_react_hot_toast = __require("react-hot-toast");
  var import_BlogPost = __toESM(__require("./components/BlogPost"), 1);
  var import_BlogIndex = __toESM(__require("./components/BlogIndex"), 1);
  var getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  };
  var App = () => {
    const [theme, setTheme] = (0, import_react.useState)(getInitialTheme);
    const [isLoading, setIsLoading] = (0, import_react.useState)(true);
    (0, import_react.useEffect)(() => {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }, [theme]);
    (0, import_react.useEffect)(() => {
      let subLoaded = false;
      let timerDone = false;
      const checkReady = () => {
        if (subLoaded && timerDone) {
          setIsLoading(false);
        }
      };
      const timer = setTimeout(() => {
        timerDone = true;
        checkReady();
      }, 2200);
      const handleLoad = () => {
        subLoaded = true;
        checkReady();
      };
      if (document.readyState === "complete") {
        subLoaded = true;
      } else {
        window.addEventListener("load", handleLoad);
      }
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }, []);
    const dotRef = (0, import_react.useRef)(null);
    const trailRef = (0, import_react.useRef)(null);
    const mouse = (0, import_react.useRef)({ x: 0, y: 0 });
    const dotPos = (0, import_react.useRef)({ x: 0, y: 0 });
    const trailPos = (0, import_react.useRef)({ x: 0, y: 0 });
    (0, import_react.useEffect)(() => {
      if (window.innerWidth < 1024 || isLoading) return;
      const handleMouseMove = (e) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      };
      document.addEventListener("mousemove", handleMouseMove);
      const animate = () => {
        dotPos.current.x = mouse.current.x;
        dotPos.current.y = mouse.current.y;
        trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.1;
        trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.1;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
        }
        if (trailRef.current) {
          trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(animate);
      };
      const frame = requestAnimationFrame(animate);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(frame);
      };
    }, [isLoading]);
    const isBlogPath = typeof window !== "undefined" && window.location.pathname.startsWith("/blog/");
    const isBlogIndex = typeof window !== "undefined" && (window.location.pathname === "/blog" || window.location.pathname === "/blog/");
    const blogSlug = isBlogPath && !isBlogIndex ? window.location.pathname.split("/").filter(Boolean).slice(1).join("/") : "";
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "relative bg-white dark:bg-black transition-colors min-h-screen lg:cursor-none" }, isBlogIndex && /* @__PURE__ */ import_react.default.createElement(import_BlogIndex.default, null), !isBlogIndex && isBlogPath && /* @__PURE__ */ import_react.default.createElement(import_BlogPost.default, { slug: blogSlug }), !isBlogPath && /* @__PURE__ */ import_react.default.createElement(import_framer_motion.AnimatePresence, { mode: "wait" }, isLoading ? /* @__PURE__ */ import_react.default.createElement(
      import_framer_motion.motion.div,
      {
        key: "loader",
        initial: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.8, ease: "circIn" } },
        className: "fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-6"
      },
      /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.div,
        {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
          className: "w-16 h-16 bg-primary rounded-full blur-[20px] opacity-50"
        }
      ),
      /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center gap-2"
        },
        /* @__PURE__ */ import_react.default.createElement("span", { className: "text-white font-syne font-black text-2xl tracking-tighter uppercase" }, "ReplyFlow"),
        /* @__PURE__ */ import_react.default.createElement("a", { href: "https://audnixai.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Open Audnix AI (external)", className: "text-primary text-[10px] font-bold tracking-widest uppercase" }, "Audnix AI"),
        /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[2px] w-24 bg-zinc-800 relative overflow-hidden rounded-full mt-2" }, /* @__PURE__ */ import_react.default.createElement(
          import_framer_motion.motion.div,
          {
            initial: { x: "-100%" },
            animate: { x: "100%" },
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            className: "absolute inset-0 bg-primary"
          }
        ))
      )
    ) : /* @__PURE__ */ import_react.default.createElement(
      import_framer_motion.motion.div,
      {
        key: "content",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.2 }
      },
      /* @__PURE__ */ import_react.default.createElement(import_ScrollProgress.default, null),
      /* @__PURE__ */ import_react.default.createElement(import_react_hot_toast.Toaster, null),
      /* @__PURE__ */ import_react.default.createElement(import_Navbar.default, { theme, setTheme }),
      /* @__PURE__ */ import_react.default.createElement("main", null, /* @__PURE__ */ import_react.default.createElement(import_Hero.default, null), /* @__PURE__ */ import_react.default.createElement(import_TrustedBy.default, null), /* @__PURE__ */ import_react.default.createElement(import_WhyLosingMoney.default, null), /* @__PURE__ */ import_react.default.createElement(import_ScrollReveal.default, null), /* @__PURE__ */ import_react.default.createElement(import_ComparisonTable.default, null), /* @__PURE__ */ import_react.default.createElement(import_Intelligence.default, null), /* @__PURE__ */ import_react.default.createElement(import_Infrastructure.default, null), /* @__PURE__ */ import_react.default.createElement(import_AutomationFeatures.default, null), /* @__PURE__ */ import_react.default.createElement(import_CaseStudies.default, null), /* @__PURE__ */ import_react.default.createElement(import_SimpleSetup.default, null), /* @__PURE__ */ import_react.default.createElement("div", { id: "roi" }, /* @__PURE__ */ import_react.default.createElement(import_RoiCalculator.default, null)), /* @__PURE__ */ import_react.default.createElement("div", { id: "pricing" }, /* @__PURE__ */ import_react.default.createElement(import_Pricing.default, null)), /* @__PURE__ */ import_react.default.createElement(import_Guarantees.default, null), /* @__PURE__ */ import_react.default.createElement(import_FAQ.default, null), /* @__PURE__ */ import_react.default.createElement(import_ScrollingText.default, null), /* @__PURE__ */ import_react.default.createElement("div", { id: "book" }, /* @__PURE__ */ import_react.default.createElement(import_FinalCta.default, null), /* @__PURE__ */ import_react.default.createElement(import_Booking.default, null))),
      /* @__PURE__ */ import_react.default.createElement(import_Footer.default, { theme }),
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          ref: dotRef,
          className: "fixed top-0 left-0 h-1 w-1 rounded-full bg-primary pointer-events-none z-[9999] hidden lg:block"
        }
      ),
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          ref: trailRef,
          className: "fixed top-0 left-0 h-10 w-10 rounded-full border border-primary/50 pointer-events-none z-[9998] hidden lg:block mix-blend-difference shadow-[0_0_15px_rgba(0,105,255,0.1)]"
        }
      )
    )));
  };
  var App_default = App;
})();
