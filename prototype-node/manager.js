
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const config = require('./config.json');

function loadModule(moduleName) {
    const modulePath = path.join(__dirname, 'modules', moduleName + '.zip');
    const extractPath = path.join(__dirname, 'active_modules', moduleName);

    if (!fs.existsSync(modulePath)) {
        console.log(`Módulo ${moduleName} não encontrado.`);
        return;
    }

    const zip = new AdmZip(modulePath);
    zip.extractAllTo(extractPath, true);
    console.log(`Módulo ${moduleName} carregado em memória.`);

    // Simulação de uso e descarregamento após 5 segundos
    setTimeout(() => {
        fs.rmSync(extractPath, { recursive: true, force: true });
        console.log(`Módulo ${moduleName} descarregado da memória.`);
    }, 5000);
}

function checkProgressAndLoad() {
    config.progress.forEach(item => {
        if (item.triggered) {
            loadModule(item.module);
        }
    });
}

checkProgressAndLoad();
