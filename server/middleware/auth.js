// const jwt = require('jsonwebtoken');
// const secret = 'gameAppTester'; // This should be inside of the .env file

// const auth = (req, res, next) => {
//     jwt.verify(req.cookies.usertoken, secret, (err, payload) =>{
//         if(err){
//             res.status(401).json({verified: false});
//         }else{
//             next();
//         }

//     });
// }

// //Possible solution (The above might not work) 
// // const auth = async (req, res, next) => {
// //     try {
// //         const token = req.headers.authorization.split(" ")[1];
// //         const isCustomAuth = token.length < 500;

// //         let decodedData;

// //         if (token && isCustomAuth) {
// //             decodedData = jwt.verify(token, secret);

// //             req.userId = decodedData?.id;
// //         } else {
// //             decodedData = jwt.decode(token);

// //             req.userId = decodedData?.sub;
// //         }

// //         next();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };

// export default auth;