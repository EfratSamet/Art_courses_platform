// טוען את ה־navbar ומוסיף את הברכה אחרי טעינה
fetch('/html/nav.html')
  .then(res => res.text())
  .then(html => {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    container.innerHTML = html;

    // המתן לרגע עד שה־HTML ייכנס ל־DOM
    setTimeout(() => {
      const userMenu = document.getElementById('user-menu');
      const token = localStorage.getItem('token');

      if (userMenu && token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const decodedName = decodeURIComponent(escape(payload.name));

const name = decodedName || 'משתמש';

          userMenu.innerHTML = `
            <div class="dropdown">
              <button class="dropbtn">שלום, ${name} ⮟</button>
              <div class="dropdown-content">
                <a href="/html/profile.html">פרופיל</a>
                <a href="#" onclick="logout()">התנתק</a>
              </div>
            </div>
          `;
        } catch (err) {
          userMenu.innerHTML = `<a href="/html/login.html" class="login-link">התחברות</a>`;
        }
      } else if (userMenu) {
        userMenu.innerHTML = `<a href="/html/login.html" class="login-link">התחברות</a>`;
      }

      function logout() {
        localStorage.removeItem('token');
        window.location.href = '/html/login.html';
      }
    }, 50); // לוודא שה-HTML של nav נטען קודם
  });
