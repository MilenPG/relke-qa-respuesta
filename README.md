# 🧪 QA Playwright Challenge Accepted 🤓 – Relke

En virtud de simular un contexto de trabajo lo más cercano posible, considero que promover una buena comunicación y entendimiento entre las distintas partes de un proyecto es indispensable y justamente para ello existen los estándares de calidad como los que propone ISTQB. 
Dicho esto, espero que a continuación encuentren un plan de trabajo comprensible y consistente, que permita mantener al cliente y al resto del equipo al tanto de los procesos de validación, evitando confusiones, retrabajo y sobre todo, enfocándose en la entrega e integración continua.

* * *

## 🧭 *PROCESO* 

#### 1. Identificación de requerimientos
##### Requerimiento principal: 
###### Validar flujo funcional E2E de creación de una Nota de Venta en sistema demo de Relbase:
* Evaluar que el total calculado al agregar 1 o más productos sea mayor a $0.
* Evaluar que la Nota de Venta recién creada se refleje en el listado con su total correspondiente. 
###### Validar casos negativos:
* Validar manejo de errores al no agregar productos.
* Validar manejo de errores al no completar todos los campos requeridos.


#### 2. Planificación y diseño
* **Tipo de Prueba:** Funcional automatizada E2E
* **Framework:** [Playwright](https://playwright.dev/) con TypeScript
* **Diseño de pruebas:**
![Matriz de pruebas](https://raw.githubusercontent.com/MilenPG/relke-qa-respuesta/refs/heads/main/matriz-pruebas.png)

#### 3. Preparación
##### Datos de entrada necesarios:
- Cliente
- Dirección
- Contacto
- Canal de venta
- Productos 

> ⚠️ *Se intentó generar productos de prueba con stock propio, pero al no encontrarse disponible la funcionalidad correspondiente (botón/disparador) en el ambiente, se utilizaron productos existentes.*

##### 🔥 Smoke test:
- Se ejecutó de forma manual para validar que el entorno estuviera disponible y funcional antes de automatizar.

#### 4. Ejecución
##### ¿Cómo ejecutar el test?
* Utilizando git bash desde una carpeta ya creada:
```bash
# 1. Clona este repositorio e ingresa a él: 
git clone https://github.com/milenPG/relke-qa-respuesta.git
cd relke-qa-respuesta

# 2. Instala las dependencias:
npm install

# 3. Realiza la autenticación semi-automática:
npm run auth-setup 

# 3.1. Se abrirá una instancia del navegador con las credenciales ya ingresadas
# 3.2. MANUALMENTE resuelve el reCAPTCHA
# 3.3. Haz clic en "Iniciar sesión"
# 3.4. El sistema guardará el archivo `auth.json` con tu sesión activa

# 4. Ejecuta los tests:
npm run test
```

#### 5. Resultados y observaciones
- ✅ Se validó satisfactoriamente el flujo completo de creación de una Nota de Venta.
- ✅ El sistema impide continuar si no se agrega al menos un producto o si hay campos obligatorios vacíos.
###### *Observaciones:*
- ⚠️ Fue necesario incluir esperas estáticas (waitForTimeout) en algunos puntos del flujo, ya que ciertas interacciones asincrónicas (como la carga del modal de previsualización) no respondían de forma confiable a los waitForSelector, ocasionando fallos por timeout.

- ⚠️ Login con reCAPTCHA v3: debido a la naturaleza de este mecanismo de seguridad, no fue viable automatizarlo directamente utilizando técnicas comunes como addInitScript() o el bloqueo de scripts externos, ya que reCAPTCHA v3 opera de forma invisible y basada en heurística.
Si bien existen servicios de terceros (como 2Captcha, Stealth, Anti-Captcha, etc.) que ofrecen soluciones para resolver estos casos de forma automatizada, todos ellos son de pago y no aplicaban dentro del alcance de esta prueba técnica.
Por esta razón, se optó por una alternativa válida y recomendada por la propia documentación oficial de Playwright: el uso de una sesión autenticada persistente mediante storageState, lo que permitió evitar el proceso de login en cada ejecución sin comprometer la validez de las pruebas.

* * *

## 🌟 *CIERRE*
Esta experiencia me permitió enfrentar un caso realista de automatización E2E con desafíos técnicos concretos como el manejo de reCAPTCHA y el control de asincronía en flujos complejos. A continuación, comparto una breve autoevaluación:

#### ✅ Lo que funcionó bien:
- Rápida familiarización con Playwright, una herramienta nueva para mí hasta este desafío.
- Estructuración modular del código (patrón Page Object).
- Documentación del proceso de pruebas de manera clara y reproducible.
#### 🛠️ Oportunidades de mejora:
* Implementar un flujo más robusto de control de sincronización, utilizando waitForResponse o locator.waitFor() en lugar de waitForTimeout.
* Incorporar un flujo de trabajo basado en GitHub Flow, que incluya ramas, PRs y revisión de código. Si bien no se priorizó en esta ocasión por las restricciones de tiempo y la complejidad del manejo de autenticación, es una práctica fundamental que aplicaría en un contexto más amplio.
* Agregar mayor cobertura a nivel de pruebas negativas y validaciones específicas en cada paso del flujo.

#### 📚 Recursos de apoyo y aprendizaje utilizados:
- **Video tutoriales de Relbase:** Para conocer flujos reales del sistema.
- **Documentación oficial de Playwright:** Fuente principal para configuración, comandos y solución de errores.
- **DevTools (Firefox Developer Edition):** Exploración de estructura y selectores.
- **Playwright Codegen:** Apoyo inicial en creación de selectores.
- **ChatGPT:** Apoyo técnico durante los bloqueos.
- **StackOverflow y comunidades técnicas:** Para investigar sobre automatización con reCAPTCHA.
- **ISTQB Foundation Level:** Como base metodológica de aseguramiento de calidad y pruebas estructuradas.

### *¡Muchas gracias por la oportunidad! 🚀*