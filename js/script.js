// D.Solution Website Script

// Language data
const translations = {
    en: {
        // Navigation
        home: "Home",
        services: "Services",
        contact: "Contact",

        // Home page
        welcome: "Welcome to D.Solution",
        welcomeDesc: "Smart digital support for students, professionals, and business owners.",
        welcomeDesc2: "At D. Solutions, we offer practical, done-for-you digital services designed to save you time, improve your professionalism, and help you succeed whether you're submitting a university paper, applying for a job, or launching your business online.",
        exploreServices: "Explore Our Services",

        // About section
        aboutTitle: "About D.Solution",
        aboutDesc: "We are dedicated to providing high-quality digital solutions that empower students, professionals, and business owners to achieve their goals. Our team of experts specializes in creating tailored digital services that save time and enhance professionalism.",
        aboutDesc2: "Whether you need help with academic documents, professional branding, or business development, we're here to support your success with our comprehensive range of digital services.",

        // Services page
        ourServices: "Our Services",
        servicesDesc: "Smart digital support for students, professionals, and business owners. At D. Solutions, we offer practical, done for you. digital services designed to save you time, improve your professionalism, and help you succeed.",

        // Service categories
        forStudents: "For Students",
        forProfessionals: "For Professionals",
        forBusinessOwners: "For Business Owners",

        // Student services
        internshipReport: "Internship Report Crafting",
        internshipDesc: "Polished. Professional. Personalized. Turn your real-world training into a professionally written document.",
        proofreading: "Proofreading & Editing",
        proofreadingDesc: "We check your grammar, fix sentence structure, and format your work according to academic guidelines.",
        cvAssistance: "CV & Cover Letter Assistance",
        cvDesc: "Let us write or enhance your documents to help you stand out for scholarships, internships, and job opportunities.",
        applicationSupport: "Application Form Support",
        applicationDesc: "Guidance through online university or scholarship applications, including uploading documents.",

        // Professional services
        cvDesign: "Professional CV Design",
        cvDesignDesc: "Clean, modern CVs that highlight your skills and experience in a visually appealing format.",
        coverLetter: "Custom Cover Letter Writing",
        coverLetterDesc: "Personalized cover letters tailored to your target job or role.",

        // Business services
        websiteSetup: "Business Website Setup",
        websiteDesc: "A simple, clean website with mobile compatibility, contact forms, service lists, and more.",
        socialMedia: "Social Media Page Creation",
        socialMediaDesc: "We create or upgrade your Facebook, Instagram, or LinkedIn pages with branded visuals.",
        branding: "Logo & Branding Design",
        brandingDesc: "Unique logos, social banners, and business card designs for consistent identity.",

        // Package deals
        packageDeals: "Looking for a Package Deal?",
        packageDesc: "Ask us about custom service bundles for students, professionals, or entrepreneurs. We'll build a solution that fits your goals and your budget.",

        // Contact section
        getStarted: "Need Help Getting Started?",
        getStartedDesc: "We're here to attend. Whether you need a single service or full support across multiple areas, contact us for free consultation.",

        // Contact page
        contactUs: "Contact Us",
        contactDesc: "Get in touch for your digital needs. We're here to help you succeed with our professional digital services.",
        connectWithUs: "Connect With Us",
        name: "Name",
        message: "Message",
        sendMessage: "Send Message",

        // Account modal
        account: "Account",
        login: "Login",
        register: "Register",
        email: "Email",
        password: "Password",

        // Footer
        footerText: "© 2023 D.Solution. All rights reserved.",

        // Service categories
        forStudents: "For Students",
        forProfessionals: "For Professionals",
        forBusinessOwners: "For Business Owners",

        // Category descriptions
        studentsDesc: "Academic and digital services that make school life easier and more successful.",
        professionalsDesc: "Polished digital materials that boost credibility and visibility in your career.",
        businessDesc: "Essential digital tools and setup services to grow your business online.",

        // Student services
        internshipReport: "Internship Report Crafting",
        internshipDesc: "Polished. Professional. Personalized. Turn your real-world training into a professionally written document.",
        proofreading: "Proofreading & Editing",
        proofreadingDesc: "We check your grammar, fix sentence structure, and format your work according to academic guidelines.",
        cvAssistance: "CV & Cover Letter Assistance",
        cvDesc: "Let us write or enhance your documents to help you stand out for scholarships, internships, and job opportunities.",
        applicationSupport: "Application Form Support",
        applicationDesc: "Guidance through online university or scholarship applications, including uploading documents.",

        // Professional services
        cvDesign: "Professional CV Design",
        cvDesignDesc: "Clean, modern CVs that highlight your skills and experience in a visually appealing format.",
        coverLetter: "Custom Cover Letter Writing",
        coverLetterDesc: "Personalized cover letters tailored to your target job or role.",

        // Business services
        websiteSetup: "Business Website Setup",
        websiteDesc: "A simple, clean website with mobile compatibility, contact forms, service lists, and more.",
        socialMedia: "Social Media Page Creation",
        socialMediaDesc: "We create or upgrade your Facebook, Instagram, or LinkedIn pages with branded visuals.",
        branding: "Logo & Branding Design",
        brandingDesc: "Unique logos, social banners, and business card designs for consistent identity.",

        // Package deals
        packageDeals: "Looking for a Package Deal?",
        packageDesc: "Ask us about custom service bundles for students, professionals, or entrepreneurs. We'll build a solution that fits your goals and your budget.",

        // Contact section
        getStarted: "Need Help Getting Started?",
        getStartedDesc: "We're here to attend. Whether you need a single service or full support across multiple areas, contact us for free consultation.",

        // Package deal and help sections
        packageTitle: "Vous cherchez un Forfait?",
        packageDesc: "Demandez-nous des bundles de services personnalisés pour les étudiants, professionnels ou entrepreneurs. Nous construirons une solution qui correspond à vos objectifs et à votre budget.",
        helpTitle: "Besoin d'Aide pour Commencer?",
        helpDesc: "Nous sommes là pour vous assister. Que vous ayez besoin d'un service unique ou d'un support complet dans plusieurs domaines, contactez-nous pour une consultation gratuite.",
        contactUsBtn: "Contactez-nous Aujourd'hui",

        // Portfolio
        ourWork: "Our Work"
    },
    fr: {
        // Navigation
        home: "Accueil",
        services: "Services",
        contact: "Contact",

        // Home page
        welcome: "Bienvenue chez D.Solution",
        welcomeDesc: "Support numérique intelligent pour les étudiants, professionnels et propriétaires d'entreprises.",
        welcomeDesc2: "Chez D. Solutions, nous offrons des services numériques pratiques et clés en main conçus pour vous faire gagner du temps, améliorer votre professionnalisme et vous aider à réussir, que vous soumettiez un travail universitaire, postuliez à un emploi ou lanciez votre entreprise en ligne.",
        exploreServices: "Explorer Nos Services",

        // About section
        aboutTitle: "À propos de D.Solution",
        aboutDesc: "Nous nous engageons à fournir des solutions numériques de haute qualité qui permettent aux étudiants, professionnels et propriétaires d'entreprises d'atteindre leurs objectifs. Notre équipe d'experts se spécialise dans la création de services numériques sur mesure qui font gagner du temps et améliorent le professionnalisme.",
        aboutDesc2: "Que vous ayez besoin d'aide pour des documents académiques, du branding professionnel ou du développement d'entreprise, nous sommes là pour soutenir votre succès avec notre gamme complète de services numériques.",

        // Services page
        ourServices: "Nos Services",
        servicesDesc: "Support numérique intelligent pour les étudiants, professionnels et propriétaires d'entreprises. Chez D. Solutions, nous offrons des services numériques pratiques et faits pour vous.",

        // Service categories
        forStudents: "Pour les Étudiants",
        forProfessionals: "Pour les Professionnels",
        forBusinessOwners: "Pour les Propriétaires d'Entreprises",

        // Category descriptions
        studentsDesc: "Services académiques et numériques qui rendent la vie scolaire plus facile et plus réussie.",
        professionalsDesc: "Matériaux numériques polis qui boostent la crédibilité et la visibilité dans votre carrière.",
        businessDesc: "Outils numériques essentiels et services de configuration pour développer votre entreprise en ligne.",

        // Student services
        internshipReport: "Rédaction de Rapport de Stage",
        internshipDesc: "Poli. Professionnel. Personnalisé. Transformez votre formation pratique en un document écrit professionnellement.",
        proofreading: "Correction et Édition",
        proofreadingDesc: "Nous vérifions votre grammaire, corrigeons la structure des phrases et formatons votre travail selon les directives académiques.",
        cvAssistance: "Assistance CV et Lettre de Motivation",
        cvDesc: "Laissez-nous rédiger ou améliorer vos documents pour vous aider à vous démarquer pour les bourses, stages et opportunités d'emploi.",
        applicationSupport: "Support de Formulaire de Candidature",
        applicationDesc: "Guidance à travers les candidatures en ligne à l'université ou aux bourses, y compris le téléchargement de documents.",

        // Professional services
        cvDesign: "Conception de CV Professionnel",
        cvDesignDesc: "CV propres et modernes qui mettent en valeur vos compétences et votre expérience dans un format visuellement attrayant.",
        coverLetter: "Rédaction de Lettre de Motivation Personnalisée",
        coverLetterDesc: "Lettres de motivation personnalisées adaptées à votre poste cible ou rôle.",

        // Business services
        websiteSetup: "Configuration de Site Web d'Entreprise",
        websiteDesc: "Un site web simple et propre avec compatibilité mobile, formulaires de contact, listes de services, et plus.",
        socialMedia: "Création de Page de Réseaux Sociaux",
        socialMediaDesc: "Nous créons ou mettons à niveau vos pages Facebook, Instagram ou LinkedIn avec des visuels de marque.",
        branding: "Conception de Logo et Image de Marque",
        brandingDesc: "Logos uniques, bannières sociales et conceptions de cartes de visite pour une identité cohérente.",

        // Package deals
        packageDeals: "Vous Cherchez un Forfait?",
        packageDesc: "Demandez-nous des bundles de services personnalisés pour les étudiants, professionnels ou entrepreneurs. Nous construirons une solution qui correspond à vos objectifs et votre budget.",

        // Contact section
        getStarted: "Besoin d'Aide pour Commencer?",
        getStartedDesc: "Nous sommes là pour vous assister. Que vous ayez besoin d'un service unique ou d'un support complet dans plusieurs domaines, contactez-nous pour une consultation gratuite.",

        // Contact page
        contactUs: "Contactez-nous",
        contactDesc: "Entrez en contact pour vos besoins numériques. Nous sommes là pour vous aider à réussir avec nos services numériques professionnels.",
        connectWithUs: "Connectez-vous Avec Nous",
        name: "Nom",
        message: "Message",
        sendMessage: "Envoyer le Message",

        // Account modal
        account: "Compte",
        login: "Connexion",
        register: "S'inscrire",
        email: "Email",
        password: "Mot de passe",

        // Footer
        footerText: "© 2023 D.Solution. Tous droits réservés.",

        // Portfolio
        ourWork: "Notre Travail"
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

// Function to update language
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update language selector
    const langSwitch = document.querySelector('#lang-switch');
    if (langSwitch) {
        langSwitch.value = lang;
    }

    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        titleElement.textContent = 'D.Solution';
    }

    // Update navigation
    const homeLink = document.querySelector('a[href="index.html"]:not(#logo-link)');
    if (homeLink) homeLink.textContent = translations[lang]?.home || translations['en'].home;

    const servicesLink = document.querySelector('a[href="services.html"]');
    if (servicesLink) servicesLink.textContent = translations[lang]?.services || translations['en'].services;

    const contactLink = document.querySelector('a[href="contact.html"]');
    if (contactLink) contactLink.textContent = translations[lang]?.contact || translations['en'].contact;

    // Update header welcome text
    const headerWelcome = document.querySelector('#header-welcome');
    if (headerWelcome) headerWelcome.textContent = translations[lang]?.welcome || translations['en'].welcome;

    // Update home page content
    const homeDesc = document.querySelector('#home-desc');
    if (homeDesc) homeDesc.textContent = translations[lang]?.welcomeDesc || translations['en'].welcomeDesc;

    const homeDesc2 = document.querySelector('#home-desc2');
    if (homeDesc2) homeDesc2.textContent = translations[lang]?.welcomeDesc2 || translations['en'].welcomeDesc2;

    const exploreBtn = document.querySelector('#explore-btn');
    if (exploreBtn) exploreBtn.textContent = translations[lang]?.exploreServices || translations['en'].exploreServices;

    // Update about section
    const aboutTitle = document.querySelector('#about h2');
    if (aboutTitle) aboutTitle.textContent = translations[lang]?.aboutTitle || translations['en'].aboutTitle;

    const aboutParas = document.querySelectorAll('#about p');
    if (aboutParas.length >= 2) {
        aboutParas[0].textContent = translations[lang]?.aboutDesc || translations['en'].aboutDesc;
        aboutParas[1].textContent = translations[lang]?.aboutDesc2 || translations['en'].aboutDesc2;
    }

    // Update services page content
    if (document.querySelector('#services h2')) document.querySelector('#services h2').textContent = translations[lang]?.ourServices || translations['en'].ourServices;
    if (document.querySelector('#services p')) document.querySelector('#services p').textContent = translations[lang]?.servicesDesc || translations['en'].servicesDesc;

    // Update package deal and help sections
    if (document.querySelector('#package-title')) document.querySelector('#package-title').textContent = translations[lang]?.packageTitle || translations['en'].packageTitle;
    if (document.querySelector('#package-desc')) document.querySelector('#package-desc').textContent = translations[lang]?.packageDesc || translations['en'].packageDesc;
    if (document.querySelector('#help-title')) document.querySelector('#help-title').textContent = translations[lang]?.helpTitle || translations['en'].helpTitle;
    if (document.querySelector('#help-desc')) document.querySelector('#help-desc').textContent = translations[lang]?.helpDesc || translations['en'].helpDesc;

    // Update category cards on services page
    const studentsCategory = document.querySelector('#students-category');
    if (studentsCategory) studentsCategory.textContent = translations[lang]?.forStudents || translations['en'].forStudents;

    const professionalsCategory = document.querySelector('#professionals-category');
    if (professionalsCategory) professionalsCategory.textContent = translations[lang]?.forProfessionals || translations['en'].forProfessionals;

    const businessCategory = document.querySelector('#business-category');
    if (businessCategory) businessCategory.textContent = translations[lang]?.forBusinessOwners || translations['en'].forBusinessOwners;

    // Update category descriptions
    const studentsCard = document.querySelector('#students-category').closest('.card-body');
    if (studentsCard) {
        const studentsDesc = studentsCard.querySelector('.card-text');
        if (studentsDesc) studentsDesc.textContent = translations[lang]?.studentsDesc || translations['en'].studentsDesc;
    }

    const professionalsCard = document.querySelector('#professionals-category').closest('.card-body');
    if (professionalsCard) {
        const professionalsDesc = professionalsCard.querySelector('.card-text');
        if (professionalsDesc) professionalsDesc.textContent = translations[lang]?.professionalsDesc || translations['en'].professionalsDesc;
    }

    const businessCard = document.querySelector('#business-category').closest('.card-body');
    if (businessCard) {
        const businessDesc = businessCard.querySelector('.card-text');
        if (businessDesc) businessDesc.textContent = translations[lang]?.businessDesc || translations['en'].businessDesc;
    }

    // Re-populate services with new language if on services page
    if (document.getElementById('services-catalog')) {
        const catalog = document.getElementById('services-catalog');
        catalog.innerHTML = ''; // Clear existing content
        populateServices(); // Re-populate with new language
    }

    // Services are now translated when created in populateServices()
    // No need to translate them again here

    // Update package deal section
    const packageTitle = document.querySelector('#services h4');
    if (packageTitle && packageTitle.textContent.includes('Package Deal')) packageTitle.textContent = translations[lang]?.packageDeals || translations['en'].packageDeals;

    const packageDesc = document.querySelectorAll('#services p');
    if (packageDesc.length > 1) {
        packageDesc[1].textContent = translations[lang]?.packageDesc || translations['en'].packageDesc;
    }

    // Update contact section
    const getStartedTitle = document.querySelectorAll('#services h4')[1];
    if (getStartedTitle && getStartedTitle.textContent.includes('Getting Started')) getStartedTitle.textContent = translations[lang]?.getStarted || translations['en'].getStarted;

    const getStartedDesc = document.querySelectorAll('#services p')[2];
    if (getStartedDesc) getStartedDesc.textContent = translations[lang]?.getStartedDesc || translations['en'].getStartedDesc;

    // Update contact page
    if (document.querySelector('#contact h2')) document.querySelector('#contact h2').textContent = translations[lang]?.contactUs || translations['en'].contactUs;
    if (document.querySelector('#contact p')) document.querySelector('#contact p').textContent = translations[lang]?.contactDesc || translations['en'].contactDesc;

    // Update contact form
    const connectTitle = document.querySelector('#connect-title');
    if (connectTitle) connectTitle.textContent = translations[lang]?.connectWithUs || translations['en'].connectWithUs;

    const nameLabel = document.querySelector('label[for="name"]');
    if (nameLabel) nameLabel.textContent = translations[lang]?.name || translations['en'].name;

    const messageLabel = document.querySelector('label[for="message"]');
    if (messageLabel) messageLabel.textContent = translations[lang]?.message || translations['en'].message;

    const sendBtn = document.querySelector('#contact button');
    if (sendBtn) sendBtn.textContent = translations[lang]?.sendMessage || translations['en'].sendMessage;

    // Update account modal
    if (document.querySelector('#accountModal .modal-title')) document.querySelector('#accountModal .modal-title').textContent = translations[lang]?.account || translations['en'].account;
    if (document.querySelector('label[for="email"]')) document.querySelector('label[for="email"]').textContent = translations[lang]?.email || translations['en'].email;
    if (document.querySelector('label[for="password"]')) document.querySelector('label[for="password"]').textContent = translations[lang]?.password || translations['en'].password;
    if (document.querySelector('#registerBtn')) document.querySelector('#registerBtn').textContent = translations[lang]?.register || translations['en'].register;

    // Update footer
    const footerText = document.querySelector('footer p');
    if (footerText) footerText.textContent = translations[lang]?.footerText || translations['en'].footerText;
}

