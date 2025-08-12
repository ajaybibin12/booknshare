from django.urls import path
from .views import RegisterView,BookListView,BorrowBookView,ReturnBookView,MyBorrowedBooksView,RecommendationView,SubmitReviewView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:book_id>/borrow/', BorrowBookView.as_view(), name='borrow-book'),
    path('books/<int:book_id>/return/', ReturnBookView.as_view(), name='return-book'),
    path('mybooks/', MyBorrowedBooksView.as_view(), name='my-borrowed-books'),
    path('recommendations/', RecommendationView.as_view(), name='book-recommendations'),
    path('books/<int:book_id>/review/', SubmitReviewView.as_view(), name='submit-review')
]