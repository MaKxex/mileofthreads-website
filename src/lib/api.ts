import qs from 'qs';
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const fetchAPI = async (path: string, locale: string = '', params: Record<string, any> = {}) => {
  const queryString = qs.stringify(
    {
      ...params,
      ...(locale ? { locale } : {}),
    },
    { encodeValuesOnly: true }
  );

  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_API_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return { data: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch API failed:", error);
    return { data: null };
  }
};