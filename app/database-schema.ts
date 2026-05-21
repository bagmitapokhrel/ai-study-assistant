/**
 * AI Study Assistant Database Schema
 * Defines TypeScript types and SQL for Supabase tables
 * 
 * Tables:
 * - notes: User study notes with AI-generated summaries
 * - quizzes: Quiz content created from notes
 * - quiz_attempts: User quiz attempt records with scores
 * - chat_sessions: AI chat conversation sessions
 * - chat_messages: Individual messages within chat sessions
 */

// ============================================================================
// TypeScript Interfaces for Type Safety
// ============================================================================

/**
 * Note type for user study notes
 */
export interface Note {
  id: string; // UUID
  user_id: string; // Clerk user ID
  title: string;
  content: string; // Rich markdown content
  summary?: string | null; // AI-generated summary
  tags: string[]; // JSON array of tags
  folder?: string | null; // Folder/category
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Quiz question object within quizzes table
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number; // Index of correct option
  explanation?: string;
}

/**
 * Quiz type for quiz definitions
 */
export interface Quiz {
  id: string; // UUID
  user_id: string; // Clerk user ID
  title: string;
  description?: string | null;
  source_id?: string | null; // UUID from notes or decks
  questions: QuizQuestion[]; // JSON array of question objects
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit?: number | null; // Seconds
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * User answer object within quiz_attempts
 */
export interface UserAnswer {
  question_id: string;
  selected_answer: number; // Index of selected option
  is_correct: boolean;
}

/**
 * Quiz attempt type for tracking quiz completion
 */
export interface QuizAttempt {
  id: string; // UUID
  user_id: string; // Clerk user ID
  quiz_id: string; // UUID, FK to quizzes
  score: number;
  max_score: number;
  answers: UserAnswer[]; // JSON array of user answers
  time_taken: number; // Seconds
  created_at: string; // ISO timestamp
}

/**
 * Chat session type for AI conversations
 */
export interface ChatSession {
  id: string; // UUID
  user_id: string; // Clerk user ID
  title: string;
  ai_model: 'claude' | 'openai';
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Chat message type for individual messages in a session
 */
export interface ChatMessage {
  id: string; // UUID
  session_id: string; // UUID, FK to chat_sessions
  role: 'user' | 'assistant';
  content: string;
  tokens_used?: number | null; // For tracking API costs
  created_at: string; // ISO timestamp
}

// ============================================================================
// SQL Schema Creation Statements
// ============================================================================

/**
 * SQL statements to create all tables in Supabase
 * Execute these in order in the Supabase SQL Editor
 */
export const DATABASE_SCHEMA = {
  /**
   * Create notes table for storing user study notes
   */
  CREATE_NOTES_TABLE: `
    CREATE TABLE IF NOT EXISTS notes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT,
      tags JSONB DEFAULT '[]'::jsonb,
      folder TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);
    CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes(created_at);
    CREATE INDEX IF NOT EXISTS notes_folder_idx ON notes(folder);
    CREATE INDEX IF NOT EXISTS notes_user_created_idx ON notes(user_id, created_at DESC);
  `,

  /**
   * Create quizzes table for storing quiz definitions
   */
  CREATE_QUIZZES_TABLE: `
    CREATE TABLE IF NOT EXISTS quizzes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      source_id UUID,
      questions JSONB DEFAULT '[]'::jsonb,
      difficulty TEXT NOT NULL DEFAULT 'medium',
      time_limit INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT valid_difficulty CHECK (difficulty IN ('easy', 'medium', 'hard'))
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS quizzes_user_id_idx ON quizzes(user_id);
    CREATE INDEX IF NOT EXISTS quizzes_created_at_idx ON quizzes(created_at);
    CREATE INDEX IF NOT EXISTS quizzes_difficulty_idx ON quizzes(difficulty);
    CREATE INDEX IF NOT EXISTS quizzes_user_created_idx ON quizzes(user_id, created_at DESC);
  `,

  /**
   * Create quiz_attempts table for tracking quiz completion
   */
  CREATE_QUIZ_ATTEMPTS_TABLE: `
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id TEXT NOT NULL,
      quiz_id UUID NOT NULL,
      score NUMERIC NOT NULL,
      max_score NUMERIC NOT NULL,
      answers JSONB DEFAULT '[]'::jsonb,
      time_taken INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_quiz_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS quiz_attempts_user_id_idx ON quiz_attempts(user_id);
    CREATE INDEX IF NOT EXISTS quiz_attempts_quiz_id_idx ON quiz_attempts(quiz_id);
    CREATE INDEX IF NOT EXISTS quiz_attempts_created_at_idx ON quiz_attempts(created_at);
    CREATE INDEX IF NOT EXISTS quiz_attempts_user_created_idx ON quiz_attempts(user_id, created_at DESC);
  `,

  /**
   * Create chat_sessions table for AI chat conversations
   */
  CREATE_CHAT_SESSIONS_TABLE: `
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      ai_model TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT valid_ai_model CHECK (ai_model IN ('claude', 'openai'))
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS chat_sessions_user_id_idx ON chat_sessions(user_id);
    CREATE INDEX IF NOT EXISTS chat_sessions_created_at_idx ON chat_sessions(created_at);
    CREATE INDEX IF NOT EXISTS chat_sessions_user_created_idx ON chat_sessions(user_id, created_at DESC);
  `,

  /**
   * Create chat_messages table for messages within sessions
   */
  CREATE_CHAT_MESSAGES_TABLE: `
    CREATE TABLE IF NOT EXISTS chat_messages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      session_id UUID NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      tokens_used INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT valid_role CHECK (role IN ('user', 'assistant')),
      CONSTRAINT fk_chat_messages_session FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx ON chat_messages(session_id);
    CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx ON chat_messages(created_at);
    CREATE INDEX IF NOT EXISTS chat_messages_role_idx ON chat_messages(role);
    CREATE INDEX IF NOT EXISTS chat_messages_session_created_idx ON chat_messages(session_id, created_at ASC);
  `,
};

/**
 * Combined SQL script to run all migrations at once
 * Execute in Supabase SQL Editor
 */
export const FULL_SCHEMA_SQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Notes table
${DATABASE_SCHEMA.CREATE_NOTES_TABLE}

-- Quizzes table
${DATABASE_SCHEMA.CREATE_QUIZZES_TABLE}

-- Quiz attempts table
${DATABASE_SCHEMA.CREATE_QUIZ_ATTEMPTS_TABLE}

-- Chat sessions table
${DATABASE_SCHEMA.CREATE_CHAT_SESSIONS_TABLE}

-- Chat messages table
${DATABASE_SCHEMA.CREATE_CHAT_MESSAGES_TABLE}
`;

// ============================================================================
// Helper Functions for Database Operations
// ============================================================================

/**
 * Create a new note
 */
export async function createNote(
  supabase: any,
  userId: string,
  data: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<Note> {
  const { data: note, error } = await supabase
    .from('notes')
    .insert([
      {
        ...data,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return note;
}

/**
 * Create a new quiz
 */
export async function createQuiz(
  supabase: any,
  userId: string,
  data: Omit<Quiz, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<Quiz> {
  const { data: quiz, error } = await supabase
    .from('quizzes')
    .insert([
      {
        ...data,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return quiz;
}

/**
 * Record a quiz attempt
 */
export async function recordQuizAttempt(
  supabase: any,
  userId: string,
  data: Omit<QuizAttempt, 'id' | 'created_at' | 'user_id'>
): Promise<QuizAttempt> {
  const { data: attempt, error } = await supabase
    .from('quiz_attempts')
    .insert([
      {
        ...data,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return attempt;
}

/**
 * Create a new chat session
 */
export async function createChatSession(
  supabase: any,
  userId: string,
  data: Omit<ChatSession, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<ChatSession> {
  const { data: session, error } = await supabase
    .from('chat_sessions')
    .insert([
      {
        ...data,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return session;
}

/**
 * Add a message to a chat session
 */
export async function addChatMessage(
  supabase: any,
  sessionId: string,
  data: Omit<ChatMessage, 'id' | 'created_at' | 'session_id'>
): Promise<ChatMessage> {
  const { data: message, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        ...data,
        session_id: sessionId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return message;
}

/**
 * Get all notes for a user
 */
export async function getUserNotes(supabase: any, userId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all quizzes for a user
 */
export async function getUserQuizzes(supabase: any, userId: string): Promise<Quiz[]> {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all quiz attempts for a user
 */
export async function getUserQuizAttempts(
  supabase: any,
  userId: string
): Promise<QuizAttempt[]> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all quiz attempts for a specific quiz
 */
export async function getQuizAttempts(supabase: any, quizId: string): Promise<QuizAttempt[]> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('quiz_id', quizId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all chat sessions for a user
 */
export async function getUserChatSessions(
  supabase: any,
  userId: string
): Promise<ChatSession[]> {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all messages in a chat session
 */
export async function getChatSessionMessages(
  supabase: any,
  sessionId: string
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

// ============================================================================
// Row Level Security (RLS) Policy SQL
// ============================================================================

/**
 * SQL statements to enable RLS and create policies for security
 * These ensure users can only access their own data
 */
export const RLS_POLICIES = `
-- Enable RLS on all tables
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Notes policies
CREATE POLICY "Users can view their own notes" ON notes
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own notes" ON notes
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own notes" ON notes
  FOR DELETE USING (auth.uid()::text = user_id);

-- Quizzes policies
CREATE POLICY "Users can view their own quizzes" ON quizzes
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own quizzes" ON quizzes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own quizzes" ON quizzes
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own quizzes" ON quizzes
  FOR DELETE USING (auth.uid()::text = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Chat sessions policies
CREATE POLICY "Users can view their own chat sessions" ON chat_sessions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own chat sessions" ON chat_sessions
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own chat sessions" ON chat_sessions
  FOR DELETE USING (auth.uid()::text = user_id);

-- Chat messages policies (allow access through session_id)
CREATE POLICY "Users can view messages from their sessions" ON chat_messages
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM chat_sessions WHERE auth.uid()::text = user_id
    )
  );

CREATE POLICY "Users can insert messages to their sessions" ON chat_messages
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT id FROM chat_sessions WHERE auth.uid()::text = user_id
    )
  );
`;
