// Users schema
// This is the query used by cubejs to get the correct data from the database for display on the dashboards
// Defines the type and what data is being pulled and how to join the data


cube(`Users`, {
  sql: `SELECT * FROM users WHERE ${USER_CONTEXT.id.filter(
    "appraisals.account_id"
  )} `,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [firstName, id, lastName]
    }
  },

  dimensions: {
    password: {
      sql: `password`,
      type: `string`
    },

    accountId: {
      sql: `account_id`,
      type: "number"
    },

    phoneMobile: {
      sql: `phone_mobile`,
      type: `string`
    },

    position: {
      sql: `position`,
      type: `string`
    },

    firstName: {
      sql: `first_name`,
      type: `string`
    },

    phoneDirect: {
      sql: `phone_direct`,
      type: `string`
    },

    email: {
      sql: `email`,
      type: `string`
    },

    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    lastName: {
      sql: `last_name`,
      type: `string`
    }
  }
});
