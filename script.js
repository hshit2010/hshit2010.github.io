document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const emailBtn = document.getElementById('emailSubmit');

  if (form) {
    // Intersection Observer for the slick scroll animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.15 }); 

    observer.observe(form);

    // Generate structured message
    function getMessageContent() {
      const formData = new FormData(form);
      const fullName = formData.get('fullName');
      const bizName = formData.get('bizName');
      const website = formData.get('website') || 'Not provided';
      const mainGoal = formData.get('mainGoal');
      const budget = formData.get('budget');
      const branding = formData.get('branding');

      return `Hi Harshit, I'd like to discuss a website project!\n\n*Project Details:*\n👤 Name: ${fullName}\n🏢 Business: ${bizName}\n🌐 Website: ${website}\n🎯 Goal: ${mainGoal}\n🎨 Branding: ${branding}\n💰 Budget: ${budget}\n\nLet me know when we can chat!`;
    }

    // Default Submission: WhatsApp
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const encodedMessage = encodeURIComponent(getMessageContent());
      window.open(`https://wa.me/919875907476?text=${encodedMessage}`, '_blank');
    });

    // Alternate Submission: Email
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const encodedMessage = encodeURIComponent(getMessageContent());
        window.location.href = `mailto:contact@aboutharshit.info?subject=New Website Project Inquiry&body=${encodedMessage}`;
      });
    }
  }
});
