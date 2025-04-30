
#include <iostream>
#include <fstream>
#include <filesystem>
#include <thread>
#include <chrono>
#include "miniz.h"

namespace fs = std::filesystem;

void extractZip(const std::string& zipPath, const std::string& outputPath) {
    mz_zip_archive zip_archive;
    memset(&zip_archive, 0, sizeof(zip_archive));

    if (!mz_zip_reader_init_file(&zip_archive, zipPath.c_str(), 0)) {
        std::cerr << "Erro ao abrir o arquivo ZIP: " << zipPath << std::endl;
        return;
    }

    int fileCount = (int)mz_zip_reader_get_num_files(&zip_archive);
    for (int i = 0; i < fileCount; ++i) {
        mz_zip_archive_file_stat file_stat;
        if (!mz_zip_reader_file_stat(&zip_archive, i, &file_stat)) continue;

        const std::string filePath = outputPath + "/" + file_stat.m_filename;
        if (mz_zip_reader_is_file_a_directory(&zip_archive, i)) {
            fs::create_directories(filePath);
        } else {
            fs::create_directories(fs::path(filePath).parent_path());
            mz_zip_reader_extract_to_file(&zip_archive, i, filePath.c_str(), 0);
        }
    }

    mz_zip_reader_end(&zip_archive);
    std::cout << "MÃ³dulo extraÃ­do em: " << outputPath << std::endl;
}

void executeModule(const std::string& modulePath) {
    std::string command = "chmod +x " + modulePath + " && " + modulePath;
    std::system(command.c_str());
}

void removeModule(const std::string& path) {
    fs::remove_all(path);
    std::cout << "MÃ³dulo descarregado: " << path << std::endl;
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cerr << "Uso: " << argv[0] << " <caminho_para_zip> <nome_do_modulo>" << std::endl;
        return 1;
    }

    std::string zipFile = argv[1];
    std::string moduleName = argv[2];
    std::string modulePath = "./modules/" + moduleName;

    if (!fs::exists(modulePath)) {
        extractZip(zipFile, modulePath);
    } else {
        std::cout << "MÃ³dulo jÃ¡ carregado: " << moduleName << std::endl;
    }

    std::string executablePath = modulePath + "/index";
    if (fs::exists(executablePath)) {
        executeModule(executablePath);
    }

    std::this_thread::sleep_for(std::chrono::seconds(3));
    removeModule(modulePath);

    return 0;
}
