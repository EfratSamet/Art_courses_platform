// טען את ה־navbar
fetch('/html/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
  });

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.getElementById('course-details').innerText = 'קורס לא נמצא';
    return;
  }

  try {
    const res = await fetch(`/course/${id}`);
    if (!res.ok) throw new Error('לא נמצא');
    const course = await res.json();

    const container = document.getElementById('course-details');
    container.innerHTML = `
      <div class="course-detail">
        <h1>${course.name}</h1>
        ${course.imageUrl ? `<img src="${course.imageUrl}" alt="${course.name}" class="course-image">` : ''}
        <p><strong>תיאור:</strong> ${course.description || 'אין תיאור'}</p>
        <p><strong>מחיר:</strong> ₪${course.price}</p>
        <p><strong>מספר מפגשים:</strong> ${course.totalMeetings || 'לא צויין'}</p>
        <p><strong>תאריכים:</strong> ${new Date(course.startDate).toLocaleDateString()} - ${new Date(course.endDate).toLocaleDateString()}</p>
        <p><strong>ימים:</strong> ${course.meetingDays?.join(', ') || 'לא צויין'}</p>
        <p><strong>שעות:</strong> ${course.meetingTime ? `${course.meetingTime.start} - ${course.meetingTime.end}` : 'לא צויין'}</p>
        <p><strong>מיקום:</strong> ${course.location || 'לא צויין'}</p>
        <p><strong>קהל יעד:</strong> ${course.targetAudience || 'לא צויין'}</p>

        <button onclick="addToCart('${course._id}')">🛒 הוסף לעגלה</button>
      </div>
    `;
  } catch (err) {
    document.getElementById('course-details').innerText = 'שגיאה בטעינת הקורס';
  }
});

// הוספת קורס לעגלה (כמו קודם)
function addToCart(courseId) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('התחבר כדי להוסיף לעגלה');
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
        if (!res.ok) throw new Error();
        alert('הקורס נוסף לעגלה');
      })
      .catch(() => alert('שגיאה בהוספה לעגלה'));
  } catch {
    alert('בעיה בטוקן, התחבר מחדש');
    window.location.href = '/html/login.html';
  }
}
