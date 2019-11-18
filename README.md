# Vue - DRF (Django RestFramework)

* `vue create todo-vue ` , `엔터`
* `mkdir todo-django`  폴더 만들고
* `cd todo-django/` 장고폴더에서 `venv` 설정 
* `pip install django`
* `pip install djangorestframework`   <- 주의해서 설치
* `django-admin startproject todo_django .`
* ` pip freeze > requirements.txt`/

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
      $ django-admin startproject {프로젝트명} .
      ```
   
2. Vue

   1. VueCLI설치

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


## 2. DRF 모델링

1. 기본설정

   app 설치, settings.py 추가, url 설정, Model 설정 

2. serializers

   ```python
   from rest_framework import serializers
   from .models import Todo
   
   class TodoSerializers(serializers.ModelSerializer):
       class Meta:
           model = Todo
           fields = ('id', 'title', 'user', 'is_completed')
   ```

3. views.py

   ```python
   from django.shortcuts import render
   from rest_framework.response import Response
   from rest_framework.decorators import api_view
   from .models import Todo
   from .serializers import TodoSerializers
   
   @api_view(['GET'])
   def todo_index_create(request):
       todos = Todo.objects.all()
       serializers = TodoSerializers(todos, many = True)
       return Response(serializers.data)
   ```



## 3. Vue

### Vue-router

```bash
$ npm i vue-router   
```

> install 대신 i라고만 해도 설치

```bash
$ vue add router
>There are uncommited changes in the current repository, it's recommended to commit or stash them first. Yes
이거는 커밋안했는데 괜찮냐고
>Use history mode for router? (Requires proper server setup for index fallback in production) Yes
이건 히스토리 모드랑 관련된 것
```

* 싱글페이지에서 컴포넌트에 경로를 연결해주는 역할을 하는게 router
* components 폴더만 있었는데 views 폴더가 생겼는데
  * Home.vue, About.vue에서 사용할 컴포넌트들을 components폴더에 만들어 나간다..(?)
* 템플릿 안에는 절대 같은 계층으로 두개를 쓸 수 없다. (div 연달아 두개)

* `npm i axios`

* 초기 ESLint 는 package.json rules 에서  `"no-console": "off" ` 추가

* `CORS Error` : 브라우저에 요청 보낼 때 반드시 같은 도메인으로만 보낼 수 있게 제약을 걸어둔 것. (예를 들어 로컬 8080인데 로컬 8000에 요청을 보내면 샌긴다.)

  * 그런데 `서버`가 CORS정책 허용을 해주면 해결가능. 

  * `django cors` 검색하여 [github](https://github.com/adamchainz/django-cors-headers)보고 설정하자

    ```bash
     $ pip install django-cors-headers
    ```

    