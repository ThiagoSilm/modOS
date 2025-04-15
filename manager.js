const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// Função para gerenciar e carregar módulos
function loadModule(zipPath, moduleName) {
    const extractPath = path.join(__dirname, 'modules', moduleName);
    if (fs.existsSync(extractPath)) {
        console.log(`Módulo ${moduleName} já está carregado.`);
        return;
    }
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);
    console.log(`Módulo ${moduleName} carregado.`);

    // Simula execução do módulo
    const moduleFile = path.join(extractPath, 'index.js');
    if (fs.existsSync(moduleFile)) {
        require(moduleFile)();
    }

    // Após execução, remove o módulo da memória (simulado)
    setTimeout(() => {
        fs.rmSync(extractPath, { recursive: true, force: true });
        console.log(`Módulo ${moduleName} descarregado.`);
    }, 3000); // Simulação de 3 segundos
}

module.exports = { loadModule };