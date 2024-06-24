const PROXY_CONFIG = [
  {
    context: ["/Service.svc", "/UserService.svc"],
    target: "https://localhost:32768",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
