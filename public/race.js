const raceid = document.querySelector('main').dataset.raceId;
const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', async () => {
    console.log("deleting");
    const response = await fetch(`/races/id/${raceid}/delete`, { method: 'DELETE' });
    if (response.ok) {
        window.location.href = '/races';
    }
});