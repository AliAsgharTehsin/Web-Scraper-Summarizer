#!/bin/bash
# File: /home/ali/run_scraper.sh
PROJECT_DIR="$(dirname "$(dirname "$0")")"  # Gets project root
LOG_FILE="$PROJECT_DIR/scraper.log"

echo "===== Starting Scraper: $(date) =====" >> "$LOG_FILE"

# Run scrapy
if scrapy scrawl wiki -o crypto_data.json >> "$LOG_FILE" 2>&1; then
    echo "Scrapy finished successfully." >> "$LOG_FILE"
else
    echo "Scrapy failed!" >> "$LOG_FILE"
    exit 1
fi

# Move JSON
if mv crypto_data.json /home/ali/Documents/CryptoScrapeProject/python_backend/wikiscraper >> "$LOG_FILE" 2>&1; then
    echo "JSON moved successfully." >> "$LOG_FILE"
else
    echo "Failed to move JSON!" >> "$LOG_FILE"
    exit 1
fi

# Run Python main script
if python /home/ali/Documents/CryptoScrapeProject/python_backend/main.py >> "$LOG_FILE" 2>&1; then
    echo "Python script ran successfully." >> "$LOG_FILE"
else
    echo "Python script failed!" >> "$LOG_FILE"
    exit 1
fi

echo "===== Scraper Finished: $(date) =====" >> "$LOG_FILE"
