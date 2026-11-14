// FEELINGS ADVENTURE — edit the CONFIG section to add your team's media and activities.
const CONFIG = {
  // Paste a YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID
  introVideoEmbedUrl: "",
  // Or use a local video file: place it in /media and enter "media/intro.mp4"
  introVideoFile: "",
  // Add royalty-free music at media/background-music.mp3
  backgroundMusicFile: "media/background-music.mp3",
  // AI integration: connect your own secure backend endpoint here when ready.
  // Never put a private API key directly in this public GitHub Pages code.
  aiEndpoint: ""
};

const questionSets = {
  1: [
    {emoji:"😊", answer:"happy", choices:["happy","sad","angry","scared"], hint:"A big smile!"},
    {emoji:"😢", answer:"sad", choices:["angry","sad","happy","scared"], hint:"Tears are falling."},
    {emoji:"😠", answer:"angry", choices:["tired","happy","angry","sad"], hint:"The eyebrows are down."},
    {emoji:"😨", answer:"scared", choices:["scared","happy","sad","bored"], hint:"Something gives this person a fright."}
  ],
  2: [
    {emoji:"🤩", answer:"excited", choices:["excited","tired","sad","angry"], hint:"A birthday surprise is coming!"},
    {emoji:"😴", answer:"tired", choices:["happy","tired","scared","excited"], hint:"This person needs some rest."},
    {emoji:"😊", answer:"happy", choices:["worried","happy","angry","sad"], hint:"A lovely gift makes her smile."},
    {emoji:"😢", answer:"sad", choices:["excited","sad","tired","surprised"], hint:"Her toy is missing."}
  ],
  3: [
    {emoji:"🎁", answer:"excited", choices:["confused","excited","worried","disappointed"], hint:"It is your birthday and you see a big present!"},
    {emoji:"😟", answer:"worried", choices:["surprised","nervous","worried","excited"], hint:"You cannot find your school bag."},
    {emoji:"😲", answer:"surprised", choices:["disappointed","surprised","confused","worried"], hint:"Your best friend visits unexpectedly."},
    {emoji:"😕", answer:"confused", choices:["excited","nervous","confused","surprised"], hint:"The instructions are difficult to understand."}
  ]
};

let currentYear = 1, questionIndex = 0, answered = false, stars = Number(localStorage.getItem("emotionStars") || 0);
const $ = id => document.getElementById(id);
function updateTreasure(){
  $("starCount").textContent = stars;
  $("progressBar").style.width = Math.min(100, stars * 10) + "%";
  const badges = $("badgeRow").children;
  [1,5,10].forEach((n,i)=>{badges[i].className = stars>=n ? "unlocked" : "locked-badge";badges[i].textContent = stars>=n ? ["🌟 First Star","🏅 Super Explorer","👑 Emotion Master"][i] : ["🔒 First Star","🔒 Super Explorer","🔒 Emotion Master"][i];});
  localStorage.setItem("emotionStars", stars);
}
function renderQuestion(){
  const set = questionSets[currentYear], q = set[questionIndex % set.length]; answered=false;
  $("practiceTitle").textContent = `Year ${currentYear} · ${["Feelings Explorer","Sentence Explorer","Emotion Master"][currentYear-1]}`;
  $("practiceEmoji").textContent=q.emoji;
  $("practiceQuestion").textContent=currentYear===3 ? "What is the best feeling word for this situation?" : "How does this person feel?";
  $("practiceHint").textContent=q.hint;
  $("practiceFeedback").textContent="Pick the best answer to earn a star!";
  $("practiceOptions").innerHTML="";
  q.choices.forEach(choice=>{
    const b=document.createElement("button");b.className="answer-option";b.textContent=choice;
    b.addEventListener("click",()=>{
      if(answered)return;answered=true;
      if(choice===q.answer){b.classList.add("correct");$("practiceFeedback").textContent="🎉 Wonderful! That's correct. You earned a star!";stars++;updateTreasure();}
      else{b.classList.add("wrong");$("practiceFeedback").textContent=`Good try! The answer is “${q.answer}”. Keep learning!`;[...$("practiceOptions").children].forEach(x=>{if(x.textContent===q.answer)x.classList.add("correct")});}
    });$("practiceOptions").appendChild(b);
  });
}
$("practiceYear").addEventListener("change",e=>{currentYear=Number(e.target.value);questionIndex=0;renderQuestion()});
$("nextPractice").addEventListener("click",()=>{questionIndex++;renderQuestion()});
document.querySelectorAll("[data-year]").forEach(b=>b.addEventListener("click",()=>{$("practiceYear").value=b.dataset.year;currentYear=Number(b.dataset.year);questionIndex=0;renderQuestion();$("practice").scrollIntoView({behavior:"smooth"})}));
updateTreasure();renderQuestion();

// Introduction media slot: video embed or local MP4, if supplied.
if(CONFIG.introVideoEmbedUrl){
  $("introMedia").innerHTML=`<iframe title="Feelings Adventure introduction" src="${CONFIG.introVideoEmbedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:360px;border:0;border-radius:16px"></iframe>`;
}else if(CONFIG.introVideoFile){
  $("introMedia").innerHTML=`<video controls playsinline style="width:100%;max-height:420px;border-radius:16px"><source src="${CONFIG.introVideoFile}"></video>`;
}

