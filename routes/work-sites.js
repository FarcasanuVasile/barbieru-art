const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WorkSite = require('../models/WorkSite');
const { check, validationResult } = require('express-validator');


// @route     GET  api/work-sites
// @desc      Get all work sites
// @access    Public
router.get('/', async (req,res) => {
    try {
        const workSites = await WorkSite.find().sort({date:-1});
        res.send({status:"Success",data:workSites})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// @route     GET api/work-sites
// @desc      Get work site by id
// @access    Public

router.get('/:id',async(req,res) => {
    try {
        let workSite = await WorkSite.findById(req.params.id);
        if(!workSite){
            res.status(404).json({msg:'Worksite not found'});
        }
        res.status(200).json(workSite);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST  api/work-sites
// @desc      Add new work site
// @access    Private 
router.post('/',[auth,
    [
        check('name','Name is required').not().isEmpty(),
        check('description','Message is required').not().isEmpty()
    ]
    ], async (req,res) => {
        const errors = validationResult(req);       
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const { name , description , imagePaths} = req.body;

        try {
            const newWorkSite = new WorkSite({name, description , imagePaths});
            const workSite = await newWorkSite.save();
            res.json({status:"Success",data:workSite});    
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});
// @route     PUT  api/work-sites/:id
// @desc      Update a work site 
// @access    Private
router.put('/:id',auth,async(req,res) => {
    const { name, description, imagePaths } = req.body;
    const workSiteFields = {};
    if(name) workSiteFields.name=name;
    if(description) workSiteFields.description=description;
    if(imagePaths) workSiteFields.imagePaths=imagePaths;
    try {
        let workSite =await WorkSite.findById(req.params.id);
        if(!workSite){
            res.status(404).json({msg:'Worksite not found'});
        }
        workSite = await WorkSite.findByIdAndUpdate(req.params.id, {$set:workSiteFields},{new:true} )
        res.json({status:"Success",data:workSite});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route     DELETE  api/work-sites/:id
// @desc      Delete a work site
// @access    Private
router.delete('/:id',auth, async(req,res) => {
    try {
        let workSite = WorkSite.findById(req.params.id);
        if(!workSite){
            res.status(404).json({msg:'Worksite not found'});
        }
        workSite = await WorkSite.findByIdAndRemove(req.params.id);
        res.json({status:"Success",msg:"The worksite was deleted."});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router; 