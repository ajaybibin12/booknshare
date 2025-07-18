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

<img width="1920" height="1200" alt="Screenshot 2025-07-18 181449" src="https://github.com/user-attachments/assets/53e262cd-ac8f-4717-b0f4-241218b4040d" />
<img width="1920" height="1200" alt="Screenshot 2025-07-18 181430" src="https://github.com/user-attachments/assets/3ed1ebda-e7d2-4e9a-a1d4-fa490d277477" />
<img width="1920" height="1200" alt="Screenshot 2025-07-18 181406" src="https://github.com/user-attachments/assets/f7b78fbe-986b-42a2-81e7-f321b427b508" />
<img width="1920" height="1200" alt="Screenshot 2025-07-18 181341" src="https://github.com/user-attachments/assets/e5f04050-4f4f-4c50-b890-6d4d11515880" />
<img width="1920" height="1200" alt="Screenshot 2025-07-18 181314" src="https://github.com/user-attachments/assets/250005d2-430f-4600-bdfd-68b04bbd44c4" />
<img width="1920" height="1200" alt="Screenshot 2025-07-18 181050" src="https://github.com/user-attachments/assets/b6afa3dd-9979-4c21-aa2e-379ef1097255" />


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





