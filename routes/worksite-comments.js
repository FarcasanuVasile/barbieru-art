const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WorkSiteComment = require('../models/WorkSiteComment');
const { check, validationResult } = require('express-validator');


// @route     GET  api/work-sites
// @desc      Get all work sites
// @access    Public
router.get('/', async (req,res) => {
    try {
        const comments =  await WorkSiteComment.find().sort({date:-1});
        res.json({status:"Success",data:comments});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error.');
    }
});

// @route     POST  api/work-sites
// @desc      Add new work site
// @access    Private 

router.post('/',[auth,
        [
            check('name','Name is required').not().isEmpty(),
            check('body','Message is required').not().isEmpty()
        ]
    ], async (req,res) => {
        const errors = validationResult(req);       
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const { name , body , rate, workSiteId} = req.body;
        try {
            const newComment = new WorkSiteComment({name,body,rate,workSiteId});
            const comment = await newComment.save();
            res.json({status:"Success",data:comment})

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

// @route     PUT  api/work-sites/:id
// @desc      Update a work site 
// @access    Private
router.put('/:id', auth,async(req,res) => {
    const  { name, body, rate, workSiteId } = req.body;
    const commentFields = {};
    if(name) commentFields.name=name;
    if(body) commentFields.body=body;
    if(rate) commentFields.rate=rate;
    if(workSiteId) commentFields.workSiteId=workSiteId;

    try {
        let comment = await WorkSiteComment.findById(req.params.id);
        if(!comment){
            res.status(404).json({msg:'Comment not found.'});
        }
        comment =  await WorkSiteComment.findByIdAndUpdate(req.params.id, {$set:commentFields},{new:true} );
        res.json({status:"Success",data:comment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

// @route     DELETE  api/work-sites/:id
// @desc      Delete a work site
// @access    Private
router.delete('/:id',auth,async(req,res) => {
    try {
        let comment = await WorkSiteComment.findById(req.params.id);
        if(!comment){
            res.status(404).json({msg:'Comment not found.'});
        }
        await WorkSiteComment.findByIdAndRemove(req.params.id );
        res.json({status:"Success",msg:"Work site comment removed."})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router; 