const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const config = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'build/bundle.js',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  minify: true,
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.css': 'css',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file'
  },
  plugins: [{
    name: 'copy-assets',
    setup(build) {
      build.onEnd(() => {
        // Копируем статические файлы
        if (!fs.existsSync('build')) {
          fs.mkdirSync('build');
        }
        
        // Копируем index.html
        if (fs.existsSync('public/index.html')) {
          fs.copyFileSync('public/index.html', 'build/index.html');
        }
        
        // Копируем папку images
        if (fs.existsSync('public/images')) {
          fs.cpSync('public/images', 'build/images', { recursive: true });
        }
        
        // Копируем остальные статические файлы
        const staticFiles = ['favicon.ico', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt'];
        staticFiles.forEach(file => {
          if (fs.existsSync(`public/${file}`)) {
            fs.copyFileSync(`public/${file}`, `build/${file}`);
          }
        });
        
        console.log('✅ Build completed!');
      });
    }
  }]
};

esbuild.build(config).catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