// Populate services
function populateServices() {
    const catalog = document.getElementById('services-catalog');

    // Define service structure with translation keys
    const serviceCategories = [
        {
            key: 'forStudents',
            services: [
                { titleKey: 'internshipReport', descKey: 'internshipDesc', price: 'Starting from $50' },
                { titleKey: 'proofreading', descKey: 'proofreadingDesc', price: 'Starting from $20' },
                { titleKey: 'cvAssistance', descKey: 'cvDesc', price: 'Starting from $30' },
                { titleKey: 'applicationSupport', descKey: 'applicationDesc', price: 'Starting from $25' }
            ]
        },
        {
            key: 'forProfessionals',
            services: [
                { titleKey: 'cvDesign', descKey: 'cvDesignDesc', price: 'Starting from $40' },
                { titleKey: 'coverLetter', descKey: 'coverLetterDesc', price: 'Starting from $25' }
            ]
        },
        {
            key: 'forBusinessOwners',
            services: [
                { titleKey: 'websiteSetup', descKey: 'websiteDesc', price: 'Starting from $200' },
                { titleKey: 'socialMedia', descKey: 'socialMediaDesc', price: 'Starting from $50' },
                { titleKey: 'branding', descKey: 'brandingDesc', price: 'Starting from $100' }
            ]
        }
    ];

    serviceCategories.forEach((category, categoryIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-5';

        // Get translated category title
        const categoryTitle = translations[currentLang]?.[category.key] || translations['en'][category.key];
        categoryDiv.innerHTML = `<h3 class="text-center mb-4">${categoryTitle}</h3>`;

        const row = document.createElement('div');
        row.className = 'row';

        category.services.forEach((service, serviceIndex) => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';

            // Get translated service content
            const serviceTitle = translations[currentLang]?.[service.titleKey] || translations['en'][service.titleKey];
            const serviceDesc = translations[currentLang]?.[service.descKey] || translations['en'][service.descKey];

            // Create unique service ID
            const serviceId = categoryIndex * 10 + serviceIndex + 1;

            card.innerHTML = `
                <div class="card service-card" data-service-id="${serviceId}">
                    <div class="card-body">
                        <h5 class="card-title">${serviceTitle}</h5>
                        <p class="card-text">${serviceDesc}</p>
                        <p class="text-primary fw-bold">${service.price}</p>
                    </div>
                </div>
            `;
            row.appendChild(card);
        });

        categoryDiv.appendChild(row);
        catalog.appendChild(categoryDiv);
    });

    // Add package deal and contact sections
    const packageDiv = document.createElement('div');
    packageDiv.className = 'text-center mt-5';
    const packageTitle = translations[currentLang]?.packageDeals || translations['en'].packageDeals;
    const packageDesc = translations[currentLang]?.packageDesc || translations['en'].packageDesc;
    const getStartedTitle = translations[currentLang]?.getStarted || translations['en'].getStarted;
    const getStartedDesc = translations[currentLang]?.getStartedDesc || translations['en'].getStartedDesc;

    packageDiv.innerHTML = `
        <h4>${packageTitle}</h4>
        <p>${packageDesc}</p>
        <h4>${getStartedTitle}</h4>
        <p>${getStartedDesc}</p>
    `;
    catalog.appendChild(packageDiv);
}

