/*====================================================
                GOAL TAMIL
                APP.JS
                PART 1
====================================================*/
const stepUyir = document.getElementById("stepUyir");
const stepMei = document.getElementById("stepMei");
const stepUyirmei = document.getElementById("stepUyirmei");
const stepWords = document.getElementById("stepWords");
const goalAnimation =
    document.getElementById("goalAnimation");
const goalCount =
    document.getElementById("goalCount");

/*====================================================
                LEVELS
====================================================*/

const LEVELS = {

    uyir: GAME_DATA.uyir,

    mei: GAME_DATA.mei,

    uyirmei: GAME_DATA.uyirmei,

    words: GAME_DATA.words

};
//console.log(GENERATED_UYIRMEI);
//console.log(GAME_DATA.uyirmei.length);

/*====================================================
                APP STATE
====================================================*/

const appState = {

    currentLeague: "uyir",

    currentUyirmeiMatch: 0,

    currentLesson: [...LEVELS.uyir],

    currentIndex: 0,

    skippedLetters: [],

    revisionMode: false,

    xp: 0,

    goalCount: 0,

    unlockedLeagues: ["uyir"]

};
/*====================================================
                DOM ELEMENTS
====================================================*/

// Screens

const homeScreen =
    document.getElementById("homeScreen");

const trainingScreen =
    document.getElementById("trainingScreen");

// Home

const startTrainingBtn =
    document.getElementById("startTrainingBtn");

// Training

const backBtn =
    document.getElementById("backBtn");

const hearBtn =
    document.getElementById("hearBtn");

const scoreBtn =
    document.getElementById("scoreBtn");

const passBtn =
    document.getElementById("passBtn");

// Letter

const letterDisplay =
    document.getElementById("letterDisplay");

// XP

const xpValue =
    document.getElementById("xpValue");

const trainingXP =
    document.getElementById("trainingXP");

// Progress

const progressNumber =
    document.getElementById("progressNumber");

const totalLetters =
    document.getElementById("totalLetters");

const progressFill =
    document.getElementById("progressFill");

// League

const leagueTitle =
    document.getElementById("leagueTitle");

/*====================================================
        GOAL TAMIL SPLASH SCREEN
====================================================*/

function startGoalTamilSplash() {

    const splashScreen =
        document.getElementById("splashScreen");

    if (!splashScreen) return;

    setTimeout(() => {

        splashScreen.classList.add("hide");

    }, 5000);

}

/*====================================================
                INITIALIZE
====================================================*/

function init() {

    loadGame();

    showHome();

    updateXP();

    showLetter();

    updateLeagueCards();

    updateCareerPath();

    startGoalTamilSplash();

}

/*====================================================
                SCREENS
====================================================*/

function showHome() {

    homeScreen.classList.remove("hidden");

    trainingScreen.classList.add("hidden");

}
function updateGoalCounter() {

    const goalElement = document.getElementById("goalValue");

    if (goalElement) {
        goalElement.textContent = appState.goalCount;
    }

}
function updatePlayerRank() {

    const rankElement = document.getElementById("playerRank");

    if (!rankElement) return;

    let rank = "Rookie";

    if (appState.xp >= 500)
        rank = "Academy Star";

    if (appState.xp >= 1000)
        rank = "Pro Player";

    if (appState.xp >= 2000)
        rank = "Captain";

    if (appState.xp >= 4000)
        rank = "World Champion";

    rankElement.textContent = rank;

}
function updateCareerPath() {

    const cards = {
        uyir: document.getElementById("uyirCard"),
        mei: document.getElementById("meiCard"),
        uyirmei: document.getElementById("uyirmeiCard"),
        words: document.getElementById("wordsCard")
    };

    Object.keys(cards).forEach(name => {

        const card = cards[name];

        if (!card) return;

        const status = card.querySelector(".league-status");

        if (!status) return;

        if (appState.currentLeague === name) {
            status.textContent = "Current";
        }
        else if (appState.unlockedLeagues.includes(name)) {
            status.textContent = "Unlocked";
        }
        else {
            status.textContent = "Locked";
        }

    });

}
function updateScoreBoard() {

    trainingXP.textContent = appState.xp;

    goalCount.textContent = appState.goalCount;

}
function showTraining() {

    homeScreen.classList.add("hidden");

    trainingScreen.classList.remove("hidden");

}
function showGoalAnimation() {

    goalAnimation.classList.remove("hidden");

}

