export async function getMessages(locale: string) {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Нет переводов для локали: ${locale}`);
    return {}; // fallback пустой объект
  }
}