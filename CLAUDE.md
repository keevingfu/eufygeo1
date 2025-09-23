# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EufyGeoGem** is a comprehensive AI-powered content marketing platform designed for e-commerce operations. The system follows a complete marketing workflow from public domain content creation (种草) to conversion (拔草), from exposure to monetization, covering both organic and paid traffic channels.

## Project Structure

The project is organized according to the business flow:

### 1. Public Domain Content (公域种草)
- `01a-geo-search-intent-analytics.html` - Eureka GEO Intelligence Dashboard - Search Intent Analytics
- `01a-public-domain-ao-page-builder.html` - A/O Micro Landing Page Builder - Intelligent Conversion Page Design System
- `01b-public-domain-geo-content-factory.html` - GEO Content Factory - AI-Driven Content Production System
- `01c-navigation-index.html` - GEO/GEM Navigation Index
- `01c-public-domain-geo-social&pr.html` - GEO/GEM智能营销平台 - Eufy E28案例中心
- `01d-public-domain-geo-pm.html` - GEO/GEM Intelligent Marketing Platform - Unified Dashboard
- `01e-private-domain-geo-amazon.html` - Amazon GEO Optimization Platform - Eufy Omni E28
- `01f-seo-keywords-analytics.html` - SEO Keywords Analytics - Google AIO & YouTube Optimization

### 2. Traffic Acquisition (流量获取)
- `02a-traffic-acquisition-gem-campaign.html` - GEM Campaign Management - Intelligent Advertising Orchestration System
- `02b-traffic-acquisition-ci-intelligence-center.html` - CI Competitive Intelligence Center - Intelligent Competitor Monitoring & Opportunity Discovery System

### 3. Conversion & Operation (转化运营)
- `03a-conversion-operation-decision-sandbox.html` - Decision Sandbox - AI Intelligent Optimization Center
- `03b-conversion-operation-dam-asset-management.html` - DAM Content Asset Management - Intelligent Asset Center

### 4. Data Analysis & Settlement (数据分析与结算)
- `04a-data-analysis-tracking-attribution.html` - Tracking & Attribution System - Full Chain Data Analysis Center
- `04b-data-analysis-report-center.html` - Report Center - Comprehensive Data Analysis Platform
- `04c-data-analysis-billing-engine.html` - Billing Engine - Intelligent Pricing and Settlement Center
- `06e-data-analysis-system.html` - Data Analysis System - Eufy GEO Platform

### Additional Tools
- `05a-geo-dam-eufy.html` - Eufy Smart Home GEO - Content Asset Mapping Dashboard

### Portal Files
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
- **Total Modules**: 31 active modules

## Development Guidelines

- All text has been translated from Chinese to English
- File naming follows pattern: `{number}{letter}-{category}-{module}.html`
- Each module is self-contained with its own styling and functionality
- Portal page (index.html) provides unified navigation

## CI/CD Pipeline

- **Automated Updates**: GitHub Actions workflow updates documentation on push
- **Code Quality Checks**: HTML validation and console.log detection
- **Protected Secrets**: GitHub token stored in .env file (excluded from version control)
- **Auto-sync**: Changes automatically pushed to remote repository

## Last Updated

2025-09-22 23:38:04
