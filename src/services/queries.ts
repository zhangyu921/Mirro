import gql from 'graphql-tag';

const { user, organization, repository } = window.config;

export const GET_USER_INFO = gql`
  {
    user(login: "${user}") {
      name
      avatarUrl
      email
      websiteUrl
      url
      bio
      login
    }
  }
`;

export const GET_ORGANIZATION_INFO = gql`
  {
    organization(login: "${organization}") {
      name
      login
      avatarUrl
      organizationBillingEmail
      url
    }
  }
`;

export const GET_POSTS_LIST = gql`
  query(
    $before: String
    $after: String
    $last: Int
    $first: Int
    $order: IssueOrderField!
  ){
    repository(owner: "${user}", name:"${repository}") {
      issues(
        before: $before
        after: $after
        last:$last
        first: $first
        states: OPEN
        orderBy: {
          field: $order
          direction: DESC
        }
      ){
        totalCount
        pageInfo{
          hasPreviousPage
          startCursor
          hasNextPage
          endCursor
        }
        edges {
          node {
            number
            title
            author {
              avatarUrl
              login
              url
            }
            createdAt
            labels(first: 3) {
              edges {
                node {
                  color
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query($number: Int!){
    repository(owner: "${user}", name: "${repository}") {
      issue(number: $number) {
        title
        author {
          avatarUrl
          login
          url
        }
        bodyHTML
        updatedAt
        labels(first: 3) {
          edges {
            node {
              color
              name
            }
          }
        }
        number
        comments {
          totalCount
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query(
    $number: Int!
    $first: Int
    $after: String
  ){
    repository(owner: "${user}", name: "${repository}") {
      issue(number: $number) {
        number
        comments(
          first: $first
          after: $after
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          edges {
            node {
              updatedAt
              bodyHTML
              author {
                avatarUrl
                login
                url
              }
            }
          }
        }
      }
    }
  }
`;
