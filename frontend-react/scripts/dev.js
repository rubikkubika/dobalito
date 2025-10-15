const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const config = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'build/bundle.js',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.css': 'css'
  }
};

console.log('🚀 Starting esbuild dev server...');

// Используем context для watch режима
esbuild.context(config).then(async ctx => {
  console.log('✅ Initial build completed');
  
  // Запускаем watch режим
  await ctx.watch();
  console.log('✅ Watch mode started');
  
  // Запускаем простой HTTP сервер
  const http = require('http');
  
  const server = http.createServer((req, res) => {
    let filePath;
    
    // Обрабатываем разные типы запросов
    if (req.url === '/') {
      filePath = path.join(__dirname, '..', 'public', 'index.html');
    } else if (req.url === '/bundle.js') {
      filePath = path.join(__dirname, '..', 'build', 'bundle.js');
    } else if (req.url === '/bundle.css') {
      filePath = path.join(__dirname, '..', 'build', 'bundle.css');
    } else {
      // Остальные статические файлы из public
      filePath = path.join(__dirname, '..', 'public', req.url);
    }
    
    // Если файл не найден, отдаем index.html для SPA
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, '..', 'public', 'index.html');
    }
    
    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'text/plain';
    
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
  
  server.listen(3000, '0.0.0.0', () => {
    console.log('✅ Server running at http://localhost:3000');
  });
}).catch(error => {
  console.error('❌ Error starting dev server:', error);
  process.exit(1);
});
