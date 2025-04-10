import * as fs from 'fs';
import { test } from '@playwright/test';
import { testConfig } from './interfaces/test-config';
import { environment } from '@environments/environments';

const config: testConfig = JSON.parse(fs.readFileSync(environment.playwrightTestsPath, 'utf-8'));
const {
  baseUrl,
  credentials: { username, password }
} = config;

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/login-tests/auth/login`);
});

test('Login with credentials', async ({ page }) => {
  await page.locator('#login_username').fill(username);
  await page.locator('#login_password').fill(password);
  await page.getByText('Entrar').click();
});

// Login with correct credentials

// test('Login with wrong credentials', async ({ page }) => {
//   await page.goto(`${baseUrl}auth/login`);
//   const user: string = "---";
//   const pass: string = "---";
//   await page.locator('input[formcontrolname=username] input').fill(user);
//   await page.locator('input[formcontrolname=password] input').fill(pass);
//   await page.getByText('Login').click();
// });
