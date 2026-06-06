/* ==========================================
   LUNA BREW CONTENT CALENDAR DASHBOARD
   FINAL CORRECTED SCRIPT.JS
   PART 1
========================================== */

/* ==========================================
   DOM REFERENCES
========================================== */

const body =
document.body;

const themeToggle =
document.getElementById(
    "themeToggle"
);

const searchInput =
document.getElementById(
    "searchInput"
);

const categoryFilter =
document.getElementById(
    "categoryFilter"
);

const exportButton =
document.getElementById(
    "exportCalendar"
);

const toast =
document.getElementById(
    "toast"
);

const toastText =
document.getElementById(
    "toastText"
);

const loadingOverlay =
document.getElementById(
    "loadingOverlay"
);

const progressBars =
document.querySelectorAll(
    ".progress-fill"
);

let calendarCards =
document.querySelectorAll(
    ".calendar-card"
);

/* ==========================================
   STORAGE KEYS
========================================== */

const STORAGE_KEYS = {

    theme:
    "luna-theme",

    search:
    "luna-search",

    category:
    "luna-category"

};

/* ==========================================
   TOAST SYSTEM
========================================== */

let toastTimer = null;

function showToast(
    message,
    duration = 3000
){

    if(
        !toast ||
        !toastText
    ) return;

    clearTimeout(
        toastTimer
    );

    toastText.textContent =
    message;

    toast.classList.add(
        "show"
    );

    toastTimer =
    setTimeout(()=>{

        toast.classList.remove(
            "show"
        );

    },duration);

}

/* ==========================================
   LOADER SYSTEM
========================================== */

function showLoader(){

    if(
        !loadingOverlay
    ) return;

    loadingOverlay.classList.remove(
        "hidden"
    );

}

function hideLoader(){

    if(
        !loadingOverlay
    ) return;

    loadingOverlay.classList.add(
        "hidden"
    );

}

/* ==========================================
   THEME SYSTEM
========================================== */

function applyTheme(
    theme
){

    const isLight =
    theme === "light";

    body.classList.toggle(
        "light",
        isLight
    );

    if(themeToggle){

        themeToggle.innerHTML =

        isLight

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';
    }

}

function loadTheme(){

    const savedTheme =

    localStorage.getItem(
        STORAGE_KEYS.theme
    )

    ||

    "dark";

    applyTheme(
        savedTheme
    );

}

function toggleTheme(){

    const nextTheme =

    body.classList.contains(
        "light"
    )

    ? "dark"

    : "light";

    localStorage.setItem(
        STORAGE_KEYS.theme,
        nextTheme
    );

    applyTheme(
        nextTheme
    );

    showToast(

        nextTheme === "light"

        ? "Light Mode Enabled ☀️"

        : "Dark Mode Enabled 🌙"

    );

}

themeToggle?.addEventListener(
    "click",
    toggleTheme
);

/* ==========================================
   KPI COUNTERS
========================================== */

function animateCounter(
    elementId,
    target,
    duration = 1500,
    suffix = ""
){

    const element =
    document.getElementById(
        elementId
    );

    if(!element) return;

    let current = 0;

    const frameRate = 60;

    const totalFrames =

    Math.round(
        duration /
        (1000 / frameRate)
    );

    const increment =

    target /
    totalFrames;

    let frame = 0;

    const timer =

    setInterval(()=>{

        frame++;

        current += increment;

        if(
            frame >= totalFrames
        ){

            clearInterval(
                timer
            );

            current = target;
        }

        element.textContent =

        Math.floor(
            current
        ) + suffix;

    },1000/frameRate);

}

function initializeCounters(){

    animateCounter(
        "postsCounter",
        31
    );

    animateCounter(
        "hashtagsCounter",
        12
    );

    animateCounter(
        "engagementCounter",
        8,
        1500,
        "%"
    );

    animateCounter(
        "visualCounter",
        25
    );

}

/* ==========================================
   PROGRESS BAR ANIMATION
========================================== */

