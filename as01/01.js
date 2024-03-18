// асинхронность
// порядок выполнения
console.log(1)  //1
console.log(2)  //2
setTimeout(() => {
    console.log(3)  //6
    setTimeout(() => {
        console.log(5)  //7
    }, 0)
}, 0)
console.log(4)  //3

function a(){
    console.log('a') //4
}
function b(){
    console.log('b') //5
}

a()
b()

// setTimeout - попадает в очередь колбэков, и когда колстэк пустой
// туда попадают колбэки