function hideGoalAnimation() {

    goalAnimation.classList.add("hidden");

}

/*====================================================
                START TRAINING
====================================================*/

function startTraining() {

    appState.currentLesson =
        [...LEVELS[appState.currentLeague]];

    appState.currentIndex = 0;

    appState.skippedLetters = [];

    appState.revisionMode = false;

    showTraining();

    showLetter();

}

/*====================================================
                BACK HOME
====================================================*/

function goHome() {

    showHome();

}

/*====================================================
                SHOW LETTER
====================================================*/

function showLetter() {

    const lesson =
        appState.currentLesson;

    const current =
        lesson[appState.currentIndex];

    if (!current) return;

    letterDisplay.textContent =
        current.letter || current.word;

    updateProgress();

    updateXP();

}

/*====================================================
                UPDATE XP
====================================================*/

function updateXP() {

    if (xpValue) {
        xpValue.textContent = appState.xp + " XP";
    }

    if (trainingXP) {
        trainingXP.textContent = appState.xp;
    }

    updatePlayerRank();
}
function updateMission() {

    const total = 12;

    const completed = appState.goalCount % total;

    document.getElementById("missionProgress").textContent =
        completed + " / " + total + " Completed";

    document.getElementById("missionFill").style.width =
        (completed / total) * 100 + "%";
    if (completed === 0 && appState.goalCount > 0) {

        appState.xp += 50;

        updateXP();

        saveGame();

        showPopup(
            "🎉",
            "Mission Complete!",
            "+50 XP Bonus"
        );

    }

}


/*====================================================
                SAVE GAME
====================================================*/

/*====================================================
                SAVE GAME
====================================================*/

function saveGame() {

    const saveData = {

        currentLeague: appState.currentLeague,

        currentIndex: appState.currentIndex,

        xp: appState.xp,
        goalCount: appState.goalCount,

        revisionMode: appState.revisionMode,

        skippedLetters: appState.skippedLetters,

        unlockedLeagues: appState.unlockedLeagues

    };

    localStorage.setItem(
        "goalTamil",
        JSON.stringify(saveData)
    );

}

/*====================================================
                LOAD GAME
====================================================*/

/*====================================================
                LOAD GAME
====================================================*/

function loadGame() {

    const savedData =
        localStorage.getItem("goalTamil");

    if (!savedData) return;

    const data = JSON.parse(savedData);

    appState.currentLeague = data.currentLeague;

    appState.currentIndex = data.currentIndex;

    appState.xp = data.xp;

    appState.revisionMode = data.revisionMode;

    appState.skippedLetters = data.skippedLetters || [];
    appState.unlockedLeagues =
        data.unlockedLeagues || ["uyir"];

    if (appState.revisionMode) {

        appState.currentLesson =
            [...appState.skippedLetters];

    } else {

        appState.currentLesson =
            [...LEVELS[appState.currentLeague]];

    }
    if (appState.currentIndex >= appState.currentLesson.length) {

        appState.currentIndex = 0;

    }
    appState.goalCount =
        data.goalCount || 0;
    updateCareerPath();

}

/*====================================================
                UPDATE PROGRESS
====================================================*/
function updateProgress() {

    const total = appState.currentLesson.length;

    const current = appState.currentIndex + 1;

    const percent = ((current - 1) / total) * 100;

    progressFill.style.width = percent + "%";

    // Only if you still have footballProgress
    if (typeof footballProgress !== "undefined" && footballProgress) {
        footballProgress.style.left = `calc(${percent}% - 15px)`;
    }

    document.getElementById("lessonProgressText").textContent =
        `${current} / ${total}`;

}
/*====================================================
                HEAR LETTER
====================================================*/

function hearLetter() {

    const current =
        appState.currentLesson[appState.currentIndex];

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(current.sound || current.letter || current.word);

    speech.lang = "ta-IN";

    speech.rate = 0.8;

    speech.pitch = 1;

    speechSynthesis.speak(speech);

}

/*====================================================
                I READ IT / SCORE GOAL
====================================================*/

