const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (req, res) => {

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    console.log("🚀 Cargando la página de login...");
    await page.goto("https://srienlinea.sri.gob.ec/sri-en-linea/contribuyente/perfil");

    await page.waitForSelector("#usuario");
    await page.type("#usuario", "1801394741001");

    await page.waitForSelector("#password");
    await page.type("#password", "MACAra666_");

    await page.click("#kc-login");
    console.log("✅ Botón de login clickeado");

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    const loginExitoso = page.url().includes("perfil");
    if (!loginExitoso) {
      console.log("❌ Login fallido");
      res.status(401).json({ success: false, message: "Login fallido" });
      return;
    }

    console.log("✅ Login exitoso");

    res.json({
      success: true,
      login: "exitoso",
      mensaje: "Ingreso al perfil del contribuyente correcto",
      url_actual: page.url(),
    });
  } catch (e) {
    console.error("❌ Error durante la ejecución de Puppeteer:", e);
    res.status(500).json({
      success: false,
      message: "Algo salió mal al ejecutar Puppeteer",
      error: e.message,
    });
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
