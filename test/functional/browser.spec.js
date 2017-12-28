'use strict'

const { test, trait } = use('Test/Suite')('Browser')

trait('Test/Browser', {
  // headless: false
})

test('Visit home page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.pause(1000)
  await page.assertHas('AdonisJs')
}).timeout(0)