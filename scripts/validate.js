
// Script de validación del Sistema de Registro de Incidencias
// Fase 3: Despliegue automatizado

const fs = require("fs");
const path = require("path");

const archivos = [
    "index.html",
    "css/styles.css",
    "js/app.js"
];

let errores = 0;

console.log("========================================");
console.log(" VALIDACIÓN DEL SISTEMA DE INCIDENCIAS");
console.log("========================================\n");

console.log("1. Comprobando archivos del proyecto...");

for (const archivo of archivos) {
    const ruta = path.join(process.cwd(), archivo);

    if (fs.existsSync(ruta) && fs.statSync(ruta).isFile()) {
        console.log(`[OK] ${archivo} encontrado.`);
    } else {
        console.error(`[ERROR] No se encontró ${archivo}.`);
        errores++;
    }
}

console.log("\n2. Comprobando contenido de los archivos...");

for (const archivo of archivos) {
    const ruta = path.join(process.cwd(), archivo);

    if (!fs.existsSync(ruta)) continue;

    const contenido = fs.readFileSync(ruta, "utf8").trim();

    if (contenido.length > 0) {
        console.log(`[OK] ${archivo} contiene información.`);
    } else {
        console.error(`[ERROR] ${archivo} está vacío.`);
        errores++;
    }
}


console.log("\n3. Comprobando referencias en index.html...");

const rutaHTML = path.join(process.cwd(), "index.html");

if (fs.existsSync(rutaHTML)) {
    const html = fs.readFileSync(rutaHTML, "utf8");

    if (/href=["']css\/styles\.css["']/i.test(html)) {
        console.log("[OK] La hoja de estilos está enlazada.");
    } else {
        console.error("[ERROR] No se encontró la referencia a css/styles.css.");
        errores++;
    }

    if (/src=["']js\/app\.js["']/i.test(html)) {
        console.log("[OK] El archivo JavaScript está enlazado.");
    } else {
        console.error("[ERROR] No se encontró la referencia a js/app.js.");
        errores++;
    }
}

console.log("\n========================================");

if (errores === 0) {
    console.log("VALIDACIÓN EXITOSA");
    console.log("El proyecto está preparado para continuar.");
    console.log("========================================");
    process.exitCode = 0;
} else {
    console.error(`VALIDACIÓN FALLIDA: ${errores} problema(s) encontrado(s).`);
    console.log("========================================");
    process.exitCode = 1;
}
