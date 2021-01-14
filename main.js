var story;
function getStory(name) {
  return {
    currentScene: "attack",
    attack: {
      title: 'Chapter one',
      story: `Once upon a time, the village of Cute Puppistan lived in peace. Until one day, it was attacked by Avarice the Angry Aardvark. The Premier of Cute Puppistan, said there's only one person who can save us ${name}`,
      choices: [
        {
        value: "Yes, I'm ready to accept!",
        destination: 'battle'
        },
        {
        value: "Meh, think I'd rather just play video games instead.",
        destination: 'goHome'
        }
      ]
    },
    battle: {
      title: 'The epic battle for Cute Puppistan!',
      story: `It's Avarice the Angry Aardvark, he looks pretty scary...`,
      choices: [
        {
        value: "Attack him with a sword.",
        destination: 'sword'
        },
        {
        value: "Attack him with a candlestick.",
        destination: 'candleStick'
        }
      ]
    },
    sword: {
      title: "You've saved us!",
      story: "Avarice the Angry Aardvark is defeated and Cute Puppistan is safe!!!! You're, like, so popular now.",
      defaultDestination: "attack",
    },
    candleStick: {
      title: "A candlestick, seriously?",
      story: "That's not even a real weapon. Avarice the Angry Aardvark easily defeated you. I really just don't understand why you would pick a candlestick over a sword.",
      image: "candlestick.png",
      defaultDestination: "attack"
    },
    goHome: {
      title: "Back at home!",
      story: "Yes, you're back in comfort of your own home. Don't worry about it, someone else took care of the problem. No need to at all to feel guilty...",
      image: "video_game.png",
      defaultDestination: 'attack',
      buttonText: "Let's try this again"
    }
  }
} 

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('#story-start')
  button.addEventListener('click', function() {
    var name = document.querySelector("#text-input").value
    story = getStory(name);
    renderScene();
  })

});

function renderScene() {
  var content = document.querySelector('#content');
  var image = "";
  if (story[story.currentScene].image) {
    image = `<img id = "story_image" />`
  }
  content.innerHTML = `
    <h1>${story[story.currentScene].title}</h1>
    <p>${story[story.currentScene].story}</p>
    ${image}
    ${setInputs(story[story.currentScene].choices)}
    <button id = "submitButton">Next</button>
    ` 
  if (story[story.currentScene].image) {
    document.querySelector("#story_image").src = "img/" + story[story.currentScene].image;
  }
  var button = document.querySelector("#submitButton");
  button.addEventListener("click", function() {
    getInputs();  
  });
}

function getInputs() {
  inputs = document.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        story.currentScene = inputs[i].getAttribute("data-destination");
        renderScene();
        return;
      }
    }
  story.currentScene = story[story.currentScene].defaultDestination;
  renderScene();
}

function setInputs(choices) {
  if (!choices) {
    return "";
  }
  var input = "";
  for (var i = 0; i < choices.length; i++) {
    input += `
      <div>
      <input data-destination = ${choices[i].destination} id = "${choices[i].type}-${i}" type = 'radio' name = '${choices[i].type}-group' />
      <label for = "${choices[i].type}-${i}">${choices[i].value}</label>
      </div>
    `
    }

  return  `<div id = "inputs"> ${input}</div>`;;
}