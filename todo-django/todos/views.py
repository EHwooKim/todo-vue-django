from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Todo
from .serializers import TodoSerializers, UserSerializers

# Create your views here.

# GET /todos/ : 전체 todos
# POST /todos/ : todos 등록(저장하기)
@api_view(['GET', 'POST'])
def todo_index_create(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializers = TodoSerializers(todos, many = True)
        return Response(serializers.data)
    else:
        # request.POST : FormData로 POST 전송이 되었을 때
        # request.data : FormData로 POST 전송 및 data로 전송 모두 
        serializers = TodoSerializers(data = request.data)
        if serializers.is_valid(raise_exception=True): # 예외발생시 메세지 띄워주기
            serializers.save()
            return Response(serializers.data)

# GET /users/{id}/
@api_view(['GET'])
def user_detail(request, id):
    User = get_user_model()
    user = get_object_or_404(User, pk=id)
    serializers = UserSerializers(user)
    return Response(serializers.data)

# PUT /todos/1/ 1번 todo 수정
# DELETE /todos/1/ 1번 todo 삭제
@api_view(['PUT', 'DELETE'])
def todo_update_delete(request, id):
    todo = get_object_or_404(Todo, pk=id)
    if request.method == 'PUT':
        serializers = TodoSerializers(data=request.data, instance=todo)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
    else:
        todo.delete()
        # HTTP 상태코드 204 : 삭제코드. 더이상 내용없음
        # return Response(status=204)
        return Response({'message': '삭제되었음'})
