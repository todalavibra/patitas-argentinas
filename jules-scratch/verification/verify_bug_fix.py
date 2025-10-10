from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Mock the geminiService to return an error
    page.route("**/api/generatePetStory", lambda route: route.abort())

    page.goto("http://localhost:4173/")

    # Click on the first pet to open the modal
    page.click('text=Baguette')

    # Wait for the modal to open and the story generation to fail
    page.wait_for_selector('text=Could not generate a story at this time, but my heart is full of love!')

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)