document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Project modal ---------------- */
  const projectData = {
    wildfire: {
      tag: 'Survival Analysis',
      title: 'Wildfire Risk Survival Model',
      meta: 'WiDS Global Datathon · April 2026 · Top 25% worldwide',
      description: "Built survival models — Random Survival Forest and Gradient Boosting Survival — to predict wildfire impact on evacuation zones, producing probability estimates across multiple time horizons rather than a single point-in-time risk score. Model calibration was validated using weighted Brier scores, and results were translated into risk-based guidance to support preparedness and resource-allocation decisions during active wildfire events.",
      stats: 'Evaluation score ≈ 0.97 · calibrated via weighted Brier score · ranked top 25% worldwide',
      tech: 'Python · Scikit-Survival · Random Survival Forest · Gradient Boosting Survival',
      link: null
    },
    bidding: {
      tag: 'LLM Agents',
      title: 'Bidding War Simulation',
      meta: 'Independent Project · Second-price auction · December 2025',
      description: 'A multi-agent second-price (Vickrey) auction simulator. Strategic bidder agents combine a best-response approximator with an LLM call, grounding each bid in an actual expected-utility calculation rather than letting the model guess freely, while heuristic agents bid a simpler value fraction as a baseline. Agent outputs are validated with Pydantic schemas, and results are aggregated across many simulation runs to compare strategies.',
      stats: '20-round simulation → mean clearing price 0.50 · win share: B1 10% / B2 55% / B3 35%',
      tech: 'Python · OpenAI API · Pydantic · Prompt Engineering',
      link: 'https://github.com/khuship0104/auction_market'
    },
    tiktok: {
      tag: 'NLP',
      title: 'TikTok Sentiment Analysis',
      meta: 'UCF Analytics & Decision Control Lab · Jan – Jun 2023',
      description: 'Built a Python-based scraping and analysis pipeline to collect TikTok metadata, comments, and video data for sentiment research. Applied NLP techniques to classify user comments and identify engagement trends, then presented findings at the Student Scholar Symposium.',
      stats: null,
      tech: 'Python · NLP · Web Scraping',
      link: null
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalDescription = document.getElementById('modal-description');
  const modalStats = document.getElementById('modal-stats');
  const modalTech = document.getElementById('modal-tech');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.getElementById('modal-close');
  const cards = document.querySelectorAll('.project-card[data-project]');

  let lastFocused = null;

  function openModal(id) {
    const data = projectData[id];
    if (!data || !modal) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalMeta.textContent = data.meta;
    modalDescription.textContent = data.description;
    modalTech.textContent = data.tech;

    if (data.stats) {
      modalStats.textContent = data.stats;
      modalStats.hidden = false;
    } else {
      modalStats.hidden = true;
    }

    if (data.link) {
      modalLink.href = data.link;
      modalLink.hidden = false;
    } else {
      modalLink.hidden = true;
    }

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // let real links behave normally
      openModal(card.dataset.project);
    });
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
        e.preventDefault();
        openModal(card.dataset.project);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });
});
