var sql = require('mssql');
require('dotenv').config()
const fs = require('fs');

var config = {
    domain: process.env.DB_DOMAIN,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    requestTimeout: 3600000,
	options: {
		trustedConnection: true,
    },
    debug: true,
    parseJSON: true
};

let site = process.env._SITE;
//console.log(site);

// connect to your database
sql.connect(config, function(err) {
	if (err) console.log(err);

	// create Request object
	var request = new sql.Request();

	var query = `select pl.pre_lead_id,
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
                    where pl.URL like '%${site}%' and [address] like '%@aplaceformom.com%'
                    and pl.created_on >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)
                    and pcd.field_name = 'GoogleClientId'
                    Order by pl.created_on DESC`;

    //console.log(query);

	// query to the database and get the records
	request.query(query, function(err, recordset) {
		if (err) console.log(err);

        // send records as a response
        fs.writeFile("cypress/fixtures/results/db.json", JSON.stringify(recordset), function(err) {

            if(err) {
                return console.log(err);
            }        
            console.log("Database information properly collected and Stored!");
        }); 

        //return recordset;
	});
});






// var sql = require("mssql/msnodesqlv8"); 

// //Initiallising connection string
// var dbConfig = {    
//     driver: 'msnodesqlv8',
//     connectionString:'Driver={SQL Server Native Client 11.0};Server={EDWProd};Database={YGL_LeadGen};Trusted_Connection={yes};'
// };
// var getStudents = function(res){
//     sql.connect(dbConfig, function(err){
//         if(err){
//             console.log("Error while connecting database :- " + err);
//             res.send(err);
//             sql.close();
//         }
//         else {                       
//             var request = new sql.Request();          
//             request.execute('USP_GetStudents',function(err, data){
//                 if(err){
//                     console.log("Error while connecting database :- " + err);
//                     res.send(err);
//                 }
//                 else{
//                     res.send(data.recordset);
//                 }
//                 sql.close();    
//             });            
//         }
//     });
// }