// טען את ה־navbar
fetch('/html/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
  });

// טען את הקורסים מהשרת והצג אותם
fetch('/course')
  .then(res => res.json())
  .then(courses => {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    courses.forEach(course => {
      const div = document.createElement('div');
      div.className = 'course';

      const startDate = new Date(course.startDate).toLocaleDateString();
      const endDate = new Date(course.endDate).toLocaleDateString();

      const meetingDays = course.meetingDays?.join(', ') || 'לא צויין';
      const meetingTime = course.meetingTime
        ? `${course.meetingTime.start} - ${course.meetingTime.end}`
        : 'לא צויין';

    div.innerHTML = `
  <h2>${course.name}</h2>
  ${course.imageUrl ? `<img src="${course.imageUrl}" alt="${course.name}" class="course-image">` : ''}
        <p><strong>קהל יעד:</strong> ${course.targetAudience || 'לא צויין'}</p>
  <button onclick="window.location.href='/html/course.html?id=${course._id}'">לפרטי הקורס</button>
`;

      const button = document.createElement('button');
      button.textContent = 'הוסף לעגלה 🛒';
      button.addEventListener('click', () => addToCart(course._id));

      div.appendChild(button);
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('courses-container').innerText = 'שגיאה בטעינת הקורסים';
    console.error(err);
  });

// הוספת קורס לעגלה
function addToCart(courseId) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('אין טוקן, התחבר שוב');
    window.location.href = '/html/login.html';
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId })
    })
    .then(res => {
      if (!res.ok) throw new Error("שגיאה בהוספה לעגלה");
      alert("✅ הקורס נוסף לעגלה");
    })
    .catch(err => {
      console.error('❌ שגיאה בשליחת הבקשה:', err);
      alert("⚠ שגיאה בהוספה לעגלה");
    });

  } catch (err) {
    console.error('❌ שגיאה בפענוח טוקן:', err);
    alert("שגיאה בטוקן, התחבר מחדש");
    window.location.href = '/html/login.html';
  }
}
