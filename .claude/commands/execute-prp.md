# Execute PRP Command

Execute a Product Requirements Prompt (PRP) to implement features with validation loops.

## Usage
```
/execute-prp $ARGUMENTS
```

## Process

1. **Load Context**
   - Read the entire PRP document
   - Parse implementation requirements
   - Load referenced examples

2. **Planning Phase**
   - Create detailed task list using TodoWrite
   - Break down into manageable steps
   - Identify dependencies

3. **Execution Phase**
   - Implement each component systematically
   - Follow patterns from examples
   - Apply project conventions

4. **Validation Phase**
   - Run all specified tests
   - Execute linting and type checking
   - Verify against success criteria

5. **Iteration Phase**
   - Fix any issues found
   - Re-run validations
   - Continue until all checks pass

6. **Completion**
   - Ensure all requirements are met
   - Generate implementation summary
   - Update documentation if needed

## Example

```
/execute-prp PRPs/user-authentication.md
# Implements the full feature with validation

/execute-prp PRPs/api-integration.md --validate --test
# Implements with extra validation and testing
```