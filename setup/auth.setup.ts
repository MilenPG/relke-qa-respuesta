import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

(async () => {
    console.log('⏳ Iniciando navegador...');
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--disable-blink-features=AutomationControlled'] 
    });   
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('🌐 Navegando a login...');
    await page.goto('https://demo.relbase.cl/');
    await page.getByPlaceholder('Correo Electrónico').fill('qa_junior@relke.cl');
    await page.getByPlaceholder('Contraseña').fill('Demo123456!');
    console.log('🤖 Por favor, resuelve el reCaptcha y presiona "Iniciar sesión" manualmente en el navegador abierto...');
    console.log('⌛ Esperando confirmación de login...');
    
    try {
    //await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.waitForSelector('text=¡Hola QA!', { timeout: 60_000 }); // Espera hasta 1 minuto para la resolución manual del reCaptcha
    console.log('🎉 Login detectado, guardando sesión...');
    
    const storagePath = path.resolve(__dirname, './auth.json');
    await context.storageState({ path: storagePath });

     if (fs.existsSync(storagePath)) {
      console.log('✅ auth.json guardado exitosamente en: ' + storagePath);
    } else {
      console.warn('⚠️ auth.json no fue generado.');
    }
  } catch (e) {
    console.error('❌ No se detectó login dentro del tiempo esperado:', e);
  } finally {
    await browser.close();
  }
})();