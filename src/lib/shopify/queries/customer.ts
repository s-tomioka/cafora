const ORDER_FIELDS = `
  id
  name
  orderNumber
  processedAt
  fulfillmentStatus
  financialStatus
  currentTotalPrice {
    amount
    currencyCode
  }
  lineItems(first: 50) {
    edges {
      node {
        title
        quantity
        variant {
          id
          title
          selectedOptions {
            name
            value
          }
          product {
            handle
            title
          }
        }
        customAttributes {
          key
          value
        }
        originalTotalPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const CUSTOMER_CREATE = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_CUSTOMER = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            ${ORDER_FIELDS}
          }
        }
      }
    }
  }
`;
