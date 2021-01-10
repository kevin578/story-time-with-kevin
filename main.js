var variables = {
  name: "",
}

var story = {
  currentScene: "intro",
  intro: {
    title: 'Story Time with Kevin',
    story: "",
    choices: [{
      type: 'text',
      value: 'What is your name',
      buttonText: 'Start your adventure',
      variableToSet: 'name'
    }],
    defaultDestination: 'attack'
  },
  attack: {
    title: 'Chapter one',
    story: `Once upon a time, the village of Onionland lived in peace. Until one day, it was attacked by the evil King Bishop. The Mayor of Onionland, said there's only one person who can save us, our hero ${variables.name}.`,
    choices: [
      {
      type: 'radio',
      value: "Yes, I'm ready to accept!",
      destination: 'battle'
      },
      {
      type: 'radio',
      value: "Meh, think I'd rather just play video games instead.",
      destination: 'goHome'
      }
    ]
  },
  battle: {
    title: 'The epic battle for Onionland!',
    story: `It's King Bishop, he looks pretty scary...`,
    choices: [
      {
      type: 'radio',
      value: "Attack him with a sword.",
      destination: 'sword'
      },
      {
      type: 'radio',
      value: "Attack him with a candlestick.",
      destination: 'candleStick'
      }
    ]
  },
  sword: {
    title: "You've saved Onionlnad!",
    story: "King Bishop is defeated and Onionland is safe!!!! You're so popular now.",
    defaultDestination: "intro",
  },
  candleStick: {
    title: "A candlestick, seriously?",
    story: "That's not even a real weapon. King Bishop easily defeated you. I really just don't understand why you would pick a candlestick over a sword.",
    defaultDestination: "intro"
  },
  goHome: {
    title: "Back at home!",
    story: "Yes, you're back in comfort of your own home. Don't worry about it, someone else took care of the problem. No need to at all to feel guilty...",
    defaultDestination: 'intro',
    buttonText: "Let's try this again"
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderScene();
});

function renderScene() {
  var content = document.querySelector('#content');
  
  content.innerHTML = `
    <h1>${story[story.currentScene].title}</h1>
    <p>${story[story.currentScene].story}</p>
    ${setInputs(story[story.currentScene].choices)}
    <button id = "submitButton">Next</button>
    ` 
  var button = document.querySelector("#submitButton");
  button.addEventListener("click", function() {
    getInputs();  
  });
}

function getInputs() {
  inputs = document.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type == "text") {
      variables[input.getAttribute("data-variable-to-set")] = input.value;
    } else {
      if (input.checked) {
        story.currentScene = input.getAttribute("data-destination");
        renderScene();
        return;
      }
    }
  }
  story.currentScene = story[story.currentScene].defaultDestination;
  renderScene();
}

function setInputs(choices) {
  if (!choices) {
    return "";
  }
  var input = '';
  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    if (choice.type == 'text') {
      inputChild = `
        <label for = "${choice.type}-${i}">${choice.value}</label>
        <input data-variable-to-set = ${choice.variableToSet}  id = "${choice.type}-${i}" type = '${choice.type}' />
      `
    } else {
      inputChild = `
        <input data-destination = ${choice.destination} id = "${choice.type}-${i}" type = '${choice.type}' name = '${choice.type}-group' />
        <label for = "${choice.type}-${i}">${choice.value}</label>
      `
    }
    input = input + `<div id = "inputs"> ${inputChild} </div>`;
  }
  return input;
}