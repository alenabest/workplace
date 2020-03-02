import os

from django.contrib.auth.models import AbstractUser
from django.db import models
from model_utils import Choices


class Role(models.Model):
    """
    Роль пользователя
    """

    class Meta:
        verbose_name = '[Role] Роль'
        verbose_name_plural = '[Role] Роль'

    # Название роли
    name = models.TextField(null=False, primary_key=True)
    # Лэйбл
    label = models.TextField(null=False, blank=True, default='')


def upload_avatar_path(self, filename):
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
    avatar = models.ImageField(upload_to=upload_avatar_path, null=True, max_length=1024)
    # Роль пользователя
    role = models.ForeignKey(Role, null=True, on_delete=models.SET_NULL)
    # Роль пользователя
    online = models.BooleanField(null=True, default=False)


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
    height = models.TextField(null=True, blank=False)
    # длительность в минутах
    duration = models.IntegerField(null=True, blank=False)
    # час начала
    start_hour = models.IntegerField(null=True, name='startHour')
    # минуту начала
    start_minute = models.IntegerField(null=True, name='startMinute')
    # час окончания
    end_hour = models.IntegerField(null=True, name='endHour')
    # минута окончания
    end_minute = models.IntegerField(null=True, name='endMinute')
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


def upload_report_path(self, filename):
    return os.path.join('media', 'workplace', 'reports', str(self.id), filename)


class Report(models.Model):
    """
    Отчёты
    """

    class Meta:
        verbose_name = 'Отчёт'
        verbose_name_plural = 'Отчёт'

    CURRENT_MONTH = 0
    FINAL_CURRENT_MONTH = 1
    MONTH = 2
    FINAL_MONTH = 3

    TYPE_CHOICES = Choices(
        (CURRENT_MONTH, 'xls'),
        (FINAL_CURRENT_MONTH, 'doc'),
        (MONTH, 'xls'),
        (FINAL_MONTH, 'doc')
    )

    IN_PROCESS = 0
    COMPLETE = 1
    ERROR = 2

    STATE_CHOICES = Choices(
        (IN_PROCESS, 'В процессе'),
        (COMPLETE, 'Завершен'),
        (ERROR, 'Ошибка')
    )

    # вид отчёта
    type = models.IntegerField(choices=TYPE_CHOICES, null=True, blank=False)
    # состояние отчёта
    state = models.IntegerField(choices=STATE_CHOICES, default=IN_PROCESS, null=True, blank=False)
    # ссылка на отчёт
    link = models.FileField(upload_to=upload_report_path, null=True, max_length=1024)
    # пользователь
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    # дата формирования
    generated = models.DateField(null=True)

    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)
