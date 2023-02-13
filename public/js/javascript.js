/* Modal Control Functionality */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        const parent = button.parentElement;
        const title = parent.querySelector('[card-title]').innerText;
        console.log(title);
        openModal(modal, title);
    })
})
if (overlay) {

    overlay.addEventListener("click", () => {
        console.log("almost closing");

        const modals = document.querySelectorAll('.pop-up-window.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    })
}
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.pop-up-window')
        closeModal(modal)
    })
})

function openModal(modal, title) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
    let modalTitle = document.querySelector('[modal-title]');
    modalTitle.textContent = title;
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

/* Search Control Functionality */

const resultTemplate = document.querySelector('[data-result-template]');
const resultContainer = document.querySelector("[data-result-container]")
const searchInput = document.querySelector("[data-search]");

let showResults = true;
let results = [];


searchInput.addEventListener("input", e => {
    const value = e.target.value;
    value ? resultContainer.classList.toggle("hide", !showResults) : resultContainer.classList.toggle("hide", showResults);
    const hebrewRegex = /^[\u0590-\u05FF\s"'`]+$/;
    if (hebrewRegex.test(value)) {
        results.forEach(result => {

            const isVisible = result.name.includes(value);
            result.element.classList.toggle("hide", !isVisible);
        })

    }
})

fetch("/jsontest")
    .then(res => res.json())
    .then(data => {

        results = data.map(result => {
            resultContainer.classList.toggle("hide", showResults);
            const resultView = resultTemplate.content.cloneNode(true).children[0];
            const resultHeader = resultView.querySelector('[result-header]');
            const resultBody = resultView.querySelector('[result-body]');
            resultHeader.textContent = result.name;
            resultBody.innerHTML = `<a href="/search/${result.name}">שיעורים של ${result.name}</a>`;
            resultContainer.append(resultView);

            return { name: result.name, email: result.email, element: resultView };
        })
    });


function loadCalendarDay(dayIndex) {

    const calendar = [
        {
            day: 1,
            parts:
                [[
                    {
                        topic: 'ליקוטי מוהר"ן',
                        schoolGrade: "שיעור ט' ומעלה",
                        name: "הרב אלעזר הבר",
                        hour: "8:45"
                    },
                    {
                        topic: "שיעור בוקר + פתיחה לסדר",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "9:30"
                    },
                    {
                        topic: "שיעור עיון",
                        schoolGrade: "לפי כיתות",
                        name: "כל הישיבה",
                        hour: "12:00"
                    }
                ],
                [
                    {
                        topic: "אורות הקודש",
                        schoolGrade: "שיעור ה'",
                        name: "הרב אלי גרין",
                        hour: "14:15"
                    },
                    {
                        topic: "סוגיות בעיון",
                        schoolGrade: "כל הישיבה",
                        name: "הרב אברהם קורצוייל",
                        hour: "17:45"
                    },

                    {
                        topic: "חבורות כיתתיות",
                        schoolGrade: "שיעור ב'",
                        name: "הרב מדן דריהם / הרב מוטי שראל",
                        hour: "17:45"
                    }
                ],
                [
                    {
                        topic: "כוזרי",
                        schoolGrade: "שיעור א'",
                        name: "רבני שיעור א'",
                        hour: "18:30"
                    },]
                ]
        },

        {
            day: 2,
            parts: [
                [
                    {
                        topic: "שיעור בוקר + פתיחה לסדר",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "9:30"
                    },
                    {
                        topic: "שיעור עיון",
                        schoolGrade: "לפי כיתות",
                        name: "כל הישיבה",
                        hour: "12:00"
                    }
                ],
                [
                    {
                        topic: "עין איה",
                        schoolGrade: "שיעור ו'",
                        name: "הרב אלי גרין",
                        hour: "14:15"
                    },
                    {
                        topic: "סוגיות בעיון",
                        schoolGrade: "כל הישיבה",
                        name: "הרב אברהם קורצוייל",
                        hour: "17:45"
                    },

                ],
                [
                    {
                        topic: "שמונה פרקים לרמבם",
                        schoolGrade: "שיעור א'",
                        name: "הרב שי גרין",
                        hour: "18:30"
                    },
                    {
                        topic: "תחיית עם-ישראל",
                        schoolGrade: "שיעור ב'",
                        name: "הרב אבי חורי",
                        hour: "18:30"
                    },
                    {
                        topic: "אורות התשובה",
                        schoolGrade: "שיעור ד'",
                        name: "הרב ציון כהן",
                        hour: "18:30"
                    },
                    {
                        topic: "תניא",
                        schoolGrade: "שיעור ה'",
                        name: "הרב שי גרין",
                        hour: "18:30"
                    }

                ]
            ]
        },
        {
            day: 3,
            parts:
                [[
                    {
                        topic: "שיעור בוקר + פתיחה לסדר",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "9:30"
                    }
                    ,
                    {
                        topic: "שיעור עיון + קניין תורה",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "11:30"
                    },
                    {
                        topic: "שיעור עיון",
                        schoolGrade: "לפי כיתות",
                        name: "כל הישיבה",
                        hour: "12:00"
                    }
                ],
                [
                    {
                        topic: "דעת תבונות",
                        schoolGrade: "שיעור ח' ומעלה",
                        name: "הרב רפאל טסמה",
                        hour: "14:15"
                    },
                    {
                        topic: "אורות התורה",
                        schoolGrade: "שיעור ב'",
                        name: "הרב מיכאל רוטנברג",
                        hour: "17:45"
                    },
                    {
                        topic: "נתיב הזוגיות",
                        schoolGrade: "שיעור ד'",
                        name: "הרב אבי מטלון",
                        hour: "17:45"
                    },
                    {
                        topic: "אורות התחיה",
                        schoolGrade: "שיעור ה'",
                        name: "הרב שי גרין",
                        hour: "17:45"
                    },
                    {
                        topic: "דעת תבונות",
                        schoolGrade: "שיעור ו'",
                        name: "הרב רפאל טסמה",
                        hour: "17:45"
                    },
                    {
                        topic: "סוגיות באמונה",
                        schoolGrade: "כל הישיבה",
                        name: "הרב אברהם קורצוייל",
                        hour: "17:45"
                    }
                ],
                [
                    {
                        topic: "שיעור כללי",
                        schoolGrade: "כל הישיבה",
                        name: "ראשי הישיבה",
                        hour: "18:30"
                    },
                    {
                        topic: "תורת חיים",
                        schoolGrade: "שיעור א'",
                        name: "הרב משה רוזנבאום",
                        hour: "18:30"
                    }
                ]
                ]
        },
        {
            day: 4,
            parts: [
                [
                    {
                        topic: "ישראל ותחיתו",
                        schoolGrade: "שיעור ה' ומעלה",
                        name: "הרב ציון כהן",
                        hour: "8:45"
                    },
                    {
                        topic: "שיעור בוקר + פתיחה לסדר",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "9:30"
                    },
                    {
                        topic: "שיעור עיון",
                        schoolGrade: "לפי כיתות",
                        name: "כל הישיבה",
                        hour: "12:00"
                    }
                ],
                [
                    {
                        topic: "תפילה",
                        schoolGrade: "שיעור ב'",
                        name: "הרב שי גרין",
                        hour: "15:30"
                    },
                    {
                        topic: "סוגיות בעיון",
                        schoolGrade: "כל הישיבה",
                        name: "הרב אברהם קורצוייל",
                        hour: "17:30"
                    }
                ],
                [
                    {
                        topic: "מסילה לעובד ה'",
                        schoolGrade: "שיעור א'",
                        name: "הרב דוד מור יוסף",
                        hour: "18:30"
                    },
                    {
                        topic: "מסע אל מידות הנפש",
                        schoolGrade: "שיעור ב'",
                        name: "הרב אבי חורי",
                        hour: "18:30"
                    },
                    {
                        topic: "אורות התחיה",
                        schoolGrade: "שיעור ד'",
                        name: "הרב מיכאל רוטנברג",
                        hour: "18:30"
                    },
                    {
                        topic: "נושאים באמונה",
                        schoolGrade: "שיעור ה'",
                        name: "הרב רפאל טסמה",
                        hour: "18:30"
                    },
                    {
                        topic: "אברך במבה",
                        schoolGrade: "שיעור א'",
                        name: "אברכי הישיבה",
                        hour: "22:00"
                    }
                ]
            ]
        },
        {
            day: 5,
            parts: [
                [
                    {
                        topic: "נצח ישראל",
                        schoolGrade: "שיעור ה'",
                        name: "הרב אלעזר הבר",
                        hour: "8:45"
                    },
                    {
                        topic: "אורות הקודש",
                        schoolGrade: "כולל",
                        name: "הרב ציון כהן",
                        hour: "8:45"
                    },
                    {
                        topic: "שיעור בוקר + פתיחה לסדר",
                        schoolGrade: "שיעור א'",
                        name: "ר''מ הכיתה",
                        hour: "9:30"
                    },
                    {
                        topic: "שיעור אמונה",
                        schoolGrade: "שיעור ד-ה",
                        name: "ר''מי הכיתות",
                        hour: "12:00"
                    },
                    {
                        topic: "שיעור עיון",
                        schoolGrade: "לפי כיתות",
                        name: "כל הישיבה",
                        hour: "12:00"
                    }
                ],
                [
                    {
                        topic: "עין איה",
                        schoolGrade: "שיעור ז' ומעלה",
                        name: "הרב אלי גרין",
                        hour: "14:15"
                    },
                    {
                        topic: "תפילה",
                        schoolGrade: "שיעור ב'",
                        name: "הרב שי גרין",
                        hour: "15:30"
                    },
                    {
                        topic: "סוגיות בעיון",
                        schoolGrade: "כל הישיבה",
                        name: "הרב אברהם קורצוייל",
                        hour: "17:30"
                    }
                ],
                [
                    {
                        topic: "הכנה ואהבה ללימוד התורה",
                        schoolGrade: "שיעור א'",
                        name: "הרב דוד מור יוסף",
                        hour: "18:30"
                    },
                    {
                        topic: "כוזרי",
                        schoolGrade: "שיעור ב'",
                        name: "חבורות",
                        hour: "18:30"
                    },
                    {
                        topic: "אקטואליה בפרשת השבוע",
                        schoolGrade: "כל הישיבה",
                        name: "הרב משה רוזנבאום",
                        hour: "22:00"
                    }
                ]
            ]
        },
        {
            day: 6,
            parts:
                [[
                    {
                        topic: "לימוד עצמי",
                        schoolGrade: "",
                        name: " ",
                        hour: "כל הישיבה"
                    },
                ],
                [
                    // no class here
                ],
                [
                    {
                        topic: "שבת שלום",
                        schoolGrade: " ",
                        name: " ",
                        hour: " "
                    }
                ]
                ]
        }
    ]
    const dayData = calendar[dayIndex - 1];

    // Get the morning, noon, and evening containers
    const morningContainer = document.querySelector("[morning]");
    const noonContainer = document.querySelector("[noon]");
    const eveningContainer = document.querySelector("[evening]");

    // Clear the existing content of the containers
    morningContainer.innerHTML = "";
    noonContainer.innerHTML = "";
    eveningContainer.innerHTML = "";

    // Get the learning unit template
    const learningUnitTemplate = document.querySelector("[learning-unit-template]");

    // Loop through the parts of the day
    for (const [partIndex, partData] of dayData.parts.entries()) {
        // Get the container for the current part
        let partContainer;
        if (partIndex === 0) {
            partContainer = morningContainer;
        } else if (partIndex === 1) {
            partContainer = noonContainer;
        } else {
            partContainer = eveningContainer;
        }

        // Loop through the units in the current part
        for (const unitData of partData) {
            // Create a new learning unit element
            const learningUnit = learningUnitTemplate.content.cloneNode(true);

            // Update the content of the learning unit
            learningUnit.querySelector("[topic]").textContent = unitData.topic;
            learningUnit.querySelector("[audience]").textContent = unitData.schoolGrade;
            learningUnit.querySelector("[teacher]").textContent = unitData.name;
            learningUnit.querySelector("[learnTime]").textContent = unitData.hour;

            // Append the learning unit to the part container
            partContainer.appendChild(learningUnit);
        }
    }
}
loadCalendarDay(1);