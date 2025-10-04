import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../features/home/presentation/pages/home_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';
import '../../features/settings/presentation/pages/settings_page.dart';
import '../../features/settings/presentation/pages/icon_selector_page.dart';
import '../../features/designs/presentation/pages/design_gallery_page.dart';
import '../../features/designs/presentation/pages/design_detail_page.dart';
import '../widgets/responsive_layout.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/home',
    routes: [
      // Main app routes
      GoRoute(
        path: '/home',
        name: 'home',
        builder: (context, state) => ResponsiveLayout(
          currentRoute: '/home',
          child: const HomePage(),
        ),
      ),
      GoRoute(
        path: '/profile',
        name: 'profile',
        builder: (context, state) => ResponsiveLayout(
          currentRoute: '/profile',
          child: const ProfilePage(),
        ),
      ),
      GoRoute(
        path: '/settings',
        name: 'settings',
        builder: (context, state) => ResponsiveLayout(
          currentRoute: '/settings',
          child: const SettingsPage(),
        ),
      ),
      GoRoute(
        path: '/icon-selector',
        name: 'icon-selector',
        builder: (context, state) => const IconSelectorPage(),
      ),
      // Design gallery routes
      GoRoute(
        path: '/designs',
        name: 'designs',
        builder: (context, state) => ResponsiveLayout(
          currentRoute: '/designs',
          child: const DesignGalleryPage(),
        ),
      ),
      GoRoute(
        path: '/design/:id',
        name: 'design-detail',
        builder: (context, state) {
          final id = int.parse(state.pathParameters['id']!);
          return ResponsiveLayout(
            currentRoute: '/design/$id',
            child: DesignDetailPage(designIndex: id),
          );
        },
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text('Page not found: ${state.uri.toString()}'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go('/home'),
              child: const Text('Go Home'),
            ),
          ],
        ),
      ),
    ),
  );
}
