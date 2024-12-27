from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Article
from django.db import models

# Index page view
def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'index.html')

# Login view
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            auth_login(request, user)
            messages.success(request, 'You are now logged in!')
            return redirect('index')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'login.html')

# Signup view
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return redirect('signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return redirect('signup')

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        messages.success(request, 'Account created successfully. You can now log in.')
        return redirect('login')

    return render(request, 'signup.html')

# Logout view (optional)
def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('index')

    # View to display all generated articles
def all_generated_articles(request):
    articles = Article.objects.all()
    return render(request, 'all_generated_articles.html', {'articles': articles})
