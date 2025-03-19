import "./commands.ts";
import "./constants.ts";

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore error if it contains "posthog is not defined"
  if (err.message.includes('posthog is not defined')) {
    return false;
  }
});
