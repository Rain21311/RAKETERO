// Improved mobile scrolling code with proper overflow handling

const enableScrolling = () => {
    const body = document.body;
    const html = document.documentElement;

    // Set the overflow to scroll for body and html
    body.style.overflow = 'auto';
    html.style.overflow = 'auto';

    // Handle touch events for better responsiveness
    document.addEventListener('touchmove', (event) => {
        // Prevent default behavior if necessary
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
};

const disableScrolling = () => {
    const body = document.body;
    const html = document.documentElement;

    // Disable scrolling for body and html
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
};

// Example usage
// enableScrolling(); // Call this function to enable scrolling
// disableScrolling(); // Call this function to disable scrolling
