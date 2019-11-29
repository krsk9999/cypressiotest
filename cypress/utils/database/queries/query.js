export default function design(filters) {
	let query;
	let SELECT;
	let WHERE;
	let DATEFILTER;
	let DOMAINFILTER;
	let EMAILFILTER;
	let ORDERBYFILTER;
	let OTHERFILTERS;

	SELECT = `select pl.pre_lead_id,
                            pl.creative_id,
                            pcd.field_value as [google_client_id],
                            pl.source_id,
                            plp.local_number,
                            pp.first_name + ' '+ pp.last_name as [username],
                            pe.address,
                            pl.URL,
                            pl.referring_url,
                            pl.created_on,
                            pl.desired_city,
                            pl.desired_state,
                            pl.desired_zip,
                            pl.campaign_id
                        FROM Pre_Lead pl
                        JOIN pre_lead_person pp ON pl.pre_lead_id = pp.pre_lead_id
                        JOIN Pre_Lead_Email pe ON pp.pre_lead_person_ID = pe.pre_lead_person_ID
                        JOIN Pre_Lead_Custom_Data pcd on pl.pre_lead_id = pcd.pre_lead_id
                        JOIN Pre_Lead_Phone plp on plp.pre_lead_person_id = pp.pre_lead_person_id`;
	WHERE = `where`;

	if (filters.timestamp) {
		DATEFILTER = `pl.created_on >= '${filters.timestamp}'`;
	} else {
		DATEFILTER = `pl.created_on >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)`;
	}

	if (filters.domain) {
		var a = document.createElement("a");
		a.href = filters.domain;
		DOMAINFILTER = `pl.URL like '%${a.hostname}%'`;
	}

	if (filters.email) {
		EMAILFILTER = `[address] = '${filters.email}'`;
	} else {
		EMAILFILTER = `[address] like '%@aplaceformom.com%'`;
	}

	OTHERFILTERS = `pcd.field_name = 'GoogleClientId'`;

	if (filters.orderBy) {
		ORDERBYFILTER = `Order by pl.created_on DESC`;
	} else {
		ORDERBYFILTER = `Order by pl.created_on DESC`;
	}

	query = `${SELECT} ${WHERE} ${DATEFILTER} and ${DOMAINFILTER} and ${EMAILFILTER} and ${OTHERFILTERS} ${ORDERBYFILTER}`;

	return query;
}
