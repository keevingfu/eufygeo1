#!/usr/bin/env python3
"""
Auto-update CLAUDE.md based on project structure
"""

import os
import datetime
import glob

def get_html_files():
    """Get all HTML files and categorize them"""
    files = {
        'public_domain': [],
        'traffic': [],
        'conversion': [],
        'data_analysis': [],
        'tools': [],
        'other': []
    }
    
    for file in sorted(glob.glob('*.html')):
        if file == 'index.html':
            continue
            
        if 'public-domain' in file or file.startswith('01'):
            files['public_domain'].append(file)
        elif 'traffic' in file or file.startswith('02'):
            files['traffic'].append(file)
        elif 'conversion' in file or file.startswith('03'):
            files['conversion'].append(file)
        elif 'data-analysis' in file or file.startswith('04'):
            files['data_analysis'].append(file)
        elif file.startswith('05') or 'geo-dam' in file:
            files['tools'].append(file)
        else:
            files['other'].append(file)
    
    return files

def get_file_description(filename):
    """Extract description from HTML file"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            # Try to find title tag
            if '<title>' in content:
                title = content.split('<title>')[1].split('</title>')[0]
                return title.replace(' - ', ' - ').strip()
    except:
        pass
    
    # Fallback to filename-based description
    name = filename.replace('.html', '').replace('-', ' ')
    return name.title()

def update_claude_md():
    """Update CLAUDE.md with current project structure"""
    files = get_html_files()
    total_modules = sum(len(v) for v in files.values()) + 1  # +1 for index.html
    
    content = f"""# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EufyGeoGem** is a comprehensive AI-powered content marketing platform designed for e-commerce operations. The system follows a complete marketing workflow from public domain content creation (种草) to conversion (拔草), from exposure to monetization, covering both organic and paid traffic channels.

## Project Structure

The project is organized according to the business flow:

### 1. Public Domain Content (公域种草)
"""
    
    for file in files['public_domain']:
        desc = get_file_description(file)
        content += f"- `{file}` - {desc}\n"
    
    content += "\n### 2. Traffic Acquisition (流量获取)\n"
    for file in files['traffic']:
        desc = get_file_description(file)
        content += f"- `{file}` - {desc}\n"
    
    content += "\n### 3. Conversion & Operation (转化运营)\n"
    for file in files['conversion']:
        desc = get_file_description(file)
        content += f"- `{file}` - {desc}\n"
    
    content += "\n### 4. Data Analysis & Settlement (数据分析与结算)\n"
    for file in files['data_analysis']:
        desc = get_file_description(file)
        content += f"- `{file}` - {desc}\n"
    
    if files['tools']:
        content += "\n### Additional Tools\n"
        for file in files['tools']:
            desc = get_file_description(file)
            content += f"- `{file}` - {desc}\n"
    
    content += f"""
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
- **Total Modules**: {total_modules} active modules

## Development Guidelines

- All text has been translated from Chinese to English
- File naming follows pattern: `{{number}}{{letter}}-{{category}}-{{module}}.html`
- Each module is self-contained with its own styling and functionality
- Portal page (index.html) provides unified navigation

## CI/CD Pipeline

- **Automated Updates**: GitHub Actions workflow updates documentation on push
- **Code Quality Checks**: HTML validation and console.log detection
- **Protected Secrets**: GitHub token stored in .env file (excluded from version control)
- **Auto-sync**: Changes automatically pushed to remote repository

## Last Updated

{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    
    with open('CLAUDE.md', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated CLAUDE.md with {total_modules} modules")

if __name__ == "__main__":
    update_claude_md()