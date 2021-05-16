
// Commission schema
// This is the query used by cubejs to get the correct data from the database for display on the dashboards
// Defines the type and what data is being pulled and how to join the data


cube(`Commission`, {
  sql: `SELECT listing_contracts.listing_id, listing_contracts.account_id, listing_contracts.agent_id, DATE(listing_contracts.date_actual_settlement) as date_actual_settlement, comm_worksheets.cache_comm_total_agent_final_comm FROM listing_contracts INNER JOIN comm_worksheets ON listing_contracts.id = comm_worksheets.contract_id WHERE listing_contracts.date_actual_settlement IS NOT NULL AND ${USER_CONTEXT.id.filter(
    "listing_contracts.account_id"
  )} `,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [listing_id]
    },

    sum: {
      type: "sum",
      sql: `cache_comm_total_agent_final_comm`
    }
  },

  dimensions: {
    account_id: {
      sql: `account_id`,
      type: `number`
    },

    commission: {
      sql: `cache_comm_total_agent_final_comm`,
      type: `number`
    },

    agent_id: {
      sql: `agent_id`,
      type: `number`
    },

    listing_id: {
      sql: `listing_id`,
      type: `number`
    },

    agent_name: {
      sql: `agent_name`,
      type: `string`
    },

    dateActualSettlement: {
      sql: `date_actual_settlement`,
      type: `time`
    },

    systemCtime: {
      sql: `system_ctime`,
      type: `time`
    }
  }
});
