from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
import os
import time
import sys
import json
import random
import string

options = Options()
driver = webdriver.Firefox(options=options)

driver.get('http://localhost:3000/')
driver.maximize_window()
name_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="name"]')))
email_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="email"]')))
phone_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="phone"]')))
contact_button= WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@class="btn btn-primary"]')))
name_field.send_keys('NAUFAL LABIB ALTHOF')
time.sleep(5)
email_field.send_keys('naufal@gmail.com')
time.sleep(5)
phone_field.send_keys('08912381293')
time.sleep(5)
contact_button.click()
time.sleep(20)
