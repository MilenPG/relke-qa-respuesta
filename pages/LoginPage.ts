import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    await this.page.goto('https://demo.relbase.cl/');
    await this.page.waitForSelector('text=¡Hola QA!');
    console.log('Login OK')
  }
}
