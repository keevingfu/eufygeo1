# Examples Directory

This directory contains code patterns and examples that AI assistants should follow when implementing features.

## Directory Structure

```
examples/
├── dashboard-component.html    # Dashboard layout patterns
├── echart-configs.js          # Standard ECharts configurations
├── api-client.js              # API integration patterns
├── module-structure.js        # How to structure JavaScript modules
├── error-handling.js          # Error handling patterns
├── mobile-responsive.css      # Mobile-first CSS patterns
└── test-patterns.js           # Testing patterns and conventions
```

## How to Use These Examples

1. **For AI Assistants**: Reference these patterns when implementing new features
2. **For Developers**: Add new patterns here when establishing conventions
3. **Naming Convention**: Use descriptive names that indicate the pattern's purpose

## Key Patterns to Follow

### 1. Module Structure
- See `module-structure.js` for how to organize code
- Use ES6 modules
- Keep files under 300 lines
- One class/major function per file

### 2. API Integration
- See `api-client.js` for API call patterns
- Always handle errors gracefully
- Include retry logic for network failures
- Use proper authentication headers

### 3. UI Components
- See `dashboard-component.html` for component structure
- Mobile-first responsive design
- Accessible by default
- Use semantic HTML

### 4. Testing
- See `test-patterns.js` for test structure
- Aim for 80% code coverage
- Test both happy paths and edge cases
- Use descriptive test names

## Adding New Examples

When adding new examples:
1. Use clear, descriptive filenames
2. Include comments explaining the pattern
3. Show both what TO do and what NOT to do
4. Keep examples focused on one concept
5. Update this README with the new example