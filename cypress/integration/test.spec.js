describe("testing db connection", () => {
	it("test 1", () => {
		let db = new Array();

		let options = {
			env: {
				_SITE: "unbounce-test.aplaceformom.com/general-cdot-dev",
			},
		};

		cy.exec(`npm run db`, options).then($result => {
			cy.log($result);
		});

		cy.fixture("results/db.json").then($data => {
			db = $data.recordsets[0];
			cy.log(
				db.filter(
					p =>
						p.source_id == 5688 &&
						p.address == "kenneth.ramirez@aplaceformom.com"
				)
			);
			expect(
				db.filter(
					p =>
						p.source_id == 5688 &&
						p.address == "kenneth.ramirez@aplaceformom.com"
				).length
			).to.be.greaterThan(0);
		});
	});

	it.only("test 2", () => {
		let resultset = cy
			.sqlServerJson(
				`select pl.pre_lead_id,
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
    JOIN Pre_Lead_Phone plp on plp.pre_lead_person_id = pp.pre_lead_person_id
    where pl.URL like '%.aplaceformom.com%' and [address] like '%@aplaceformom.com%'
    and pl.created_on >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)
    and pcd.field_name = 'GoogleClientId'
    Order by pl.created_on DESC`
			)
			.then($result => {
				cy.log($result.filter(p => p.source_id == 5666 && !p.address.includes('automation')));
			});
	});
});
