# 🚀 Senior QA Automation Portfolio | Jerome San Juan

A centralized QA Dashboard and Automation Framework showcasing end-to-end testing strategies, performance engineering, and automated reporting.

**🔗 [View Live QA Dashboard](https://thehoneybadger13.github.io/Automation-Portfolio/)**

---

## 🛠️ Tech Stack & Tools
* **UI Automation:** Playwright + TypeScript
* **Behavior Driven Development:** Cucumber (Gherkin)
* **Performance Testing:** Apache JMeter
* **CI/CD Pipeline:** GitHub Actions
* **Reporting:** Allure BDD, Playwright HTML, & JMeter Dashboard

---

## 📂 Project Structure

* **`portfolio-ui/`**: The centralized dashboard for viewing all test results.
* **`tests/`**: Playwright test specifications and Page Object Models (POM).
* **`features/`**: Gherkin feature files for BDD scenarios.
* **`jmeter/`**: Performance test scripts (.jmx) for API load testing.
* **`.github/workflows/`**: Automation pipelines that run tests and deploy reports.

---

## 🧪 Automation Highlights

### 1. Web UI & E2E Testing (Playwright)
The framework utilizes the **Page Object Model (POM)** to ensure maintainability. It covers critical business flows on the SauceDemo platform, including:
* Robust Login validations (standard, locked-out, and problem users).
* Full E2E checkout workflow from cart to order completion.
* Cross-browser testing (Chromium, Firefox, WebKit).

### 2. BDD Framework (Cucumber)
Tests are written in Gherkin to bridge the gap between technical and non-technical stakeholders.
* **Feature:** Checkout Process
* **Scenario:** Successful purchase of multiple items.

### 3. Performance Engineering (JMeter)
Integrated load testing targeting the **Restful-Booker API**:
* **Load Testing:** Simulated concurrent user traffic to measure response times.
* **Stress Testing:** Identified system breakpoints and bottlenecking.
* **Reporting:** Automatic generation of JMeter HTML Dashboard.

---

## 📊 Automated Reporting
The project is configured with a CI/CD pipeline that automatically:
1. Executes the Playwright and JMeter test suites on every push.
2. Aggregates results into **Allure** and **HTML** formats.
3. Deploys the updated results directly to the live dashboard.

---

## 📫 Contact & Connect
* **LinkedIn:** [Jerome San Juan](https://www.linkedin.com/in/jerome-san-juan-7b37a4121/)
* **Email:** romsj13@gmail.com