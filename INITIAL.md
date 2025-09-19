# Initial Feature Request Template

## FEATURE:
[Describe what you want to build - be specific about functionality and requirements]

## EXAMPLES:
[List any example files in the examples/ folder and explain how they should be used]

## DOCUMENTATION:
[Include links to relevant documentation, APIs, or MCP server resources]

## OTHER CONSIDERATIONS:
[Mention any gotchas, specific requirements, or things AI assistants commonly miss]

---

# Example Usage:

## FEATURE:
Build a real-time dashboard component for the EufyGeoGem platform that displays key SEO metrics including:
- Organic traffic trends (last 30 days)
- Top performing keywords with rankings
- Content performance metrics
- Competitor analysis comparison
- Real-time alerts for ranking changes

The dashboard should use ECharts for visualization, be mobile responsive, and update data every 5 minutes.

## EXAMPLES:
- `examples/dashboard-component.html` - Base dashboard layout pattern
- `examples/echart-configs.js` - Standard chart configurations
- `examples/api-client.js` - API integration pattern for data fetching

## DOCUMENTATION:
- ECharts Documentation: https://echarts.apache.org/en/option.html
- Project Style Guide: See CLAUDE.md for conventions
- API Endpoints: /api/v1/metrics, /api/v1/keywords, /api/v1/competitors

## OTHER CONSIDERATIONS:
- Must handle API rate limiting (max 100 requests/minute)
- Dashboard should gracefully handle missing data
- Performance: Initial load should be under 2 seconds
- Accessibility: Must be keyboard navigable and screen reader friendly
- Use existing color scheme from project CSS variables