/**
 * API Client Pattern
 * Standard patterns for API integration with error handling, retry logic, and authentication
 */

class APIClient {
    constructor(baseURL = '/api/v1') {
        this.baseURL = baseURL;
        this.authToken = localStorage.getItem('authToken');
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1 second
        this.timeout = 10000; // 10 seconds
    }

    /**
     * Base request method with error handling and retry logic
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`,
                ...options.headers
            }
        };

        // Add timeout using AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        config.signal = controller.signal;

        let lastError;
        
        // Retry logic
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            try {
                const response = await fetch(url, config);
                clearTimeout(timeoutId);
                
                // Handle different response statuses
                if (!response.ok) {
                    const error = await this.handleErrorResponse(response);
                    
                    // Don't retry on client errors (4xx)
                    if (response.status >= 400 && response.status < 500) {
                        throw error;
                    }
                    
                    lastError = error;
                    
                    // Retry on server errors (5xx)
                    if (attempt < this.maxRetries) {
                        await this.delay(this.retryDelay * (attempt + 1));
                        continue;
                    }
                }
                
                // Parse response
                const data = await response.json();
                
                // Handle rate limiting
                this.handleRateLimit(response);
                
                return {
                    success: true,
                    data,
                    status: response.status
                };
                
            } catch (error) {
                clearTimeout(timeoutId);
                
                // Handle network errors
                if (error.name === 'AbortError') {
                    lastError = new Error('Request timeout');
                } else {
                    lastError = error;
                }
                
                // Retry on network errors
                if (attempt < this.maxRetries) {
                    await this.delay(this.retryDelay * (attempt + 1));
                    continue;
                }
            }
        }
        
        // All retries failed
        return {
            success: false,
            error: lastError.message || 'Unknown error occurred',
            status: lastError.status || 0
        };
    }

    /**
     * Handle error responses
     */
    async handleErrorResponse(response) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
        }
        
        const error = new Error(errorMessage);
        error.status = response.status;
        return error;
    }

    /**
     * Handle rate limiting
     */
    handleRateLimit(response) {
        const remainingRequests = response.headers.get('X-RateLimit-Remaining');
        const resetTime = response.headers.get('X-RateLimit-Reset');
        
        if (remainingRequests && parseInt(remainingRequests) < 10) {
            console.warn(`Rate limit warning: ${remainingRequests} requests remaining`);
        }
        
        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
        }
    }

    /**
     * Delay helper for retry logic
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * GET request
     */
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        return this.request(url, {
            method: 'GET'
        });
    }

    /**
     * POST request
     */
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     */
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    /**
     * PATCH request
     */
    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    /**
     * Upload file
     */
    async uploadFile(endpoint, file, additionalData = {}) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Add additional data to form
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });
        
        return this.request(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type for FormData
                'Authorization': `Bearer ${this.authToken}`
            }
        });
    }

    /**
     * Batch requests
     */
    async batch(requests) {
        const promises = requests.map(req => {
            const method = req.method || 'GET';
            return this[method.toLowerCase()](req.endpoint, req.data);
        });
        
        return Promise.allSettled(promises);
    }

    /**
     * Update auth token
     */
    setAuthToken(token) {
        this.authToken = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }
}

// Specialized API clients for different domains
class MetricsAPI extends APIClient {
    constructor() {
        super('/api/v1/metrics');
    }

    async getDashboardData() {
        return this.get('/dashboard');
    }

    async getTrafficData(period = '30d') {
        return this.get('/traffic', { period });
    }

    async getKeywordRankings(limit = 100) {
        return this.get('/keywords/rankings', { limit });
    }
}

class ContentAPI extends APIClient {
    constructor() {
        super('/api/v1/content');
    }

    async createContent(data) {
        return this.post('/', data);
    }

    async updateContent(id, data) {
        return this.put(`/${id}`, data);
    }

    async publishContent(id) {
        return this.post(`/${id}/publish`);
    }

    async getContentPerformance(id) {
        return this.get(`/${id}/performance`);
    }
}

// Usage example:
const api = new APIClient();
const metricsAPI = new MetricsAPI();
const contentAPI = new ContentAPI();

// Example with error handling
async function fetchDashboardData() {
    const result = await metricsAPI.getDashboardData();
    
    if (result.success) {
        console.log('Dashboard data:', result.data);
        return result.data;
    } else {
        console.error('Failed to fetch dashboard data:', result.error);
        // Show error to user
        showErrorNotification(result.error);
        return null;
    }
}

// Example with loading states
async function createNewContent(contentData) {
    // Show loading state
    showLoadingSpinner();
    
    try {
        const result = await contentAPI.createContent(contentData);
        
        if (result.success) {
            showSuccessNotification('Content created successfully');
            return result.data;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        showErrorNotification(error.message);
        return null;
    } finally {
        hideLoadingSpinner();
    }
}

// Export for use in other modules
export { APIClient, MetricsAPI, ContentAPI };