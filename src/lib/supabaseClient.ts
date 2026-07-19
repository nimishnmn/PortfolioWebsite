import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// A simple local/in-memory mock implementation for development when Supabase is not configured yet
class MockSupabaseClient {
  private mockTable: string = '';

  from(table: string) {
    this.mockTable = table;
    return this;
  }

  async insert(data: any) {
    console.log(`[Mock Supabase - Table: ${this.mockTable}] Inserting data:`, data);
    
    // Save to localStorage so it's persistent for the user to see/test
    try {
      const existing = localStorage.getItem(`mock_${this.mockTable}`) || '[]';
      const parsed = JSON.parse(existing);
      parsed.push({ ...data, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() });
      localStorage.setItem(`mock_${this.mockTable}`, JSON.stringify(parsed));
    } catch (e) {
      console.error('Error saving mock data to localStorage:', e);
    }
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return { data, error: null };
  }

  async select() {
    console.log(`[Mock Supabase - Table: ${this.mockTable}] Fetching data`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    try {
      const data = localStorage.getItem(`mock_${this.mockTable}`) || '[]';
      return { data: JSON.parse(data), error: null };
    } catch (e) {
      return { data: [], error: e };
    }
  }
}

// Check if credentials are valid. If not, use the mock client
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new MockSupabaseClient() as any);
