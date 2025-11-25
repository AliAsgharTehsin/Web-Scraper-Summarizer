#!/bin/bash
PROJECT_DIR="$(dirname "$(dirname "$0")")"  # Gets project root
LOG_FILE="$PROJECT_DIR/scraper.log"

echo "===== Starting Scraper: $(date) =====" >> "$LOG_FILE"

# Run scrapy
if scrapy scrawl wiki -o /home/ali/Documents/CryptoScrapeProject/python_backend/wikiscraper/crypto_data.json >> "$LOG_FILE" 2>&1; then
    echo "Scrapy finished successfully." >> "$LOG_FILE"
else
    echo "Scrapy failed!" >> "$LOG_FILE"
    exit 1
fi

# Run Python main script
if python /home/ali/Documents/CryptoScrapeProject/python_backend/wikiscraper/main.py >> "$LOG_FILE" 2>&1; then
    echo "Python script ran successfully." >> "$LOG_FILE"
else
    echo "Python script failed!" >> "$LOG_FILE"
    exit 1
fi

echo "===== Scraper Finished: $(date) =====" >> "$LOG_FILE"
