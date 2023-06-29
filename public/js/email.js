document.addEventListener('DOMContentLoaded', ()=>{
    const emailButton = document.getElementById('email-button');

    document.getElementById('pdf_form').addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
    
      // Perform your form submission using fetch or other methods
      // ...
    
      // Handle the server response
      const response = await fetch('/send-email', { method: 'POST' });
      const data = await response.json();
    
      if (data.success) {
        emailButton.classList.add('success'); 
        emailButton.textContent = 'Email Sent Successfully';
      } else {
        // Display an error message if the email was not sent successfully
        console.error(data.message);
      }
    });
    
})
