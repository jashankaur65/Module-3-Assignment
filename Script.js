// Track current story position
let currentStory = "start";

// Reference to HTML elements
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

// Story data
const storyData = {
    start: {
        text: "You wake up in a forest. There are two paths ahead of you.",
        choices: [
            { text: "Take the left path", next: "leftPath" },
            { text: "Take the right path", next: "rightPath" },
            { text: "Look for a hidden trail", next: "secretPath" }
        ]
    },
    leftPath: {
        text: "You enter the abandoned house and find a treasure chest.",
        choices: [
            { text: "Open it", next: "goldEnding" },
            { text: "Ignore it", next: "starveEnding" }
        ]
    },
    rightPath: {
        text: "You step into the dark cave and hear a monster growl.",
        choices: [
            { text: "Fight the monster", next: "monsterEnding" },
            { text: "Run away", next: "escapeEnding" }
        ]
    },
    secretPath: {
        text: "You notice a small hidden trail behind some bushes.",
        choices: [
            { text: "Follow the trail", next: "villageEnding" },
            { text: "Ignore it", next: "stormEnding" }
        ]
    },
    goldEnding: { text: "You open the chest and find gold! You win!", choices: [] },
    starveEnding: { text: "You ignore the chest, get lost, and starve. Game over.", choices: [] },
    monsterEnding: { text: "You fight bravely, but the monster defeats you. Game over.", choices: [] },
    escapeEnding: { text: "You run away and escape safely. You win!", choices: [] },
    villageEnding: { text: "You follow the trail and find a friendly village. You win!", choices: [] },
    stormEnding: { text: "You ignore the trail and get caught in a storm. Game over.", choices: [] }
};

// Function to render the story
function renderStory() {
    // Clear old choices
    choicesElement.innerHTML = "";

    // Show current story text
    storyElement.innerText = storyData[currentStory].text;

    // Show choices as buttons
    storyData[currentStory].choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.setAttribute("tabindex", "0"); // focusable for keyboard navigation
        button.onclick = () => {
            currentStory = choice.next;
            renderStory();
        };
        choicesElement.appendChild(button);
    });

    // If no choices, add a restart button
    if (storyData[currentStory].choices.length === 0) {
        const restartButton = document.createElement("button");
        restartButton.innerText = "Restart Game";
        restartButton.setAttribute("tabindex", "0");
        restartButton.onclick = () => {
            currentStory = "start";
            renderStory();
        };
        choicesElement.appendChild(restartButton);
    }
}

// Start the game
renderStory();