function animateProgressBars(){

    progressBars.forEach(

        (
            bar,
            index
        )=>{

            const width =
            bar.dataset.width;

            setTimeout(()=>{

                bar.style.width =
                width + "%";

            },250 + index * 150);

        }

    );

}

/* ==========================================
   FILTER SYSTEM
========================================== */

function filterCards(){

    const searchValue =

    searchInput?.value
    .trim()
    .toLowerCase()

    || "";

    const categoryValue =

    categoryFilter?.value

    || "all";

    calendarCards.forEach(card=>{

        const title =

        card.querySelector(
            "h3"
        )
        ?.textContent
        .toLowerCase()

        || "";

        const category =

        card.dataset.category;

        const matchesSearch =

        title.includes(
            searchValue
        );

        const matchesCategory =

        categoryValue === "all"

        ||

        category ===
        categoryValue;

        card.style.display =

        (
            matchesSearch &&
            matchesCategory
        )

        ? "block"

        : "none";

    });

}

/* ==========================================
   SAVE FILTERS
========================================== */

function saveFilters(){

    localStorage.setItem(
        STORAGE_KEYS.search,
        searchInput?.value || ""
    );

    localStorage.setItem(
        STORAGE_KEYS.category,
        categoryFilter?.value || "all"
    );

}

function loadFilters(){

    const savedSearch =

    localStorage.getItem(
        STORAGE_KEYS.search
    );

    const savedCategory =

    localStorage.getItem(
        STORAGE_KEYS.category
    );

    if(
        savedSearch &&
        searchInput
    ){

        searchInput.value =
        savedSearch;
    }

    if(
        savedCategory &&
        categoryFilter
    ){

        categoryFilter.value =
        savedCategory;
    }

    filterCards();

}

searchInput?.addEventListener(
    "input",
    ()=>{

        filterCards();

        saveFilters();

    }
);

categoryFilter?.addEventListener(
    "change",
    ()=>{

        filterCards();

        saveFilters();

    }
);

/* ==========================================
   FINAL CORRECTED SCRIPT.JS
   PART 2
========================================== */

/* ==========================================
   MODAL ELEMENTS
========================================== */

const modal =
document.getElementById(
    "contentModal"
);

const modalTitle =
document.getElementById(
    "modalTitle"
);

const modalDescription =
document.getElementById(
    "modalDescription"
);

const closeModalBtn =
document.getElementById(
    "closeModal"
);

/* ==========================================
   CONTENT DATABASE
========================================== */

const contentDatabase = {

    "Morning Coffee Ritual":{
        visual:"Lifestyle photo of customer enjoying coffee at sunrise",
        hashtags:"#MorningCoffee #CoffeeLovers #LunaBrew",
        time:"8:00 AM",
        objective:"Increase community engagement and user-generated content."
    },

    "Coffee Bean Origins":{
        visual:"Coffee farm and bean sourcing images",
        hashtags:"#CoffeeBeans #CoffeeEducation #SpecialtyCoffee",
        time:"6:00 PM",
        objective:"Educate audience about coffee sourcing."
    },

    "Signature Latte Feature":{
        visual:"Professional latte photography",
        hashtags:"#LatteArt #CoffeeTime #LunaBrew",
        time:"11:00 AM",
        objective:"Promote bestselling beverage."
    },

    "Weekend Discount":{
        visual:"Offer graphic with discount badge",
        hashtags:"#WeekendOffer #CafeDeals #CoffeeLovers",
        time:"10:00 AM",
        objective:"Drive store visits."
    },

    "Customer Spotlight":{
        visual:"Customer portrait with testimonial",
        hashtags:"#CoffeeCommunity #CustomerLove #LunaBrew",
        time:"12:00 PM",
        objective:"Strengthen brand loyalty."
    },

    "Brewing Tips":{
        visual:"French Press tutorial reel",
        hashtags:"#CoffeeTips #BrewingGuide #CoffeeCulture",
        time:"5:00 PM",
        objective:"Provide value through education."
    },

    "New Seasonal Drink":{
        visual:"Seasonal drink product showcase",
        hashtags:"#SeasonalCoffee #CafeMenu #CoffeeLovers",
        time:"1:00 PM",
        objective:"Increase product awareness."
    },

    "Espresso Explained":{
        visual:"Espresso extraction process images",
        hashtags:"#Espresso #CoffeeFacts #CoffeeEducation",
        time:"6:30 PM",
        objective:"Educate coffee enthusiasts."
    },

    "Poll of the Week":{
        visual:"Instagram poll story graphic",
        hashtags:"#CoffeePoll #CoffeeCommunity #CafeCulture",
        time:"7:00 PM",
        objective:"Increase interaction."
    },

    "Buy One Get One":{
        visual:"BOGO promotional banner",
        hashtags:"#CoffeeDeal #BOGO #CafeOffer",
        time:"11:00 AM",
        objective:"Increase footfall."
    }

};

