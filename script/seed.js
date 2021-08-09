'use strict'

const {db, models: {User, Product} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody@cody.com', password: '123', userType: 'CUSTOMER' }),
    User.create({ username: 'murphy@murphy.com', password: '123', userType: 'ADMINISTRATOR' }),
  ])

  const chocolateBar = await Product.create({
    name: 'Chocolate Protein Bar 4-pk',
    price: 15,
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtBCTSCghmdU27j_uDgTLVxpnLRBB-ZjpmhA&usqp=CAU',
    description: 'A four pack of our best-selling chocolate protein bar. Packed with 20g of sustainable grasshopper protein, providing you with all of your essential amino acids, B12, and omega-3s - and over twice as much iron as spinach. Grasshopper flour is over 70% protein by volume, making it a sustainable alternative to traditional animal-based protein sources. Why choose chicken (23% protein by volume) or eggs (12%) when you can have this instead?',
    quantity: 50,
    type: 'bar'
  })

  const mintChocolateBar = await Product.create({
    name: 'Mint Chocolate Protein Bar 4-pk',
    price: 15,
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwH_K1g6dPmDHsbb50Q5ic6eMQTvWBu-scHg&usqp=CAU',
    description: 'A four pack of our new mint chocolate protein bar. Packed with 20g of sustainable grasshopper protein, providing you with all of your essential amino acids, B12, and omega-3s - and over twice as much iron as spinach. Grasshopper flour is over 70% protein by volume, making it a sustainable alternative to traditional animal-based protein sources. Why choose chicken (23% protein by volume) or eggs (12%) when you can have this instead?',
    quantity: 50,
    type: 'bar'
  })

  const pbBar = await Product.create({
    name: 'Peanut Butter Chocolate Protein Bar 4-pk',
    price: 15,
    imageURL: 'https://thebigmansworld.com/wp-content/uploads/2020/07/peanut-butter-protein-bars.jpg',
    description: 'A four pack of your favorite chocolate, now in a protein bar. Packed with 20g of sustainable grasshopper protein, providing you with all of your essential amino acids, B12, and omega-3s - and over twice as much iron as spinach. Grasshopper flour is over 70% protein by volume, making it a sustainable alternative to traditional animal-based protein sources. Why choose chicken (23% protein by volume) or eggs (12%) when you can have this instead?',
    quantity: 50,
    type: 'bar'
  })

  const FlourLb = await Product.create({
    name: 'Grasshopper Protein Flour - 1lb',
    price: 40,
    imageURL: 'https://media.snacksafely.com/wp-content/uploads/2021/02/Cricket-Flour.jpg',
    description: '1 lb of 100% Pure Grasshopper Flour - Packed with a balanced, complete amino acid profile and prebiotic fiber, and free from the hormones and allergens found in soy and whey. Use it to boost the protein content of any baked good, smoothie, or make your own delicious grasshopper bars. Packed with 15g per serving of sustainable grasshopper protein',
    quantity: 50,
    type: 'flour'
  })

  const twoLbFlour = await Product.create({
    name: 'Grasshopper Protein Flour - 2lb',
    price: 60,
    imageURL: 'https://media.snacksafely.com/wp-content/uploads/2021/02/Cricket-Flour.jpg',
    description: '2 lb of 100% Pure Grasshopper Flour - Packed with a balanced, complete amino acid profile and prebiotic fiber, and free from the hormones and allergens found in soy and whey. Use it to boost the protein content of any baked good, smoothie, or make your own delicious grasshopper bars. Packed with 15g per serving of sustainable grasshopper protein',
    quantity: 50,
    type: 'flour'
  })

  const threeLbFlour = await Product.create({
    name: 'Grasshopper Protein Flour - 2lb',
    price: 90,
    imageURL: 'https://media.snacksafely.com/wp-content/uploads/2021/02/Cricket-Flour.jpg',
    description: '3 lb of 100% Pure Grasshopper Flour - Packed with a balanced, complete amino acid profile and prebiotic fiber, and free from the hormones and allergens found in soy and whey. Use it to boost the protein content of any baked good, smoothie, or make your own delicious grasshopper bars. Packed with 15g per serving of sustainable grasshopper protein',
    quantity: 50,
    type: 'flour'
  })

  const chocolatePP = await Product.create({
    name: 'Chocolate Protein Powder - 1lb',
    price: 45,
    imageURL: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F10%2F20%2Fwhat-is-in-protein-powder-2000.jpg&q=85',
    description: 'Meet our newest protein powder: a high-protein, low-carb blend of grasshopper (the star of the show) alongside chia seeds and pea protein and a delicious natural chocolate flavor  with zero artificial sugars. Just one scoop contains all 9 essential amino acids and over half of your daily B12',
    quantity: 50,
    type: 'protein powder'
  })

  const valillaPP = await Product.create({
    name: 'Vanilla Protein Powder - 1lb',
    price: 45,
    imageURL: 'https://www.mensjournal.com/wp-content/uploads/mf/whey_protein_powder_main.jpg?w=1188&h=675&crop=1&quality=86&strip=all',
    description: 'A 1lb tub of our classic vanilla protein powder: A high-protein, low-carb blend of grasshopper (the star of the show) alongside chia seeds and pea protein and a delicious natural flavor with zero artificial sugars. Just one scoop contains all 9 essential amino acids and over half of your daily B12',
    quantity: 50,
    type: 'protein powder'
  })


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
