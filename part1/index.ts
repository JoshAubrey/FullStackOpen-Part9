import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  //http://localhost:3003/bmi?height=180&weight=72
  //res.send('height: ' + _req.query.height + ' weight: ' +_req.query.weight );
  const {height, weight} = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'Malformatted parameters!' });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return res.status(400).json({ error: 'Provided values were not numbers!' });
  }

  const bmi = calculateBmi(parsedHeight, parsedWeight);

  return res.json({ weight, height, bmi });

});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const bodyTarget = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const bodyDailyExercises = req.body.daily_exercises;

  if (!bodyTarget || !bodyDailyExercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const parsedTarget = Number(bodyTarget);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const parsedDailyExercises : number[] = bodyDailyExercises.map((x: any) => Number(x));

  if (isNaN(parsedTarget) || parsedDailyExercises.some((x) => isNaN(x))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const calc = calculateExercises(parsedTarget, parsedDailyExercises);

  return res.json({ calc });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});