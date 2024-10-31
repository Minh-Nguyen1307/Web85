import http from 'http';
import { customers, products, orders } from './data.js';

const application = http.createServer((request, response) => {
    const endpoint = request.url;
    const method = request.method;
    const customerIdMatch = endpoint.match (/^\/customers\/([a-zA-Z0-9]+)$/)
    let customerId;
    if (customerIdMatch) {
        customerId = customerIdMatch[1];
    }

    switch (true) {
        case '/':
            
            response.end('Hi');
            break;

        case customerId && method === 'GET':
            const customer = customers.find(c => c.id === customerId);
            if (customer) {
                
                response.end(JSON.stringify(customer));
            } else {
               
                response.end(JSON.stringify({ error: 'Method not allowed' }));
            }
            break;

        default:
           
            response.end('404 Not Found');
            break;
    }
});

application.listen(8080, () => {
    console.log('Server is running!');
});