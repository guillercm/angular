import * as fs from 'fs';
import { test } from '@playwright/test';
import { testConfig } from './interfaces/test-config';
import { environment } from '@environments/environments';

const config: testConfig = JSON.parse(fs.readFileSync(environment.playwrightTestsPath, 'utf-8'));
const {
  baseUrl,
  credentials
} = config;

test.beforeEach(async ({ page }) => {
  // por si hay que ejecutar algo antes de cada prueba.
});

test('Login with correct credentials', async ({ page }) => {
  await page.goto(`${baseUrl}auth/login`);
  const user: string = credentials.username;
  const pass: string = credentials.password;
  await page.locator('input[formcontrolname=username] input').fill(user);
  await page.locator('input[formcontrolname=password] input').fill(pass);
  await page.getByText('Login').click();
});

test('Login with wrong credentials', async ({ page }) => {
  await page.goto(`${baseUrl}auth/login`);
  const user: string = "---";
  const pass: string = "---";
  await page.locator('input[formcontrolname=username] input').fill(user);
  await page.locator('input[formcontrolname=password] input').fill(pass);
  await page.getByText('Login').click();
});
