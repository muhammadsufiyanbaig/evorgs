"use client";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from Zustand persist storage
  let token = null;
  
  if (typeof window !== 'undefined') {
    try {
      // Zustand persist stores data with key 'auth-storage'
      const authStorage = localStorage.getItem('auth-storage');
      console.log('🔍 Apollo authLink - localStorage auth-storage:', authStorage ? 'Found' : 'Not found');
      
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed.state?.token || null;
        console.log('🔑 Apollo authLink - Token extracted:', token ? `${token.substring(0, 30)}...` : 'NO TOKEN');
      } else {
        console.warn('⚠️ Apollo authLink - No auth-storage in localStorage');
      }
    } catch (error) {
      console.error('❌ Failed to parse auth token:', error);
    }
  }
  
  // Log the final authorization header
  console.log('📡 Apollo authLink - Setting authorization header:', token ? `Bearer ${token.substring(0, 30)}...` : 'NO BEARER TOKEN');
  
  // Log full headers for debugging
  const finalHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
  console.log('📋 All request headers:', finalHeaders);
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: finalHeaders
  }
});

// Error link to catch and log all errors
const errorLink = onError((errorResponse: any) => {
  console.log('🔴 Apollo Error Link Triggered');
  console.log('Operation:', errorResponse.operation?.operationName);
  console.log('Variables:', errorResponse.operation?.variables);
  console.log('Full Error Response:', errorResponse);
  
  const { graphQLErrors, networkError } = errorResponse;
  
  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach((err: any) => {
      console.error('🔴 GraphQL Error:', {
        message: err.message,
        locations: err.locations,
        path: err.path,
        extensions: err.extensions
      });
    });
  }

  if (networkError) {
    console.error('🔴 Network Error:', networkError);
    console.error('Network Error Message:', networkError.message);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    },
    mutate: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    }
  }
});

export default client;
