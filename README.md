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



* 토큰 값 받아오는 것까지는 오케이.

### 2) Vue

1. 로그인 관련 컴포넌트 생성

2. 이벤트를 통해 axios 요청

3. token 값 저장

   1. `vue-session`

      ```bash
      $ npm i vue-session
      ```

   2. `src/main.js`

      ```javascript
      import VueSession from 'vue-session'
      Vue.use(VueSession)
      ```

   3. `Vue-session` 활용하여 저장

      ```javascript
      this.$session.start()
      this.$session.set('jwt',token)
      ```

* 로그인을 한번하면 vue가 그 정보를 기억해야하는데 data에 저장하면 사라져버리니
* 뷰는 클라이언트라 저장을 못해서  브라우저 session storage에 저장을 하는거야(?)
* 로그인 되어있는동안 기억하도록 하는게 vue-session
* `router` 는 알아서 여기저기 코드를 넣어주지만 `vue-session`은 `main.js`에 추가 해야한다.
* Application ->Session-storage에 들어가면 정보가 있다.



### 3) 활용

1. 요청시마다 아래의 `options`를 포함하여 전송

   ```javascript
   this.$session.start()
   const token = this.$session.get('jwt')
   const options = {
     headers: {
       Authorization: `JWT ${token}`
     }
   }      
   ```

### 4) 사용자 정보 활용

> 사용자는 정보를 활용하고 싶다면, token을 디코딩하여 활용한다.

1. 패키지 설치

   ```bash
   $ npm i jwt-decode
   ```

2. 활용

   ```javascript
   import jwtDecode from 'jwt-decode'
   this.$session.start()
   const token = this.$session.get('jwt')
   console.log(jwtDecode(token))
   // {user_id: 1, username: "admin", exp: exp: 1574138480, email: ""}
   ```

## 7. User별 Todo

### 1) Django

### 2) Vue

* 지금까지 user 에 임의로 1 써넣고 했는데 이제 jwt에 있는 로그인 정보를 디코딩하여 활용해보자!

```bash
$ npm i jwt-decode
```



## 8. 비로그인시 로그인 페이지로 이동





## 9. Delete, Update

>GET - 데이터를 가지고 오는 것. : data 필요 X
>
>POST - 등록 / 저장 : data O
>
>PUT - 수정 :  data O
>
>DELETE - 삭제 : data X, 리소스(url) 식별



## 10. Vuex

* Vuex는 Vue에서 활용하는 상태 관리 패턴이다.

> 지금 모든 method 마다 token을 불러오는 작업을 하는데 그런 중복된 코드를 한번에 관리하고싶다. 또는 컴포넌트가 많아질수록 props와 emit을 통해 데이터를 주고받는게 너무 복잡해진다 

1. 그것을 해결해주던 것이 `event bus`
   * bus라는 또 다른 Vue객체를 만들고 그것에 이벤트를 발생시켜 bus만 관리하자. 그런데 위아래로 흐르던 데이터 흐름이 꼬이게 되겠지
2. 더 좋은 방법이 `Flux구조 & Vuex` 
   * facebook에서 만든 `구조` 이고 이 구조를 vue에서 쓰기 위해 있는 것이 `Vuex`

### 핵심 개념

1. `state`: 상태, Vue 컴포넌트 상에서 `data`
   * 직접 변경이 불가능하고, 항상 `mutation`을 통해 변경한다.
   * `state`가 변경되면 view(화면)가 업데이트 된다.
2. `mutation`: `state`를 변경하기 위한 `methods`
   * `mutation` 함수는 첫번째 인자로 항상 `state`를 받는다.
   * `mutation` 함수는 항상 `commit`을 통해 호출된다.
   * 동기적인 처리만! 가능하다.
3. `action`: 비동기 처리를 하는 `methods`, `mutation`도 호출 가능하다. (`state` 변화를 `mutation` `commit`을 통해 가능하다.)
   * `action` 함수는 첫번째 인자로 항상 `context`를 받는다.
     * `state`, `commit`, `dispatch`, ...
   * `action` 함수는 항상 `dispatch`를 통해 호출된다.
4. `getters`: Vue component 상에서의 `computed`와 유사한 개념이다.
   * 일반적인 `state` 값을 활용하는 변수의 경우 `gatters`에 정의한다. 
   * 사용할 때 바로 사용 안되고 computed에 정의가 필요하다

### 활용

```bash
$ npm i vuex
$ vue add vuex 
> y
```

> main.js 에 store 등 이것저것 추가된다.

* /store/index.js에 추가된 것 중에서 module만 살리고 module을 추가하는 형태로 관리를 해보자.
* 모든 data를 하나의 파일에서 다 관리 하는게 아닌 module별로 관리한다.





* 그런데 vuex 는 data이다 보니까 session과 다르게 새로고침하면 데이터가 날아가서 로그인 상태가 유지가 안된다.

  ```javascript
  this.$store.dispatch('login', this.$session.get('jwt'))
  ```

  위와 같은 코드로 해결가능하다.