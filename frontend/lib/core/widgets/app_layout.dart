import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'app_sidebar.dart';

class AppLayout extends StatelessWidget {
  final Widget child;
  final String currentRoute;

  const AppLayout({
    super.key,
    required this.child,
    required this.currentRoute,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // Sidebar
          AppSidebar(currentRoute: currentRoute),
          
          // Main content
          Expanded(
            child: Column(
              children: [
                // Top bar
                Container(
                  height: 72,
                  padding: const EdgeInsets.symmetric(horizontal: 32),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.grey.shade200,
                        width: 1,
                      ),
                    ),
                  ),
                  child: Row(
                    children: [
                      // Breadcrumb
                      Expanded(
                        child: _buildBreadcrumb(context),
                      ),
                      
                      // Actions
                      Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: Colors.grey.shade100,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: IconButton(
                              icon: Icon(
                                Icons.notifications_outlined,
                                size: 20,
                                color: Colors.grey.shade600,
                              ),
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('Уведомления')),
                                );
                              },
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: Colors.grey.shade100,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: IconButton(
                              icon: Icon(
                                Icons.help_outline,
                                size: 20,
                                color: Colors.grey.shade600,
                              ),
                              onPressed: () => _showHelpDialog(context),
                            ),
                          ),
                          const SizedBox(width: 12),
                          _buildUserMenu(context),
                        ],
                      ),
                    ],
                  ),
                ),
                
                // Content
                Expanded(
                  child: Container(
                    color: Colors.grey.shade50,
                    child: child,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBreadcrumb(BuildContext context) {
    final breadcrumbs = _getBreadcrumbs(currentRoute);
    
    return Row(
      children: [
        for (int i = 0; i < breadcrumbs.length; i++) ...[
          if (i > 0) ...[
            Icon(
              Icons.chevron_right,
              size: 16,
              color: Colors.grey.shade400,
            ),
            const SizedBox(width: 12),
          ],
          Text(
            breadcrumbs[i],
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: i == breadcrumbs.length - 1
                ? Colors.black87
                : Colors.grey.shade600,
              fontWeight: i == breadcrumbs.length - 1
                ? FontWeight.w600
                : FontWeight.w500,
              fontSize: 16,
            ),
          ),
        ],
      ],
    );
  }

  List<String> _getBreadcrumbs(String route) {
    switch (route) {
      case '/home':
        return ['Главная'];
      case '/profile':
        return ['Профиль'];
      case '/designs':
        return ['Design Gallery'];
      case '/settings':
        return ['Настройки'];
      case '/design/1':
        return ['Design Gallery', 'Главная страница'];
      case '/design/2':
        return ['Design Gallery', 'Создание задания'];
      case '/design/3':
        return ['Design Gallery', 'Профиль исполнителя'];
      case '/design/4':
        return ['Design Gallery', 'Список заданий'];
      case '/design/5':
        return ['Design Gallery', 'Рейтинг исполнителей'];
      case '/design/6':
        return ['Design Gallery', 'Настройки'];
      default:
        return ['Главная'];
    }
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
              Icon(Icons.logout, size: 20, color: Colors.red.shade600),
              const SizedBox(width: 12),
              Text('Выйти', style: TextStyle(color: Colors.red.shade600)),
            ],
          ),
        ),
      ],
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: Colors.red.shade500,
          borderRadius: BorderRadius.circular(20),
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
