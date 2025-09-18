# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EufyGeoGem** is a comprehensive AI-powered content marketing platform designed for e-commerce operations. The system follows a complete marketing workflow from public domain content creation (种草) to conversion (拔草), from exposure to monetization, covering both organic and paid traffic channels.

## Project Structure

The project is organized according to the business flow:

### 1. Public Domain Content (公域种草)
- `01a-public-domain-ao-page-builder.html` - AI Overview page builder for public content
- `01b-public-domain-geo-content-factory.html` - Localized content production at scale
- `01c-public-domain-geo-social&pr.html` - Social media and PR management
- `01d-public-domain-geo-pm.html` - Product management for geo-targeted content
- `01e-private-domain-geo-amazon.html` - Amazon-specific content optimization

### 2. Traffic Acquisition (流量获取)
- `02a-traffic-acquisition-gem-campaign.html` - Paid traffic campaign management
- `02b-traffic-acquisition-ci-intelligence-center.html` - Traffic optimization intelligence

### 3. Conversion & Operation (转化运营)
- `03a-conversion-operation-decision-sandbox.html` - A/B testing and conversion optimization
- `03b-conversion-operation-dam-asset-management.html` - Digital asset management

### 4. Data Analysis & Settlement (数据分析与结算)
- `04a-data-analysis-tracking-attribution.html` - Full-chain tracking and attribution
- `04b-data-analysis-report-center.html` - Comprehensive reporting and analytics
- `04c-data-analysis-billing-engine.html` - Financial settlement and billing

### Additional Tools
- `01a-geo-search-intent-analytics.html` - Search intent analysis and optimization
- `05a-geo-dam-eufy.html` - Eufy-specific digital asset management

### Portal and Documentation
- `index.html` - Main portal page with navigation
- `00-platform-intr.html` - Platform introduction and overview

## Technical Stack

- Pure HTML/CSS/JavaScript (no build process required)
- ECharts for data visualization
- Responsive design with mobile support
- Iframe-based module loading system
- Python pipeline script (`pipeline_demo.py`) for data processing

## Key Features

- **Business Flow Oriented**: Follows the natural marketing funnel from awareness to conversion
- **Modular Architecture**: Each module operates independently while sharing common design
- **AI-Powered**: Integrates AI capabilities for content generation and optimization
- **Comprehensive Analytics**: Full tracking from exposure to final conversion

## Development Commands

```bash
# Start a local development server
python -m http.server 8000
# or
npx http-server -p 8000

# Run the data processing pipeline (requires Python dependencies)
python pipeline_demo.py
```

## Development Guidelines

- All text has been translated from Chinese to English
- File naming follows pattern: `{number}{letter}-{category}-{module}.html`
- Each module is self-contained with its own styling and functionality
- Portal page (index.html) provides unified navigation
- Common UI components use gradient backgrounds (#667eea to #764ba2)
- Data visualization uses ECharts library loaded from CDN

## Python Pipeline

The `pipeline_demo.py` script provides data processing capabilities:
- Clusters questions using TF-IDF and KMeans
- Calculates GAP scores for content prioritization
- Generates YTRG heatmaps for content-source analysis
- Creates Rally momentum trends for temporal analysis
- Outputs FAQ slices in Markdown format

Dependencies: pandas, numpy, matplotlib, scikit-learn