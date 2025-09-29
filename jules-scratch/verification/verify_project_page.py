from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the home page
        page.goto("http://localhost:3000/en", timeout=60000)

        # Wait for the gallery to be visible
        gallery_selector = "#gallery"
        page.wait_for_selector(gallery_selector, state="visible", timeout=30000)

        # Find the first project link in the gallery and click it
        first_project_link = page.locator("#gallery a").first
        project_href = first_project_link.get_attribute("href")

        if project_href:
            print(f"Navigating to project: {project_href}")
            first_project_link.click()

            # Wait for the project details page to load
            page.wait_for_url(f"http://localhost:3000{project_href}", timeout=30000)

            # Verify that the project title is visible
            project_title_selector = "h1"
            expect(page.locator(project_title_selector)).to_be_visible(timeout=30000)

            # Take a screenshot of the project details page
            page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot taken successfully.")
        else:
            print("Could not find project link.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)