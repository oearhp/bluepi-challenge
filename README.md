# README AUTOMATE TESTING SCRIPT
- [ ] TOOL: PLAYWRIGHT

## SETUP & PREREQUISITE
- [ ] install [node.js](https://nodejs.org/en/download/current)
- [ ] install Playwright `npm init playwright@latest`

## TEST CASES
- [Test Cases](https://docs.google.com/spreadsheets/d/1EgXfxIxUwrX8kSa2qRXjiDIRivC342LIeHzNUq8j-Do/edit?usp=sharing)

## PROJECT STRUCTURE
- Using **Page Object Model (POM)** for maintainability.
```
/tests
  ├── todo.spec.ts          # Test scenarios
/pages
  ├── TodoPage.ts           # Page elements and methods
package.json
playwright.config.ts
```
