document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            // TODO: Replace with actual newsletter service integration
            console.log(`Subscribing email: ${email}`);
            
            // Simple validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing!');
                emailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});