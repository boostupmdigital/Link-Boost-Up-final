
// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://jefa-web.com.ar' });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/diseno_y_desarrollo_web_para_agencias_de_marketing', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/paginas_y_sitios_web_para_empresas_y_profesionales', changefreq: 'daily', priority: 0.8 });
  sitemap.write({ url: '/portfolio_grafico', changefreq: 'monthly', priority: 0.5 });

  sitemap.end();

  await streamToPromise(sitemap);

  console.log('✅ Sitemap generado correctamente');
})();
