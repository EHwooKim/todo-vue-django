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


## 2. DRF 모델링

장고는 기본적으로 헀떤거 serializers까지 다하고 



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