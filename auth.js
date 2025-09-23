// Authentication configuration
const AUTH_CONFIG = {
    // Default credentials - In production, this should be connected to a secure backend
    users: [
        {
            username: 'admin',
            password: 'eufy2025',
            role: 'admin'
        },
        {
            username: 'user',
            password: 'geo123',
            role: 'user'
        },
        {
            username: 'demo',
            password: 'demo123',
            role: 'viewer'
        }
    ],
    
    // Session timeout in milliseconds (30 minutes)
    sessionTimeout: 30 * 60 * 1000,
    
    // Maximum login attempts
    maxAttempts: 5,
    
    // Lock duration in milliseconds (5 minutes)
    lockDuration: 5 * 60 * 1000
};

// Track login attempts
let loginAttempts = {};

// Authentication function
function authenticate(username, password) {
    // Check if account is locked
    const attemptKey = `attempts_${username}`;
    const lockKey = `locked_${username}`;
    
    if (localStorage.getItem(lockKey)) {
        const lockTime = parseInt(localStorage.getItem(lockKey));
        const now = Date.now();
        
        if (now < lockTime + AUTH_CONFIG.lockDuration) {
            const remainingTime = Math.ceil((lockTime + AUTH_CONFIG.lockDuration - now) / 60000);
            showError(`Account locked. Please try again in ${remainingTime} minutes.`);
            return false;
        } else {
            // Unlock account
            localStorage.removeItem(lockKey);
            localStorage.removeItem(attemptKey);
        }
    }
    
    // Find user
    const user = AUTH_CONFIG.users.find(u => u.username === username);
    
    if (!user || user.password !== password) {
        // Track failed attempt
        const attempts = parseInt(localStorage.getItem(attemptKey) || '0') + 1;
        localStorage.setItem(attemptKey, attempts.toString());
        
        if (attempts >= AUTH_CONFIG.maxAttempts) {
            // Lock account
            localStorage.setItem(lockKey, Date.now().toString());
            showError(`Too many failed attempts. Account locked for ${AUTH_CONFIG.lockDuration / 60000} minutes.`);
        } else {
            showError(`Invalid credentials. ${AUTH_CONFIG.maxAttempts - attempts} attempts remaining.`);
        }
        
        return false;
    }
    
    // Success - clear attempts
    localStorage.removeItem(attemptKey);
    
    // Set session data
    const sessionData = {
        username: user.username,
        role: user.role,
        loginTime: Date.now()
    };
    
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
    
    return true;
}

// Check if user is authenticated
function isAuthenticated() {
    const session = sessionStorage.getItem('userSession');
    const persistentAuth = localStorage.getItem('isAuthenticated');
    
    if (!session && !persistentAuth) {
        return false;
    }
    
    if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        // Check if session expired
        if (now - sessionData.loginTime > AUTH_CONFIG.sessionTimeout) {
            logout();
            return false;
        }
        
        // Update session time
        sessionData.lastActivity = now;
        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
    }
    
    return true;
}

// Get current user info
function getCurrentUser() {
    const session = sessionStorage.getItem('userSession');
    if (session) {
        return JSON.parse(session);
    }
    return null;
}

// Logout function
function logout() {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'login.html';
}

// Check authentication on protected pages
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Reset session timer on activity
function resetSessionTimer() {
    const session = sessionStorage.getItem('userSession');
    if (session) {
        const sessionData = JSON.parse(session);
        sessionData.lastActivity = Date.now();
        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
    }
}

// Add activity listeners
if (typeof window !== 'undefined') {
    // Reset timer on user activity
    ['click', 'keypress', 'mousemove', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetSessionTimer, { passive: true });
    });
    
    // Check session periodically
    setInterval(() => {
        if (window.location.pathname !== '/login.html' && !window.location.pathname.endsWith('login.html')) {
            if (!isAuthenticated()) {
                alert('Your session has expired. Please login again.');
                logout();
            }
        }
    }, 60000); // Check every minute
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        authenticate,
        isAuthenticated,
        getCurrentUser,
        logout,
        requireAuth
    };
}