/* ==========================================
   FALLBACK CONTENT
========================================== */

function generateFallbackContent(
    title
){

    return {

        visual:
        "Premium coffee lifestyle photography",

        hashtags:
        "#LunaBrew #CoffeeLovers #CafeCulture",

        time:
        "12:00 PM",

        objective:
        `Promote engagement around "${title}".`

    };

}

/* ==========================================
   MODAL SYSTEM
========================================== */

function openModal(
    title
){

    if(
        !modal ||
        !modalTitle ||
        !modalDescription
    ) return;

    const data =

    contentDatabase[title]

    ||

    generateFallbackContent(
        title
    );

    modalTitle.textContent =
    title;

    modalDescription.innerHTML =

    `
    <strong>🎯 Objective</strong>
    <br><br>
    ${data.objective}

    <br><br>

    <strong>📸 Suggested Visual</strong>
    <br><br>
    ${data.visual}

    <br><br>

    <strong>#️⃣ Recommended Hashtags</strong>
    <br><br>
    ${data.hashtags}

    <br><br>

    <strong>⏰ Best Posting Time</strong>
    <br><br>
    ${data.time}
    `;

    modal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
    "hidden";

}

function closeModal(){

    if(!modal) return;

    modal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
    "";

}

closeModalBtn?.addEventListener(
    "click",
    closeModal
);

modal?.addEventListener(
    "click",
    event=>{

        if(
            event.target === modal
        ){

            closeModal();

        }

    }
);

/* ==========================================
   CALENDAR CARD EVENTS
========================================== */

function initializeCalendarCards(){

    calendarCards.forEach(card=>{

        card.addEventListener(
            "click",
            ()=>{

                const title =

                card.querySelector(
                    "h3"
                )?.textContent;

                if(title){

                    openModal(
                        title
                    );

                }

            }
        );

    });

}

/* ==========================================
   HASHTAG ENGINE
========================================== */

const hashtagLibrary = [

    "#LunaBrew",
    "#CoffeeLovers",
    "#CoffeeCulture",
    "#CafeLife",
    "#MorningCoffee",
    "#SpecialtyCoffee",
    "#CoffeeAddict",
    "#CoffeeTime",
    "#CoffeeCommunity",
    "#CoffeeGram",
    "#CafeCulture",
    "#BrewedFresh"

];

function generateHashtags(
    count = 5
){

    const shuffled =

    [...hashtagLibrary]

    .sort(
        ()=>Math.random()-0.5
    );

    return shuffled
    .slice(0,count)
    .join(" ");

}

/* ==========================================
   VISUAL ASSET ENGINE
========================================== */

const visualIdeas = [

    "Customer lifestyle photography",
    "Coffee bean macro shot",
    "Barista preparing latte art",
    "Coffee shop ambience",
    "Coffee brewing tutorial reel",
    "Behind-the-scenes roasting",
    "Premium product photography",
    "Community spotlight image",
    "Instagram carousel graphic",
    "Seasonal menu promotion"

];

function getRandomVisual(){

    const randomIndex =

    Math.floor(
        Math.random() *
        visualIdeas.length
    );

    return visualIdeas[
        randomIndex
    ];

}

/* ==========================================
   EXPORT CALENDAR
========================================== */

