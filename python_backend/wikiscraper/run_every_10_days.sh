#!/bin/bash

# Get project root
PROJECT_DIR="$(dirname "$(dirname "$0")")"
MARKER="$PROJECT_DIR/wikiscraper/last_run.txt"
SCRAPER="$PROJECT_DIR/wikiscraper/run_scraper.sh"

# If marker file doesn't exist, run script
if [ ! -f "$MARKER" ]; then
    $SCRAPER
    date +%s > "$MARKER"
    exit
fi

# Check days since last run
LAST_RUN=$(cat "$MARKER")
NOW=$(date +%s)
DIFF=$(( (NOW - LAST_RUN) / 86400 )) # days elapsed

if [ "$DIFF" -ge 10 ]; then
    $SCRAPER
    date +%s > "$MARKER"
fi
