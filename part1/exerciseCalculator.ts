// interface exerInput {
//     targetHours: number;
//     dailyHours: number[];
// }

// const parseExerArguments = (args: Array<string>): exerInput => {
//     const dailyHours = process.argv.slice(3).map(x => Number(x));

//     if (typeof args[2] === 'undefined' || dailyHours.length == 0) throw new Error('Missing arguments! Format: npm run calculateExercises <target hours> <day1hours> <day2hours> etc.');

//     if (!isNaN(Number(args[2])) && !dailyHours.some(x => isNaN(x))) {
//       return {
//         targetHours: Number(args[2]),
//         dailyHours: dailyHours
//       };
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
// };

interface exerResult { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises  = (targetHours: number, dailyHours: number[] ) : exerResult => {
    //if (typeof targetHours === 'undefined' || dailyHours.length == 0) throw new Error('Missing arguments! Format: npm run calculateExercises <target hours> <day1hours> <day2hours> etc.')

    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(d => d > 0).length;
    const average = dailyHours.reduce((a, c) => a + c) / dailyHours.length; //math.round() optional
    const success = (average >= targetHours) ? true : false;
    const rating = (average < targetHours) ? 1 : (average == targetHours) ? 2 : 3;
    const ratingDescription = (average < targetHours) ? 'bad' : (average == targetHours) ? 'adequate' : 'great';
    const target = targetHours;

    //if (isNaN(average) || isNaN(targetHours)) throw new Error('Provided values were not numbers!')
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

};

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
//console.log(calculateExercises(Number(process.argv[2]), process.argv.slice(3).map(x => Number(x))))
// try {
//     const { targetHours, dailyHours } = parseExerArguments(process.argv);
//     console.log(calculateExercises(targetHours, dailyHours));
// } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log('Error, something bad happened, message: ', e.message);
// }
//npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4