function exportCalendar(){

    showLoader();

    setTimeout(()=>{

        const report =

`
==================================
LUNA BREW CONTENT CALENDAR
==================================

Month:
July 2026

Total Planned Posts:
31

Content Distribution:
Education 35%
Community 25%
Promotion 20%
Product 20%

----------------------------------

Recommended Hashtags:
${generateHashtags()}

----------------------------------

Suggested Visual:
${getRandomVisual()}

----------------------------------

Posting Schedule:

Morning:
8:00 AM - 10:00 AM

Afternoon:
12:00 PM - 2:00 PM

Evening:
5:00 PM - 7:00 PM

----------------------------------

Generated:
${new Date().toLocaleString()}

==================================
`;

        const blob =

        new Blob(
            [report],
            {
                type:"text/plain"
            }
        );

        const url =

        URL.createObjectURL(
            blob
        );

        const link =

        document.createElement(
            "a"
        );

        link.href = url;

        link.download =
        "LunaBrew_ContentCalendar.txt";

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(
            url
        );

        hideLoader();

        showToast(
            "Calendar Exported Successfully ✅"
        );

    },1000);

}

exportButton?.addEventListener(
    "click",
    exportCalendar
);

/* ==========================================
   CONTENT INSIGHTS
========================================== */

function logContentInsights(){

    console.log(
        "Suggested Hashtags:",
        generateHashtags()
    );

    console.log(
        "Suggested Visual:",
        getRandomVisual()
    );

}

/* ==========================================
   FINAL CORRECTED SCRIPT.JS
   PART 3
========================================== */

/* ==========================================
   ANALYTICS ENGINE
========================================== */

function calculateContentDistribution(){

    const stats = {

        education:0,
        community:0,
        promotion:0,
        product:0

    };

    calendarCards.forEach(card=>{

        const category =
        card.dataset.category;

        if(
            Object.prototype.hasOwnProperty.call(
                stats,
                category
            )
        ){

            stats[category]++;

        }

    });

    return stats;

}

function displayAnalytics(){

    const stats =
    calculateContentDistribution();

    console.table(
        stats
    );

}

/* ==========================================
   CONTENT RECOMMENDATIONS
========================================== */

const recommendations = [

    "Increase Reels and short-form videos to boost reach.",

    "Post more behind-the-scenes content to build authenticity.",

    "Feature customer testimonials weekly.",

    "Launch monthly hashtag challenges.",

    "Collaborate with local influencers.",

    "Create more educational coffee tutorials.",

    "Use carousel posts for storytelling.",

    "Run limited-time promotions twice monthly."

];

function getRecommendation(){

    const randomIndex =

    Math.floor(
        Math.random() *
        recommendations.length
    );

    return recommendations[
        randomIndex
    ];

}

function generateMonthlyInsight(){

    console.log(
        "📊 Monthly Insight:"
    );

    console.log(
        getRecommendation()
    );

}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
========================================== */

function initializeScrollAnimations(){

    const animatedElements =

    document.querySelectorAll(
        `
        .stat-card,
        .analytics-card,
        .calendar-card,
        .asset-card,
        .summary-card
        `
    );

    if(
        !(
            "IntersectionObserver"
            in window
        )
    ){

        animatedElements.forEach(el=>{

            el.style.opacity = "1";
            el.style.transform = "none";

        });

        return;
    }

    const observer =
    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(
                    entry.isIntersecting
                ){

                    entry.target.style.opacity =
                    "1";

                    entry.target.style.transform =
                    "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold:0.15
        }

    );

    animatedElements.forEach(el=>{

        el.style.opacity = "0";

        el.style.transform =
        "translateY(30px)";

        el.style.transition =
        ".6s ease";

        observer.observe(el);

    });

}

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

function initializeKeyboardShortcuts(){

    document.addEventListener(
        "keydown",
        event=>{

            /* ESC CLOSES MODAL */

            if(
                event.key === "Escape"
            ){

                closeModal();

            }

            /* CTRL + E EXPORT */

            if(
                event.ctrlKey &&
                event.key.toLowerCase()
                === "e"
            ){

                event.preventDefault();

                exportCalendar();

            }

            /* CTRL + / SEARCH */

            if(
                event.ctrlKey &&
                event.key === "/"
            ){

                event.preventDefault();

                searchInput?.focus();

            }

        }
    );

}

