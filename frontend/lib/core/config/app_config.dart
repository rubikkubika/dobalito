import 'env_config.dart';

class AppConfig {
  static const String appName = 'Dobalito';
  static const String appVersion = '1.0.0';
  
  // API Configuration
  static String get baseUrl => EnvConfig.apiBaseUrl;
  static String get apiVersion => EnvConfig.apiVersion;
  static String get fullApiUrl => EnvConfig.fullApiUrl;
  
  // Database Configuration (for local storage)
  static const String dbName = 'dobalito_local.db';
  
  // App Settings
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration cacheTimeout = Duration(hours: 24);
  
  // Platform specific settings
  static const bool enableLogging = true;
  static const bool enableCrashReporting = true;
}
