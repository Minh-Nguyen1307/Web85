import http from 'http';
import { customers } from './data.js';

const application = http.createServer((request, response) => {
    const endpoint = request.url;
    const method = request.method;

    switch (endpoint) {
        case '/':
            
            response.end('Hi');
            break;

        case '/customers':
            if (method === "GET") {
                
                response.end(JSON.stringify(customers));
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
    console.log('Server is running on port 8080!');
});
