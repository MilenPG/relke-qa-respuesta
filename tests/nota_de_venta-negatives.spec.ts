import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NotaVentaPage } from '../pages/NotaVentaPage';

test('03 Flujo Nueva Nota de Venta - Validar bloqueo de flujo y mensaje de error en formulario incompleto', async ({ page }) => {
  const login = new LoginPage(page);
  const notaVenta = new NotaVentaPage(page);

  await login.login();
  await notaVenta.toCreateNotaVenta();
  page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
  });
  await notaVenta.fillForm('');
  await notaVenta.addProduct('100231','3');
  await page.getByRole('link', { name: ' Previsualizar' }).click();
  await expect(page.locator('#object-errors div').first()).toBeVisible();
  console.log('Preview throw Error OK');
  //await page.getByRole('button', { name: ' Enviar' }).click();
  await expect(page.getByText('Hubo problemas con los siguientes campos')).toBeVisible();

});

test('04 Flujo Nueva Nota de Venta - Validar bloqueo de flujo y mensaje de error por no agregar productos', async ({ page }) => {
  const login = new LoginPage(page);
  const notaVenta = new NotaVentaPage(page);

  await login.login();
  await notaVenta.toCreateNotaVenta();
  page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
  });
  await notaVenta.fillForm('Test Empresa');
  await page.getByRole('link', { name: ' Previsualizar' }).click();
  await expect(page.locator('#object-errors div').first()).toBeVisible();
  console.log('Preview throw Error OK');
  await expect(page.getByText('Debe seleccionar un producto.')).toBeVisible();
});
