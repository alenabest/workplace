# Generated by Django 3.0.3 on 2020-03-02 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workplace', '0006_report'),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('name', models.TextField(primary_key=True, serialize=False)),
                ('label', models.TextField(blank=True, default='')),
            ],
            options={
                'verbose_name': '[Role] Роль',
                'verbose_name_plural': '[Role] Роль',
            },
        ),
    ]
