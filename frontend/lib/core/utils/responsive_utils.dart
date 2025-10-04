import 'package:flutter/material.dart';

// Утилиты для адаптивного дизайна (в стиле Airbnb)
class ResponsiveUtils {
  // Размеры экранов
  static const double mobile = 375; // iPhone SE
  static const double mobileLarge = 414; // iPhone Plus
  static const double mobileXL = 480; // Большие мобильные
  static const double tablet = 768; // iPad
  static const double tabletLarge = 1024; // iPad Pro
  static const double desktop = 1200; // Desktop
  static const double desktopLarge = 1440; // Large Desktop

  // Определение типа экрана
  static bool isMobile(BuildContext context) {
    return MediaQuery.of(context).size.width <= mobile;
  }

  static bool isMobileLarge(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width > mobile && width <= mobileLarge;
  }

  static bool isMobileXL(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width > mobileLarge && width <= mobileXL;
  }

  static bool isTablet(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width > mobileXL && width <= tablet;
  }

  static bool isTabletLarge(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width > tablet && width <= tabletLarge;
  }

  static bool isDesktop(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width > tabletLarge && width <= desktop;
  }

  static bool isDesktopLarge(BuildContext context) {
    return MediaQuery.of(context).size.width > desktop;
  }

  // Удобные методы для определения layout'а
  static bool isMobileLayout(BuildContext context) {
    return MediaQuery.of(context).size.width <= tablet;
  }

  static bool isDesktopLayout(BuildContext context) {
    return MediaQuery.of(context).size.width > tablet;
  }

  // Адаптивные размеры отступов (оптимизированы)
  static double getHorizontalPadding(BuildContext context) {
    if (isMobile(context)) return 8.0; // еще меньше для мобильных
    if (isMobileLarge(context)) return 12.0; // еще меньше
    if (isMobileXL(context)) return 16.0; // еще меньше
    if (isTablet(context)) return 20.0; // меньше для планшетов
    if (isTabletLarge(context)) return 24.0; // меньше для больших планшетов
    if (isDesktop(context)) return 32.0; // уменьшено для десктопа
    return 40.0; // desktopLarge - уменьшено
  }

  static double getVerticalPadding(BuildContext context) {
    if (isMobile(context)) return 4.0; // еще меньше для мобильных
    if (isMobileLarge(context)) return 6.0; // еще меньше
    if (isMobileXL(context)) return 8.0; // еще меньше
    if (isTablet(context)) return 10.0; // меньше для планшетов
    if (isTabletLarge(context)) return 12.0; // меньше для больших планшетов
    if (isDesktop(context)) return 16.0; // уменьшено для десктопа
    return 20.0; // desktopLarge - уменьшено
  }

  // Адаптивные размеры шрифтов (уменьшены на 20% для мобильных)
  static double getTitleFontSize(BuildContext context) {
    if (isMobile(context)) return 19.2; // 24.0 * 0.8
    if (isMobileLarge(context)) return 20.8; // 26.0 * 0.8
    if (isTablet(context)) return 28.0;
    if (isDesktop(context)) return 32.0;
    return 36.0; // desktopLarge
  }

  static double getBodyFontSize(BuildContext context) {
    if (isMobile(context)) return 11.2; // 14.0 * 0.8
    if (isMobileLarge(context)) return 12.0; // 15.0 * 0.8
    if (isTablet(context)) return 16.0;
    if (isDesktop(context)) return 17.0;
    return 18.0; // desktopLarge
  }

  // Адаптивные размеры кнопок
  static double getButtonHeight(BuildContext context) {
    if (isMobile(context)) return 44.0;
    if (isMobileLarge(context)) return 48.0;
    if (isTablet(context)) return 52.0;
    if (isDesktop(context)) return 56.0;
    return 60.0; // desktopLarge
  }

  // Адаптивные размеры иконок
  static double getIconSize(BuildContext context) {
    if (isMobile(context)) return 20.0;
    if (isMobileLarge(context)) return 22.0;
    if (isTablet(context)) return 24.0;
    if (isDesktop(context)) return 26.0;
    return 28.0; // desktopLarge
  }

  // Максимальная ширина контента
  static double getMaxContentWidth(BuildContext context) {
    if (isMobile(context)) return double.infinity;
    if (isMobileLarge(context)) return double.infinity;
    if (isTablet(context)) return 600.0;
    if (isDesktop(context)) return 800.0;
    return 1000.0; // desktopLarge
  }

  // Количество колонок для сетки
  static int getGridColumns(BuildContext context) {
    if (isMobile(context)) return 1;
    if (isMobileLarge(context)) return 1;
    if (isTablet(context)) return 2;
    if (isDesktop(context)) return 3;
    return 4; // desktopLarge
  }
}
