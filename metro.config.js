const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Tambahkan 'wasm' ke dalam assetExts agar Metro bisa meng-handle file WebAssembly
config.resolver.assetExts.push('wasm');

module.exports = config;