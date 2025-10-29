// import { YoutubeTranscript } from 'youtube-transcript';

export async function getVideoTranscript(_videoId: string): Promise<string> {
  try {
    // const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    // return transcript.map(item => item.text).join(' ');
    return '';
  } catch (error) {
    console.error('Error fetching transcript:', error);
    // Return empty string if transcript not available
    return '';
  }
}
