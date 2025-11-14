# bloxdio-asyncChain
## 概要
コードを非同期的に実行できるシステムです。tickを利用しています。
## 利用可能な機能
### setTimeout
普通にsetTimeoutです。jsの基礎的な仕様と同じです。
```js
/**
 *
 * @param {function} callback function 
 * @param {int} function is calling after this arg ms
 * @param {any} option value.function is calling this arg
 * @returns {void}
 */
setTimeout(function,int,...any)
```
### setInterval
普通にsetIntervalです。jsの基礎的な仕様と同じです。
```js
/**
 *
 * @param {function} callback function 
 * @param {int} function is calling this arg ms interval
 * @param {any} option value.function is calling this arg
 * @returns {void}
 */
setInterval(function,int,...any)
```
### AsyncChain
目玉です。プロミスのようなものですが、仕様が独特です。まず、これはコンストラクタとして働きます。
```js
new AsyncChain(() => console log(1))
// > 1
```
このAsyncChainインスタンスは2つのメゾットを持ちます。
```js
/**
* @param {function} 
* @returns {void}
*/
AsyncChainInstance.then(function)
```

```js
/**
* @param {function} 
* @returns {void}
*/
AsyncChainInstance.catch(function)
```

コンストラクタとthen,catchで渡した関数(以後、コールバック)は、2つの関数とカスタムできる値を受け取ります。</br>
1つ目の関数(以後、resolve)
```js
/**
* @param {any} 
* @returns {void}
*/
resolve(...any)
```
2つ目の関数(以後、reject)
```js
/**
* @param {any} 
* @returns {void}
*/
reject(...any)
```
コールバックでresolveを呼び出した場合、呼び出し元の関数のあとに追加された、最も近いthenに追加されたメゾットをresolveの引数を渡して、呼び出します
```js
new AsyncChain((resolve) => {
  console.log("foo")
  resolve("bar")
  })
  .then((resolve,reject,any) => {
   console.log(any)
   })
// >"foo"
// >"bar"
```
rejectも同様です
```js
new AsyncChain((resolve,reject) => {
  console.log("foo")
  reject("bar")
  })
  .catch((resolve,reject,any) => {
   console.log(any)
   })
// >"foo"
// >"bar"
```
コールバック内でsetTimeoutをし、resolveやrejectをsetTimeoutの中で呼び出すことで、sleepやその他非同期的な動作を書きやすくできます。
## 問題点
### 確実性
tick内でのinternalErrorによって、動作が中断される可能性があります。
