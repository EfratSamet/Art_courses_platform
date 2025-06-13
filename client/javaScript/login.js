document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errMsg = await response.text();
      alert('שגיאה: ' + errMsg);
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = '/html/catalog.html';  // מעבר לקטלוג
  } catch (err) {
    console.error(err);
    alert('שגיאה בהתחברות לשרת');
  }
});
