import cypress from 'cypress';

async function executeScrape(req, res) {
  let definitions = req.body.data;
  console.log('executing ', definitions.length, ' definitions');
  try {
    let result = await cypress.run({
      env: { definitions, ipc: true },
      quiet: true,
    });
    return res.json({ data: true });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
}

export const executeScrapeController = () => async (req, res) => {
  return await executeScrape(req, res);
};
