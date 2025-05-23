const db = require('../../database/db');

const resolvers = {
  Query: {
    // -- Selects de tablas --
    poets: async () => await db.select().table('Poet'),

    poems: async () => await db.select().table('Poem'),

    customers: async () => await db.select().table('Customer'),

    sales: async () => {
      const rows = await db.select().table('Sale');
      return rows.map(row => ({
        ...row,
        date: new Date(row.date).toISOString().split('T')[0]
      }));
    },

    publications: async () => await db.select().table('Publication'),

    poemPublications: async () => await db.select().table('Poem_Publication'),

    salePublications: async () => await db.select().table('Sale_Publication'),

    // -- Procedimientos almacenados --
    getPoetPoems: async () => {
      const result = await db.raw('CALL getPoetPoems()');
      return result[0][0];
    },

    getSaleCustomer: async () => {
      const result = await db.raw('CALL getSaleCustomer()');
      const rows = result[0][0];
      return rows.map(row => ({
        ...row,
        date: new Date(row.date).toISOString().split('T')[0]
      }));
    },

    getPublicationPoem: async () => {
      const result = await db.raw('CALL getPublicationPoem()');
      return result[0][0];
    },
  },

  Mutation: {
    // -- Poets --
    addPoet: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [poet_code] = await db('Poet').insert({ first_name, surname, address, postcode, telephone_number });
      return await db('Poet').where({ poet_code }).first();
    },

    updatePoet: async (_, { poet_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Poet').where({ poet_code }).update({ first_name, surname, address, postcode, telephone_number });
      return await db('Poet').where({ poet_code }).first();
    },

    deletePoet: async (_, { poet_code }) => {
      return await db('Poet').where({ poet_code }).del();
    },

    // -- Poems --
    addPoem: async (_, { poem_title, poem_contents, poet_code }) => {
      const [poem_code] = await db('Poem').insert({ poem_title, poem_contents, poet_code });
      return await db('Poem').where({ poem_code }).first();
    },

    updatePoem: async (_, { poem_code, poem_title, poem_contents, poet_code }) => {
      await db('Poem').where({ poem_code }).update({ poem_title, poem_contents, poet_code });
      return await db('Poem').where({ poem_code }).first();
    },

    deletePoem: async (_, { poem_code }) => {
      return await db('Poem').where({ poem_code }).del();
    },

    // -- Customers --
    addCustomer: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [customer_code] = await db('Customer').insert({ first_name, surname, address, postcode, telephone_number });
      return await db('Customer').where({ customer_code }).first();
    },

    updateCustomer: async (_, { customer_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Customer').where({ customer_code }).update({ first_name, surname, address, postcode, telephone_number });
      return await db('Customer').where({ customer_code }).first();
    },

    deleteCustomer: async (_, { customer_code }) => {
      return await db('Customer').where({ customer_code }).del();
    },

    // -- Sales --
    addSale: async (_, { date, amount, customer_code }) => {
      const [sale_code] = await db('Sale').insert({ date, amount, customer_code });
      const sale = await db('Sale').where({ sale_code }).first();
      return {
        ...sale,
        date: new Date(sale.date).toISOString().split('T')[0]
      };
    },

    updateSale: async (_, { sale_code, date, amount, customer_code }) => {
      await db('Sale').where({ sale_code }).update({ date, amount, customer_code });
      const updated = await db('Sale').where({ sale_code }).first();
      return {
        ...updated,
        date: new Date(updated.date).toISOString().split('T')[0]
      };
    },

    deleteSale: async (_, { sale_code }) => {
      return await db('Sale').where({ sale_code }).del();
    },

    // -- Publications --
    addPublication: async (_, { title, price }) => {
      const [publication_code] = await db('Publication').insert({ title, price });
      return await db('Publication').where({ publication_code }).first();
    },

    updatePublication: async (_, { publication_code, title, price }) => {
      await db('Publication').where({ publication_code }).update({ title, price });
      return await db('Publication').where({ publication_code }).first();
    },

    deletePublication: async (_, { publication_code }) => {
      return await db('Publication').where({ publication_code }).del();
    },

    // -- Poem_Publication --
    addPoemPublication: async (_, { poem_code, publication_code }) => {
      await db('Poem_Publication').insert({ poem_code, publication_code });
      return { poem_code, publication_code };
    },

    deletePoemPublication: async (_, { poem_code, publication_code }) => {
      return await db('Poem_Publication')
        .where({ poem_code, publication_code })
        .del();
    },

    // -- Sale_Publication --
    addSalePublication: async (_, { sale_code, publication_code }) => {
      await db('Sale_Publication').insert({ sale_code, publication_code });
      return { sale_code, publication_code };
    },

    deleteSalePublication: async (_, { sale_code, publication_code }) => {
      return await db('Sale_Publication')
        .where({ sale_code, publication_code })
        .del();
    }
  }
};

module.exports = resolvers;
