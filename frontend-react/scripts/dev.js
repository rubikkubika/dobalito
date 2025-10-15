const esbuild = require('esbuild');
const path = require('path');

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
  },
  plugins: [{
    name: 'serve',
    setup(build) {
      build.onStart(() => {
        console.log('🚀 Starting esbuild dev server...');
      });
    }
  }]
};

// Запуск dev сервера с watch режимом
esbuild.build({
  ...config,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('❌ Watch build failed:', error);
      else console.log('✅ Watch build succeeded');
    },
  },
}).then(result => {
  console.log('✅ Initial build completed');
  
  // Запускаем простой HTTP сервер
  const http = require('http');
  const fs = require('fs');
  const path = require('path');
  
  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '..', 'public', req.url === '/' ? 'index.html' : req.url);
    
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
