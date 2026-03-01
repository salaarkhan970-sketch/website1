const quotes = [
    {
        text: "The truth is rarely pure and never simple.",
        author: "Oscar Wilde",
        category: "truth"
    },
    {
        text: "Sach bolne ki sab se bari khoobi yeh hai ke aap ko kuch yaad nahi rakhna parta.",
        author: "Urdu Proverb",
        category: "truth"
    },
    {
        text: "Love looks not with the eyes, but with the mind.",
        author: "William Shakespeare",
        category: "love"
    },
    {
        text: "Mohabbat woh nahi jo koi kar sake, mohabbat woh hai jo ho jaye.",
        author: "Unknown",
        category: "love"
    },
    {
        text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
        author: "Buddha",
        category: "truth"
    },
    {
        text: "Where there is love there is life.",
        author: "Mahatma Gandhi",
        category: "love"
    },
    {
        text: "Sachai aik aisa poda hai jo dil ki zameen par ugta hai.",
        author: "Unknown",
        category: "truth"
    },
    {
        text: "To love and be loved is to feel the sun from both sides.",
        author: "David Viscott",
        category: "love"
    },
    {
        text: "Mohabbat mein sachai na ho to woh sirf ek dhoka hai.",
        author: "Unknown",
        category: "love"
    },
    {
        text: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain",
        category: "truth"
    }
];

const quotesGrid = document.getElementById('quotes-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderQuotes(filter = 'all') {
    // Adding fade out transition
    quotesGrid.style.opacity = '0';

    setTimeout(() => {
        quotesGrid.innerHTML = '';

        const filteredQuotes = filter === 'all'
            ? quotes
            : quotes.filter(q => q.category === filter);

        filteredQuotes.forEach((quote, index) => {
            const card = document.createElement('div');
            card.className = 'quote-card';
            card.style.animationDelay = `${index * 0.1}s`;

            // Safe string for function call parameter
            const safeText = quote.text.replace(/'/g, "\\'").replace(/"/g, "&quot;");

            card.innerHTML = `
                <i class="fas fa-quote-left quote-icon"></i>
                <div class="quote-text" dir="${quote.text.match(/[\u0600-\u06FF]/) ? 'rtl' : 'ltr'}">"${quote.text}"</div>
                <div class="quote-author">
                    <div>
                        &mdash; ${quote.author}
                        <span class="tag ${quote.category}">${quote.category}</span>
                    </div>
                    <button class="copy-btn" onclick="copyToClipboard(this, '${safeText}')" title="Copy quote">
                        <i class="far fa-copy"></i>
                    </button>
                </div>
            `;
            quotesGrid.appendChild(card);
        });

        quotesGrid.style.opacity = '1';
    }, 300); // Wait for fade out
}

function copyToClipboard(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector('i');
        icon.className = 'fas fa-check';
        icon.style.color = 'var(--text-main)';

        setTimeout(() => {
            icon.className = 'far fa-copy';
            icon.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Set up transitions for grid container
quotesGrid.style.transition = 'opacity 0.3s ease';

// Event Listeners for filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');
        // Render quotes
        renderQuotes(btn.dataset.filter);
    });
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderQuotes();
});
