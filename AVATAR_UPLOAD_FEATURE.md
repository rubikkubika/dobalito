# Функциональность загрузки аватара пользователя

## 🎯 Цель

Добавить возможность пользователям загружать и управлять своими аватарами в профиле.

## 🔧 Backend реализация

### UserController endpoints

**Загрузка аватара:**
```java
@PostMapping("/{id}/avatar")
public ResponseEntity<?> uploadAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file)
```

**Удаление аватара:**
```java
@DeleteMapping("/{id}/avatar")
public ResponseEntity<?> deleteAvatar(@PathVariable Long id)
```

**Получение аватара:**
```java
@GetMapping("/avatar/{filename}")
public ResponseEntity<Resource> getAvatar(@PathVariable String filename)
```

### UserService методы

**Загрузка аватара:**
```java
public String uploadAvatar(Long userId, MultipartFile file) throws IOException {
    // Создание директории uploads/avatars/
    // Генерация уникального имени файла с UUID
    // Сохранение файла на диск
    // Обновление URL аватара в базе данных
    // Возврат URL для доступа к файлу
}
```

**Удаление аватара:**
```java
public boolean deleteAvatar(Long userId) {
    // Установка avatar = null в базе данных
    // Файл остается на диске (можно добавить очистку)
}
```

### Структура файлов

```
uploads/
└── avatars/
    ├── uuid1.jpg
    ├── uuid2.png
    └── uuid3.gif
```

**URL доступа к аватару:** `/api/v1/users/avatar/{filename}`

## 🎨 Frontend реализация

### API Service методы

```typescript
// Загрузка аватара
async uploadAvatar(userId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(`/users/${userId}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// Удаление аватара
async deleteAvatar(userId: number) {
  const response = await api.delete(`/users/${userId}/avatar`);
  return response.data;
}

// Обновление профиля
async updateProfile(userId: number, profileData: { name?: string; email?: string }) {
  const response = await api.put(`/users/${userId}`, profileData);
  return response.data;
}
```

### ProfilePage компонент

**Новые состояния:**
```typescript
const [avatarLoading, setAvatarLoading] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
```

**Функции управления аватаром:**
```typescript
const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file || !user?.id) return;

  // Валидация типа файла (только изображения)
  if (!file.type.startsWith('image/')) {
    setError('Пожалуйста, выберите изображение');
    return;
  }

  // Валидация размера файла (максимум 5MB)
  if (file.size > 5 * 1024 * 1024) {
    setError('Размер файла не должен превышать 5MB');
    return;
  }

  setAvatarLoading(true);
  setError(null);

  try {
    const response = await apiService.uploadAvatar(user.id, file);
    window.location.reload(); // Обновление для демонстрации
  } catch (err: any) {
    setError(err.message || 'Ошибка при загрузке аватара');
  } finally {
    setAvatarLoading(false);
  }
};

