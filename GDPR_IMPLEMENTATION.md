# GDPR Compliance Implementation

## Overview

This website has been implemented with GDPR compliance in mind, following the simplest possible approach while ensuring user privacy and data protection.

## Implementation Details

### 🍪 Cookie Banner
- **Component**: `GDPRBanner.tsx`
- **Features**:
  - Simple accept button (no reject needed as we only use essential cookies)
  - Blurs entire site until user accepts
  - **Smart storage**: Uses localStorage (normal mode) or sessionStorage (private mode)
  - **Terms versioning**: Shows banner again when terms are updated
  - **Private mode support**: Always shows in new private tabs until accepted
  - Stores consent with timestamp and terms version
  - Only essential cookies for basic functionality

### 🔒 Privacy Information
- **Page**: `/privacy` - Dedicated Privacy Policy page
- **Displays**:
  - What data we collect (only contact form data)
  - Why we collect it (communication purposes only)
  - Who we share with (nobody)
  - How long we keep it (email only, deletable on request)
  - User rights under GDPR
  - Contact information for privacy inquiries

### 📋 Terms of Use
- **Page**: `/terms` - Dedicated Terms of Use page
- **Displays**:
  - Acceptance of terms
  - Intellectual property rights (with strong Open Huts protection)
  - Contact form usage terms
  - Website disclaimer
  - Project protection section (highlighted)
  - Last updated information
  - Contact information for terms inquiries

### 📧 Contact Form Enhancements
- **Explicit Consent**: Required checkbox before submission
- **Data Sanitization**: Input length limits and trimming
- **Consent Logging**: Timestamp of consent included in emails
- **Security**: Reset consent after successful submission

### 🌍 Multi-language Support
- Full translations for EN, ES, FR, DE
- Privacy information available in user's preferred language
- GDPR banner text localized

## Data Processing

### What We Collect
- Name (max 100 chars)
- Email address (max 255 chars)  
- Message content (max 2000 chars)
- Consent timestamp
- Form submission time

### How We Process It
1. **Client-side**: Basic validation and sanitization
2. **Transmission**: Secure HTTPS via EmailJS service
3. **Storage**: No server-side storage, only email delivery
4. **Retention**: Emails kept in personal email for communication

### User Rights
Users can request:
- Access to their data
- Correction of their data
- Deletion of their data
- Data portability (though minimal data is collected)

## Technical Security Measures

### Input Validation
- Length limits on all fields
- Email format validation
- Trim whitespace
- No HTML/script injection protection

### Consent Management
- Explicit opt-in required
- Timestamp logging
- Clear privacy information
- No pre-checked boxes

### Data Minimization
- Only collect necessary information
- No tracking scripts
- No analytics cookies
- No third-party integrations except EmailJS

## Compliance Notes

### Legal Basis
- **Article 6(1)(a)**: Consent for processing personal data
- **Article 6(1)(f)**: Legitimate interest for essential website functionality

### Data Protection Principles
✅ **Lawfulness**: Clear consent obtained  
✅ **Fairness**: Transparent about data use  
✅ **Transparency**: Clear privacy information  
✅ **Purpose Limitation**: Only for communication  
✅ **Data Minimization**: Only necessary data  
✅ **Accuracy**: User-provided data only  
✅ **Storage Limitation**: No unnecessary retention  
✅ **Security**: HTTPS and input validation  
✅ **Accountability**: This documentation  

## Contact for Data Requests

Users can contact the site owner directly through the provided contact methods to exercise their GDPR rights.

## Updates

### Terms Version Management
When you update the Terms of Use or Privacy Policy:
1. Open `components/ui/GDPRBanner.tsx`
2. Update `CURRENT_TERMS_VERSION` constant (e.g., '2024.12.2')
3. This will automatically show the GDPR banner to all users again

### Review Schedule
This implementation should be reviewed annually or when:
- Privacy laws change
- New data processing activities are added
- Third-party services are integrated
- User feedback indicates privacy concerns
- Terms of Use or Privacy Policy are updated

---

**Last Updated**: [Current Date]  
**GDPR Compliance**: Implemented with minimal data collection approach  
**Review Date**: Annual review recommended
