const express=require('express');
const { postRegister, showDetails, deleteData, editData } = require('../controller/controller');
const router=express.Router();

router.get('/details',showDetails);
router.post('/postRegister',postRegister);
router.delete('/delete/:id',deleteData);
router.put('/edit/:id',editData);

module.exports=router;