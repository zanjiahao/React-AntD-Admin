/*
*   React中的钩子函数只能在函数组件或自定钩子中调用
*       当我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
*
*   自定义钩子其实就是一个普通函数，只是它的名字需要使用use开头
* */
import { useState } from 'react'

function useSwitch () {
    const [value, setValue] = useState(true)
    
    const switchHandle = () => setValue(!value)
    
    // 哪些状态和回调函数需要在其他组件中使用 return
    return {
        value,
        switchHandle
    }
}

export default useSwitch