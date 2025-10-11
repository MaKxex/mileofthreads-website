const { fetchSitemapData } = require('./scripts/getSitemapData');
require('dotenv/config');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mileofthreads.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*', '/server-sitemap.xml'],
  generateIndexSitemap: false,
  alternateRefs: [
    {
      href: 'https://mileofthreads.com/en',
      hreflang: 'en'
    },
    {
      href: 'https://mileofthreads.com/ru',
      hreflang: 'ru'
    },
    {
      href: 'https://mileofthreads.com/lv',
      hreflang: 'lv'
    }
  ],
  additionalPaths: async (config) => {
    const result = [];
    const locales = ['en', 'ru', 'lv'];
    
    const { projects } = await fetchSitemapData();
    console.log('Загруженные проекты:', projects);
    
    const projectsByDocId = projects.reduce((acc, project) => {
      if (!acc[project.documentId]) {
        acc[project.documentId] = {};
      }
      acc[project.documentId][project.locale] = project;
      return acc;
    }, {});

    for (const locale of locales) {
        const homePath = `/${locale}`;
        result.push({
          loc: `${config.siteUrl}${homePath}`,
          changefreq: 'daily',
          priority: 0.9,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map(altLocale => ({
            href: `${config.siteUrl}/${altLocale}`,
            hreflang: altLocale
          }))
        });

        for (const [documentId, localizedProjects] of Object.entries(projectsByDocId)) {
          const project = localizedProjects[locale];
          if (project) {
            const projectPath = `/${locale}/project/${project.slug}`;
            result.push({
              loc: `${config.siteUrl}${projectPath}`,
              changefreq: 'daily',
              priority: 0.8,
              lastmod: project.updatedAt,
              alternateRefs: Object.entries(localizedProjects).map(([altLocale, altProject]) => ({
                href: `${config.siteUrl}/${altLocale}/project/${altProject.slug}`,
                hreflang: altLocale
              }))
            });
          }
        }
    }

    return result;
  },
  transform: async (config, path) => {
    // Custom transform function
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  }
}