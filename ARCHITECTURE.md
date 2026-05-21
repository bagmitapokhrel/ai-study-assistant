# Smart Flashcard Architecture

## System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        User's Browser                             │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │           React Components (Client-Side)                │    │
│  │                                                          │    │
│  │  ┌─────────────────┐  ┌─────────────────┐ ┌──────────┐ │    │
│  │  │ FlashcardGen    │  │ FlashcardStudy  │ │ DeckCard │ │    │
│  │  │ erator          │  │                 │ │          │ │    │
│  │  ├─────────────────┤  ├─────────────────┤ ├──────────┤ │    │
│  │  │ • Text input    │  │ • Card display  │ │ • Display│ │    │
│  │  │ • File upload   │  │ • Flip animate  │ │ • Manage │ │    │
│  │  │ • Model select  │  │ • Mark answers  │ │ • Delete │ │    │
│  │  │ • Count select  │  │ • Progress bar  │ │          │ │    │
│  │  │ • Generate btn  │  │ • Results show  │ │          │ │    │
│  │  └─────────────────┘  └─────────────────┘ └──────────┘ │    │
│  │                                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
└─────────────────────────────┬──────────────────────────────────────┘
                              │ HTTP/JSON
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│                     Next.js Backend (Server)                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              API Routes & Services                       │    │
│  │                                                          │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │  POST /api/generate-flashcards                 │   │    │
│  │  │  • Verify user (Clerk auth)                    │   │    │
│  │  │  • Call AI service                             │   │    │
│  │  │  • Save to Supabase                            │   │    │
│  │  └──────────────┬──────────────────────────────────┘   │    │
│  │                 │                                       │    │
│  │  ┌──────────────▼──────────────┐                       │    │
│  │  │     AI Service Module       │                       │    │
│  │  │  (ai-service.ts)            │                       │    │
│  │  ├─────────────────────────────┤                       │    │
│  │  │ generateWithClaude()        │                       │    │
│  │  │ generateWithOpenAI()        │                       │    │
│  │  │ parsePrompt()               │                       │    │
│  │  │ validateJSON()              │                       │    │
│  │  └──────────────┬──────────────┘                       │    │
│  │                 │                                       │    │
│  │  ┌──────────────▼──────────────┐                       │    │
│  │  │   File Parser Module        │                       │    │
│  │  │  (file-parser.ts)           │                       │    │
│  │  ├─────────────────────────────┤                       │    │
│  │  │ parsePDF()                  │                       │    │
│  │  │ parseDOCX()                 │                       │    │
│  │  │ extractTextFromFile()       │                       │    │
│  │  │ validateFileSize()          │                       │    │
│  │  └──────────────┬──────────────┘                       │    │
│  │                 │                                       │    │
│  └─────────────────┼───────────────────────────────────────┘    │
└──────────────┬─────┼─────────────────────────────────────────────┘
               │     │
      ┌────────┘     └────────┐
      │                       │
      ↓                       ↓
