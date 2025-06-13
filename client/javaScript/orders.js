// טען את ה־navbar
fetch('/html/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
  });

// טען את ההזמנות מהשרת והצג אותן
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('אין טוקן, התחבר שוב');
    window.location.href = '/html/login.html';
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    const res = await fetch(`/order/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(await res.text());

    const orders = await res.json();
    const container = document.getElementById('orders-container');
    container.innerHTML = '';

    if (!orders.length) {
      container.innerHTML = '<p>לא נמצאו הזמנות</p>';
      return;
    }

    orders.forEach(order => {
      const div = document.createElement('div');
      div.className = 'order';

      const date = new Date(order.purchaseDate).toLocaleString();

      div.innerHTML = `

        <p><strong>תאריך:</strong> ${date}</p>
        <p><strong>סכום כולל:</strong> ₪${order.totalAmount}</p>
        <h4>קורסים בהזמנה:</h4>
        <ul>${order.products.map(p => `<li>${p.name} – ₪${p.price}</li>`).join('')}</ul>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error('❌ שגיאה בטעינת ההזמנות:', err);
    document.getElementById('orders-container').innerHTML = 'שגיאה בטעינת ההזמנות';
  }
});
