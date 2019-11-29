import design from '../../../utils/database/queries/query.js';

module.exports = function() {
	Cypress.Commands.add("sqlServerArray", query => {
		if (!query) {
			throw new Error("Query must be set");
		}

		cy.task("sqlServerArray:execute", query).then(response => {
			let result = [];

			const flatten = r =>
				Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r;

			if (response) {
				for (let i in response) {
					result[i] = [];
					for (let c in response[i]) {
						result[i][c] = response[i][c].value;
					}
				}
				result = flatten(result);
			} else {
				result = response;
			}

			return result;
		});
	});

	Cypress.Commands.add("sqlServer", filters => {

		let query;

		query = design(filters);

		if (!query) {
			throw new Error("Query must be set");
		}
	
		cy.task("sqlServer:execute", query).then(response => {
			let result = [];
	
			if (response) {
				for (let i in response) {
					let ar = {}
					for (let c in response[i]) {		
						ar[response[i][c].metadata.colName] = response[i][c].value;		
					}
					result.push(ar);
				}
			} else {
				result = response;
			}
	
			return result;
		});
	});
};
