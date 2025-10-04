import 'dart:math';
import 'package:flutter/material.dart';

// Базовый класс для всех иконок
abstract class IconVariant extends CustomPainter {
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

// Иконка 1: Текущая (остров + серфдоска + наклоненная пальма)
class IconVariant1 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 1.5;

    // Остров (песок)
    paint.color = Colors.amber.shade300;
    final islandPath = Path()
      ..moveTo(size.width * 0.1, size.height * 0.8)
      ..quadraticBezierTo(size.width * 0.2, size.height * 0.7, size.width * 0.4, size.height * 0.75)
      ..quadraticBezierTo(size.width * 0.6, size.height * 0.8, size.width * 0.8, size.height * 0.75)
      ..quadraticBezierTo(size.width * 0.9, size.height * 0.85, size.width * 0.85, size.height * 0.95)
      ..lineTo(size.width * 0.1, size.height * 0.95)
      ..close();
    canvas.drawPath(islandPath, paint);

    // Серфдоска (левая часть острова)
    paint.color = Colors.orange.shade400;
    final surfboardPath = Path()
      ..moveTo(size.width * 0.25, size.height * 0.85)
      ..quadraticBezierTo(size.width * 0.2, size.height * 0.8, size.width * 0.25, size.height * 0.75)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.8, size.width * 0.25, size.height * 0.85);
    canvas.drawPath(surfboardPath, paint);

    // Наклоненная пальма (правая часть острова)
    paint.color = Colors.brown.shade600;
    final trunkPath = Path()
      ..moveTo(size.width * 0.7, size.height * 0.8)
      ..quadraticBezierTo(size.width * 0.75, size.height * 0.4, size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(size.width * 0.85, size.height * 0.4, size.width * 0.9, size.height * 0.8)
      ..close();
    canvas.drawPath(trunkPath, paint);

    // Листья наклоненной пальмы
    paint.color = Colors.green.shade600;
    final leaf1Path = Path()
      ..moveTo(size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(size.width * 0.6, size.height * 0.05, size.width * 0.5, size.height * 0.1)
      ..quadraticBezierTo(size.width * 0.65, size.height * 0.15, size.width * 0.8, size.height * 0.2);
    canvas.drawPath(leaf1Path, paint);

    final leaf2Path = Path()
      ..moveTo(size.width * 0.8, size.height * 0.2)
      ..quadraticBezierTo(size.width * 0.95, size.height * 0.05, size.width * 1.0, size.height * 0.1)
      ..quadraticBezierTo(size.width * 0.9, size.height * 0.15, size.width * 0.8, size.height * 0.2);
    canvas.drawPath(leaf2Path, paint);

    // Волны
    paint.color = Colors.blue.shade300;
    paint.strokeWidth = 2;
    paint.style = PaintingStyle.stroke;
    final wavePath = Path()
      ..moveTo(size.width * 0.0, size.height * 0.9)
      ..quadraticBezierTo(size.width * 0.2, size.height * 0.85, size.width * 0.4, size.height * 0.9)
      ..quadraticBezierTo(size.width * 0.6, size.height * 0.95, size.width * 0.8, size.height * 0.9)
      ..quadraticBezierTo(size.width * 1.0, size.height * 0.85, size.width * 1.0, size.height * 0.9);
    canvas.drawPath(wavePath, paint);
  }
}

// Иконка 2: Простая пальма
class IconVariant2 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 2;

    // Ствол пальмы
    paint.color = Colors.brown.shade600;
    final trunkPath = Path()
      ..moveTo(size.width * 0.45, size.height * 0.8)
      ..quadraticBezierTo(size.width * 0.48, size.height * 0.3, size.width * 0.52, size.height * 0.1)
      ..quadraticBezierTo(size.width * 0.55, size.height * 0.3, size.width * 0.58, size.height * 0.8)
      ..close();
    canvas.drawPath(trunkPath, paint);

    // Листья пальмы
    paint.color = Colors.green.shade600;
    for (int i = 0; i < 6; i++) {
      final angle = i * (pi / 3); // 60 градусов
      final leafPath = Path()
        ..moveTo(size.width * 0.52, size.height * 0.1)
        ..quadraticBezierTo(
          size.width * 0.52 + 0.3 * cos(angle),
          size.height * 0.1 + 0.3 * sin(angle),
          size.width * 0.52 + 0.4 * cos(angle),
          size.height * 0.1 + 0.4 * sin(angle),
        );
      canvas.drawPath(leafPath, paint);
    }
  }
}

