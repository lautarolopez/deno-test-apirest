import { Router } from "https://deno.land/x/oak/mod.ts";
import * as indexController from '../controllers/index.controllers.ts';

const router = new Router();

router.get('/', ({response}) => {
    response.body = 'Testing how DENO goes'
});

router.get('/meals', indexController.getMeals);
router.get('/meals/:id', indexController.getMeal);
router.post('/meals', indexController.createMeal);
router.put('/meals/:id', indexController.updateMeal);
router.delete('/meals/:id', indexController.deleteMeal);

export default router;
