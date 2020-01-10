import HelloWorld from '@my-library/hello-world'

const target = document.getElementById('hello')
const instance = new HelloWorld(target)
instance.sayHello()
