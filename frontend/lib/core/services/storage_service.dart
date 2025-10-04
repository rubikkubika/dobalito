import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static SharedPreferences? _prefs;

  static Future<void> init() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  // Token management
  static Future<void> saveToken(String token) async {
    await _prefs?.setString('auth_token', token);
  }

  static String? getToken() {
    return _prefs?.getString('auth_token');
  }

  static Future<void> removeToken() async {
    await _prefs?.remove('auth_token');
  }

  // User data management
  static Future<void> saveUserData(Map<String, dynamic> userData) async {
    await _prefs?.setString('user_data', jsonEncode(userData));
  }

  static Map<String, dynamic>? getUserData() {
    final userDataString = _prefs?.getString('user_data');
    if (userDataString != null) {
      return jsonDecode(userDataString) as Map<String, dynamic>;
    }
    return null;
  }

  static Future<void> removeUserData() async {
    await _prefs?.remove('user_data');
  }

  // Settings management
  static Future<void> saveSetting(String key, dynamic value) async {
    if (value is String) {
      await _prefs?.setString(key, value);
    } else if (value is int) {
      await _prefs?.setInt(key, value);
    } else if (value is double) {
      await _prefs?.setDouble(key, value);
    } else if (value is bool) {
      await _prefs?.setBool(key, value);
    } else if (value is List<String>) {
      await _prefs?.setStringList(key, value);
    }
  }

  static T? getSetting<T>(String key) {
    return _prefs?.get(key) as T?;
  }

  // Cache management
  static Future<void> saveCache(String key, Map<String, dynamic> data) async {
    await _prefs?.setString('cache_$key', jsonEncode(data));
  }

  static Map<String, dynamic>? getCache(String key) {
    final cacheString = _prefs?.getString('cache_$key');
    if (cacheString != null) {
      return jsonDecode(cacheString) as Map<String, dynamic>;
    }
    return null;
  }

  static Future<void> clearCache() async {
    final keys = _prefs?.getKeys().where((key) => key.startsWith('cache_')).toList();
    if (keys != null) {
      for (final key in keys) {
        await _prefs?.remove(key);
      }
    }
  }

  // Clear all data
  static Future<void> clearAll() async {
    await _prefs?.clear();
  }
}