function scoreGoal() {

    console.log("I READ IT clicked");

    // 1. Add XP
    appState.xp += 10;

    // 2. Add goal
    appState.goalCount++;

    // 3. Update XP and goal display
    updateXP();
    updateGoalCounter();

    // 4. Update mission safely
    const missionProgress =
        document.getElementById("missionProgress");

    const missionFill =
        document.getElementById("missionFill");

    if (missionProgress && missionFill) {

        const total = 12;
        const completed =
            appState.goalCount % total;

        missionProgress.textContent =
            completed + " / " + total + " Completed";

        missionFill.style.width =
            (completed / total) * 100 + "%";
    }

    // 5. Save progress
    saveGame();

    // 6. Goal animation
    if (typeof letterCard !== "undefined" && letterCard) {

        letterCard.classList.add("goal-celebration");

        setTimeout(() => {
            letterCard.classList.remove("goal-celebration");
        }, 700);
    }

    document.body.classList.add("goal-flash");

    setTimeout(() => {
        document.body.classList.remove("goal-flash");
    }, 700);

    // 7. Show GOAL popup
    showPopup(
        "⚽",
        "GOAL!",
        "+10 XP"
    );

    // 8. Move to next letter
    setTimeout(() => {

        hidePopup();

        moveNext();

    }, 1000);
}

/*====================================================
                PASS LETTER
====================================================*/

function passLetter() {

    const current =
        appState.currentLesson[appState.currentIndex];

    appState.skippedLetters.push(current);

    saveGame();   // <-- ADD HERE

    showPopup(
        "📚",
        "Practice Later",
        "We'll revise this letter later."
    );

    setTimeout(() => {

        hidePopup();

        moveNext();

    }, 800);

}

/*====================================================
                MOVE NEXT
====================================================*/

function moveNext() {
    console.log(
        "moveNext",
        "Index:", appState.currentIndex,
        "Lesson Length:", appState.currentLesson.length,
        "Revision:", appState.revisionMode
    );

    appState.currentIndex++;

    saveGame();

    // Still letters remaining in current lesson?
    if (appState.currentIndex < appState.currentLesson.length) {

        showLetter();
        return;

    }

    // Finished normal lesson
    if (!appState.revisionMode) {

        startRevisionRound();
        return;

    }

    // Finished revision lesson

    if (appState.currentLeague === "uyirmei") {
        finishUyirmeiMatch();
        return;
    }

    completeLeague();

}

function finishUyirmeiMatch() {
    const nextMatchIndex = appState.currentUyirmeiMatch + 1;

    // All உயிர்மெய் groups are completed
    if (nextMatchIndex >= UYIRMEI_GROUPS.length) {
        completeLeague();
        return;
    }

    // Show the next group, such as ங வரிசை
    showMatchWonPopup(
        UYIRMEI_GROUPS[nextMatchIndex].team
    );

    popupBtn.onclick = function () {
        hidePopup();
        startNextUyirmeiMatch();
    };
}

function startNextUyirmeiMatch() {
    appState.currentUyirmeiMatch++;

    const match = UYIRMEI_GROUPS[
        appState.currentUyirmeiMatch
    ];

    appState.currentLesson = [...match.letters];
    appState.currentIndex = 0;
    appState.skippedLetters = [];
    appState.revisionMode = false;

    leagueTitle.textContent =
        `⚽ Match ${appState.currentUyirmeiMatch + 1} - ${match.team} வரிசை`;

    updateProgress();
    showLetter();
    saveGame();
}

/*====================================================
            REVISION ROUND
====================================================*/

function startRevisionRound() {

    // No skipped letters? Move to the next group.
    if (appState.skippedLetters.length === 0) {
        if (appState.currentLeague === "uyirmei") {
            finishUyirmeiMatch();
        } else {
            completeLeague();
        }

        return;
    }

    // Copy skipped letters into revision lesson
    appState.currentLesson = [...appState.skippedLetters];

    // Clear temporary storage
    appState.skippedLetters = [];

    appState.currentIndex = 0;

    appState.revisionMode = true;

    saveGame();

    showPopup(
        "⭐",
        "Revision Round",
        "Let's practice the skipped letters!",
        true,
        function () {

            showLetter();

        }
    );


}

/*====================================================
            COMPLETE LEAGUE
====================================================*/

function completeLeague() {

    appState.xp += 100;

    updateXP();

    unlockNextLeague();

    saveGame();

    showPopup(
        "🏆",
        "League Complete!",
        "+100 XP",
        true
    );

    popupBtn.onclick = function () {

        hidePopup();

        appState.currentLesson =
            [...LEVELS[appState.currentLeague]];

        appState.currentIndex = 0;

        appState.skippedLetters = [];

        appState.revisionMode = false;

        saveGame();

        showHome();

    };

}
/*====================================================
                EVENT LISTENERS
====================================================*/