// Show service modal
function showServiceModal(serviceId) {
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalBody = document.getElementById('serviceModalBody');

    if (modalTitle && modalBody) {
        // Find service data based on serviceId
        let serviceData = null;
        let categoryName = '';

        const serviceCategories = [
            {
                key: 'forStudents',
                services: [
                    { titleKey: 'internshipReport', descKey: 'internshipDesc', price: 'Starting from $50' },
                    { titleKey: 'proofreading', descKey: 'proofreadingDesc', price: 'Starting from $20' },
                    { titleKey: 'cvAssistance', descKey: 'cvDesc', price: 'Starting from $30' },
                    { titleKey: 'applicationSupport', descKey: 'applicationDesc', price: 'Starting from $25' }
                ]
            },
            {
                key: 'forProfessionals',
                services: [
                    { titleKey: 'cvDesign', descKey: 'cvDesignDesc', price: 'Starting from $40' },
                    { titleKey: 'coverLetter', descKey: 'coverLetterDesc', price: 'Starting from $25' }
                ]
            },
            {
                key: 'forBusinessOwners',
                services: [
                    { titleKey: 'websiteSetup', descKey: 'websiteDesc', price: 'Starting from $200' },
                    { titleKey: 'socialMedia', descKey: 'socialMediaDesc', price: 'Starting from $50' },
                    { titleKey: 'branding', descKey: 'brandingDesc', price: 'Starting from $100' }
                ]
            }
        ];

        let currentId = 1;
        for (const category of serviceCategories) {
            for (const service of category.services) {
                if (currentId === serviceId) {
                    serviceData = service;
                    categoryName = translations[currentLang]?.[category.key] || translations['en'][category.key];
                    break;
                }
                currentId++;
            }
            if (serviceData) break;
        }

        if (serviceData) {
            const serviceTitle = translations[currentLang]?.[serviceData.titleKey] || translations['en'][serviceData.titleKey];
            const serviceDesc = translations[currentLang]?.[serviceData.descKey] || translations['en'][serviceData.descKey];

            modalTitle.textContent = serviceTitle;
            modalBody.innerHTML = `
                <p><strong>${categoryName}</strong></p>
                <p>${serviceDesc}</p>
                <p><strong>Price: ${serviceData.price}</strong></p>
            `;
            const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
            modal.show();
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Debug logo loading
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        logoImg.addEventListener('load', () => {
            console.log('Logo loaded successfully');
        });
        logoImg.addEventListener('error', () => {
            console.log('Logo failed to load, showing fallback text');
        });
    }

    if (document.getElementById('services-catalog')) {
        populateServices();
    }
    updateLanguage(currentLang);

    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        // Set initial value
        langSwitch.value = currentLang;

        langSwitch.addEventListener('change', (e) => {
            const newLang = e.target.value;
            updateLanguage(newLang);
        });
    }

    const servicesCatalog = document.getElementById('services-catalog');
    if (servicesCatalog) {
        servicesCatalog.addEventListener('click', (e) => {
            if (e.target.closest('.service-card')) {
                const serviceId = parseInt(e.target.closest('.service-card').dataset.serviceId);
                showServiceModal(serviceId);
            }
        });
    }

    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('accountModal'));
            modal.show();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            // Simple demo: store in localStorage
            localStorage.setItem('user', JSON.stringify({ email, password }));
            alert('Logged in successfully!');
            bootstrap.Modal.getInstance(document.getElementById('accountModal')).hide();
        });
    }

    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            // For demo, just alert
            alert('Registration feature coming soon!');
        });
    }
});