┌──────────────┐        ┌──────────────────┐
│    Clerk     │        │  External APIs   │
│   Auth       │        │                  │
│              │        ├──────────────────┤
│ • Verify user│        │ Claude API       │
│ • Get user ID│        │ (Anthropic)      │
│              │        │                  │
└──────────────┘        │ OpenAI API       │
                        │ (gpt-4o-mini)    │
                        │                  │
                        └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
              ┌──────────────┐         ┌──────────────┐
              │  Claude 3.5  │         │   GPT-4      │
              │  Sonnet      │         │  (OpenAI)    │
              │              │         │              │
              │ Generate Q&A │         │ Generate Q&A │
              │ pairs from   │         │ pairs from   │
              │ content      │         │ content      │
              └──────────────┘         └──────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                                ↓
                    ┌─────────────────────────┐
                    │    Parse Response       │
                    │  • Extract questions    │
                    │  • Extract answers      │
                    │  • Assign difficulty    │
                    │  • Validate JSON        │
                    └────────────┬────────────┘
                                 │
                                 ↓
                    ┌─────────────────────────┐
                    │    Supabase Database    │
                    │                         │
                    │  ┌──────────────────┐  │
                    │  │  Decks Table     │  │
                    │  │ • id (UUID)      │  │
                    │  │ • user_id        │  │
                    │  │ • name           │  │
                    │  │ • description    │  │
                    │  │ • timestamps     │  │
                    │  └──────────────────┘  │
                    │                         │
                    │  ┌──────────────────┐  │
                    │  │  Flashcards      │  │
                    │  │ • id (UUID)      │  │
                    │  │ • deck_id (FK)   │  │
                    │  │ • question       │  │
                    │  │ • answer         │  │
                    │  │ • difficulty     │  │
                    │  │ • timestamps     │  │
                    │  └──────────────────┘  │
                    │                         │
                    │  ┌──────────────────┐  │
                    │  │Study Sessions    │  │
                    │  │ • id (UUID)      │  │
                    │  │ • user_id        │  │
                    │  │ • deck_id        │  │
                    │  │ • flashcard_id   │  │
                    │  │ • result         │  │
                    │  │ • timestamp      │  │
                    │  └──────────────────┘  │
                    │                         │
                    └─────────────────────────┘
```

## Data Flow: Creating Flashcards

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. User Input                                                       │
│                                                                     │
│    • Deck Name: "Biology Chapter 3"                                │
│    • Content: [Study notes]                                        │
│    • Model: "claude"                                               │
│    • Count: 10                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 2. FlashcardGenerator Component Sends Request                       │
│                                                                     │
│    POST /api/generate-flashcards                                   │
│    {                                                               │
│      "content": "...",                                             │
│      "deckName": "Biology Chapter 3",                              │
│      "model": "claude",                                            │
│      "count": 10                                                    │
│    }                                                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 3. API Route Handler (generate-flashcards-api.ts)                  │
│                                                                     │
│    • Verify user with Clerk auth ✓                                │
│    • Validate input parameters ✓                                   │
│    • Create deck in Supabase ✓                                    │
│    • Call generateFlashcards() ✓                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 4. AI Service Layer (ai-service.ts)                                │
│                                                                     │
│    Choose AI Model:                                                 │
│    ├─ If "claude" → generateWithClaude()                           │
│    │   • Call Claude API with prompt                              │
│    │   • Parse JSON response                                       │
│    │   • Return flashcard array                                    │
│    │                                                               │
│    └─ If "openai" → generateWithOpenAI()                          │
│        • Call OpenAI API with prompt                              │
│        • Parse JSON response                                       │
│        • Return flashcard array                                    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 5. AI Model Processing                                              │
│                                                                     │
│    Claude/GPT-4:                                                    │
│    • Analyze content                                               │
│    • Identify key concepts                                         │
│    • Create Q&A pairs                                              │
│    • Assign difficulty levels                                      │
│    • Return JSON: [                                                │
│        {                                                            │
│          "question": "What is photosynthesis?",                    │
│          "answer": "The process...",                               │
│          "difficulty": "medium"                                    │
│        },                                                          │
│        ...                                                         │
│      ]                                                              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 6. Save to Database                                                 │
│                                                                     │
│    Create Deck Record:                                              │
│    ├─ decks.insert([{                                              │
│    │     user_id: "user_123",                                     │
│    │     name: "Biology Chapter 3",                               │
│    │     description: "Generated with claude..."                   │
│    │   }])                                                         │
│    │                                                               │
│    └─ Insert Flashcards:                                           │
│        flashcards.insert([                                         │
│          {                                                          │
│            deck_id: "deck_123",                                    │
│            question: "What is photosynthesis?",                    │
│            answer: "The process...",                               │
│            difficulty: "medium"                                    │
│          },                                                        │
│          ...                                                       │
│        ])                                                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 7. Return Success Response                                          │
│                                                                     │
│    {                                                               │
│      "success": true,                                              │
│      "deckId": "deck_123",                                         │
│      "deckName": "Biology Chapter 3",                              │
│      "flashcardCount": 10,                                         │
│      "flashcards": [...]                                           │
│    }                                                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 8. Update UI with Results                                           │
│                                                                     │
│    • Display success message ✓                                     │
│    • Show flashcard count                                          │
│    • Transition to StudyMode ✓                                     │
│    • Ready to study! 🎉                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow: Studying Flashcards

```
┌──────────────────────────────────────────┐
│ Load Flashcard Deck                      │
│ • Get deck ID                            │
│ • Fetch all flashcards                   │
│ • Sort by order                          │
│ • Initialize tracking                    │
└──────────────────┬───────────────────────┘
                   │
                   ↓
         ┌─────────────────────┐
         │ Display Question    │
         │ (Card 1/10)         │
         │ "What is...?"       │
         └──────────┬──────────┘
                    │
                    ↓
         ┌─────────────────────┐
         │ User Clicks Card    │
         │ to Flip             │
         └──────────┬──────────┘
                    │
                    ↓
         ┌─────────────────────┐
         │ Show Answer         │
         │ [Click to flip]     │
         └──────────┬──────────┘
                    │
                    ↓
    ┌───────────────┴───────────────┐
    │                               │
    ↓                               ↓
