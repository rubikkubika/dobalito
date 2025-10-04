import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/providers/app_provider.dart';
import '../../../../core/utils/responsive_utils.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, appProvider, child) {
        return SingleChildScrollView(
          padding: EdgeInsets.all(ResponsiveUtils.getHorizontalPadding(context)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome section
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(ResponsiveUtils.getHorizontalPadding(context)),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'Добро пожаловать в Dobalito',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
                        fontSize: ResponsiveUtils.getTitleFontSize(context),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: ResponsiveUtils.isMobileLayout(context) 
                      ? ResponsiveUtils.getVerticalPadding(context) * 0.5 
                      : ResponsiveUtils.getVerticalPadding(context)),
                    Text(
                      'Приложение для создания заданий с исполнителями',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.grey.shade600,
                        fontSize: ResponsiveUtils.getBodyFontSize(context),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
              SizedBox(height: ResponsiveUtils.isMobileLayout(context) ? 8 : 24),

              // Features overview
              Center(
                child: Text(
                  'Возможности приложения',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: Colors.black87,
                    fontSize: ResponsiveUtils.isMobileLayout(context) 
                      ? ResponsiveUtils.getTitleFontSize(context) * 0.6  // Уменьшено для мобильных
                      : ResponsiveUtils.getTitleFontSize(context) * 0.8,
                  ),
                ),
              ),
              SizedBox(height: ResponsiveUtils.isMobileLayout(context) ? 8 : 20),
              
              // Features - mobile: vertical list, desktop: grid
              ResponsiveUtils.isMobileLayout(context) 
                ? Column(
                    children: [
                      _buildFeatureCard(
                        context,
                        'Создание заданий',
                        Icons.add_task,
                        'Создавайте задания и находите исполнителей',
                        Colors.blue,
                      ),
                      const SizedBox(height: 8),
                      _buildFeatureCard(
                        context,
                        'Поиск исполнителей',
                        Icons.search,
                        'Находите подходящих исполнителей по рейтингу',
                        Colors.green,
                      ),
                      const SizedBox(height: 8),
                      _buildFeatureCard(
                        context,
                        'Управление профилем',
                        Icons.person,
                        'Настраивайте свой профиль и портфолио',
                        Colors.orange,
                      ),
                      const SizedBox(height: 8),
                      _buildFeatureCard(
                        context,
                        'Система рейтингов',
                        Icons.star,
                        'Оценивайте качество работы исполнителей',
                        Colors.purple,
                      ),
                      const SizedBox(height: 8),
                      _buildFeatureCard(
                        context,
                        'Безопасные платежи',
                        Icons.payment,
                        'Безопасная система оплаты заданий',
                        Colors.red,
                      ),
                      const SizedBox(height: 8),
                      _buildFeatureCard(
                        context,
                        'Мобильные приложения',
                        Icons.phone_android,
                        'Доступно на Android, iOS и Web',
                        Colors.teal,
                      ),
                    ],
                  )
                : GridView.count(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: 2,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                    childAspectRatio: 1.2,
                    children: [
                      _buildFeatureCard(
                        context,
                        'Создание заданий',
                        Icons.add_task,
                        'Создавайте задания и находите исполнителей',
                        Colors.blue,
                      ),
                      _buildFeatureCard(
                        context,
                        'Поиск исполнителей',
                        Icons.search,
                        'Находите подходящих исполнителей по рейтингу',
                        Colors.green,
                      ),
                      _buildFeatureCard(
                        context,
                        'Управление профилем',
                        Icons.person,
                        'Настраивайте свой профиль и портфолио',
                        Colors.orange,
                      ),
                      _buildFeatureCard(
                        context,
                        'Система рейтингов',
                        Icons.star,
                        'Оценивайте качество работы исполнителей',
                        Colors.purple,
                      ),
                      _buildFeatureCard(
                        context,
                        'Безопасные платежи',
                        Icons.payment,
                        'Безопасная система оплаты заданий',
                        Colors.red,
                      ),
                      _buildFeatureCard(
                        context,
                        'Мобильные приложения',
                        Icons.phone_android,
                        'Доступно на Android, iOS и Web',
                        Colors.teal,
                      ),
                    ],
                  ),
              
              // Bottom spacing
              SizedBox(height: ResponsiveUtils.isMobileLayout(context) ? 8 : 20),
            ],
          ),
        );
      },
    );
  }

  Widget _buildFeatureCard(
    BuildContext context,
    String title,
    IconData icon,
    String description,
    Color color,
  ) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(ResponsiveUtils.getHorizontalPadding(context)),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.shade100,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ResponsiveUtils.isMobileLayout(context) 
        ? Row(
            children: [
              // Icon
              Container(
                width: ResponsiveUtils.getIconSize(context) * 2.0, // Уменьшено с 2.5
                height: ResponsiveUtils.getIconSize(context) * 2.0, // Уменьшено с 2.5
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  icon,
                  size: ResponsiveUtils.getIconSize(context) * 1.0, // Уменьшено с 1.2
                  color: color,
                ),
              ),
              SizedBox(width: ResponsiveUtils.getHorizontalPadding(context) * 0.5), // Уменьшено
              
              // Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
                        fontSize: ResponsiveUtils.getBodyFontSize(context) * 1.2,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      description,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.grey.shade600,
                        fontSize: ResponsiveUtils.getBodyFontSize(context) * 0.9,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          )
        : Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Icon
              Container(
                width: ResponsiveUtils.getIconSize(context) * 3,
                height: ResponsiveUtils.getIconSize(context) * 3,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  icon,
                  size: ResponsiveUtils.getIconSize(context) * 1.5,
                  color: color,
                ),
              ),
              SizedBox(height: ResponsiveUtils.getVerticalPadding(context)),
              
              // Content
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: Colors.black87,
                  fontSize: ResponsiveUtils.getBodyFontSize(context) * 1.2,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                description,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey.shade600,
                  fontSize: ResponsiveUtils.getBodyFontSize(context) * 0.9,
                  height: 1.4,
                ),
              ),
            ],
          ),
    );
  }

  void _showHelpDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Help & Support'),
        content: const Text(
          'This is a multi-platform Flutter application with Spring Boot backend.\n\n'
          'Features:\n'
          '• Cross-platform support (Android, iOS, Web)\n'
          '• Modern UI with Material Design 3\n'
          '• RESTful API integration\n'
          '• Docker containerization',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showAboutDialog(BuildContext context) {
    showAboutDialog(
      context: context,
      applicationName: 'Dobalito',
      applicationVersion: '1.0.0',
      applicationIcon: const Icon(Icons.apps, size: 48),
      children: [
        const Text('A Flutter application for Android, iOS, and Web platforms.'),
        const SizedBox(height: 16),
        const Text('Built with Flutter, Spring Boot, and PostgreSQL.'),
      ],
    );
  }
}
