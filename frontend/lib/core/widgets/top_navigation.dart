import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../utils/responsive_utils.dart';

class TopNavigation extends StatelessWidget {
  final String currentRoute;

  const TopNavigation({
    super.key,
    required this.currentRoute,
  });

  @override
  Widget build(BuildContext context) {
    final isMobileLayout = ResponsiveUtils.isMobileLayout(context);
    
    return Container(
      height: ResponsiveUtils.getButtonHeight(context) + 24,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(
            color: Colors.grey.shade200,
            width: 1,
          ),
        ),
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: ResponsiveUtils.getHorizontalPadding(context)),
        child: isMobileLayout ? _buildMobileLayout(context) : _buildDesktopLayout(context),
      ),
    );
  }

  // Мобильный layout с бургер-меню
  Widget _buildMobileLayout(BuildContext context) {
    return Row(
      children: [
        // Бургер-меню слева
        _buildBurgerMenu(context),
        
        const SizedBox(width: 16),
        
        // Logo (центрированный)
        Expanded(
          child: _buildMobileLogo(context),
        ),
        
        const SizedBox(width: 16),
        
        // User menu справа
        _buildMobileUserMenu(context),
      ],
    );
  }

  // Десктопный layout
  Widget _buildDesktopLayout(BuildContext context) {
    return Row(
      children: [
        // Left spacer
        const Spacer(flex: 1),
        
        // Logo (centered like Airbnb)
        _buildLogo(context),
        
        const SizedBox(width: 32),
        
        // Center search area
        Expanded(
          flex: 2,
          child: _buildSearchArea(context),
        ),
        
        const SizedBox(width: 32),
        
        // Right navigation (like Airbnb)
        _buildRightNavigation(context),
        
        // Right spacer
        const Spacer(flex: 1),
      ],
    );
  }

  // Бургер-меню
  Widget _buildBurgerMenu(BuildContext context) {
    return Container(
      width: ResponsiveUtils.getButtonHeight(context),
      height: ResponsiveUtils.getButtonHeight(context),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(8),
      ),
      child: IconButton(
        icon: Icon(
          Icons.menu,
          color: Colors.grey.shade700,
          size: ResponsiveUtils.getIconSize(context),
        ),
        onPressed: () => _showMobileMenu(context),
      ),
    );
  }

  // Мобильный логотип (адаптивный размер, без рамки)
  Widget _buildMobileLogo(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    // Адаптивные размеры в зависимости от экрана (увеличенные)
    double iconSize, fontSize, spacing;
    
    if (screenWidth <= ResponsiveUtils.mobile) {
      // iPhone SE - компактный (увеличено с 28 до 40)
      iconSize = 40;
      fontSize = 18;
      spacing = 12;
    } else if (screenWidth <= ResponsiveUtils.mobileLarge) {
      // iPhone Plus - средний (увеличено с 32 до 44)
      iconSize = 44;
      fontSize = 20;
      spacing = 14;
    } else {
      // Большие мобильные - крупный (увеличено с 36 до 48)
      iconSize = 48;
      fontSize = 22;
      spacing = 16;
    }
    
    return InkWell(
      onTap: () => context.go('/home'),
      borderRadius: BorderRadius.circular(8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomPaint(
            size: Size(iconSize, iconSize),
            painter: BaliIconPainter(),
          ),
          SizedBox(width: spacing),
          Text(
            'doBalito',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: Colors.green.shade500,
              fontWeight: FontWeight.w700,
              fontSize: fontSize,
              letterSpacing: -0.5,
            ),
          ),
        ],
      ),
    );
  }


  // Мобильное меню пользователя (простое)
  Widget _buildMobileUserMenu(BuildContext context) {
    return Container(
      width: ResponsiveUtils.getButtonHeight(context),
      height: ResponsiveUtils.getButtonHeight(context),
      decoration: BoxDecoration(
        color: Colors.green.shade500,
        borderRadius: BorderRadius.circular(ResponsiveUtils.getButtonHeight(context) / 2),
      ),
      child: const Center(
        child: Text(
          'A',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ),
    );
  }

  // Показать мобильное меню
  void _showMobileMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.7,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            
            // Menu items
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.search,
                      title: 'Поиск заданий',
                      subtitle: 'Найти подходящие задания',
                      onTap: () {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Поиск заданий')),
                        );
                      },
                    ),
                    
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.person_add,
                      title: 'Стать исполнителем',
                      subtitle: 'Начать зарабатывать',
                      onTap: () {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Стать исполнителем')),
                        );
                      },
                    ),
                    
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.design_services,
                      title: 'Макеты дизайнов',
                      subtitle: 'Галерея готовых решений',
                      onTap: () {
                        Navigator.pop(context);
                        context.go('/designs');
                      },
                    ),
                    
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.person_outline,
                      title: 'Профиль',
                      subtitle: 'Личные данные',
                      onTap: () {
                        Navigator.pop(context);
                        context.go('/profile');
                      },
                    ),
                    
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.settings_outlined,
                      title: 'Настройки',
                      subtitle: 'Конфигурация приложения',
                      onTap: () {
                        Navigator.pop(context);
                        context.go('/settings');
                      },
                    ),
                    
                    _buildMobileMenuItem(
                      context,
                      icon: Icons.help_outline,
                      title: 'Помощь',
                      subtitle: 'Справка и поддержка',
                      onTap: () {
                        Navigator.pop(context);
                        _showHelpDialog(context);
                      },
                    ),
                    
                    const SizedBox(height: 20),
                    
                    // Logout button
                    Container(
                      width: double.infinity,
                      height: 50,
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.red.shade200),
                      ),
                      child: InkWell(
                        onTap: () {
                          Navigator.pop(context);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Выход из системы')),
                          );
                        },
                        borderRadius: BorderRadius.circular(12),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.logout, color: Colors.red.shade600, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              'Выйти',
                              style: TextStyle(
                                color: Colors.red.shade600,
                                fontWeight: FontWeight.w600,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Элемент мобильного меню
  Widget _buildMobileMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.grey.shade50,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  icon,
                  color: Colors.green.shade600,
                  size: 24,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right,
                color: Colors.grey.shade400,
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo(BuildContext context) {
    return InkWell(
      onTap: () => context.go('/home'),
      borderRadius: BorderRadius.circular(8),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomPaint(
            size: Size(60, 60),
            painter: BaliIconPainter(),
          ),
          const SizedBox(width: 12),
          Text(
            'doBalito',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              color: Colors.green.shade500,
              fontWeight: FontWeight.w700,
              fontSize: 24,
              letterSpacing: -0.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchArea(BuildContext context) {
    return Container(
      height: 56,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.grey.shade400, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                'Поиск заданий или исполнителей...',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey.shade500,
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ),
          ),
          Container(
            width: 48,
            height: 48,
            margin: const EdgeInsets.only(right: 8),
            decoration: BoxDecoration(
              color: Colors.green.shade500,
              borderRadius: BorderRadius.circular(24),
            ),
            child: const Icon(
              Icons.search,
              color: Colors.white,
              size: 24,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRightNavigation(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _buildNavLink(context, 'Стать исполнителем', () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Стать исполнителем')),
          );
        }),
        const SizedBox(width: 16),
        _buildNavLink(context, 'Помощь', () => _showHelpDialog(context)),
        const SizedBox(width: 16),
        _buildUserMenu(context),
      ],
    );
  }

  Widget _buildNavLink(BuildContext context, String title, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Text(
          title,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: Colors.grey.shade700,
            fontWeight: FontWeight.w500,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    IconData icon,
    VoidCallback onPressed,
  ) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(20),
      ),
      child: IconButton(
        icon: Icon(
          icon,
          size: 20,
          color: Colors.grey.shade600,
        ),
        onPressed: onPressed,
      ),
    );
  }

  Widget _buildUserMenu(BuildContext context) {
    return PopupMenuButton<String>(
      onSelected: (value) {
        switch (value) {
          case 'profile':
            context.go('/profile');
            break;
          case 'designs':
            context.go('/designs');
            break;
          case 'settings':
            context.go('/settings');
            break;
          case 'logout':
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Выход из системы')),
            );
            break;
        }
      },
      itemBuilder: (context) => [
        PopupMenuItem(
          value: 'profile',
          child: Row(
            children: [
              Icon(Icons.person_outline, size: 20, color: Colors.grey.shade600),
              const SizedBox(width: 12),
              const Text('Профиль'),
            ],
          ),
        ),
        PopupMenuItem(
          value: 'designs',
          child: Row(
            children: [
              Icon(Icons.design_services, size: 20, color: Colors.grey.shade600),
              const SizedBox(width: 12),
              const Text('Макеты дизайнов'),
            ],
          ),
        ),
        PopupMenuItem(
          value: 'settings',
          child: Row(
            children: [
              Icon(Icons.settings_outlined, size: 20, color: Colors.grey.shade600),
              const SizedBox(width: 12),
              const Text('Настройки'),
            ],
          ),
        ),
        const PopupMenuDivider(),
        PopupMenuItem(
          value: 'logout',
          child: Row(
            children: [
              Icon(Icons.logout, size: 20, color: Colors.green.shade600),
              const SizedBox(width: 12),
              Text('Выйти', style: TextStyle(color: Colors.green.shade600)),
            ],
          ),
        ),
      ],
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300, width: 1),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 32,
              height: 32,
              margin: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: Colors.grey.shade200,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(
                Icons.menu,
                size: 16,
                color: Colors.grey,
              ),
            ),
            Container(
              width: 32,
              height: 32,
              margin: const EdgeInsets.only(right: 4, top: 4, bottom: 4),
              decoration: BoxDecoration(
                color: Colors.green.shade500,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Center(
                child: Text(
                  'A',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showHelpDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Справка'),
        content: const Text(
          'Это приложение для создания заданий с исполнителями.\n\n'
          'Используйте меню пользователя в правом верхнем углу для доступа к:\n'
          '• Профиль - личные данные\n'
          '• Макеты дизайнов - галерея макетов\n'
          '• Настройки - конфигурация приложения',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Понятно'),
          ),
        ],
      ),
    );
  }
}

class BaliIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 1.5;

    // Остров (песок) - основа
    paint.color = Colors.amber.shade300;
    final islandPath = Path()
      ..moveTo(size.width * 0.1, size.height * 0.8)
      ..quadraticBezierTo(
        size.width * 0.2, size.height * 0.7,
        size.width * 0.4, size.height * 0.75,
      )
      ..quadraticBezierTo(
        size.width * 0.6, size.height * 0.8,
        size.width * 0.8, size.height * 0.75,
      )
      ..quadraticBezierTo(
        size.width * 0.9, size.height * 0.85,
        size.width * 0.85, size.height * 0.95,
      )
      ..lineTo(size.width * 0.1, size.height * 0.95)
      ..close();
    canvas.drawPath(islandPath, paint);

    // Серфдоска (левая часть острова)
    paint.color = Colors.orange.shade400;
    final surfboardPath = Path()
      ..moveTo(size.width * 0.25, size.height * 0.85)
      ..quadraticBezierTo(
        size.width * 0.2, size.height * 0.8,
        size.width * 0.25, size.height * 0.75,
      )
      ..quadraticBezierTo(
        size.width * 0.3, size.height * 0.8,
        size.width * 0.25, size.height * 0.85,
      );
    canvas.drawPath(surfboardPath, paint);

    // Наклоненная пальма (правая часть острова)
    paint.color = Colors.brown.shade600;
    final trunkPath = Path()
      ..moveTo(size.width * 0.7, size.height * 0.8)
      ..quadraticBezierTo(
        size.width * 0.75, size.height * 0.4,
        size.width * 0.8, size.height * 0.2,
      )
      ..quadraticBezierTo(
        size.width * 0.85, size.height * 0.4,
        size.width * 0.9, size.height * 0.8,
      )
      ..close();
    canvas.drawPath(trunkPath, paint);

    // Листья наклоненной пальмы
    paint.color = Colors.green.shade600;
    
    // Лист 1 (левый верхний)
    final leaf1Path = Path()
      ..moveTo(size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(
        size.width * 0.6, size.height * 0.05,
        size.width * 0.5, size.height * 0.1,
      )
      ..quadraticBezierTo(
        size.width * 0.65, size.height * 0.15,
        size.width * 0.8, size.height * 0.2,
      );
    canvas.drawPath(leaf1Path, paint);

    // Лист 2 (правый верхний)
    final leaf2Path = Path()
      ..moveTo(size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(
        size.width * 0.95, size.height * 0.05,
        size.width * 1.0, size.height * 0.1,
      )
      ..quadraticBezierTo(
        size.width * 0.9, size.height * 0.15,
        size.width * 0.8, size.height * 0.2,
      );
    canvas.drawPath(leaf2Path, paint);

    // Лист 3 (центральный верхний)
    final leaf3Path = Path()
      ..moveTo(size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(
        size.width * 0.8, size.height * 0.02,
        size.width * 0.8, size.height * 0.0,
      )
      ..quadraticBezierTo(
        size.width * 0.8, size.height * 0.02,
        size.width * 0.8, size.height * 0.2,
      );
    canvas.drawPath(leaf3Path, paint);

    // Волны (океан)
    paint.color = Colors.blue.shade300;
    paint.strokeWidth = 2;
    paint.style = PaintingStyle.stroke;
    
    // Волна 1
    final wave1Path = Path()
      ..moveTo(size.width * 0.0, size.height * 0.9)
      ..quadraticBezierTo(
        size.width * 0.2, size.height * 0.85,
        size.width * 0.4, size.height * 0.9,
      )
      ..quadraticBezierTo(
        size.width * 0.6, size.height * 0.95,
        size.width * 0.8, size.height * 0.9,
      )
      ..quadraticBezierTo(
        size.width * 1.0, size.height * 0.85,
        size.width * 1.0, size.height * 0.9,
      );
    canvas.drawPath(wave1Path, paint);

    // Волна 2 (меньше)
    final wave2Path = Path()
      ..moveTo(size.width * 0.0, size.height * 0.95)
      ..quadraticBezierTo(
        size.width * 0.3, size.height * 0.92,
        size.width * 0.6, size.height * 0.95,
      )
      ..quadraticBezierTo(
        size.width * 0.9, size.height * 0.98,
        size.width * 1.0, size.height * 0.95,
      );
    canvas.drawPath(wave2Path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

// Старый PalmTreePainter для десктопной версии
class PalmTreePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 1.5;

    // Остров (песок) - более изогнутый как на изображении
    paint.color = Colors.amber.shade300;
    final islandPath = Path()
      ..moveTo(size.width * 0.1, size.height * 0.75)
      ..quadraticBezierTo(
        size.width * 0.2, size.height * 0.65,
        size.width * 0.4, size.height * 0.7,
      )
      ..quadraticBezierTo(
        size.width * 0.6, size.height * 0.75,
        size.width * 0.8, size.height * 0.7,
      )
      ..quadraticBezierTo(
        size.width * 0.9, size.height * 0.8,
        size.width * 0.85, size.height * 0.9,
      )
      ..lineTo(size.width * 0.1, size.height * 0.9)
      ..close();
    canvas.drawPath(islandPath, paint);

    // Большая пальма (правая)
    paint.color = Colors.brown.shade600;
    final trunkPath = Path()
      ..moveTo(size.width * 0.65, size.height * 0.7)
      ..quadraticBezierTo(
        size.width * 0.68, size.height * 0.5,
        size.width * 0.7, size.height * 0.3,
      )
      ..quadraticBezierTo(
        size.width * 0.72, size.height * 0.5,
        size.width * 0.75, size.height * 0.7,
      )
      ..close();
    canvas.drawPath(trunkPath, paint);

    // Листья большой пальмы - более детализированные
    paint.color = Colors.green.shade600;
    
    // Лист 1 (левый верхний)
    final leaf1Path = Path()
      ..moveTo(size.width * 0.7, size.height * 0.3)
      ..quadraticBezierTo(
        size.width * 0.5, size.height * 0.1,
        size.width * 0.3, size.height * 0.2,
      )
      ..quadraticBezierTo(
        size.width * 0.4, size.height * 0.25,
        size.width * 0.7, size.height * 0.3,
      );
    canvas.drawPath(leaf1Path, paint);

    // Лист 2 (правый верхний)
    final leaf2Path = Path()
      ..moveTo(size.width * 0.7, size.height * 0.3)
      ..quadraticBezierTo(
        size.width * 0.9, size.height * 0.1,
        size.width * 0.95, size.height * 0.2,
      )
      ..quadraticBezierTo(
        size.width * 0.85, size.height * 0.25,
        size.width * 0.7, size.height * 0.3,
      );
    canvas.drawPath(leaf2Path, paint);

    // Лист 3 (центральный верхний)
    final leaf3Path = Path()
      ..moveTo(size.width * 0.7, size.height * 0.3)
      ..quadraticBezierTo(
        size.width * 0.7, size.height * 0.05,
        size.width * 0.7, size.height * 0.02,
      )
      ..quadraticBezierTo(
        size.width * 0.7, size.height * 0.05,
        size.width * 0.7, size.height * 0.3,
      );
    canvas.drawPath(leaf3Path, paint);

    // Лист 4 (левый нижний)
    final leaf4Path = Path()
      ..moveTo(size.width * 0.7, size.height * 0.3)
      ..quadraticBezierTo(
        size.width * 0.55, size.height * 0.2,
        size.width * 0.4, size.height * 0.3,
      )
      ..quadraticBezierTo(
        size.width * 0.5, size.height * 0.35,
        size.width * 0.7, size.height * 0.3,
      );
    canvas.drawPath(leaf4Path, paint);

    // Лист 5 (правый нижний)
    final leaf5Path = Path()
      ..moveTo(size.width * 0.7, size.height * 0.3)
      ..quadraticBezierTo(
        size.width * 0.85, size.height * 0.2,
        size.width * 0.9, size.height * 0.3,
      )
      ..quadraticBezierTo(
        size.width * 0.8, size.height * 0.35,
        size.width * 0.7, size.height * 0.3,
      );
    canvas.drawPath(leaf5Path, paint);

    // Маленькая пальма (левая)
    paint.color = Colors.brown.shade600;
    final smallTrunkPath = Path()
      ..moveTo(size.width * 0.35, size.height * 0.75)
      ..quadraticBezierTo(
        size.width * 0.37, size.height * 0.6,
        size.width * 0.38, size.height * 0.45,
      )
      ..quadraticBezierTo(
        size.width * 0.39, size.height * 0.6,
        size.width * 0.41, size.height * 0.75,
      )
      ..close();
    canvas.drawPath(smallTrunkPath, paint);

    // Листья маленькой пальмы
    paint.color = Colors.green.shade600;
    
    // Лист маленькой пальмы 1
    final smallLeaf1Path = Path()
      ..moveTo(size.width * 0.38, size.height * 0.45)
      ..quadraticBezierTo(
        size.width * 0.25, size.height * 0.3,
        size.width * 0.2, size.height * 0.35,
      )
      ..quadraticBezierTo(
        size.width * 0.28, size.height * 0.4,
        size.width * 0.38, size.height * 0.45,
      );
    canvas.drawPath(smallLeaf1Path, paint);

    // Лист маленькой пальмы 2
    final smallLeaf2Path = Path()
      ..moveTo(size.width * 0.38, size.height * 0.45)
      ..quadraticBezierTo(
        size.width * 0.5, size.height * 0.3,
        size.width * 0.55, size.height * 0.35,
      )
      ..quadraticBezierTo(
        size.width * 0.48, size.height * 0.4,
        size.width * 0.38, size.height * 0.45,
      );
    canvas.drawPath(smallLeaf2Path, paint);

    // Пляжный зонт (левая часть острова)
    paint.color = Colors.red.shade400;
    final umbrellaPath = Path()
      ..moveTo(size.width * 0.25, size.height * 0.8)
      ..quadraticBezierTo(
        size.width * 0.2, size.height * 0.7,
        size.width * 0.25, size.height * 0.65,
      )
      ..quadraticBezierTo(
        size.width * 0.3, size.height * 0.7,
        size.width * 0.25, size.height * 0.8,
      );
    canvas.drawPath(umbrellaPath, paint);

    // Ножка зонтика
    paint.color = Colors.brown.shade400;
    paint.strokeWidth = 2;
    paint.style = PaintingStyle.stroke;
    canvas.drawLine(
      Offset(size.width * 0.25, size.height * 0.8),
      Offset(size.width * 0.25, size.height * 0.85),
      paint,
    );

    // Шезлонг под зонтиком
    paint.color = Colors.blue.shade300;
    paint.style = PaintingStyle.fill;
    final chairPath = Path()
      ..moveTo(size.width * 0.2, size.height * 0.85)
      ..lineTo(size.width * 0.3, size.height * 0.85)
      ..lineTo(size.width * 0.28, size.height * 0.9)
      ..lineTo(size.width * 0.22, size.height * 0.9)
      ..close();
    canvas.drawPath(chairPath, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
