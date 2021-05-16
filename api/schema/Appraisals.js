
// Appraisals schema
// This is the query used by cubejs to get the correct data from the database for display on the dashboards
// Defines the type and what data is being pulled and how to join the data

cube(`Appraisals`, {
  sql: `SELECT * FROM appraisals WHERE ${USER_CONTEXT.id.filter(
    "appraisals.account_id"
  )} `,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        agent1Name,
        systemCreatedUserName,
        archiveReasonId,
        systemModifiedUserName,
        archiveLostAgencyName,
        agent2Name,
        id,
        archiveDate,
        appraisalDate
      ]
    },
    Min_Sum: {
      type: "sum",
      sql: `price_min`
    },
    Listing_Count: {
      type: "count",
      sql: `id`
    },
    Max_Sum: {
      type: "sum",
      sql: `price_max`
    },
    PriceAvg: {
      type: "number",
      sql: `(${Max_Sum} + ${Min_Sum})/${Listing_Count} `,
      format: "number"
    }
  },

  dimensions: {
    appraisalState: {
      sql: `appraisal_state`,
      type: `string`
    },

    agent1Name: {
      sql: `agent_1_name`,
      type: `string`,
      title: `Agent 1 Name`
    },

    systemCreatedUserName: {
      sql: `system_created_user_name`,
      type: `string`
    },

    interestLevel: {
      sql: `interest_level`,
      type: `string`
    },

    archiveReasonId: {
      sql: `archive_reason_id`,
      type: `string`
    },

    systemModifiedUserName: {
      sql: `system_modified_user_name`,
      type: `string`
    },

    archiveLostAgencyName: {
      sql: `archive_lost_agency_name`,
      type: `string`
    },

    agent2Name: {
      sql: `agent_2_name`,
      type: `string`,
      title: `Agent 2 Name`
    },

    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    archiveDate: {
      sql: `archive_date`,
      type: `time`
    },

    appraisalDate: {
      sql: `appraisal_date`,
      type: `time`
    },

    systemCtime: {
      sql: `system_ctime`,
      type: `time`
    },

    systemModtime: {
      sql: `system_modtime`,
      type: `time`
    }
  }
});
