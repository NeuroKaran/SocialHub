// import OpenAI from 'openai';
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export interface VideoSummary {
  summary: string;
  keyPoints: string[];
  topics: string[];
}

// Generate AI summary from video content
export async function generateVideoSummary(
  title: string,
  description: string,
  transcript: string
): Promise<VideoSummary> {
  const prompt = `Analyze this YouTube video and provide a comprehensive summary:

Title: ${title}
Description: ${description}
Transcript: ${transcript.substring(0, 3000)}

Please provide:
1. A concise 2-3 sentence summary
2. 3-5 key points covered in the video
3. Main topics/themes

Format your response as JSON with keys: summary, keyPoints (array), topics (array)`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    const parsed = JSON.parse(content);
    return {
      summary: parsed.summary,
      keyPoints: parsed.keyPoints || [],
      topics: parsed.topics || [],
    };
  } catch (error) {
    console.error('Error generating summary:', error);
    // Fallback to basic summary
    return {
      summary: description.substring(0, 200) + '...', 
      keyPoints: [],
      topics: [],
    };
  }
}

// Generate research insights
export async function generateResearchInsights(topic: string, context: string): Promise<string> {
  const prompt = `Based on the following content about ${topic}, generate detailed research insights, trends, and analysis:

Context:
${context}

Provide:
- Current trends and developments
- Key insights and findings
- Potential applications
- Areas for further exploration`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    return response.choices[0].message.content || 'Unable to generate insights.';
  } catch (error) {
    console.error('Error generating research:', error);
    throw error;
  }
}

// Generate creative ideas
export async function generateIdeas(topic: string, context: string): Promise<string[]> {
  const prompt = `Based on this topic: ${topic}

Context:
${context}

Generate 5 creative and actionable ideas or applications. Be specific and practical.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 600,
    });

    const content = response.choices[0].message.content || '';
    // Parse numbered list or split by newlines
    const ideas = content
      .split('\n')
      .filter(line => line.trim() && /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    return ideas.slice(0, 5);
  } catch (error) {
    console.error('Error generating ideas:', error);
    throw error;
  }
}
