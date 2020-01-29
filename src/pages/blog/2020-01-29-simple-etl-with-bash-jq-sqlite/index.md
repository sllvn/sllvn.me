---
path: "/blog/simple-etl-with-bash-jq-sqlite"
date: "2020-01-29T13:22:00"
title: "Simple ETL with bash, jq, and SQLite"
---

I run a couple simple ETL pipelines for side projects, and after experimenting with Lambda to kick off Python jobs (and finding it frustrating), I've settled on simple bash scripts (along with [the awesome `jq` util](https://github.com/stedolan/jq)) run via cron on a DigitalOcean instance. Not only is it more stable, but I've found it to be much faster. Recently, [a thread on HN](https://news.ycombinator.com/item?id=22153390) convinced me to try adding SQLite to the mix, and I've been happy with the results.

For my Twitter timeline scrape, I run [a script](https://gist.github.com/sllvn/1a734d1f0c195995a9166ad309664e3f) every five minutes that scrapes the last 200 timeline tweets (via [`twurl`](https://github.com/twitter/twurl)), converts the JSON into a CSV, and imports that CSV into a SQLite db. A unique key on the `id` col prevents duplicates, and so far the setup has proven solid.

The trick is using `jq`'s `@csv` filter (along with the `-r` flag to not escape output as JSON) to output the tweets to CSV:

```bash
echo 'id,created_at,user_id,screen_name,is_retweet,text' > tweets.csv
jq -r '.[] | [.id, .created_at, .user.id, .user.screen_name, .retweeted_status != null, .text] | @csv' data/tweets.json >> tweets.csv
```

Then all that remains is to import the CSV into your SQLite db:

```bash
sqlite3 tweets.sqlite -cmd '.mode csv' '.import tweets.csv tweets'
```

You can pass a single command to `sqlite3`'s CLI, but when you need to chain multiple commands (as importing from CSV requires `.mode csv`), use the `-cmd` flag for each of the first N-1 commands (listed commands will be executed in order).

The [HN thread](https://news.ycombinator.com/item?id=22153390) gives some tips (recommended SQLite pragmas, etc.) on how to use this with larger pipelines, and I look forward to using this with my transit scraper (1000s of vehicle locations updating every minute).
