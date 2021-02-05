//import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
//import fetch from 'node-fetch';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

// Definimos a donde nos conectamos
//const httpLink = createHttpLink({
const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    fetch
});

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    //link: httpLink
    link: authLink.concat(httpLink),
});

export default client;