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



## 4. Todos axios 요청

1. getTodos 메소드 정의

   ```javascript
// Home.vue  
getTodos() {
    axios.get('http://127.0.0.1:8000/api/v1/todos/')
      .then(response => {
        this.todos = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  ```
  
2. mounted 에서 호출

   ```javascript
   // Home.vue  
   mounted() {
       this.getTodos()
     }
   ```

3. CORS 오류 발생

   * `CORS Error` : 브라우저에 요청 보낼 때 반드시 같은 도메인으로만 보낼 수 있게 제약을 걸어둔 것. (예를 들어 로컬 8080인데 로컬 8000에 요청을 보내면 샌긴다.)

   * 해결하기 위해서는 django 서버에서 설정이 필요

4. `Django-cors-headers`

   * [Github 참고](https://github.com/adamchainz/django-cors-headers)

   ```bash
   $ pip install django-cors-headers
   ```

   * `INSTALLED_APPS`, `MIDDLEWARE` 설정
   * `CORS_ORIGIN_ALLOW_ALL` : True시 모든 도메인에서 요청 가능
   * `CORS_ORIGIN_WHITELIST`: 위의 옵션을 False로 하고, 화이트리스트에 직접 도메인 등록
   * 기타 옵션들도 확인해보자.

5. Vue에서 다시 요청 보내보기

## 5. TodoForm component를 통해 투두 등록하기

* request.POST에 데이터들이 들어있길 바라는데
* 보니까 request.data에 들어가있어 
* form data로 보낼 때에 들어가는게 request.POST인거고 그냥 데이터를 보내는건 request.data에 들어간다.
* 그런데 우리는 django 에서 request.POST로 데이터를 받고있으니
* vue쪽에서 js로 데이터를 `new FormData()`로써 바꿔줘야겠지





## 6. 로그인 기능

> JWT (JSON Web Token) : 토큰 기반 로그인 인증
>
> (지금까지는 세션을 통해서 로그인 관리를 했는데 이제부터는 토큰을 사용해서 로그인 확인을 하겠다. )
>
> 1. 클라이언트(Vue) 로그인 정보 (username, password)를 서버(Django)로 전송
> 2. 서버는 해당 정보를 바탕으로 Token을 발급 및 암호화
> 3. 클라이언트는 Token을 받아서 매 요청 때마다 헤더에 해당 Token정보를 추가해서 보냄
> 4. 서버에서는 매번 Token이 유효한지 확인
> 5. 클라이언트는 전송된 값을 디코딩하여 사용자 정보 활용
>
> JWT는 기본적으로 헤더, Payload(전송되는 데이터라고 생각하면 편함), Verify signature로 구성된다.

### 1) Django

* [참고문서](https://jpadilla.github.io/django-rest-framework-jwt/)

```bash
$ pip install djangorestframework-jwt
```

* urls.py랑 settings.py 에 추가설정 몇가지.
* `~/api-token-auth/` 에서 로그인을 하면 토큰나오는데
* [jwt.io](https://jwt.io/)에 토큰 값을 넣어보면 디코딩된 해당 정보가 나온다.
* 여기까지하면 토큰을 발급해줄 준비가 끝난것이고 
* 이제 뷰에서 form 만들어서 이쪽으로 요청보내서 토큰을 보내주는 작업을 해야겠지.



