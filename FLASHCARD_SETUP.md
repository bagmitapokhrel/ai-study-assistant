# 🎓 Smart Flashcard Feature - Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# AI APIs
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_claude_api_key_here
```

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run this script:

```sql
-- Decks table
CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Study sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  result TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);
```

## API Endpoints

### Generate Flashcards
- **POST** `/api/generate-flashcards`
- **Headers**: Content-Type: application/json
- **Body**:
  ```json
  {
    "content": "Your study material here",
    "deckName": "Biology Chapter 3",
    "model": "claude" | "openai",
    "count": 10
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "deckId": "uuid",
    "deckName": "Biology Chapter 3",
    "flashcardCount": 10,
    "flashcards": [
      {
        "question": "What is photosynthesis?",
        "answer": "The process by which plants convert light energy into chemical energy",
        "difficulty": "medium"
      }
    ]
  }
  ```

## File Structure

```
app/
├── page.tsx (Updated with hero section)
├── ai-service.ts (AI generation logic)
├── file-parser.ts (PDF/DOCX parsing)
├── supabase-config.ts (Database types & config)
├── flashcards-api.ts (API route)
└── layout.tsx

components/
├── FlashcardGenerator.tsx (UI for creating flashcards)
├── FlashcardStudy.tsx (UI for studying flashcards)
└── Sidebar.tsx (Navigation)
```

## Features Implemented

✅ **AI Integration**
- Claude 3.5 Sonnet (Anthropic)
- GPT-4 (OpenAI)
- User-selectable AI model

✅ **Flashcard Generation**
- Text input support
- Automatic question/answer pair creation
- Difficulty level assignment
- Multiple flashcards per session

✅ **Study Interface**
- Card flip animations
- Progress tracking
- Correct/Incorrect marking
- Session completion summary

✅ **UI/UX Design**
- Gradient backgrounds
- Smooth transitions
- Responsive mobile design
- Dark mode ready
- Lucide icons
- Tailwind CSS styling

## Next Steps

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Run database migrations in Supabase
4. Start dev server: `npm run dev`
5. Visit `/flashcards` to create your first deck

## Customization Ideas

- Add spaced repetition algorithm
- Implement deck categories/folders
- Add collaborative deck sharing
- Create mobile app version
- Add voice input support
- Implement dark mode toggle
- Add export to Anki format
