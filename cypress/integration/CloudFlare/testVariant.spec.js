/// <reference types="Cypress" />
import { sep } from "path"
import { isRegExp } from "util"

describe("Redirections", () => {
	context("Setting up testing data", () => {
		it("testing", () => {
			let max = 500

			for (let i = 0; i < max; i++) {
				let searchBox = "#tsf input[name='q']"
				let varCookie
				cy.visit("https://www.google.com")
				cy.get(searchBox).as("searchBox")

				cy.get("@searchBox")
					.type("senior advisor communities near seattle wa")
					.type("{enter}")

				cy.get(
					"a[href='https://www.senioradvisor.com/seattle-wa/assisted-living']"
				).click()

				cy.getCookie("tnl_exp_details").then(cookie => {
					varCookie = cookie
					cy.log(cookie)
					if (cookie.includes("=variant")) {
						cy.pause()
					}
				})
			}
		})
	})
})
