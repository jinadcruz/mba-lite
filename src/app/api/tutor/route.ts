import { NextRequest, NextResponse } from 'next/server';

// POST /api/tutor — Send a message to the AI tutor
// In production, this calls the Anthropic Claude API with full lesson context.
// For MVP without an API key, it returns a mock Socratic response.

export async function POST(request: NextRequest) {
  try {
    const { message, lessonContext } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if Anthropic API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey && apiKey !== 'sk-ant-xxxxx') {
      // ─── Live Claude API Call ────────────────────────────
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: process.env.AI_TUTOR_PRIMARY_MODEL || 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: `You are an MBA tutor for the MBA Lite platform. You teach using the Socratic method — always ask a probing question before giving a direct answer. You are warm, intellectually rigorous, and encouraging.

Current context: ${lessonContext || 'The student is studying DCF Valuation in the Corporate Finance module.'}

Rules:
- Use the Socratic method: ask questions to guide understanding
- Reference specific MBA frameworks (Porter's Five Forces, DCF, WACC, etc.)
- Keep responses concise (2-3 paragraphs max)
- End with a thought-provoking question when possible
- Be encouraging but intellectually challenging`,
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || 'I apologize, but I was unable to generate a response. Please try again.';

      return NextResponse.json({ response: text });
    }

    // ─── Mock Response (no API key) ─────────────────────────
    const mockResponses = [
      "That's a great question! Before I give you the answer directly, let me challenge your thinking. What do you think would happen to the valuation if we doubled the discount rate? And more importantly — what real-world factors would cause a company's discount rate to increase?\n\nThis is exactly the kind of sensitivity analysis that makes DCF both powerful and dangerous. The framework gives you precision, but that precision can be misleading if your assumptions are off.",
      "Interesting observation! You're touching on one of the most debated topics in corporate finance. Let me pose this back to you: if two equally smart analysts can look at the same company and arrive at valuations that differ by 3x, does that make DCF a flawed framework — or does it reveal something important about the nature of valuation itself?\n\nHint: think about what DCF is really measuring. It's not the company's value — it's the analyst's beliefs about the future, expressed mathematically.",
      "You're making real progress here! Now let's push your understanding further. You mentioned WACC — the Weighted Average Cost of Capital. Here's a thought experiment: imagine a company that's 100% equity-financed versus one that's 50% debt, 50% equity. Both generate identical cash flows.\n\nWhich one has a lower WACC, and why? And what does Modigliani-Miller's famous theorem say about whether this even matters?",
    ];

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Tutor API error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
