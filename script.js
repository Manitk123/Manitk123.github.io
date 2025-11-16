/* EduSphere — LMS Mini-Portal behavior (manit_*) — course path + notes + quiz anytime + leaderboard + streak + theme */

/* ---------- Global state ---------- */
const manit_state = {
  user: null,
  courses: [],
  selectedCourseId: null
};

/* Keys */
let manit_progress = {};
const MANIT_PROGRESS_KEY   = "edusphere_progress_v1";
const MANIT_LEADERBOARD_KEY = "edusphere_leaderboard_v1";
const MANIT_STREAK_KEY      = "edusphere_streak_v1";
const MANIT_THEME_KEY       = "edusphere_theme_v1";
const MANIT_PROFILE_KEY = "edusphere_profile_v1";


/* ---------- Data ---------- */
function manit_seedCourses(){
  manit_state.courses = [
    {
      id: "js-101",
      title: "JavaScript Essentials",
      category: "Tech",
      instructor: "Alex Rivera",
      rating: 4.7,
      lessons: 42,
      duration: "8h",
      desc: "Master the foundations of modern JavaScript with hands-on exercises and mini projects.",
      resources: [
        {type:"PDF", label:"Full Syllabus (PDF)", url:"https://eloquentjavascript.net/Eloquent_JavaScript_small.pdf"},
        {type:"Repo", label:"Course Code Samples", url:"https://exploringjs.com/js/downloads/exploring-js-book-preview.pdf"}
      ],
      path: [
        {id:"js-basics", title:"JavaScript fundamentals", summary:"Syntax, values, variables, and control flow.", note:"primitives"},
        {id:"js-arrays", title:"Arrays & transformations", summary:"forEach vs map/filter/reduce and immutability.", note:"map"},
        {id:"js-async", title:"Async & promises", summary:"Callbacks, promises, and async/await.", note:"promises"}
      ],
      notes: [
        { id:"map", title:"Arrays: map vs forEach", bullets:[
          "map returns a new array from return values; forEach returns undefined.",
          "Prefer map for transformations to keep arrays immutable.",
          "Combine map with filter/reduce for expressive pipelines."
        ], tips:[
          "Know which methods mutate (sort, splice) vs not (map, filter).",
          "Expect a question about non-mutating transforms."
        ]},
        { id:"primitives", title:"Primitives vs references", bullets:[
          "Primitives: string, number, boolean, null, undefined, bigint, symbol.",
          "Objects, arrays, and functions are reference types stored by reference.",
          "Use spread or structuredClone to avoid accidental mutation."
        ], tips:[
          "Multi-select may list object/array—don’t mark them as primitives.",
          "Remember symbol is primitive."
        ]},
        { id:"letconst", title:"Block scope with let/const", bullets:[
          "let/const are block-scoped; var is function-scoped and hoisted.",
          "Use const by default; let when reassignment is needed.",
          "Temporal Dead Zone: access before declaration throws."
        ], tips:[
          "When asked which is block-scoped, choose let (or const)."
        ]},
        { id:"this", title:"this binding basics", bullets:[
          "In obj.fn(), this is obj at call site (unless bound/arrow).",
          "Arrow functions capture lexical this and cannot be rebound.",
          "bind/call/apply customize this explicitly."
        ], tips:[
          "Pay attention to arrow vs function in method definitions."
        ]},
        { id:"equality", title:"=== vs ==", bullets:[
          "=== checks value and type; == allows coercion.",
          "Avoid == surprises like [] == ![]."
        ], tips:[
          "Expect a direct question: strict equality is ===."
        ]},
        { id:"promises", title:"Promises and async/await", bullets:[
          "then/catch queue microtasks; await pauses only the async function.",
          "Promise.all waits for all to fulfill or rejects fast on the first error.",
          "Use Promise.allSettled for per-result status."
        ], tips:[
          "“await blocks the event loop” is false.",
          "Know the difference between Promise.all and Promise.allSettled."
        ]}
      ],
      quiz: [
        { id: 1, type: "single", concept:"arrays.map", question: "Which method returns a new array without mutating the original?", choices: ["forEach", "map", "reduce", "sort"], answer: "map", explain:"map creates a new array from return values; forEach returns void and sort mutates in-place." },
        { id: 2, type: "multi", concept:"primitives", question: "Select all primitive types in JavaScript.", choices: ["string", "object", "number", "boolean", "array", "symbol"], answer: ["string","number","boolean","symbol"], explain:"Objects and arrays are reference types; primitives include string, number, boolean, null, undefined, bigint, symbol." },
        { id: 3, type: "single", concept:"let_const", question: "Which keyword declares a block-scoped variable?", choices: ["var","let","with","static"], answer: "let", explain:"let and const are block-scoped; var is function-scoped and hoisted." },
        { id: 4, type: "single", concept:"this_binding", question: "In a method call obj.fn(), the value of this inside fn is typically:", choices:["window (strict mode)","obj","undefined always","the prototype"], answer:"obj", explain:"The call-site sets this; in obj.fn() it’s obj unless bound/arrow function changes it." },
        { id: 5, type: "single", concept:"equality", question:"Which operator checks value and type equality?", choices:["==","===","=","!=="], answer:"===", explain:"=== is strict equality; == coerces types; = is assignment." },
        { id: 6, type: "multi", concept:"async_promises", question:"Which statements about Promises are true?", choices:["Promise.then queues microtasks","await blocks the event loop","Promise.all settles when all settle","catch handles rejections"], answer:["Promise.then queues microtasks","Promise.all settles when all settle","catch handles rejections"], explain:"await pauses the async function but not the event loop; .then queues microtasks; Promise.all waits for all or rejects early." }
      ]
    },
    {
      id: "py-201",
      title: "Python for Data Analysis",
      category: "Tech",
      instructor: "Mina Patel",
      rating: 4.6,
      lessons: 55,
      duration: "10h",
      desc: "Load, clean, analyze, and visualize datasets using pandas and NumPy with practical labs.",
      resources: [
        {type:"Notebook", label:"Pandas Basics.ipynb", url:"https://nibmehub.com/opac-service/pdf/read/Python%20for%20Data%20Analysis%20_%20data%20wrangling%20with%20Pandas-%20NumPy-%20and%20IPython.pdf"},
        {type:"CSV", label:"NYC Taxi Sample", url:"https://www.clcoding.com/2023/11/python-programming-for-data-analysis.html"}
      ],
      path: [
        {id:"py-frames", title:"DataFrame basics", summary:"What DataFrames are and how to inspect them.", note:"df"},
        {id:"py-index", title:"Indexing & selection", summary:"loc/iloc and boolean filters.", note:"index"},
        {id:"py-na", title:"Missing values & groups", summary:"dropna/fillna and groupby/agg.", note:"na"}
      ],
      notes: [
        { id:"df", title:"DataFrame essentials", bullets:[
          "DataFrame = tabular data with labeled columns and an index.",
          "shape -> (rows, cols); info() shows dtypes and null counts."
        ], tips:[
          "Remember shape is a (rows, cols) tuple."
        ]},
        { id:"index", title:"Indexing and selection", bullets:[
          "loc uses labels; iloc uses integer positions.",
          "Prefer .loc/.iloc over chained indexing."
        ], tips:[
          "Quiz will likely ask label vs position — loc vs iloc."
        ]},
        { id:"na", title:"Missing values", bullets:[
          "dropna removes rows/cols with NA; fillna imputes values.",
          "isna()/notna() help build masks."
        ], tips:[
          "For multi-select, dropna and fillna are right; astype/merge are not."
        ]}
      ],
      quiz: [
        { id: 1, type:"single", concept:"pandas_core", question:"Which library is primarily used for DataFrames?", choices:["matplotlib","numpy","pandas","scipy"], answer:"pandas", explain:"pandas provides Series and DataFrame; NumPy offers ndarray but not tabular labels." },
        { id: 2, type:"single", concept:"df_shape", question:"What does df.shape return?", choices:["columns only","rows only","(rows, cols)","memory size"], answer:"(rows, cols)", explain:"shape is a tuple with number of rows then columns." },
        { id: 3, type:"multi", concept:"na_handling", question:"Common ways to handle missing data:", choices:["dropna","fillna","astype","merge"], answer:["dropna","fillna"], explain:"dropna removes and fillna imputes; astype casts dtypes; merge joins frames." },
        { id: 4, type:"single", concept:"indexing", question:"Label-based selection uses:", choices:["iloc","loc","at position","ix only"], answer:"loc", explain:"loc uses labels; iloc uses integer positions." },
        { id: 5, type:"single", concept:"groupby", question:"Which operation follows groupby to aggregate?", choices:["pipe","apply","agg","stack"], answer:"agg", explain:"agg computes reductions per group; apply allows custom functions but agg is typical for aggregations." }
      ]
    },
    {
      id: "ux-110",
      title: "Intro to UX Design",
      category: "Creative",
      instructor: "Jae Kim",
      rating: 4.5,
      lessons: 30,
      duration: "6h",
      desc: "Learn research, wireframing, and usability testing to craft delightful user experiences. Enroll now!",
      resources: [{type:"PDF", label:"Heuristics Poster", url:"https://bpb-eu-w2.wpmucdn.com/sites.aub.edu.lb/dist/c/13/files/2019/06/the-basics-of-ux-design.pdf"}],
      path: [
        {id:"ux-heuristics", title:"Nielsen heuristics", summary:"Ten usability heuristics and when to apply them.", note:"heuristics"},
        {id:"ux-testing", title:"Usability testing", summary:"Planning, recruiting, and running small tests.", note:"testing"}
      ],
      notes: [
        { id:"heuristics", title:"Nielsen’s heuristics", bullets:[
          "Ten rules including visibility, match to real world, user control, consistency, error prevention, minimalist design, and help.",
          "Use them as a checklist when evaluating UIs."
        ], tips:[
          "“Unlimited customization” is not a heuristic."
        ]},
        { id:"testing", title:"Usability testing basics", bullets:[
          "Test with around 5–7 users per cycle.",
          "Observe silently, avoid leading questions, and keep tasks consistent."
        ], tips:[
          "Good answers mention small samples and avoiding leading questions."
        ]}
      ],
      quiz: [
        { id: 1, type:"single", concept:"heuristics", question:"Which is NOT a Nielsen heuristic?", choices:["Visibility of system status","Match between system and real world","Aesthetic minimalism","Unlimited customization"], answer:"Unlimited customization", explain:"Heuristics advocate simplicity and feedback; unlimited customization isn’t one." },
        { id: 2, type:"single", concept:"affordance", question:"A door handle suggesting pull is an example of:", choices:["Affordance","Mapping","Feedback","Constraint"], answer:"Affordance", explain:"Affordances are action possibilities perceptible by users." },
        { id: 3, type:"multi", concept:"testing", question:"Good usability test practices:", choices:["Test with 5–7 users","Ask leading questions","Observe silently","Change tasks mid-test"], answer:["Test with 5–7 users","Observe silently"], explain:"Avoid leading questions and keep tasks consistent between sessions." }
      ]
    },
    {
      id: "photo-120",
      title: "Mobile Photography",
      category: "Creative",
      instructor: "Sara Ahmed",
      rating: 4.4,
      lessons: 24,
      duration: "5h",
      desc: "Shoot, edit, and publish captivating photos with just a smartphone.",
      resources: [{type:"Pack", label:"LUT Presets", url:"https://www.mhklibrary.org/wp-content/uploads/2019/01/Smartphone-Photography.pdf"}],
      path: [
        {id:"ph-exposure", title:"Exposure triangle", summary:"Aperture, shutter speed, ISO trade-offs.", note:"exposure"},
        {id:"ph-compose", title:"Composition", summary:"Rule of thirds, leading lines, and clean backgrounds.", note:"composition"}
      ],
      notes: [
        { id:"exposure", title:"Exposure triangle quickview", bullets:[
          "Aperture affects depth of field; shutter affects motion blur; ISO affects noise.",
          "Phones emulate aperture through modes like portrait."
        ], tips:[
          "Depth-of-field questions target aperture, not ISO."
        ]},
        { id:"composition", title:"Composition tips", bullets:[
          "Use rule of thirds and leading lines to guide attention.",
          "Simplify backgrounds; avoid clutter and crooked horizons."
        ], tips:[
          "“Always use dutch angle” is a trap; it’s not a universal rule."
        ]}
      ],
      quiz: [
        { id: 1, type:"single", concept:"exposure", question:"Which factor affects depth of field?", choices:["Aperture","ISO","White balance","Histogram"], answer:"Aperture", explain:"Wider apertures (lower f-number) yield shallower depth of field." },
        { id: 2, type:"single", concept:"stability", question:"To reduce blur at night without tripod you should:", choices:["Lower ISO","Use longer shutter","Use stabilization and burst","Close aperture more"], answer:"Use stabilization and burst", explain:"Stabilization and bursts increase sharp frames; longer shutter increases blur." },
        { id: 3, type:"multi", concept:"composition", question:"Composition tips:", choices:["Rule of thirds","Dutch angle always","Leading lines","Clutter background"], answer:["Rule of thirds","Leading lines"], explain:"Avoid clutter and special angles unless intentional." }
      ]
    },
    {
      id: "pm-101",
      title: "Project Management Basics",
      category: "Business",
      instructor: "Rohan Singh",
      rating: 4.3,
      lessons: 28,
      duration: "5h",
      desc: "Grasp scope, time, and cost fundamentals with Agile and Kanban introductions.",
      resources: [{type:"Template", label:"Risk Register", url:"https://go.teamleader.eu/hubfs/Content%20Kit%20Campaigns/CK1%20-%20Project%20Management/Ebooks/HQ_Ebook_CK1_Projectmanagement.pdf"}],
      path: [
        {id:"pm-triple", title:"Triple constraint", summary:"Managing scope, time, and cost together.", note:"triple"},
        {id:"pm-kanban", title:"Kanban flow", summary:"Visualizing work and limiting WIP.", note:"kanban"}
      ],
      notes: [
        { id:"triple", title:"Triple constraint", bullets:[
          "Scope, time, and cost form a triangle; changing one affects the others.",
          "Quality is influenced by how you balance them."
        ], tips:[
          "For constraints, pick Scope, Time, Cost — not revenue."
        ]},
        { id:"kanban", title:"Kanban essentials", bullets:[
          "Visualize work, limit Work-In-Progress, and measure flow.",
          "Make policies explicit and improve continuously."
        ], tips:[
          "For “what do we limit to improve flow?”, answer WIP."
        ]}
      ],
      quiz: [
        { id: 1, type:"multi", concept:"triple_constraint", question:"Key constraints in PM are:", choices:["Scope","Revenue","Time","Cost"], answer:["Scope","Time","Cost"], explain:"The classic triple constraint balances scope, time, and cost." },
        { id: 2, type:"single", concept:"kanban_wip", question:"Kanban boards limit what to improve flow?", choices:["Budget","WIP","Headcount","Story points"], answer:"WIP", explain:"Limiting Work-In-Progress reveals bottlenecks and improves throughput." },
        { id: 3, type:"single", concept:"stakeholders", question:"Primary reason for a stakeholder register:", choices:["Track bugs","List people and influence","Store code reviews","Calculate taxes"], answer:"List people and influence", explain:"It identifies stakeholders, roles, interests, and influence for communication planning." }
      ]
    },
    {
      id: "mkt-140",
      title: "Digital Marketing 101",
      category: "Business",
      instructor: "Lena Ortiz",
      rating: 4.2,
      lessons: 20,
      duration: "4h",
      desc: "SEO, SEM, content strategy, and analytics essentials for beginners.",
      resources: [{type:"Link", label:"UTM Builder", url:"https://www.equinetacademy.com/wp-content/uploads/Digital-Marketing-Fundamentals-Learners-Guide-SAMPLE.pdf"}],
      path: [
        {id:"mk-seo", title:"SEO basics", summary:"How search engines evaluate pages.", note:"seo"},
        {id:"mk-utm", title:"Tracking with UTM", summary:"Source, medium, and campaign tagging.", note:"utm"}
      ],
      notes: [
        { id:"seo", title:"SEO basics", bullets:[
          "SEO optimizes for relevance, crawlability, and authority.",
          "Use descriptive titles/meta and semantic HTML."
        ], tips:[
          "SEO stands for Search Engine Optimization."
        ]},
        { id:"utm", title:"UTM parameters", bullets:[
          "utm_source (origin), utm_medium (channel), utm_campaign (initiative).",
          "Consistent naming keeps analytics clean."
        ], tips:[
          "Expect utm_source as the answer when asked which holds origin."
        ]}
      ],
      quiz: [
        { id: 1, type:"single", concept:"seo_term", question:"What does SEO stand for?", choices:["Search Engine Optimization","Social Engagement Outreach","Site Enhancement Ops","Search Email Optimization"], answer:"Search Engine Optimization", explain:"SEO is optimizing content and site for organic search visibility." },
        { id: 2, type:"single", concept:"utm", question:"Which UTM field identifies the high‑level source?", choices:["utm_medium","utm_campaign","utm_source","utm_term"], answer:"utm_source", explain:"utm_source captures origin like google, newsletter, or referral site." },
        { id: 3, type:"multi", concept:"kpis", question:"Common top‑funnel KPIs:", choices:["CTR","Conversion rate","Impressions","Brand lift"], answer:["CTR","Impressions","Brand lift"], explain:"Top‑funnel focuses on reach and interest; conversions are lower‑funnel." }
      ]
    }
  ];

  // thumbnails
  manit_state.courses.forEach(c => { if(!c.image){ c.image = manit_thumbFor(c); } });
}

