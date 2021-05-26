// interface heightWeight {
//     height: number;
//     weight: number;
// }

// const parseBmiArguments = (args: Array<string>): heightWeight => {
//     if (typeof args[2] === 'undefined' || typeof args[3] === 'undefined') throw new Error('Missing arguments! Format: npm run calculateBmi <heightInCm> <weightInKg>');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//       return {
//         height: Number(args[2]),
//         weight: Number(args[3])
//       };
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
// };

export const calculateBmi = (height: number, weight: number ) : string => {
    //height (in centimeters) and weight (in kilograms)
    //dividing the weight in kilograms by the height in centimeters squared, 
    //and then multiplying the result by 10,000

    //underweight (under 18.5 kg/m2), normal weight (18.5 to 25), 
    //overweight (25 to 30), and obese (over 30)

    const bmi = (weight / (height * height)) * 10000;

    if (bmi < 18.5) return 'Underweight';
    else if (bmi <= 25) return 'Normal (healthy weight)';
    else if (bmi > 25 && bmi <=30 ) return 'Overweight';
    else if (bmi > 30) return 'Obese';
    else throw new Error('BMI outside range!');

};

//console.log(calculateBmi(180, 74))
// try {
//     const { height, weight } = parseBmiArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log('Error, something bad happened, message: ', e.message);
// }
//npm run calculateBmi 180 74