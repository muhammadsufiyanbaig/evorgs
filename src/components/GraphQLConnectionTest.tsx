"use client";

import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const HEALTH_CHECK = gql`
  query HealthCheck {
    __typename
  }
`;

export function GraphQLConnectionTest() {
  const { data, loading, error } = useQuery(HEALTH_CHECK);

  if (loading) return <div className="text-blue-600">Testing GraphQL connection...</div>;
  if (error) return <div className="text-red-600">GraphQL Error: {error.message}</div>;
  if (data) return <div className="text-green-600">✅ GraphQL connection successful!</div>;

  return null;
}
