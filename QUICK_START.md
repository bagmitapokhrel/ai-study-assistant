# Smart Flashcard Feature - Quick Start

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_value
CLERK_SECRET_KEY=your_value
NEXT_PUBLIC_SUPABASE_URL=your_value
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value
SUPABASE_SERVICE_KEY=your_value
OPENAI_API_KEY=your_value
ANTHROPIC_API_KEY=your_value
```

### 3. Setup Supabase Database
Copy and run this SQL in Supabase dashboard:

```sql
-- Decks
CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Study Sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  result TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
```

### 4. Start Server
```bash
npm run dev
```

### 5. Create Your First Deck
- Visit http://localhost:3000
- Click "Create Flashcards"
- Paste notes or upload a file
- Choose Claude or GPT-4
- Generate 10 flashcards!

---

## 📝 What You Get

### Components Created
✅ **FlashcardGenerator.tsx** - Create decks from text or files
✅ **FlashcardStudy.tsx** - Study interface with flip animations
✅ **DeckCard.tsx** - Display and manage decks
✅ **Updated page.tsx** - Modern landing page

### Services Created
✅ **ai-service.ts** - Claude & OpenAI integration
✅ **file-parser.ts** - PDF, DOCX, TXT parsing
✅ **supabase-config.ts** - Database setup

### API Routes
✅ **POST /api/generate-flashcards** - Generate flashcards from content

### Documentation
✅ **FLASHCARD_SETUP.md** - Detailed setup guide
✅ **FLASHCARDS_README.md** - Complete feature documentation

---

## 🎯 Features

**AI-Powered**
- Claude 3.5 Sonnet (Anthropic)
- GPT-4 (OpenAI)
- User-selectable

**Flexible Input**
- Text paste
- PDF upload
- DOCX upload
- TXT files

**Rich UI**
- Card flip animations
- Progress tracking
- Difficulty badges
- Performance summary
- Responsive design
- Gradient themes

**Data Persistence**
- Supabase backend
- User-private content
- Study history tracking
- Secure authentication

---

## 🔧 Customization

### Change AI Model
Edit `ai-service.ts`:
- Update model names (line 42, 58)
- Modify system prompts (line 20)

### Adjust Card Count
`FlashcardGenerator.tsx` line 32:
```tsx
max="50"  // Change this limit
```

### Modify Colors
Use Tailwind classes in components:
- `from-blue-600 to-purple-600` - Gradient colors
- `bg-green-50` - Background colors
- `text-blue-700` - Text colors

### Customize Prompts
Edit prompt in `ai-service.ts` line 20-47:
```javascript
const GENERATION_PROMPT = (content, count) => `
  // Your custom prompt here
`
```

---

## 📊 Data Structure

### Decks
```typescript
{
  id: "uuid",
  user_id: "clerk_id",
  name: "Biology Ch 3",
  description: "Generated with claude",
  created_at: "2026-05-20T...",
  updated_at: "2026-05-20T..."
}
```

### Flashcards
```typescript
{
  id: "uuid",
  deck_id: "uuid",
  question: "What is photosynthesis?",
  answer: "The process...",
  difficulty: "medium",
  created_at: "2026-05-20T...",
  updated_at: "2026-05-20T..."
}
```

### Study Sessions
```typescript
{
  id: "uuid",
  user_id: "clerk_id",
  deck_id: "uuid",
  flashcard_id: "uuid",
  result: "correct",
  created_at: "2026-05-20T..."
}
```

---

## 🚨 Common Issues

**"API key not found"**
- Check `.env.local` exists in project root
- Verify key values are correct
- Restart dev server

**"Failed to save flashcards"**
- Verify Supabase connection
- Check database tables exist
- Ensure service key has write permissions

**"File upload fails"**
- Check file size < 10MB
- Use PDF, DOCX, or TXT format
- Check browser console for errors

---

## 📚 Additional Resources

- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **Anthropic Docs**: https://docs.anthropic.com
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## ✨ Next Steps

1. **Try generating** a flashcard deck from sample notes
2. **Customize colors** to match your brand
3. **Add spaced repetition** logic to study sessions
4. **Build deck dashboard** to list all user decks
5. **Implement sharing** feature for collaborative learning

---

**Need help?** Check FLASHCARDS_README.md for detailed documentation!
