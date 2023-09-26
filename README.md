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


cd to the project folder:
```bash
cd projectname
```

Install the necessary packages and frameworks:

```bash
pip install -r requirements.txt
```
Migrate the db.

```bash
python manage.py makemigrations
python manage.py migrate
```

Now, start the app in localserver.
```bash
python manage.py runserver
```

## Installation- React APP

cd to react app folder

```bash
cd appname
```

Install the necessary packages(all the necessary packages are installed from package.json file)

```bash
npm install
```
Start the app

```bash
npm start
```