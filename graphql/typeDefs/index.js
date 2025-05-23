const { gql } = require('apollo-server');

const typeDefs = gql`
  # ---------- Tipos ----------
  type Poet {
    poet_code: ID!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
  }

  type Poem {
    poem_code: ID!
    poem_title: String!
    poem_contents: String
    poet_code: Int!
  }

  type Customer {
    customer_code: ID!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
  }

  type Sale {
    sale_code: ID!
    date: String
    amount: Float!
    customer_code: Int!
  }

  type Publication {
    publication_code: ID!
    title: String!
    price: Float!
  }

  type PoemPublication {
    poem_code: Int!
    publication_code: Int!
  }

  type SalePublication {
    sale_code: Int!
    publication_code: Int!
  }

  type PoetPoem {
    poet_code: Int
    first_name: String
    surname: String
    poem_code: Int
    poem_title: String
  }

  type SaleCustomer {
    sale_code: Int
    date: String
    amount: Float
    customer_code: Int
    first_name: String
    surname: String
}

  type PublicationPoem {
    publication_code: Int
    title: String
    poem_code: Int
    poem_title: String
}

  # ---------- Consultas ----------
  type Query {
    poets: [Poet!]!
    poems: [Poem!]!
    customers: [Customer!]!
    sales: [Sale!]!
    publications: [Publication!]!
    poemPublications: [PoemPublication!]!
    salePublications: [SalePublication!]!
    getPoetPoems: [PoetPoem!]!
    getSaleCustomer: [SaleCustomer!]!
    getPublicationPoem: [PublicationPoem!]!
  }

  # ---------- Mutaciones ----------
  type Mutation {
    # -- Poets --
    addPoet(
      first_name: String!,
      surname: String!,
      address: String,
      postcode: String,
      telephone_number: String
    ): Poet!

    updatePoet(
      poet_code: ID!,
      first_name: String,
      surname: String,
      address: String,
      postcode: String,
      telephone_number: String
    ): Poet!

    # -- Poems --
    addPoem(
      poem_title: String!,
      poem_contents: String!,
      poet_code: Int!
    ): Poem!

    updatePoem(
      poem_code: ID!,
      poem_title: String,
      poem_contents: String,
      poet_code: Int
    ): Poem!

    # -- Customers --
    addCustomer(
      first_name: String!,
      surname: String!,
      address: String,
      postcode: String,
      telephone_number: String
    ): Customer!

    updateCustomer(
      customer_code: ID!,
      first_name: String,
      surname: String,
      address: String,
      postcode: String,
      telephone_number: String
    ): Customer!

    # -- Sales --
    addSale(
      date: String!,
      amount: Float!,
      customer_code: Int!
    ): Sale!

    updateSale(
      sale_code: ID!,
      date: String,
      amount: Float,
      customer_code: Int
    ): Sale!

    # -- Publications --
    addPublication(
      title: String!,
      price: Float!
    ): Publication!

    updatePublication(
      publication_code: ID!,
      title: String,
      price: Float
    ): Publication!

    # -- Poem_Publication --
    addPoemPublication(
      poem_code: Int!,
      publication_code: Int!
    ): PoemPublication!

    deletePoemPublication(
      poem_code: Int!,
      publication_code: Int!
    ): Int!

    # -- Sale_Publication --
    addSalePublication(
      sale_code: Int!,
      publication_code: Int!
    ): SalePublication!

    deleteSalePublication(
      sale_code: Int!,
      publication_code: Int!
    ): Int!
  }
`;

module.exports = typeDefs;