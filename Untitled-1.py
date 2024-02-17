from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Setup WebDriver using webdriver_manager to automatically handle the ChromeDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)  # Adjust the timeout value as needed

# Open the webpage
driver.get("https://travel.delta.com")
time.sleep(5)  # Wait for the page to load. Adjust the sleep time as necessary.

# Select the "One-way" trip option
one_way_trip_option = driver.find_element(
    By.CSS_SELECTOR, 'input[name="tripWay"][value="oneWay"]'
)
if one_way_trip_option:
    one_way_trip_option.click()
else:
    print("One-way radio button not found.")

# Wait for the 'From' and 'To' fields to be clickable and fill them
from_airport = wait.until(EC.element_to_be_clickable((By.ID, "fromAirport")))
from_airport.clear()
from_airport.send_keys("ATL")

to_airport = wait.until(EC.element_to_be_clickable((By.ID, "toAirport")))
to_airport.clear()
to_airport.send_keys("JFK")

# Locate and click the search button
search_button_section = wait.until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "div.label"))
)
search_button = (
    search_button_section.find_element(By.CSS_SELECTOR, "a.buttonLink")
    if search_button_section.text.strip() == "Search"
    else None
)

if search_button:
    search_button.click()
else:
    print("Search button within 'Search all flights' not found.")

# Assuming there's a specific action you want to perform with the search results
# Wait for the search results to load
results_loaded = wait.until(EC.visibility_of_element_located((By.ID, "flightsOut")))

# Example action: Clicking a link in the search results that matches a certain condition
tbody = driver.find_element(By.CSS_SELECTOR, "#flightsOut tbody")
if tbody:
    rows = tbody.find_elements(By.TAG_NAME, "tr")
    for row in rows:
        links = row.find_elements(By.TAG_NAME, "a")
        target_link = None
        for link in reversed(links):  # Reverse to find the last matching link
            if "showFlightLoadInPopup2" in link.get_attribute("href"):
                target_link = link
                break
        if target_link:
            target_link.click()  # Or any other action you need to perform
else:
    print("Table body within flightsOut not found.")

# Keep the browser open for further interactions or manual inspection
# Use driver.quit() when you are ready to close the browser and end the session
