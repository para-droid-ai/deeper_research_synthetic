// Application JavaScript for Deeper Research Synthetic Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCharts();
    initializeTransparencyFramework();
    initializeRoadmapTimeline();
    initializeScratchpadDemo();
    initializeCTAButtons();
    initializeHoverEffects();
});

// Navigation functionality - Fixed
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            console.log('Navigating to section:', targetSection);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section - ensure proper hiding/showing
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                targetElement.style.display = 'block';
                console.log('Section activated:', targetSection);
            } else {
                console.error('Target section not found:', targetSection);
            }
        });
    });

    // Ensure initial section is visible
    const initialSection = document.getElementById('overview');
    if (initialSection) {
        initialSection.style.display = 'block';
    }
}

// Initialize charts
function initializeCharts() {
    // Wait for charts to be visible before initializing
    setTimeout(() => {
        initializeGrowthChart();
        initializeRoadmapChart();
    }, 100);
}

function initializeGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;

    try {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [
                    {
                        label: 'Team Size',
                        data: [4, 8, 12, 20, 25],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Users (thousands)',
                        data: [0.1, 1, 10, 50, 100],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Revenue (millions)',
                        data: [0.1, 2, 15, 80, 220],
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: '5-Year Growth Projection'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Scale (logarithmic)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    } catch (error) {
        console.error('Error initializing growth chart:', error);
    }
}

function initializeRoadmapChart() {
    const ctx = document.getElementById('roadmapChart');
    if (!ctx) return;

    try {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Phase 1: Bootstrap', 'Phase 2: Growth', 'Phase 3: Scale'],
                datasets: [
                    {
                        label: 'Team Size',
                        data: [4, 12, 25],
                        backgroundColor: '#1FB8CD',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    },
                    {
                        label: 'Funding ($M)',
                        data: [0.132, 2, 15],
                        backgroundColor: '#FFC185',
                        borderColor: '#FFC185',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Roadmap Phase Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing roadmap chart:', error);
    }
}

// Transparency Framework functionality - Fixed
function initializeTransparencyFramework() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const component = this.closest('.framework-component');
            const details = component.querySelector('.component-details');
            
            if (details && details.classList.contains('hidden')) {
                details.classList.remove('hidden');
                this.textContent = 'Show Less';
                component.style.transform = 'translateY(-2px)';
            } else if (details) {
                details.classList.add('hidden');
                this.textContent = 'Learn More';
                component.style.transform = '';
            }
        });
    });

    // Add hover effects for framework components
    const components = document.querySelectorAll('.framework-component');
    components.forEach(component => {
        component.addEventListener('mouseenter', function() {
            const status = this.getAttribute('data-status');
            this.style.borderColor = getStatusColor(status);
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });
}

function getStatusColor(status) {
    const colors = {
        'design': '#FFC185',
        'prototype': '#1FB8CD',
        'planning': '#5D878F',
        'research': '#B4413C'
    };
    return colors[status] || '#5D878F';
}

// Roadmap Timeline functionality - Fixed
function initializeRoadmapTimeline() {
    const phases = document.querySelectorAll('.timeline-phase');
    
    phases.forEach((phase, index) => {
        const header = phase.querySelector('.phase-header');
        
        if (header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all phases
                phases.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked phase
                phase.classList.add('active');
                
                // Animate phase content
                const content = phase.querySelector('.phase-content');
                if (content) {
                    content.style.animation = 'fadeIn 0.3s ease-in-out';
                }
            });
        }
    });
}

// Scratchpad Demo functionality - Fixed
function initializeScratchpadDemo() {
    const steps = document.querySelectorAll('.scratchpad-step');
    if (steps.length === 0) return;
    
    let currentStep = 0;
    
    // Auto-cycle through scratchpad steps
    const cycleInterval = setInterval(() => {
        if (document.querySelector('#transparency.active')) {
            steps.forEach(step => step.classList.remove('active'));
            
            currentStep = (currentStep + 1) % steps.length;
            steps[currentStep].classList.add('active');
        }
    }, 3000);
    
    // Allow manual step selection
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            currentStep = index;
        });
    });
    
    // Store interval reference for cleanup
    window.scratchpadInterval = cycleInterval;
}

