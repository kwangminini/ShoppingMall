function * iterFunc(){ //반복 가능한 함수
    yield console.log("첫번째 출력");
    yield console.log("두번째 출력");
    yield console.log("세번째 출력");
    yield console.log("네번째 출력");
}

var iter = iterFunc();
//iter.next(); //next는 출력하고 싶은 만큼 
for(var i=0;i<2;i++){
    iter.next();
}
// iter.next();
// iter.next();
//iter.next(); 4개 개수가 넘어가도 에러는 나지 않음 