startTrainingBtn.addEventListener("click", () => {

    startLeague(appState.currentLeague);

});

backBtn.addEventListener(
    "click",
    goHome
);

hearBtn.addEventListener(
    "click",
    hearLetter
);

scoreBtn.addEventListener(
    "click",
    scoreGoal
);

passBtn.addEventListener(
    "click",
    passLetter
);

/*====================================================
                APP START
====================================================*/

document.addEventListener(
    "DOMContentLoaded",
    init
);
const gamePopup =
    document.getElementById("gamePopup");

const popupEmoji =
    document.getElementById("popupEmoji");

const popupTitle =
    document.getElementById("popupTitle");

const popupMessage =
    document.getElementById("popupMessage");

const popupBtn =
    document.getElementById("popupBtn");
const popupCloseBtn =
    document.getElementById("popupCloseBtn");

popupCloseBtn.addEventListener("click", hidePopup);
const popupScoreboard =
    document.getElementById("popupScoreboard");


function showPopup(
    emoji,
    title,
    message,
    showButton = false,
    callback = null
) {
    if (popupScoreboard) {
        popupScoreboard.classList.remove("hidden");
    }
    popupEmoji.textContent = emoji;
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    gamePopup.classList.remove("hidden");

    if (showButton) {

        popupBtn.classList.remove("hidden");

        popupBtn.onclick = function () {

            hidePopup();

            if (callback) {
                callback();
            }

        };

    } else {

        popupBtn.classList.add("hidden");

        popupBtn.onclick = null;

    }

}
function showWelcomePopup() {

    popupEmoji.textContent = "⚽";

    popupTitle.textContent = "GOAL TAMIL";

    popupMessage.textContent =
        "Welcome! Your journey to the Tamil World Cup starts here.";

    if (popupScoreboard) {
        popupScoreboard.classList.add("hidden");
    }

    popupBtn.classList.remove("hidden");

    popupBtn.textContent = "Let's Play →";

    popupBtn.onclick = function () {
        hidePopup();
    };

    gamePopup.classList.remove("hidden");
}
function showMatchWonPopup(nextTeam) {

    popupEmoji.textContent = "🏆";

    popupTitle.textContent = "FULL TIME";

    popupMessage.innerHTML = `

        <h3>🎉 MATCH WON!</h3>

        <p>⭐ +100 XP</p>

        <p>Next Match</p>

        <h2>${nextTeam} வரிசை</h2>

    `;

    popupBtn.textContent = "Continue ➜";

    gamePopup.classList.remove("hidden");

    popupBtn.classList.remove("hidden");

}
function hidePopup() {

    gamePopup.classList.add("hidden");

}
function unlockNextLeague() {

    switch (appState.currentLeague) {

        case "uyir":

            if (!appState.unlockedLeagues.includes("mei")) {

                appState.unlockedLeagues.push("mei");

            }

            break;

        case "mei":

            if (!appState.unlockedLeagues.includes("uyirmei")) {

                appState.unlockedLeagues.push("uyirmei");

            }

            break;

        case "uyirmei":

            if (!appState.unlockedLeagues.includes("words")) {

                appState.unlockedLeagues.push("words");

            }

            break;

    }

    saveGame();

}
function updateLeagueCards() {

    const cards = {

        uyir: document.getElementById("uyirCard"),

        mei: document.getElementById("meiCard"),

        uyirmei: document.getElementById("uyirmeiCard"),

        words: document.getElementById("wordsCard")

    };

    Object.keys(cards).forEach(name => {

        const card = cards[name];

        const status =
            card.querySelector(".league-status");

        card.classList.remove(
            "locked",
            "unlocked",
            "active",
            "completed"
        );

        if (appState.unlockedLeagues.includes(name)) {

            card.classList.add("unlocked");

            status.textContent = "Unlocked";

        } else {

            card.classList.add("locked");

            status.textContent = "Locked";

        }

        if (name === appState.currentLeague) {

            card.classList.add("active");

            status.textContent = "Current";

        }

    });

}
function startLeague(league) {
    if (!appState.unlockedLeagues.includes(league)) {
        showPopup(
            "🔒",
            "Level Locked",
            "Complete the previous level first."
        );
        return;
    }

    appState.currentLeague = league;

    appState.currentIndex = 0;

    appState.skippedLetters = [];

    appState.revisionMode = false;

    // ---------- உயிர்மெய் ----------
    if (league === "uyirmei") {

        appState.currentUyirmeiMatch = 0;

        appState.currentLesson =
            [...UYIRMEI_GROUPS[0].letters];

        leagueTitle.textContent =
            "⚽ Match 1 - க வரிசை";

    }

    // ---------- Other leagues ----------
    else {

        appState.currentLesson =
            [...LEVELS[league]];

        if (league === "uyir")
            leagueTitle.textContent = "⚽ உயிர் League";

        if (league === "mei")
            leagueTitle.textContent = "⚽ மெய் League";

        if (league === "words")
            leagueTitle.textContent = "⚽ Words League";

    }

    updateProgress();

    showTraining();

    showLetter();

    saveGame();

}
function startNextUyirmeiMatch() {

    appState.currentUyirmeiMatch++;

    // All matches finished?
    if (appState.currentUyirmeiMatch >= UYIRMEI_GROUPS.length) {

        completeLeague();

        return;

    }

    appState.currentLesson =
        [...UYIRMEI_GROUPS[appState.currentUyirmeiMatch].letters];

    appState.currentIndex = 0;

    appState.skippedLetters = [];

    appState.revisionMode = false;

    leagueTitle.textContent =
        "⚽ Match " +
        (appState.currentUyirmeiMatch + 1) +
        " - " +
        UYIRMEI_GROUPS[appState.currentUyirmeiMatch].team +
        " வரிசை";

    updateProgress();

    showLetter();

    saveGame();

}
function startUyirmeiMatch(matchIndex) {

    appState.currentLeague = "uyirmei";

    appState.currentUyirmeiMatch = matchIndex;

    appState.currentLesson =
        UYIRMEI_GROUPS[matchIndex].letters;

    appState.currentIndex = 0;

    appState.skippedLetters = [];

    appState.revisionMode = false;

    leagueTitle.textContent =
        "⚽ Match " +
        (matchIndex + 1) +
        " - " +
        UYIRMEI_GROUPS[matchIndex].team +
        " வரிசை";

    updateProgress();

    showTraining();

    showLetter();

    saveGame();

}
/*====================================================
            UPDATE LEAGUE TITLE
====================================================*/

