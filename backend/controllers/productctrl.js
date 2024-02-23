import asyncHandler from '../middleware/asyncHandler.js';
import Accessory from '../models/accessories.js';
import Bird from '../models/bird.js';
import Cat from '../models/cat.js';
import Dog from '../models/dog.js';
import Fish from '../models/fish.js';
import Petfood from '../models/petfood.js';

// @desc Fetch all accessories
// @route GET /api/accessories
// @access Public
const getAccessories = asyncHandler(async(req, res) => { 
    const accessories = await Accessory.find({});
    res.json(accessories);
});

// @desc Fetch an accessory by ID
// @route GET /api/accessories/:id
// @access Public
const getAccessoryById = asyncHandler(async(req, res) => { 
    const accessory = await Accessory.findById(req.params.id);
    if (accessory) {
        return res.json(accessory);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Fetch all birds
// @route GET /api/birds
// @access Public
const getBirds = asyncHandler(async(req, res) => { 
    const birds = await Bird.find({});
    res.json(birds);
});

// @desc Fetch a bird by ID
// @route GET /api/birdpage/:id
// @access Public
const getBirdById = asyncHandler(async(req, res) => { 
    const bird = await Bird.findById(req.params.id);
    if (bird) {
        return res.json(bird);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Create a bird
// @route POST /api/birdpage
// @access Private/Admin
const createBird = asyncHandler(async(req, res) => { 
   const bird = new Bird ({
    name: 'Sample name',
    sn: 0,
    type: 'bird',
    price: 0,
    user: req.user._id,
    image: 'images/sample.jpg',
    // category:'Sample Category',
    species: 'Sample Species',
    availability: 0,
    numReviews: 0,
    rating:0,
    description: 'Sample description',
   })
   const createdBird = await bird.save();
   res.status(201).json(createdBird);
});


// @desc Update a bird
// @route PUT /api/birds/:id
// @access Private/Admin
const updateBird = asyncHandler(async (req, res) => {
  const { name, sn, price, type, description, image, species, availability, numReviews } = req.body;
  try {
    const bird = await Bird.findById(req.params.id);
    if (bird) {
      bird.name = name;
      bird.sn = sn;
      bird.price = price;
      bird.description = description;
      bird.image = image;
      bird.type = type;
      bird.species = species;
      bird.availability = availability;
    //   bird.numReviews = numReviews;
    //   bird.rating = rating;
      const updatedBird = await bird.save();
      res.json(updatedBird);
    } else {
      res.status(404).json({ message: 'Bird not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Delete a bird
// @route DELETE /api/birds/:id
// @access Private/Admin
const deleteBird = asyncHandler(async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (bird) {
      await Bird.deleteOne({ _id: bird._id });
      res.status(200).json({ message: 'Bird Deleted' });
    } else {
      res.status(404).json({ message: 'Bird not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc Fetch all cats
// @route GET /api/cats
// @access Public
const getCats = asyncHandler(async(req, res) => { 
    const cats = await Cat.find({});
    res.json(cats);
});

// @desc Fetch a cat by ID
// @route GET /api/cats/:id
// @access Public
const getCatById = asyncHandler(async(req, res) => { 
    const cat = await Cat.findById(req.params.id);
    if (cat) {
        return res.json(cat);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Repeat the pattern for other models...

// @desc Fetch all dogs
// @route GET /api/dogs
// @access Public
const getDogs = asyncHandler(async(req, res) => { 
    const dogs = await Dog.find({});
    res.json(dogs);
});

// @desc Fetch a dog by ID
// @route GET /api/dogs/:id
// @access Public
const getDogById = asyncHandler(async(req, res) => { 
    const dog = await Dog.findById(req.params.id);
    if (dog) {
        return res.json(dog);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Fetch all fishes
// @route GET /api/fishes
// @access Public
const getFishes = asyncHandler(async(req, res) => { 
    const fishes = await Fish.find({});
    res.json(fishes);
});

// @desc Fetch a fish by ID
// @route GET /api/fishes/:id
// @access Public
const getFishById = asyncHandler(async(req, res) => { 
    const fish = await Fish.findById(req.params.id);
    if (fish) {
        return res.json(fish);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Fetch all petfoods
// @route GET /api/petfoods
// @access Public
const getPetfoods = asyncHandler(async(req, res) => { 
    const petfoods = await Petfood.find({});
    res.json(petfoods);
});

// @desc Fetch a petfood by ID
// @route GET /api/petfoods/:id
// @access Public
const getPetfoodById = asyncHandler(async(req, res) => { 
    const petfood = await Petfood.findById(req.params.id);
    if (petfood) {
        return res.json(petfood);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { 
    getAccessories, 
    getAccessoryById,
    getBirds,
    getBirdById,
    createBird,
    updateBird,
    deleteBird,
    getCats,
    getCatById,
    getDogs,
    getDogById,
    getFishes,
    getFishById,
    getPetfoods,
    getPetfoodById,
};
