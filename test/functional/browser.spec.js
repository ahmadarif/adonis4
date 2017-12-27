'use strict'

const { test, trait } = use('Test/Suite')('Browser')

trait('Test/Browser')

test('Visit home page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('Adonis')
}).timeout(0)