# 💻 Dev.to Tech Articles & Developer Leads Scraper

Extract trending tech articles, AI guides, and developer profiles from **Dev.to**. Get author names, verified **GitHub usernames, Twitter handles**, personal website links, reaction counts, and comment metrics.

---

## 🌟 Why Use Dev.to Scraper?

Dev.to is one of the largest developer communities in the world. This Actor helps **DevRel managers, technical recruiters, tech content creators, and open-source founders** find high-signal developers and trending technical topics.

* 🐙 **Direct GitHub & Twitter Handles:** Extracts author social links and developer profiles for direct outreach and talent sourcing.
* 🤖 **Tech Tag Filtering:** Scrape by `ai`, `webdev`, `javascript`, `python`, `react`, `devops`, `opensource`, or `career`.
* 📈 **Engagement Analytics:** Track reaction counts (likes, unicorns, reading lists) and comment counts.
* ⚡ **Fast & Reliable:** Pure API extraction with zero block risk and near-zero Apify compute cost.
* 📊 **Export Anywhere:** Download your data in CSV/JSON/Excel or connect to Google Sheets, Make, Zapier, or Airtable.

---

## 📥 Input Options

| Parameter | Type | Default | Description |
|---|---|---|---|
| `tag` | String | `"ai"` | Tech tag to filter: `ai`, `webdev`, `javascript`, `python`, `react`, `devops`, `opensource`, `career`. |
| `maxArticles` | Integer | `50` | Maximum number of articles to retrieve. |
| `proxyConfiguration` | Object | `null` | Optional proxy configuration. |

---

## 📤 Sample Output (JSON)

```json
{
  "id": "2104592",
  "title": "Building Autonomous Multi-Agent Workflows with Python",
  "description": "A comprehensive guide to orchestrating agents...",
  "url": "https://dev.to/alexdev/building-autonomous-multi-agent-workflows-34bc",
  "tags": ["ai", "python", "agents"],
  "authorName": "Alex Rivera",
  "authorUsername": "alexdev",
  "authorGithub": "alexrivera-ai",
  "authorTwitter": "alex_codes",
  "authorWebsite": "https://alexrivera.dev",
  "reactionsCount": 184,
  "commentsCount": 27,
  "readingTimeMinutes": 6,
  "publishedAt": "2026-11-17T09:15:00.000Z",
  "scrapedAt": "2026-11-17T11:49:00.000Z"
}
```

---

## 💼 High-Value Use Cases

1. **Tech Recruitment & Headhunting:** Discover active developer talent by specific skills (e.g. React, Rust, AI) along with their direct GitHub profiles.
2. **DevRel & Community Sourcing:** Identify influential technical writers for guest blogging, podcast appearances, or product feedback.
3. **Curated Tech Content Feeds:** Automate weekly developer roundups and trending tech news.
