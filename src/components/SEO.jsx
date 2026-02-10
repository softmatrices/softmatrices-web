import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, type = 'website', name = 'Softmatrices', image = '/images/og-image.png', url = 'https://softmatrices.com/' }) => {
    // Aggressive, high-CTR defaults
    const defaultTitle = 'Softmatrices | Top-Rated Software Development & IT Solutions';
    const defaultDescription = '🚀 Transform your business with Softmatrices. We are experts in Custom App Development, Cloud, & AI. Get a Free Consultation & Quote Today!';
    const defaultKeywords = 'Software Development, Custom App Development, IT Solutions, Cloud Computing, AI Integration, Enterprise Software, Web Development, Mobile Apps';

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://softmatrices.com/"
        }]
    };

    // FAQ Schema - Aggressive "highlighting" in SERPs
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What services does Softmatrices offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We specialize in end-to-end Custom App Development, Cloud Infrastructure (AWS/Azure/GCP), Enterprise Security Consulting, and Advanced AI/ML Integration to automate your business processes."
                }
            },
            {
                "@type": "Question",
                "name": "Why choose Softmatrices for software development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Softmatrices provides 24/7 support, a 99.9% uptime guarantee, and rapid delivery. Our expert team ensures high-quality, scalable solutions tailored to your business needs."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer custom AI solutions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We integrate cutting-edge AI and Machine Learning models into your applications to provide predictive analytics, process automation, and intelligent decision-making capabilities."
                }
            },
            {
                "@type": "Question",
                "name": "How quickly can you deliver a project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We follow an agile methodology for rapid delivery without compromising quality. Our typical response time is under 24 hours, and we pride ourselves on meeting fast-paced deadlines."
                }
            }
        ]
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | ${name}` : defaultTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            <meta name='keywords' content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title ? `${title} | ${name}` : defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | ${name}` : defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* Structured Data for "Highlighting" */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
        </Helmet>
    );
}

export default SEO;
