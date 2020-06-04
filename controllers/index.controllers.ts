import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface Meal {
  id: string;
  name: string;
}

let meals: Meal[] = [
  {
    id: "1",
    name: "Hot Dog",
  },
  {
    id: "2",
    name: "Hamburguer",
  },
  {
    id: "3",
    name: "Veggie salad",
  },
];

export const getMeals = ({ response }: { response: Response }) => {
  response.body = {
    message: "Meals served",
    meals,
  };
};

export const getMeal = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const mealFounded = meals.find((meal) => meal.id === params.id);
  if (mealFounded) {
    response.status = 200;
    response.body = {
      message: "Here's your meal, enjoy!",
      mealFounded,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "we don't serve that meal in the menu, sorry :(",
    };
  }
};

export const createMeal = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "We need the body to add a meal",
    };
  } else {
    const body: Body = await request.body();
    const newMeal: Meal = {
      id: v4.generate(),
      name: body.value,
    };

    meals.push(newMeal);

    (response.status = 200),
      (response.body = {
        message: "Meal added to menu!",
        newMeal,
      });
  }
};

export const updateMeal = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  const mealFounded = meals.find((meal) => meal.id === params.id);

  if (!mealFounded) {
    response.status = 404;
    response.body = {
      message: "We haven't found the meal that you're trying to update",
    };
  } else {
    const body = await request.body();
    const updatedMeal = body.value;

    meals = meals.map((meal) =>
      meal.id === params.id ? { ...meal, updatedMeal } : meal
    );

    (response.status = 200),
      (response.body = {
        message: "We updated the meal in the menu",
        meals,
      });
  }
};

export const deleteMeal = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const newMeals = meals.filter((meal) => meal.id !== params.id);
  if (newMeals.length !== meals.length) {
    meals = newMeals;
    response.status = 200;
    response.body = {
      message: "Meal removed from the menu succesfully",
      meals,
    };
  } else {
    (response.status = 404),
      (response.body = {
        message: "We haven't found the meal that you're trying to delete",
      });
  }
};
