import { Page, expect } from '@playwright/test';

export class NotaVentaPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async toCreateNotaVenta() {
    await this.page.getByRole('link', { name: 'Ventas ' }).click();
    await this.page.locator('.shadow > .box > .box-btn > .table-actions-toolbar > .btn-group > a').first().click();
    await this.page.getByText('Inicio Notas de venta Nueva').click();
  }

  async fillForm(cliente: string) {
    await this.page.waitForSelector("form");
    console.log('Form load OK');
    await this.page.getByTitle('Casa matriz').click();
    await this.page.getByRole('treeitem', { name: 'Casa matriz' }).click();
    await this.page.locator('#select2-sales_note_type_document_sii-container').click();
    await this.page.getByRole('treeitem', { name: 'FACTURA ELECTRÓNICA' }).click();
    await this.page.locator('#select2-sales_note_ware_house_id-container').click();
    await this.page.getByRole('treeitem', { name: 'Bodega principal' }).click();
    console.log('Warehouse selection OK');
    await this.page.locator('#select2-sales_note_customer_id-container').click();
    await this.page.locator('input[type="search"]').fill(cliente);
    await this.page.locator('.select2-results__option').first().click();
    console.log('Client selection OK');
    await this.page.getByTitle('Pesos').click();
    await this.page.getByRole('treeitem', { name: 'Pesos' }).click();
  }

  async addProduct(product: string, quantity: string, ) {
    await this.page.locator('#select2-sales_note_e_document_products_attributes_0_product_id-container').click();
    await this.page.locator('input[type="search"]').fill(product);
    await this.page.locator('.select2-results__option').first().click();
    console.log('Product selection OK');
    await this.page.locator('.js-e-document-quantity').first().fill(quantity);
    console.log(`Product quantity OK (${quantity})`);
  }

  async verifyTotal() {
    await this.page.waitForSelector('#neto_total', { timeout: 5000 });
    const totalString = await this.page.locator('#total').innerText();
    const totalNumber = parseInt(totalString.replace(/[^\d]/g, ''));
    console.log(`Catch total value as a string: ${totalString}`);
    console.log(`Catch total value as a number: ${totalNumber} and compares...`)
    expect(totalNumber).toBeGreaterThan(0); 
    return totalNumber;
  }

  async verifyList(total: string) {
    await this.page.waitForTimeout(2000);
    const totalString = await this.page.locator('#total').innerText();
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.page.waitForTimeout(2000);
    const submitButton = this.page.locator('button[type="submit"].btn.btn-primary');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(this.page.locator('#msg-div')).toContainText('Nota de venta creada');
    await this.page.getByRole('link', { name: 'Notas de venta' }).click();
    await expect(this.page.getByRole('cell', {name: totalString })).toBeVisible;
  }
}
