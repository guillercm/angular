## Playwright

Playwright Test se creó específicamente para satisfacer las necesidades de pruebas integrales. Playwright es compatible con todos los motores de renderizado modernos, como Chromium, WebKit y Firefox. Realice pruebas en Windows, Linux y macOS, localmente o en CI, sin interfaz gráfica o con interfaz gráfica, con emulación móvil nativa de Google Chrome para Android y Safari móvil.

[Documentación oficial de Playwright](https://playwright.dev/docs/intro)

### Instalación
```bash
    npm init playwright@latest
```

### Scripts
- Añadir estos 3 scripts al ```package.json```:
```typescript
    "test:playwright": "npx playwright test",
    "test:playwright:ui": "npx playwright test --ui",
    "test:playwright:report": "npx playwright show-report"
```

### Creación de la prueba para el login de pruebas:

[Login de testing](testing/login-tests)

- Crear en la carpeta ```tests``` un nuevo spec.


<code-block>
  <details>
  <summary>login.spec.ts</summary>

  ```typescript
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
  ```
  </details>
</code-block>

- Ejecutar

```bash
    npm run test:playwright
```

![playwright](img/testing/playwright.png)

- Ejecutar

```bash
    npm run test:playwright:ui
```

![playwright](img/testing/playwright-ui.png)


- Ejecutar

```bash
    npm run test:playwright:report
```

![playwright](img/testing/playwright-report.png)