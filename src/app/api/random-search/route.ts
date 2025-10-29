import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export async function POST(request: NextRequest) {
  try {
    const { categoryId, description, searchResults } = await request.json();

    if (!categoryId || !description) {
      return NextResponse.json(
        { error: 'Category ID and description are required' },
        { status: 400 }
      );
    }

    if (!searchResults || !Array.isArray(searchResults) || searchResults.length === 0) {
      return NextResponse.json(
        { error: 'No search results provided' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get category details
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .eq('user_id', user.id)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Create widgets from real search results
    const widgetsToInsert = (searchResults as SearchResult[])
      .slice(0, 8) // Limit to 8 results
      .map((result: SearchResult) => ({
        user_id: user.id,
        category_id: categoryId,
        category_name: category.name,
        title: cleanText(result.title || 'Untitled'),
        summary: cleanText(result.snippet || 'No description available'),
        video_url: result.link || '#',
        created_at: new Date().toISOString(),
      }));

    if (widgetsToInsert.length === 0) {
      return NextResponse.json(
        { error: 'No valid search results to process' },
        { status: 400 }
      );
    }

    const { data: insertedWidgets, error: insertError } = await supabase
      .from('widgets')
      .insert(widgetsToInsert)
      .select();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: `Failed to save search results: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      widgets: insertedWidgets || [],
      count: (insertedWidgets || []).length,
      source: 'real_search_results',
    });
  } catch (error: unknown) {
    console.error('Error in random search:', error);
    return NextResponse.json(
      { error: (error instanceof Error && error.message) || 'Failed to process search' },
      { status: 500 }
    );
  }
}

/**
 * Cleans text by removing HTML tags and extra whitespace
 */
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim()
    .substring(0, 500); // Limit length
}