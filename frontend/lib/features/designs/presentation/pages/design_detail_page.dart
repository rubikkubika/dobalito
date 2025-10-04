import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DesignDetailPage extends StatelessWidget {
  final int designIndex;

  const DesignDetailPage({
    super.key,
    required this.designIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
            // Header
            Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => context.pop(),
                    iconSize: 20,
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _getDesignTitle(designIndex),
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: Colors.black87,
                          fontSize: 28,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _getDesignDescription(designIndex),
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: Colors.grey.shade600,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            
            // Design preview
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    // Hero image
                    Container(
                      width: double.infinity,
                      height: 240,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: _getGradientColors(designIndex),
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Center(
                        child: Icon(
                          _getDesignIcon(designIndex),
                          size: 80,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Design preview
                    _buildDesignPreview(designIndex),
                  ],
                ),
              ),
            ),
        ],
    );
  }

  Widget _buildDesignPreview(int index) {
    switch (index) {
      case 1:
        return _buildHomePagePreview();
      case 2:
        return _buildCreateTaskPreview();
      case 3:
        return _buildExecutorProfilePreview();
      case 4:
        return _buildTaskListPreview();
      case 5:
        return _buildRatingPreview();
      case 6:
        return _buildSettingsPreview();
      default:
        return const SizedBox();
    }
  }

  Widget _buildHomePagePreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Главная страница',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Поиск заданий', Icons.search, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Популярные категории', Icons.category, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('Рекомендуемые исполнители', Icons.star, Colors.orange),
          const SizedBox(height: 8),
          _buildMockElement('Последние задания', Icons.access_time, Colors.purple),
        ],
      ),
    );
  }

  Widget _buildCreateTaskPreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Создание задания',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Название задания', Icons.title, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Описание', Icons.description, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('Категория', Icons.category, Colors.orange),
          const SizedBox(height: 8),
          _buildMockElement('Бюджет', Icons.attach_money, Colors.red),
          const SizedBox(height: 8),
          _buildMockElement('Срок выполнения', Icons.schedule, Colors.purple),
        ],
      ),
    );
  }

  Widget _buildExecutorProfilePreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Профиль исполнителя',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Фото и имя', Icons.person, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Рейтинг и отзывы', Icons.star, Colors.orange),
          const SizedBox(height: 8),
          _buildMockElement('Специализации', Icons.work, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('Портфолио', Icons.photo_library, Colors.purple),
          const SizedBox(height: 8),
          _buildMockElement('Контактная информация', Icons.contact_phone, Colors.red),
        ],
      ),
    );
  }

  Widget _buildTaskListPreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Список заданий',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Фильтры по категориям', Icons.filter_list, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Сортировка', Icons.sort, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('Карточки заданий', Icons.card_travel, Colors.orange),
          const SizedBox(height: 8),
          _buildMockElement('Пагинация', Icons.pages, Colors.purple),
        ],
      ),
    );
  }

  Widget _buildRatingPreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Рейтинг исполнителей',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Топ исполнители', Icons.emoji_events, Colors.yellow),
          const SizedBox(height: 8),
          _buildMockElement('Статистика по категориям', Icons.bar_chart, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Отзывы и комментарии', Icons.comment, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('История выполненных заданий', Icons.history, Colors.purple),
        ],
      ),
    );
  }

  Widget _buildSettingsPreview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Настройки',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          _buildMockElement('Профиль пользователя', Icons.person, Colors.blue),
          const SizedBox(height: 8),
          _buildMockElement('Уведомления', Icons.notifications, Colors.orange),
          const SizedBox(height: 8),
          _buildMockElement('Безопасность', Icons.security, Colors.red),
          const SizedBox(height: 8),
          _buildMockElement('Язык и регион', Icons.language, Colors.green),
          const SizedBox(height: 8),
          _buildMockElement('О приложении', Icons.info, Colors.purple),
        ],
      ),
    );
  }

  Widget _buildMockElement(String title, IconData icon, Color color) {
    return Row(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            title,
            style: const TextStyle(fontSize: 14),
          ),
        ),
      ],
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
        return 'Обзорная страница с популярными заданиями и быстрым доступом к основным функциям';
      case 2:
        return 'Интуитивная форма для создания новых заданий с выбором категории и бюджета';
      case 3:
        return 'Подробная информация об исполнителе с портфолио и отзывами';
      case 4:
        return 'Удобный каталог всех доступных заданий с фильтрацией и поиском';
      case 5:
        return 'Система рейтингов и отзывов для оценки качества работы исполнителей';
      case 6:
        return 'Настройки приложения, профиля пользователя и уведомлений';
      default:
        return 'Описание дизайна $index';
    }
  }
}
