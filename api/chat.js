export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY environment variable not set.' });
  }

  const { system, messages, max_tokens = 500 } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // OpenAI expects system message as first entry in messages array
  const openaiMessages = [
    { role: 'system', content: system || 'You are a helpful educational AI.' },
    ...messages
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens,
        messages: openaiMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'OpenAI API error' });
    }

    const data = await response.json();

    // Normalize response shape to match what index.html expects: data.content[0].text
    const text = data.choices?.[0]?.message?.content || 'No response received.';
    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    console.error('API proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
