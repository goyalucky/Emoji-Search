document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.searchBar');
    const resultDiv = document.querySelector('.result');
    const apiURL = 'https://exam-fawn-eight.vercel.app/emoji/';

    const fetchAndDisplayEmojis = async (query = '') => {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();

            const filteredData = data.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );

            resultDiv.innerHTML = '';

            if (query.trim() !== '' && filteredData.length > 0) {
                filteredData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="emoji">${item.emoji}</div>
                        <div class="name">${item.name}</div>
                        <div class="keywords">${item.keywords.join(', ')}</div>
                    `;
                    resultDiv.appendChild(card);
                });
            } else if (query.trim() !== '') {
                resultDiv.innerHTML = '<p>No results found</p>';
            }
        } catch (error) {
            console.error('Error fetching emoji data:', error);
            resultDiv.innerHTML = '<p>Error loading emojis. Please try again later.</p>';
        }
    };

    searchBar.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        fetchAndDisplayEmojis(query);
    });
});
