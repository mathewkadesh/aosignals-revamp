# Data processing inventory — code audit

Status: implementation audit, requires operational confirmation.

| Area | Detected implementation | Data/technology | Status required |
|---|---|---|---|
| Contact and bot waitlist | Front-end forms only | Name, email, topic, message | Confirm backend, email provider, storage and retention |
| Login | Demonstration form; submit prevented | Email and password entered locally | Confirm authentication provider before launch |
| Checkout/payment | Not detected | None in current app | Confirm processor and flow before enabling |
| Analytics/pixels | Not detected | None | Keep blocked unless added with consent |
| Cookie consent | First-party local storage | `aos-consent-v1` | Necessary; version 1.0 |
| Live gold data | XAUS public API | Browser request metadata may reach XAUS | Confirm provider privacy and transfer position |
| News | GDELT DOC API | Browser request metadata may reach GDELT | Confirm provider privacy and transfer position |
| Social links | External links only | Data passes after user follows link | Third-party notice applies |
| Embedded video/chat/newsletter/CRM/error logging | Not detected | None | Update inventory before adding |
| Hosting/request logs | Provider not confirmed | IP, user agent and security logs may exist | Confirm provider, location and retention |

No claim is made that optional services or providers are UK-based, PCI compliant or already contracted.
