import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import '../utils/responsive_utils.dart';

// Виджет для отладки адаптивности (только для разработки)
class ResponsiveDebug extends StatelessWidget {
  const ResponsiveDebug({super.key});

  @override
  Widget build(BuildContext context) {
    // Показывать только в debug режиме
    if (!kDebugMode) return const SizedBox.shrink();
    
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    
    String screenType = 'Unknown';
    if (ResponsiveUtils.isMobile(context)) screenType = 'Mobile (≤${ResponsiveUtils.mobile}px)';
    else if (ResponsiveUtils.isMobileLarge(context)) screenType = 'Mobile Large (≤${ResponsiveUtils.mobileLarge}px)';
    else if (ResponsiveUtils.isMobileXL(context)) screenType = 'Mobile XL (≤${ResponsiveUtils.mobileXL}px)';
    else if (ResponsiveUtils.isTablet(context)) screenType = 'Tablet (≤${ResponsiveUtils.tablet}px)';
    else if (ResponsiveUtils.isTabletLarge(context)) screenType = 'Tablet Large (≤${ResponsiveUtils.tabletLarge}px)';
    else if (ResponsiveUtils.isDesktop(context)) screenType = 'Desktop (≤${ResponsiveUtils.desktop}px)';
    else screenType = 'Desktop Large (>${ResponsiveUtils.desktop}px)';
    
    final layoutType = ResponsiveUtils.isMobileLayout(context) ? 'Mobile Layout' : 'Desktop Layout';
    
    return Positioned(
      top: 0,
      right: 0,
      child: Container(
        padding: const EdgeInsets.all(8),
        margin: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.black87,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Screen: ${screenWidth.toInt()}×${screenHeight.toInt()}',
              style: const TextStyle(color: Colors.white, fontSize: 12),
            ),
            Text(
              'Type: $screenType',
              style: const TextStyle(color: Colors.white, fontSize: 12),
            ),
            Text(
              'Layout: $layoutType',
              style: const TextStyle(color: Colors.white, fontSize: 12),
            ),
            Text(
              'Padding: ${ResponsiveUtils.getHorizontalPadding(context).toInt()}px',
              style: const TextStyle(color: Colors.white, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