// Иконка 3: Серфдоска с волнами
class IconVariant3 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 2;

    // Серфдоска
    paint.color = Colors.orange.shade400;
    final surfboardPath = Path()
      ..moveTo(size.width * 0.2, size.height * 0.5)
      ..quadraticBezierTo(size.width * 0.1, size.height * 0.3, size.width * 0.2, size.height * 0.1)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.3, size.width * 0.2, size.height * 0.5);
    canvas.drawPath(surfboardPath, paint);

    // Волны
    paint.color = Colors.blue.shade300;
    paint.strokeWidth = 3;
    paint.style = PaintingStyle.stroke;
    for (int i = 0; i < 3; i++) {
      final wavePath = Path()
        ..moveTo(size.width * 0.0, size.height * 0.6 + i * 0.15)
        ..quadraticBezierTo(
          size.width * 0.3, size.height * 0.5 + i * 0.15,
          size.width * 0.6, size.height * 0.6 + i * 0.15,
        )
        ..quadraticBezierTo(
          size.width * 0.9, size.height * 0.7 + i * 0.15,
          size.width * 1.0, size.height * 0.6 + i * 0.15,
        );
      canvas.drawPath(wavePath, paint);
    }
  }
}

// Иконка 4: Байк
class IconVariant4 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4;

    // Рама байка
    paint.color = Colors.red.shade500;
    canvas.drawLine(Offset(size.width * 0.2, size.height * 0.7), Offset(size.width * 0.5, size.height * 0.4), paint);
    canvas.drawLine(Offset(size.width * 0.5, size.height * 0.4), Offset(size.width * 0.8, size.height * 0.7), paint);
    canvas.drawLine(Offset(size.width * 0.2, size.height * 0.7), Offset(size.width * 0.8, size.height * 0.7), paint);

    // Колеса
    paint.style = PaintingStyle.fill;
    canvas.drawCircle(Offset(size.width * 0.2, size.height * 0.7), 8, paint);
    canvas.drawCircle(Offset(size.width * 0.8, size.height * 0.7), 8, paint);

    // Руль
    paint.color = Colors.grey.shade600;
    paint.strokeWidth = 3;
    paint.style = PaintingStyle.stroke;
    canvas.drawLine(Offset(size.width * 0.5, size.height * 0.4), Offset(size.width * 0.6, size.height * 0.3), paint);
  }
}

// Иконка 5: Солнце над океаном
class IconVariant5 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Солнце
    paint.color = Colors.yellow.shade400;
    canvas.drawCircle(Offset(size.width * 0.5, size.height * 0.3), 15, paint);

    // Лучи солнца
    paint.strokeWidth = 3;
    paint.style = PaintingStyle.stroke;
    for (int i = 0; i < 8; i++) {
      final angle = i * (pi / 4);
      final startX = size.width * 0.5 + 20 * cos(angle);
      final startY = size.height * 0.3 + 20 * sin(angle);
      final endX = size.width * 0.5 + 30 * cos(angle);
      final endY = size.height * 0.3 + 30 * sin(angle);
      canvas.drawLine(Offset(startX, startY), Offset(endX, endY), paint);
    }

    // Океан
    paint.color = Colors.blue.shade300;
    paint.strokeWidth = 4;
    final oceanPath = Path()
      ..moveTo(size.width * 0.0, size.height * 0.7)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.6, size.width * 0.6, size.height * 0.7)
      ..quadraticBezierTo(size.width * 0.9, size.height * 0.8, size.width * 1.0, size.height * 0.7);
    canvas.drawPath(oceanPath, paint);
  }
}

// Иконка 6: Гора с пальмой
class IconVariant6 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Гора
    paint.color = Colors.grey.shade400;
    final mountainPath = Path()
      ..moveTo(size.width * 0.0, size.height * 0.8)
      ..lineTo(size.width * 0.3, size.height * 0.3)
      ..lineTo(size.width * 0.6, size.height * 0.5)
      ..lineTo(size.width * 1.0, size.height * 0.8)
      ..close();
    canvas.drawPath(mountainPath, paint);

    // Пальма на горе
    paint.color = Colors.brown.shade600;
    final trunkPath = Path()
      ..moveTo(size.width * 0.4, size.height * 0.8)
      ..quadraticBezierTo(size.width * 0.42, size.height * 0.5, size.width * 0.44, size.height * 0.3)
      ..quadraticBezierTo(size.width * 0.46, size.height * 0.5, size.width * 0.48, size.height * 0.8)
      ..close();
    canvas.drawPath(trunkPath, paint);

    // Листья пальмы
    paint.color = Colors.green.shade600;
    final leafPath = Path()
      ..moveTo(size.width * 0.44, size.height * 0.3)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.1, size.width * 0.2, size.height * 0.2)
      ..quadraticBezierTo(size.width * 0.35, size.height * 0.25, size.width * 0.44, size.height * 0.3);
    canvas.drawPath(leafPath, paint);
  }
}

