# TruPulse-Ai-Chatbot-Assessment


An AI-powered chatbot interface built with a **plugin-style architecture** that supports slash commands and natural language queries. Users can interact via commands like `/weather Paris`, `/calc 10 * 5`, or `/define innovation`, and receive dynamic responses rendered in rich UI cards.

---

## 🚀 Features

- 🗨️ **Chat UI**: Scrollable chat interface with user and assistant messages
- 🔌 **Plugin System**: Easily add new tools via plugin architecture
- 🌤️ `/weather [city]`: Get real-time weather using a public API
- ➗ `/calc [expression]`: Evaluate safe math expressions (e.g. `/calc 12 * (5 + 2)`)
- 📚 `/define [word]`: Fetch dictionary definitions from an API
- 💬 **Natural Language Parsing** (Bonus): Understand queries like "What’s the weather in Tokyo?"
- 💾 **Chat History Persistence**: Save messages in `localStorage` so they persist on reload
- 🧩 **Extensible Plugin Manager**: Dynamically add plugins at runtime
- 🎨 **Rich Message Cards**: Plugin responses are styled for clarity and user experience

---

## 🧠 Plugin Architecture

Each plugin includes:

- `name`: Unique plugin identifier
- `trigger`: Regex pattern or keyword matcher
- `execute(input: string)`: Core logic that returns plugin-specific data
- `render(data: any)`: Custom render function for displaying results in chat

Plugins are registered with the Plugin Manager and triggered automatically when a message matches their pattern.

---

## 🏗️ Tech Stack

| Concern             | Tech Used             |
|---------------------|------------------------|
| Frontend Framework  | React (Vite or CRA)   |
| Styling             | Tailwind CSS          |
| State Management    | React Context         |
| Parsing Logic       | Custom Regex-based Parser |
| API Fetching        | Fetch API             |
| Persistence         | localStorage          |

---

## 🧪 Slash Commands (Examples)

| Command              | Description                        |
|----------------------|------------------------------------|
| `/weather Paris`     | Shows current weather in Paris     |
| `/calc 5 + 2 * 3`     | Calculates and returns `11`        |
| `/define empathy`    | Returns dictionary definition       |

---

## 📦 Deliverables

### ✅ Source Code Repository
This repository contains the complete source code for the chatbot interface with meaningful, descriptive commit history.

GitHub: [https://github.com/Akshitttttt/TruPulse-Ai-Chatbot-Assessment](https://github.com/Akshitttttt/TruPulse-Ai-Chatbot-Assessment)

---

## 📄 README Contents

### ⚙️ Setup and Running Instructions

#### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

#### Steps to Run

```bash
# 1. Clone the repository
git clone https://github.com/Akshitttttt/TruPulse-Ai-Chatbot-Assessment.git
cd TruPulse-Ai-Chatbot-Assessment

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start the development server
npm run dev
# or
yarn dev

# 4. Open the app in browser
http://localhost:5173