function updateLeagueTitle() {

    const titles = {

        uyir: "🏟 Academy League",

        mei: "⚽ Youth Team",

        uyirmei: "🔥 First Team",

        words: "🏆 World Cup"

    };

    leagueTitle.textContent =
        titles[appState.currentLeague];

}
/*====================================================
                LOAD LEAGUE
====================================================*/

function loadLeague(leagueName) {

    appState.currentLeague = leagueName;

    appState.currentLesson = [...LEVELS[leagueName]];

    appState.currentIndex = 0;

    appState.skippedLetters = [];

    appState.revisionMode = false;

    updateLeagueTitle();

    updateLeagueCards();

    showLetter();

    saveGame();

}
uyirCard.addEventListener("click", () => {
    if (appState.unlockedLeagues.includes("uyir")) {
        startLeague("uyir");
    }
});

meiCard.addEventListener("click", () => {
    if (appState.unlockedLeagues.includes("mei")) {
        startLeague("mei");
    } else {
        showPopup(
            "🔒",
            "Level Locked",
            "Complete உயிர் first to unlock மெய்."
        );
    }
});

uyirmeiCard.addEventListener("click", () => {
    if (appState.unlockedLeagues.includes("uyirmei")) {
        startLeague("uyirmei");
    } else {
        showPopup(
            "🔒",
            "Level Locked",
            "Complete மெய் first to unlock உயிர்மெய்."
        );
    }
});

wordsCard.addEventListener("click", () => {
    if (appState.unlockedLeagues.includes("words")) {
        startLeague("words");
    } else {
        showPopup(
            "🔒",
            "Level Locked",
            "Complete உயிர்மெய் first to unlock Words."
        );
    }
});


/*====================================================
            GOAL TAMIL SPLASH
====================================================*/

setTimeout(() => {

    const splash =
        document.getElementById("splashScreen");

    console.log("AUTO SPLASH TEST:", splash);

    if (splash) {
        splash.classList.add("hide");
        console.log("HIDE CLASS ADDED:", splash.className);
    }

}, 5000);