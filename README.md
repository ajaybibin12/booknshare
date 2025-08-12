# 📚 Book N Share

A full-stack Book Lending application built with:

- **Frontend**: React + Tailwind CSS
- **Backend**: Django REST Framework
- **API Testing**: Postman Collection
- **Database**: PostgreSQL (local dev)

---

## 📁 Project Structure

BookLendingProject/
├── frontend/ # React + Tailwind (Vite)
│ └── bookLendingApp/
├── backend/ # Django project with REST API
├── BookLending.postman_collection.json # API test collection
└── README.md


---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js & npm
- Python 3.10+
- pip & virtualenv
- Git

---

## 🧩 Frontend Setup (React + Tailwind)

1. Navigate to the frontend:

```bash
cd frontend/bookLendingApp

````
2.Install dependencies:

```bash
npm install

```

3.Run the frontend app:

```bash

npm run dev

```

4. The app runs at: http://localhost:5173

## ⚙️ Backend Setup (Django REST)

1. Navigate to the backend:
   
```bash

cd backend

```
2. Create a virtual environment:

```bash

python -m venv venv

```
3. Activate the environment:

``` activate virtual environment

windows ==> bash : venv\Scripts\activate
on mac ==> bash : source venv/bin/activate

```
4. Install dependencies:

```bash

pip install -r requirements.txt

```

5. Run migrations:

```bash

python manage.py makemigrations
python manage.py migrate

```

6. Run the Django server:

```bash

python manage.py runserver

```

7. The backend API runs at: http://127.0.0.1:8000


🧪 API Testing (Postman)

1. Open Postman

2. Import BookLending.postman_collection.json

3. Explore endpoints (e.g., /api/books/, /api/users/, etc.)


🛠 Features

. 🔐 User authentication (login/signup)

. 📚 Book listing

. 📖 Borrow and return functionality

. Recommandations of books ( if borrowed any books based on that and most popular also shows. If not borrowed most popular books shows )

. 📊 Dashboard (On admin side we can add books and its available copies )


📸 Screenshots

<img width="1920" height="1200" alt="Screenshot 2025-08-12 153804" src="https://github.com/user-attachments/assets/89fdac30-e00c-44c2-98ac-e253247c5d6e" />
<img width="1920" height="1200" alt="Screenshot 2025-08-12 153827" src="https://github.com/user-attachments/assets/579bd81b-873f-43f0-8138-573bf261c278" />
<img width="1920" height="1200" alt="Screenshot 2025-08-12 153903" src="https://github.com/user-attachments/assets/a665df10-de57-47bb-beed-08f59ce3524d" />
<img width="1920" height="1200" alt="Screenshot 2025-08-12 153929" src="https://github.com/user-attachments/assets/f2459439-2fb9-42d9-b22f-92ea56a461ec" />
<img width="1920" height="1200" alt="Screenshot 2025-08-12 154009" src="https://github.com/user-attachments/assets/6742dede-750b-45b9-bfd5-1bb309b1ba5b" />
<img width="1920" height="1200" alt="Screenshot 2025-08-12 154027" src="https://github.com/user-attachments/assets/c857810e-d83f-4fca-a94d-d99b34231d93" />



💻 Tech Stack

| Layer           | Tech Stack                |
| --------------- | ------------------------- |
| Frontend        | React, Vite, Tailwind CSS |
| Backend         | Django REST Framework     |
| Database        | PostgreSQL (dev)          |
| Testing         | Postman                   |
| Version Control | Git + GitHub              |


🌐 License
This project is open-source under the MIT License.


---

You can copy the entire content above into your `README.md` file directly. Let me know if you'd like to customize any section (e.g., add live demo, Docker, screenshots).