/* ==========================================
   DASHBOARD STATE
========================================== */

function saveDashboardState(){

    const dashboardState = {

        theme:
        body.classList.contains(
            "light"
        )
        ? "light"
        : "dark",

        search:
        searchInput?.value || "",

        category:
        categoryFilter?.value || "all"

    };

    localStorage.setItem(
        "luna-dashboard-state",
        JSON.stringify(
            dashboardState
        )
    );

}

function loadDashboardState(){

    const savedState =

    localStorage.getItem(
        "luna-dashboard-state"
    );

    if(
        !savedState
    ) return;

    try{

        const state =

        JSON.parse(
            savedState
        );

        if(searchInput){

            searchInput.value =
            state.search || "";

        }

        if(categoryFilter){

            categoryFilter.value =
            state.category || "all";

        }

        filterCards();

    }

    catch(error){

        console.error(
            "State Load Error:",
            error
        );

    }

}

searchInput?.addEventListener(
    "input",
    saveDashboardState
);

categoryFilter?.addEventListener(
    "change",
    saveDashboardState
);

themeToggle?.addEventListener(
    "click",
    saveDashboardState
);

/* ==========================================
   SMART BADGES
========================================== */

function addSmartBadges(){

    const cards =

    document.querySelectorAll(
        ".asset-card"
    );

    const labels = [

        "High Engagement",
        "Trending",
        "Most Popular",
        "Brand Story",
        "Educational",
        "Recommended"

    ];

    cards.forEach(
        (
            card,
            index
        )=>{

            const badge =

            document.createElement(
                "div"
            );

            badge.className =
            "generated-badge";

            badge.textContent =

            labels[index]
            || "Featured";

            card.appendChild(
                badge
            );

        }
    );

}

/* ==========================================
   INSIGHT TICKER
========================================== */

function startInsightTicker(){

    setInterval(()=>{

        console.log(
            "💡 Marketing Suggestion:"
        );

        console.log(
            getRecommendation()
        );

    },30000);

}

/* ==========================================
   PERFORMANCE OPTIMIZATION
========================================== */

let resizeTimer;

window.addEventListener(
    "resize",
    ()=>{

        clearTimeout(
            resizeTimer
        );

        resizeTimer =

        setTimeout(()=>{

            console.log(
                "Layout Recalculated"
            );

        },250);

    }
);

/* ==========================================
   APPLICATION INITIALIZATION
========================================== */

function initializeBaseFeatures(){

    loadTheme();

    loadFilters();

    initializeCounters();

    animateProgressBars();

    showToast(
        "Dashboard Loaded Successfully 🚀"
    );

}

function initializeApplication(){

    initializeBaseFeatures();

    initializeCalendarCards();

    initializeScrollAnimations();

    initializeKeyboardShortcuts();

    loadDashboardState();

    addSmartBadges();

    displayAnalytics();

    generateMonthlyInsight();

    logContentInsights();

    startInsightTicker();

    console.log(
        "Application Initialized"
    );

}

/* ==========================================
   APP START
========================================== */

window.addEventListener(
    "load",
    initializeApplication
);

/* ==========================================
   PROJECT SUMMARY
========================================== */

console.log(
`
========================================
LUNA BREW CONTENT CALENDAR READY
========================================

✓ Dark / Light Theme
✓ KPI Counters
✓ Search & Filters
✓ Content Modal
✓ Hashtag Engine
✓ Visual Planner
✓ Export Calendar
✓ Loader System
✓ Toast Notifications
✓ Analytics Dashboard
✓ Smart Recommendations
✓ Scroll Animations
✓ Keyboard Shortcuts
✓ Local Storage Persistence
✓ Responsive Design

========================================
`
);

/* ==========================================
   END OF FILE
========================================== */