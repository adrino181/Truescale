function parseFilters(
    filters,
    params,    
    sessionKey = 'session_id',
  ) {
    const { os, browser, device, country, region, city } = filters;
  
    return {
      joinSession:
        os || browser || device || country || region || city
          ? `inner join session on website_event.${sessionKey} = session.${sessionKey}`
          : '',
      filterQuery: getFilterQuery(filters, params),
    };
  }