/* ---------- Progress helpers ---------- */
function manit_loadProgress(){
  try{
    const raw = localStorage.getItem(MANIT_PROGRESS_KEY);
    manit_progress = raw ? JSON.parse(raw) : {};
  }catch{ manit_progress = {}; }
}
function manit_saveProgress(){
  try{ localStorage.setItem(MANIT_PROGRESS_KEY, JSON.stringify(manit_progress)); }catch{}
}
function manit_courseProgress(courseId){
  const course = manit_state.courses.find(c => c.id === courseId);
  if(!course) return {done:0, total:0, all:false};
  const set = new Set(manit_progress[courseId] || []);
  const total = (course.path || []).length;
  const done = Math.min(set.size, total);
  return {done, total, all: total > 0 && done === total};
}
function manit_markModule(courseId, moduleId, checked){
  const set = new Set(manit_progress[courseId] || []);
  if(checked) set.add(moduleId); else set.delete(moduleId);
  manit_progress[courseId] = [...set];
  manit_saveProgress();
}

/* ---------- Quiz stats (for Profile) ---------- */
const MANIT_QUIZ_STATS_KEY = "edusphere_quiz_stats_v1";

function manit_loadQuizStats(){
  try{
    const raw = localStorage.getItem(MANIT_QUIZ_STATS_KEY);
    return raw ? JSON.parse(raw) : { taken:0, sumPct:0, best:0 };
  }catch{
    return { taken:0, sumPct:0, best:0 };
  }
}
function manit_saveQuizStats(stats){
  try{ localStorage.setItem(MANIT_QUIZ_STATS_KEY, JSON.stringify(stats)); }catch{}
}

