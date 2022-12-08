const { Router } = require('express');
const axios = require('axios');
const { Op } = require("sequelize");
const seq = require('../db');
const Temper = require('../models/Temper');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs/', async (req, res) => {
  const queryName = req.query.name;
  const allResults = [];
  try {
    seq.conn.sync({ alter: true }).then(async () => {
      const allBreeds = await seq.Dog.findAll({
        where: queryName ? {
          'name': {
            [Op.iLike]: `%${queryName}%`,
          },
        } : {},
        include: [{
          model: seq.Temper,
          attributes: ['name'],
        }],
      });
      allBreeds.map(breed => {
        const temperaments = breed.Tempers.map(temperament => temperament.name).join(',');
        return {
          id: breed.id,
          name: breed.name,
          weight: `${breed.weight_min} - ${breed.weight_max}`,
          height: `${breed.height_min} - ${breed.height_max}`,
          years_life: `${breed.life_span} years`,
          temperaments,
          img: null,
          source: 'db',
        };
      }).forEach(breed => {
        allResults.push(breed);
      });
    });

    const apiBreeds = await axios.get(
      queryName ? `https://api.thedogapi.com/v1/breeds/search?q=${queryName}` : 'https://api.thedogapi.com/v1/breeds/' 
    );
    // console.log(apiBreeds);
    apiBreeds.data.map(breed => {
      return {
        id: breed.id,
        name: breed.name,
        weight: breed.weight.metric,
        height: breed.height.metric,
        years_life: breed.life_span,
        temperaments: breed.temperament,
        img: breed.image?.url,
        source: 'api',
      }
    }).forEach(breed => {
      if (breed.weight === 'NaN' || breed.height === 'NaN') {
        return;
      }
      allResults.push(breed);
    });
    res.status(200).json(allResults);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Esto va a ir en la ruta anterior nada más.
router.get('/dogs?name="..."', (req, res) => {
  res.status(200)
  // Tienes que recibir el nombre como queryParameter (ojo que no es un parámetro normal lee documetacion de express)
  // En base a ese parámetro:
  //  - Consultas en tu base de datos todos los registros con ese nombre
  //  - Consultas en la API https://api.thedogapi.com/v1/breeds/search?q={raza_perro}
  //  - Combinas los resultados y los devuelves
});

router.get('/dogs/:idRaza/', (req, res) => {
  const { idRaza } = req.params;
  const { quantity } = req.query;

  res.status(200)
});

router.post('/dogs/', (req, res) => {
  const { name, height_min, height_max, weight_min, weight_max, years_life, temperaments, new_temperaments} = req.body;
  const newTemperaments = new_temperaments.split(',');
  // Sacar los IDs de todos los temperamentos
  // - Crear los nuevos temperamentos
  // - Obtener los IDs de los temperamentos que ya existen.
  const allTemperaments = [];
  try {
    seq.conn.sync({ alter: true }).then(async () => {

      const createdTemperaments = await seq.Temper.bulkCreate(
        newTemperaments.filter(temperament => temperament.length > 0)
                      .map(temperament => ({ name: temperament}))
      );
      createdTemperaments.forEach(temperament => {
        allTemperaments.push(temperament);
      });
      
      const currentTemperaments = await seq.Temper.findAll({ where: { name: temperaments } });
      currentTemperaments.forEach(temperament => {
        allTemperaments.push(temperament);
      });

      const breed = await seq.Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        years_life,
      }).then((breed) => {
        breed.setTempers(allTemperaments.map(temperament => temperament.id));
        return breed;
      });
      res.status(200).json(breed)
    });
  }
  catch (error) {
    res.status(400).json({err: error.message})
  }
});

router.get('/temperaments/', (req, res) => {
  try {
    seq.conn.sync({ alter: true }).then(async () => {
      const allTempers = await seq.Temper.findAll();
      res.status(200).json(allTempers.map(temper => temper.toJSON()));
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;