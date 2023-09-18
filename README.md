# Leave Management System

In house portal for applying leaves. Has provision of registering, login and logout. Provision of viewing leave history and leave statistics.

## Installation - Django app

Create a Virtual env:

```bash
py -m venv env
```

Activate the virtual env:

```bash
env\Scripts\activate
```

Install the necessary packages and frameworks:

```bash
pip install django djangorestframework django-cors-headers
```
Creating the django project:
```bash
django-admin startproject projectname
```
cd to the project folder:
```bash
cd projectname
```
After creating models, views, urls and necessary settings, migrate the db.

```bash
python manage.py makemigrations
python manage.py migrate
```

Now, start the app in localserver.
```bash
python manage.py runserver
```

## Installation- React APP

In the root folder of the project, create a react app

```bash
npx create-react-app appname
```
cd to the app folder

```bash
cd appname
```

Install the necessary packages

```bash
npm install
```
Start the app

```bash
npm start
```