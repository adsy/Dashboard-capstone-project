
// Listings schema
// This is the query used by cubejs to get the correct data from the database for display on the dashboards
// Defines the type and what data is being pulled and how to join the data


cube(`Listings`, {
  sql: `SELECT listings.id, listings.listing_agent_1_name, listings.listing_agent_2_name, listings.account_id, DATE(listings.system_ctime) as system_ctime, TO_CHAR(listings.system_ctime, 'DD-Mon-YYYY') as date_formatted, listings.listing_agent_1_id, listings.listing_agent_2_id, listings.listing_category_id, listings.price_match, listings.system_listing_state, comm_worksheets.comm_amount_net_of_tax, DATE(system_publication_time) as system_publication_time, DATE(date_actual_settlement) as date_actual_settlement, listing_contracts.detail_sale_price_or_lease_pa, DATE(date_actual_fallen) as date_actual_fallen, listing_contracts.agent_id, listing_contracts.agent_name FROM listing_contracts FULL OUTER JOIN listings ON listing_contracts.listing_id = listings.id FULL OUTER JOIN comm_worksheets ON listing_contracts.id = comm_worksheets.contract_id WHERE  ${USER_CONTEXT.id.filter(
    "listings.account_id"
  )}`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        id,
        agentName,
        listingCategoryId,
        dateActualFallen,
        dateActualSettlement
      ]
    },
    avg: {
      type: "avg",
      sql: "comm_amount_net_of_tax"
    },

    Comms_Sum: {
      type: "sum",
      sql: `comm_amount_net_of_tax`
    },
    Sales_Sum: {
      type: "sum",
      sql: `detail_sale_price_or_lease_pa`
    },
    avgCommPercentage: {
      type: "number",
      sql: `${Comms_Sum} / ${Sales_Sum} * 100.00`,
      format: "percent"
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: true
    },

    accountId: {
      sql: `account_id`,
      type: `number`
    },

    agentName: {
      sql: `agent_name`,
      type: `string`
    },

    agentName1: {
      sql: `listing_agent_1_name`,
      type: `string`
    },

    agentName2: {
      sql: `listing_agent_2_name`,
      type: `string`
    },

    commNetTax: {
      sql: "comm_amount_net_of_tax",
      type: "number"
    },

    dateFormatted: {
      sql: "date_formatted",
      type: "string"
    },

    Sale_Price: {
      sql: "detail_sale_price_or_lease_pa",
      type: "number"
    },

    systemListingState: {
      sql: `system_listing_state`,
      type: `string`
    },

    listingCategoryId: {
      sql: `listing_category_id`,
      type: `string`
    },

    dateActualFallen: {
      sql: `date_actual_fallen`,
      type: `time`
    },

    dateActualSettlement: {
      sql: `date_actual_settlement`,
      type: `time`
    },

    systemCtime: {
      sql: `system_ctime`,
      type: `time`
    },

    systemPublicationTime: {
      sql: `system_publication_time`,
      type: `time`
    }
  }
});