function manit_updateQuizStats(correct, total){
  if(total <= 0) return;
  const pct = (correct/total)*100;

  const stats = manit_loadQuizStats();
  stats.taken  = (stats.taken || 0) + 1;
  stats.sumPct = (stats.sumPct || 0) + pct;
  stats.best   = Math.max(stats.best || 0, pct);

  manit_saveQuizStats(stats);
}

function manit_getQuizSummary(){
  const s = manit_loadQuizStats();
  if(!s.taken) return { count:0, avg:0, best:0 };
  const avg = s.sumPct / s.taken;
  return {
    count:s.taken,
    avg:Math.round(avg),
    best:Math.round(s.best || 0)
  };
}

function manit_renderProfileMetrics(){
  const elCount = document.getElementById("profile-metric-quizzes");
  const elAvg   = document.getElementById("profile-metric-avg");
  const elBest  = document.getElementById("profile-metric-best");
  if(!elCount || !elAvg || !elBest) return;

  const stats = manit_getQuizSummary();
  elCount.textContent = stats.count;
  elAvg.textContent   = stats.avg  + "%";
  elBest.textContent  = stats.best + "%";
}

/* ---------- Branding ---------- */
function manit_logoDataUri(){
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#5624d0'/><stop offset='1' stop-color='#a435f0'/></linearGradient></defs>
    <rect x='6' y='6' width='116' height='116' rx='22' fill='url(#g)'/>
    <text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle' font-family='Segoe UI, Roboto, Arial' font-size='56' font-weight='700' fill='white' letter-spacing='1'>ES</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
const manit_catColors = {
  Tech:{bg:"#1b2a4a", fg:"#9ec3ff"},
  Creative:{bg:"#2a1b3c", fg:"#e6b6ff"},
  Business:{bg:"#1b3c2a", fg:"#b8f7d0"},
  Default:{bg:"#2a2f3a", fg:"#e6e6e6"}
};
function manit_thumbFor(course){
  const {bg, fg} = manit_catColors[course.category] || manit_catColors.Default;
  const title = course.title.length > 22 ? course.title.slice(0,21) + "…" : course.title;
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'>
    <defs><linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${bg}'/><stop offset='1' stop-color='#0a0d14'/></linearGradient></defs>
    <rect width='640' height='360' rx='16' fill='url(#grad)'/>
    <circle cx='84' cy='84' r='44' fill='${fg}' opacity='0.18'/>
    <circle cx='560' cy='300' r='56' fill='${fg}' opacity='0.12'/>
    <rect x='40' y='220' width='360' height='16' rx='8' fill='${fg}' opacity='0.2'/>
    <text x='40' y='160' font-family='Segoe UI, Roboto, Arial' font-weight='700' font-size='36' fill='${fg}'>${title}</text>
    <text x='40' y='190' font-family='Segoe UI, Roboto, Arial' font-size='18' fill='${fg}' opacity='0.8'>${course.category} • ${course.duration}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- Helpers ---------- */
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
function manit_setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }

/* Nav auth + visibility */
function manit_updateNavAuth(){
  const loggedIn  = !!manit_state.user;

  const nav = document.getElementById("app-nav");
  if (nav) nav.classList.toggle("hidden", !loggedIn);

  const navLogin  = document.getElementById("nav-login");
  const navLogout = document.getElementById("nav-logout");

  if (navLogin)  navLogin.classList.toggle("hidden",  loggedIn);
  if (navLogout) navLogout.classList.toggle("hidden", !loggedIn);
}

/* Theme toggle */
function manit_applyTheme(theme){
  const body = document.body;
  const btn  = document.getElementById("nav-theme");

  if (theme === "alt"){
    body.classList.add("theme-alt");    // light chrome
    if (btn) btn.textContent = "Dark";
  }else{
    body.classList.remove("theme-alt"); // dark (default)
    if (btn) btn.textContent = "Light";
  }

  try{ localStorage.setItem(MANIT_THEME_KEY, theme); }catch{}
}

function manit_toggleTheme(){
  const nowAlt = !document.body.classList.contains("theme-alt");
  manit_applyTheme(nowAlt ? "alt" : "default");
}

/* Modal: text and rich HTML */
function manit_showModal(title, body){
  manit_setText("modal-title", title);
  const b = $("#modal-body"); b.textContent = body;
  $("#modal-content").classList.remove("wide");
  $("#modal").classList.remove("hidden");
  $("#modal .primary")?.focus();
}
function manit_showRichModal(title, html, {wide=true}={}){
  manit_setText("modal-title", title);
  const b = $("#modal-body"); b.innerHTML = html;
  $("#modal-content").classList.toggle("wide", !!wide);
  $("#modal").classList.remove("hidden");
  $("#modal .primary")?.focus();
}
function manit_closeModal(){
  $("#modal")?.classList.add("hidden");
  const b = $("#modal-body"); if(b) b.innerHTML = "";
  $("#modal-content")?.classList.remove("wide");
}

/* ---------- Views ---------- */
function manit_showView(key){
  const map = {
    login:"view-login",
    catalog:"view-catalog",
    course:"view-course",
    quiz:"view-quiz",
    leaderboard:"view-leaderboard",
    profile:"view-profile" 
  };
  Object.values(map).forEach(id => $("#"+id)?.classList.add("hidden"));
  const showId = map[key] ?? "view-login";
  $("#"+showId)?.classList.remove("hidden");
  const view = $("#"+showId);
  view?.scrollIntoView({behavior:"smooth", block:"start"});
  const heading = view?.querySelector("h2, h3, h1");
  heading?.setAttribute("tabindex","-1");
  heading?.focus({preventScroll:true});

  // when opening catalog or after quiz, refresh streak
 if (showId === "view-catalog") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}

/* ---------- Auth ---------- */
function manit_handleLogin(e){
  e.preventDefault();
  const username = $("#username").value.trim();
  const email    = $("#email").value.trim();
  const password = $("#password").value;

  if(username.length < 4){
    manit_showModal("Login error", "Username must be at least 4 characters.");
    return;
  }
  if(!email.includes("@") || !email.includes(".")){
    manit_showModal("Login error", "Please enter a valid email address.");
    return;
  }
  if(!password || password.length < 6){
    manit_showModal("Login error", "Password must be at least 6 characters.");
    return;
  }

  // set current auth user
  manit_state.user = { username, email, ts: Date.now() };
  localStorage.setItem("edusphere_user", JSON.stringify(manit_state.user));

  // ----- profile seeding / switching logic -----
  const existing = manit_loadProfile();
  let profile;

  if (existing && existing.username === username && existing.email === email){
    // same user logging in again -> keep their custom details
    profile = {
      username,
      email,
      fullName: existing.fullName || username,
      bio:      existing.bio      || "",
      avatar:   existing.avatar   || null,
      ts:       manit_state.user.ts
    };
  } else {
    // new / different user -> start fresh profile from login info
    profile = {
      username,
      email,
      fullName: username,
      bio: "",
      avatar: null,
      ts: manit_state.user.ts
    };
  }

  localStorage.setItem(MANIT_PROFILE_KEY, JSON.stringify(profile));
  manit_renderProfileView();
  // --------------------------------------------

  manit_updateNavAuth();
  manit_renderCatalog();
  const fc = document.getElementById("filter-category");
  if(fc) fc.value = "All";
  manit_showView("catalog");
  manit_showModal("Welcome to EduSphere", `Signed in as ${username}.`);

  manit_updateStreakBanner();
}



/* ---------- Catalog ---------- */
function manit_renderCatalog(){
  const grid = $("#course-grid");
  if(!grid) return;

  const cat = $("#filter-category")?.value ?? "All";
  const list = manit_state.courses.filter(c => (cat==="All" ? true : c.category === cat));

  grid.innerHTML = "";
  if(list.length === 0){
    grid.innerHTML = `<div class="card">No courses match this filter.</div>`;
    return;
  }

  for(const c of list){
    const el = document.createElement("article");
    el.className = "course";
    el.dataset.id = c.id;
    el.innerHTML = `
      <img class="thumb" src="${c.image}" alt="${c.title} thumbnail" loading="lazy" decoding="async" />
      <h3>${c.title}</h3>
      <div class="meta">${c.instructor} • ${c.category} • ${c.duration}</div>
      <div class="badges">
        <span class="badge">★ ${c.rating}</span>
        <span class="badge">${c.lessons} lessons</span>
      </div>
      <p>${c.desc}</p>
      <div class="actions">
        <button class="secondary" data-id="${c.id}" aria-label="Open ${c.title} overview">Overview</button>
        <button class="primary" data-id="${c.id}" aria-label="Start ${c.title} quiz">Start Quiz</button>
      </div>
    `;
    const [btnOverview, btnQuiz] = el.querySelectorAll("button");
    btnOverview.addEventListener("click", (e) => { e.stopPropagation(); manit_loadCourse(c.id); });
    btnQuiz.addEventListener("click", (e) => { e.stopPropagation(); manit_loadCourse(c.id); manit_startQuiz(); });
    el.addEventListener("click", () => manit_loadCourse(c.id));
    grid.appendChild(el);
  }
}
function manit_filterCourses(){ manit_renderCatalog(); }

/* ---------- Course Overview ---------- */
function manit_loadCourse(courseId){
  const course = manit_state.courses.find(c => c.id === courseId) ?? manit_state.courses[0];
  if(!course) return;
  manit_state.selectedCourseId = course.id;

  manit_setText("course-title", course.title);
  manit_setText("course-desc", course.desc);
  manit_setText("course-instructor", `Instructor: ${course.instructor} • ${course.category} • ★ ${course.rating}`);

  const res = $("#course-resources");
  res.innerHTML = "";
  for(const r of course.resources){
    const a = document.createElement("a");
    a.href = r.url; a.target = "_blank"; a.rel="noopener";
    a.textContent = `${r.type}: ${r.label}`;
    res.appendChild(a);
  }

  const notesBox = $("#course-notes");
  notesBox.innerHTML = "";
  if(Array.isArray(course.notes) && course.notes.length){
    for(const n of course.notes){
      const a = document.createElement("a");
      a.href = "javascript:void(0)";
      a.className = "note-link";
      a.innerHTML = `<span class="tag">Study</span> ${n.title}`;
      a.addEventListener("click", () => manit_openNotes(course.id, n.id));
      notesBox.appendChild(a);
    }
  }

  const outline = $("#course-outline");
  outline.innerHTML = "";
  const progress = new Set(manit_progress[course.id] || []);
  (course.path || []).forEach(mod => {
    const li = document.createElement("li");
    li.className = "module";
    li.innerHTML = `
      <label class="module-check">
        <input type="checkbox" ${progress.has(mod.id) ? "checked" : ""} aria-label="Mark '${mod.title}' complete" />
        <span class="module-icon"></span>
      </label>
      <div class="module-main">
        <div class="module-title">${mod.title}</div>
        <div class="module-meta">${mod.summary}</div>
      </div>
      <button class="module-notes" type="button">Demo notes (PDF)</button>
    `;
    const [checkWrap, , btnNotes] = li.children;
    const chk = checkWrap.querySelector("input");

    if (chk.checked) li.classList.add("is-done");

    chk.addEventListener("change", () => {
      manit_markModule(course.id, mod.id, chk.checked);
      li.classList.toggle("is-done", chk.checked);
      manit_updateCourseProgressUI(course.id);
    });

    btnNotes.addEventListener("click", () => {
      if(mod.note){ manit_openNotes(course.id, mod.note); }
      else{ manit_showModal("Notes", "Demo notes for this module will be available soon."); }
    });
    outline.appendChild(li);
  });

  manit_updateCourseProgressUI(course.id);
  manit_showView("course");
}
function manit_updateCourseProgressUI(courseId){
  const {done, total} = manit_courseProgress(courseId);
  const msg = $("#course-progress-msg");
  msg.textContent = total ? `Progress: ${done}/${total} modules completed` : "";
  const btn = $("#start-quiz-btn");
  if(btn){ btn.disabled = false; }
}

/* Pop-up notes */
function manit_openNotes(courseId, noteId){
  const course = manit_state.courses.find(c => c.id === courseId);
  if(!course) return;
  const note = (course.notes || []).find(n => n.id === noteId);
  if(!note) return;

  const bullets = (note.bullets || []).map(x => `<li>${x}</li>`).join("");
  const tips    = (note.tips || []).map(x => `<li>${x}</li>`).join("");

  const html = `
    <div class="notes">
      <h4>${course.title}: ${note.title}</h4>
      <p>Core ideas</p>
      <ul>${bullets}</ul>
      <div class="important">
        <strong>Important for the quiz</strong>
        <ul>${tips}</ul>
      </div>
      <div class="actions">
        <button class="primary" onclick="manit_closeModal()">Close</button>
        <button class="secondary" onclick="manit_closeModal(); manit_startQuiz();">Start Quiz</button>
      </div>
    </div>
  `;
  manit_showRichModal("Study Notes", html, {wide:true});
}

/* ---------- Leaderboard storage ---------- */
function manit_loadLeaderboard(){
  try{
    const raw = localStorage.getItem(MANIT_LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch{
    return [];
  }
}
function manit_saveLeaderboard(list){
  try{ localStorage.setItem(MANIT_LEADERBOARD_KEY, JSON.stringify(list)); }catch{}
}
function manit_awardQuizPoints(correct, total){
  if(!manit_state.user) return;
  const gained = Math.max(0, Math.round((correct/total)*100));

  let list = manit_loadLeaderboard();
  let entry = list.find(e => e.username === manit_state.user.username);
  if(!entry){
    entry = { username: manit_state.user.username, points: 0 };
    list.push(entry);
  }
  entry.points += gained;
  manit_saveLeaderboard(list);
  manit_renderLeaderboard();
}
function manit_renderLeaderboard(){
  const listEl = document.getElementById("leaderboard-list");
  if(!listEl) return;

  let list = manit_loadLeaderboard();
  if(list.length === 0){
    listEl.innerHTML = `<li class="leaderboard-row">No quiz points yet. Take a quiz to appear here.</li>`;
    return;
  }

  const selfName = manit_state.user?.username;
  list = list.slice().sort((a,b) => b.points - a.points);
  listEl.innerHTML = "";

  list.forEach((entry, idx) => {
    const li = document.createElement("li");
    const rank = idx + 1;
    let badgeHtml = "";
    if(rank === 1){
      badgeHtml = `<span class="leaderboard-badge"><span>🥇</span>Top performer</span>`;
    }else if(rank === 2){
      badgeHtml = `<span class="leaderboard-badge"><span>🥈</span>Second place</span>`;
    }else if(rank === 3){
      badgeHtml = `<span class="leaderboard-badge"><span>🥉</span>Third place</span>`;
    }

    li.className = "leaderboard-row" + (entry.username === selfName ? " is-self" : "");
    li.innerHTML = `
      <div class="leaderboard-rank">${rank}</div>
      <div class="leaderboard-main">
        <div class="leaderboard-name">${entry.username}</div>
        <div class="leaderboard-points">${entry.points} pts</div>
      </div>
      ${badgeHtml}
    `;
    listEl.appendChild(li);
  });
}

/* ---------- Streak logic ---------- */
function manit_loadStreak(){
  try{
    const raw = localStorage.getItem(MANIT_STREAK_KEY);
    // include per-day activity map
    return raw ? JSON.parse(raw) : { current:0, best:0, lastDate:null, days:{} };
  }catch{
    return { current:0, best:0, lastDate:null, days:{} };
  }
}
function manit_saveStreak(data){
  try{ localStorage.setItem(MANIT_STREAK_KEY, JSON.stringify(data)); }catch{}
}

function manit_recordQuizDay(){
  const todayStr = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const s = manit_loadStreak();
  if(!s.days) s.days = {};

  // mark today as active (this is what drives the calendar colors)
  s.days[todayStr] = true;

  // update streak counters
  if(s.lastDate !== todayStr){
    if(!s.lastDate){
      s.current = 1;
    }else{
      const last  = new Date(s.lastDate);
      const today = new Date(todayStr);
      const diff  = (today - last)/(1000*60*60*24);
      if(diff === 1){
        s.current += 1;
      }else{
        s.current = 1;
      }
    }
    if(s.current > s.best) s.best = s.current;
    s.lastDate = todayStr;
  }

  manit_saveStreak(s);
  manit_updateStreakBanner();
}

function manit_updateStreakBanner(){
  const banner = document.getElementById("streak-banner");
  if(!banner) return;
  const s = manit_loadStreak();
  if(!s.days) s.days = {};

  const totalActive = Object.keys(s.days).length;
  const today    = new Date();
  const todayStr = today.toISOString().slice(0,10);

  let last30 = 0;
  for(const iso of Object.keys(s.days)){
    const d = new Date(iso);
    const diff = (today - d)/(1000*60*60*24);
    if(diff >= 0 && diff < 30) last30++;
  }

  banner.classList.remove("hidden");
  manit_setText("streak-current", s.current || 0);
  manit_setText("streak-best", s.best || 0);
  manit_setText("streak-total", totalActive || 0);

  if(!s.lastDate){
    manit_setText("streak-description", "Complete a quiz today to start your streak.");
  }else if(s.lastDate === todayStr){
    manit_setText("streak-description", "Nice! You’ve kept your streak alive today.");
  }else{
    manit_setText("streak-description", "You missed a day—start again to build your streak.");
  }
}

function manit_openStreakModal(){
  const s = manit_loadStreak();
  if(!s.days) s.days = {};

  const today    = new Date();
  const todayStr = today.toISOString().slice(0,10);

  // build set of dates that form the current streak
  const streakSet = new Set();
  if(s.current > 0 && s.lastDate){
    let d = new Date(s.lastDate);
    for(let i=0;i<s.current;i++){
      const iso = d.toISOString().slice(0,10);
      if(s.days[iso]) streakSet.add(iso);
      d.setDate(d.getDate() - 1);
    }
  }

  // 12 weeks of days ending today
  const days = [];
  for(let i=83;i>=0;i--){
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0,10);
    days.push({
      iso,
      label: d.getDate(),
      dow: d.getDay(),
      active: !!s.days[iso],
      today: iso === todayStr,
      inStreak: streakSet.has(iso)
    });
  }

  const totalActive = Object.keys(s.days).length;
  let last30 = 0;
  for(const iso of Object.keys(s.days)){
    const d = new Date(iso);
    const diff = (today - d)/(1000*60*60*24);
    if(diff >= 0 && diff < 30) last30++;
  }

  const dowLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let gridHtml = "";

  dowLabels.forEach(d => {
    gridHtml += `<div class="dow">${d}</div>`;
  });

  days.forEach(cell => {
    const classes = ["streak-cell"];
    if(cell.active)   classes.push("has-activity");
    if(cell.inStreak) classes.push("in-streak");
    if(cell.today)    classes.push("today");
    gridHtml += `<div class="${classes.join(" ")}">${cell.label}</div>`;
  });

  const html = `
    <div class="streak-calendar">
      <div>
        <h4>🔥 Your Activity Streak Calendar</h4>
        <p>Track your daily learning over the last 12 weeks.</p>
      </div>
      <div class="streak-grid-wrapper">
        <div class="streak-grid">
          ${gridHtml}
        </div>
      </div>
      <div class="streak-footer-stats">
        <div class="streak-footer-card">
          <div class="label">Current streak</div>
          <div class="value">${s.current || 0}</div>
        </div>
        <div class="streak-footer-card">
          <div class="label">Longest streak</div>
          <div class="value">${s.best || 0}</div>
        </div>
        <div class="streak-footer-card">
          <div class="label">Total active days</div>
          <div class="value">${totalActive}</div>
        </div>
        <div class="streak-footer-card">
          <div class="label">Active last 30 days</div>
          <div class="value">${last30}</div>
        </div>
      </div>
    </div>
  `;

  const panel = document.getElementById("streak-panel");
  const inner = document.getElementById("streak-panel-inner");
  if (!panel || !inner) return;

  inner.innerHTML = `
    <div class="streak-panel-header">
      <h3>Streak Calendar</h3>
      <button class="secondary streak-panel-close" type="button" onclick="manit_closeStreakPanel()">✕</button>
    </div>
    ${html}
  `;
  panel.classList.remove("hidden");
  panel.classList.add("is-open");
}

function manit_closeStreakPanel(){
  const panel = document.getElementById("streak-panel");
  if(!panel) return;
  panel.classList.remove("is-open");
  // after slide-out, hide completely
  setTimeout(() => panel.classList.add("hidden"), 200);
}


/* ---------- Quiz ---------- */
function manit_startQuiz(){
  const course = manit_getSelectedCourse();
  if(!course){
    manit_showModal("Select a course", "Open a course from the catalog to start its quiz.");
    return;
  }

  manit_setText("quiz-title", "Quiz");
  manit_setText("quiz-course", course.title);

  const form = $("#quiz-form");
  form.innerHTML = "";

  course.quiz.forEach((q, idx) => {
    const fs = document.createElement("fieldset");
    const lg = document.createElement("legend");
    lg.textContent = `Q${idx+1}. ${q.question}`;
    fs.appendChild(lg);

    const name = `q-${q.id}`;
    const multi = q.type === "multi";

    q.choices.forEach(choice => {
      const wrap = document.createElement("label");
      wrap.className = "option";
      const input = document.createElement("input");
      input.type = multi ? "checkbox" : "radio";
      input.name = name;
      input.value = choice;
      if(!multi) input.required = true;

      const span = document.createElement("span");
      span.textContent = choice;

      wrap.appendChild(input);
      wrap.appendChild(span);
      fs.appendChild(wrap);
    });

    fs.dataset.answer = JSON.stringify(q.answer);
    fs.dataset.multi = String(q.type === "multi");
    fs.dataset.concept = q.concept || "";
    fs.dataset.explain = q.explain || "";
    form.appendChild(fs);
  });

  const fb = $("#quiz-feedback");
  fb.classList.add("hidden");
  fb.innerHTML = "";

  manit_showView("quiz");
}
function manit_resetQuizUI(){
  const form = $("#quiz-form");
  $$("fieldset", form).forEach(fs => {
    $$(".option", fs).forEach(o => o.classList.remove("is-correct","is-wrong","is-missed"));
    $$(".answer-key", fs).forEach(n => n.remove());
  });
}
function manit_submitQuiz(){
  const form = $("#quiz-form");
  const fieldsets = $$("fieldset", form);
  if(fieldsets.length === 0){
    manit_showModal("No questions", "This quiz has no questions configured.");
    return;
  }

  manit_resetQuizUI();

  let correct = 0;
  const mistakes = [];

  for(const fs of fieldsets){
    const multi    = fs.dataset.multi === "true";
    const expected = JSON.parse(fs.dataset.answer);
    const concept  = fs.dataset.concept || "general";
    const explain  = fs.dataset.explain || "";

    const pickedInputs = multi ? $$("input[type=checkbox]:checked", fs) : $$("input[type=radio]:checked", fs);
    const picked = pickedInputs.map(i => i.value);

    const expSet  = new Set(Array.isArray(expected) ? expected : [expected]);
    const pickSet = new Set(picked);

    let thisCorrect = false;
    if(multi){
      thisCorrect = expSet.size === pickSet.size && [...expSet].every(v => pickSet.has(v));
    }else{
      thisCorrect = picked.length === 1 && pickSet.has([...expSet][0]);
    }
    if(thisCorrect) correct++; else mistakes.push({concept, explain});

    $$(".option", fs).forEach(wrap => {
      const val = $("input", wrap).value;
      const selected   = pickSet.has(val);
      const isExpected = expSet.has(val);
      if(isExpected && selected) wrap.classList.add("is-correct");
      else if(isExpected && !selected) wrap.classList.add("is-missed");
      else if(!isExpected && selected) wrap.classList.add("is-wrong");
    });

    const ak = document.createElement("div");
    ak.className = "answer-key";
    const ansText = Array.isArray(expected) ? expected.join(", ") : expected;
    ak.innerHTML = `<span class="label">Answer</span> ${ansText}`;
    fs.appendChild(ak);

    $$("input", fs).forEach(i => i.disabled = true);
  }

  const total = fieldsets.length;
  const pct   = Math.round((correct/total)*100);

  // award leaderboard points, update profile stats, and streak
  manit_awardQuizPoints(correct, total);
  manit_updateQuizStats(correct, total);
  manit_renderProfileMetrics();
  manit_recordQuizDay();


  manit_showModal("Quiz submitted", `Score: ${correct}/${total} (${pct}%).`);

  // Build feedback from mistakes
  const fb = $("#quiz-feedback");
  fb.classList.remove("hidden");
  if(mistakes.length === 0){
    fb.innerHTML = `<h3>Suggested focus</h3><p>Excellent work—no weak areas detected on this attempt.</p>`;
  }else{
    const byConcept = new Map();
    for(const m of mistakes){
      if(!byConcept.has(m.concept)) byConcept.set(m.concept, {count:0, explain:m.explain});
      byConcept.get(m.concept).count++;
    }
    const items = [...byConcept.entries()]
      .sort((a,b)=>b[1].count - a[1].count)
      .map(([c,info]) => `<li><strong>${c}</strong>: ${info.explain || "Review this concept and retry."}</li>`)
      .join("");

    fb.innerHTML = `
      <h3>Suggested focus</h3>
      <p>These areas caused errors—review the notes and retry selected questions.</p>
      <ul>${items}</ul>
    `;
  }

  fb.scrollIntoView({behavior:"smooth", block:"start"});
}

/* ---------- Session ---------- */
function manit_logout(){
  localStorage.removeItem("edusphere_user");
  manit_state.user = null;
  manit_state.selectedCourseId = null;

  manit_updateNavAuth();
  manit_renderLeaderboard();      // remove self highlight if present
  manit_showView("login");
}

function manit_getSelectedCourse(){
  if(!manit_state.selectedCourseId) return null;
  return manit_state.courses.find(c => c.id === manit_state.selectedCourseId) ?? null;
}

/* ---------- Visual Effects ---------- */
function manit_mountStudyOrbs(){
  if(document.querySelector('.study-orbs')) return;

  const icons = ["✏️","📚","🧠","💡","📝","📘","🎧","📊"];
  const container = document.createElement('div');
  container.className = 'study-orbs';

  const ORB_COUNT = 9;
  for(let i=0;i<ORB_COUNT;i++){
    const size  = 50 + Math.random()*70;
    const x     = Math.random()*100;
    const y     = 10 + Math.random()*80;
    const drift = (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random()*20);
    const dur   = 22 + Math.random()*14;

    const el = document.createElement('span');
    el.className = 'orb';
    el.style.setProperty('--dur', dur+'s');
    el.style.setProperty('--drift', drift+'px');
    el.style.left   = x+'vw';
    el.style.top    = y+'vh';
    el.style.width  = size+'px';
    el.style.height = size+'px';

    const iconSpan = document.createElement('span');
    iconSpan.textContent = icons[Math.floor(Math.random()*icons.length)];
    el.appendChild(iconSpan);

    container.appendChild(el);
  }
  document.body.appendChild(container);
}

function manit_enableLoginTilt(){
  const card = document.querySelector('#view-login .card');
  if(!card) return;
  const update = (x, y) => {
    const rect = card.getBoundingClientRect();
    const px = Math.min(100, Math.max(0, ((x - rect.left)/rect.width)*100));
    const py = Math.min(100, Math.max(0, ((y - rect.top)/rect.height)*100));
    card.style.setProperty('--mx', px.toFixed(2));
    card.style.setProperty('--my', py.toFixed(2));
  };
  card.addEventListener('pointermove', e => update(e.clientX, e.clientY));
  card.addEventListener('pointerleave', () => { card.style.setProperty('--mx','50'); card.style.setProperty('--my','50'); });
  if(!card.querySelector('.bookmark')){
    const b = document.createElement('div');
    b.className = 'bookmark';
    card.appendChild(b);
  }
}

/* ---------- Init ---------- */
function manit_ensureSeed(){
  if(!Array.isArray(manit_state.courses) || manit_state.courses.length === 0){ manit_seedCourses(); }
}

function manit_boot(){
  manit_ensureSeed();
  manit_loadProgress();
  manit_renderProfileView();
  manit_renderProfileMetrics();




  // Inject logo
  const header = document.querySelector(".app-header");
  const h1 = header?.querySelector("h1");
  if(header && h1 && !header.querySelector(".brand-logo")){
    const img = new Image();
    img.src = manit_logoDataUri();
    img.alt = "EduSphere logo";
    img.className = "brand-logo";
    header.insertBefore(img, h1);
  }

  // restore user
  try{
    const raw = localStorage.getItem("edusphere_user");
    if(raw){ manit_state.user = JSON.parse(raw); }
  }catch{}

  // restore theme
  try{
    const theme = localStorage.getItem(MANIT_THEME_KEY) || "default";
    manit_applyTheme(theme);
  }catch{
    manit_applyTheme("default");
  }

  manit_updateNavAuth();

  if(manit_state.user){
    manit_renderCatalog();
    manit_showView("catalog");
  }else{
    manit_showView("login");
  }

  manit_renderCatalog();
  manit_renderLeaderboard();
  manit_updateStreakBanner();

  // Modal close with Esc
window.addEventListener("keydown", (e)=>{
  const modal = document.getElementById("modal");
  const panel = document.getElementById("streak-panel");

  if(e.key === "Escape"){
    if(panel && panel.classList.contains("is-open")){
      manit_closeStreakPanel();
    }else if(modal && !modal.classList.contains("hidden")){
      manit_closeModal();
    }
  }
});
  manit_mountStudyOrbs();
  manit_enableLoginTilt();
}

document.addEventListener("DOMContentLoaded", manit_boot);


function manit_closeStreakPanel(){
  const panel = document.getElementById("streak-panel");
  if(!panel) return;
  panel.classList.remove("is-open");
  setTimeout(() => panel.classList.add("hidden"), 200);
}


function manit_loadProfile(){
  try{
    const raw = localStorage.getItem(MANIT_PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch{
    return null;
  }
}

function manit_mergeUserProfile(){
  const baseUser = manit_state.user;
  const saved = manit_loadProfile() || {};
  if(!baseUser){
    // no logged-in user; just return whatever is saved
    return {
      username: saved.username || "",
      email: saved.email || "",
      fullName: saved.fullName || "",
      bio: saved.bio || "",
      avatar: saved.avatar || null,
      ts: saved.ts || null
    };
  }

  // logged-in user; base values from auth, extend with saved extras
  return {
    username: baseUser.username,
    email: baseUser.email,
    fullName: saved.fullName || baseUser.username,
    bio: saved.bio || "",
    avatar: saved.avatar || null,
    ts: baseUser.ts
  };
}

function manit_renderProfileView(){
  const profile = manit_mergeUserProfile();
  const hasUser = !!manit_state.user;

  const displayName = profile.fullName || profile.username || "Guest";
  const email       = profile.email || "Not signed in";

  const initials = (displayName)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0,2)
    .map(p => p[0].toUpperCase())
    .join("") || "ES";

  const joined = profile.ts
    ? new Date(profile.ts).toLocaleDateString(
        undefined,
        { year:"numeric", month:"short", day:"numeric" }
      )
    : "—";

  const avatarEl   = document.querySelector(".profile-avatar");
  const initialsEl = document.getElementById("profile-avatar-initials");

  // avatar image vs initials
  if (profile.avatar){
    avatarEl.style.backgroundImage = `url(${profile.avatar})`;
    if (initialsEl) initialsEl.style.visibility = "hidden";
  } else {
    avatarEl.style.backgroundImage = "none";
    if (initialsEl){
      initialsEl.textContent = initials;
      initialsEl.style.visibility = "visible";
    }
  }

  document.getElementById("profile-name-display").textContent  = displayName;
  document.getElementById("profile-email-display").textContent = email;
  document.getElementById("profile-meta-display").textContent  =
    hasUser ? `Member since ${joined}` : "Not logged in";

  // form fields
  document.getElementById("profile-username").value = profile.username || "";
  document.getElementById("profile-email").value    = profile.email    || "";
  document.getElementById("profile-fullname").value = profile.fullName || "";
  document.getElementById("profile-bio").value      = profile.bio      || "";
  manit_renderProfileMetrics();
}

function manit_saveProfile(e){
  e.preventDefault();
  if (!manit_state.user){
    manit_showModal("Profile", "Please log in to edit your profile.");
    return;
  }

  const username = document.getElementById("profile-username").value.trim();
  const email    = document.getElementById("profile-email").value.trim();
  const fullName = document.getElementById("profile-fullname").value.trim();
  const bio      = document.getElementById("profile-bio").value.trim();

  if (username.length < 4){
    manit_showModal("Profile", "Username must be at least 4 characters.");
    return;
  }
  if (!email.includes("@") || !email.includes(".")){
    manit_showModal("Profile", "Please enter a valid email address.");
    return;
  }

  // preserve existing avatar
  const existing = manit_loadProfile() || {};
  const avatar   = existing.avatar || null;

  // update global auth user (used by app)
  manit_state.user.username = username;
  manit_state.user.email    = email;
  localStorage.setItem("edusphere_user", JSON.stringify(manit_state.user));

  // save extended profile
  const profile = {
    username,
    email,
    fullName,
    bio,
    avatar,
    ts: manit_state.user.ts
  };
  localStorage.setItem(MANIT_PROFILE_KEY, JSON.stringify(profile));

  manit_renderProfileView();
  manit_showModal("Profile saved", "Your profile information has been updated.");
}

function manit_resetProfileForm(){
  manit_renderProfileView();
  const input = document.getElementById("profile-avatar-file");
  if(input) input.value = "";
}

function manit_handleAvatarChange(e){
  const file = e.target.files && e.target.files[0];
  if(!file) return;

  const MAX_BYTES = 200 * 1024; // 200 KB
  if(file.size > MAX_BYTES){
    manit_showModal("Profile picture too large",
      "Please choose an image smaller than 200 KB.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt){
    const dataUrl = evt.target.result;

    // merge with existing profile
    const current = manit_loadProfile() || manit_mergeUserProfile();
    const profile = {
      username: current.username || (manit_state.user && manit_state.user.username) || "",
      email:    current.email    || (manit_state.user && manit_state.user.email)    || "",
      fullName: current.fullName || "",
      bio:      current.bio      || "",
      avatar:   dataUrl,
      ts:       current.ts || (manit_state.user && manit_state.user.ts) || Date.now()
    };

    localStorage.setItem(MANIT_PROFILE_KEY, JSON.stringify(profile));
    manit_renderProfileView();
  };
  reader.readAsDataURL(file);
}
