var story = {
  name: "",
  currentScene: "goHome",
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
    story: `Once upon a time, the village of Onionland lived in peace. Until one day, it was attacked by the evil King Bishop. The Mayor of Onionland, said there's only one person who can save us, our hero ${this.name}.`,
    choices: [
      {
      type: 'radio',
      value: "Yes, I'm ready to accept!",
      destination: 'start'
      },
      {
      type: 'radio',
      value: "Meh, think I'd rather just play video games instead.",
      destination: 'goHome'
      }
    ]
  },
  start: {
    title: 'The journey begins',
    story: `${this.name} is doing great`,
    choices: [
      {
      type: 'radio',
      value: "Go to blah blah!",
      destination: 'intro'
      },
      {
      type: 'radio',
      value: "Meh, think I'd rather just play video games instead.",
      destination: 'goHome'
      }
    ]
  },
  goHome: {
    title: 'ZZZZZ',
    story: "Ah, yeah, man, this is great.",
    defaultDestination: 'intro'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderScene();
});

function renderScene() {
  var content = document.querySelector('#content');
  console.log(story.currentScene)
  content.innerHTML = `
    <h1>${story[story.currentScene].title}</h1>
    <p>${story[story.currentScene].story}</p>
    ${setInputs(story[story.currentScene].choices)}
    <button id = "submitButton">Go on</button>
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
      story[input.getAttribute("data-variable-to-set")] = input.value;
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