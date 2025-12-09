const rsvpBtn = document.getElementById('rsvp-btn');
const raceid = document.querySelector('main').dataset.raceId;

console.log('Race ID from dataset:', raceid);

const postData = {
    raceid: raceid
}

fetch(`/races/${raceid}/check`, { method: 'PUT', 
    body : JSON.stringify(postData), 
    headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(data => {
        if (data.rsvp) {
            rsvpBtn.textContent = 'Cancel RSVP';
            rsvpBtn.classList.add('rsvp-active');
        }
    });

// when button is clicked
rsvpBtn.addEventListener('click', async () => {
    const isRSVPd = rsvpBtn.classList.contains('rsvp-active');
    const endpoint = isRSVPd ? `/races/${raceid}/remove-rsvp` : `/races/${raceid}/add-rsvp`;
    
    const response = await fetch(endpoint, { method: 'PUT' });
    if (response.ok) {
        rsvpBtn.textContent = isRSVPd ? 'RSVP' : 'Cancel RSVP';
        rsvpBtn.classList.toggle('rsvp-active');
    }
});