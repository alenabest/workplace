import os

from django.contrib.auth.models import AbstractUser
from django.db import models


def upload_path(self, filename):
    return os.path.join('media', 'workplace', 'avatars', str(self.id), filename)


class User(AbstractUser):
    """
    Пользователь системы
    """

    class Meta:
        verbose_name = '[User] Пользователь системы'
        verbose_name_plural = '[User] Пользователи системы'

    # Логин при входе
    # - username
    # Пароль для входа в систему
    # - password
    # Имя пользователя
    # - first_name
    # Фамилия пользователя
    # - last_name
    # Адрес электронной почты пользователя
    # - email

    # Отчество пользователя
    middle_name = models.TextField(null=True, blank=True, default='')
    # День рождения
    birthday = models.DateField(null=True)
    # Мобильный телефон
    mobile = models.TextField(null=True, blank=True, default='')
    # Рабочий телефон
    phone = models.TextField(null=True, blank=True, default='')
    # Путь к изображению для аватара пользователя
    avatar = models.ImageField(upload_to=upload_path, null=True, max_length=1024)


class Project(models.Model):
    """
    Проект
    """

    class Meta:
        verbose_name = '[Project] Проект'
        verbose_name_plural = '[Project] Проект'

    # наименование проекта
    name = models.TextField(null=False, blank=False)
    # пользователь
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


class Direction(models.Model):
    """
    Направление
    """

    class Meta:
        verbose_name = '[Direction] Направление'
        verbose_name_plural = '[Direction] Направление'

    # наименование направления
    name = models.TextField(null=False, blank=False)
    # проект
    project = models.ForeignKey(Project, null=True, on_delete=models.SET_NULL)
    # пользователь
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


class ActivityType(models.Model):
    """
    Вид активности
    """

    class Meta:
        verbose_name = '[ActivityType] Вид активности'
        verbose_name_plural = '[ActivityType] Вид активности'

    # наименование вида активности
    name = models.TextField(null=False, blank=False)
    # направление
    direction = models.ForeignKey(Direction, null=True, on_delete=models.SET_NULL)
    # пользователь
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


class Activity(models.Model):
    """
    Активность
    """

    class Meta:
        verbose_name = 'Активность'
        verbose_name_plural = 'Активность'

    # описание
    description = models.TextField(null=False, blank=False)
    # время начала
    start = models.TextField(null=False, blank=False)
    # время окончания
    end = models.TextField(null=False, blank=False)
    # высота для интерфейса
    height = models.TextField(null=False, blank=False)
    # час начала
    start_hour = models.IntegerField(null=False, name='startHour')
    # минуту начала
    start_minute = models.IntegerField(null=False, name='startMinute')
    # час окончания
    end_hour = models.IntegerField(null=False, name='endHour')
    # минута окончания
    end_minute = models.IntegerField(null=False, name='endMinute')
    # дата активности
    activity_date = models.DateField(null=False, name='activityDate')
    # проект
    project = models.ForeignKey(Project, null=True, on_delete=models.SET_NULL)
    # направление
    direction = models.ForeignKey(Direction, null=True, on_delete=models.SET_NULL)
    # вид активности
    type = models.ForeignKey(ActivityType, null=True, on_delete=models.SET_NULL)
    # пользователь
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)
