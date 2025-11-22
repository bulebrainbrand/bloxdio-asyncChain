


AsyncChain = class{

  #chain
  constructor(func){
    this.#chain = []
    func((...arg) => this.#next("then",...arg),(...arg) => this.#next("catch",...arg))
    }

  then(func){
    this.#chain.push({func,type:"then"})
    return this
    }

  catch(func){
    this.#chain.push({func,type:"catch"})
    return this
    }

  #next(type,...value){
    setTimeout(() => {
      while(1){
        if(this.#chain.length === 0)break;
        if(this.#chain[0].type !== type){
          this.#chain.shift()
          continue;
          }
        const func = this.#chain[0].func
        this.#chain.shift()
        func((...arg) => this.#next("then",...arg),(...arg) => this.#next("catch",...arg),...value)
        break;
        }
      },1)
    }



  }

var timeoutQueue = []

var setTimeout = (func,time,...args) => {
  const funcRunTime = api.now() + time
  add: {
    for(let i = 0;i<timeoutQueue.length;i++){
      const {runTime} = timeoutQueue[i]
      if(funcRunTime <= runTime){
        timeoutQueue.splice(i,0,{runTime:funcRunTime,func,interval:null,args})
        break add;
        }
      }
    timeoutQueue.push({runTime:funcRunTime,func,interval:null,args})
    }
  }

var setInterval = (func,interval,...args) => {
  const funcRunTime = api.now() + interval
  add: {
    for(let i = 0;i<timeoutQueue.length;i++){
      const {runTime} = timeoutQueue[i]
      if(funcRunTime <= runTime){
        timeoutQueue.splice(i,0,{runTime:funcRunTime,func,interval,args})
        break add;
        }
      }
    timeoutQueue.push({runTime:funcRunTime,func,interval,args})
    }
  }

tick = () => {
  const now = api.now()
  while(true){
    if(timeoutQueue.length === 0)break;
    if(timeoutQueue[0].runTime > now)break;
    const {runTime,func,interval,args} = timeoutQueue[0]
    timeoutQueue.shift()
    if(interval != null){
      setInterval(func,interval,...args)
      }
    func(...args)
    }
}
