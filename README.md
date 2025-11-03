# ImgToTxt — API OCR con Node.js y Tesseract.js

ImgToTxt es un proyecto desarrollado en Node.js que tiene como objetivo convertir imágenes en texto de manera sencilla y eficiente.  
La aplicación utiliza **Tesseract.js** como motor OCR (Reconocimiento Óptico de Caracteres) y **Sharp** para mejorar la calidad de las imágenes antes de analizarlas.  
El resultado se devuelve en formato JSON, lo que permite integrarlo fácilmente en otros sistemas o procesos automatizados.

---

## Descripción general

Este servicio está pensado para proyectos que requieran leer información contenida en identificaciones o documentos escaneados.  
Al recibir una imagen, el sistema realiza un preprocesamiento (rotación, escala, paso a grises) y posteriormente ejecuta el OCR con Tesseract.js.  
Finalmente, el texto detectado es analizado mediante expresiones regulares para identificar datos comunes en documentos oficiales, como nombre, CURP, RFC o fecha de nacimiento.

---

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución principal.  
- **Express** — framework para crear la API y manejar las peticiones HTTP.  
- **Multer** — herramienta para procesar archivos enviados por formulario.  
- **Sharp** — biblioteca que permite optimizar y preparar las imágenes antes del reconocimiento.  
- **Tesseract.js** — motor OCR que extrae el texto contenido en las imágenes.

---

## Instalación y uso

Clonar el repositorio:

```bash
git clone https://github.com/Aviles-08/ImgToTxt.git
cd ImgToTxt
```

Instalar las dependencias:
```bash
npm install
```

Ejecutar el servidor:
```bash
npm start
```

Cuando el servidor esté en funcionamiento, se mostrará en consola:
```bash
Servidor OCR en http://localhost:3000
```

