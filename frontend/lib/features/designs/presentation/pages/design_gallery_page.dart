import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DesignGalleryPage extends StatelessWidget {
  const DesignGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
            Center(
              child: Column(
                children: [
                  Text(
                    'Макеты дизайнов',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: Colors.black87,
                      fontSize: 32,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Просмотрите макеты всех страниц приложения для заданий с исполнителями',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Colors.grey.shade600,
                      fontSize: 18,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                  crossAxisSpacing: 24,
                  mainAxisSpacing: 24,
                  childAspectRatio: 0.8,
                ),
                itemCount: 6,
                itemBuilder: (context, index) {
                  return DesignCard(
                    designIndex: index + 1,
                    onTap: () => context.push('/design/${index + 1}'),
                  );
                },
              ),
            ),
        ],
    );
  }
}

class DesignCard extends StatelessWidget {
  final int designIndex;
  final VoidCallback onTap;

  const DesignCard({
    super.key,
    required this.designIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(12),
                  ),
                  gradient: LinearGradient(
                    colors: _getGradientColors(designIndex),
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Center(
                  child: Icon(
                    _getDesignIcon(designIndex),
                    size: 48,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _getDesignTitle(designIndex),
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _getDesignDescription(designIndex),
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Color> _getGradientColors(int index) {
    switch (index) {
      case 1:
        return [Colors.blue, Colors.blueAccent];
      case 2:
        return [Colors.green, Colors.greenAccent];
      case 3:
        return [Colors.orange, Colors.orangeAccent];
      case 4:
        return [Colors.purple, Colors.purpleAccent];
      case 5:
        return [Colors.red, Colors.redAccent];
      case 6:
        return [Colors.teal, Colors.tealAccent];
      default:
        return [Colors.grey, Colors.grey.shade400];
    }
  }

  IconData _getDesignIcon(int index) {
    switch (index) {
      case 1:
        return Icons.home;
      case 2:
        return Icons.work;
      case 3:
        return Icons.person;
      case 4:
        return Icons.task;
      case 5:
        return Icons.star;
      case 6:
        return Icons.settings;
      default:
        return Icons.design_services;
    }
  }

  String _getDesignTitle(int index) {
    switch (index) {
      case 1:
        return 'Главная страница';
      case 2:
        return 'Создание задания';
      case 3:
        return 'Профиль исполнителя';
      case 4:
        return 'Список заданий';
      case 5:
        return 'Рейтинг исполнителей';
      case 6:
        return 'Настройки';
      default:
        return 'Дизайн $index';
    }
  }

  String _getDesignDescription(int index) {
    switch (index) {
      case 1:
        return 'Обзорная страница с популярными заданиями';
      case 2:
        return 'Форма создания нового задания';
      case 3:
        return 'Детальная информация об исполнителе';
      case 4:
        return 'Каталог всех доступных заданий';
      case 5:
        return 'Топ исполнителей по рейтингу';
      case 6:
        return 'Настройки приложения и профиля';
      default:
        return 'Описание дизайна $index';
    }
  }
}