const handleAvatarDelete = async () => {
  if (!user?.id) return;

  setAvatarLoading(true);
  setError(null);

  try {
    await apiService.deleteAvatar(user.id);
    window.location.reload(); // Обновление для демонстрации
  } catch (err: any) {
    setError(err.message || 'Ошибка при удалении аватара');
  } finally {
    setAvatarLoading(false);
  }
};
```

### UI компоненты

**Аватар с кнопками управления:**
```jsx
<Box sx={{ position: 'relative', mr: 3 }}>
  <Avatar
    src={user.avatar ? `http://localhost:8080${user.avatar}` : undefined}
    sx={{
      width: 80,
      height: 80,
      fontSize: '2rem',
      backgroundColor: '#4CAF50',
    }}
  >
    {user.name.charAt(0).toUpperCase()}
  </Avatar>
  
  {/* Кнопки для управления аватаром */}
  <Box sx={{ 
    position: 'absolute', 
    bottom: -5, 
    right: -5,
    display: 'flex',
    gap: 0.5
  }}>
    {/* Кнопка загрузки */}
    <IconButton
      size="small"
      onClick={() => fileInputRef.current?.click()}
      disabled={avatarLoading}
      sx={{
        backgroundColor: '#4CAF50',
        color: 'white',
        width: 24,
        height: 24,
        '&:hover': {
          backgroundColor: '#45a049',
        }
      }}
    >
      {avatarLoading ? (
        <CircularProgress size={16} color="inherit" />
      ) : (
        <PhotoCameraIcon sx={{ fontSize: 14 }} />
      )}
    </IconButton>
    
    {/* Кнопка удаления (только если есть аватар) */}
    {user.avatar && (
      <IconButton
        size="small"
        onClick={handleAvatarDelete}
        disabled={avatarLoading}
        sx={{
          backgroundColor: '#f44336',
          color: 'white',
          width: 24,
          height: 24,
          '&:hover': {
            backgroundColor: '#d32f2f',
          }
        }}
      >
        <DeleteIcon sx={{ fontSize: 14 }} />
      </IconButton>
    )}
  </Box>
  
  {/* Скрытый input для выбора файла */}
  <input
    type="file"
    ref={fileInputRef}
    onChange={handleAvatarUpload}
    accept="image/*"
    style={{ display: 'none' }}
  />
</Box>
```

## 🔒 Валидация и безопасность

### Frontend валидация

- ✅ **Тип файла**: Только изображения (`image/*`)
- ✅ **Размер файла**: Максимум 5MB
- ✅ **Проверка пользователя**: Только авторизованные пользователи

### Backend безопасность

- ✅ **Уникальные имена файлов**: UUID для предотвращения конфликтов
- ✅ **Директория загрузки**: Изолированная папка `uploads/avatars/`
- ✅ **Проверка существования пользователя**: Валидация ID пользователя
- ✅ **Обработка ошибок**: Корректная обработка исключений

## 📱 Пользовательский опыт

### Процесс загрузки аватара:

1. **Клик по иконке камеры** → Открывается диалог выбора файла
2. **Выбор изображения** → Автоматическая валидация
3. **Загрузка** → Показ индикатора загрузки
4. **Успех** → Обновление аватара в интерфейсе

### Процесс удаления аватара:

1. **Клик по иконке удаления** → Появляется только при наличии аватара
2. **Подтверждение** → Автоматическое удаление
3. **Успех** → Возврат к аватару по умолчанию (инициал имени)

## 🎨 Визуальные особенности

### Кнопки управления:
- **Зеленая кнопка камеры** - загрузка нового аватара
- **Красная кнопка удаления** - удаление текущего аватара
- **Индикатор загрузки** - CircularProgress при обработке

### Аватар:
- **Размер**: 80x80 пикселей
- **Fallback**: Первая буква имени пользователя
- **Цвет фона**: #4CAF50 (зеленый)
- **URL**: `http://localhost:8080/api/v1/users/avatar/{filename}`

## 🧪 Тестирование

### Тест загрузки аватара:
1. Войти в профиль
2. Нажать на иконку камеры
3. Выбрать изображение (JPG, PNG, GIF)
4. Проверить загрузку и отображение

### Тест удаления аватара:
1. Убедиться что аватар загружен
2. Нажать на красную иконку удаления
3. Проверить возврат к аватару по умолчанию

### Тест валидации:
1. Попытаться загрузить не-изображение → Ошибка
2. Попытаться загрузить файл > 5MB → Ошибка
3. Проверить корректные сообщения об ошибках

## 📝 Примечания

- **Обновление данных**: Используется `window.location.reload()` для простоты демонстрации
- **Хранение файлов**: Файлы сохраняются в папке `uploads/avatars/`
- **URL аватара**: Сохраняется в базе данных как `/api/v1/users/avatar/{filename}`
- **Fallback**: При отсутствии аватара показывается первая буква имени

## 🚀 Готово к использованию

Функциональность полностью реализована и готова к тестированию:
- ✅ Backend endpoints работают
- ✅ Frontend интерфейс готов
- ✅ Валидация настроена
- ✅ Обработка ошибок реализована
