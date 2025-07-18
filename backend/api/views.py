from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer,BookSerializer,BorrowSerializer
from django.contrib.auth.models import User
from .models import Book,Borrow
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = serializer.get_token(user)
            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
                'token': token
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Book.objects.all()
        genre = self.request.query_params.get('genre')
        author = self.request.query_params.get('author')
        available = self.request.query_params.get('available')

        if genre:
            queryset = queryset.filter(genre__icontains=genre)
        if author:
            queryset = queryset.filter(author__icontains=author)
        if available == 'true':
            queryset = queryset.filter(available_copies__gt=0)

        return queryset
    


class BorrowBookView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, book_id):
        user = request.user
        book = get_object_or_404(Book, id=book_id)

        if Borrow.objects.filter(user=user, book=book, returned=False).exists():
            return Response({'error': 'You already borrowed this book'}, status=400)

        if book.available_copies < 1:
            return Response({'error': 'No copies available'}, status=400)

        Borrow.objects.create(user=user, book=book)
        book.available_copies -= 1
        book.total_borrowed += 1
        book.save()

        return Response({'message': 'Book borrowed successfully'}, status=200)
    

class ReturnBookView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, book_id):
        user = request.user
        try:
            borrow = Borrow.objects.get(user=user, book_id=book_id, returned=False)
        except Borrow.DoesNotExist:
            return Response({'error': 'You haven’t borrowed this book'}, status=400)

        borrow.returned = True
        borrow.save()

        book = borrow.book
        book.available_copies += 1
        book.save()

        return Response({'message': 'Book returned successfully'}, status=200)
    

class MyBorrowedBooksView(generics.ListAPIView):
    serializer_class = BorrowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Borrow.objects.filter(user=self.request.user, returned=False)
    



class RecommendationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Get genres from user's past borrows
        borrows = Borrow.objects.filter(user=user, returned=True).select_related('book')
        genres = set(borrow.book.genre for borrow in borrows)

        if genres:
            # Recommend books from same genres, sorted by popularity
            books = Book.objects.filter(genre__in=genres).order_by('-total_borrowed')[:5]
        else:
            # Fallback: top 5 globally popular books
            books = Book.objects.all().order_by('-total_borrowed')[:5]

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
