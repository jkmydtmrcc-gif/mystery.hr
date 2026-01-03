// PM2 Configuration for Mystery.hr
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "mystery-hr",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Logging
      error_file: "./logs/error.log",
      out_file: "./logs/output.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
}
