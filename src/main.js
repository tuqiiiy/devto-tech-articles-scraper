import { Actor, log } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const input = (await Actor.getInput()) || {};
const {
    tag = 'ai',
    maxArticles = 50,
    proxyConfiguration,
} = input;

const proxyConfig = proxyConfiguration ? await Actor.createProxyConfiguration(proxyConfiguration) : undefined;

log.info('--- Starting Dev.to Tech Articles & Leads Scraper ---');
log.info(`Tag: ${tag}`);
log.info(`Max Articles: ${maxArticles}`);

let totalSaved = 0;
let page = 1;
const perPage = 30;

while (totalSaved < maxArticles) {
    const proxyUrl = proxyConfig ? await proxyConfig.newUrl() : undefined;
    const url = `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&page=${page}&per_page=${perPage}`;
    log.info(`Fetching page ${page}: ${url}`);

    try {
        const response = await gotScraping({
            url,
            proxyUrl,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'accept': 'application/json, text/plain, */*',
            },
            responseType: 'json',
            timeout: { request: 20000 },
            retry: { limit: 2 },
        });

        const articles = response.body;
        if (!Array.isArray(articles) || articles.length === 0) {
            log.info('No more articles found for this tag.');
            break;
        }

        for (const a of articles) {
            if (totalSaved >= maxArticles) break;

            const user = a.user || {};
            const record = {
                id: a.id ? String(a.id) : null,
                title: a.title || 'Untitled',
                description: a.description || '',
                url: a.url || '',
                canonicalUrl: a.canonical_url || a.url || '',
                tags: Array.isArray(a.tag_list) ? a.tag_list : [],
                authorName: user.name || '',
                authorUsername: user.username || '',
                authorGithub: user.github_username || null,
                authorTwitter: user.twitter_username || null,
                authorWebsite: user.website_url || null,
                authorProfilePhoto: user.profile_image || null,
                reactionsCount: a.public_reactions_count || 0,
                commentsCount: a.comments_count || 0,
                readingTimeMinutes: a.reading_time_minutes || 0,
                publishedAt: a.published_at || null,
                scrapedAt: new Date().toISOString(),
            };

            await Actor.pushData(record);
            totalSaved++;
            log.info(`[${totalSaved}] "${record.title}" | Author: ${record.authorName} (GitHub: ${record.authorGithub || 'N/A'}, Twitter: ${record.authorTwitter || 'N/A'}) | 👍 ${record.reactionsCount}`);
        }

        page++;
        await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
        log.error(`Error fetching Dev.to articles: ${err.message}`);
        break;
    }
}

log.info(`\n🎉 Scraping completed successfully! Total articles extracted: ${totalSaved}`);
await Actor.exit();
