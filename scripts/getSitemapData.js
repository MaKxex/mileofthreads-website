// scripts/getSitemapData.js
require('dotenv').config();
const https = require('https');

async function fetchSitemapData() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  async function fetchAPI(path, locale) {
    return new Promise((resolve, reject) => {
      const url = `${STRAPI_URL}/api${path}?locale=${locale}`;
      https.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      }).on('error', reject);
    });
  }

  const locales = ['en', 'ru', 'lv'];
  const projects = new Set();

  try {
    // Получаем проекты для каждой локали
    for (const locale of locales) {
      const response = await fetchAPI("/work-examples", locale);
      
      if (response?.data) {
        response.data.forEach(project => {
          if (project.slug) {
            projects.add(project);
          }
        });
      }
    }

    return {
      STRAPI_URL,
      projects: Array.from(projects),
      locales
    };
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return {
      STRAPI_URL,
      projects: [],
      locales
    };
  }
}

module.exports = { fetchSitemapData };