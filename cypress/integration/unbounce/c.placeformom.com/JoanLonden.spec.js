describe("Joan Lunden new Landing Page", () => {
	context("Setting up testing data", () => {
		let links = []

		it("get all links", () => {
			cy.navigate("https://c.aplaceformom.com/tv1/", null)
			cy.get("a")
				.as("alinks")
				.then(hrefs => {
					for (let index = 0; index < hrefs.length; index++) {
						if (hrefs[index].href) {
							links.push(hrefs[index].href)
							cy.navigate(hrefs[index].href, null)
						}
					}
				})
		})
	})
})
