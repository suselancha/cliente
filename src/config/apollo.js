import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
//import fetch from 'node-fetch';
import { createUploadLink } from 'apollo-upload-client';

// Definimos a donde nos conectamos
//const httpLink = createHttpLink({
const httpLink = createUploadLink({
    uri: 'http://localhost:4000/',
    fetch
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLink
});

export default client;