// Иконка 7: Кокос
class IconVariant7 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Кокос
    paint.color = Colors.brown.shade400;
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.5, size.height * 0.6), width: 20, height: 25), paint);

    // Листья кокоса
    paint.color = Colors.green.shade600;
    final leafPath = Path()
      ..moveTo(size.width * 0.5, size.height * 0.6)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.2, size.width * 0.2, size.height * 0.3)
      ..quadraticBezierTo(size.width * 0.35, size.height * 0.4, size.width * 0.5, size.height * 0.6);
    canvas.drawPath(leafPath, paint);

    final leaf2Path = Path()
      ..moveTo(size.width * 0.5, size.height * 0.6)
      ..quadraticBezierTo(size.width * 0.7, size.height * 0.2, size.width * 0.8, size.height * 0.3)
      ..quadraticBezierTo(size.width * 0.65, size.height * 0.4, size.width * 0.5, size.height * 0.6);
    canvas.drawPath(leaf2Path, paint);
  }
}

// Иконка 8: Черепаха
class IconVariant8 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Панцирь черепахи
    paint.color = Colors.green.shade500;
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.5, size.height * 0.5), width: 40, height: 30), paint);

    // Голова черепахи
    paint.color = Colors.green.shade600;
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.5, size.height * 0.3), width: 12, height: 8), paint);

    // Лапы
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.3, size.height * 0.5), width: 8, height: 12), paint);
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.7, size.height * 0.5), width: 8, height: 12), paint);
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.3, size.height * 0.7), width: 8, height: 12), paint);
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.7, size.height * 0.7), width: 8, height: 12), paint);

    // Хвост
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.5, size.height * 0.8), width: 6, height: 8), paint);
  }
}

// Иконка 9: Рыба
class IconVariant9 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Тело рыбы
    paint.color = Colors.blue.shade400;
    final fishPath = Path()
      ..moveTo(size.width * 0.2, size.height * 0.5)
      ..quadraticBezierTo(size.width * 0.1, size.height * 0.3, size.width * 0.2, size.height * 0.1)
      ..quadraticBezierTo(size.width * 0.8, size.height * 0.2, size.width * 0.9, size.height * 0.5)
      ..quadraticBezierTo(size.width * 0.8, size.height * 0.8, size.width * 0.2, size.height * 0.9)
      ..quadraticBezierTo(size.width * 0.1, size.height * 0.7, size.width * 0.2, size.height * 0.5);
    canvas.drawPath(fishPath, paint);

    // Глаз рыбы
    paint.color = Colors.white;
    canvas.drawCircle(Offset(size.width * 0.3, size.height * 0.4), 3, paint);
    paint.color = Colors.black;
    canvas.drawCircle(Offset(size.width * 0.3, size.height * 0.4), 1.5, paint);

    // Плавники
    paint.color = Colors.blue.shade500;
    final finPath = Path()
      ..moveTo(size.width * 0.2, size.height * 0.5)
      ..quadraticBezierTo(size.width * 0.1, size.height * 0.4, size.width * 0.1, size.height * 0.6)
      ..quadraticBezierTo(size.width * 0.15, size.height * 0.5, size.width * 0.2, size.height * 0.5);
    canvas.drawPath(finPath, paint);
  }
}

// Иконка 10: Звезда
class IconVariant10 extends IconVariant {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill;

    // Звезда
    paint.color = Colors.yellow.shade400;
    final starPath = Path();
    final centerX = size.width * 0.5;
    final centerY = size.height * 0.5;
    final outerRadius = 20.0;
    final innerRadius = 8.0;

    for (int i = 0; i < 10; i++) {
      final angle = i * pi / 5;
      final radius = i.isEven ? outerRadius : innerRadius;
      final x = centerX + radius * cos(angle - pi / 2);
      final y = centerY + radius * sin(angle - pi / 2);
      
      if (i == 0) {
        starPath.moveTo(x, y);
      } else {
        starPath.lineTo(x, y);
      }
    }
    starPath.close();
    canvas.drawPath(starPath, paint);
  }
}

// Класс для получения иконки по номеру
class IconVariantFactory {
  static IconVariant getIcon(int variantNumber) {
    switch (variantNumber) {
      case 1: return IconVariant1();
      case 2: return IconVariant2();
      case 3: return IconVariant3();
      case 4: return IconVariant4();
      case 5: return IconVariant5();
      case 6: return IconVariant6();
      case 7: return IconVariant7();
      case 8: return IconVariant8();
      case 9: return IconVariant9();
      case 10: return IconVariant10();
      default: return IconVariant1();
    }
  }

  static String getDescription(int variantNumber) {
    switch (variantNumber) {
      case 1: return 'Остров + серфдоска + наклоненная пальма';
      case 2: return 'Простая пальма';
      case 3: return 'Серфдоска с волнами';
      case 4: return 'Байк';
      case 5: return 'Солнце над океаном';
      case 6: return 'Гора с пальмой';
      case 7: return 'Кокос';
      case 8: return 'Черепаха';
      case 9: return 'Рыба';
      case 10: return 'Звезда';
      default: return 'Остров + серфдоска + наклоненная пальма';
    }
  }
}
