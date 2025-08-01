import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NotaVentaPage } from '../pages/NotaVentaPage';

test('01 Flujo exitoso nueva Nota de Venta - Verificar que valor del total calculado sea mayor a 0', async ({ page }) => {
  const login = new LoginPage(page);
  const notaVenta = new NotaVentaPage(page);

  await login.login();
  await expect(page.getByText('¡Hola QA!')).toBeVisible();
  await notaVenta.toCreateNotaVenta();
  await notaVenta.fillForm('Test Empresa');
  await notaVenta.addProduct('100231','4');
  await page.getByRole('link', { name: ' Previsualizar' }).click();
  await expect(page.locator('#modal-preview-pdf')).toBeVisible();
  console.log('Preview OK');
  await notaVenta.verifyTotal();
});

test('02 Flujo exitoso nueva Nota de Venta - Verificar que Nota de Venta creada se visualiza en listado respectivo', async ({ page }) => {
  const login = new LoginPage(page);
  const notaVenta = new NotaVentaPage(page);
  
  await login.login();
  await notaVenta.toCreateNotaVenta();
  await notaVenta.fillForm('Test Empresa');
  await notaVenta.addProduct('100231','5');
  const totalString = await page.locator('#total').innerText();
  console.log('Case 02 Total',totalString);
  await notaVenta.verifyList(totalString);
});