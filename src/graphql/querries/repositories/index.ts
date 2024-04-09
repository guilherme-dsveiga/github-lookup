import { gql } from "@apollo/client";

export const GET_REPOSITORIES_QUERY = gql`
  query SearchRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 20, after: $cursor) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            description
            url
            owner {
              avatarUrl
              login
            }
            primaryLanguage {
              color
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO_QUERY = gql`
  query GetRepositoryInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      createdAt
      updatedAt
      url
      owner {
        login
      }
      primaryLanguage {
        name
        color
      }
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      defaultBranchRef {
        target {
          ... on Commit {
            tree {
              entries {
                name
                object {
                  ... on Blob {
                    text
                  }
                }
              }
            }
            history {
              totalCount
            }
          }
        }
      }
      issues(states: OPEN) {
        totalCount
      }
      pullRequests(states: OPEN) {
        totalCount
      }
    }
  }
`;