// Background music: browsers require a user gesture before audio can play.
const music=$("backgroundMusic");let musicOn=false;
$("musicToggle").addEventListener("click",async()=>{
  try{if(!musicOn){await music.play();musicOn=true;$("musicLabel").textContent="Music on";$("musicToggle").classList.add("playing");}
  else{music.pause();musicOn=false;$("musicLabel").textContent="Music off";$("musicToggle").classList.remove("playing");}}
  catch(e){$("musicLabel").textContent="Add music file";alert("Add your royalty-free MP3 file as media/background-music.mp3 first.");}
});

// AI Buddy pop-up with a safe offline demo. Connect CONFIG.aiEndpoint to a backend for live AI.
const overlay=$("buddyOverlay");
function openBuddy(){overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");$("chatInput").focus()}
function closeBuddy(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true")}
["openBuddy","heroBuddy","mapBuddy"].forEach(id=>$(id).addEventListener("click",openBuddy));
$("closeBuddy").addEventListener("click",closeBuddy);
overlay.addEventListener("click",e=>{if(e.target===overlay)closeBuddy()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeBuddy()});
const demoReply = text => {
  const t=text.toLowerCase();
  if(t.includes("happy"))return "Happy means feeling good and cheerful! 😊 Example: I am happy because I am playing with my friends.";
  if(t.includes("sad"))return "Sad means feeling unhappy. 😢 Example: She is sad because her balloon flew away.";
  if(t.includes("angry"))return "Angry means feeling mad. 😠 Example: He is angry because someone broke his toy.";
  if(t.includes("scared"))return "Scared means feeling afraid. 😨 Example: I am scared of the loud thunder.";
  if(t.includes("excited"))return "Excited means very happy about something that is going to happen! 🤩 Example: I am excited because it is my birthday.";
  if(t.includes("sentence")||t.includes("example"))return "Try these sentences: I am happy. She is sad. He is excited because he won a game. 🌟";
  if(t.includes("practise")||t.includes("practice"))return "Let's practise! How do you feel when you get a lovely present? A) sad  B) excited  C) angry. Think about it! 🎁";
  return "Great question, little explorer! Feelings adjectives are words that tell us how someone feels, such as happy, sad, angry and scared. Which feeling would you like to explore? 🌈";
};
async function sendChat(message){
  if(!message.trim())return;
  const user=document.createElement("div");user.className="user-message";user.textContent=message;$("chatMessages").appendChild(user);
  $("chatInput").value="";
  const bot=document.createElement("div");bot.className="bot-message";bot.textContent="Let me think... ✨";$("chatMessages").appendChild(bot);$("chatMessages").scrollTop=$("chatMessages").scrollHeight;
  try{
    if(CONFIG.aiEndpoint){
      const response=await fetch(CONFIG.aiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,year:currentYear})});
      if(!response.ok)throw new Error("AI service unavailable");
      const data=await response.json();bot.textContent=data.reply||"Let's try another question!";
    }else{await new Promise(r=>setTimeout(r,450));bot.textContent=demoReply(message);}
  }catch(e){bot.textContent="Oops! I cannot connect right now. Please ask your teacher for help. 💜";}
  $("chatMessages").scrollTop=$("chatMessages").scrollHeight;
}
$("chatForm").addEventListener("submit",e=>{e.preventDefault();sendChat($("chatInput").value)});
document.querySelectorAll("[data-prompt]").forEach(b=>b.addEventListener("click",()=>sendChat(b.dataset.prompt)));

// MINI QUEST DEMO — replace this with the team's full game module when ready.
$("startGame").addEventListener("click",()=>{
  const mount=$("gameMount");mount.hidden=false;
  mount.innerHTML=`<h3 style="font-family:'Baloo 2';margin-top:0">🌟 Mini Quest: Choose the feeling!</h3><p>A puppy has found its favourite toy. How does it feel?</p><div style="font-size:55px">🐶🎾</div><div class="answer-options"><button class="answer-option" data-mini="happy">happy</button><button class="answer-option" data-mini="sad">sad</button><button class="answer-option" data-mini="angry">angry</button><button class="answer-option" data-mini="scared">scared</button></div><p id="miniFeedback" aria-live="polite">Choose one answer!</p>`;
  mount.querySelectorAll("[data-mini]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.mini==="happy"){$("miniFeedback").textContent="🎉 Correct! You found the feeling. +1 star!";stars++;updateTreasure();}else $("miniFeedback").textContent="Nice try! Think about how the puppy feels with its toy. 💜";}));
  mount.scrollIntoView({behavior:"smooth",block:"center"});
});

// Responsive navigation
$("menuToggle").addEventListener("click",()=>document.querySelector(".topbar nav").classList.toggle("show"));

// EXTENSION SLOTS: Add your future modules below.
// Example: document.querySelector("#extraQuiz").innerHTML = "<h3>My new quiz</h3>";
// Suggested folders: /media/videos, /media/audio, /games, /quizzes, /notes
