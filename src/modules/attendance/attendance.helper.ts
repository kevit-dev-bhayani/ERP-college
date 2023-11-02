// import {createAttendance} from './attendance.services';
// import {findStudents} from '../students/student.services';
// import {newError} from '../../utils/error';
// import {logger} from '../../utils/logger';

// function randomNumber(): boolean {
//   const rand = Math.floor(Math.random() * 2);
//   if (rand === 0) {
//     return false;
//   }
//   return true;
// }

// async function main() {
//   try {
//     // const students = await findStudents();
//     // console.log(students);
//     // students.map((student) => student);
//     // console.log(students.length);
//     const students = ['65424cfc08d6b54821442d11', '65424d5c08d6b54821442d17'];
//     const start_date = new Date('Mon Nov 06 2023');
//     const end_date = new Date('Sat Nov 11 2023');

//     for (let date = start_date; date <= end_date; date = new Date(date.getTime() + 86400000)) {
//       for (let i = 0; i < students.length; i++) {
//         await createAttendance({
//           student: students[i],
//           date: date,
//           isPresent: randomNumber()
//         });
//       }
//     }
//   } catch (error) {
//     logger.error(`Error while generating attendance - ${error}`);
//     throw newError(500, error);
//   }
// }

// main();
