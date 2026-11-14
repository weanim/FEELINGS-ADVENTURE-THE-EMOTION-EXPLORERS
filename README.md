# Feelings Adventure — The Emotion Explorers

A beginner-friendly static website starter for primary pupils (Year 1–3), designed for GitHub Pages.

## Run locally
Open `index.html` in a browser. For best results, use VS Code + Live Server.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload all files and folders in this project (keep the folder structure).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish your site.

## Customisation guide
Open `script.js` and find `CONFIG` near the top:
- `introVideoEmbedUrl`: YouTube embed URL, e.g. `https://www.youtube.com/embed/VIDEO_ID`
- `introVideoFile`: local MP4 path, e.g. `media/intro.mp4`
- `aiEndpoint`: your secure backend URL for a real AI assistant.

### Add background music
Place a royalty-free MP3 at `media/background-music.mp3`. Pupils must tap **Music off** to start playback because browsers block autoplay with sound. Keep music optional and gentle.

### Add your own videos, games, quizzes and notes
- Videos/audio: put files in `media/`.
- Add game modules in `games/`.
- Add quizzes in `quizzes/`.
- Add visual notes in `notes/`.
- Use the `EXTENSION SLOTS` comments near the bottom of `script.js`.
- The current practice quiz and mini quest are working examples; replace or extend them with your team's content.

## AI Buddy — important
The pop-up currently runs in **demo mode** with simple built-in answers. It is not connected to a real AI model yet. To enable real AI:
1. Build a small server/backend endpoint that accepts `{ "message": "...", "year": 1 }` and returns `{ "reply": "..." }`.
2. Set `CONFIG.aiEndpoint` to that endpoint.
3. Keep the AI provider secret key on the server, never in this public repository or browser JavaScript.
4. Add child-safety controls, age-appropriate responses, moderation, and teacher supervision before classroom use.

## Learning content included
- Year 1: recognising happy, sad, angry, scared.
- Year 2: describing feelings with simple sentences; happy, sad, angry, scared, excited, tired.
- Year 3: explaining feelings with reasons; excited, worried, nervous, surprised, confused, disappointed.
- Flow: introduction → AI Buddy → drilling → interactive game → answer checking / rewards.

The Year 1–3 vocabulary progression is based on the supplied project planning documents. It is a design suggestion, not an official DSKP mapping. Verify the relevant English Language DSKP standards before formal academic claims.

## Files
- `index.html` — page structure
- `style.css` — theme, layout and responsive styling
- `script.js` — sample activities and configuration
- `assets/adventure-banner.jpg` — cropped artwork from the supplied theme image
- `media/` — add your own media here
