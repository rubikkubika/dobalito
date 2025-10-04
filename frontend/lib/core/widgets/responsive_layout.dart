import 'package:flutter/material.dart';

import 'top_navigation.dart';

// Размеры экранов для адаптивности (как у Airbnb)
class Breakpoints {
  static const double mobile = 375; // iPhone SE
  static const double mobileLarge = 414; // iPhone Plus
  static const double tablet = 768; // iPad
  static const double desktop = 1024; // Desktop
  static const double desktopLarge = 1440; // Large Desktop
}

// Типы экранов
enum ScreenType {
  mobile,
  mobileLarge,
  tablet,
  desktop,
  desktopLarge,
}

class ResponsiveLayout extends StatelessWidget {
  final Widget child;
  final String currentRoute;

  const ResponsiveLayout({
    super.key,
    required this.child,
    required this.currentRoute,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Top navigation
          TopNavigation(currentRoute: currentRoute),
          
          // Main content
          Expanded(
            child: Container(
              color: Colors.grey.shade50,
              child: _buildResponsiveContent(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResponsiveContent(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenWidth = MediaQuery.of(context).size.width;
        final screenHeight = MediaQuery.of(context).size.height;
        final screenType = _getScreenType(screenWidth);
        
        return _buildLayoutForScreenType(context, screenType, screenWidth, screenHeight);
      },
    );
  }

  ScreenType _getScreenType(double width) {
    if (width <= Breakpoints.mobile) {
      return ScreenType.mobile;
    } else if (width <= Breakpoints.mobileLarge) {
      return ScreenType.mobileLarge;
    } else if (width <= Breakpoints.tablet) {
      return ScreenType.tablet;
    } else if (width <= Breakpoints.desktop) {
      return ScreenType.desktop;
    } else {
      return ScreenType.desktopLarge;
    }
  }

  Widget _buildLayoutForScreenType(BuildContext context, ScreenType screenType, double width, double height) {
    switch (screenType) {
      case ScreenType.mobile:
        return _buildMobileLayout(context, width, height);
      case ScreenType.mobileLarge:
        return _buildMobileLargeLayout(context, width, height);
      case ScreenType.tablet:
        return _buildTabletLayout(context, width, height);
      case ScreenType.desktop:
        return _buildDesktopLayout(context, width, height);
      case ScreenType.desktopLarge:
        return _buildDesktopLargeLayout(context, width, height);
    }
  }

  // iPhone SE (375x667) - минимальные отступы, компактный layout
  Widget _buildMobileLayout(BuildContext context, double width, double height) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: height - 100, // Учитываем навигацию
          ),
          child: child,
        ),
      ),
    );
  }

  // iPhone Plus (414x896) - чуть больше отступов
  Widget _buildMobileLargeLayout(BuildContext context, double width, double height) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: height - 100,
          ),
          child: child,
        ),
      ),
    );
  }

  // iPad (768x1024) - центрированный контент с ограничением ширины
  Widget _buildTabletLayout(BuildContext context, double width, double height) {
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 600),
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: height - 100,
            ),
            child: child,
          ),
        ),
      ),
    );
  }

  // Desktop (1024x768) - широкий layout
  Widget _buildDesktopLayout(BuildContext context, double width, double height) {
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 800),
        padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 24.0),
        child: child,
      ),
    );
  }

  // Large Desktop (1440x900+) - максимальный layout
  Widget _buildDesktopLargeLayout(BuildContext context, double width, double height) {
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 1000),
        padding: const EdgeInsets.symmetric(horizontal: 40.0, vertical: 32.0),
        child: child,
      ),
    );
  }
}
