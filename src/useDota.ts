import axios from 'axios'
import { onMounted, ref } from 'vue'

// Dota2的openAPI文档：https://docs.opendota.com/#tag/heroes/operation/get_heroes

export interface Hero {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  roles: [string]
  legs: number
}

export default function () {
  let heros = ref<Hero[]>([])

  async function getAllHeros() {
    try {
      heros.value = (await axios.get<Hero[]>('https://api.opendota.com/api/heroes')).data
    } catch (error) {
      console.log('请求报错', error)
    }
  }

  // 自定义hook里也可以通过申明周期钩子来实现逻辑
  onMounted(() => {
    // 组件挂载时进行网络请求
    console.log('来自NPM包，自定义hook：useDota里执行 => onMounted()')
    getAllHeros()
  })

  // 必须用return暴露出去
  return { heros, getAllHeros}
}
