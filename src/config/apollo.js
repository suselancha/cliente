import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
//import fetch from 'node-fetch';

// Definimos a donde nos conectamos
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLink
});

export default client;