# MB-Frontend


---

## 🌐 Frontend - `README.md`

This is the frontend of my blog application. It allows users to register, login, create blog posts, view public posts, and manage their own posts. The frontend is built using React, Axios, Bootstrap, and React Router.




```markdown
# ✨ Blog App Frontend (React + Axios)

This is the frontend part of my blog application where users can register, login, create/edit posts, and view their own or public posts. Built using React, Axios, and React Router.

---

## 💡 My Approach

To build the frontend, I used React components and state hooks to manage form inputs and API data. I used `useEffect` to fetch post data and `useNavigate` for routing after actions like update or login.

I ensured that routes like "My Posts" and "Edit Post" are protected by checking JWT token stored in localStorage. I also gave user feedback using alert and UI status messages.

---

## 🤖 How I used AI

I used **ChatGPT** to:

- Fix a bug where status wasn’t updating in MySQL
- Explain how to bind checkbox state with API
- Guide me on conditional navigation after API responses
- Review and clean up my logic in `EditPost.jsx`
- Help write the initial draft of README 😅

**GitHub Copilot** helped in quickly generating UI skeletons, loops, and form bindings.

---

🧾 Features
User Registration & Login (with JWT)

Create, Edit, Delete your own posts

Public post listing

Toggle post visibility: Public / Private

Auth token stored in localStorage

Responsive UI with Bootstrap
