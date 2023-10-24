# Vue.js: Fullstack e-commerce site

This project uses 
- Vue.js to build a simple front end
- Node.js and MongoDB to construct the back end
- Axios to communicate between the front and back ends
- Authentication with Firebase Authentication
- Frameworks and tools to correctly configure the site, including Postman and Express.

# Deployment

The Front-End is deployed statically using render.com.
When changes are made in the front-end follow the steps:
1. run "npm run build"
2. Replace dist-folder in back-end directory with newly generated dist in front-end
3. Commit and push

Connection to MongdoDb is achieved by utilizing environment variable stored in render dashboard.

#  Suggestions for improvement
- Update cart: As of right now, every update to the cart is routed through API calls. To enhance performance, this behavior should be substituted by state management in the front-end
- Counter: the app does not have the feature of counting items in the cart and therefor no indicator at ProductDetailPage to display the amount of the specific item already placed in the cart