┌────────────────┐       ┌────────────────┐
│ Mark Incorrect │       │ Mark Correct   │
│ [X] Button     │       │ [✓] Button     │
└────────┬───────┘       └────────┬───────┘
         │                        │
         └────────────┬───────────┘
                      │
                      ↓
         ┌─────────────────────┐
         │ Track Result        │
         │ results[cardId] =   │
         │ false/true          │
         └──────────┬──────────┘
                    │
                    ↓
    ┌───────────────┴───────────────┐
    │                               │
    ↓                               ↓
┌────────────────────┐  ┌────────────────────┐
│ More Cards? (NO)   │  │ More Cards? (YES)  │
│ Show Results       │  │ Next Card          │
│ • Correct: 8/10    │  │ (Card 2/10)        │
│ • 80% accuracy     │  │ Repeat from        │
│ • Review Again?    │  │ Display Question   │
└────────────────────┘  └────────────────────┘
```

## Component Hierarchy

```
App
├── Page (home)
│   └── Features Section
│
├── Flashcards Page
│   ├── FlashcardGenerator
│   │   ├── Input Form
│   │   ├── Textarea
│   │   ├── Select (Model)
│   │   ├── Input (Count)
│   │   └── Submit Button
│   │
│   └── FlashcardStudy
│       ├── Header
│       ├── Progress Bar
│       ├── Card Display
│       │   └── Question/Answer
│       ├── Navigation Buttons
│       ├── Result Buttons
│       │   ├── Correct
│       │   └── Incorrect
│       └── Results Summary
│           ├── Score
│           └── Review Again
│
└── Dashboard
    ├── Sidebar
    └── DeckCard
        ├── Deck Info
        ├── Study Button
        └── Delete Button
```

---

## Technology Stack Details

### Frontend
- **React 19.2.4** - UI components and state
- **TypeScript 5** - Type-safe code
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React 1.16.0** - SVG icons
- **Next.js 16.2.6** - Framework & routing

### Backend
- **Next.js API Routes** - REST endpoints
- **Node.js** - Runtime

### External Services
- **Clerk 7.3.7** - User authentication
- **Supabase 2.106.0** - PostgreSQL database
- **OpenAI 6.38.0** - GPT-4 API
- **Anthropic SDK 0.24.3** - Claude API

### Libraries
- **pdf-parse 1.1.1** - PDF extraction
- **docx 8.5.0** - DOCX parsing

---

This architecture ensures scalability, security, and excellent user experience!