// CTA Button functionality - Fixed
function initializeCTAButtons() {
    // Create modal first
    createModalIfNotExists();
    
    // Initialize all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn, .sidebar-footer .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const buttonText = this.textContent.trim();
            console.log('CTA button clicked:', buttonText);
            
            // Show appropriate modal based on button type
            switch(buttonText) {
                case 'For Investors':
                    showModal('Investor Information', 'Connect with our team to learn about investment opportunities, our transparent growth strategy, and how we\'re building the future of AI research with complete accountability.');
                    break;
                case 'For Developers':
                    showModal('Developer Resources', 'Join our development community and explore our open-source transparency framework. Access our APIs, contribute to our codebase, and help build explainable AI systems.');
                    break;
                case 'For Partners':
                    showModal('Partnership Opportunities', 'Discover how to integrate with our platform and expand your research capabilities. Partner with us to bring transparency to AI research and content creation.');
                    break;
                case 'Contact Us':
                    showModal('Contact Information', 'Ready to learn more? Reach out to discuss collaboration opportunities, investment details, or technical partnerships. Email: contact@deeperresearch.ai');
                    break;
                default:
                    showModal('Information', 'Thank you for your interest in Deeper Research Synthetic. We\'re building the future of transparent AI research.');
            }
        });
    });
}

// Modal functionality - Fixed and improved
function createModalIfNotExists() {
    if (document.getElementById('info-modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.className = 'modal hidden';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="btn btn--primary modal-close">Got it</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not present
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.5);
            }
            
            .modal-overlay {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--space-20);
            }
            
            .modal-content {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                max-width: 500px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid var(--color-border);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            
            .modal-title {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-xl);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-2xl);
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: var(--space-4);
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast) var(--ease-standard);
            }
            
            .modal-close:hover {
                color: var(--color-text);
                background: var(--color-secondary);
            }
            
            .modal-body {
                padding: var(--space-24);
                color: var(--color-text);
                line-height: 1.6;
            }
            
            .modal-footer {
                padding: var(--space-24);
                border-top: 1px solid var(--color-border);
                display: flex;
                justify-content: flex-end;
            }
            
            .modal.hidden {
                display: none !important;
            }
            
            .modal:not(.hidden) {
                display: flex !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modal.querySelector('.modal-overlay')) {
            closeModal();
        }
    });
    
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    });
}

function showModal(title, content) {
    const modal = document.getElementById('info-modal');
    if (!modal) {
        createModalIfNotExists();
        return showModal(title, content);
    }
    
    // Update modal content
    const titleElement = modal.querySelector('.modal-title');
    const bodyElement = modal.querySelector('.modal-body');
    
    if (titleElement) titleElement.textContent = title;
    if (bodyElement) bodyElement.textContent = content;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal shown:', title);
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed');
    }
}

// Hover effects - Fixed
function initializeHoverEffects() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add hover effects to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add hover effects to pillar cards
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Tab navigation through sections
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = document.querySelector('.content-section.active');
        const sections = Array.from(document.querySelectorAll('.content-section'));
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (e.shiftKey) {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }
        
        const nextSection = sections[nextIndex];
        const sectionId = nextSection.id;
        const navLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (navLink) {
            navLink.click();
        }
    }
});

// Performance monitoring and debugging
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Debug navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Navigation clicked:', this.getAttribute('data-section'));
        });
    });
}

// Initialize performance tracking
document.addEventListener('DOMContentLoaded', trackPerformance);

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.scratchpadInterval) {
        clearInterval(window.scratchpadInterval);
    }
});