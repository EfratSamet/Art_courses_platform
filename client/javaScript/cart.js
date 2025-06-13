document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('התחבר כדי לצפות בעגלה');
    window.location.href = '/html/login.html';
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  try {
    const response = await fetch(`/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error(await response.text());

    const cartCourses = await response.json(); // מערך של courseIds
    const list = document.getElementById('cart-list');

    if (!cartCourses.length) {
      list.innerHTML = '<li>העגלה ריקה</li>';
      return;
    }

for (const course of cartCourses) {
  const li = document.createElement('li');
  li.textContent = course.name;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '❌ הסר';
  removeBtn.onclick = async () => {
    try {
      await fetch('/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId: course._id })
      });
      li.remove();
    } catch (err) {
      alert('שגיאה בהסרת קורס');
      console.error(err);
    }
  };

  li.appendChild(removeBtn);
  list.appendChild(li);
}

  } catch (err) {
    console.error("❌ שגיאה בטעינת העגלה:", err);
    alert('שגיאה בטעינת העגלה');
  }
});
document.getElementById('payment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('אין טוקן. התחבר מחדש');
    window.location.href = '/html/login.html';
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const fullName = document.getElementById('fullName').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;

  try {
    const res = await fetch('/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        userId,
        fullName,
        cardNumber,
        expiry,
        cvv
      })
    });

    const result = document.getElementById('payment-result');

    if (!res.ok) {
      const error = await res.text();
      result.textContent = '❌ שגיאה בביצוע הרכישה: ' + error;
      return;
    }

    result.textContent = '✅ הרכישה בוצעה בהצלחה!';
    document.getElementById('cart-list').innerHTML = '<li>העגלה ריקה</li>';
  } catch (err) {
    console.error('שגיאה ברכישה:', err);
    document.getElementById('payment-result').textContent = '❌ שגיאה בביצוע הרכישה';
  }
});

