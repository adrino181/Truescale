const loadWebsite  = require('../website/loadWebsite');
const Session = require('../../../models/analytics/session.model')
async function getSessionMetrics(
  args
) {
  return relationalQuery(args);
}


async function relationalQuery(
  websiteId,
  criteria,
  ) {
  const website = await loadWebsite(websiteId);
  // const resetDate = new Date(website?.resetAt || website?.createdAt);
  // const { startDate, endDate, column, filters = {} } = criteria || {};
  // const { toUuid, parseFilters, rawQuery } = prisma || {};
  // const params = [websiteId, resetDate, startDate, endDate];
  //const { filterQuery, joinSession } = parseFilters(filters, params);

  return Session.aggregate([
    {$lookup:
     {
       from: "websiteevents",
       pipeline: [
        // { $match: { year: 2018 } },
        { 
          $project: {
          //   eventData:{$map : {
          // input: '$eventData',
          // as: 'eventObj',
          // in: {$size}
          eventData: { $cond: { if: { $isArray: "$eventData" }, then: { $size: "$eventData" }, else: "NA"} },
          // }}, 
          _id:0,
           eventType:1,
           urlPath:1,
           eventName: 1,
           session: 1,
        }
        },
         //{ $replaceRoot: { newRoot: "$eventData" } }
       ],
       localField: "id",
       foreignField: "sessionId",
       as: "websiteEvents"
     }},
    //  {
    //   $unwind: {
    //     path: '$websiteEvents.eventData'
    //   }
    //  }
    ])
    //return Session.find({websiteId: website._id,}).limit(100);
}

// async function clickhouseQuery(
//   websiteId: string,
//   data: { startDate: Date; endDate: Date; column: string; filters: object },
// ) {
//   const { startDate, endDate, column, filters = {} } = data;
//   const { getDateFormat, parseFilters, getBetweenDates, rawQuery } = clickhouse;
//   const website = await loadWebsite(websiteId);
//   const resetDate = new Date(website?.resetAt || website?.createdAt);
//   const params = { websiteId };
//   const { filterQuery } = parseFilters(filters, params);

//   return rawQuery(
//     `select ${column} x, count(distinct session_id) y
//     from website_event as x
//     where website_id = {websiteId:UUID}
//     and event_type = ${EVENT_TYPE.pageView}
//       and created_at >= ${getDateFormat(resetDate)}
//       and ${getBetweenDates('created_at', startDate, endDate)}
//       ${filterQuery}
//     group by x
//     order by y desc
//     limit 100`,
//     params,
//   );
// }

module.exports = getSessionMetrics;