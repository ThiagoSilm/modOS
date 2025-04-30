// manager.js const fs = require('fs'); const path = require('path'); const AdmZip = require('adm-zip');

// Estado global de módulos const loadedModules = new Map();

// Carrega e executa um módulo de forma isolada function loadModule(zipPath, moduleName) { const extractPath = path.join(__dirname, 'modules', moduleName);

if (loadedModules.has(moduleName)) {
    console.log(`[SKIP] Módulo '${moduleName}' já está em execução.`);
    return;
}

const zip = new AdmZip(zipPath);
zip.extractAllTo(extractPath, true);
console.log(`[LOAD] Módulo '${moduleName}' carregado em memória.`);

const moduleFile = path.join(extractPath, 'index.js');
if (fs.existsSync(moduleFile)) {
    try {
        const instance = require(moduleFile);
        if (typeof instance === 'function') {
            instance();
        }
    } catch (err) {
        console.error(`[ERROR] Erro ao executar o módulo '${moduleName}':`, err);
    }
}

loadedModules.set(moduleName, {
    path: extractPath,
    timestamp: Date.now()
});

}

// Descarrega módulo function unloadModule(moduleName) { const moduleInfo = loadedModules.get(moduleName); if (!moduleInfo) return;

fs.rmSync(moduleInfo.path, { recursive: true, force: true });
loadedModules.delete(moduleName);
console.log(`[UNLOAD] Módulo '${moduleName}' descarregado.`);

}

// Ciclo de verificação e descarregamento automático setInterval(() => { const now = Date.now(); for (const [name, data] of loadedModules.entries()) { if (now - data.timestamp > 5000) { // descarrega após 5s ocioso unloadModule(name); } } }, 2000);

// Inicializador function run() { const zipsPath = path.join(__dirname, 'zips'); const files = fs.readdirSync(zipsPath).filter(f => f.endsWith('.zip'));

for (const file of files) {
    const moduleName = path.basename(file, '.zip');
    const fullPath = path.join(zipsPath, file);
    loadModule(fullPath, moduleName);
}

}

run();

module.exports = { loadModule, unloadModule };

