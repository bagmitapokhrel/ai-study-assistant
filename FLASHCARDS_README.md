# Smart Flashcard Feature

A powerful AI-driven flashcard generation and study system integrated into the AI Study Assistant.

## 🌟 Features

### AI-Powered Generation
- **Dual AI Support**: Choose between Claude 3.5 Sonnet (Anthropic) or GPT-4 (OpenAI)
- **Smart Question Creation**: AI automatically generates contextual question-answer pairs
- **Difficulty Levels**: Questions are automatically rated as Easy, Medium, or Hard
- **Batch Creation**: Generate 10-50 flashcards in a single operation

### Input Flexibility
- **Text Input**: Paste study notes directly
- **File Upload**: Support for PDF, DOCX, and TXT files
- **Content Parsing**: Automatically extracts text from uploaded documents

### Study Interface
- **Interactive Cards**: Click to flip between question and answer
- **Progress Tracking**: Real-time progress bar showing completion
- **Navigation**: Move between cards using buttons or keyboard
- **Result Tracking**: Mark answers as correct/incorrect for spaced repetition
- **Summary Stats**: View performance summary at end of session

### Data Persistence
- **Supabase Integration**: All decks and flashcards stored securely
- **User-Specific**: Each user's content is private and isolated
- **Study History**: Track your learning progress over time

## 🏗️ Architecture

### Frontend Components
- **FlashcardGenerator**: Form interface for creating new flashcard decks
- **FlashcardStudy**: Interactive study session interface
- **DeckCard**: Display individual flashcard decks
- **Sidebar**: Navigation component

### Backend Services
- **ai-service.ts**: AI integration with Claude and OpenAI
- **file-parser.ts**: PDF/DOCX parsing utilities
- **supabase-config.ts**: Database configuration and types
- **API Routes**: RESTful endpoints for flashcard operations

### Database Schema
```
decks (one-to-many with flashcards)
├── id (UUID)
├── user_id (from Clerk)
├── name
├── description
├── created_at
└── updated_at

flashcards
├── id (UUID)
├── deck_id (FK)
├── question (text)
├── answer (text)
├── difficulty (easy|medium|hard)
├── created_at
└── updated_at

study_sessions (analytics)
├── id (UUID)
├── user_id
├── deck_id
├── flashcard_id
├── result (correct|incorrect)
└── created_at
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Clerk account for authentication
- Supabase project
- OpenAI API key
- Anthropic API key

### Installation

1. **Install dependencies** (already updated in package.json):
```bash
npm install
```

Dependencies added:
- `@anthropic-sdk/sdk` - Claude AI integration
- `pdf-parse` - PDF file parsing
- `docx` - DOCX file parsing

2. **Set environment variables** (.env.local):
```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# AI APIs
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

3. **Setup Supabase database**:
   - Run the SQL script from FLASHCARD_SETUP.md
   - Create tables for decks, flashcards, and study_sessions

4. **Start development server**:
```bash
npm run dev
```

Visit http://localhost:3000 and click "Create Flashcards" to get started!

## 📖 Usage

### Creating a Deck

1. Navigate to `/flashcards` or click "Create Flashcards" button
2. Enter your deck name (e.g., "Biology Chapter 3")
3. Paste your study material or upload a file
4. Choose AI model (Claude or GPT-4)
5. Set number of flashcards to generate (10-50)
6. Click "Generate Flashcards"

### Studying

1. Click "Study" on any deck
2. Read the question and think of the answer
3. Click the card to reveal the answer
4. Mark as "Correct" ✓ or "Incorrect" ✗
5. Navigate with arrows or buttons
6. View summary at the end of the session

## 🎨 UI/UX Design Highlights

### Design System
- **Color Palette**: Blues, purples, and gradients for modern look
- **Typography**: Clear hierarchy with bold headers and readable body text
- **Spacing**: Generous padding and margins for breathing room
- **Responsiveness**: Mobile-first design that scales to desktop

### Interactive Elements
- **Card Flip Animation**: Smooth transitions between question/answer
- **Progress Bar**: Visual feedback on study progress
- **Gradient Buttons**: Eye-catching CTAs with hover effects
- **Icons**: Lucide React icons for visual clarity
- **Loading States**: Spinner and disabled state feedback

### Accessibility
- Semantic HTML elements
- Proper color contrast ratios
- Keyboard navigation support
- ARIA labels where needed

## 🔌 API Endpoints

### POST /api/generate-flashcards
Generate flashcards from content using AI

**Request:**
```json
{
  "content": "Your study material here",
  "deckName": "Biology Chapter 3",
  "model": "claude" | "openai",
  "count": 10
}
```

**Response:**
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

**Error Response:**
```json
{
  "error": "Failed to generate flashcards"
}
```

## 🔐 Security

- **Authentication**: Clerk handles user authentication
- **Authorization**: All API routes verify user ownership
- **Sensitive Data**: API keys stored in environment variables
- **Data Privacy**: Users can only access their own decks

## 📊 Analytics & Tracking

Study sessions are tracked with:
- User ID (from Clerk)
- Deck ID and Flashcard ID
- Result (correct/incorrect)
- Timestamp

Use this data to:
- Calculate accuracy per deck
- Identify weak areas
- Implement spaced repetition
- Track learning trends

## 🎯 Future Enhancements

### Phase 2
- [ ] Spaced repetition scheduling
- [ ] Deck sharing and collaboration
- [ ] Export to Anki format
- [ ] Voice input for questions
- [ ] Custom difficulty weighting

### Phase 3
- [ ] Mobile app version
- [ ] Dark mode toggle
- [ ] Deck categories/folders
- [ ] Advanced search
- [ ] Study streaks & gamification

### Phase 4
- [ ] Machine learning optimization
- [ ] Image support in flashcards
- [ ] Live study sessions
- [ ] Integration with note apps
- [ ] Multimedia flashcards

## 🐛 Troubleshooting

### API Key Issues
- Verify `.env.local` has correct keys
- Check that keys have appropriate permissions
- Ensure keys are not expired

### File Upload Fails
- Check file size (max 10MB)
- Verify file format (PDF, DOCX, TXT)
- Check browser console for errors

### Flashcard Generation Errors
- Ensure content is not empty
- Check API rate limits
- Verify API keys are active

## 📝 File Structure

```
ai-study-assistant/
├── app/
│   ├── page.tsx (Updated homepage)
│   ├── ai-service.ts (AI logic)
│   ├── file-parser.ts (File parsing)
│   ├── supabase-config.ts (DB config)
│   ├── generate-flashcards-api.ts (API route)
│   ├── layout.tsx
│   └── [other routes]
├── components/
│   ├── FlashcardGenerator.tsx
│   ├── FlashcardStudy.tsx
│   ├── DeckCard.tsx
│   └── Sidebar.tsx
├── package.json (Updated dependencies)
├── FLASHCARD_SETUP.md (Setup guide)
└── README.md (this file)
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment variables
3. Check browser console for errors
4. Review API responses in Network tab

## 📄 License

Part of the AI Study Assistant project.
