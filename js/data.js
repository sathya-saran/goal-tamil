/*====================================================
                GAME DATA
====================================================*/

const GAME_DATA = {

    uyir: [
        { letter: "அ", sound: "அ" },
        { letter: "ஆ", sound: "ஆ" },
        { letter: "இ", sound: "இ" },
        { letter: "ஈ", sound: "ஈ" },
        { letter: "உ", sound: "உ" },
        { letter: "ஊ", sound: "ஊ" },
        { letter: "எ", sound: "எ" },
        { letter: "ஏ", sound: "ஏ" },
        { letter: "ஐ", sound: "ஐ" },
        { letter: "ஒ", sound: "ஒ" },
        { letter: "ஓ", sound: "ஓ" },
        { letter: "ஔ", sound: "ஔ" }
    ],

    mei: [
        { letter: "க்", sound: "க்" },
        { letter: "ங்", sound: "ங்" },
        { letter: "ச்", sound: "ச்" },
        { letter: "ஞ்", sound: "ஞ்" },
        { letter: "ட்", sound: "ட்" },
        { letter: "ண்", sound: "ண்" },
        { letter: "த்", sound: "த்" },
        { letter: "ந்", sound: "ந்" },
        { letter: "ப்", sound: "ப்" },
        { letter: "ம்", sound: "ம்" },
        { letter: "ய்", sound: "ய்" },
        { letter: "ர்", sound: "ர்" },
        { letter: "ல்", sound: "ல்" },
        { letter: "வ்", sound: "வ்" },
        { letter: "ழ்", sound: "ழ்" },
        { letter: "ள்", sound: "ள்" },
        { letter: "ற்", sound: "ற்" },
        { letter: "ன்", sound: "ன்" }
    ],

    uyirmei: [],

    words: [

        { word: "கடல்", sound: "கடல்" },
        { word: "மழை", sound: "மழை" },
        { word: "நிலா", sound: "நிலா" },
        { word: "கிளி", sound: "கிளி" },
        { word: "மீன்", sound: "மீன்" },
        { word: "கப்பல்", sound: "கப்பல்" },
        { word: "தோட்டம்", sound: "தோட்டம்" },
        { word: "குரங்கு", sound: "குரங்கு" },
        { word: "பள்ளி", sound: "பள்ளி" },
        { word: "வானவில்", sound: "வானவில்" }

    ]

};


/*====================================================
                GENERATOR DATA
====================================================*/

const UYIR = [
    { symbol: "" },
    { symbol: "ா" },
    { symbol: "ி" },
    { symbol: "ீ" },
    { symbol: "ு" },
    { symbol: "ூ" },
    { symbol: "ெ" },
    { symbol: "ே" },
    { symbol: "ை" },
    { symbol: "ொ" },
    { symbol: "ோ" },
    { symbol: "ௌ" }
];

const MEI = [
    "க",
    "ங",
    "ச",
    "ஞ",
    "ட",
    "ண",
    "த",
    "ந",
    "ப",
    "ம",
    "ய",
    "ர",
    "ல",
    "வ",
    "ழ",
    "ள",
    "ற",
    "ன"
];


/*====================================================
        GENERATE UYIRMEI GROUPS
====================================================*/

function generateUyirmeiGroups() {

    const groups = [];

    MEI.forEach(mei => {

        const letters = [];

        UYIR.forEach(uyir => {

            letters.push({

                letter: mei + uyir.symbol,

                sound: mei + uyir.symbol

            });

        });

        groups.push({

            team: mei,

            letters: letters

        });

    });

    return groups;

}


/*====================================================
        CREATE GROUPS
====================================================*/

const UYIRMEI_GROUPS = generateUyirmeiGroups();


/*====================================================
        FLATTEN TO SINGLE ARRAY
====================================================*/

GAME_DATA.uyirmei = UYIRMEI_GROUPS.flatMap(group => group.letters);