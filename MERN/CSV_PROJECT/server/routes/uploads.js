import express from 'express';

import { getCsvs, createCsv, updateCsv, deleteCsv }  from '../controllers/uploads.js'

const router = express.Router();

router.get('/',getCsvs );
router.post('/',createCsv );
router.patch('/:id', updateCsv );
router.delete('/:id', deleteCsv );

export default router;