class EnvConfig {
  // API Configuration
  static const String apiBaseUrl = 'http://localhost:8080/api/v1';
  static const String apiVersion = '/api/v1';
  static String get fullApiUrl => apiBaseUrl;
  
  // App Configuration
  static const String appName = 'Dobalito';
  static const String appVersion = '1.0.0';
  
  // Debug Configuration
  static const bool debugMode = true;
}
