# django rest api  -  vue

* `vue create todo-vue ` , `엔터`
* `mkdir todo-django`  폴더 만들고
* `cd todo-django/` 장고폴더에서 `venv` 설정 
* `pip install django`
* `pip install djangorestframework`   <- 주의해서 설치
* `django-admin startproject todo_django .`
* ` pip freeze > requirements.txt`
* 



# Vue - DRF (Django RestFramework)

## 1 . 기본 설정

1. Django

   1. 가상환경 설정

      ```bash
      $ python -V
      3.7.4
      $ python -m venv venv
      $ source venv/Scripts/activate
      (venv)
      ```
      
   2. 패키지 설치

      ```bash
      $ pip install django
      $ pip install djangorestframework
      ```
   
3. django 프로젝트 생성
   
   ```bash
      
      ```
   
      
   
2. Vue

   1. 설치

      ```bash
      $ npm install -g @vue/cli
      ```

   2. Vue 프로젝트 생성

      ```bash
      $ vue create {프로젝트 이름}
      ```

3. 프로젝트 폴더 구조

   ```
   todo-django-vue/
   	.git/
   	todo-django/
   		venv/
   		manage.py
   		todo_django/
   	todo-vue/
   		node_moduels/
   		public/
   		src/
   		package.json
   ```

   