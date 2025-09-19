# Product Requirements Prompt: GEO Social&PR Navigation System

## Context
The 01c-public-domain-geo-social&pr.html page has a sophisticated navigation structure with multiple functional modules. We need to transform this static navigation into a dynamic, intelligent system where each menu item loads its corresponding page in the right content area.

## Confidence Score
**9.5/10** - High confidence based on clear structure analysis and existing patterns in the project.

## Requirements

### Functional Requirements

1. **Dynamic Navigation System**
   - Convert left sidebar menu items into clickable links
   - Load corresponding pages dynamically in the right content area
   - Maintain active state highlighting
   - Smooth transitions between pages

2. **Individual Module Pages**
   Create separate pages for each navigation item:
   
   **Core Modules (核心模块)**
   - E28 Overview (E28 总览) - Main dashboard page
   - CI Competitive Intelligence (CI 竞争情报) - Competitor monitoring
   - GEO Content Factory (GEO 内容工厂) - Content creation system
   - GEM Campaign Management (GEM 投放管理) - Ad campaign control
   - A/O Page Builder (A/O 页面构建) - Landing page builder
   
   **Data Analysis (数据分析)**
   - Real-time Monitoring (实时监控) - Live metrics dashboard
   - Conversion Tracking (转化追踪) - Sales funnel analysis
   - ROI Analysis (ROI 分析) - Return on investment reports
   
   **Smart Tools (智能工具)**
   - AI Decision Sandbox (AI 决策沙盘) - AI-powered optimization
   - DAM Asset Management (DAM 资产管理) - Digital asset library
   - System Settings (系统设置) - Platform configuration

3. **Page Loading Mechanism**
   - Use iframe or AJAX for seamless content loading
   - Implement loading states and error handling
   - Preserve state across navigation
   - URL routing for direct access

### Non-Functional Requirements

1. **Performance**
   - Page load time < 500ms
   - Smooth transitions without flicker
   - Lazy loading for heavy content
   - Cache loaded pages

2. **User Experience**
   - Consistent visual design across all modules
   - Responsive layout maintained
   - Keyboard navigation support
   - Breadcrumb navigation

3. **Scalability**
   - Easy to add new menu items
   - Modular page structure
   - Reusable components

## Technical Implementation

### Architecture
```
┌─────────────────────┐
│   Main Container    │
│  ┌──────┬────────┐  │
│  │      │        │  │
│  │ Side │Content │  │
│  │ bar  │ Area   │  │
│  │      │        │  │
│  └──────┴────────┘  │
└─────────────────────┘
```

### File Structure
```
01c-modules/
├── e28-overview.html
├── ci-intelligence.html
├── geo-content-factory.html
├── gem-campaign.html
├── ao-page-builder.html
├── realtime-monitoring.html
├── conversion-tracking.html
├── roi-analysis.html
├── ai-decision-sandbox.html
├── dam-asset-management.html
└── system-settings.html
```

### Navigation Implementation
```javascript
// Dynamic page loading system
class NavigationSystem {
    constructor() {
        this.currentPage = 'e28-overview';
        this.contentArea = document.querySelector('.content');
        this.initializeNavigation();
    }
    
    initializeNavigation() {
        // Add click handlers to all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadPage(item.dataset.page);
            });
        });
    }
    
    async loadPage(pageName) {
        // Show loading state
        this.showLoading();
        
        try {
            // Load page content
            const response = await fetch(`01c-modules/${pageName}.html`);
            const content = await response.text();
            
            // Update content area
            this.contentArea.innerHTML = content;
            
            // Update active state
            this.updateActiveState(pageName);
            
            // Initialize page-specific scripts
            this.initializePageScripts(pageName);
            
        } catch (error) {
            this.showError(error);
        }
    }
}
```

## Module Page Templates

### 1. E28 Overview Page
- Product performance dashboard
- Key metrics visualization
- AI recommendations panel
- Quick action buttons

### 2. CI Competitive Intelligence
- Competitor ranking matrix
- Keyword opportunity finder
- Content gap analysis
- Alert system for changes

### 3. GEO Content Factory
- Content template library
- AI writing assistant
- SEO optimization tools
- Publishing workflow

### 4. GEM Campaign Management
- Campaign dashboard
- Budget allocation
- Performance tracking
- A/B testing interface

### 5. A/O Page Builder
- Drag-and-drop editor
- Template gallery
- Preview system
- Analytics integration

### 6. Real-time Monitoring
- Live traffic data
- Conversion funnel
- User behavior flow
- Alert configuration

### 7. Conversion Tracking
- Multi-touch attribution
- Customer journey mapping
- Revenue tracking
- Goal configuration

### 8. ROI Analysis
- Financial metrics
- Cost breakdown
- Profit margins
- Forecast models

### 9. AI Decision Sandbox
- Scenario simulation
- Optimization suggestions
- Predictive analytics
- What-if analysis

### 10. DAM Asset Management
- Asset library grid
- Upload interface
- Tagging system
- Usage analytics

### 11. System Settings
- User management
- API configuration
- Integration settings
- Backup controls

## Implementation Plan

### Phase 1: Navigation System (Day 1-2)
1. Modify 01c page to add navigation functionality
2. Implement page loading mechanism
3. Add loading states and error handling
4. Test navigation flow

### Phase 2: Core Module Pages (Day 3-7)
1. Create E28 Overview page
2. Build CI Intelligence module
3. Develop GEO Content Factory
4. Implement GEM Campaign Management
5. Create A/O Page Builder

### Phase 3: Analytics Pages (Day 8-10)
1. Build Real-time Monitoring
2. Create Conversion Tracking
3. Develop ROI Analysis

### Phase 4: Tool Pages (Day 11-13)
1. Implement AI Decision Sandbox
2. Create DAM Asset Management
3. Build System Settings

### Phase 5: Integration & Polish (Day 14-15)
1. Integrate all pages
2. Add transitions and animations
3. Optimize performance
4. Final testing

## Validation Criteria

### Functional Tests
- [ ] All menu items load correct pages
- [ ] Active states update properly
- [ ] Back/forward browser navigation works
- [ ] Direct URL access functions
- [ ] Page state is preserved

### Performance Tests
- [ ] Page load < 500ms
- [ ] No visual flicker
- [ ] Memory usage stays stable
- [ ] Cache works effectively

### UX Tests
- [ ] Consistent design across pages
- [ ] Responsive on all devices
- [ ] Keyboard navigation works
- [ ] Loading states appear
- [ ] Error states handle gracefully

## Success Criteria
- All 11 navigation items have functional pages
- Seamless navigation experience
- Performance targets met
- Positive user feedback
- Easy to extend with new modules

## References
- Current design: `01c-public-domain-geo-social&pr.html`
- Chart patterns: `examples/echart-configs.js`
- API patterns: `examples/api-client.js`
- Dashboard layout: `examples/dashboard-component.html`