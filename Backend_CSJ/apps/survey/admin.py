from django.contrib import admin
from apps.survey.models import Pull, PullQuestion, PullAnswer, PullAnswerQuestionResponse


class PullQuestionAdmin(admin.TabularInline):
    model = PullQuestion


@admin.register(Pull)
class PullAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')
    search_fields = ('code', 'name')
    ordering = ('code', 'name')
    autocomplete_fields = ['created_by']
    inlines = [PullQuestionAdmin]


class PullAnswerQuestionAdmin(admin.TabularInline):
    model = PullAnswerQuestionResponse


@admin.register(PullAnswer)
class PullAnswerAdmin(admin.ModelAdmin):
    list_display = ('pull', 'observations')
    search_fields = ('pull', )
    ordering = ('pull',)
    autocomplete_fields = ['pull']
    inlines = [PullAnswerQuestionAdmin]