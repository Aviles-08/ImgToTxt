// index.js
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createWorker } from "tesseract.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// 🧠 Preprocesado para mejorar OCR
async function preprocessImage(buffer) {
  return sharp(buffer)
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .grayscale()
    .normalize()
    .toBuffer();
}

// 🧾 Extrae datos comunes de IDs (CURP, RFC, fecha, nombre)
function extractData(text) {
  const curp = text.match(/[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d/g);
  const rfc = text.match(/[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{2,3}/g);
  const fechas = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/g);
  const nombre = text
    .split("\n")
    .find((l) => /^[A-ZÁÉÍÓÚÑ\s]{8,}$/.test(l.trim()));

  return {
    nombre: nombre?.trim() || null,
    curp: curp ? curp[0] : null,
    rfc: rfc ? rfc[0] : null,
    fecha: fechas ? fechas[0] : null,
  };
}

// 🚀 Endpoint principal (POST /ocr)
app.post("/ocr", upload.single("imagen"), async (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "Falta la imagen" });

  try {
    const buffer = await preprocessImage(req.file.buffer);

    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("spa");
    await worker.initialize("spa");

    const { data: { text } } = await worker.recognize(buffer);

    await worker.terminate();

    const parsed = extractData(text);

    res.json({
      ok: true,
      rawText: text,
      parsed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🟢 Servidor OCR en http://localhost:3000");
});
