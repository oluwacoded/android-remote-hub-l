# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker.

Please include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Best Practices

### Backend
- Always use HTTPS
- Validate all inputs
- Use environment variables for secrets
- Implement rate limiting
- Log security events
- Regular dependency updates

### Frontend
- Sanitize user input
- Use Content Security Policy
- Store tokens securely
- Validate before sending to server

### Android App
- Request minimal permissions
- Encrypt sensitive data
- Validate server certificates
- Clear sensitive data on logout

## Dependency Updates

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Update major versions
npm install -g npm-check-updates
ncu -u
npm install
```

## SSL/TLS

- Always use HTTPS in production
- Use valid SSL certificates
- Enable HSTS header
- Keep certificates updated

---

Security is a shared responsibility!
