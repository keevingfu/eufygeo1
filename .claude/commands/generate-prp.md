# Generate PRP Command

Generate a comprehensive Product Requirements Prompt (PRP) from an initial feature request.

## Usage
```
/generate-prp $ARGUMENTS
```

## Process

1. **Research Phase**
   - Read the INITIAL.md or specified file
   - Analyze existing codebase patterns
   - Search for similar implementations
   - Identify conventions to follow

2. **Documentation Gathering**
   - Fetch relevant API documentation
   - Include library references
   - Add known gotchas and quirks

3. **Blueprint Creation**
   - Create step-by-step implementation plan
   - Include validation gates at each step
   - Add comprehensive test requirements
   - Define success criteria

4. **Quality Check**
   - Score confidence level (1-10)
   - Ensure all context is included
   - Verify completeness

## Output

Creates a comprehensive PRP file in `PRPs/` directory with:
- Complete context and documentation
- Implementation steps with validation
- Error handling patterns
- Test requirements
- Success criteria

## Example

```
/generate-prp INITIAL.md
# Creates: PRPs/feature-name.md

/generate-prp features/auth-system.md
# Creates: PRPs/auth-system.md
```