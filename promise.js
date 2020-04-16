// var p1 = new Promise(
//     (resolve, reject) => {
//         console.log("프라미스 함수제작");
//         //0.5초 뒤에 콘솔에 찍습니다.
//         setTimeout(
//             () => {
//                 //프라미스 이행 될때 실행할 부분을 resolve로 적습니다.
//                 resolve(console.log("프라미스 실행"))
//             }, 500 );
//     }
// );

// p1.then( ()=>{
//     console.log("프라미스 이행")
// })

var p1 = new Promise(
    (resolve, reject) => {
        console.log("프라미스 함수제작");
        //0.5초 뒤에 콘솔에 찍습니다.
        setTimeout(
            function() {
                //프라미스 이행 될때 실행할 부분을 resolve로 적습니다. 변수도 저장 가능
                resolve({ p1 : "^_^" });
            }, 500 );
    }
);

var p2 = new Promise(
    (resolve, reject) => {
        console.log("프라미스 함수제작");
        //0.3초 뒤에 콘솔에 찍습니다.
        setTimeout(
            function() {
                resolve({ p2 : "-_-" });
            }, 300 );
    }
);

// var p2 = new Promise(
//     (resolve, reject) => {
//         console.log("프라미스 함수제작");
//         //0.3초 뒤에 콘솔에 찍습니다.
//         setTimeout(
//             function() {
//                 reject();  <--에러 처리하고싶을때 사용한다 여기서 에러가 발생
//             }, 300 );
//     }
// );

// p1.then( result => {
//     console.log("p1 = " + result.p1);
//     return p2;
// }).then( result =>{
//     console.log("p2 = " + result.p2);
// })

Promise.all([p1,p2]).then( (result) =>{ //p1, p2객체의 변수가 다르면?
    console.log(result);
    console.log( "p1 = " + result[0].p1);
    console.log( "p2 = " + result[1].p2);
});

