document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById('blogs');
    const loadMoreButton = document.getElementById('load-more');
    const apiKey = 'api_key'; // Replace with your News API key
    let page = 1; // Pagination
    
    async function fetchBlogs() {
        const apiUrl = `https://newsapi.org/v2/everything?q=technology&page=${page}&pageSize=5&apiKey=${apiKey}`; // Fetch 5 articles per page

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.articles) {
                data.articles.forEach(article => {
                    const blogElement = document.createElement('div');
                    blogElement.className = 'blog-post';

                    const blogTitle = document.createElement('h2');
                    blogTitle.textContent = article.title;

                    const blogContent = document.createElement('p');
                    blogContent.textContent = article.description || article.content;

                    blogElement.appendChild(blogTitle);
                    blogElement.appendChild(blogContent);

                    blogContainer.appendChild(blogElement);
                });
            } else {
                console.error('No articles found');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    loadMoreButton.addEventListener('click', () => {
        page++;
        fetchBlogs();
    });

    // Initial fetch
    fetchBlogs();
});
