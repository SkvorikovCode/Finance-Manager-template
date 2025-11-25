import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { message, financialContext } = await request.json();

    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      return NextResponse.json(
        { error: 'OpenRouter API ключ не настроен. Добавьте OPENROUTER_API_KEY в .env.local' },
        { status: 500 }
      );
    }

    const systemPrompt = `Ты — финансовый ИИ-ассистент. Помогай пользователю управлять финансами, давай советы по бюджету, анализируй расходы и доходы.

Текущая финансовая ситуация пользователя:
- Общий доход: ${financialContext.totalIncome.toLocaleString('ru-RU')} ₽
- Общие расходы: ${financialContext.totalExpense.toLocaleString('ru-RU')} ₽
- Баланс: ${financialContext.balance.toLocaleString('ru-RU')} ₽
- Количество транзакций: ${financialContext.transactionCount}

Расходы по категориям:
${Object.entries(financialContext.expensesByCategory || {})
  .map(([cat, amount]) => `- ${cat}: ${(amount as number).toLocaleString('ru-RU')} ₽`)
  .join('\n') || 'Нет данных'}

Отвечай на русском языке, кратко и по делу. Давай практичные советы.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Finance Manager AI',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Ошибка при обращении к ИИ. Проверьте API ключ.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || 'Не удалось получить ответ';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
