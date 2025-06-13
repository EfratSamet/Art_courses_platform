document.getElementById('add-course-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const checkboxes = document.querySelectorAll('input[name="meetingDays"]:checked');
  const meetingDays = Array.from(checkboxes).map(cb => cb.value);

  const imageGalleryRaw = document.getElementById('imageGallery').value.trim();
  const imageGallery = imageGalleryRaw
    ? imageGalleryRaw.split(',').map(url => url.trim())
    : [];

  const newCourse = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    targetAudience: document.getElementById('targetAudience').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    totalMeetings: parseInt(document.getElementById('totalMeetings').value),
    meetingDays,
    meetingTime: {
      start: document.getElementById('startTime').value,
      end: document.getElementById('endTime').value
    },
    location: document.getElementById('location').value,
    imageUrl: document.getElementById('imageUrl').value,
    imageGallery
  };

  try {
    const res = await fetch('/course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse)
    });

    if (!res.ok) throw new Error(await res.text());

    alert('✅ הקורס נוסף בהצלחה');
    window.location.href = '/html/catalog.html';
  } catch (err) {
    console.error(err);
    alert('❌ שגיאה בהוספת הקורס');
  }
});
